!function(a,b){var c={name:"wuxing.zhixuan.fushi",tips:"五星直选复式玩法提示",exampleTip:"五星直选复式范例"},d=a.Games.SSC.getInstance(),e={init:function(){var a=this;a.initHotColdEvent()},rebuildData:function(){var a=this;a.balls=[[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]]},buildUI:function(){var a=this;a.container.html(i.join(""))}},f=[];f.push('<div class="number-select-title balls-type-title clearfix">'),f.push('<ul class="function-select-title game-frequency-type">'),f.push('<li class="lost current" data-type="lost">遗漏</li>'),f.push('<li class="fre" data-type="fre">冷热</li>'),f.push("</ul>"),f.push('<ul class="function-select-content">'),f.push('<li class="game-frequency-lost-length"><a href="javascript:void(0);" data-type="currentFre" class="periodcurrentFre current">当前遗漏</a><a data-type="maxFre" href="javascript:void(0);" class="periodmaxFre">最大遗漏</a></li>'),f.push('<li style="display:none" class="game-frequency-fre-length"><a href="javascript:void(0);" data-type="30" class="period30">30期</a><a href="javascript:void(0);" data-type="60" class="period60">60期</a><a href="javascript:void(0);" data-type="100" class="period100">100期</a></li>'),f.push("</ul>"),f.push("</div>"),f.push('<div class="number-select-content">'),f.push('<ul class="ball-section">');var g=[];g.push("<li>"),g.push('<div class="ball-title">'),g.push("<strong><#=title#>位</strong>"),g.push("<span>当前遗漏</span>"),g.push("</div>"),g.push('<ul class="ball-content">'),$.each([0,1,2,3,4,5,6,7,8,9],function(){g.push('<li><a href="javascript:void(0);" data-param="action=ball&value='+this+'&row=<#=row#>" class="ball-number">'+this+'</a><span class="ball-aid-hot">0</span></li>')}),g.push("</ul>"),g.push('<div class="ball-control">'),g.push('<a data-param="action=batchSetBall&row=<#=row#>&bound=all" href="javascript:void(0);">全</a>'),g.push('<a data-param="action=batchSetBall&row=<#=row#>&bound=big" href="javascript:void(0);">大</a>'),g.push('<a data-param="action=batchSetBall&row=<#=row#>&bound=small" href="javascript:void(0);">小</a>'),g.push('<a data-param="action=batchSetBall&row=<#=row#>&bound=odd" href="javascript:void(0);">奇</a>'),g.push('<a data-param="action=batchSetBall&row=<#=row#>&bound=even" href="javascript:void(0);">偶</a>'),g.push('<a data-param="action=batchSetBall&row=<#=row#>&bound=none" href="javascript:void(0);">清</a>'),g.push("</div>"),g.push("</li>");var h=[];h.push("</ul>"),h.push("</div>");var i=[],j=g.join("");i.push(f.join("")),$.each(["万","千","百","十","个"],function(a){i.push(j.replace(/<#=title#>/g,this).replace(/<#=row#>/g,a))}),i.push(h.join(""));var k=a.Class(e,b);k.defConfig=c,d[c.name]=new k}(phoenix,phoenix.GameMethod);