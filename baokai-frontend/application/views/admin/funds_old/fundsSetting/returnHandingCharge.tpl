<!-- //////////////头部公共页面////////////// -->
		{include file='/admin/header.tpl'}
<!-- /////////////头部公共页面/////////////// -->
	<div class="col-content">
			<!-- //////////////头部公共页面////////////// -->
				{include file='/admin/funds/left.tpl'}
			<!-- /////////////头部公共页面/////////////// -->
		<div class="col-main">
			<div class="col-crumbs"><div class="crumbs"><strong>当前位置：</strong><a href="#">资金</a> &gt; <a href="#">充值管理</a> &gt; <a href="#">资金设置</a> &gt; 手续费返还配置</div></div>
			<div class="col-content">
				<div class="col-main">
					<div class="main">
						<div class="ui-tab">
							<div class="ui-tab-title clearfix">
								<ul>
									<li><a href="/admin/Rechargemange/fundssetting?swithval=1">银行管理</a></li>
									<li><a href="/admin/Rechargemange/fundssetting?swithval=2">可提取余额配置</a></li>
									<li><a href="/admin/Rechargemange/fundssetting?swithval=3">充值、提现与转账配置</a></li>
									<li><a href="/admin/Rechargemange/fundssetting?swithval=4">提现审核配置</a></li>
							<!-- 		<li class="current"><a href="/admin/Rechargemange/fundssetting?swithval=5">手续费返还配置</a></li>  -->
								</ul>
							</div>
							<div >
							<form method="POST" action="/admin/Rechargemange/fundssettings?parma=sv4">
								<table class="table table-info table-border">
									<thead>
										<tr>
											<th colspan="2" class="text-left">手续费返还配置</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="text-left w-4">手续费返还</td>
											<td class="text-left">
												<ul class="set-list">
													<li>
														<span class="ui-text-info">工商银行</span>&nbsp;&nbsp;&nbsp;&nbsp;
														<span class="ui-text-info">金额：</span>
														<select class="ui-select w-2">
															<option value="大于">大于</option>
															<option value="大于或等于">大于或等于</option>
														</select>
														<input type="text" value="300" class="input w-1">
														<span class="ui-text-info">元</span>&nbsp;&nbsp;&nbsp;&nbsp;
														<span class="ui-text-info">返手续费</span>
													</li>
													<li>
														<span class="ui-text-info">建设银行</span>&nbsp;&nbsp;&nbsp;&nbsp;
														<span class="ui-text-info">金额：</span>
														<select class="ui-select w-2">
															<option value="大于">大于</option>
															<option value="大于或等于">大于或等于</option>
														</select>
														<input type="text" value="300" class="input w-1">
														<span class="ui-text-info">元</span>&nbsp;&nbsp;&nbsp;&nbsp;
														<span class="ui-text-info">返手续费</span>
													</li>
													<li>
														<span class="ui-text-info">招商银行</span>&nbsp;&nbsp;&nbsp;&nbsp;
														<span class="ui-text-info">金额：</span>
														<select class="ui-select w-2">
															<option value="大于">大于</option>
															<option value="大于或等于">大于或等于</option>
														</select>
														<input type="text" value="300" class="input w-1">
														<span class="ui-text-info">元</span>&nbsp;&nbsp;&nbsp;&nbsp;
														<span class="ui-text-info">返手续费</span>
													</li>
													<li>
														<span class="ui-text-info">农业银行</span>&nbsp;&nbsp;&nbsp;&nbsp;
														<span class="ui-text-info">金额：</span>
														<select class="ui-select w-2">
															<option value="大于">大于</option>
															<option value="大于或等于">大于或等于</option>
														</select>
														<input type="text" value="300" class="input w-1">
														<span class="ui-text-info">元</span>&nbsp;&nbsp;&nbsp;&nbsp;
														<span class="ui-text-info">返手续费</span>
													</li>
												</ul>
											</td>
										</tr>
										<tr>
											<td colspan="2" class="text-left ui-btn">
												<button type="submit" class="btn btn-important">保存配置<b class="btn-inner"></b></button>
												<a href="javascript:void(0);" class="btn">撤销编辑<b class="btn-inner"></b></a>
											</td>
										</tr>
									</tbody>
								</table>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{include file='/admin/script-base.tpl'}
{literal}	
<script>
(function() {
	 //一、二级菜单选中样式加载	
	selectMenu('Menufunds','MenuWithdrawals');
	
	//数字校验，自动矫正不符合数学规范的数学
		var inputs = $(':text');				
		checkFn = function(){
			var me = this,v = me.value,index;
			me.value = v = v.replace(/^\.$/g, '');			
			index = v.indexOf('.');
			if(index > 0){
				me.value = v = v.replace(/(.+\..*)(\.)/g, '$1');				
			}
			me.value = v = v.replace(/[^\d|^\.]/g, '');
			me.value = v = v.replace(/^00/g, '0');		
			if(v.split('.').length > 2){
				arguments.callee.call(me);
			}
							
		};		
		inputs.keyup(checkFn);	inputs.blur(checkFn);
		
			
	})(jQuery);
</script>
{/literal}
</body>
</html>