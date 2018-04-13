
<form selectType="3" action="/fundappeal/rechargeappealsubmit" method="post" {if $type!='3'}style="display:none"{/if}>
    <ul class="ui-form">
        <!--{if $hasSn}-->
        <li>
            <label class="ui-label">充值订单号：</label>
            <span class="ui-info">{$sn}<input type="hidden" name="sn" value="{$sn}"/></span>
        </li>
        <!--{/if}-->
        <li>
            <label class="ui-label">平台账户：</label>
            <!--{if $hasSn}-->
            {$account}<input type="hidden" name="account" value="{$account}">
            <span class="ui-text-prompt">（*您的游戏账户）</span>
            <!--{else}-->
            <input type="text" class="input w-4 cnEnNumOnly" maxlength="16" name="account" value="{$account}">
            <span class="ui-text-prompt">（*需要申诉的平台账户名）</span>
            <!--{/if}-->
        </li>
        <li>
            <label class="ui-label">充值金额：</label>
            <input type="text" class="input w-4 numberDotOnly" maxsizelength="6" name="amount" value="{$amount}">
            <span class="ui-text-prompt">（*实际充值金额）</span>
        </li>
        <li>
            <label class="ui-label">充值方式：</label>
            <select class="ui-select w-3 bankHeight" id="selectType" name="type" value="{$type}">
                <option value="1">网银汇款</option>
                <option value="2">快捷充值</option>
                <option value="3" selected>财付通</option>
               {if $unionpayBank.canRechargeAppeal == 1}<option value="5">银联充值</option>{/if}
               {if $alipayBank.canRechargeAppeal == 1}<option value="6">支付宝</option>{/if}
            </select>
            <span class="ui-text-prompt">（*选择您的充值方式）</span>
            <input type="hidden" name="bank" value="{$tenpayBank.id}"/>
        </li>
        <li>
            <label class="ui-label">财付通帐号：</label>
            <input type="text" class="input w-4 enNumDotOnly" name="tenpayAccount" maxlength="35" value="{$tenpayAccount}">
            <span class="ui-text-prompt">（*真实付款人账号）</span>
        </li>
        <li>
            <label class="ui-label">财付通姓名：</label>
            <input type="text" class="input w-4"  maxlength="30"  name="tenpayName" value="{$tenpayName}">
            <span class="ui-text-prompt">（*真实付款人姓名）</span>
        </li>
        <!--{if !$hasSn}-->
        <li>
            <label class="ui-label">充值具体时间：</label>
            <input type="text" class="input w-4 dateOnly" name="rechargeTime" value="{$rechargeTime}">
            <span class="ui-text-prompt">（点击输入框选择充值的时间点）</span>
        </li>
        <!--{/if}-->
        
         <li>
            <label class="ui-label">选择提交方式：</label>
            <input type="radio"  class="radio" name="uploadType" value="ut1" checked>交易单号
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="uploadType" value="ut2">汇款回执单
            <span class="ui-text-prompt">(*任选择一种方式提交即可)</span>
        </li>
        <div id="transNumDiv">
        	<li>
            <label class="ui-label"></label>
            <input type="text" class="input w-4 formatCardNum" style="font-size:15px" name="transactionNum"  value="{$transactionNum}">
            <span class="ui-text-prompt">(请输入交易流水号)</span>
            &nbsp&nbsp<a class="ui-text-info helpLink" helpId="{$tenpayBank.helpId2}">交易单号查询演练</a>
        	</li>
        
        </div>
        <div id="uploadImgDiv" style ="display:none">
	        <li>
	            <label class="ui-label">回执单截图：</label>
	            <span id="uploadFile3"></span>
	            <span class="ui-text-prompt">（*最多上传3张照片）</span>
	            <a class="ui-text-info helpLink" helpId="{$tenpayBank.helpId}">{$tenpayBank.name}回单查询演练</a>
	        </li>
	        <li id="photoBox3" style="height:100px; display:none">
	            <label class="ui-label"></label>
	        </li>
        </div>
    </ul>
</form>