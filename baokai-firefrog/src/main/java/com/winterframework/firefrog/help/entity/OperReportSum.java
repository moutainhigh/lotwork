package com.winterframework.firefrog.help.entity;

import java.io.Serializable;

public class OperReportSum implements Serializable{
	
	private static final long serialVersionUID = 3851395827060519293L;

	private String activeUserCountAVG;

	private String profitSum;

	private String betAmtSum;

	private String chargeAmtSum;

	private String withdrawAmtSum;

	
	
	public OperReportSum() {
		super();
	}

	public OperReportSum(String activeUserCountAVG, String profitSum, String betAmtSum, String chargeAmtSum,
			String withdrawAmtSum) {
		super();
		this.activeUserCountAVG = activeUserCountAVG;
		this.profitSum = profitSum;
		this.betAmtSum = betAmtSum;
		this.chargeAmtSum = chargeAmtSum;
		this.withdrawAmtSum = withdrawAmtSum;
	}

	public String getactiveUserCountAVG() {
		return activeUserCountAVG;
	}

	public void setactiveUserCountAVG(String activeUserCountAVG) {
		this.activeUserCountAVG = activeUserCountAVG;
	}

	public String getProfitSum() {
		return profitSum;
	}

	public void setProfitSum(String profitSum) {
		this.profitSum = profitSum;
	}

	public String getBetAmtSum() {
		return betAmtSum;
	}

	public void setBetAmtSum(String betAmtSum) {
		this.betAmtSum = betAmtSum;
	}

	public String getChargeAmtSum() {
		return chargeAmtSum;
	}

	public void setChargeAmtSum(String chargeAmtSum) {
		this.chargeAmtSum = chargeAmtSum;
	}

	public String getWithdrawAmtSum() {
		return withdrawAmtSum;
	}

	public void setWithdrawAmtSum(String withdrawAmtSum) {
		this.withdrawAmtSum = withdrawAmtSum;
	}
	
	
}
