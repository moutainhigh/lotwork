<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>{$title}</title>
	<script type="text/javascript" src="{$path_js}/js/rsa.min.js"></script>
	<link rel="stylesheet" href="{$path_img}/images/common/base.css" />
	<link rel="stylesheet" href="{$path_img}/images/ucenter/safe/safe.css" />
	<link rel="stylesheet" href="{$path_img}/images/common/js-ui.css" />
	{literal}
	<style>
	.ui-label {width:160px;}
	</style>
	{/literal}
	{include file='/default/script-base.tpl'}
<body>

{include file='/default/ucenter/header.tpl'}
	<!-- header end -->
	<div class="g_33 common-main">
		<div class="g_5">
			{include file='/default/ucenter/left.tpl'}
		</div>
		
		<div class="g_28 g_last">
			<div class="common-content bank-card-management ">
				<div class="title">解除绑定</div>
				<div class="content">
					
					<ul class="ui-form">
						<li>
							<label for="name" class="ui-label">用户名：</label>
							<span class="ui-info">{$account}</span>
						</li>
						<li>
							<label for="name" class="ui-label">当前安全密码：</label>
							<input id="J-input-cafepassword" type="password" value="" class="input w-4">
							<span class="ui-text-prompt" style="display:none;">请输入当前安全密码</span>
							<span class="ui-check" style="display:none;"><i></i>安全密码不能为空</span>
						</li>
						<li class="address">
							<label for="name" class="ui-label">当前宝开安全中心验证码：</label>
							<input id="J-input-code" type="text" value="" class="input w-2">
							<span class="ui-text-prompt">为了您的账户安全，连续错误5次后当日将被锁定，会影响您的提现、绑定等操作</span>
							<span class="ui-check" style="display:none;"><i></i></span>
						</li>
						<li>
							<label for="name" class="ui-label"></label>
							<span class="ui-info"><a href="">手机遗失或忘记启动密码</a>
							{foreach from=$aToken item=data}
							{$data} - 
							{/foreach}
							</span>
						</li>
						<li class="radio-list" id="J-panel-reason">
							<label for="name" class="ui-label">解除绑定原因：</label>
							<label for="J-reason-1" class="label"><input id="J-reason-1" type="radio" class="radio" value="1" name="reason" />手机遗失</label>
							<label for="J-reason-2" class="label"><input id="J-reason-2" type="radio" class="radio" value="2" name="reason" />不用也很安全</label>
							<label for="J-reason-3" class="label"><input id="J-reason-3" type="radio" class="radio" value="3" name="reason" />使用不便</label>
							<label for="J-reason-4" class="label"><input id="J-reason-4" type="radio" class="radio" value="4" name="reason" />其他</label>
							<span class="ui-check" style="display:none;"><i></i></span>
						</li>
						<li class="ui-btn">
							<a href="#" id="J-button-submit" class="btn btn-important">解除绑定<b class="btn-inner"></b></a>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<a href="/safepersonal/" class="btn">取 消<b class="btn-inner"></b></a>
						</li>
					</ul>
					<dl class="prompt">
						<dt>宝开安全中心有什么用？</dt>
						<dd>宝开安全中心是宝开平台推出的一款手机应用。应用安装到您的手机，与您的账号绑定后，在资金提现、修改密码等重要时刻，可以加强您的账号安全。</dd>
						<dd>宝开安全中心每30秒会根据时间、账号等因素即时产生的六位随机验证码，一次一密。客户并不需要记住额外的密码，仅在需要安全验证的环节中输入当前宝开安全中心上显示的验证码即可，就和使用其他银行的动态口令卡、安全令牌一样方便且安全。</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
	<!-- //////////////底侧公共页面////////////// -->
		{include file='/default/ucenter/footer.tpl'}
	<!-- /////////////底侧公共页面/////////////// -->
	
{literal}
<script>
(function($){
	//base64 加密
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

	//RSA 加密
	var rsa = new RSAKey();
	{/literal}
	rsa.setPublic('{$rsa_n}', '{$rsa_e}');
	{literal}
	var safePassword = $('#J-input-cafepassword'),
		code = $('#J-input-code'),
		reasons = $('#J-panel-reason').find('input'),
		minWindow = new phoenix.MiniWindow({cls:'ui-alert-custom'}),
		mask = phoenix.Mask.getInstance();
		
		
	minWindow.addEvent('beforeShow', function(){
		mask.show();
	});
	minWindow.addEvent('afterHide', function(){
		mask.hide();
	});
     var checkFn = function(){
			var me = this;
			//先把非数字的都替换掉，除了数字和.
		  	me.value = me.value.replace(/[^\d]/g,"");
	};
	code.keyup(checkFn);
	code.blur(checkFn);
	//安全密码
	var checkSafePassword = function(){
		var el = safePassword,v = $.trim(el.val()),isPass = true,par = el.parent(),error = par.find('.ui-check');
		if(v == ''){
			error.html('<i></i>安全密码不能为空').css('display', 'inline-block');
			isPass = false;
		}
		if(isPass){
			error.hide();
		}
		return isPass;
	};
	safePassword.focus(function(){
		var el = safePassword,par = el.parent(),tip = par.find('.ui-text-prompt'),error = par.find('.ui-check');
		error.hide();
		tip.show();
	});
	safePassword.blur(function(){
		var el = safePassword,par = el.parent(),tip = par.find('.ui-text-prompt'),error = par.find('.ui-check');
		checkSafePassword();
		tip.hide();
	});
	
	
	var checkCode = function(){
		var v = $.trim(code.val()),isPass = true;
		if(v == ''){
			isPass = false;
			code.parent().find('.ui-check').html('<i></i>当前宝开安全中心验证码不能为空').show();
		}
		if(isPass){
			code.parent().find('.ui-check').hide();
			code.parent().find('.ui-text-prompt').show();
		}else{
			code.parent().find('.ui-check').show();
			code.parent().find('.ui-text-prompt').hide();
		}
		return isPass;
	};
	code.blur(function(){
		checkCode();
	});
	
	
	
	
	var checkReasons = function(){
		var isPass = true,checkNum = 0;
		reasons.each(function(i){
			if(this.checked){
				checkNum += 1;
			}
		});
		if(checkNum > 0){
			isPass = true;
			reasons.eq(0).parent().parent().find('.ui-check').hide();
		}else{
			isPass = false;
			reasons.eq(0).parent().parent().find('.ui-check').html('<i></i>请选择解除绑定原因').show();
		}
		return isPass;
	};
	reasons.click(function(){
		reasons.eq(0).parent().parent().find('.ui-check').hide();
	});
	
	
	$('#J-button-submit').click(function(e){
		e.preventDefault();
		if(checkSafePassword() && checkCode() && checkReasons()){
			var passowrdv = $.trim(safePassword.val()),
				codev = $.trim(code.val()),
				reason = '';
			reasons.each(function(){
				if(this.checked){
					reason = $.trim(this.value);
					return false;
				}
			});
			
			$.ajax({
				url:'/safepersonal/unbindmobiletoken/',
				dataType:'json',
				cache:false,
				method:'POST',
				data:{password:Base64.encode(passowrdv), code:codev, reason:reason},
				beforeSend:function(jqXHR, settings){
					//RSA加密
					settings.data = 'rsa_data=' + rsa.encrypt(settings.data);
				},
				success:function(data){
					if(Number(data['isSuccess']) == 1){
						var num = 3,timer;
						minWindow.setTitle('温馨提示');
						minWindow.setContent('<div class="pop-title"><i class="ico-success"></i><h4 class="pop-text">解除绑定成功！</h4><div style="text-align:center;padding:10px;"><span id="J-jump-time">3</span>秒后返回安全中心</div></div><div class="pop-btn"><a class="btn btn-important" href="/safepersonal/">返回安全中心<b class="btn-inner"></b></a></div>');
						minWindow.show();
						
						timer = setInterval(function(){
							if(num <= 0){
								clearInterval(timer);
								location.href = '/safepersonal/';
							}
							$('#J-jump-time').text(num);
							num--;
						}, 1000);
						
					}else{
						minWindow.setTitle('温馨提示');
						minWindow.setContent('<div class="pop-title"><i class="ico-success"></i><h4 class="pop-text" style="color:#F00;">'+ data['msg'] +'</h4></div><div class="pop-btn"><a id="J-button-confirm" class="btn btn-important" href="#">确定<b class="btn-inner"></b></a></div>');
						minWindow.show();
						$('#J-button-confirm').click(function(e){
							e.preventDefault();
							minWindow.hide();
						});
					}
				}
			});
		}
		
	});
	
	
})(jQuery);
</script>

{/literal}
	
</body>
</html>