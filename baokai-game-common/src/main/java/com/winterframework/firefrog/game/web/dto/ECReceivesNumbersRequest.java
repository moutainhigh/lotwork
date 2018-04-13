package com.winterframework.firefrog.game.web.dto;

import java.io.Serializable;

/** 
* @ClassName: ECReceivesNumbersRequest 
* @Description: 获取开奖号码
* @author david 
* @date 2013-9-17 下午2:54:07 
*  
*/
public class ECReceivesNumbersRequest implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = -6573584275609290812L;

	private String customer;
	
	private int recordId;
	
	private String lottery;
	
	private String issue;
	
	private String time;
	
	private String number;
	
	private String verifiedTime;
	
	private String earliestTime;
	
	private String stopSaleTime;
	
	private String drawingTime;
	
	private String safestr;

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public int getRecordId() {
		return recordId;
	}

	public void setRecordId(int recordId) {
		this.recordId = recordId;
	}

	public String getLottery() {
		return lottery;
	}

	public void setLottery(String lottery) {
		this.lottery = lottery;
	}

	public String getIssue() {
		return issue;
	}

	public void setIssue(String issue) {
		this.issue = issue;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getVerifiedTime() {
		return verifiedTime;
	}

	public void setVerifiedTime(String verifiedTime) {
		this.verifiedTime = verifiedTime;
	}

	public String getEarliestTime() {
		return earliestTime;
	}

	public void setEarliestTime(String earliestTime) {
		this.earliestTime = earliestTime;
	}

	public String getStopSaleTime() {
		return stopSaleTime;
	}

	public void setStopSaleTime(String stopSaleTime) {
		this.stopSaleTime = stopSaleTime;
	}

	public String getDrawingTime() {
		return drawingTime;
	}

	public void setDrawingTime(String drawingTime) {
		this.drawingTime = drawingTime;
	}

	public String getSafestr() {
		return safestr;
	}

	public void setSafestr(String safestr) {
		this.safestr = safestr;
	}

}