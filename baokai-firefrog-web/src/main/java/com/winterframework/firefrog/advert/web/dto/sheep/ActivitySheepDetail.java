package com.winterframework.firefrog.advert.web.dto.sheep;

import java.util.Date;

import com.winterframework.firefrog.advert.web.dto.BaseEntity;
import com.winterframework.firefrog.common.util.DateUtils;



/** 
* @ClassName ActivitySheepBigLittleDetail 
* @Description 羊年活动详情
* @author  hugh
* @date 2015年1月12日 下午5:36:12 
*  
*/
public class ActivitySheepDetail  extends BaseEntity{
 
	private static final long serialVersionUID = -6017838657396186774L;
	
	private Long activityId;//活动id  ACTIVITY_ID
	private Date activityTime; //押宝时间 或者 转盘时间 	ACTIVITY_TIME
	private String userName; //用户名			USER_NAME
	private Long recharge;  //充值金额   		RECHARGE  			数据库存入10000的倍数
	private Long activityType = 0L;//类型		ACTIVITY_TYPE 是否是管理员操作 是 1 默认 0 	
	private String result; //结果	RESULT	
	private Long useNum;//使用次数		USE_NUM  	
	private Long getNum;//获得次数		GET_NUM  		
	private Long channel;//来源				CHANNEL
	private Long userId; //用户名			USER_NAME
	private Date verifyTime; //审核时间 		VERIFY_TIME
	private String verifyName; //审核用户名 	VERIFY_NAME
	private String verifyReason; //审核原因 	VERIFY_REASON
	private Long status;//状态				STATUS
	private Long award;  //红包金额   			AWARD  			数据库存入10000的倍数
	
	private Long activityConfigId;  //
	private String drawResult;//开奖结果
	private String drawType;//开奖大小 big1 smal 0
	
	private Date beginTime; //只用于条件查询
	private Date endTime; //只用于条件查询
	private int updateType; //只用于更新  0审核通过 1审核不同 
	private Long[]  ids; //只用于更新  更新id都放这里  单个更新也是
	
	private String verifyTimeStr;
	private String activityTimeStr;
	
	private Long vip;
	public Long getVip() {
		return vip;
	}
	public void setVip(Long vip) {
		this.vip = vip;
	}
	
	public String getActivityTimeStr() {
		return DateUtils.format(activityTime, DateUtils.DATETIME_FORMAT_PATTERN);
	}
	public void setActivityTimeStr(String activityTimeStr) {
		this.activityTimeStr = activityTimeStr;
	}
	public String getVerifyTimeStr() {
		return DateUtils.format(verifyTime, DateUtils.DATETIME_FORMAT_PATTERN);
	}
	public void setVerifyTimeStr(String verifyTimeStr) {
		this.verifyTimeStr = verifyTimeStr;
	}
	
	public Long getActivityConfigId() {
		return activityConfigId;
	}
	public void setActivityConfigId(Long activityConfigId) {
		this.activityConfigId = activityConfigId;
	}
	public String getDrawResult() {
		return drawResult;
	}
	public void setDrawResult(String drawResult) {
		this.drawResult = drawResult;
	}
	public String getDrawType() {
		return drawType;
	}
	public void setDrawType(String drawType) {
		this.drawType = drawType;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Date getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(Date beginTime) {
		this.beginTime = beginTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public int getUpdateType() {
		return updateType;
	}
	public void setUpdateType(int updateType) {
		this.updateType = updateType;
	}
	public Long[] getIds() {
		return ids;
	}
	public void setIds(Long[] ids) {
		this.ids = ids;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Long getRecharge() {
		return recharge;
	}
	public void setRecharge(Long recharge) {
		this.recharge = recharge;
	}

	public Long getActivityId() {
		return activityId;
	}
	public void setActivityId(Long activityId) {
		this.activityId = activityId;
	}
	public Date getActivityTime() {
		return activityTime;
	}
	public void setActivityTime(Date activityTime) {
		this.activityTime = activityTime;
	}
	public Long getActivityType() {
		return activityType;
	}
	public void setActivityType(Long activityType) {
		this.activityType = activityType;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public Long getUseNum() {
		return useNum;
	}
	public void setUseNum(Long useNum) {
		this.useNum = useNum;
	}
	public Long getGetNum() {
		return getNum;
	}
	public void setGetNum(Long getNum) {
		this.getNum = getNum;
	}
	public Long getChannel() {
		return channel;
	}
	public void setChannel(Long channel) {
		this.channel = channel;
	}
	public Date getVerifyTime() {
		return verifyTime;
	}
	public void setVerifyTime(Date verifyTime) {
		this.verifyTime = verifyTime;
	}
	public String getVerifyName() {
		return verifyName;
	}
	public void setVerifyName(String verifyName) {
		this.verifyName = verifyName;
	}
	public String getVerifyReason() {
		return verifyReason;
	}
	public void setVerifyReason(String verifyReason) {
		this.verifyReason = verifyReason;
	}
	public Long getStatus() {
		return status;
	}
	public void setStatus(Long status) {
		this.status = status;
	}
	public Long getAward() {
		return award;
	}
	public void setAward(Long award) {
		this.award = award;
	}
	
	
	
}
