package com.winterframework.firefrog.fund.service.impl.din;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "response")
public class DinQueryResponseDetail implements Serializable{
	@XmlElement(name = "is_success")
	private String isSuccess;
	@XmlElement(name = "sign_type")
	private String signType;
	@XmlElement(name = "sign")
	private String sign;
	@XmlElement(name = "error_code")
	private String errorCode;
	@XmlElement(name = "trade")
	private DinQueryTradeResponseDetail dinQueryTradeResponseDetail;
	
	public String getIsSuccess() {
		return isSuccess;
	}
	public String getSignType() {
		return signType;
	}
	public String getSign() {
		return sign;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public DinQueryTradeResponseDetail getDinQueryTradeResponseDetail() {
		return dinQueryTradeResponseDetail;
	}
	
	
		
	
}
