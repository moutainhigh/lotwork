package com.winterframework.firefrog.game.event.service.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.winterframework.firefrog.common.redis.RedisClient;
import com.winterframework.firefrog.common.redis.RedisQueue;
import com.winterframework.firefrog.common.util.GameContext;
import com.winterframework.firefrog.game.dao.vo.GameTrendTask;
import com.winterframework.firefrog.game.event.GameTrendTaskServer;
import com.winterframework.firefrog.game.event.service.IGameTrendEventService;
import com.winterframework.firefrog.game.service.IGameTrendTaskService;

@Service("gameTrendEventServiceImpl")
public class GameTrendEventServiceImpl implements IGameTrendEventService{
	private static final Logger log= LoggerFactory.getLogger(GameTrendEventServiceImpl.class);
	
	@Resource(name="gameTrendTaskServiceImpl")
	private IGameTrendTaskService gameTrendTaskService;	
	@Resource(name="redisQueue")
	private RedisQueue redisQueue;
	@Resource(name="RedisClient")
	private RedisClient redisClient;
//	@Resource(name="baseEventPublisher")
//	private BaseEventPublisher baseEventPublisher;
	
	@Override
	public void doProcess(GameTrendTask trendTask) throws Exception {
		gameTrendTaskService.save(new GameContext(), trendTask);
		String key=GameTrendTaskServer.THREND_TASK_PRE+trendTask.getUserId()+"";   
		redisQueue.add(key, trendTask.getId()+"");
		String userIdStr=trendTask.getUserId()+"";
		String value=redisClient.get(GameTrendTaskServer.THREND_TASK_LOCK+userIdStr);
		if(null==value || "".equals(value)){
		//System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+new Date());
		    redisClient.set(GameTrendTaskServer.THREND_TASK_LOCK+userIdStr, userIdStr);
		    
		    int len = redisQueue.len(key);
		    if(len > 10)
		    	len = 10;
		    for (int n = 0; n< len; n++){
		    	redisQueue.add(GameTrendTaskServer.QUEUE_NAME, userIdStr);
		    }
			
		}
		/*GameTrendEvent event=new GameTrendEvent(trendTask);
		baseEventPublisher.publish(event);*/
	}
}
