package com.winterframework.firefrog.fund.web.dto;

import java.io.Serializable;
import java.util.List;

import com.winterframework.firefrog.fund.dao.vo.BypassConfigVO;

public class BypassConfigResponse implements Serializable {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3756977561021034006L;
	
	private List<BypassConfigVO> bypassCfgs;

	public List<BypassConfigVO> getBypassCfgs() {
		return bypassCfgs;
	}

	public void setBypassCfgs(List<BypassConfigVO> bypassCfgs) {
		this.bypassCfgs = bypassCfgs;
	}

	
	
}