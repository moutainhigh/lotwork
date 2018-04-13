package com.winterframework.firefrog.common.redis;

import java.util.List;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.Transaction;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.winterframework.modules.spring.exetend.PropertyConfig;

@Service("RedisClient")
public class RedisClient {

	@PropertyConfig(value = "redis1.ip")
	private String redisIp;
	@PropertyConfig(value = "redis.port")
	private Integer redisPort;
	@PropertyConfig(value = "redis.pool.maxActive")
	private Integer maxActive;
	@PropertyConfig(value = "redis.pool.maxIdle")
	private Integer maxIdle;
	@PropertyConfig(value = "redis.pool.maxWait")
	private Integer maxWait;
	@PropertyConfig(value = "redis.pool.testOnBorrow")
	private Boolean testOnBorrow;
	@PropertyConfig(value = "redis.pool.testOnReturn")
	private Boolean testOnReturn;

	private JedisPool jedisPool;

	public RedisClient() {
	}

	@PostConstruct
	public void initialPool() {
		JedisPoolConfig config = new JedisPoolConfig();
		config.setMaxIdle(maxIdle);
		config.setMinIdle(10);
		config.setTestOnBorrow(testOnBorrow);
		config.setTestOnReturn(testOnReturn);
		config.setMaxWait(maxWait);
		config.setTestWhileIdle(true);
		// config.setTimeBetweenEvictionRunsMillis(30000);
		jedisPool = new JedisPool(config, redisIp, redisPort);
		// 尝试获取一下数据，检验是否http超时
		this.ping();

	}

	/**
	 * 获取redis value (String)
	 * 
	 * @param key
	 * @return
	 */
	public String get(String key) {
		String value = null;
		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			value = instance.get(key);
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}

		return value;
	}

	/**
	 * 获取redis value (String)
	 * 
	 * @param key
	 * @return
	 */
	public void lSet(String key, String valie) {
		String value = null;
		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			instance.rpush(key, valie);
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}
	}

	/**
	 * 获取redis value (String)
	 * 
	 * @param key
	 * @return
	 */
	public List<String> lGet(String key) {
		List<String> value = null;
		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			value = instance.lrange(key, 0, -1);
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}

		return value;
	}

	/**
	 * 通过key删除
	 * 
	 * @param key
	 */
	public void del(String key) {

		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			instance.del(key);
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}
	}

	/**
	 * 添加key value 并且设置存活时间
	 * 
	 * @param key
	 * @param value
	 * @param liveTime
	 */
	public void set(String key, String value, int liveTime) {
		Jedis instance = null;
		Transaction ml = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			// /ml=instance.multi();
			instance.set(key, value);
			instance.expire(key, liveTime);
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
			throw e;
		} finally {
			// ml.discard();
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}

	}

	/**
	 * 添加key value
	 * 
	 * @param key
	 * @param value
	 */
	public void set(String key, String value) {

		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			instance.set(key, value);
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
			throw e;
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}
	}

	/**
	 * 添加key value
	 * 
	 * @param incr
	 * @param value
	 */
	public void incr(String key) {

		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			instance.incr(key);
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
			throw e;
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}
	}

	/**
	 * 通过正则匹配keys
	 * 
	 * @param pattern
	 * @return
	 */
	public Set<String> keys(String pattern) {

		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			return instance.keys(pattern);
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}
		return null;
	}

	/**
	 * 检查key是否已经存在
	 * 
	 * @param key
	 * @return
	 */
	public boolean exists(String key) {

		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			return instance.exists(key);
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}
		return false;
	}

	/**
	 * 清空redis 所有数据
	 * 
	 * @return
	 */
	public String flushDB() {

		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			return instance.flushDB();
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}
		return null;
	}

	/**
	 * 查看redis里有多少数据
	 */
	public long dbSize() {

		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			return instance.dbSize();
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}
		return 0;
	}

	/**
	 * 检查是否连接成功
	 * 
	 * @return
	 */
	public String ping() {

		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			return instance.ping();
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}
		return null;
	}

	/**
	 * 强制登出
	 */
	public Set<String> smembers(String key) {
		Jedis instance = null;
		boolean borrowOrOprSuccess = true;
		try {
			instance = jedisPool.getResource();
			return instance.smembers(key);
		} catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (instance != null) {
				jedisPool.returnBrokenResource(instance);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(instance);
			}
		}
		return null;
	}

	
	/**
	 * 分布式鎖定 建立並取得唯一鎖 
	 * jedis.setnx: if not exits then set, success return 1, fail return 0;
	 * 成功取得唯一鎖 return true;
	 * 失敗(已被其他進程取走)return false;
	 * @param lock
	 * @return
	 */
	public boolean acquireLock(String lock, int timeMillis) {
		// 1. 通过SETNX试图获取一个lock
		boolean success = false;
		boolean borrowOrOprSuccess = true;
		Jedis jedis = null;
		try {
			jedis = jedisPool.getResource();
			long value = System.currentTimeMillis() + timeMillis;
			long acquired = jedis.setnx(lock, String.valueOf(value));
			// SETNX成功，则成功获取一个锁
			if (acquired == 1) {
				//補上key值存在時間，避免永遠存在redis
				jedis.expire(lock, timeMillis/1000);
				success = true;
				// SETNX失败，说明锁仍然被其他对象保持，检查其是否已经超时
			} else {
				long oldValue = Long.valueOf(jedis.get(lock));
	
				// 超时
				if (oldValue < System.currentTimeMillis()) {
					String getValue = jedis.getSet(lock, String.valueOf(value));
					// 获取锁成功
					if (Long.valueOf(getValue) == oldValue) {
						success = true;
						// 已被其他进程捷足先登了
					} else {
						success = false;
					}
				}
				// 未超时，则直接返回失败
				else
					success = false;
			}
		
		}catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (jedis != null) {
				jedisPool.returnBrokenResource(jedis);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(jedis);
			}
		}
		return success;
	}

	/**
	 * 釋放唯一鎖
	 * 
	 * @param lock
	 */
	public void releaseLock(String lock) {
		Jedis jedis = null;
		boolean borrowOrOprSuccess = true;
		try { 
			jedis =	jedisPool.getResource();
		
		long current = System.currentTimeMillis();
		// 避免删除非自己获取得到的锁
		String value = null;
		value = jedis.get(lock);
		if (value != null && current < Long.valueOf(value))
			jedis.del(lock);
		}catch (JedisConnectionException e) {
			borrowOrOprSuccess = false;
			if (jedis != null) {
				jedisPool.returnBrokenResource(jedis);
			}
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(jedis);
			}
		}
	}
	
}
