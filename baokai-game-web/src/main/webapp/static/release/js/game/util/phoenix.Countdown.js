!function(a,b,c){var d={startTime:"2013-1-1,00:00:00",endTime:"2014-1-1,00:00:00",frequency:1e3,finishFun:null,isRedress:!1,redressTime:10,redressUrl:"./simulatedata/getnowtime.php",isLoop:!1,showDom:"#time"},e=0,f=[],g={init:function(){var a=this;a.startTime=new Date(a.defConfig.startTime),a.endTime=new Date(a.defConfig.endTime),a.frequency=a.defConfig.frequency,a.timeload=null,a.continueCount()},getStartTime:function(){return this.startTime},setStartTime:function(a){this.startTime=a},getEndTime:function(){return this.endTime},setEndTime:function(a){this.endTime=a},getFrequency:function(){return this.frequency},setFrequency:function(a){this.frequency=a},getRedressUrl:function(){return this.defConfig.redressUrl},setRedressUrl:function(a){this.defConfig.redressUrl=a},getRedressTime:function(){return this.defConfig.redressTime},setRedressTime:function(a){this.defConfig.redressTime=a},joinEvents:function(a,b){f.push([a,b])},_countFun:function(){{var a,b=this,c={},d=null,f=b.getStartTime(),g=b.getEndTime();this.defConfig.ruleTime}this.timeFun=setInterval(function(){return a=d||parseInt((g-f)/1e3),null==d&&(d=a),e++,c.allSecond=a,c.w=parseInt(a/3600/24/7),c.d=parseInt(a/3600/24),c.h=parseInt(a/3600%24),c.m=parseInt(a/60%60),c.s=0==d?d:parseInt(a%60),b.doFixedEvents(e),b._showTime(c),b.defConfig.isRedress&&e%b.getRedressTime()==0&&d>b.getRedressTime()&&b.redRessTime(),0>=d?(b.timeload&&b.timeload.abort(),b._endCount(),void b.fireEvent("afterTimeFinish")):void(d=null!=d?d-1:a-1)},b.getFrequency())},redRessTime:function(){var a=this,b=(new Date).getTime();a.timeload&&a.timeload.abort(),a.timeload=$.ajax({url:a.getRedressUrl(),type:"GET",dataType:"json"}).done(function(c){1==Number(c.isSuccess)&&(a.stopCount(),a.setStartTime(new Date(c.nowTime).getTime()+((new Date).getTime()-b)),a.continueCount())}).fail(function(){}).always(function(){a.timeload=null})},doFixedEvents:function(a){var b=this,c=0;if(0!=f.length)for(;c<f.length;c++)a==f[c][0]&&(f[c][1].call(b),f.splice(c,1))},_showTime:function(a){var b=$(this.defConfig.showDom),c=b.find(".week"),d=b.find(".day"),e=b.find(".hour"),f=b.find(".min"),g=b.find(".sec");c.text(a.w),d.text(a.d),e.text(a.h),f.text(a.m),g.text(a.s)},checkNum:function(a){return 10>a?"0"+a:a},_endCount:function(){this.stopCount(),e=0,this.defConfig.finishFun&&this.defConfig.finishFun.call(this)},stopCount:function(){clearInterval(this.timeFun),this.timeFun=null},continueCount:function(){this.defConfig.serverTimeURl?this._serverTime():this._countFun()}},h=a.Class(g,c);h.defConfig=d,a[b]=h}(phoenix,"CountDown",phoenix.Event);