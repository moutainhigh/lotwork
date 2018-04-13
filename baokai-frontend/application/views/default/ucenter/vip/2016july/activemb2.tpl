<!DOCTYPE html>
<html id="html">
<head>
    <meta charset="utf-8" />
    <title>宝开七月活动</title>
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta content="telephone=no" name="format-detection" />
    <link rel="stylesheet" type="text/css" href="{$path_img}/images/activity/july/week2/mb/css/basic.css">
    <script type="text/javascript" src="{$path_img}/js/jquery-1.9.1.min.js"></script>	
</head>

<body>
    <header>
        <a class="btn-register" href="#" id="register"></a>
        <div class="enrollments">已有<strong id="registerCount">3,299</strong>人报名</div>
    </header>

    <article class="activity-content">
        <div class="layout">
        	<p>活动日期： 2016.7.18 00:00:00 - 2016.7.23 23:59:59</p>
            <h3 class="">活动内容</h3>
            <p>用户在活动期间内，每日累计充值≥100元，并在当日达到相应流水要求后，次日即可领取对应活动奖金。<br />VIP用户当日累计充值≥5,000元，可享更低流水拿奖金哦！</p>
            <div class="table-info clearfix">
                <div class="table">
                    <div class="table-title clearfix">
                        <strong>普通用户</strong>当日累计存款金额
                    </div>
                    <table class="table-content">
                        <tbody>
                            <tr>
                                <td>赠送比例<br />流水要求</td>
                                <td>8%<br />6倍</td>
                                <td>15%<br />10倍</td>
                                <td>25%<br />15倍</td>
                                <td>35%<br />20倍</td>
                                <td>60%<br />30倍</td>
                                <td>100%<br />45倍</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table">
                    <div class="table-title clearfix">
                        <strong>VIP用户</strong>当日累计存款金额≥5,000元
                    </div>
                    <table class="table-content">
                        <tbody>
                            <tr>
                                <td>赠送比例<br />流水要求</td>
                                <td>8%<br />5倍</td>
                                <td>15%<br />8倍</td>
                                <td>25%<br />12倍</td>
                                <td>35%<br />16倍</td>
                                <td>60%<br />25倍</td>
                                <td>100%<br />35倍</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="text">
                <p><strong>*流水要求=当日总销量/当日累计充值金额</strong></p>
                <p><strong>*赠送奖金=当日累计充值金额*赠送比例</strong></p>
                <p>*用户可以根据实际销量情况获取对应奖金。</p>
                <p>若VIP用户充值未达到活动要求，则按普通用户流水要求计算。</p>
                <p>例：</p>
                <p>1.普通用户A当日累计充值1000元，当日销量为15,000，打满15倍流水，奖金为1000*25%=250元。</p>
                <p>2.普通用户B当日累计充值1000元，当日销量为20,000，打满20倍流水，奖金为1000*35%=350元。</p>
                <p>3.VIP用户当日累计充值10,000元，当日销量为120,000，打满12倍流水，奖金为10,000*25%=2500元。</p>
            </div>
        </div>
    </article>
    <article class="activity-rules">
        <div class="layout">
            <h3 >活动细则</h3>
            <ul class="list">
                <li><i>1</i>活动返奖，参与游戏只限于宝开彩票旗舰版及宝开彩票专业版彩票类游戏。投注必须为已开奖注单，视为有效投注。</li>
                <li><i>2</i>骰宝大小单双销量 、PT销量不计算在活动销量内，充值金额包含上下级充值。</li>
                <li><i>3</i>超级2000玩法按实际投注额的70%进行结算。如：用户超级2000玩法中投注额为1,000，则结算销量为1,000*70%=700。</li>
                <li><i>4</i>本次活动采取报名制，用户需要点击“立即报名”后才能获取活动奖金。注：VIP3（包含VIP3）以上用户无需报名即可参加。</li>
                <li><i>5</i>平台新注册用户，首存优惠不得与本次活动同时享受。当首存优惠领取后，方可参与本次活动。</li>
                <li><i>6</i>奖励计算依据用户在活动当日内的有效投注量审核计算，两个平台销量分别独立计算。</li>
                <li><i>7</i>奖金发放时间：平台隔日发放前一天符合条件的用户奖金。</li>
                <li><i>8</i>活动期间禁止任何刷量作弊行为，一经发现宝开彩票平台将取消参与活动资格，严重者将被冻结账号处理。</li>
                <li><i>9</i>宝开彩票平台保留活动最终解释权。</li>
            </ul>
        </div>
    </article>
    <footer class="footer">
        <div class="layout">
            <div class="copy-right">&copy;2003-2016 宝开彩票 All Rights Reserved</div>
        </div>
    </footer>
    <a href="javascript:void(0)" class="services"></a>
    <div class="mask"></div>
    <div class="pop">
        <a href="javascript:void(0);" class="close"></a>
        <p></p>
    </div>
<!--引入js库-->
<script type="text/javascript">
//页面自适应缩放
    var fitPage = function(){
        var w = document.body.clientWidth;
        w = w > 750 ? 750: w;
        w = w / 750;
        w = w * 100;
        document.getElementById('html').style.fontSize = w + 'px';
    }
    fitPage();
    var t;
    var func = function(){
        clearTimeout(t);
        t = setTimeout(fitPage, 25);
    }
    window.onresize = function(){
        func();
    }
</script>
<script>

$(function(){
	var sdata = "month=7&source=mobile&startTime=20160718&endTime=20160724&token=" +encodeURIComponent ('{$token}');
	 $.ajax({
	        url:'/vipmb/registerinfo',
	        dataType:'json',
	        method:'post',
	        data:sdata,
	        success:function(res){
	            if (Number(res['isSuccess']) == 1){
	            	$('#registerCount').html(res['registerCount']);
	                //判断是否已经报名
	                if(res['isRegistered']){
	                    $('#register').hide();
	                    $('.enrollments').addClass('enrollments-current');
	                }else{
	                    $('#register').click(function(){
	                        $('#register').hide();
	                        $('.enrollments').addClass('enrollments-current');
	                        $('.mask').show();
	                        $('.pop').fadeIn();
	                    });
	                }
	            }
	        }
	    });	
	
	//點擊註冊
	$('.btn-register').click(function(){
	    $.ajax({
	        url:'/vipmb/application',
	        dataType:'json',
	        method:'post',
	        data:sdata,
	        success:function(res){
	            if (Number(res['isSuccess']) == 1){
	                //判断是否已经报名
	                if(res['isRegistered']){
	                    $('#register').hide();
	                    $('.enrollments').addClass('enrollments-current');
	                }else{
	                    $('#register').click(function(){
	                        $('#register').hide();
	                        $('.enrollments').addClass('enrollments-current');
	                        $('.mask').show();
	                        $('.pop').fadeIn();
	                    });
	                    $('#registerCount').html(+$('#registerCount').text() + +1);
	                }
	            }
	        }
	    });		
	})
    
    $('.pop .close').click(function(){
        $('.mask').hide();
        $('.pop').fadeOut();
    })
});
</script>
</body>
</html>