package com.winterframework.firefrog.game.service.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.winterframework.firefrog.common.httpjsonclient.IHttpJsonClient;
import com.winterframework.firefrog.common.redis.RedisClient;
import com.winterframework.firefrog.common.util.DateUtils;
import com.winterframework.firefrog.common.util.GameBizLockService;
import com.winterframework.firefrog.common.util.GameContext;
import com.winterframework.firefrog.common.util.OrderCodeMultMd5;
import com.winterframework.firefrog.common.util.ProcessResult;
import com.winterframework.firefrog.common.util.SNUtil;
import com.winterframework.firefrog.common.wincaculate.ILotteryWinCaculatorFactory;
import com.winterframework.firefrog.common.wincaculate.ILotteryWinSlipNumCaculator;
import com.winterframework.firefrog.fund.dao.IFundChangeLogDao;
import com.winterframework.firefrog.game.dao.IGameBettypeStatusDao;
import com.winterframework.firefrog.game.dao.IGameIssueDao;
import com.winterframework.firefrog.game.dao.IGameOrderDao;
import com.winterframework.firefrog.game.dao.IGamePackageDao;
import com.winterframework.firefrog.game.dao.IGamePackageItemDao;
import com.winterframework.firefrog.game.dao.IGamePlanDao;
import com.winterframework.firefrog.game.dao.IGamePlanDetailDao;
import com.winterframework.firefrog.game.dao.IGameReturnPointDao;
import com.winterframework.firefrog.game.dao.IGameSlipDao;
import com.winterframework.firefrog.game.dao.vo.GameIssue;
import com.winterframework.firefrog.game.dao.vo.GameOrderLog;
import com.winterframework.firefrog.game.dao.vo.GamePlan;
import com.winterframework.firefrog.game.dao.vo.GamePlanDetail;
import com.winterframework.firefrog.game.dao.vo.GameRetPoint;
import com.winterframework.firefrog.game.dao.vo.GameUserAwardGroup;
import com.winterframework.firefrog.game.dao.vo.VOConverter;
import com.winterframework.firefrog.game.entity.GameBetDetailTotAmountEntity;
import com.winterframework.firefrog.game.entity.GameIssueEntity;
import com.winterframework.firefrog.game.entity.GameOrder;
import com.winterframework.firefrog.game.entity.GameOrder.OrderStatus;
import com.winterframework.firefrog.game.entity.GameOrderOperationsEntity;
import com.winterframework.firefrog.game.entity.GameOrderUserBetInfoEntity;
import com.winterframework.firefrog.game.entity.GamePackage;
import com.winterframework.firefrog.game.entity.GamePackage.GamePackageType;
import com.winterframework.firefrog.game.entity.GamePackageItem;
import com.winterframework.firefrog.game.entity.GameSeriesConfigEntity;
import com.winterframework.firefrog.game.entity.GameSlip;
import com.winterframework.firefrog.game.entity.GameSlipOperationsEntity;
import com.winterframework.firefrog.game.exception.GameCancalOutTimeErrorException;
import com.winterframework.firefrog.game.exception.GameCancelOrderPermitErrorException;
import com.winterframework.firefrog.game.exception.GameIssueStatusStopSaleException;
import com.winterframework.firefrog.game.exception.GameOrderOrPlanCodeExistErrorException;
import com.winterframework.firefrog.game.exception.GameOrderStatusErrorException;
import com.winterframework.firefrog.game.exception.GameRiskException;
import com.winterframework.firefrog.game.exception.UserBalErrorException;
import com.winterframework.firefrog.game.exception.UserTopAgentBetException;
import com.winterframework.firefrog.game.lock.config.mongo.service.LockSelector;
import com.winterframework.firefrog.game.lock.config.mongo.service.LotteryLockService;
import com.winterframework.firefrog.game.service.IGameAwardService;
import com.winterframework.firefrog.game.service.IGameBetTypeStatusService;
import com.winterframework.firefrog.game.service.IGameCheckDrawService;
import com.winterframework.firefrog.game.service.IGameControlEventService;
import com.winterframework.firefrog.game.service.IGameFundRiskService;
import com.winterframework.firefrog.game.service.IGameIssueService;
import com.winterframework.firefrog.game.service.IGameOrderLogService;
import com.winterframework.firefrog.game.service.IGameOrderService;
import com.winterframework.firefrog.game.service.IGamePlanDetailService;
import com.winterframework.firefrog.game.service.IGameSeriesConfigService;
import com.winterframework.firefrog.game.service.IGameUserAwardGroupService;
import com.winterframework.firefrog.game.service.openaward.IOpenAwardService;
import com.winterframework.firefrog.game.service.order.utlis.GameAwardModeCheck;
import com.winterframework.firefrog.game.service.order.utlis.MmcDrawService;
import com.winterframework.firefrog.game.service.wincaculate.amount.LotteryWinAmountCaculator;
import com.winterframework.firefrog.game.web.dto.GameOrderOperationsQueryDTO;
import com.winterframework.firefrog.game.web.dto.GameOrderQueryDTO;
import com.winterframework.firefrog.game.web.dto.TORiskDTO;
import com.winterframework.firefrog.game.web.dto.UserBetInfoSumStruc;
import com.winterframework.firefrog.game.web.util.GameFundTypesUtils;
import com.winterframework.firefrog.user.dao.IUserCustomerDao;
import com.winterframework.firefrog.user.entity.User;
import com.winterframework.modules.page.Page;
import com.winterframework.modules.page.PageRequest;
import com.winterframework.modules.spring.exetend.PropertyConfig;
import com.winterframework.modules.web.jsonresult.Response;
import com.winterframework.modules.web.util.RequestContext;

/**
 * 游戏订单Service实现类
 * @author Denny
 * @date 2013-7-22 下午2:36:56
 */
@Service("gameOrderServiceImpl")
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class GameOrderServiceImpl implements IGameOrderService {

	private Logger log = LoggerFactory.getLogger(GameOrderServiceImpl.class);

	@Resource(name = "gameOrderDaoImpl")
	private IGameOrderDao gameOrderDao;
	
	@Resource(name = "gameBettypeStatusDaoImpl")
	private IGameBettypeStatusDao gameBettypeStatusDao;
	
	@Resource(name = "gameSlipDaoImpl")
	private IGameSlipDao gameSlipDaoImpl;

	@Resource(name = "mmcDrawService")
	private MmcDrawService mmcDrawService;

	@Resource(name = "gamePackageDao")
	private IGamePackageDao gamePackageDao;

	@Resource(name = "gamePackageItemDao")
	private IGamePackageItemDao gamePackageItemDao;

	@Resource(name = "SNUtil")
	private SNUtil snUtil;
	@Resource(name = "gameBizLockService")
	private GameBizLockService gameBizLockService;
	
	@Resource(name = "gameSlipDaoImpl")
	private IGameSlipDao gameSlipDao;

	@Resource(name = "gameIssueServiceImpl")
	private IGameIssueService gameIssueService;

	@Resource(name = "gameIssueDaoImpl")
	private IGameIssueDao gameIssueDao;

	@Resource(name = "gameFundRiskServiceImpl")
	private IGameFundRiskService fundRiskService;

	@Resource(name = "gameReturnPointDaoImpl")
	private IGameReturnPointDao gameReturnPointDao;

	@Resource(name = "gameSeriesConfigServiceImpl")
	private IGameSeriesConfigService gameSeriesConfigService;
	
	@Resource(name = "fundChangeLogDaoImpl")
	private IFundChangeLogDao fundChangeLogDao;

	@Resource(name = "httpJsonClientImpl")
	private IHttpJsonClient httpClient;

	@PropertyConfig("url.fund.getUserBal")
	private String getUserBal;

	@PropertyConfig("url.baseFundUrl")
	private String baseFundUrl;

	@Resource(name = "userCustomerDaoImpl")
	private IUserCustomerDao customerDao;

	@Resource(name = "gamePlanDaoImpl")
	private IGamePlanDao gamePlanDao;

	@Resource(name = "gamePlanDetailDaoImpl")
	private IGamePlanDetailDao gamePlanDetailDao;
	@Resource(name = "gamePlanDetailServiceImpl")
	private IGamePlanDetailService gamePlanDetailService; 
	@Resource(name = "gameControlEventServiceImpl")
	private IGameControlEventService gameControlEventService;
	
	@Resource(name = "RedisClient")
	private RedisClient redis;

	@PropertyConfig("url.mmcOpenAwardUrl")
	private String mmcOpenAwardUrl;
	@Resource(name = "gameUserAwardGroupServiceImpl")
	private IGameUserAwardGroupService gameUserAwardGroupService;
	@Resource(name = "gameAwardServiceImpl") 
	private IGameAwardService gameAwardService;
	@Resource(name = "gameBetTypeStatusServiceImpl") 
	private IGameBetTypeStatusService gameBetTypeStatusService;
	@Autowired
	private LockSelector selector;

	@Resource(name = "gameAwardModeCheck") 
	private GameAwardModeCheck gameAwardMode;
	
	@Resource(name = "gameOrderLogServiceImpl")
	private IGameOrderLogService gameOrderLogService;
	
	@Resource(name = "mmcOpenAwardService")
	private IOpenAwardService mmcOpenAwardService;
	
<<<<<<< .mine
	@Resource(name = "gameCheckDrawServiceImpl")
	private IGameCheckDrawService gameCheckDrawService;
	
=======
	@PropertyConfig(value = "key.seperator")
	private String seperator;
	
	@Resource(name = "lotteryWinSlipNumCaculatorFactory")
	private ILotteryWinCaculatorFactory<ILotteryWinSlipNumCaculator> factory;
	
	@Resource(name = "lotteryWinAmountCaculator")
	private LotteryWinAmountCaculator lotteryWinAmountCaculator;
	
	@Resource(name = "gameCheckDrawServiceImpl")
	private IGameCheckDrawService gameCheckDrawService;
	
>>>>>>> .r1412
//	@Resource(name = "gameRevocationOrderServiceImpl")
//	private IGameRevocationOrderNewService gameRevocationOrderService; 
	
	/**
	 * Title: saveGameOrder
	 * Description:
	 * @param gameOrder
	 * @param isGamePackage true:有投注界面投注生成的，false：有追号计划自动生成的订单
	 * @param packageType
	 * @param planId
	 * @return
	 * @throws Exception
	 * @see com.winterframework.firefrog.game.service.IGameOrderService#saveGameOrder(com.winterframework.firefrog.game.entity.GameOrder, boolean, com.winterframework.firefrog.game.entity.GamePackage.GamePackageType, java.lang.Long)
	 */
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public Long saveGameOrder(GameOrder gameOrder, boolean isGamePackage, GamePackageType packageType,
			Long planPackageId) throws Exception {
		log.trace("saveGameOrder4.1:" + new Date());
		if (customerDao.queryUserById(gameOrder.getGamePackage().getUser().getId()).getUserLevel() == 0) {//总代不能投注
			throw new UserTopAgentBetException();
		}

		log.info("saveGameOrder, isGamePackage=" + isGamePackage + ", packageType=" + packageType + ", planPackageId="
				+ planPackageId);

		Long userId = gameOrder.getGamePackage().getUser().getId();
		GamePackage gamePackage = gameOrder.getGamePackage();
		if (isGamePackage) {
			if (gamePackage.getPackageAmount() > getUserBal(userId)) {//判断余额是否足够
				throw new UserBalErrorException();
			}
		}
		com.winterframework.firefrog.game.dao.vo.GameOrder gameOrderVo = VOConverter.goe2gov(gameOrder);
		GameIssueEntity gameIssueEntity = gameIssueDao.queryGameIssue(gameOrderVo.getLotteryid(),
				gameOrderVo.getIssueCode());
		if (gameIssueEntity.getStatus().getValue() >= GameIssueEntity.STATUS_STOP_SALE && isGamePackage) {
			throw new GameIssueStatusStopSaleException();
		}
		if (gameOrderVo.getOrderTime().after(gameIssueEntity.getSaleEndTime()))
		{
			throw new GameIssueStatusStopSaleException();
		}
		
		
		//保存方案详情和方案
		Long packageId = null;
		if (isGamePackage) {
			packageId = savePackageAnditems(gameOrder, packageType);
			gameOrderVo.setParentid(packageId);
		} else {
			gameOrderVo.setParentid(planPackageId);
		}
		String orderCode = snUtil.createSN(SNUtil.TYPE_ORDER, gameOrder.getLottery().getLotteryId(),
				gameIssueEntity.getWebIssueCode());
		//校验订单编号是否存在
		List<com.winterframework.firefrog.game.dao.vo.GameOrder> gameOrderList = gameOrderDao
				.getGameOrderByOrderCode(orderCode);
		if (gameOrderList != null && !gameOrderList.isEmpty()) {
			log.error("方案编号，订单编号或追号编号已经存在:" + orderCode);
			String key = snUtil.getKey(SNUtil.TYPE_ORDER, gameOrder.getLottery().getLotteryId(), gameOrder
					.getGameIssue().getWebIssueCode(), new StringBuilder(1024));
			redis.getIncre(key);
			throw new GameOrderOrPlanCodeExistErrorException();
		}
		gameOrderVo.setOrderCode(orderCode);
		//生成订单
		GameSeriesConfigEntity gse = gameSeriesConfigService.getSeriesConfigByLotteryId(gameOrderVo.getLotteryid());
		gameOrderVo.setEndCanCancelTime(this.getEndCanCancelTime(gameIssueEntity.getSaleEndTime(),
				gameOrderVo.getLotteryid(), gse));
		gameOrderVo.setAdminCanCancelTime(gse.getIssuewarnBackoutTime());
		log.trace("saveGameOrder4.4:" + new Date());
		Double cancelFee = this.getCancelOrderCharge(gameOrderVo.getLotteryid(),
				Double.valueOf(gameOrder.getTotalAmount() + ""));
		gameOrderVo.setCancelFee(cancelFee.longValue());
		Long orderid = gameOrderDao.saveGameOrder(gameOrderVo);
		log.info("生成订单 息成功，orderid = " + orderid);
		gameOrder.setOrderCode(orderCode);
		gameOrder.getGameIssue().setWebIssueCode(gameIssueEntity.getWebIssueCode());

		//生成订单详情
		log.info("开始生成注单信息，orderid=" + orderid + ", gameOrderDetails.size = " + gameOrder.getSlipList().size());
		gameSlipDao.saveSlipList(gameOrder.getSlipList(), orderid);
		//记录用户代理层级链的返点信息
		String userChainAndRetPointChain = gameReturnPointDao.saveGameOrderUserReturnPoint(gameOrder.getSlipList(),
				orderid);
		log.trace("saveGameOrder4.5:" + new Date());
		// 当产生订单时候,对投注资金进行冻结,同时对返点进行冻结,发送给审核中心调用fundRiskService
		String[] temp = userChainAndRetPointChain.split("/");//获取返点用户链 和返点金额链
		//返点
		List<TORiskDTO> toRiskDTOList = new ArrayList<TORiskDTO>();

		if (isGamePackage) {
			//对于订单投注 生成投注冻结
			//投注DTO生成
			TORiskDTO freezerOrderDTO = new TORiskDTO();
			freezerOrderDTO.setAmount(gameOrderVo.getTotamount() + "");
			freezerOrderDTO.setIssueCode(gameOrderVo.getIssueCode());
			freezerOrderDTO.setLotteryid(gameOrderVo.getLotteryid());
			freezerOrderDTO.setOrderCodeList(gameOrderVo.getOrderCode());
			freezerOrderDTO.setType(GameFundTypesUtils.GAME_BET_FREEZER_DETEAIL_TYPE);
			freezerOrderDTO.setUserid(gameOrderVo.getUserid() + "");
			toRiskDTOList.add(freezerOrderDTO);

			//返点DTO生成
			TORiskDTO retPointDTO = new TORiskDTO();
			retPointDTO.setAmount(temp[1]);
			retPointDTO.setIssueCode(gameOrderVo.getIssueCode());
			retPointDTO.setLotteryid(gameOrderVo.getLotteryid());
			retPointDTO.setOrderCodeList(gameOrderVo.getOrderCode());
			retPointDTO.setType(GameFundTypesUtils.GAME_RET_FREEZER_DETEAIL_TYPE);
			retPointDTO.setUserid(temp[0]);

			toRiskDTOList.add(retPointDTO);

			log.info("开始生成注单信息，orderid=" + orderid + ", 开始发送风控系统， 用户连=" + temp + ",type1 = "
					+ GameFundTypesUtils.GAME_BET_FREEZER_DETEAIL_TYPE + ", type2 ="
					+ GameFundTypesUtils.GAME_RET_FREEZER_DETEAIL_TYPE);
			log.trace("saveGameOrder4.5risk:" + new Date());
			//调用风控资金冻结接口
			fundRiskService.betAmountFreezer(toRiskDTOList);
			log.trace("saveGameOrder4.6:" + new Date());
		}
		log.info("saveGameOrder4.6:" + new Date());
		return orderid;
	}

	public static String randomSSC(String[] numbers,int count,String split){
		
		int numSize = numbers.length;
		Random random = new Random();
		StringBuffer sb  = new StringBuffer();
		for(int i=0;i<count;i++){
			sb.append(numbers[random.nextInt(numSize)]);
			if(i != (count-1)){
				sb.append(split);
			}
		}
		return sb.toString();
	}
	
	/** 
	 *获取随机开奖号码
	 * @param anumberRecord
	 * @return
	 */
	public static String random11X5(List<String> numbers,int count,String split){
		
		Map<Integer,Integer> map = new HashMap<Integer,Integer>();
		
		StringBuffer sb  = new StringBuffer();
		
		for(int i=0;i<count;i++){
			
			sb.append(getAvaiNum(map,numbers));
			
			if(i != (count-1)){
				sb.append(split);
			}
		}
		
		return sb.toString();
	}

	/**
	 * 获取数组中不重的下标
	 * @param map
	 * @param numbers
	 * @return
	 */
	public static String getAvaiNum(Map<Integer,Integer> map,List<String> numbers){
		
		
		int numSize = numbers.size();
		Random random = new Random();
		int numbersPos = random.nextInt(numSize-1);
		
		String retStr = numbers.get(numbersPos);
		
		numbers.remove(numbersPos);
		
		
		return retStr;
	}

	/** 
	* @Title: saveMMCGameOrder 
	* @Description: 秒秒彩投注保存
	* @param gameOrder
	* @param isGamePackage
	* @param packageType
	* @return
	* @throws Exception
	*/
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public Long saveMMCGameOrder(GameOrder gameOrder, boolean isGamePackage, GamePackageType packageType)
			throws Exception {

		String tempOc = OrderCodeMultMd5.to62Digit(System.nanoTime());
		String orderCode = "DSLC" + tempOc;
		if(gameOrder.getLottery().getLotteryId()==99306){
			orderCode = "DSL5" + tempOc;
		}else if(gameOrder.getLottery().getLotteryId()==99113){
			orderCode = "DMMC" + tempOc;
		}
		//获取开奖号码
		String numberRecord = "";
		String isSimulateDraw = System.getProperty("simulateDraw");  
		if("true".equals(isSimulateDraw)){
			//模拟开奖  本地运行测试可放开注释
			numberRecord = randomSSC(new String[]{"0","1","2","3","4","5","6","7","8","9"},5,"");
			if(gameOrder.getLottery().getLotteryId()==99306){
				numberRecord = random11X5(new ArrayList<String>(Arrays.asList("01","02","03","04","05","06","07","08","09","10","11")),5,",");
			}
		}else{
			
//			numberRecord = mmcDrawService.getMmc(gameOrder.getLottery().getLotteryId(),orderCode, gameOrder.getSaleTime());
			numberRecord = mmcDrawService.getBall(gameOrder.getLottery().getLotteryId(),orderCode);
		}
		//				String numberRecord="12345";
		if (StringUtils.isEmpty(numberRecord)) {
			throw new Exception();
		}

		if (customerDao.queryUserById(gameOrder.getGamePackage().getUser().getId()).getUserLevel() == 0) {//总代不能投注
			throw new UserTopAgentBetException();
		}

		log.info("saveGameOrder, isGamePackage=" + isGamePackage + ", packageType=" + packageType);

		Long userId = gameOrder.getGamePackage().getUser().getId();
		GamePackage gamePackage = gameOrder.getGamePackage();
		if (isGamePackage) {
			if (gamePackage.getPackageAmount() > getUserBal(userId)) {//判断余额是否足够
				throw new UserBalErrorException();
			}
		}
		com.winterframework.firefrog.game.dao.vo.GameOrder gameOrderVo = VOConverter.goe2gov(gameOrder);

		//创建奖期数据
		//保存方案详情和方案
		Long packageId = null;
		if (isGamePackage) {
			packageId = saveMMCPackageAnditems(gameOrder, packageType);
			gameOrderVo.setParentid(packageId);
		}
		//校验订单编号是否存在
		List<com.winterframework.firefrog.game.dao.vo.GameOrder> gameOrderList = gameOrderDao
				.getGameOrderByOrderCode(orderCode);
		if (gameOrderList != null && !gameOrderList.isEmpty()) {
			log.error("方案编号，订单编号或追号编号已经存在:" + orderCode);
			throw new GameOrderOrPlanCodeExistErrorException();
		}
		gameOrderVo.setOrderCode(orderCode);
		Double cancelFee = this.getCancelOrderCharge(gameOrderVo.getLotteryid(),
				Double.valueOf(gameOrder.getTotalAmount() + ""));
		gameOrderVo.setCancelFee(cancelFee.longValue());
		//生成订单
		gameOrderVo.setEndCanCancelTime(new Date());
		Long orderid = gameOrderDao.saveMMCGameOrder(gameOrderVo);
		log.info("生成订单 息成功，orderid = " + orderid);

		//生成订单详情
		log.info("开始生成注单信息，orderid=" + orderid + ", gameOrderDetails.size = " + gameOrder.getSlipList().size());
		gameSlipDao.saveSlipList(gameOrder.getSlipList(), orderid);
		
		
		//ADD BY David 16.04.26 #7332 4.0前台代理报表查询 新增查询功能 玩法 分類 : 計算單一注單返點 (BY USER) Start
		for(int i =0; i<gameOrder.getSlipList().size(); i++ ){
			gameOrder.getSlipList().get(i).getGameOrder().setOrderCode(orderCode);
			gameOrder.getSlipList().get(i).getGameOrder().getGameIssue().setIssueCode(gameOrderVo.getIssueCode());
		}
		
		//预开奖处理 防止平台亏损过大
		
		if(gameOrder.getLottery().getLotteryId()==99112){
			log.error("mmc killmode begin");
			String killMode=redis.get("mmcKillMode");
			if (killMode==null) {
				killMode="0";
			}
			if(killMode.equals("1")) {
			log.error("mmc killmode :"+"第一次開獎");
			Long value =gameCheckDrawService.preCalculateWin(numberRecord, orderid);
			log.error("mmc killmode :"+"第一次結束");
			if(value>0) {
				log.error("mmc killmode :"+"第二次開獎");
				String number2=randomSSC(new String[]{"0","1","2","3","4","5","6","7","8","9"},5,"");
				Long value2 =gameCheckDrawService.preCalculateWin(number2, orderid);
				log.error("mmc killmode :"+"第二次結束"+value2+"--"+number2);
				if(value2==0) {
					numberRecord=number2;
				}else {
					log.error("mmc killmode :"+"第三次開獎");
					String number3=randomSSC(new String[]{"0","1","2","3","4","5","6","7","8","9"},5,"");
					Long value3 =gameCheckDrawService.preCalculateWin(number3, orderid);
					log.error("mmc killmode :"+"第三次次結束"+value3+"--"+number3);
					if(value3==0) {
						numberRecord=number3;
					}else {
						if(value3<value2&&value3<value) {
							numberRecord=number3;
						}else if(value2<value3&&value2<value) {
							numberRecord=number2;
						}
					}
					
				}
			}
			log.error("mmc killmode value  ==="+value);
		}
		log.error("mmc killmode end");
		
		}
		
		
		if(gameOrder.getLottery().getLotteryId()==99306) {
			log.error("mmc killmode begin");
			String mc115killMode=redis.get("mc115KillMode");
			if (mc115killMode==null) {
				mc115killMode="0";
			}
		   if(mc115killMode.equals("1")) {
			log.error("mc115 killmode :"+"第一次開獎");
			Long value =gameCheckDrawService.preCalculateWin(numberRecord, orderid);
			log.error("mc115 killmode :"+"第一次結束");
			if(value>0) {
				log.error("mc115 killmode :"+"第二次開獎");
				String number2=random11X5(new ArrayList<String>(Arrays.asList("01","02","03","04","05","06","07","08","09","10","11")),5,",");
				Long value2 =gameCheckDrawService.preCalculateWin(number2, orderid);
				log.error("mc115 killmode :"+"第二次結束"+value2+"--"+number2);
				if(value2==0) {
					numberRecord=number2;
				}else {
					log.error("mc115 killmode :"+"第三次開獎");
					String number3=random11X5(new ArrayList<String>(Arrays.asList("01","02","03","04","05","06","07","08","09","10","11")),5,",");
					Long value3 =gameCheckDrawService.preCalculateWin(number3, orderid);
					log.error("mc115 killmode :"+"第三次次結束"+value3+"--"+number3);
					if(value3==0) {
						numberRecord=number3;
					}else {
						if(value3<value2&&value3<value) {
							numberRecord=number3;
						}else if(value2<value3&&value2<value) {
							numberRecord=number2;
						}
					}
					
				}
			}
			log.error("mc115 killmode value  ==="+value);
		}
		log.error("mc115 killmode end");
		}
		
		
		//ADD BY David 16.04.26 #7332 4.0前台代理报表查询 新增查询功能 玩法 分類 : 計算單一注單返點 (BY USER) End
		//记录用户代理层级链的返点信息
		String userChainAndRetPointChain = gameReturnPointDao.saveGameOrderUserReturnPoint(gameOrder.getSlipList(),
				orderid);

		// 当产生订单时候,对投注资金进行冻结,同时对返点进行冻结,发送给审核中心调用fundRiskService
		String[] temp = userChainAndRetPointChain.split("/");//获取返点用户链 和返点金额链
		//Long winAmount=gameCheckDrawService.preCalculateWin(numberRecord, orderid);
		//返点
		createGameIssue(orderid, RequestContext.getCurrUser().getId(), gameOrder.getLottery().getLotteryId(),
				numberRecord);
		List<TORiskDTO> toRiskDTOList = new ArrayList<TORiskDTO>();

		if (isGamePackage) {
			//对于订单投注 生成投注冻结
			//投注DTO生成
			TORiskDTO freezerOrderDTO = new TORiskDTO();
			freezerOrderDTO.setAmount(gameOrderVo.getTotamount() + "");
			freezerOrderDTO.setIssueCode(gameOrderVo.getIssueCode());
			freezerOrderDTO.setLotteryid(gameOrderVo.getLotteryid());
			freezerOrderDTO.setOrderCodeList(gameOrderVo.getOrderCode());
			freezerOrderDTO.setType(GameFundTypesUtils.GAME_BET_FREEZER_DETEAIL_TYPE);
			freezerOrderDTO.setUserid(gameOrderVo.getUserid() + "");
			toRiskDTOList.add(freezerOrderDTO);

			//返点DTO生成
			TORiskDTO retPointDTO = new TORiskDTO();
			retPointDTO.setAmount(temp[1]);
			retPointDTO.setIssueCode(gameOrderVo.getIssueCode());
			retPointDTO.setLotteryid(gameOrderVo.getLotteryid());
			retPointDTO.setOrderCodeList(gameOrderVo.getOrderCode());
			retPointDTO.setType(GameFundTypesUtils.GAME_RET_FREEZER_DETEAIL_TYPE);
			retPointDTO.setUserid(temp[0]);

			toRiskDTOList.add(retPointDTO);

			log.info("开始生成注单信息，orderid=" + orderid + ", 开始发送风控系统， 用户连=" + temp + ",type1 = "
					+ GameFundTypesUtils.GAME_BET_FREEZER_DETEAIL_TYPE + ", type2 ="
					+ GameFundTypesUtils.GAME_RET_FREEZER_DETEAIL_TYPE);
			//调用风控资金冻结接口
			fundRiskService.betAmountFreezer(toRiskDTOList);
		}
		return orderid;
	}

//	@Override
//	public Response<TaskOpenAwardResponse> mmcOpenAward(Long orderid) throws Exception {
//		TaskOpenAwardRequest request = new TaskOpenAwardRequest();
//		request.setOrderId(orderid);
//		Response<TaskOpenAwardResponse> response = httpClient.invokeHttp(mmcOpenAwardUrl, request,
//				TaskOpenAwardResponse.class);
//		return response;
//	}
	
	@Override
	public boolean mmcOpenAward(Long orderid) throws Exception {
		try {
			ProcessResult pr = mmcOpenAwardService.openAward(orderid);
			if (pr.isSuccess()) {
				log.debug("秒秒彩开奖调用执行成功  orderId = " + orderid);
				return true;
			} else {
				log.error("秒秒彩失敗:"+Integer.parseInt(pr.getRetCode()));
				log.error("秒秒彩失敗:"+pr.getRetMsg());
				return false;
			}
		} catch(GameRiskException e1){
			log.error("秒秒彩失敗:-4");
			log.error("秒秒彩失敗:调用资金系统出错");
		} catch (Exception e) {
			log.error("秒秒彩失敗:-1000");
			String message = "秒秒彩开奖调用执行失败  orderId = " + orderid + " " + e.getMessage();
			log.error("秒秒彩失敗:"+message, e);
		}
		return false;
	}
	
	

	private void createGameIssue(Long orderid, Long userId, Long lotteryId, String numberRecord) {
		GameIssue gi = new GameIssue();
		gi.setSaleStartTime(new Date());
		gi.setSaleEndTime(new Date());
		gi.setOpenDrawTime(new Date());
		gi.setSequence(1L);
		gi.setIssueCode(orderid);
		gi.setWebIssueCode(orderid + "");
		gi.setLotteryid(lotteryId);
		gi.setCreateTime(new Date());
		gi.setUpdateTime(gi.getCreateTime());
		gi.setStatus(3L);
		gi.setPeriodStatus(2L);
		gi.setPauseStatus(1);
		gi.setEventStatus(1);
		gi.setPlanFinishStatus(0);
		gi.setLastIssueStop(0);
		gi.setPreNumberRecord(numberRecord);
		gi.setNumberRecord(numberRecord);
		gi.setNumberUpdateTime(DateUtils.currentDate());
		gi.setNumberUpdateCount(1L);
		gi.setUserId(userId);
		gameIssueDao.insert(gi);
	}

	private Date getEndCanCancelTime(Date saleEndTime, Long lotteryId, GameSeriesConfigEntity gse) throws Exception {
		Long cancelTime = gse.getIssuewarnUserBackoutTime();//单位为秒
		if (cancelTime != null) {
			return DateUtils.addSeconds(saleEndTime, -cancelTime.intValue());
		} else {
			return saleEndTime;
		}
	}

	@Override
	public Long getUserBal(Long userId) throws Exception {
		/*Response<Long> response = new Response<Long>();
		try {
			if (null != userId) {
				response = httpClient.invokeHttp(baseFundUrl + getUserBal, userId, Long.class);
				return response.getBody().getResult().longValue();
			} else {
				throw new RuntimeException("getUserBal error");
			}
		} catch (Exception e) {
			log.error("getUserBal error:", e);
			return 0L;
		}*/
		return 10000000000L;
	}

	/**
	 * 设置投注奖金组ID
	 * @param gameOrder
	 * @throws Exception
	 */
	@Override
	public void setAwardGroup(GameOrder gameOrder) throws Exception {
		Long userId=gameOrder.getGamePackage().getUser().getId();
		Long lotteryId=gameOrder.getLottery().getLotteryId();
		GameUserAwardGroup awardGroup = gameUserAwardGroupService.getBetedByUserIdAndLotteryId(userId,lotteryId);
		if(null==awardGroup){
			throw new Exception("user award group not exists. userId="+userId+" lotteryId="+lotteryId);
		}
		gameOrder.setAwardGroupId(awardGroup.getSysGroupAwardId());
		gameOrder.getGamePackage().setAwardId(awardGroup.getSysGroupAwardId());
	}
	/**
	 * 设置返点奖金
	 * @param gameOrder
	 * @throws Exception
	 */
	private void setRetAward(GameOrder gameOrder) throws Exception {
		Long lotteryId=gameOrder.getLottery().getLotteryId();
		Long userId=gameOrder.getGamePackage().getUser().getId(); 
		List<GamePackageItem> packageItemList=gameOrder.getGamePackage().getItemList();
		List<GameSlip> slipList = gameOrder.getSlipList();
		if(null==packageItemList || packageItemList.size()<1){
			throw new Exception("bet error:package item is missing. userId="+userId+" lotteryId="+lotteryId);
		}
		/*缺少packageItem 与slip关联关系 转GameSlipDaoImpl再来一遍
		List<GameSlip> slipList=gameOrder.getSlipList();
		if(null==slipList || slipList.size()<1){
			throw new Exception("bet error:slip is missing. userId="+userId+" lotteryId="+lotteryId);
		}*/
		for(GamePackageItem packageItem:packageItemList){
			String betTypeCode=packageItem.getGameBetType().getBetTypeCode();
			//if(gameAwardMode.checkAwardMode(gameOrder.getAwardGroupId().toString(),betTypeCode)){
			Long retPoint = 0l ;
			if(lotteryId == 99701){
				retPoint = gameUserAwardGroupService.getRetPointByUserIdAndLotteryIdAndBetTypeCodeAndMultiple(userId, lotteryId, betTypeCode,packageItem.getOdds().longValue()*10000);
			}else{
				retPoint = gameUserAwardGroupService.getRetPointByUserIdAndLotteryIdAndBetTypeCode(userId, lotteryId, betTypeCode);
			}
			
			packageItem.setRetPoint(retPoint);
			/*x下移至保存时处理（辅助玩法）
			 * if(com.winterframework.firefrog.game.dao.vo.GamePackageItem.AwardMode.HIGH.getValue()==packageItem.getAwardMode().intValue()){
				GameBettypeStatus betTypeStatus=gameBetTypeStatusService.getByLotteryIdAndBetTypeCode(lotteryId, betTypeCode);
				packageItem.setRetAward(betTypeStatus.getTheoryBonus()*retPoint/10000);
			}*/
			/*}else{
				packageItem.setAwardMode(1);
			}*/
		}
		for(GameSlip slip : slipList){
			String slipbetTypeCode=slip.getGameBetType().getBetTypeCode();
			if(!gameAwardMode.checkAwardMode(gameOrder.getAwardGroupId().toString(),slipbetTypeCode)){
				slip.setAwardMode(1);
			}
		}
	}
	@Override
	public Long saveGameOrder(GameOrder gameOrder) throws Exception {
		setAwardGroup(gameOrder);
		setRetAward(gameOrder);
		if (gameOrder.getLottery().getLotteryId() == 99112||gameOrder.getLottery().getLotteryId() == 99306
				||gameOrder.getLottery().getLotteryId() == 99113) {//秒秒彩
			return saveMMCGameOrder(gameOrder, true, GamePackageType.PACKAGES);
		} else {//其他彩种
			long ret = saveGameOrder(gameOrder, true, GamePackageType.PACKAGES, null);
//			log.error("..........." + gameOrder.getGamePackage().getUser().getId());
//			GameOrder newGameOrder = GameOrderSimulate.createGO(gameOrder);
//			saveGameOrder(newGameOrder, true, GamePackageType.PACKAGES, null);
//			log.error("..........." + newGameOrder.getGamePackage().getPackageAmount());
//			for(int i=0;i<10;i++){
//				GameOrder newGameOrder = GameOrderSimulate.createGO(gameOrder);
//				log.error("..........." + newGameOrder.getGamePackage().getUser().getId());
//				saveGameOrder(newGameOrder, true, GamePackageType.PACKAGES, null);
//			}
			return ret;
		}
	}

	private Long savePackageAnditems(GameOrder gameOrder, GamePackageType packageType) throws Exception {
		GamePackage gamePackage = gameOrder.getGamePackage();
		GameIssueEntity gameIssueEntity = gameIssueDao.queryGameIssue(gameOrder.getLottery().getLotteryId(), gameOrder
				.getGameIssue().getIssueCode());
		String packageCode = snUtil.createSN(SNUtil.TYPE_PACKAGE, gameOrder.getLottery().getLotteryId(),
				gameIssueEntity.getWebIssueCode());
		//检查追号订单号是否已经存在
		List<com.winterframework.firefrog.game.dao.vo.GamePackage> gamePackageList = gamePackageDao
				.getGamePackageByPackageCode(packageCode);
		if (gamePackageList != null && !gamePackageList.isEmpty()) {
			log.error("方案编号，订单编号或追号编号已经存在:" + packageCode);
			throw new GameOrderOrPlanCodeExistErrorException();
		}

		gamePackage.setPackageCode(packageCode);

		//设置返点链以及客户返点链
		User user = customerDao.queryUserById(gamePackage.getUser().getId());
		String userChain = user.getUserProfile().getUserChain();
		String retUserChain = gameReturnPointDao.getRetunPointChain(gamePackage.getItemList(), userChain);
		gamePackage.setRetUserChain(retUserChain);

		Long gamePackageId = gamePackageDao.savePackage(gamePackage);
		//2.生成方案明细表
		saveGamePackageItems(gamePackage.getItemList(), gamePackageId, gamePackage);
		return gamePackageId;
	}

	private Long saveMMCPackageAnditems(GameOrder gameOrder, GamePackageType packageType) throws Exception {
		GamePackage gamePackage = gameOrder.getGamePackage();
		String tempPc = OrderCodeMultMd5.to62Digit(System.currentTimeMillis());
		String packageCode = "PSLC" + tempPc;
		//检查追号订单号是否已经存在
		List<com.winterframework.firefrog.game.dao.vo.GamePackage> gamePackageList = gamePackageDao
				.getGamePackageByPackageCode(packageCode);
		if (gamePackageList != null && !gamePackageList.isEmpty()) {
			log.error("方案编号，订单编号或追号编号已经存在:" + packageCode);
			throw new GameOrderOrPlanCodeExistErrorException();
		}

		gamePackage.setPackageCode(packageCode);

		//设置返点链以及客户返点链
		User user = customerDao.queryUserById(gamePackage.getUser().getId());
		String userChain = user.getUserProfile().getUserChain();
		String retUserChain = gameReturnPointDao.getRetunPointChain(gamePackage.getItemList(), userChain);
		gamePackage.setRetUserChain(retUserChain);

		Long gamePackageId = gamePackageDao.saveMMCPackage(gamePackage);
		//2.生成方案明细表
		saveGamePackageItems(gamePackage.getItemList(), gamePackageId, gamePackage);
		return gamePackageId;
	}

	private void saveGamePackageItems(List<GamePackageItem> packageItemList, Long gamePackageId, GamePackage gamePackage)
			throws Exception {
		List<GamePackageItem> list = new ArrayList<GamePackageItem>();
		for (GamePackageItem betDetail : packageItemList) {
			betDetail.getGamePackage().setPackageId(gamePackageId);  
			list.add(betDetail);
		}
		gamePackageItemDao.savePackageitemList(list, gamePackage);
	}

	@Override
	public Page<GameOrder> queryOrders(PageRequest<GameOrderQueryDTO> pr) throws Exception {
		Page<GameOrder> page = gameOrderDao.getOrders(pr);
		return page;
	}

	@Override
	public GameOrder queryOrder(long orderId, Long userId) throws Exception {
		GameOrder goe = gameOrderDao.getOrderByOrderIdAndUserId(orderId, userId);
		return goe;
	}

	@Override
	public List<GameSlip> querySlipsByOrderId(long orderId) {
		List<com.winterframework.firefrog.game.entity.GameSlip> gods = gameSlipDaoImpl.getSlipsByOrderId(orderId);
		return gods;
	}
	
	@Override
	public List<GameSlip> querySlipsByMap(Map<String ,Object> map) {
		List<com.winterframework.firefrog.game.entity.GameSlip> gods = gameSlipDaoImpl.getSlipsByMap(map);
		return gods;
	}
	
	@Override
	public List<GameSlip> querySlips(long lotteryId, long userId, long issueCode, int status) {
		return gameSlipDaoImpl.querySlips(lotteryId, userId, issueCode, status);
	}
	
	@Override
	public List<GameSlip> querySlipsByCondition(long lotteryId, long userId, long issueCode, String betTypeCode, String betdetail, int status) {
		return gameSlipDaoImpl.querySlipsByCondition(lotteryId, userId, issueCode, betTypeCode, betdetail, status);
	}

	@Override
	public List<GameOrder> queryOrdersByPlanId(long planId) {
		List<GameOrder> gameOrders = gameOrderDao.getOrdersByPlanId(planId);
		return gameOrders;
	}

	@Override
	@Transactional(rollbackFor = Exception.class,timeout=30)
	public void cancelOrder(Long orderId, Long cancelTime, Long userId, boolean isFrontUser) throws Exception { 
		GameOrder gameOrder = gameOrderDao.getOrderById(orderId);

		Date drawTime = gameOrder.getGameIssue().getFactionDrawTime();
		GameSeriesConfigEntity gse = gameSeriesConfigService.getSeriesConfigByLotteryId(gameOrder.getLottery()
				.getLotteryId());
		Long backoutTime = gse.getIssuewarnBackoutTime();
		if (drawTime != null && backoutTime != null) {
			Date now = new Date();
			if (now.getTime() > drawTime.getTime() + backoutTime * 60 * 1000) {
				throw new GameCancalOutTimeErrorException();
			}

		}

		if (isFrontUser) {
			if (gameOrder.getGamePackage().getUser().getId().longValue() != userId) {//防止非当前订单用户取消订单
				throw new GameCancelOrderPermitErrorException();
			}
			if (gameOrder.getEndCanCancelTime().getTime() < new Date().getTime()) {
				throw new GameCancalOutTimeErrorException();
			}
		}

		if (gameOrder.getStatus().getValue() == 4) {
			throw new GameOrderStatusErrorException();
		}
		int count=gameOrderDao.updateOrderCancel(orderId, gameOrder.getGameIssue().getIssueCode(), cancelTime,isFrontUser);
		if(count==0){
			throw new GameOrderStatusErrorException();
		}
		LotteryLockService lockService = selector.getRealService(gameOrder.getLottery().getLotteryId());
		if (lockService != null) {
			//封锁变价信息撤销。
			lockService.undoLock(gameOrder.getLottery().getLotteryId(), gameOrder.getGameIssue().getIssueCode(),
					gameOrder.getGamePackage().getUser().getId(), orderId);
		} 
		//假如订单属于计划需要处理追号的数据
		GamePlan gamePlan = gamePlanDao.getGamePlanByOrderId(gameOrder.getId());
		
		//追號單撤銷數
		int planCount =0;
		
		if (gamePlan != null) {
			GamePlanDetail gamePlanDetail = gamePlanDetailDao
					.getGamePlanDetailByPlanIdAndIssueCode(gamePlan.getId(), gameOrder.getGameIssue().getIssueCode());
			if(gamePlanDetail.getStatus() != com.winterframework.firefrog.game.entity.GamePlanDetail.GamePlanDetailStatus.WAIT_CANCEL.getValue()){
				List<String> issueList  = new ArrayList<String>();
				issueList.add(gameOrder.getGameIssue().getIssueCode().toString());
				int cancelDetailCount = gamePlanDetailDao.updateOrderReservationCalledGamePlanDetailStatusByPlanIdAndIssueCode(gamePlan.getId(), issueList, userId + "");
				log.debug("變更追號單為待撤銷狀態 planId:"+gamePlan.getId()+",issueCode:"+gameOrder.getGameIssue().getIssueCode());
				if(count == 0){
					log.error("撤銷失敗 planid:"+gamePlan.getId()+",issueCode:"+gameOrder.getGameIssue().getIssueCode());
					throw new Exception("更改狀態失敗");
				}
			}
			planCount = gamePlanDetailDao.updateGamePlanDetailByPlanIdAndIssueCodeForOrderCancel(gamePlan.getId(), gameOrder.getGameIssue()
					.getIssueCode(), userId + "");
			
			Map<String,Long> summaryMap=gamePlanDetailService.getSummary(gamePlan.getId());
			if(summaryMap!=null){
				Long soldAmount=summaryMap.get("soldAmount");
				Long finishedCount=summaryMap.get("finishedCount");
				Long canceledAmount=summaryMap.get("canceledAmount"); 
				Long canceledCount=summaryMap.get("canceledCount"); 
				
				gamePlan.setCanceledAmount(canceledAmount);
				gamePlan.setCancelIssue(canceledCount.intValue()); 
				gamePlan.setFinishIssue(finishedCount.intValue());
				gamePlan.setSoldAmount(soldAmount);
				if(canceledCount.intValue()+finishedCount.intValue()==gamePlan.getTotalIssue().intValue()){
					gamePlan.setStatus(com.winterframework.firefrog.game.dao.vo.GamePlan.Status.FINISH
							.getValue());
				}
				//中奖订单撤销 
				if (gameOrder.getTotalWin() != null) { 
					gamePlan.setWinAmount((gamePlan.getWinAmount()!=null && (gamePlan.getWinAmount().longValue()-gameOrder.getTotalWin().longValue())>0)?gamePlan.getWinAmount().longValue()-gameOrder.getTotalWin().longValue():0);
				}
				gamePlan.setUpdateTime(DateUtils.currentDate()); 
				gamePlanDao.update(gamePlan);
			} 
			
			//中奖&追中即停&非最后一期撤单则生成追号任务
			try{
				if(gameOrder.getStatus().getValue() ==GameOrder.OrderStatus.PRIZE.getValue() && gamePlan.getStopMode().intValue()==GamePlan.StopMode.WIN.getValue()){
					List<GamePlanDetail> planDetailList=gamePlanDetailService.getGamePlanDetailsByPlanId(gamePlan.getId());
					if(planDetailList!=null && planDetailList.size()>0){
						if(planDetailList.get(planDetailList.size()-1).getIssueCode().longValue()!=gameOrder.getGameIssue().getIssueCode().longValue()){
							gameControlEventService.addPlanEvent(gamePlan.getLotteryid(),gameOrder.getGameIssue().getIssueCode(),gamePlan.getId());
						}
					} 
				}
			}catch(Exception e){
				log.error("中奖&追中即停&非最后一期撤单则生成追号任务 出错",e);
			}
		}
		List<TORiskDTO> toRiskDTOList = new ArrayList<TORiskDTO>();

		//中奖订单
		if (gameOrder.getStatus().getValue() == OrderStatus.PRIZE.getValue()) {
			TORiskDTO dto = new TORiskDTO();
			dto.setAmount(gameOrder.getTotalWin() + "");
			dto.setIssueCode(gameOrder.getGameIssue().getIssueCode());
			dto.setLotteryid(gameOrder.getLottery().getLotteryId());
			dto.setOrderCodeList(gameOrder.getOrderCode());
			if (gamePlan != null) {
				dto.setPlanCodeList(gamePlan.getPlanCode());
			}
			dto.setUserid(gameOrder.getGamePackage().getUser().getId() + "" + "");
			dto.setType(GameFundTypesUtils.GAME_CANCEL_AWARD_DETEAIL_TYPE);
			toRiskDTOList.add(dto);
		}

		//判断当前奖期状态是否正确
		// 修改 0001326: 游戏管理后台派奖后方案不能进行撤销操作（管理员撤单） 问题
		/*GameIssueEntity ge = gameIssueService.queryGameIssue(gameOrder.getLottery().getLotteryId(), gameOrder
				.getGameIssue().getIssueCode());
		if (ge.getStatus().getValue() >= 7) {//奖期已结束
			throw new GameIssueStatusErrorException();
		}*/ 
		gameSlipDaoImpl.updateGameOrderDetailByOrderId(orderId, gameOrder.getGameIssue().getIssueCode(), cancelTime);

		//解冻冻结订单金额 5005 用户撤单投注资金解冻
 
		//调用审核系统，发送资金信息

		if (gameOrder.getStatus().getValue() == OrderStatus.UN_PRIZE.getValue()
				|| gameOrder.getStatus().getValue() == OrderStatus.PRIZE.getValue()) {
			//解冻冻结订单金额 5005 用户撤单投注资金解冻  当需要收取撤单手续费是发送撤单手续费
			//投注撤销DTO生成
			TORiskDTO unfreezerOrderDTO = new TORiskDTO();
			unfreezerOrderDTO.setAmount(gameOrder.getTotalAmount() + "");
			unfreezerOrderDTO.setIssueCode(gameOrder.getGameIssue().getIssueCode());
			unfreezerOrderDTO.setLotteryid(gameOrder.getLottery().getLotteryId());
			unfreezerOrderDTO.setOrderCodeList(gameOrder.getOrderCode());
			if (gamePlan != null) {
				unfreezerOrderDTO.setPlanCodeList(gamePlan.getPlanCode());
			}
			unfreezerOrderDTO.setType(GameFundTypesUtils.GAME_ADMIN_RETURN_TYPE);
			unfreezerOrderDTO.setUserid(gameOrder.getGamePackage().getUser().getId() + "");
			toRiskDTOList.add(unfreezerOrderDTO);

			//返点DTO生成
			GameRetPoint retPoint = gameReturnPointDao.getRetPointByOrderIdWithOutStatus(orderId);
			TORiskDTO retPointDTO = new TORiskDTO();
			retPointDTO.setAmount(retPoint.getRetPointChain());
			retPointDTO.setIssueCode(gameOrder.getGameIssue().getIssueCode());
			retPointDTO.setLotteryid(gameOrder.getLottery().getLotteryId());
			retPointDTO.setOrderCodeList(gameOrder.getOrderCode());
			if (gamePlan != null) {
				retPointDTO.setPlanCodeList(gamePlan.getPlanCode());
			}
			retPointDTO.setType(GameFundTypesUtils.GAME_CANCEL_RET_DETEAIL_TYPE);
			retPointDTO.setUserid(retPoint.getRetUserChain());
			toRiskDTOList.add(retPointDTO);
		} else {
			//解冻冻结订单金额 5005 用户撤单投注资金解冻  当需要收取撤单手续费是发送撤单手续费
			//投注撤销DTO生成
			TORiskDTO unfreezerOrderDTO = new TORiskDTO();
			unfreezerOrderDTO.setAmount(gameOrder.getTotalAmount() + "");
			unfreezerOrderDTO.setIssueCode(gameOrder.getGameIssue().getIssueCode());
			unfreezerOrderDTO.setLotteryid(gameOrder.getLottery().getLotteryId());
			unfreezerOrderDTO.setOrderCodeList(gameOrder.getOrderCode());
			if (gamePlan != null) {
				unfreezerOrderDTO.setPlanCodeList(gamePlan.getPlanCode());
			}
			if (isFrontUser) {
				unfreezerOrderDTO.setType(GameFundTypesUtils.GAME_USER_CANCEL_BET_UNFREEZER_DETEAIL_TYPE);
			} else {
				unfreezerOrderDTO.setType(GameFundTypesUtils.GAME_ADMIN_UNFREEZER_TYPE);
			}

			unfreezerOrderDTO.setUserid(gameOrder.getGamePackage().getUser().getId() + "");
			toRiskDTOList.add(unfreezerOrderDTO);
		}

		if (isFrontUser) {
			Double amount = getCancelOrderCharge(gameOrder.getLottery().getLotteryId(),
					Double.valueOf(gameOrder.getTotalAmount() + ""));
			if (amount > 0) {
				//撤单手续费DTO生成
				TORiskDTO cancelFeeDTO = new TORiskDTO();
				cancelFeeDTO.setAmount(amount.longValue() + "");
				cancelFeeDTO.setIssueCode(gameOrder.getGameIssue().getIssueCode());
				cancelFeeDTO.setLotteryid(gameOrder.getLottery().getLotteryId());
				cancelFeeDTO.setOrderCodeList(gameOrder.getOrderCode());
				if (gamePlan != null) {
					cancelFeeDTO.setPlanCodeList(gamePlan.getPlanCode());
				}
				cancelFeeDTO.setType(GameFundTypesUtils.GAME_CANCEL_FEE_DETEAIL_TYPE);
				cancelFeeDTO.setUserid(gameOrder.getGamePackage().getUser().getId() + "");
				toRiskDTOList.add(cancelFeeDTO);
			}
		}
		
		//防止追號已撤銷但注單未撤銷
		if( gamePlan == null || (gamePlan!=null && planCount !=0)){
			//调用风控资金撤销接口
			fundRiskService.cancelFee(toRiskDTOList);

			//撤销返点
			gameReturnPointDao.updateGameRetunPointByOrderId(orderId);
		}
		
		try {  
			GameIssue issue=new GameIssue();
			issue.setLotteryid(gameOrder.getLottery().getLotteryId());
			issue.setIssueCode(gameOrder.getGameIssue().getIssueCode());
			GameIssueEntity issueEntity=gameIssueService.queryGameIssue(gameOrder.getLottery().getLotteryId(), gameOrder.getGameIssue().getIssueCode());
			issue.setSaleStartTime(issueEntity.getSaleStartTime());
			issue.setSaleEndTime(issueEntity.getSaleEndTime());
			if(DateUtils.currentDate().after(issueEntity.getSaleEndTime())){	//销售截止之后				
				gameControlEventService.addCreateWinReportEvent(issue);
			}
		} catch (Exception e) {
			log.error("生成奖期盈亏报表事件失败", e);
		}
	} 
	
	
	
	@Override
	@Transactional(rollbackFor = Exception.class,timeout=30)
	public void cancelOrderMMC(Long orderId, Long cancelTime, Long userId, boolean isFrontUser) throws Exception { 
		GameOrder gameOrder = gameOrderDao.getOrderById(orderId);

		Date drawTime = gameOrder.getGameIssue().getFactionDrawTime();
		GameSeriesConfigEntity gse = gameSeriesConfigService.getSeriesConfigByLotteryId(gameOrder.getLottery()
				.getLotteryId());
		Long backoutTime = gse.getIssuewarnBackoutTime();
		if (drawTime != null && backoutTime != null) {
			Date now = new Date();
			if (now.getTime() > drawTime.getTime() + backoutTime * 60 * 1000) {
				throw new GameCancalOutTimeErrorException();
			}

		}

		if (isFrontUser) {
			if (gameOrder.getGamePackage().getUser().getId().longValue() != userId) {//防止非当前订单用户取消订单
				throw new GameCancelOrderPermitErrorException();
			}
			if (gameOrder.getEndCanCancelTime().getTime() < new Date().getTime()) {
				throw new GameCancalOutTimeErrorException();
			}
		}

		if (gameOrder.getStatus().getValue() == 4) {
			throw new GameOrderStatusErrorException();
		}
		int count=gameOrderDao.updateOrderCancel(orderId, gameOrder.getGameIssue().getIssueCode(), cancelTime,isFrontUser);
		if(count==0){
			throw new GameOrderStatusErrorException();
		}
		LotteryLockService lockService = selector.getRealService(gameOrder.getLottery().getLotteryId());
		if (lockService != null) {
			//封锁变价信息撤销。
			lockService.undoLock(gameOrder.getLottery().getLotteryId(), gameOrder.getGameIssue().getIssueCode(),
					gameOrder.getGamePackage().getUser().getId(), orderId);
		} 
		//假如订单属于计划需要处理追号的数据
		GamePlan gamePlan = gamePlanDao.getGamePlanByOrderId(gameOrder.getId());

		if (gamePlan != null) {
			gamePlanDetailDao.updateGamePlanDetailByPlanIdAndIssueCode(gamePlan.getId(), gameOrder.getGameIssue()
					.getIssueCode(), userId + "");
			
			Map<String,Long> summaryMap=gamePlanDetailService.getSummary(gamePlan.getId());
			if(summaryMap!=null){
				Long soldAmount=summaryMap.get("soldAmount");
				Long finishedCount=summaryMap.get("finishedCount");
				Long canceledAmount=summaryMap.get("canceledAmount"); 
				Long canceledCount=summaryMap.get("canceledCount"); 
				
				gamePlan.setCanceledAmount(canceledAmount);
				gamePlan.setCancelIssue(canceledCount.intValue()); 
				gamePlan.setFinishIssue(finishedCount.intValue());
				gamePlan.setSoldAmount(soldAmount);
				if(canceledCount.intValue()+finishedCount.intValue()==gamePlan.getTotalIssue().intValue()){
					gamePlan.setStatus(com.winterframework.firefrog.game.dao.vo.GamePlan.Status.FINISH
							.getValue());
				}
				//中奖订单撤销 
				if (gameOrder.getTotalWin() != null) { 
					gamePlan.setWinAmount((gamePlan.getWinAmount()!=null && (gamePlan.getWinAmount().longValue()-gameOrder.getTotalWin().longValue())>0)?gamePlan.getWinAmount().longValue()-gameOrder.getTotalWin().longValue():0);
				}
				gamePlan.setUpdateTime(DateUtils.currentDate()); 
				gamePlanDao.update(gamePlan);
			} 
			
			//中奖&追中即停&非最后一期撤单则生成追号任务
			try{
				if(gameOrder.getStatus().getValue() ==GameOrder.OrderStatus.PRIZE.getValue() && gamePlan.getStopMode().intValue()==GamePlan.StopMode.WIN.getValue()){
					List<GamePlanDetail> planDetailList=gamePlanDetailService.getGamePlanDetailsByPlanId(gamePlan.getId());
					if(planDetailList!=null && planDetailList.size()>0){
						if(planDetailList.get(planDetailList.size()-1).getIssueCode().longValue()!=gameOrder.getGameIssue().getIssueCode().longValue()){
							gameControlEventService.addPlanEvent(gamePlan.getLotteryid(),gameOrder.getGameIssue().getIssueCode(),gamePlan.getId());
						}
					} 
				}
			}catch(Exception e){
				log.error("中奖&追中即停&非最后一期撤单则生成追号任务 出错",e);
			}
		}
		List<TORiskDTO> toRiskDTOList = new ArrayList<TORiskDTO>();

		//中奖订单
		if (gameOrder.getStatus().getValue() == OrderStatus.PRIZE.getValue()) {
			TORiskDTO dto = new TORiskDTO();
			dto.setAmount(gameOrder.getTotalWin() + "");
			dto.setIssueCode(gameOrder.getGameIssue().getIssueCode());
			dto.setLotteryid(gameOrder.getLottery().getLotteryId());
			dto.setOrderCodeList(gameOrder.getOrderCode());
			if (gamePlan != null) {
				dto.setPlanCodeList(gamePlan.getPlanCode());
			}
			dto.setUserid(gameOrder.getGamePackage().getUser().getId() + "" + "");
			dto.setType(GameFundTypesUtils.GAME_CANCEL_AWARD_DETEAIL_TYPE);
			toRiskDTOList.add(dto);
		}

		//判断当前奖期状态是否正确
		// 修改 0001326: 游戏管理后台派奖后方案不能进行撤销操作（管理员撤单） 问题
		/*GameIssueEntity ge = gameIssueService.queryGameIssue(gameOrder.getLottery().getLotteryId(), gameOrder
				.getGameIssue().getIssueCode());
		if (ge.getStatus().getValue() >= 7) {//奖期已结束
			throw new GameIssueStatusErrorException();
		}*/ 
		gameSlipDaoImpl.updateGameOrderDetailByOrderId(orderId, gameOrder.getGameIssue().getIssueCode(), cancelTime);

		//解冻冻结订单金额 5005 用户撤单投注资金解冻
 
		//调用审核系统，发送资金信息

		if (gameOrder.getStatus().getValue() == OrderStatus.UN_PRIZE.getValue()
				|| gameOrder.getStatus().getValue() == OrderStatus.PRIZE.getValue()) {
			//解冻冻结订单金额 5005 用户撤单投注资金解冻  当需要收取撤单手续费是发送撤单手续费
			//投注撤销DTO生成
			TORiskDTO unfreezerOrderDTO = new TORiskDTO();
			unfreezerOrderDTO.setAmount(gameOrder.getTotalAmount() + "");
			unfreezerOrderDTO.setIssueCode(gameOrder.getGameIssue().getIssueCode());
			unfreezerOrderDTO.setLotteryid(gameOrder.getLottery().getLotteryId());
			unfreezerOrderDTO.setOrderCodeList(gameOrder.getOrderCode());
			if (gamePlan != null) {
				unfreezerOrderDTO.setPlanCodeList(gamePlan.getPlanCode());
			}
			unfreezerOrderDTO.setType(GameFundTypesUtils.GAME_ADMIN_RETURN_TYPE);
			unfreezerOrderDTO.setUserid(gameOrder.getGamePackage().getUser().getId() + "");
			toRiskDTOList.add(unfreezerOrderDTO);

			//返点DTO生成
			GameRetPoint retPoint = gameReturnPointDao.getRetPointByOrderIdWithOutStatus(orderId);
			TORiskDTO retPointDTO = new TORiskDTO();
			retPointDTO.setAmount(retPoint.getRetPointChain());
			retPointDTO.setIssueCode(gameOrder.getGameIssue().getIssueCode());
			retPointDTO.setLotteryid(gameOrder.getLottery().getLotteryId());
			retPointDTO.setOrderCodeList(gameOrder.getOrderCode());
			if (gamePlan != null) {
				retPointDTO.setPlanCodeList(gamePlan.getPlanCode());
			}
			retPointDTO.setType(GameFundTypesUtils.GAME_CANCEL_RET_DETEAIL_TYPE);
			retPointDTO.setUserid(retPoint.getRetUserChain());
			toRiskDTOList.add(retPointDTO);
		} else {
			//解冻冻结订单金额 5005 用户撤单投注资金解冻  当需要收取撤单手续费是发送撤单手续费
			//投注撤销DTO生成
			TORiskDTO unfreezerOrderDTO = new TORiskDTO();
			unfreezerOrderDTO.setAmount(gameOrder.getTotalAmount() + "");
			unfreezerOrderDTO.setIssueCode(gameOrder.getGameIssue().getIssueCode());
			unfreezerOrderDTO.setLotteryid(gameOrder.getLottery().getLotteryId());
			unfreezerOrderDTO.setOrderCodeList(gameOrder.getOrderCode());
			if (gamePlan != null) {
				unfreezerOrderDTO.setPlanCodeList(gamePlan.getPlanCode());
			}
			if (isFrontUser) {
				unfreezerOrderDTO.setType(GameFundTypesUtils.GAME_USER_CANCEL_BET_UNFREEZER_DETEAIL_TYPE);
			} else {
				unfreezerOrderDTO.setType(GameFundTypesUtils.GAME_ADMIN_UNFREEZER_TYPE);
			}

			unfreezerOrderDTO.setUserid(gameOrder.getGamePackage().getUser().getId() + "");
			toRiskDTOList.add(unfreezerOrderDTO);
		}

		if (isFrontUser) {
			Double amount = getCancelOrderCharge(gameOrder.getLottery().getLotteryId(),
					Double.valueOf(gameOrder.getTotalAmount() + ""));
			if (amount > 0) {
				//撤单手续费DTO生成
				TORiskDTO cancelFeeDTO = new TORiskDTO();
				cancelFeeDTO.setAmount(amount.longValue() + "");
				cancelFeeDTO.setIssueCode(gameOrder.getGameIssue().getIssueCode());
				cancelFeeDTO.setLotteryid(gameOrder.getLottery().getLotteryId());
				cancelFeeDTO.setOrderCodeList(gameOrder.getOrderCode());
				if (gamePlan != null) {
					cancelFeeDTO.setPlanCodeList(gamePlan.getPlanCode());
				}
				cancelFeeDTO.setType(GameFundTypesUtils.GAME_CANCEL_FEE_DETEAIL_TYPE);
				cancelFeeDTO.setUserid(gameOrder.getGamePackage().getUser().getId() + "");
				toRiskDTOList.add(cancelFeeDTO);
			}
		}

		//调用风控资金撤销接口
		fundRiskService.cancelFee(toRiskDTOList);

		//撤销返点
		gameReturnPointDao.updateGameRetunPointByOrderId(orderId);  
		
		try {  
			GameIssue issue=new GameIssue();
			issue.setLotteryid(gameOrder.getLottery().getLotteryId());
			issue.setIssueCode(gameOrder.getGameIssue().getIssueCode());
			GameIssueEntity issueEntity=gameIssueService.queryGameIssue(gameOrder.getLottery().getLotteryId(), gameOrder.getGameIssue().getIssueCode());
			issue.setSaleStartTime(issueEntity.getSaleStartTime());
			issue.setSaleEndTime(issueEntity.getSaleEndTime());
			if(DateUtils.currentDate().after(issueEntity.getSaleEndTime())){	//销售截止之后				
				gameControlEventService.addCreateWinReportEvent(issue);
			}
		} catch (Exception e) {
			log.error("生成奖期盈亏报表事件失败", e);
		}
	} 
	
	/**
	 * 刪除秒秒彩撤銷訂單
	 */
	@Override
	@Transactional(rollbackFor = Exception.class,timeout=30)
	public void deleteCancelOrderMMC(Long orderId, Long cancelTime, Long userId, boolean isFrontUser) throws Exception { 
		try {
			log.info("刪除秒秒彩撤銷訂單 Start --"+orderId);
			GameOrder gameOrder = gameOrderDao.getOrderById(orderId);
			GameRetPoint gameRetPoint = gameReturnPointDao.getGameRetPointByGameOrderId(gameOrder.getId());
			if(gameRetPoint != null){
				//刪除gameRetPoint
				gameReturnPointDao.delete(gameRetPoint.getId());
				log.info("刪除gameRetPoint:"+gameRetPoint.getId());
			}
			GameIssue gameIssue = gameIssueDao.getGameIssueByIssueCode(gameOrder.getId());
			if(gameIssue != null){
				//刪除gameIssue
				gameIssueDao.delete(gameIssue.getId());
				log.info("刪除gameIssue:"+gameIssue.getId());
			}
			List<GameSlip> gameSlips = gameSlipDao.getSlipsByOrderId(gameOrder.getId());
			if(gameSlips.size() !=0 ){
				//刪除gameSlip
				gameSlipDao.delSlipByOrderId(gameOrder.getId(), gameOrder.getLottery().getLotteryId());
				log.info("刪除gameSlip:"+gameOrder.getId()+","+ gameOrder.getLottery().getLotteryId());
			}
			
			Long fundChangeCount = fundChangeLogDao.queryCountByExCode(gameOrder.getOrderCode());
			if(fundChangeCount != 0){
				//刪除fundChangeLog
				fundChangeLogDao.deleteByExCode(gameOrder.getOrderCode());
				log.info("刪除fundChangeLog:"+gameOrder.getOrderCode());
			}
			com.winterframework.firefrog.game.dao.vo.GamePackage gamePackage = gamePackageDao.getById(gameOrder.getGamePackage().getPackageId());
			if (gamePackage != null) {
				List<com.winterframework.firefrog.game.dao.vo.GamePackageItem> gamePackageItems = gamePackageItemDao.getPackageItemListByPackageId(gamePackage.getId());
				if (gamePackageItems != null) {
					// 刪除gamePackageItem
					gamePackageItemDao.deleteByPackageId(gamePackage.getId());
					log.info("刪除gamePackageItem:"+gamePackage.getId());
				}
				// 刪除gamePackage
				gamePackageDao.delete(gameOrder.getGamePackage().getPackageId());
				log.info("刪除gamePackage:"+gameOrder.getGamePackage().getPackageId());
			}
			if(gameOrder != null){
				//刪除gameOrder
				gameOrderDao.delete(gameOrder.getId());
				log.info("刪除gameOrder:"+gameOrder.getId());
			}
			log.info("刪除秒秒彩撤銷訂單 end --"+orderId);
		} catch (Exception e) {
			log.error("刪除秒秒彩撤銷訂單錯誤 orderId:"+orderId +",userId:" +userId +",Exception:"+e);
			throw e;
		}
	} 
	
	
	@Override
	public Page<GameOrderOperationsEntity> queryOrderOperations(PageRequest<GameOrderOperationsQueryDTO> pr)
			throws Exception {
		Page<GameOrderOperationsEntity> result = gameOrderDao.getOrderOperations(pr);
		return result;
	}

	@Override
	public List<GameOrderOperationsEntity> queryOrderOperationsList(GameOrderOperationsQueryDTO queryDTO)
			throws Exception {
		List<GameOrderOperationsEntity> list = gameOrderDao.getOrderOperationsList(queryDTO);
		return list;
	}

	@Override
	public GameOrderOperationsEntity queryOrderOperationsDetail(Long orderid) throws Exception {
		GameOrderOperationsEntity entity = gameOrderDao.getOrderOperationsDetail(orderid);
		return entity;
	}

	@Override
	public List<GameSlipOperationsEntity> querySlipOperationsListByOrderID(Long orderid) throws Exception {
		List<GameSlipOperationsEntity> slipEntityList = gameSlipDaoImpl.querySlipOperationsListByOrderID(orderid);
		return slipEntityList;
	}

	@Override
	public Long getPlanIdByOrder(Long orderId) throws Exception {
		return gameOrderDao.getPlanIdByOrder(orderId);
	}

	@Override
	public List<GameOrderOperationsEntity> queryOrderOperationsListByPlanID(Long planid) throws Exception {
		List<GameOrderOperationsEntity> orderEntityList = gameOrderDao.queryOrderOperationsListByPlanID(planid);
		return orderEntityList;
	}

	@Override
	public Double getCancelOrderCharge(Long lotteryId, Double totalBetAmount) throws Exception {
		GameSeriesConfigEntity gse = gameSeriesConfigService.getSeriesConfigByLotteryId(lotteryId);
		if (gse == null) {
			return 0.00D;
		} else {
			if (gse.getBackoutStartFee() == -1l || gse.getBackoutRatio() == -1l) {
				return 0.00D;
			}
			if (totalBetAmount.longValue() <= gse.getBackoutStartFee().longValue()) {
				return 0.00D;
			} else {
				DecimalFormat df = new DecimalFormat(".00");
				//后台撤单时获取撤单手续费，因为金额和撤单率 都*10000 因此需要除以一个10000
				return Double.valueOf(df.format(totalBetAmount * gse.getBackoutRatio() / 10000.00));
			}
		}
	}

	@Override
	public Double getWebCancelOrderCharge(Long lotteryId, Double totalBetAmount) throws Exception {
		GameSeriesConfigEntity gse = gameSeriesConfigService.getSeriesConfigByLotteryId(lotteryId);
		if (gse == null) {
			return 0.00D;
		} else {
			if (gse.getBackoutStartFee() == -1l || gse.getBackoutRatio() == -1l) {
				return Double.valueOf(-1);
			}
			if ((long) (totalBetAmount * 10000) <= gse.getBackoutStartFee().longValue()) {
				return 0.00D;
			} else {
				DecimalFormat df = new DecimalFormat(".00");
				//对于超过免撤单手续的金额所需手续费的计算：(金额)*手续率  因为后台数据都*10000 因此这里需要算回去再显示到页面,保留两位小数
				return Double
						.valueOf(df.format((((long) (totalBetAmount * 10000)) * gse.getBackoutRatio() / 10000.00) / 10000.00));
			}
		}
	}

	@Override
	public com.winterframework.firefrog.game.dao.vo.GameOrder getGameOrderByOrderCode(String orderCode)
			throws Exception {
		List<com.winterframework.firefrog.game.dao.vo.GameOrder> list = gameOrderDao.getGameOrderByOrderCode(orderCode);
		if (list != null && !list.isEmpty()) {
			return list.get(0);
		} else {
			return null;
		}
	}

	@Override
	public Integer getCurrentIssueMutiple(String betDetail, String betTypeCode, long userId, long lotteryId,
			Long issueCode) {
		return gameOrderDao.getCurrentIssueMutiple(betDetail, betTypeCode, userId, lotteryId, issueCode);
	}

	@Override
	public Integer getCurrentIssueMutipleFile(String betDetail, String betTypeCode, long userId, long lotteryId,
			Long issueCode) {
		List<GameSlip> gss = gameSlipDao.getCurrentIssueUserBetRecord(betTypeCode, userId, lotteryId, issueCode);
		Integer mutiple = 0;
		for (GameSlip gs : gss) {
			if (gs.getBetDetail().contains(betDetail)) {
				if (gs.getMoneyMode().getValue() == 1) {
					mutiple += gs.getMultiple() * 10;
				}else if (gs.getMoneyMode().getValue() == 3) {
					mutiple += gs.getMultiple() / 10;
				} else {
					mutiple += gs.getMultiple();
				}
			}
		}
		return mutiple;
	}

	@Override
	public UserBetInfoSumStruc queryUserBetInfoByDate(Long userId, Date startDate) throws Exception {
		List<GameOrderUserBetInfoEntity> list = gameOrderDao.queryUserBetInfoByDate(userId, startDate);
		UserBetInfoSumStruc struc = new UserBetInfoSumStruc();
		struc.setBetAmount(0l);
		struc.setRetPoint(0l);
		struc.setWinAmount(0l);

		for (GameOrderUserBetInfoEntity gameOrderUserBetInfoEntity : list) {
			struc.setBetAmount(struc.getBetAmount() + gameOrderUserBetInfoEntity.getTotamount());
			Long countWin = gameOrderUserBetInfoEntity.getCountWin() == null ? 0l : gameOrderUserBetInfoEntity
					.getCountWin();
			struc.setWinAmount(struc.getWinAmount() + countWin);

			if (gameOrderUserBetInfoEntity.getRetUserChain() != null) {
				Long retPoint = 0l;
				String[] userIdStrs = gameOrderUserBetInfoEntity.getRetUserChain().split(",");
				String[] retPoints = gameOrderUserBetInfoEntity.getRetPointChain().split(",");

				for (int i = 0; i < userIdStrs.length; i++) {
					if (userIdStrs[i].equals(String.valueOf(userId))) {
						retPoint = Long.valueOf(retPoints[i]);
						break;
					}
				}
				struc.setRetPoint(struc.getRetPoint() + retPoint);
			}
		}
		return struc;
	}

	@Override
	public List<String> queryBeginMissionOrder(Map<String,Object> params)
			throws Exception {
		List<String> data= gameOrderDao.queryBeginMissionOrder(params);
		if(data==null){
			data = new ArrayList<String>();
		}
		return data;
	}
	
	public Long queryUserDailyBets(Long userId) throws Exception {
		List<String> bettypecodes = null; 
		List<String> fourLvlBtcs = null;
		bettypecodes = gameBettypeStatusDao.getSuper2000BetTypeCode();
		fourLvlBtcs = gameBettypeStatusDao.getSuper2000FOURLvlBtc();
		bettypecodes.addAll(fourLvlBtcs);
		return gameOrderDao.queryUserDailyBets(userId, bettypecodes);
	}
	
	/**
	 * 更新游戏订单信息。
	* Title: updateGameOrder
	* Description:
	* @param order
	* @throws Exception 
	* @see com.winterframework.firefrog.game.service.IGameOrderService#updateGameOrder(com.winterframework.firefrog.game.dao.vo.GameOrder)
	 */
	@Override
	@Transactional(readOnly = false)
	public void updateGameOrderMMC(com.winterframework.firefrog.game.dao.vo.GameOrder order) throws Exception {

		gameOrderDao.updateMMC(order);

	}

	
	public int addOrderLog(GameContext ctx, com.winterframework.firefrog.game.dao.vo.GameOrder order, String operation,
			String remark) throws Exception {
		log.debug("写订单操作日志");
		if(order==null) return 0;
		GameOrderLog orderLog=new GameOrderLog();
		orderLog.setOrderId(order.getId());
		orderLog.setOperation(operation);
		orderLog.setRemark(remark);
		orderLog.setUserId(-1L);
		orderLog.setCreateTime(DateUtils.currentDate());
		this.gameOrderLogService.save(ctx,orderLog);
		
		return 1;
	}
	
	@Override
	public com.winterframework.firefrog.game.dao.vo.GameOrder getOrderByPlanDetailId(Long planDetailId) {
		return this.gameOrderDao.getOrderByPlanDetailId(planDetailId);
	} 
	
	@Override
	public List<com.winterframework.firefrog.game.dao.vo.GameOrder> getWinningList(String orderIds,Long userId,Long lotteryId,Long issueCode) throws Exception {
		List<Long> ids = new ArrayList<Long>();
		String[] ss = orderIds.split(",");
		for(String orderId:ss){
			if(orderId != null && orderId !=""){
				ids.add(Long.valueOf(orderId));
			}
		}
		List<com.winterframework.firefrog.game.dao.vo.GameOrder>  orders = gameOrderDao.getByIds(ids);
		/*com.winterframework.firefrog.game.dao.vo.GameOrder order = gameOrderDao.getWinningList(lotteryId, issueCode, userId);
		if(order != null){
			orders.add(order);
		}*/
		return orders;
	}

	@Override
	public List<GameOrder> queryPlayerBet(long lotteryId, Long userId, Long issueCode)
			throws Exception {
		return gameOrderDao.queryPlayerBet(lotteryId, userId, issueCode);
	}
	
	
	public Long queryUserDailyPeriodBets(Long userId,Date startTime, Date endTime){
		List<String> bettypecodes = null; 
		List<String> fourLvlBtcs = null;
		bettypecodes = gameBettypeStatusDao.getSuper2000BetTypeCode();
		fourLvlBtcs = gameBettypeStatusDao.getSuper2000FOURLvlBtc();
		bettypecodes.addAll(fourLvlBtcs);
		return gameOrderDao.queryUserDailyPeriodBets(userId,startTime,endTime, bettypecodes);
	}
	
	@Override 
	public List<GameSlip> querySlipsByIssueCode(long issueCode) throws Exception  {
		return gameSlipDaoImpl.querySlipsByIssueCode( issueCode);
	}
	
	@Override 
	public List<GameSlip> querySlipsByOrderIdList(List<Long> orderId) throws Exception  {
		return gameSlipDaoImpl.querySlipsByOrderIdList(orderId);
		
	}

	@Override
	public List<GameBetDetailTotAmountEntity> queryBetDetaiByIssudeCode(long issueCode,long lotteryId) throws Exception {
		return gameSlipDaoImpl.queryBetDetaiByIssudeCode( issueCode,lotteryId);
	}
	@Override
	public Double getWinAmt(Long lotteryId, Long issueCode, Long userId) throws Exception {
		// TODO Auto-generated method stub
		return gameOrderDao.getWinAmt(lotteryId, issueCode, userId);
	}
}