package com.winterframework.firefrog.user.web.controller.game;

import com.winterframework.firefrog.user.web.dto.UserAwardStruc;

public class GameBonus {

	private Long userid;
	private UserAwardStruc[] userAwardListStruc;
	
	public Long getUserid() {
		return userid;
	}
	public void setUserid(Long userid) {
		this.userid = userid;
	}
	public UserAwardStruc[] getUserAwardListStruc() {
		return userAwardListStruc;
	}
	public void setUserAwardListStruc(UserAwardStruc[] userAwardListStruc) {
		this.userAwardListStruc = userAwardListStruc;
	}

}
