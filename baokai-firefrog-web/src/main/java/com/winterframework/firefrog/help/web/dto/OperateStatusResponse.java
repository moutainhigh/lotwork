package com.winterframework.firefrog.help.web.dto;

import java.io.Serializable;

public class OperateStatusResponse implements Serializable{

	private static final long serialVersionUID = -9876543366876l;
	
	private long status;
	
	private String message;
	
	private Object[][] data; 

	public Long getStatus() {
		return status;
	}

	public void setStatus(long status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object[][] getData() {
		return data;
	}

	public void setData(Object[][] data) {
		this.data = data;
	}
}
