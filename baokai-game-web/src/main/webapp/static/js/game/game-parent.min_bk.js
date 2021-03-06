!
function(e, t, a) {
    var n = {};
    n.cacheData = {},
    n.currentGame = null,
    n.currentGameTypes = null,
    n.currentGameStatistics = null,
    n.currentGameOrder = null,
    n.currentGameTrace = null,
    n.currentGameSubmit = null,
    n.currentGameMessage = null,
    n.currentIsMoreBouns = {},
    n.getCurrentGame = function() {
        return n.currentGame
    },
    n.setCurrentGame = function(e) {
        n.currentGame = e
    },
    n.getCurrentGameTypes = function() {
        return n.currentGameTypes
    },
    n.setCurrentGameTypes = function(e) {
        n.currentGameTypes = e
    },
    n.getCurrentGameStatistics = function() {
        return n.currentGameStatistics
    },
    n.setCurrentGameStatistics = function(e) {
        n.currentGameStatistics = e
    },
    n.getCurrentGameOrder = function() {
        return n.currentGameOrder
    },
    n.setCurrentGameOrder = function(e) {
        n.currentGameOrder = e
    },
    n.getCurrentGameTrace = function() {
        return n.currentGameTrace
    },
    n.setCurrentGameTrace = function(e) {
        n.currentGameTrace = e
    },
    n.getCurrentGameSubmit = function() {
        return n.currentGameSubmit
    },
    n.setCurrentGameSubmit = function(e) {
        n.currentGameSubmit = e
    },
    n.getCurrentGameMessage = function() {
        return n.currentGameMessage
    },
    n.setCurrentGameMessage = function(e) {
        n.currentGameMessage = e
    },
    e[t] = n
} (phoenix, "Games"),
function(e, t, a, n) {
    var r = {
        name: "",
        basePath: staticFileContextPath + "/static/js/game/",
        baseNamespace: "phoenix.Games.",
        dynamicConfigUrl: "",
        eventProxyPanel: "body"
    },
    i = e.Games,
    o = function(e) {
        for (var t, a = $.trim(e).split("&"), n = 0, r = a.length, i = {}; n < r; n++) t = a[n].split("="),
        t.length > 0 && (2 == t.length ? i[t[0]] = t[1] : i[t[0]] = "");
        return i
    },
    l = {
        init: function(e) {
            var t = this;
            t.setName(e.name),
            t.currentNumber = "",
            t.currentIssueCode = 0,
            i.setCurrentGame(t),
            t.loadedHas = {},
            t.currentGameMethod = null,
            t.dynamicConfig = null,
            t.methodLoadCache = !1,
            t.addEvent("afterSwitchGameMethod",
            function() {
                i.getCurrentGame().getCurrentGameMethod().reSet(),
                t.methodLoadCache = !1;
                var e = i.getCurrentGame().getCurrentGameMethod().getGameMethodName(),
                a = i.getCurrentGame().getDynamicConfig().gamelimit,
                n = i.getCurrentGame().getGameConfig().getInstance().defConfig.gameType;
                a[e] ? (i.getCurrentGameStatistics().setMultipleLimit(a[e].maxmultiple), "quwei.normal.dingdanshuang" == e && (i.getCurrentGame().specialMultiple = a[e].specialMultiple)) : i.getCurrentGameStatistics().setMultipleLimit( - 1),
                i.getCurrentGameStatistics().setMultipleDom(1),
                "slmmc" != $.trim(n) && "sl115" != $.trim(n) && i.getCurrentGameTrace().hide(),
                i.getCurrentGame().getCurrentGameMethod().updataGamesInfo()
            }),
            t.addEvent("changeDynamicConfig",
            function() {
                t.updateDynamicConfig()
            })
        },
        getMaxMultipleLimit: function(e) {
            var t = e || i.getCurrentGame().getCurrentGameMethod().getGameMethodName(),
            a = i.getCurrentGame().getDynamicConfig().gamelimit;
            return Number(a[t].maxmultiple)
        },
        getDynamicConfigUrl: function() {
            return i.getCurrentGame().getGameConfig().getInstance().getDynamicConfigUrl()
        },
        getServerDynamicConfig: function(e) {
            var t = this,
            a = (t.defConfig, t.getName());
            $.ajax({
                url: i.getCurrentGame().getGameConfig().getInstance().getDynamicConfigUrl() + "?gametype=" + a,
                dataType: "JSON",
                cache: !1,
                success: function(a) {
                    1 == Number(a.isSuccess) && (a.data.gamelimit = a.data.gamelimit[0], t.setDynamicConfig(a.data), $.isFunction(e) && e.call(t, a.data))
                }
            })
        },
        getDynamicConfig: function() {
            return this.dynamicConfig
        },
        setDynamicConfig: function(e) {
            this.dynamicConfig = e,
            this.fireEvent("changeDynamicConfig", e)
        },
        addDynamicBonus: function(e, t) {
            var a = this,
            n = a.getDynamicConfig();
            "undefined" != typeof n.gamelimit && "undefined" != typeof n.gamelimit[e] && (n.gamelimit[e].usergroupmoney = t)
        },
        updateDynamicConfig: function() {
            var e = this,
            t = e.getDynamicConfig(),
            a = t.lastballs.split(",");
            return 1 == t.isstop ? void setTimeout(function() {
                phoenix.Games.getCurrentGameMessage().show({
                    type: "lotteryClose",
                    data: {
                        tplData: {
                            lotterys: [1, 2, 3, 4, 5, 6],
                            lotteryName: "shishicai",
                            lotteryPeriods: "20130528-276",
                            orderDate: {
                                year: "2013",
                                month: "5",
                                day: "3",
                                hour: "1",
                                min: "30"
                            },
                            lotteryType: [{
                                name: "leli",
                                pic: "#",
                                url: "http://163.com"
                            },
                            {
                                name: "kuaile8",
                                pic: "#",
                                url: "http://pp158.com"
                            }]
                        }
                    }
                })
            },
            1e3) : (e.setCurrentNumber(t.number), e.setCurrentIssueCode(t.issueCode), $("#J-lottery-info-number").html(t.number), $("#J-lottery-info-currentIssue").val(t.issueCode), $("#J-lottery-info-lastnumber").html(t.lastnumber), $("#lottery-info").html(t.ballInfo), $("#J-lottery-info-balls").find("em").each(function(e) {
                this.innerHTML = a[e]
            }), i.cacheData.frequency = {},
            void(i.cacheData.charts = {}))
        },
        eventProxy: function() {
            var e = this,
            t = e.defConfig,
            a = $(t.eventProxyPanel);
            a.click(function(t) {
                var a, n, r = t.target.getAttribute("data-param");
                r && "" != $.trim(r) && (t.preventDefault(), a = o(r), n = e.getCurrentGameMethod(), n && n.exeEvent(a, t.target))
            })
        },
        getGameMethodByName: function(e) {
            var t = this,
            a = t.loadedHas;
            if (t.hasOwnProperty(e) && a.hasOwnProperty(t.buildPath(e))) return t[e]
        },
        switchGameMethod: function(e) {
            var t, a, n = this;
            n.loadedHas;
            if (!n.methodLoadCache) {
                n.methodLoadCache = !0,
                n.fireEvent("beforeSwitchGameMethod", e);
                for (t in n) n.getGameMethodByName(t) && (t != e ? n[t].hide() : (n[t].show(), n.currentGameMethod = n[t], n.fireEvent("afterSwitchGameMethod")));
                n.getGameMethodByName(e) || n.setup(e,
                function() {
                    a = n.getGameMethodByName(e),
                    a.show(),
                    n.currentGameMethod = a,
                    n.fireEvent("afterSetup"),
                    n.fireEvent("afterSwitchGameMethod")
                })
            }
        },
        getCurrentGameMethod: function() {
            return this.currentGameMethod
        },
        setup: function(e, t) {
            var a, n = this,
            r = n.buildPath(e),
            i = function() {};
            a = arguments.length > 0 ? arguments[arguments.length - 1] : i,
            $.isFunction(a) || (a = i),
            n.isSetuped(e) || $.ajax({
                url: r,
                cache: !1,
                dataType: "script",
                success: function() {
                    n.loadedHas[r] = !0,
                    a.call(n)
                },
                error: function(e, t) {
                    alert("资源加载失败\n" + r + "\n错误类型：" + t)
                }
            })
        },
        buildPath: function(e) {
            var t = this,
            a = t.defConfig.basePath,
            n = t.defConfig.baseNamespace,
            r = a + n + e + ".js";
            return r
        },
        isSetuped: function(e) {
            var t = this,
            a = t.loadedHas,
            n = t.buildPath(e);
            return a.hasOwnProperty(n)
        },
        setSetuped: function(e, t, a) {},
        getGameConfig: function() {},
        getName: function() {
            return this.name
        },
        setName: function(e) {
            this.name = e
        },
        setCurrentNumber: function(e) {
            this.currentNumber = e
        },
        getCurrentNumber: function() {
            return this.currentNumber
        },
        setCurrentIssueCode: function(e) {
            this.currentIssueCode = e
        },
        getCurrentIssueCode: function() {
            return this.currentIssueCode
        },
        editSubmitData: function(e) {
            return e
        },
        bonusGroupProce: function() {},
        parseBallData: function(t, a) {
            var n = e.Games,
            r = {},
            o = [],
            l = [],
            s = n.getCurrentGameOrder();
            o = a.split("_");
            for (var c = o.length - 1; c >= 0; c--) {
                l = [],
                singel = o[c].split("-");
                for (var u = singel.length - 1; u >= 0; u--) l.push(singel[u].split(""));
                r = {
                    type: t,
                    original: l,
                    lotterys: l,
                    moneyUnit: i.getCurrentGameStatistics().getMoneyUnit(),
                    multiple: i.getCurrentGameStatistics().getMultip(),
                    onePrice: i.getCurrentGameStatistics().getOnePrice(),
                    num: l.length
                },
                r.amountText = i.getCurrentGameStatistics().formatMoney(r.num * r.moneyUnit * r.multiple * r.onePrice),
                s.add(r)
            }
        },
        parseDataFormUrl: function() {
            var t = this,
            a = e.Games.getCurrentGameTypes(),
            n = $.trim(e.util.getParam("gametype")),
            r = $.trim(e.util.getParam("ball"));
            n && a.changeMode(n),
            r && t.parseBallData(n, r)
        }
    },
    s = e.Class(l, a);
    s.defConfig = r,
    e[t] = s
} (phoenix, "Game", phoenix.Event),
function(e, t, a, n) {
    var r = {
        name: "",
        UIContainer: "#J-balls-main-panel",
        ballsDom: ".ball-number",
        ballAidDom: ".ball-aid-hot",
        ballCurrentCls: "ball-number-current",
        methodMassageDom: ".prompt .method-tip",
        methodExampleDom: ".prompt .example-tip",
        hotColdUrl: "",
        randomBetsNum: 500,
        danshiLimitBall: 1e3
    },
    o = e.Games,
    l = {
        init: function(e) {
            var t = this;
            t.UIContainer = $(e.UIContainer),
            t.container = $("<div></div>").appendTo(t.UIContainer),
            t.buildUI(),
            t.hide(),
            t.balls = [],
            t.rebuildData(),
            t.ballsDom = t.getBallsDom(),
            t.ballsAidDom = t.getBallsAidDom(),
            t.isBallsComplete = !1,
            t.addEvent("updateData",
            function(e, t) {
                var a = this,
                t = a.isBallsComplete ? t: {
                    lotterys: [],
                    original: []
                };
                o.getCurrentGameStatistics().updateData(t, a.getGameMethodName()),
                a.batchSetBallDom()
            }),
            t.addEvent("afterReset",
            function() {
                t.exeEvent_cancelCurrentButton()
            }),
            t.addEvent("afterSetBallData",
            function() {
                t.exeEvent_cancelCurrentButton()
            }),
            t.getHotCold(t.getGameMethodName(), "currentFre", "lost")
        },
        getBallsDom: function() {
            var e = this,
            t = e.defConfig,
            a = e.balls;
            return a.length < 1 ? [] : e.ballsDom ||
            function() {
                for (var n = e.container.find(t.ballsDom), r = 0, i = n.length, o = [], l = [], s = a[0].length; r < i; r++) o.push(n[r]),
                (r + 1) % s != 0 && r + 1 != i || (l.push(o), o = []);
                return l
            } ()
        },
        updataGamesInfo: function() {
            var e = this,
            t = e.getGameMethodName(),
            a = o.getCurrentGame(),
            n = t + "lostcurrentFre",
            r = o.getCurrentGame().getGameConfig().getInstance().getBetAwardUrl() + "?type=" + t + "&extent=currentFre&line=5&lenth=30";
            o.cacheData.gameBonus || (o.cacheData.gameBonus = {}),
            o.cacheData.gameTips || (o.cacheData.gameTips = {}),
            o.cacheData.frequency || (o.cacheData.frequency = {}),
            o.currentIsMoreBouns.moreBouns || (o.currentIsMoreBouns.moreBouns = {}),
            o.cacheData.gameBonus[r] && a.addDynamicBonus(t, o.cacheData.gameBonus[r]),
            o.cacheData.gameTips[r] && e.methodTip(o.cacheData.gameTips[r]),
            o.cacheData.frequency[n] && e.getHotCold(t, "currentFre", "lost", "当前遗漏"),
            $.ajax({
                url: r,
                dataType: "json",
                cache: !1,
                success: function(i) {
                    if (1 == Number(i.isSuccess)) {
                        data = i.data,
                        "undefined" != typeof data.gameTips && (o.cacheData.gameTips[r] = data.gameTips, e.methodTip(data.gameTips)),
                        "undefined" != typeof data.frequency && data.frequency.length > 0 && (o.cacheData.frequency[n] = data.frequency, e.getHotCold(t, "currentFre", "lost")),
                        data.gameTips && "undefined" != typeof data.gameTips.actualBonus && (o.cacheData.gameBonus[r] = data.gameTips.actualBonus, a.addDynamicBonus(t, data.gameTips.actualBonus)),
                        "undefined" != typeof i.moreBouns && (o.currentIsMoreBouns.moreBouns[t] = i.moreBouns);
                        var l = Number(data.gameTips.actualBonus),
                        s = Number(data.gameTips.theoryBonus),
                        c = Number(data.gameTips.retPoint),
                        u = c.toFixed(2),
                        m = phoenix.Games.getCurrentGameStatistics().rebateSelect;
                        if (m && c > 0) {
                            var d = l + s * c / 100 + "";
                            d.indexOf(".") > -1 && (d = d.substr(0, d.indexOf(".") + 3)),
                            m.setValue(l + " - " + u + "%"),
                            $("#J-choose-rebate").show(),
                            $("#J-select-rebate").html('<option selected="selected" retPointValue="1"  value="' + l + '">' + l + " - " + u + '%</option>'+'<option  retPointValue="2" value="' + (l + s * u / 100) + '">' + d + " - 0.00%</option>"),
                            m.getListDom().html('<a data-value="' + l + '" href="javascript:void(0);">' + l + " - " + u + '%</a>'+'<a data-value="' + (l + s * u / 100) + '" href="javascript:void(0);">' + d + " - 0.00%</a>")
                        } else $("#J-select-rebate").html('<option selected="selected" retPointValue="1"  value=""></option>'),
                        $("#J-choose-rebate").hide()
                    }
                }
            })
        },
        updataGamesInfo2: function() {
            var e = this,
            t = e.getGameMethodName(),
            a = o.getCurrentGame(),
            n = t + "lostcurrentFre",
            r = o.getCurrentGame().getGameConfig().getInstance().getBetAwardUrl() + "?type=" + t + "&extent=currentFre&line=5&lenth=30";
            o.cacheData.gameBonus || (o.cacheData.gameBonus = {}),
            o.cacheData.gameTips || (o.cacheData.gameTips = {}),
            o.cacheData.frequency || (o.cacheData.frequency = {}),
            o.currentIsMoreBouns.moreBouns || (o.currentIsMoreBouns.moreBouns = {}),
            o.cacheData.gameBonus[r] && a.addDynamicBonus(t, o.cacheData.gameBonus[r]),
            o.cacheData.gameTips[r] && e.methodTip(o.cacheData.gameTips[r]),
            o.cacheData.frequency[n] && e.getHotCold(t, "currentFre", "lost", "当前遗漏"),
            $.ajax({
                url: r,
                dataType: "json",
                cache: !1,
                success: function(i) {
                    1 == Number(i.isSuccess) && (data = i.data, "undefined" != typeof data.gameTips && (o.cacheData.gameTips[r] = data.gameTips, e.methodTip(data.gameTips)), "undefined" != typeof data.frequency && data.frequency.length > 0 && (o.cacheData.frequency[n] = data.frequency, e.getHotCold(t, "currentFre", "lost")), data.gameTips && "undefined" != typeof data.gameTips.actualBonus && (o.cacheData.gameBonus[r] = data.gameTips.actualBonus, a.addDynamicBonus(t, data.gameTips.actualBonus)), "undefined" != typeof i.moreBouns && (o.currentIsMoreBouns.moreBouns[t] = i.moreBouns))
                }
            })
        },
        getChart: function(e, t) {
            var a = this,
            n = $.trim(e),
            r = o.getCurrentGame().getGameConfig().getInstance().trendChartUrl() + n + "&extent=currentFre&line=5&lenth=30";
            "undefined" == typeof o.cacheData.charts && (o.cacheData.charts = {}),
            "undefined" != typeof o.cacheData.charts[n] ? t && t(o.cacheData.charts[n]) : $.ajax({
                url: r,
                dataType: "json",
                cache: !1,
                success: function(e) {
                    if (1 == e.isSuccess) e.data.historyBalls,
                    o.cacheData.charts[n] = e.data.historyBalls,
                    t && t(o.cacheData.charts[n]);
                    else try {
                        console.log("服务器异常,请刷新页面重试。")
                    } catch(e) {}
                }
            }),
            a.fireEvent("afterUpdataGamesInfo", e)
        },
        methodTip: function(e) {
            var t = this,
            a = t.defConfig;
            $(a.methodMassageDom).html(e.tips),
            $(a.methodExampleDom).html(e.example)
        },
        getHotCold: function(e, t, a, n) {
            var r = this,
            i = r.container.find(".number-select-title"),
            l = r.container.find(".number-select-content");
            cacheName = e + a + t,
            lostClass = ".game-frequency-lost-length",
            freClass = ".game-frequency-fre-length",
            "maxFre" != t && "currentFre" != t || (a = "lost");
            var s = o.getCurrentGame().getGameConfig().getInstance().getHotColdUrl() + "?gameMode=" + e + "&extent=" + t + "&frequencyType=" + a + "&line=5&lenth=30";
            "lost" == a ? ($(freClass).hide(), $(lostClass).show()) : ($(freClass).show(), $(lostClass).hide()),
            i.find("a,li").removeClass("current"),
            i.find(".period" + t).addClass("current"),
            i.find("." + a).addClass("current"),
            l.find(".ball-title span").html(n),
            o.cacheData.frequency || (o.cacheData.frequency = {}),
            o.cacheData.frequency[cacheName] ? r.reBuildHotCold(o.cacheData.frequency[cacheName], a) : $.get(s,
            function(e) {
                r.reBuildHotCold(e, a),
                o.cacheData.frequency[cacheName] = e
            },
            "json")
        },
        reBuildHotCold: function(e, t) {
            for (var a, n = this,
            r = [], i = [], o = 0, l = 0, s = 0; s < e.length; s++) {
                a = e[s];
                for (var c in a) {
                    var u = a[c].currentNum,
                    m = a[c].pinlv;
                    r.push([m, u]),
                    i.push(m),
                    n.setBallAidData(s, u, m)
                }
                o = Math.min.apply(Math, i),
                l = Math.max.apply(Math, i);
                for (var d = 0; d < r.length; d++)"lost" == t ? r[d][0] == l && n.setBallAidData(s, r[d][1], r[d][0], "ball-aid-hot") : (r[d][0] == o && n.setBallAidData(s, r[d][1], r[d][0], "ball-aid-cold"), r[d][0] == l && n.setBallAidData(s, r[d][1], r[d][0], "ball-aid-hot"));
                r = [],
                i = []
            }
        },
        initHotColdEvent: function() {
            var e = this,
            t = 30,
            a = "lost",
            n = "game-frequency-lost-length",
            r = "game-frequency-fre-length",
            i = ".game-frequency-type li",
            l = ".game-frequency-lost-length a, .game-frequency-fre-length a";
            e.container.on("click", i,
            function() {
                var e, i = ($(this).parent(), o.getCurrentGame().getCurrentGameMethod().getGameMethodName());
                $(this).hasClass("fre") ? (a = $(this).attr("data-type"), $("." + r).show(), $("." + n).hide(), t = 30, e = "30期") : $(this).hasClass("lost") && (a = $(this).attr("data-type"), $("." + r).hide(), $("." + n).show(), t = "currentFre", e = "当前遗漏"),
                o.getCurrentGame().getCurrentGameMethod().getHotCold(i, t, a, e)
            }),
            e.container.on("click", l,
            function() {
                var e = ($(this).parent(), o.getCurrentGame().getCurrentGameMethod().getGameMethodName()),
                t = $(this).html(),
                n = $(this).attr("data-type");
                o.getCurrentGame().getCurrentGameMethod().getHotCold(e, n, a, t)
            }).trigger("click")
        },
        reSelect: function(e) {
            var t, a, n, r, i, o, l = this,
            s = (l.getGameMethodName(), e),
            c = !1;
            for (l.reSet(), t = 0, a = s.length; t < a; t++) for (n = 0, r = s[t].length; n < r; n++) i = t,
            o = s[t][n],
            l.setBallData(i, o, 1),
            c = !0;
            c && l.updateData()
        },
        makePostParameter: function(e) {
            for (var t = [], a = e.length, n = 0; n < a; n++) t = t.concat(e[n].join(""));
            return t.join(",")
        },
        arrIndexOf: function(e, t) {
            for (var a = 0,
            n = 0; n < t.length; n++) t[n] == e && (a += 1);
            return a || -1
        },
        rebuildData: function() {},
        getBallData: function() {
            return this.balls
        },
        setBallData: function(e, t, a) {
            var n = this,
            r = n.getBallData();
            e >= 0 && e < r.length && t >= 0 && t < r[0].length && (r[e][t] = a),
            n.fireEvent("afterSetBallData", e, t, a)
        },
        setBallAidData: function(e, t, a, n) {
            var r = this,
            i = "ball-aid",
            o = r.getBallsAidDom(),
            n = n ? i + " " + n: i;
            e >= 0 && e < o.length && o[e] && t >= 0 && t < o[e].length && o[e][t] && (o[e][t].innerHTML = a, o[e][t].className = n)
        },
        getBallsAidDom: function() {
            var e = this,
            t = e.defConfig,
            a = e.balls;
            return a.length < 1 ? [] : e.ballsAidDom ||
            function() {
                var n = e.container.find(t.ballAidDom),
                r = 0,
                o = a.length,
                l = [];
                for (i = 0; i < o; i++) {
                    var s = a[i],
                    c = s.length,
                    u = [];
                    for (j = 0; j < c; j++) n[r] && u.push(n[r]),
                    r++;
                    l.push(u)
                }
                return l
            } ()
        },
        reSet: function(e) {
            var t = this;
            t.isBallsComplete = !1,
            t.rebuildData(e),
            t.updateData(),
            t.fireEvent("afterReset")
        },
        getGameMethodName: function() {
            return this.defConfig.name
        },
        show: function() {
            var e = this;
            e.fireEvent("beforeShow"),
            e.container.show(),
            e.fireEvent("afterShow")
        },
        hide: function() {
            var e = this;
            e.fireEvent("beforeHide"),
            e.container.hide(),
            e.fireEvent("afterHide")
        },
        exeEvent: function(e, t) {
            var a = this;
            $.isFunction(a["exeEvent_" + e.action]) && a["exeEvent_" + e.action].call(a, e, t)
        },
        exeEvent_batchSetBall: function(e, t) {
            var a = this,
            n = a.balls,
            r = Number(e.row),
            i = e.bound,
            l = n[r],
            s = 0,
            c = l.length,
            u = "undefined" == typeof e.start ? 0 : Number(e.start);
            for (halfLen = Math.ceil((c - u) / 2 + u), dom = $(t), s = u; s < c; s++) a.setBallData(r, s, -1);
            switch (i) {
            case "all":
                for (s = u; s < c; s++) a.setBallData(r, s, 1);
                break;
            case "big":
                for (s = halfLen; s < c; s++) a.setBallData(r, s, 1);
                break;
            case "small":
                var m;
                for (m = o.getCurrentGame().getGameConfig().getInstance().defConfig.gameType.indexOf("115") < 0 ? u: "quwei.normal.caizhongwei" == a.defConfig.name ? u + 2 : u + 1, s = m; s < halfLen; s++) a.setBallData(r, s, 1);
                break;
            case "odd":
                for (s = u; s < c; s++)(s + 1) % 2 != 1 && a.setBallData(r, s, 1);
                break;
            case "even":
                for (s = u; s < c; s++)(s + 1) % 2 == 1 && a.setBallData(r, s, 1);
                break;
            case "none":
            }
            dom.addClass("current"),
            a.updateData()
        },
        exeEvent_cancelCurrentButton: function() {
            var e = this,
            t = e.container,
            a = "undefined" != typeof x ? t.find(".ball-control").eq(x) : t.find(".ball-control");
            a.find("a").removeClass("current")
        },
        exeEvent_ball: function(e, t) {
            var a = this,
            r = $(t),
            i = a.defConfig.ballCurrentCls;
            if (e.value != n && e.row != n) r.hasClass(i) ? a.setBallData(Number(e.row), Number(e.value), -1) : (a.fireEvent("beforeSelect"), a.setBallData(Number(e.row), Number(e.value), 1));
            else try {
                console.log("GameMethod.exeEvent_ball: lack param")
            } catch(e) {}
            if (a.updateData(), "quwei.normal.dingdanshuang" == o.getCurrentGame().getCurrentGameMethod().getGameMethodName()) {
                var l = r.parent().parent().find("." + i),
                s = [],
                c = function(e) {
                    for (var t, a = $.trim(e).split("&"), n = 0, r = a.length, i = {}; n < r; n++) t = a[n].split("="),
                    t.length > 0 && (2 == t.length ? i[t[0]] = t[1] : i[t[0]] = "");
                    return i
                };
                $.each(l,
                function(e, t) {
                    var a, n = t.getAttribute("data-param");
                    n && "" != $.trim(n) && (a = c(n)),
                    s.push(o.getCurrentGame().specialMultiple[a.value])
                }),
                o.getCurrentGameStatistics().setMultipleLimit(s.sort()[0]),
                o.getCurrentGameStatistics().multipleDom.input.trigger("keyup")
            }
        },
        batchSetBallDom: function() {
            for (var e = this,
            t = e.defConfig,
            a = t.ballCurrentCls,
            n = e.balls,
            r = 0,
            i = 0,
            o = n.length,
            l = 0,
            s = e.getBallsDom(), c = ""; r < o; r++) for (l = n[r].length, i = 0; i < l; i++) 1 == n[r][i] ? (c = s[r][i].className, c = (" " + c + " ").replace(" " + a, ""), c += " " + a, s[r][i].className = c) : (c = s[r][i].className, c = (" " + c + " ").replace(" " + a, ""), s[r][i].className = c)
        },
        updateData: function() {
            var e = this,
            t = e.getLottery();
            e.fireEvent("updateData", {
                lotterys: t,
                original: e.getOriginal()
            })
        },
        getOriginal: function() {
            var e = this,
            t = e.getBallData(),
            a = t.length,
            n = t[0].length;
            for (i = 0, j = 0, row = [], result = []; i < a; i++) {
                for (row = [], j = 0; j < n; j++) t[i][j] > 0 && row.push(j);
                result.push(row)
            }
            return result
        },
        getLottery: function(e) {
            for (var t, a = this,
            n = a.getBallData(), r = 0, i = n.length, o = !0, l = 0, s = 0, c = [], u = 1, m = 0; r < i; r++) {
                for (c[r] = [], t = n[r], s = t.length, o = !0, m = 0, l = 0; l < s; l++) t[l] > 0 && (o = !1, e || c[r].push(l), m++);
                if (o) return a.isBallsComplete = !1,
                [];
                u *= m
            }
            return a.isBallsComplete = !0,
            e ? u: a.isBallsComplete ? a.combination(c) : []
        },
        removeSame: function(e) {
            var t, a = 0,
            n = this,
            r = this.getBallData()[0].length;
            e.length;
            for (t = Math.floor(Math.random() * r); a < e.length; a++) if (t == e[a]) return arguments.callee.call(n, e);
            return t
        },
        removeArraySame: function(e) {
            var t, a = this,
            n = 0,
            r = a.getBallData()[0].length;
            data.length;
            for (t = Math.floor(Math.random() * r); n < e.length; n++) if (t == e[n]) return arguments.callee.call(a, e);
            return t
        },
        getRandomBetsNum: function() {
            return this.defConfig.randomBetsNum
        },
        createRandomNum: function() {
            for (var e = this,
            t = [], a = e.getBallData().length, n = e.getBallData()[0].length, r = 0; r < a; r++) t[r] = [Math.floor(Math.random() * n)],
            t[r].sort(function(e, t) {
                return e > t ? 1 : -1
            });
            return t
        },
        checkRandomBets: function(e, t) {
            var a = this,
            n = "undefined" == typeof e,
            e = e || {},
            r = [],
            t = t || 0,
            i = (a.getBallData().length, a.getBallData()[0].length, o.getCurrentGameOrder().getTotal().orders);
            if (r = a.createRandomNum(), Number(t) > Number(a.getRandomBetsNum())) return r;
            if (n) for (var l = 0; l < i.length; l++) if (i[l].type == a.defConfig.name) {
                var s = i[l].original.join("");
                e[s] = s
            }
            return e[r.join("")] ? (t++, arguments.callee.call(a, e, t)) : r
        },
        randomNum: function() {
            var e = this,
            t = [],
            a = null,
            n = (e.getBallData(), e.defConfig.name, []),
            r = [];
            return t = e.checkRandomBets(),
            r = t,
            n = e.combination(r),
            a = {
                type: o.getCurrentGame().getCurrentGameMethod().getGameMethodName(),
                original: r,
                lotterys: n,
                moneyUnit: o.getCurrentGameStatistics().getMoneyUnit(),
                multiple: o.getCurrentGameStatistics().getMultip(),
                onePrice: o.getCurrentGameStatistics().getOnePrice(),
                num: n.length
            },
            a.amountText = o.getCurrentGameStatistics().formatMoney(a.num * a.moneyUnit * a.multiple * a.onePrice),
            a
        },
        randomLotterys: function(e) {
            var t = this,
            a = 0;
            for (o.getCurrentGameOrder().cancelSelectOrder(); a < e; a++) o.getCurrentGameOrder().add(t.randomNum())
        },
        ballsErrorTip: function() {},
        countBallsNum: function() {
            for (var e = this,
            t = 0,
            a = e.getBallData(), n = a.length - 1; n >= 0; n--) if ("[object Array]" == Object.prototype.toString.call(a[n]) && a[n].length > 0) for (var r = a[n].length - 1; r >= 0; r--) 1 == a[n][r] && t++;
            else 1 == a[n] && t++;
            return t
        },
        countBallsNumInLine: function(e) {
            var t = this,
            a = 0,
            n = t.getBallData();
            if ("[object Array]" == Object.prototype.toString.call(n[e]) && n[e].length > 0) for (var r = n[e].length - 1; r >= 0; r--) 1 == n[e][r] && a++;
            else 1 == n[e] && a++;
            return a || -1
        },
        LimitMaxBalls: function(e) {
            var t = this,
            a = 0;
            t.getBallData(),
            Number(a);
            return a = t.countBallsNum(),
            a > e
        },
        checkBallIsComplete: function() {
            for (var e, t = this,
            a = t.getBallData(), n = 0, r = a.length, i = !0, o = 0, l = 0; n < r; n++) {
                for (e = a[n], l = e.length, i = !0, o = 0; o < l; o++) e[o] > 0 && (i = !1);
                if (i) return t.isBallsComplete = !1,
                !1
            }
            return t.isBallsComplete = !0
        },
        combine: function(e, t, a) {
            var n = [],
            r = 0;
            if (a = a || [], 0 == t) return [a];
            for (; r <= e.length - t; r++) n = n.concat(arguments.callee(e.slice(r + 1), t - 1, a.slice(0).concat(e[r])));
            return n
        },
        combination: function(e) {
            if (e.length < 1) return [];
            var t, a, n, r = (e[0].length, e.length),
            i = [],
            o = [],
            l = [];
            for (i[t = r] = 1; t--;) i[t] = i[t + 1] * e[t].length;
            for (n = i[0], t = 0; t < n; t++) {
                for (l = [], a = 0; a < r; a++) l[a] = e[a][~~ (t % i[a] / i[a + 1])];
                o[t] = l
            }
            return o
        },
        checkLimitBall: function(e) {
            var t = this,
            a = t.defConfig.danshiLimitBall,
            n = o.getCurrentGameMessage(),
            r = Number(e.lotterys.length) || 0;
            r > a && (e.lotterys = [], n.show({
                mask: !0,
                content: ['<div class="bd text-center">', '<div class="pop-waring">', '<i class="ico-waring"></i>', '<div style="display:inline-block;*zoom:1;*display:inline;vertical-align:middle">最多支持' + a + "注单式内容，请调整！</div>", "</div>", "</div>"].join(""),
                closeIsShow: !0,
                closeFun: function() {
                    this.hide()
                }
            }))
        }
    },
    s = e.Class(l, a);
    s.defConfig = r,
    e[t] = s
} (phoenix, "GameMethod", phoenix.Event),
function(e, t, a, n) {
    var r, i = {
        lotteryClose: ['<div class="bd text-center">', '<p class="text-title text-left"><#=msg#><br /></p>', '<dl class="lottery-list">', "<dt>您可以购买以下彩种</dt>", "<#=lotteryType#>", "</dl>", "</div>"].join(""),
        checkLotters: ['<div class="bd">', '<ul class="ui-form">', "<li>", '<label for="question1" class="ui-label">彩种：</label>', '<span class="ui-text-info"><#=lotteryName#></span>', "</li>", "<li>", '<label for="question1" class="ui-label" >期号：</label>', '<span class="ui-text-info"><#=lotteryDate#></span>', "</li>", "<li>", '<label for="answer1" class="ui-label">详情：</label>', '<div class="textarea" style="font-size:12px;" >', "<#=lotteryInfo#>", "</div>", "</li>", "<li>", '<label for="question2" class="ui-label">付款总金额：</label>', '<span class="ui-text-info"><span class="color-red"><#=lotteryamount#></span>元</span>', "</li>", "<li>", '<label for="question2" class="ui-label">付款帐号：</label>', '<span class="ui-text-info"><span class="color-red"><#=lotteryAcc#></span></span>', "</li>", "</ul>", '<p class="text-note"><#=lotteryChareg#></p>', '<p class="text-note"><#=lotteryCharegPlurality#></p>', "</div>"].join(""),
        nonSaleTime: ['<div class="bd text-center">', '<p class="text-title text-left">非常抱歉，本彩种未到销售时间。<br />请与<#=orderDate#>后再购买</p>', '<dl class="lottery-list">', "<dt>您可以购买以下彩种</dt>", "<#=lotteryType#>", "</dl>", "</div>"].join(""),
        normal: ['<div class="bd text-center">', '<div class="pop-waring">', '<i class="ico-waring <#=icon-class#>"></i>', '<h4 class="pop-text"><#=msg#><br /></h4>', "</div>", "</div>"].join(""),
        invalidtext: ['<div class="bd text-center">', '<div class="pop-waring">', '<i class="ico-waring <#=icon-class#>"></i>', '<h4 class="pop-text"><#=msg#><br /></h4>', "</div>", "</div>"].join(""),
        betExpired: ['<div class="bd text-center">', '<div class="pop-waring">', '<i class="ico-waring <#=icon-class#>"></i>', '<h4 class="pop-text"><#=msg#><br /></h4>', "</div>", "</div>"].join(""),
        multipleOver: ['<div class="bd text-center">', '<div class="pop-waring">', '<i class="ico-waring <#=icon-class#>"></i>', '<h4 class="pop-text"><#=msg#><br /></h4>', "</div>", "</div>"].join(""),
        pauseBet: ['<div class="bd text-center">', '<div class="pop-waring">', '<i class="ico-waring <#=icon-class#>"></i>', '<h4 class="pop-text"><#=msg#><br /></h4>', "</div>", "</div>"].join(""),
        successTip: ['<div class="bd text-center">', '<div class="pop-title">', '<i class="ico-success"></i>', '<h4 class="pop-text"><#=msg#><br /></h4>', "</div>", '<p class="text-note">您可以通过”<a href="' + baseUrl + '<#=url#>" target="_black"><#=gameType#></a>“查询您的投注记录！</p>', "</div>"].join(""),
        checkBalls: ['<div class="bd text-center">', '<div class="pop-title">', '<i class="ico-waring <#=iconClass#>"></i>', '<h4 class="pop-text">请至少选择一注投注号码！</h4>', "</div>", '<div class="pop-btn ">', '<a href="javascript:void(0);" class="btn closeBtn">关 闭<b class="btn-inner"></b></a>', "</div>", "</div>"].join(""),
        subFaild: ['<div class="bd text-center">', '<div class="pop-title">', '<i class="ico-error"></i>', '<h4 class="pop-text"><#=msg#><br /></h4>', "</div>", '<div class="pop-btn ">', '<a href="javascript:void(0);" class="btn closeBtn">关 闭<b class="btn-inner"></b></a>', "</div>", "</div>"].join(""),
        Insufficientbalance: ['<div class="bd text-center">', '<div class="pop-title">', '<i class="ico-error"></i>', '<h4 class="pop-text">您的余额不足，请充值！</h4>', "</div>", "</div>"].join(""),
        blockade: ['<div class="bd panel-game-msg-blockade" id="J-blockade-panel-main">', '<form id="J-form-blockade-detail" action="" target="_blank" method="post"></form>', '<div class="game-msg-blockade-text">存在<#=blockadeType#>内容，系统已为您做出 <a href="#" data-action="blockade-detail">最佳处理</a> ，点击<span class="color-red">“确认”</span>完成投注</div>', "<div>", '<div class="game-msg-blockade-line-title">彩种：<#=gameTypeTitle#></div>', '<div class="game-msg-blockade-line-title">期号：<#=currentGameNumber#></div>', "</div>", '<div id="J-game-panel-msg-blockade-0">', '<div class="game-msg-blockade-cont" id="J-msg-panel-submit-blockade-error0"><#=blockadeData0#></div>', "</div>", '<div class="game-msg-blockade-panel-money">', '<div><b>付款总金额：</b><span class="color-red"><b id="J-money-blockade-adjust"><#=amountAdjust#></b></span> 元&nbsp;&nbsp;&nbsp;&nbsp;<span style="display:<#=display#>"><b>减少投入：</b><span class="color-red"><b id="J-money-blockade-change"><#=amountChange#></b></span> 元</span></div>', "<div><b>付款账号：</b><#=username#></div>", "</div>", "<div>", '<p class="text-note"><#=lotteryChareg#></p>', '<p class="text-note"><#=lotteryCharegPlurality#></p>', "</div>", "</div>"].join(""),
        overLimit: ['<div class="bd text-center"><div class="pop-title"><i class="ico-waring"></i><h4 class="pop-text"><#=msg#><br /></h4></div>', '<div class="content" style="max-height:150px;overflow:auto;">', "<#=contentinfo#>", "</div>", "</div>"].join("")
    },
    o = null,
    l = e.Games,
    s = {
        init: function(t) {
            var a = this;
            a.win = new e.MiniWindow({
                cls: "pop w-9"
            }),
            a.mask = e.Mask.getInstance(),
            a.reSet(),
            a.win.addEvent("afterHide",
            function() {
                a.reSet()
            })
        },
        doAction: function(e) {
            var t = this,
            a = "rebulid" + e.type,
            n = "getHtml" + e.type,
            r = function() {};
            t[a] && $.isFunction(t[a]) && (r = t[a]),
            e.tpl = "undefined" == typeof e.tpl ? t[n]() : "" + e.tpl,
            delete e.type,
            r.call(t, e)
        },
        formatHtml: function(e, t) {
            var a, n, r = t;
            for (a in r) r.hasOwnProperty(a) && (n = RegExp("<#=" + a + "#>", "g"), e = e.replace(n, r[a]));
            return e
        },
        arrIndexOf: function(e, t) {
            for (var a = 0,
            n = 0; n < t.length; n++) t[n] == e && (a += 1);
            return a || -1
        },
        getHtmlWaring: function() {
            var e = this.defConfig;
            return e.normal
        },
        rebulidnormal: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.closeText = "关 闭",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlnormal: function() {
            return this.getHtmlWaring()
        },
        rebulidcheckLotters: function(e) {
            var t = this,
            a = (l.getCurrentGameOrder().getTotal().orders, e.data.tplData.lotteryTraceInfo()),
            n = phoenix.util.ToForamtmoney(e.data.tplData.lotteryamount),
            r = Number(l.getCurrentGame().getGameConfig().getInstance().defConfig.backOutStartFee) / 1e4,
            i = Number(l.getCurrentGame().getGameConfig().getInstance().defConfig.backOutRadio) / 1e4;
            if (result = {},
            result.mask = !0, result.iconClass = "", a.length < 1) n > r && 0 != Number(r) && 0 != Number(i) ? (e.data.tplData.lotteryChareg = '<div id="showLotteryChareg" style="display: none;">购买后请您尽量避免撤单，如撤单将收取手续费：<span class="price"><dfn>&yen;</dfn><span class="handlingCharge">' + l.getCurrentGameStatistics().formatMoney(i * n, 3) + "</span>元</span></div>", e.data.tplData.lotteryCharegPlurality = "") : (e.data.tplData.lotteryChareg = "", e.data.tplData.lotteryCharegPlurality = "");
            else {
                e.data.tplData.lotteryChareg = "";
                var o = "",
                s = 0,
                c = 0,
                u = e.data.tplData.lotteryOnlyAmount;
                o = '<div style="margin-top:-12px;" id="showLotteryChareg">购买后请您尽量避免撤单，如撤单将收取手续费：</div><ul class="textarea cancel-bets clearfix" style="font-size:12px;margin-top:10px;"> <li><span style="font-size:13px;font-weight:500">奖期</span><span style="font-size:13px;font-weight:500">撤单手续费</span></li>';
                for (var m = 0; m < a.length; m++) s = Number(a[m].multiple * u),
                s > r && (c += s * i, o += "<li><span>第" + a[m].number + '期</span><span class="price"><dfn>&yen;</dfn>' + l.getCurrentGameStatistics().formatMoney(s * i, 3) + "元</span></li>");
                o += "</ul>",
                c > 0 && 0 != Number(r) && 0 != Number(i) ? e.data.tplData.lotteryCharegPlurality = o: e.data.tplData.lotteryCharegPlurality = ""
            }
            result.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(result, e))
        },
        getHtmlcheckLotters: function() {
            var e = this.defConfig;
            return e.checkLotters
        },
        rebulidlotteryClose: function(e) {
            var t = this,
            a = (l.getCurrentGameOrder().getTotal().orders, {});
            a.mask = !0,
            a.iconClass = "",
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmllotteryClose: function() {
            var e = this.defConfig;
            return e.lotteryClose
        },
        rebulidnonSaleTime: function(e) {
            var t = this,
            a = {};
            time = e.data.tplData.orderDate,
            typeArray = e.data.tplData.lotteryType,
            a.mask = !0,
            a.iconClass = "",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            e.data.tplData.orderDate = function() {
                return time.year + "年" + time.month + "月" + time.day + "日 " + time.hour + ":" + time.min
            },
            e.data.tplData.lotteryType = function() {
                var e = "";
                if ($.isArray(typeArray)) for (var t = 0; t < typeArray.length; t++) e += '<dd><span style="background:url(' + typeArray[t].pic + ')" class="pic" title="' + typeArray[t].name + '" alt="' + typeArray[t].name + '"></span><a href="' + typeArray[t].url + '" class="btn">去投注<b class="btn-inner"></b></a></dd>';
                return e
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlnonSaleTime: function() {
            var e = this.defConfig;
            return e.nonSaleTime
        },
        rebulidmustChoose: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.iconClass = "",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlmustChoose: function() {
            return this.getHtmlWaring()
        },
        rebulidnetAbnormal: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.iconClass = "",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlnetAbnormal: function() {
            return this.getHtmlWaring()
        },
        rebulidsuccess: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.iconClass = "",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlsuccess: function() {
            var e = this.defConfig;
            return e.successTip
        },
        rebulidloginTimeout: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlloginTimeout: function() {
            return this.getHtmlWaring()
        },
        rebulidserverError: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.iconClass = "",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlserverError: function() {
            return this.getHtmlWaring()
        },
        rebulidsubFaild: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.iconClass = "",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlsubFaild: function() {
            return this.getHtmlWaring()
        },
        rebulidInsufficientbalance: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.closeIsShow = !0,
            a.confirmIsShow = !0,
            a.confirmText = "去充值",
            a.confirmFun = function() {
                window.open(_logOut + "/fund")
            },
            a.closeFun = function() {
                t.hide()
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlInsufficientbalance: function() {
            return this.getHtmlWaring()
        },
        rebulidpauseBet: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.confirmText = "投 注",
            a.confirmIsShow = !0,
            a.confirmFun = function() {
                for (var t = l.getCurrentGameOrder(), a = 0; a < e.data.tplData.balls.length; a++) for (j = 0; j < t.orderData.length; j++) t.orderData[j].id == e.data.tplData.balls[a].id && t.orderData.splice(j, 1);
                l.getCurrentGameSubmit().submitData()
            },
            a.closeText = "关 闭",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            e.data.tplData.msg = function() {
                for (var a = [], n = l.getCurrentGame().getGameConfig().getInstance(), r = 0; r < e.data.tplData.balls.length; r++) {
                    var i = e.data.tplData.balls[r].type,
                    o = n.getTitleByName(i);
                    t.arrIndexOf(o.join(""), a) == -1 && a.push(o.join(""))
                }
                return "您的投注内容中“" + a.join("") + "”已暂停销售，是否完成剩余内容投注？"
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlpauseBet: function() {
            var e = this.defConfig;
            return e.pauseBet
        },
        rebulidmultipleOver: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.iconClass = "",
            a.closeText = "关 闭",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            e.data.tplData.msg = function() {
                for (var a = [], n = l.getCurrentGame().getGameConfig().getInstance(), r = 0; r < e.data.tplData.balls.length; r++) {
                    var i = e.data.tplData.balls[r].type,
                    o = n.getTitleByName(i);
                    t.arrIndexOf(o.join(""), a) == -1 && a.push(o.join(""))
                }
                return "您的投注内容中“" + a.join("") + "”超出倍数限制，请调整！"
            },
            a.content = t.formatHtml(e.tpl, e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlmultipleOver: function() {
            var e = this.defConfig;
            return e.multipleOver
        },
        rebulidinvalidtext: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.confirmText = "刷新页面",
            a.confirmIsShow = !0,
            a.confirmFun = function() {
                window.location.reload()
            },
            a.content = t.formatHtml(t.getHtmlinvalidtext(), e),
            t.show($.extend(a, e))
        },
        getHtmlinvalidtext: function() {
            var e = this.defConfig;
            return e.invalidtext
        },
        rebulidbetExpired: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.closeText = "关 闭",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            e.data.tplData.msg = function() {
                return "您好，" + e.data.tplData.bitDate.expiredDate + "期 已截止销售，当前期为" + e.data.tplData.bitDate.current + "期 ，请留意！"
            },
            a.content = t.formatHtml(t.getHtmlbetExpired(), e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlbetExpired: function() {
            var e = this.defConfig;
            return e.betExpired
        },
        rebulidillegalTools: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.confirmText = "刷新页面",
            a.confirmIsShow = !0,
            a.confirmFun = function() {
                window.location.reload()
            },
            a.content = t.formatHtml(t.getHtmlbetExpired(), e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmloverLimit: function() {
            return this.defConfig.overLimit
        },
        rebulidoverLimit: function(e) {
            var t, a, n = this,
            r = {},
            i = e.data.tplData,
            o = e.data.overMutipleData,
            l = [],
            s = 0;
            r.mask = !0,
            r.closeText = "确 定",
            r.closeIsShow = !0,
            r.closeFun = function() {
                n.hide()
            },
            $.each(o,
            function(e) {
                a = o[e].betDetail.length > 3 ? o[e].betDetail.substr(0, 3) + ".. <a title=" + o[e].betDetail + ">详情</a>": o[e].betDetail,
                l.push(o[e].webIssueCode + "期&nbsp;&nbsp;" + o[e].betMethod + "&nbsp;&nbsp;"),
                "1" == $.trim(o[e].moneyunit) ? (s = parseFloat(o[e].multiple) / 10, t = "元") : (s = parseFloat(o[e].multiple), t = "角"),
                l.push(a + "&nbsp;&nbsp;(" + t + ")本期最多投"),
                l.push("&nbsp;&nbsp;" + s + "倍</br>")
            }),
            i.contentinfo = l.join(""),
            r.content = n.formatHtml(n.getHtmlbetExpired(), e.data.tplData),
            n.show($.extend(r, e))
        },
        getHtmlblockade: function() {
            return this.defConfig.blockade
        },
        rebulidblockade: function(t) {
            function a(e) {
                return e = e.replace(/ /g, "&amp;nbsp;")
            }
            var n = this,
            r = {},
            i = t.data.tplData,
            o = t.data.orderData,
            s = t.data.blockadeInfo,
            c = o.balls,
            u = {},
            m = "",
            d = "",
            g = [],
            p = "",
            f = l.getCurrentGameOrder().formatMoney,
            h = 28,
            b = !1,
            v = ['<ul class="game-msg-blockade-balls">'],
            y = 0,
            C = 0,
            T = (o.isTrace, Number(l.getCurrentGame().getGameConfig().getInstance().defConfig.backOutStartFee) / 1e4),
            D = Number(l.getCurrentGame().getGameConfig().getInstance().defConfig.backOutRadio) / 1e4,
            w = Number(o.amount);
            if (0 == w) {
                var G = l.getCurrentGameMessage(),
                x = phoenix.Games.getCurrentGame().getGameConfig().getInstance().defConfig.gameType,
                M = [],
                N = !0,
                S = !0,
                k = [],
                B = "";
                return "ssq" == x ? ($.each(c,
                function(e) {
                    M = this.lockPoint.beforeBlockadeList,
                    $.each(M,
                    function(e) {
                        this.blockadeDetail.length > 2 && 0 == Number(this.beishu) && (N = !1),
                        2 == this.blockadeDetail.length && 0 == Number(this.beishu) && ($.inArray(this.blockadeDetail, k) < 0 && k.push(this.blockadeDetail), S = !1)
                    })
                }), B = 0 == N && 0 != S ? "<div class='pop-title'><i class='ico-waring'></i><h4 class='pop-text'>您投注的内容中红球受限，请调整！</h4></div>": 0 != N && 0 == S ? "<div class='pop-title'><i class='ico-waring'></i><h4 class='pop-text'>您投注的内容中蓝球受限，受限号码" + k.join(",") + "，请调整！</h4></div>": 0 == N && 0 == S ? "<div class='pop-title'><i class='ico-waring'></i><h4 class='pop-text'>您投注的内容已经全部受限，请调整！</h4></div>": "<div class='pop-title'><i class='ico-waring'></i><h4 class='pop-text'>您投注的内容有受限号码,请点击最佳处理查看后，进行调整！</h4></div>", G.show({
                    mask: !0,
                    title: "温馨提示",
                    content: B,
                    cancelIsShow: !0,
                    cancelFun: function() {
                        G.hide()
                    }
                }), !1) : (G.show({
                    mask: !0,
                    title: "温馨提示",
                    content: "<div class='pop-title'><i class='ico-waring'></i><h4 class='pop-text'>您投注的内容已经全部受限，请调整！</h4></div>",
                    cancelIsShow: !0,
                    cancelFun: function() {
                        G.hide()
                    }
                }), !1)
            }
            if (w > T && 0 != Number(T) && 0 != Number(D) ? (handlingCharge = l.getCurrentGameStatistics().formatMoney(w * D, 3), t.data.tplData.lotteryChareg = '<div id="showLotteryChareg" class="text-note">购买后请您尽量避免撤单，如撤单将收取手续费：<span class="price"><dfn>&yen;</dfn><span class="handlingCharge">' + handlingCharge + '</span>元</span></div><p class="text-note">本次投注，若未涉及到付款金额变化，将不再提示</p>') : (handlingCharge = 0, t.data.tplData.lotteryChareg = '<p class="text-note">本次投注，若未涉及到付款金额变化，将不再提示</p>'), t.data.tplData.lotteryCharegPlurality = "", r.mask = !0, r.closeIsShow = !0, r.closeText = "关 闭", r.confirmIsShow = !0, r.confirmText = "确 认", r.closeFun = function() {
                n.hide()
            },
            $.each(c,
            function(e) {
                y = this.multiple,
                C += y,
                0 != Number(y) && (u["" + this.id] = this, m = this.ball, m.length > h && (m = m.substr(0, h) + "..."), d = l.getCurrentGame().getGameConfig().getInstance().getTitleByName(this.type).join("_"), p = $.trim(d) + $.trim(this.ball), $.inArray(p, g) == -1 && v.push('<li data-id="' + this.id + '">[' + d + "] " + m + "</li>"), g.push(p))
            }), v.push("</ul>"), C < 1 && (r.confirmIsShow = !1), i.gameTypeTitle = l.getCurrentGame().getGameConfig().getInstance().getGameTypeCn(), i.blockadeData0 = v.join(""), i.amount = f(s.amountAdjust), i.username = s.username, i.amountAdjust = f(o.amount), i.amountChange = f(s.amountAdjust), i.display = "", o.isTrace < 1) i.currentGameNumber = "第 " + l.getCurrentGame().getCurrentNumber() + " 期";
            else {
                var I = t.data.orderData.orders.length;
                i.currentGameNumber = "第 " + o.orders[0].number + "  至  " + o.orders[I - 1].number + "   共  <strong class='color-red'>" + I + "</strong></span>  期"
            }
            1 == s.type ? i.blockadeType = "受限": 2 == s.type ? (i.blockadeType = "奖金变动", i.display = "none") : i.blockadeType = "奖金变动及受限",
            r.content = n.formatHtml(n.getHtmlbetExpired(), i),
            r.confirmFun = function() {
                var e = l.getCurrentGameMessage();
                if (b) return ! 1;
                for (var t = 0,
                a = c.length; t < a;) 0 == Number(c[t].multiple) ? (c.splice(t, 1), t = t) : t++;
                $.ajax({
                    url: l.getCurrentGame().getGameConfig().getInstance().submitUrl(),
                    data: JSON.stringify(o),
                    dataType: "json",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function() {
                        b = !0,
                        $(".confirm").html("提交中..."),
                        $(".closeTip").css("display", "none").attr("disabled", "true")
                    },
                    success: function(t) {
                        if (1 == Number(t.isSuccess)) {
                            var a = Number(t.isTrace) > 0 ? 1 : 0;
                            a > 0 ? (t.data.tplData.url = "/gameUserCenter/queryPlans?time=7", t.data.tplData.gameType = "追号记录") : (t.data.tplData.url = "/gameUserCenter/queryOrdersEnter?time=7", t.data.tplData.gameType = "投注记录"),
                            e.show(t),
                            l.currentGameSubmit.clearData(),
                            l.currentGameSubmit.afterSubmitSuccess(),
                            setTimeout(function() {
                                l.getCurrentGameTrace().hide(),
                                $("html,body").animate({
                                    scrollTop: $("#J-top-game-menu").offset().top
                                },
                                1e3)
                            },
                            2e3)
                        } else e.show(t)
                    },
                    complete: function() {
                        b = !1,
                        n.fireEvent("afterSubmit"),
                        $(".closeTip").css("display", "display").removeAttr("disabled")
                    },
                    error: function() {
                        e.show({
                            mask: !0,
                            title: "温馨提示",
                            content: "<div class='pop-title'><i class='ico-error'></i><h4 class='pop-text'>方案提交失败,<br />请检查网络并重新提交！</h4></div>",
                            cancelIsShow: !0,
                            cancelFun: function() {
                                e.hide()
                            }
                        })
                    }
                })
            },
            n.show($.extend(r, t)),
            e.util.toViewCenter(n.win.dom),
            $("#J-blockade-panel-main").on("click", "[data-action]",
            function(e) {
                var t = $(this),
                n = $.trim(t.attr("data-action"));
                $.trim(t.parent().attr("data-id"));
                switch (e.preventDefault(), n) {
                case "blockade-detail":
                    var r = $("#J-form-blockade-detail").attr("action", l.getCurrentGame().getGameConfig().getInstance().submitUrl() + "/showBlockadeInfo");
                    r.html(""),
                    $.each(c,
                    function() {
                        var e = this;
                        e.lockPoint && $('<input type="hidden" value=' + a(JSON.stringify(o)) + ' name="data" />').appendTo(r)
                    }),
                    r.submit()
                }
            })
        },
        getHtmlillegalTools: function() {
            return this.getHtmlWaring()
        },
        rebulidsubFailed: function(e) {
            var t = this,
            a = {};
            a.mask = !0,
            a.closeText = "关 闭",
            a.closeIsShow = !0,
            a.closeFun = function() {
                t.hide()
            },
            a.content = t.formatHtml(t.getHtmlbetExpired(), e.data.tplData),
            t.show($.extend(a, e))
        },
        getHtmlsubFailed: function() {
            return this.getHtmlWaring()
        },
        setTitle: function(e) {
            var t = this,
            a = t.win;
            a.setTitle(e)
        },
        setContent: function(e, t) {
            var a = this,
            n = a.win;
            n.setContent(e, t)
        },
        hideClose: function() {
            var e = this,
            t = e.win;
            t.getCloseDom().hide()
        },
        hideTitle: function() {
            var e = this,
            t = e.win;
            t.getTitleDom().hide()
        },
        show: function(e) {
            var t = this,
            a = t.win;
            if (t.reSet(), "undefined" == typeof e.data && (e.data = {}), e.data.tplData = "undefined" == typeof e.data.tplData ? {}: e.data.tplData, e) {
                if (e.type) return void t.doAction(e);
                "undefined" != typeof e.tpl && (e.content = t.formatHtml(e.tpl, e.data.tplData)),
                o && (clearTimeout(o), o = null),
                t.setTitle(e.title || "温馨提示"),
                t.setContent(e.content || ""),
                e.confirmText && a.setConfirmName(e.confirmText),
                e.cancelText && a.setCancelName(e.cancelText),
                e.closeText && a.setCloseName(e.closeText),
                e.normalCloseFun && (a.doNormalClose = e.normalCloseFun),
                e.confirmFun && (a.doConfirm = e.confirmFun),
                e.cancelFun && (a.doCancel = e.cancelFun),
                e.closeFun && (a.doClose = e.closeFun),
                e.confirmIsShow && a.showConfirmButton(),
                e.cancelIsShow && a.showCancelButton(),
                e.closeIsShow && a.showCloseButton(),
                e.hideTitle && t.hideTitle(),
                e.hideClose && t.hideClose(),
                e.mask && t.mask.show(),
                t.limitHeight(),
                !e.needPrint && a.dom.find(".btn-link").remove(),
                a.show(),
                e.callback && e.callback.call(t),
                e.time && (o = setTimeout(function() {
                    t.hide(),
                    clearTimeout(o),
                    o = null
                },
                1e3 * e.time))
            }
        },
        limitHeight: function() {
            var e = this,
            t = $(window).height(),
            a = e.getContainerDom(),
            n = a.outerHeight();
            n > t && (a.height(Math.floor(.9 * t)), a.css({
                overflow: "auto"
            }))
        },
        getContainerDom: function() {
            var e = this;
            return e.win.getContainerDom()
        },
        getContentDom: function() {
            var e = this;
            return e.win.getContentDom()
        },
        hide: function() {
            var e = this,
            t = e.win;
            t.hide(),
            e.reSet()
        },
        reSet: function() {
            var e = this,
            t = e.win;
            e.mask.hide(),
            e.setTitle("提示"),
            e.setContent(""),
            t.hideConfirmButton(),
            t.hideCancelButton(),
            t.hideCloseButton(),
            t.doConfirm = function() {},
            t.doCancel = function() {},
            t.doClose = function() {},
            t.doNormalClose = function() {},
            t.setConfirmName("确 认"),
            t.setCancelName("取 消"),
            t.setCloseName("关 闭"),
            t.reSetPosition()
        }
    },
    c = e.Class(s, a);
    c.defConfig = i,
    c.getInstance = function(e) {
        return r || (r = new c(e))
    },
    e[t] = c
} (phoenix, "GameMessage", phoenix.Event),
function(e, t, a, n) {
    var r, i = {
        mainPanel: "#J-play-select",
        data: "",
        mainDom: ".play-select",
        html: $('<div id="change"><ul class="play-select-title clearfix"></ul><ul class="play-select-content clearfix"></ul></div>'),
        resultDom: "#change .play-select-content"
    },
    o = e.Games,
    l = {
        init: function(e) {
            var t = this;
            o.setCurrentGameTypes(t),
            t.container = $(e.mainPanel),
            t.count = 0,
            t.showCount = 0,
            t.inst = o.getCurrentGame().getGameConfig().getInstance(),
            t.data = t.inst.getTypes(),
            t.html = e.html,
            t.isSupport2000 = !1,
            t.isfirstimeuse2000 = t.inst.defConfig.isfirstimeuse2000,
            t.isfirstimeusediamond2000 = t.inst.defConfig.isfirstimeusediamond2000,
            console.log(t.inst.defConfig),
            setTimeout(function() {
                t._showMainHTML(t.data)
            },
            0)
        },
        getContainerDom: function() {
            return this.container
        },
        _showMainHTML: function(e, t) {
            for (var a, n = this,
            r = 0,
            i = e.length; r < i; r++) a = e[r],
            a.isNew && (n.isSupport2000 = !0),
            t || n._bulidHTMl(a, "top", a.isNew ? " caojiduizhi": ""),
            "[object Array]" == Object.prototype.toString.call(a.childs) && 0 != a.childs.length ? (n._showMainHTML(a.childs, !0), n._bulidHTMl(a, "child", a.isNew ? " caojiduizhi": "")) : n._bulidHTMl(a, "terminal", a.isNew ? " caojiduizhi": "");
            if (!t) {
                var o = n.html.find(".play-select-title");
                n.isSupport2000 ? ($('<li class="choose-label">普通玩法:</li>').insertBefore(o.find("li").eq(0)), $('<li class="choose-label">超级2000:</li>').insertBefore(o.find("li.caojiduizhi").eq(0)), $('<li class="choose-label brand2000" id ="brand2000click" ></li>').insertAfter(o.find("li").last()), n._appendHtml(n.html), $(".play-section").addClass("chaojidiuzhi-bg"), setTimeout(function() {
                    $(".choose-label").off("click")
                },
                10)) : n._appendHtml(n.html)
            }
            n.isSupport2000 && n.isfirstimeuse2000 && n.show2000Guider(),
            n.isfirstimeusediamond2000 && n.showdiamond2000Guider()
        },
        showdiamond2000Guider: function() {
            if (!$(".guide20000").size()) {
                var e = '<div class="guide20000"><div class="guide20000-content guide20000-content2"><span class="guide20000-close guide20000-close2">x</span></div></div>',
                t = $("<iframe></iframe>");
                t.attr("src", "/gameActive/mmc/diamondHelpguilder"),
                $("body").append($(e)),
                $(".guide20000-content2").append(t),
                $(".guide20000-close,.guide20000-try").click(function() {
                    $(".guide20000").remove(),
                    $.cookie("diamondguider", "true")
                })
            }
        },
        show2000Guider: function() {
            var e = '<div class="guide20000"><div class="guide20000-content"><span class="guide20000-close">x</span><span class="guide20000-try"></span></div></div>';
            $(".guide20000").size() || ($("body").append($(e)), $(".guide20000-close,.guide20000-try").click(function() {
                $(".guide20000").remove(),
                $.cookie("firstimeuse2000", "")
            }))
        },
        _bulidHTMl: function(e, t, a) {
            var n = this,
            r = n.html.find(".play-select-title"),
            i = n.html.find(".play-select-content"),
            o = a || "";
            switch (t) {
            case "top":
                var l = e.isdiamond ? "true": "";
                r.append('<li data-diamond="' + l + '" class="' + e.name + o + '">' + e.title.replace("超级2000_", "") + "</li>"),
                i.append('<li class="' + e.name + o + '"></li>');
                break;
            case "child":
                i.find("." + e.parent).append('<dl class="' + e.name + o + '"><dt>' + e.title + "：</dt></dl>");
                break;
            case "terminal":
                setTimeout(function() {
                    var t = e.mode + "." + e.parent + "." + e.name,
                    a = $('<dd  data-type="' + t + '" class="' + e.name + o + '">' + e.title + "</dd>");
                    e.diamond && a.data("diamond", e.diamond),
                    i.find("." + e.mode + " ." + e.parent).append(a)
                },
                0)
            }
        },
        _appendHtml: function(e) {
            var t = this;
            $(t.defConfig.mainDom).prepend(e),
            t._bindTagSelect(),
            setTimeout(function() {
                t.fireEvent("endShow")
            },
            10)
        },
        _bindTagSelect: function() {
            var e, t = this;
            e = new phoenix.Tab({
                par: "#change",
                triggers: ".play-select-title > li",
                panels: ".play-select-content > li",
                eventType: "click",
                currPanelClass: "current"
            }),
            t.bigTab = e,
            e.addEvent("afterSwitch",
            function(e, a) {
                var n = this.getTrigger(a),
                r = $("#change .play-select-content ." + n.attr("class").replace(/\s.*/g, "") + " dd:first");
                t._getMode(r)
            }),
            $("#change .play-select-content").on("click", "dd",
            function() {
                t._getMode($(this))
            })
        },
        _getMode: function(e) {
            var t = this,
            a = e.attr("class").replace(/\s.*/g, ""),
            n = e.parent("dl").attr("class").replace(" current", ""),
            r = e.parents("li").eq(0).attr("class").replace(/\s.*/g, ""),
            i = r + "." + n + "." + a;
            t.changeMode(i)
        },
        showTitleDom: function() {
            var e = this,
            t = e.getContainerDom(),
            a = t.find(".play-select-content");
            a.show()
        },
        hiddenTitleDom: function() {
            var e = this,
            t = e.getContainerDom(),
            a = t.find(".play-select-content");
            a.hide()
        },
        changeMode: function(e) {
            var t, a, n, r, i = this,
            l = e.split("."),
            s = i.getContainerDom(),
            c = "current",
            u = 0,
            m = {
                sixing: [1, 1, 0, 0, 0],
                qiansan: [0, 0, 0, 1, 1],
                zhongsan: [1, 0, 0, 0, 1],
                housan: [1, 1, 0, 0, 0],
                qianer: [0, 0, 0, 1, 1],
                houer: [1, 1, 0, 0, 0],
                yixing: [1, 1, 0, 0, 0]
            };
            try {
                if (o.getCurrentGame().getCurrentGameMethod() && e == o.getCurrentGame().getCurrentGameMethod().getGameMethodName()) return
            } catch(e) {}
            s.find(".play-select-content").is(":hidden") && i.showTitleDom(),
            i.fireEvent("beforeChange", i.container, e),
            o.getCurrentGame().switchGameMethod(e),
            window.isCaojiduizhi = !!e.match(/_2000/),
            window.isCaojiduizhi ? ($(".header").addClass("chaojidiuzhiheader"), $(".number-section").addClass("number-section-caojiduizhi"), $(".play-section").addClass("chaojidiuzhi-bg")) : ($(".number-section").removeClass("number-section-caojiduizhi"), $(".play-section").removeClass("chaojidiuzhi-bg"), $(".header").removeClass("chaojidiuzhiheader"));
            var d = m[l[0].replace(/_2000/, "")];
            d && $.each($("#J-lottery-info-balls em"),
            function(e, t) {
                1 == d[e] ? $(t).addClass("gold") : $(t).removeClass("gold")
            }),
            t = i.container.find(".play-select-title li"),
            t.removeClass(c),
            i.container.find(".play-select-title").find("." + l[0]).addClass(c),
            a = i.container.find(".play-select-content li"),
            a.removeClass(c),
            r = i.container.find(".play-select-content").find("." + l[0]),
            r.addClass(c),
            n = r.find("dd").removeClass(c),
            r.find("." + l[1] + " ." + l[2]).addClass(c),
            t.each(function(e) {
                if ($(this).hasClass(c)) return u = e,
                !1
            }),
            i.bigTab.index = u,
            i.fireEvent("endChange");
            window.isdiamond = !!$("#change .play-select-title .current").data("diamond")
        }
    },
    s = e.Class(l, a);
    s.defConfig = i,
    s.getInstance = function(e) {
        return r || (r = new s(e))
    },
    e[t] = s
} (phoenix, "GameTypes", phoenix.Event),
function(e, t, a, n) {
    var r, i = {
        mainPanel: "#J-balls-statistics-panel",
        multipleLimitDom: "#J-balls-statistics-multipleLimit",
        lotteryNumDom: "#J-balls-statistics-lotteryNum",
        multipleDom: "#J-balls-statistics-multiple",
        amountDom: "#J-balls-statistics-amount",
        moneyUnitDom: "#J-balls-statistics-moneyUnit",
        moneyUnit: $.cookie("moneyUnitDom-record") || 1,
        moneyUnitData: {.1 : "角",
            1 : "元"
        },
        onePrice: 2,
        multiple: 1,
        multipleLimit: 88
    },
    o = e.Games,
    l = {
        init: function(e) {
            var t = this;
            t.initControl(e)
        },
        initControl: function(t) {
            var a = this;
            o.setCurrentGameStatistics(a),
            a.panel = $(t.mainPanel),
            a.moneyUnit = t.moneyUnit,
            a.onePrice = t.onePrice,
            a.multiple = t.multiple,
            a.multipleLimit = t.multipleLimit,
            a.setMultipleLimit(t.multipleLimit),
            a.gameMethodName = "",
            a.lotteryData = [],
            a.multipleDom = new phoenix.Select({
                realDom: t.multipleDom,
                isInput: !0,
                expands: {
                    inputEvent: function() {
                        var e = this;
                        e.getInput().keyup(function(t) {
                            var a = this.value,
                            n = o.getCurrentGameStatistics().getMoneyUnitDom().getValue(),
                            r = o.getCurrentGameStatistics().getMultipleLimit();
                            this.value = this.value.replace(/[^\d]/g, ""),
                            a = Number(this.value),
                            a < 1 ? this.value = 1 : 1 == Number(n) ? this.value = a > r ? r: a: this.value = a > 10 * r ? 10 * r: a,
                            e.setValue(this.value)
                        })
                    }
                }
            }),
            a.multipleDom.setValue(a.multiple),
            a.multipleDom.addEvent("change",
            function(e, t, n) {
                var r = Number(t),
                i = o.getCurrentGameStatistics().getMoneyUnitDom().getValue(),
                l = o.getCurrentGameStatistics().getMultipleLimit();
                1 == Number(i) ? r > l && (r = l, this.setValue(r)) : r > 10 * l && (r = 10 * l, this.setValue(r)),
                a.setMultiple(r),
                a.updateData({
                    lotterys: o.getCurrentGame().getCurrentGameMethod().getLottery(),
                    original: o.getCurrentGame().getCurrentGameMethod().getOriginal()
                },
                o.getCurrentGame().getCurrentGameMethod().getGameMethodName())
            }),
            $(t.moneyUnitDom).data("moneyUnitDom-record", "true"),
            a.moneyUnitDom = new e.Select({
                realDom: t.moneyUnitDom
            }),
            a.moneyUnitDom.setValue(a.moneyUnit),
            a.moneyUnitDom.addEvent("change",
            function(e, t, n) {
                var r = o.getCurrentGame().getDynamicConfig().gamelimit[a.gameMethodName].maxmultiple,
                i = Number(t);
                a.setMoneyUnit(Number(t)),
                a.updateData({
                    lotterys: o.getCurrentGame().getCurrentGameMethod().getLottery(),
                    original: o.getCurrentGame().getCurrentGameMethod().getOriginal()
                },
                o.getCurrentGame().getCurrentGameMethod().getGameMethodName()),
                1 == i ? a.setMultipleLimit(r) : a.setMultipleLimit(r, "jms"),
                a.multipleDom.setValue(1)
            }),
            a.updateData({
                lotterys: [],
                original: []
            }),
            a.initRebate()
        },
        initRebate: function() {
            var t = this,
            a = phoenix.Games.getCurrentGame().getGameConfig().getInstance().defConfig.awardRetStatus,
            n = phoenix.Games.getCurrentGame().getGameConfig().getInstance().defConfig.awardGroupRetStatus;
            a && n && (t.rebateSelect = new e.Select({
                realDom: "#J-select-rebate",
                cls: "choose-model-large"
            }))
        },
        getMultipleDom: function() {
            return this.multipleDom
        },
        getMultipleTextDom: function() {
            return $("#J-balls-statistics-multiple-text")
        },
        setMultipleLimit: function(e, t) {
            var a = this,
            r = "无限制";
            e = Number(e),
            isNaN(e) && (e = t == n ? 99999 : 999999),
            this.multipleLimit = e,
            e < 0 ? (this.multipleLimit = t == n ? 99999 : 999999, r = "无限制") : "jms" == t ? e < 999999 && (r = "" + 10 * e + " 倍") : e < 99999 && (r = "" + e + " 倍"),
            a.getMultipleLimitDom().html(r)
        },
        getMultipleLimit: function() {
            return this.multipleLimit
        },
        getMoneyUnitText: function(e) {
            return this.defConfig.moneyUnitData["" + e]
        },
        updateData: function(e, t) {
            var a = this,
            r = (a.defConfig, e.lotterys == n ? 0 : e.lotterys.length),
            i = a.onePrice,
            o = a.multiple,
            l = a.moneyUnit;
            a.setLotteryData(e),
            a.setGameMethodName(t),
            a.setLotteryNumDom(r),
            a.setAmountDom(a.formatMoney(r * l * o * i))
        },
        getResultData: function() {
            var e = this,
            t = e.getLotteryData();
            return t.lotterys.length < 1 ? {}: {
                type: e.getGameMethodName(),
                original: t.original,
                lotterys: t.lotterys,
                retPointValue: o.getCurrentGameStatistics().rebateSelect ? o.getCurrentGameStatistics().rebateSelect.getValue() : "",
                moneyUnit: e.moneyUnit,
                num: t.lotterys.length,
                multiple: e.multiple,
                onePrice: e.onePrice,
                amount: e.formatMoney(t.lotterys.length * e.moneyUnit * e.multiple * e.onePrice),
                amountText: e.formatMoney(t.lotterys.length * e.moneyUnit * e.multiple * e.onePrice)
            }
        },
        setGameMethodName: function(e) {
            this.gameMethodName = e
        },
        getGameMethodName: function(e) {
            return this.gameMethodName
        },
        setMoneyUnit: function(e) {
            var t = this;
            t.moneyUnit = e
        },
        getMoneyUnit: function() {
            return this.moneyUnit
        },
        getLotteryData: function() {
            return this.lotteryData
        },
        setLotteryData: function(e) {
            var t = this;
            t.lotteryData = e
        },
        formatMoney: function(e) {
            var e = Number(e),
            t = /(-?\d+)(\d{3})/;
            for (e = Number.prototype.toFixed ? e.toFixed(2) : Math.round(100 * e) / 100, e = "" + e; t.test(e);) e = e.replace(t, "$1,$2");
            return e
        },
        ToForamtmoney: function(e) {
            return parseFloat(e.replace(/[^\d\.-]/g, ""))
        },
        getMultipleLimitDom: function() {
            var e = this,
            t = e.defConfig;
            return e.multipleLimitDom || (e.multipleLimitDom = $(t.multipleLimitDom))
        },
        getLotteryNumDom: function() {
            var e = this,
            t = e.defConfig;
            return e.lotteryNumDom || (e.lotteryNumDom = $(t.lotteryNumDom))
        },
        setLotteryNumDom: function(e) {
            var t = this;
            t.getLotteryNumDom().html(e)
        },
        getMultipleDom: function() {
            return this.multipleDom
        },
        getMultip: function() {
            var e = this;
            return e.multiple
        },
        setMultipleDom: function(e) {
            var t = this;
            t.getMultipleDom().setValue(e)
        },
        setMultiple: function(e) {
            this.multiple = e
        },
        getMoneyUnitDom: function() {
            return this.moneyUnitDom
        },
        setMoneyUnitDom: function(e) {
            var t = this;
            t.getMoneyUnitDom().setValue(e)
        },
        hidesetMoneyUnitDom: function() {
            this.moneyUnitDom.hide()
        },
        getOnePrice: function() {
            var e = this;
            return e.onePrice
        },
        getAmountDom: function() {
            var e = this,
            t = e.defConfig;
            return e.amountDom || (e.amountDom = $(t.amountDom))
        },
        setAmountDom: function(e) {
            var t = this;
            t.getAmountDom().html(e)
        },
        reSet: function() {
            var e = this;
            e.defConfig;
            e.fireEvent("afterStatisReset")
        }
    },
    s = e.Class(l, a);
    s.defConfig = i,
    s.getInstance = function(e) {
        return r || (r = new s(e))
    },
    e[t] = s
} (phoenix, "GameStatistics", phoenix.Event),
function(e, t, a, n) {
    var r, i = {
        containerDom: "#J-balls-order-container",
        totalLotterysNumDom: "#J-gameOrder-lotterys-num",
        totalAmountDom: "#J-gameOrder-amount",
        selectedClass: "game-order-current",
        rowTemplate: '<li data-param="action=reselect&id=<#=id#>" id="gameorder-<#=id#>"><div class="result"><span class="retPoint"><#=retPointText#></span><span class="moneyUnitText"><#=moneyUnitText#></span><span class="bet"><#=num#>注</span><span class="multiple"><#=multiple#>倍</span><span class="price"><span><dfn>&yen;</dfn></span><#=amountText#></span><span class="close"><a data-param="action=del&id=<#=id#>" href="javascript:void(0);" title="删除">删除</a></span></div><span>[<#=typeText#>]</span><span style="position:relative" ><#=lotterysText#></span></li>',
        lotterysTextLength: 20,
        addOrderDom: "#J-add-order"
    },
    o = e.Games,
    l = 1,
    s = (Object.prototype.toString,
    function(e) {
        for (var t, a = $.trim(e).split("&"), n = 0, r = a.length, i = {}; n < r; n++) t = a[n].split("="),
        t.length > 0 && (2 == t.length ? i[t[0]] = t[1] : i[t[0]] = "");
        return i
    }),
    c = {
        init: function(e) {
            var t = this,
            e = t.defConfig;
            t.cacheData = {},
            t.cacheData.detailPostParameter = {},
            t.orderData = [],
            o.setCurrentGameOrder(t),
            t.container = $(e.containerDom),
            t.totalLotterysNum = 0,
            t.totalLotterysNumDom = $(e.totalLotterysNumDom),
            t.totalAmount = 0,
            t.totalAmountDom = $(e.totalAmountDom),
            t.currentSelectId = 0,
            t.eventProxy(),
            t.addEvent("afterAdd",
            function() {
                o.getCurrentGameTrace().getRowTableType();
                o.getCurrentGameTrace().isOpen() && o.getCurrentGameTrace().updateOrder(),
                $("#J-balls-order-container li").each(function() {
                    $(this).text().match(/超级2000/) && $(this).addClass("caojiduizhi-balls-order")
                });
                var e = $(".chase-tab-t").eq(1),
                t = $(".chase-tab-content").eq(1);
                /超级2000/.test($("#J-balls-order-container").text()) ? (t.removeClass(".chase-tab-content-current"), e.hide()) : e.show()
            }),
            t.addEvent("afterRemoveData",
            function() {
                o.getCurrentGameTrace().getRowTableType();
                o.getCurrentGameTrace().isOpen() && o.getCurrentGameTrace().updateOrder()
            }),
            t.addEvent("afterResetData",
            function() {
                o.getCurrentGameTrace().getRowTableType();
                o.getCurrentGameTrace().updateOrder(!0)
            }),
            o.getCurrentGameTypes().addEvent("endChange",
            function() {
                t.cancelSelectOrder()
            })
        },
        setTotalLotterysNum: function(e) {
            var t = this;
            t.totalLotterysNum = Number(e),
            t.totalLotterysNumDom.html(e)
        },
        setTotalAmount: function(e) {
            var t = this;
            t.totalAmount = Number(e),
            t.totalAmountDom.html(t.formatMoney(e))
        },
        addData: function(e) {
            var t = this;
            t.orderData.unshift(e)
        },
        getOrderById: function(e) {
            var t = this,
            e = Number(e),
            a = t.orderData,
            n = 0,
            r = a.length;
            for (n = 0; n < r; n++) if (Number(a[n].id) == e) return a[n]
        },
        removeData: function(e) {
            for (var t = this,
            e = Number(e), a = t.orderData, n = 0, r = a.length; n < r; n++) if (a[n].id == e) {
                t.fireEvent("beforeRemoveData", a[n]),
                t.orderData.splice(n, 1),
                t.updateData(),
                t.fireEvent("afterRemoveData");
                break
            }
            $("#gameorder-" + e).remove(),
            t.fireEvent("afterRemoveData")
        },
        reSet: function() {
            var e = this;
            return e.container.empty(),
            e.orderData = [],
            e.updateData(),
            e.fireEvent("afterResetData"),
            e
        },
        updateData: function(e) {
            var t = this,
            a = t.getTotal();
            t.setTotalLotterysNum(a.count),
            t.setTotalAmount(a.amount)
        },
        getTotal: function() {
            for (var e = this,
            t = e.orderData,
            a = 0,
            n = t.length,
            r = 0,
            i = 0; a < n; a++) r += t[a].num,
            i += t[a].num * t[a].onePrice * t[a].moneyUnit * t[a].multiple;
            return {
                count: r,
                amount: i,
                orders: t
            }
        },
        getOrderMaxMultiple: function() {
            for (var e, t, a, n, r = this,
            i = o.getCurrentGame().getDynamicConfig().gamelimit, l = r.getTotal().orders, s = 0, c = l.length, u = [], m = ""; s < c; s++) e = l[s].type,
            t = l[s].multiple,
            n = Number(l[s].moneyUnit),
            i[e] ? 1 == n ? (a = Number(i[e].maxmultiple) < 0 ? 99999 : Number(i[e].maxmultiple), "quwei.normal.dingdanshuang" == e && (a = o.getCurrentGame().specialMultiple[l[s].lotterys[0]]), u.push({
                gameMethod: e,
                maxnum: Math.floor(a / t)
            })) : (a = Number(i[e].maxmultiple) < 0 ? 999999 : Number(i[e].maxmultiple), "quwei.normal.dingdanshuang" == e && (a = o.getCurrentGame().specialMultiple[l[s].lotterys[0]]), u.push({
                gameMethod: e,
                maxnum: Math.floor(10 * a / t)
            })) : (m = o.getCurrentGame().getGameConfig().getInstance().getTitleByName(e), 1 == n ? (a = 99999, u.push({
                gameMethod: e,
                maxnum: Math.floor(a / t)
            })) : (a = 999999, u.push({
                gameMethod: e,
                maxnum: Math.floor(10 * a / t)
            })));
            return u.sort(function(e, t) {
                return e.maxnum - t.maxnum
            }),
            u.length > 0 ? u[0] : {
                gameMethod: "",
                maxnum: 1e5
            }
        },
        add: function(e) {
            var t, a = this,
            n = "",
            r = -1,
            i = a.defConfig.rowTemplate,
            s = 0,
            c = o.getCurrentGameTrace().isOpen();
            if (a.fireEvent("beforeAdd", e), !(e.lotterys && e.lotterys.length > 0)) {
                var u = o.getCurrentGameMessage();
                return void((!e.original || e.original.length <= 0) && u.show({
                    type: "mustChoose",
                    msg: '<span class="color-red">&nbsp;号码选择不完整，请重新选择！</span>',
                    data: {
                        tplData: {
                            msg: '<span class="color-red">&nbsp;号码选择不完整，请重新选择！</span>'
                        }
                    }
                }))
            }
            if (a.currentSelectId > 0) e.id = a.currentSelectId;
            else {
                if (r = a.checkData(e), r != -1) return a.addMultiple(e.multiple, r),
                o.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "关闭",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "您选择的号码在号码篮已存在，将直接进行倍数累加"
                        }
                    }
                }),
                o.getCurrentGame().getCurrentGameMethod().reSet(),
                o.getCurrentGameStatistics().reSet(),
                a.updateData(),
                void a.fireEvent("afterAdd", e);
                e.id = l++
            }
            if (e.multiple = c ? 1 : e.multiple, e.amountText = a.formatMoney(e.num * e.moneyUnit * e.multiple * e.onePrice), c && ("yingli" == o.getCurrentGameTrace().getRowTableType() || "yinglilv" == o.getCurrentGameTrace().getRowTableType())) for (s = 0, t = a.orderData.length; s < t; s++) if (a.orderData[s].type != e.type || a.orderData[s].moneyUnit != e.moneyUnit) return void alert("盈利追号和盈利率追号不允许混投，\n 请确保玩法类型和元角模式一致");
            e.postParameter = o.getCurrentGame().getCurrentGameMethod().makePostParameter(e.original, e),
            e.oldMultiple = e.multiple;
            var m = o.getCurrentGameStatistics().rebateSelect;
            m ? (e.awardMode = Number($("#J-select-rebate option:selected").attr("retPointValue")), e.retPointText = m.getText(), e.retPointValue = m.getValue()) : (e.awardMode = 1, e.retPointText = "", e.retPointValue = ""),
            n = a.formatRow(i, a.rebuildData(e)),
            a.currentSelectId > 0 ? a.replaceOrder(e.id, e) : a.addData(e),
            a.currentSelectId > 0 ? ($(n).replaceAll($("#gameorder-" + a.currentSelectId)), a.cancelSelectOrder()) : $(n).prependTo(a.container),
            o.getCurrentGame().getCurrentGameMethod().reSet(),
            o.getCurrentGameStatistics().reSet(),
            a.updateData(),
            a.fireEvent("afterAdd", e)
        },
        replaceOrder: function(e, t) {
            for (var a = this,
            n = a.orderData,
            r = 0,
            i = n.length; r < i; r++) if (n[r].id == e) return void(n[r] = t)
        },
        render: function() {
            for (var e = this,
            t = e.getTotal().orders, a = 0, n = t.length, r = [], i = e.defConfig.rowTemplate; a < n; a++) r[a] = e.formatRow(i, e.rebuildData(t[a]));
            e.updateData(),
            e.container.html(r.join("")),
            $("#J-balls-order-container li").each(function() {
                $(this).text().match(/超级2000/) && $(this).addClass("caojiduizhi-balls-order")
            })
        },
        rebuildData: function(e) {
            var t = this,
            a = t.defConfig,
            n = o.getCurrentGame().getGameConfig().getInstance(),
            r = n.getTitleByName(e.type);
            return e.typeText = r.join("_"),
            e.lotterysText = e.postParameter.length > a.lotterysTextLength ? e.postParameter.substr(0, a.lotterysTextLength) + '... <span data-param="action=detail&id=' + e.id + '" class="lottery-details">详情</span><div class="lottery-details-area"><div class="num"><span class="multiple"></span><em data-param="action=detailhide" class="close">×</em></div><div class="list"></div></div>': e.postParameter,
            e.moneyUnitText = o.getCurrentGameStatistics().getMoneyUnitText(e.moneyUnit),
            e
        },
        formatRow: function(e, t) {
            var a = this;
            if (t.isdiamond) {
                t.diamondprice = a.formatMoney(t.multiple * t.num * t.moneyUnit),
                e = t.isCheckBox ? a.defConfig.diamondrowTemplatechecked: a.defConfig.diamondrowTemplate;
                var n = $('[data-type="' + t.type + '"]').data("diamond"),
                r = "";
                for (var i in n) r += "" + i + ":" + n[i] + ",";
                r = r.substr(0, r.length - 1),
                t.diamondgradexplain = r
            }
            var o, l, s = t;
            for (o in s) s.hasOwnProperty(o) && (l = RegExp("<#=" + o + "#>", "g"), e = e.replace(l, s[o]));
            return e
        },
        originalData: function(e) {
            for (var t = this,
            a = [], n = 0; n < e.length; n++) for (var r = 0; r < e[n].length; r++) a[r] = a[r] || [],
            t.arrIndexOf(e[n][r], a[r]) || a[r].push(e[n][r]);
            return a
        },
        arrIndexOf: function(e, t) {
            for (var a, n = 0; n < t.length; n++) t[n] == e && (a = !0);
            return a || !1
        },
        checkData: function(e) {
            var t, a, n = this,
            r = [],
            i = 0;
            a = e.type,
            t = e.original;
            for (var i = 0; i < t.length; i++) r.push(t[i].join(""));
            return moneyUnit = e.moneyUnit,
            retPointValue = e.retPointValue,
            n.searchSameResult(a, r.join(), moneyUnit, retPointValue)
        },
        eventProxy: function() {
            var e = this,
            t = e.container;
            t.click(function(t) {
                var a, n = t.target.getAttribute("data-param");
                n && "" != $.trim(n) && (a = s(n), $.isFunction(e["exeEvent_" + a.action]) && e["exeEvent_" + a.action].call(e, a, t.target)),
                $(t.target).hasClass("diamond-tips") && (e.setDiamondPluse($(t.target).parent().find("input")), e.updateData())
            })
        },
        setDiamondPluse: function(e) {
            var t = this,
            a = $(e).is(":checked"),
            n = s($(e).parent().find("a").attr("data-param")),
            r = t.getCuOrder( + n.id);
            r.isCheckBox = a,
            a ? r.preonePrice ? r.onePrice = ( + r.preonePrice + 1).toFixed(2) : (r.preonePrice = r.onePrice, r.onePrice = ( + r.preonePrice + 1).toFixed(2)) : r.preonePrice ? r.onePrice = r.preonePrice: r.preonePrice = null,
            t.updateData()
        },
        getCuOrder: function(e) {
            for (var t = this,
            a = t.orderData,
            n = 0; n < a.length; n++) if (a[n].id == e) return a[n];
            return {}
        },
        exeEvent_del: function(e) {
            var t = this,
            a = Number(e.id);
            t.currentSelectId == a && (o.getCurrentGame().getCurrentGameMethod().reSet(), t.cancelSelectOrder()),
            t.removeData(a)
        },
        exeEvent_detailhide: function(e, t) {
            var a = this;
            $(t).parents(".lottery-details-area").eq(0).hide(),
            a.fireEvent("afterDetailHide")
        },
        exeEvent_detail: function(e, t) {
            var a = this,
            t = $(t),
            n = Number(e.id),
            r = n,
            i = t.next(),
            o = i.find(".multiple"),
            l = i.find(".list"),
            s = a.getTotal().orders,
            c = "";
            a.cacheData.currentDetailId && $("#gameorder-" + a.cacheData.currentDetailId + " .lottery-details-area").hide();
            for (var u = s.length - 1; u >= 0; u--) if (s[u].id == n) {
                s = s[u];
                break
            }
            o.text("共 " + s.num + " 注"),
            c = s.postParameter,
            a.cacheData.currentDetailId = r,
            i.css({
                left: i.position().left + i.width() + 5
            }),
            l.html(c),
            i.show(),
            a.fireEvent("afterDetailShow")
        },
        exeEvent_reselect: function(e) {
            var t = this,
            a = Number(e.id);
            t.selectOrderById(a)
        },
        updateDomStatus: function() {
            var e = this,
            t = "important",
            a = e.currentSelectId,
            n = $(e.defConfig.addOrderDom);
            a > 0 ? n.addClass(t) : n.removeClass(t)
        },
        selectOrderById: function(e) {
            var t = this,
            a = t.getOrderById(e),
            n = a.original,
            r = a.type,
            i = t.defConfig.selectedClass,
            l = $("#gameorder-" + e);
            if (t.getOrderById(e).type.indexOf("danshi") == -1) {
                l.parent().children().removeClass(i),
                l.addClass(i),
                o.getCurrentGameTypes().changeMode(r),
                o.getCurrentGameStatistics().getMoneyUnitDom().setValue(a.moneyUnit),
                o.getCurrentGameStatistics().getMultipleDom().setValue(a.multiple);
                var s = o.getCurrentGame().getGameConfig().getInstance().defConfig.gameType;
                "sl115" != $.trim(s) && o.getCurrentGameStatistics().rebateSelect.setValue(a.retPointValue),
                o.getCurrentGame().getCurrentGameMethod().reSelect(n),
                t.currentSelectId = e,
                t.updateDomStatus()
            }
        },
        cancelSelectOrder: function() {
            var e = this,
            t = e.currentSelectId;
            $(e.defConfig.addOrderDom);
            t > 0 && ($("#gameorder-" + t).removeClass(e.defConfig.selectedClass), e.currentSelectId = 0, e.updateDomStatus(), o.getCurrentGame().getCurrentGameMethod().reSet())
        },
        formatMoney: function(e) {
            var e = Number(e),
            t = /(-?\d+)(\d{3})/;
            for (e = Number.prototype.toFixed ? e.toFixed(2) : Math.round(100 * e) / 100, e = "" + e; t.test(e);) e = e.replace(t, "$1,$2");
            return e
        },
        searchSameResult: function(e, t, a, n) {
            for (var r, i = this,
            o = 0,
            l = [], s = i.getTotal().orders; o < s.length; o++) {
                l = [],
                r = s[o],
                ordersLotteryText = r.original;
                for (var c = 0; c < ordersLotteryText.length; c++) l.push(ordersLotteryText[c].join(""));
                if (r.type == e && t == l.join() && r.moneyUnit == a && r.retPointValue == n) return o
            }
            return - 1
        },
        addMultiple: function(e, t) {
            var a, n = this,
            r = n.getTotal().orders,
            i = r[t],
            l = i.type,
            s = 999999;
            if (!o.getCurrentGameTrace().isOpen()) {
                if (a = o.getCurrentGame().getDynamicConfig().gamelimit, a[l] && (s = 1 == i.moneyUnit ? a[l].maxmultiple: 10 * a[l].maxmultiple, s = s < 0 ? 99999 : s), i.multiple + e > s) return void setTimeout(function() {
                    o.getCurrentGameMessage().show({
                        type: "normal",
                        closeText: "确定",
                        closeFun: function() {
                            console.log(o),
                            r[t].multiple = s,
                            r[t].oldMultiple = r[t].multiple,
                            r[t].amount = r[t].num * r[t].moneyUnit * r[t].multiple * r[t].onePrice,
                            r[t].amountText = n.formatMoney(r[t].num * r[t].moneyUnit * r[t].multiple * r[t].onePrice),
                            n.render(),
                            o.getCurrentGame().getCurrentGameMethod().reSet(),
                            o.getCurrentGame().getCurrentGameMethod().ballsErrorTip(),
                            o.getCurrentGameStatistics().reSet(),
                            this.hide()
                        },
                        data: {
                            tplData: {
                                msg: "该组号码倍数已经超过最大限制(" + s + "倍)，将调整为系统支持的最大倍数进行添加"
                            }
                        }
                    })
                },
                100);
                r[t].multiple += e,
                r[t].oldMultiple = r[t].multiple,
                r[t].amount = r[t].num * r[t].moneyUnit * r[t].multiple * r[t].onePrice,
                r[t].amountText = n.formatMoney(r[t].num * r[t].moneyUnit * r[t].multiple * r[t].onePrice),
                n.render(),
                o.getCurrentGame().getCurrentGameMethod().reSet(),
                o.getCurrentGame().getCurrentGameMethod().ballsErrorTip(),
                n.cancelSelectOrder()
            }
        },
        editMultiples: function(e) {
            for (var t = this,
            a = t.getTotal().orders, n = 0, r = a.length; n < r; n++) a[n].multiple = e,
            a[n].amount = a[n].num * a[n].moneyUnit * a[n].multiple * a[n].onePrice,
            a[n].amountText = t.formatMoney(a[n].amount);
            t.render(),
            t.cancelSelectOrder()
        },
        editMultiple: function(e, t) {
            var a = this,
            n = a.getTotal().orders;
            n[t].multiple = e,
            n[t].amount = n[t].num * n[t].moneyUnit * n[t].multiple * (n[t].preonePrice || n[t].onePrice),
            n[t].amountText = a.formatMoney(n[t].amount),
            a.render(),
            a.cancelSelectOrder()
        },
        restoreMultiples: function() {
            for (var e = this,
            t = e.getTotal().orders, a = 0, n = t.length; a < n; a++) t[a].multiple = t[a].oldMultiple,
            t[a].amount = t[a].num * t[a].moneyUnit * t[a].multiple * t[a].onePrice,
            t[a].amountText = e.formatMoney(t[a].amount);
            e.render(),
            e.cancelSelectOrder()
        }
    },
    u = e.Class(c, a);
    u.defConfig = i,
    u.getInstance = function(e) {
        return r || (r = new u(e))
    },
    e[t] = u
} (phoenix, "GameOrder", phoenix.Event),
function(e, t, a, n) {
    var r, o = {
        mainPanel: "#J-trace-panel",
        advancedTypeHas: ["fanbei", "yingli", "yinglilv"],
        dataRowHeader: '<tr><th style="width:125px;" class="text-center">序号</th><th><input data-action="checkedAll" type="checkbox"  checked="checked"/> 追号期次</th><th>倍数</th><th>金额</th><th>预计开奖时间</th></tr>',
        dataRowTemplate: '<tr><td class="text-center"><#=No#></td><td><input data-action="checkedRow" class="trace-row-checked" type="checkbox" checked="checked"> <span class="trace-row-number" issueCode=<#=issueCode#>><#=traceNumber#></span></td><td><input class="trace-row-multiple" value="<#=multiple#>" type="text" style="width:50px;text-align:center;"> 倍</td><td><span class="price"><dfn>&yen;</dfn><span class="trace-row-money"><#=money#></span> 元</span> </td><td><span class="trace-row-time"><#=publishTime#></span></td></tr>',
        dataRowYingliHeader: '<tr><th class="text-center">序号</th><th><input data-action="checkedAll" type="checkbox" /> 追号期次</th><th>倍数</th><th>金额</th><th>奖金</th><th>预期盈利金额</th><th>预期盈利率</th></tr>',
        dataRowYingliTemplate: '<tr><td class="text-center"><#=No#></td><td><input data-action="checkedRow" class="trace-row-checked" type="checkbox" checked="checked"> <span class="trace-row-number" issueCode=<#=issueCode#>><#=traceNumber#></span></td><td><input class="trace-row-multiple" value="<#=multiple#>" type="text" style="width:50px;text-align:center;"> 倍</td><td><span class="price"><dfn>&yen;</dfn><span class="trace-row-money"><#=money#></span> 元</span></td><td><span class="price"><dfn>&yen;</dfn> <span class="trace-row-userGroupMoney"><#=userGroupMoney#></span> </span>元</td><td><span class="price"><dfn>&yen;</dfn> <span class="trace-row-winTotalAmount"><#=winTotalAmout#></span> 元</span></td><td><span class="trace-row-yinglilv"><#=yinglilv#></span>%</td></tr>'
    },
    l = e.Games,
    s = function(e, t, a) {
        var e = "" + e,
        a = a || 1e9;
        return e = e.replace(/[^\d]/g, ""),
        e = "" == e ? t: Number(e) > a ? a: e,
        Number(e)
    },
    c = function(e) {
        return e = e.replace(/[^\d]/g, ""),
        Number(e)
    },
    u = {
        init: function(e) {
            var t = this;
            l.setCurrentGameTrace(t),
            t.panel = $(e.mainPanel),
            t.TraceTab = null,
            t.TraceAdvancedTab = null,
            t.isOpenPanel = !1,
            t.orderData = null,
            t.traceType = "normal",
            t.times = 0,
            t.traceStartNumber = "",
            t.currentTraceNumber = "",
            t.advancedType = e.advancedTypeHas[0],
            t.typeTypeType = "a",
            t.initEvent(),
            t.setCurrentTraceNumber(),
            l.getCurrentGame().addEvent("changeDynamicConfig",
            function() {
                t.buildStartNumberSelectDom(),
                t.updateTableNumber()
            })
        },
        setAdvancedType: function(e) {
            "[object Number]" == Object.prototype.toString.call(e) ? this.advancedType = this.getAdvancedTypeBuIndex(e) : this.advancedType = e
        },
        getAdvancedType: function() {
            return this.advancedType
        },
        getAdvancedTypeBuIndex: function(e) {
            var t = this,
            a = t.defConfig.advancedTypeHas,
            n = a.length;
            return e < n ? a[e] : ""
        },
        initEvent: function() {
            var t = this,
            a = $("#userName"),
            n = this.traceTips = new phoenix.Tip({
                cls: "j-ui-tip-close j-ui-tip-yellow j-ui-tip-t",
                text: '<h4><i class="close">ⅹ</i>温馨提示</h4><p>平台功能小调整，默认勾选中奖后停止追号</p>'
            });
            $(".j-ui-tip-close .close").click(function() {
                var e = new Date;
                e.setFullYear(e.getFullYear() + 1),
                jQuery.cookie(a + "data", 1, {
                    expires: e
                }),
                n.hide()
            }),
            $("#J-trace-switch").click(function() {
                if (this.checked) {
                    var e = l.getCurrentGameOrder().getTotal().amount,
                    t = l.getCurrentGameMessage();
                    if (e <= 0) return t.show({
                        type: "mustChoose",
                        msg: "请至少选择一注投注号码！",
                        data: {
                            tplData: {
                                msg: "请至少选择一注投注号码！"
                            }
                        }
                    }),
                    void($("#J-trace-switch").get(0).checked = !1);
                    l.getCurrentGameTrace().show(),
                    $("#J-trace-iswintimesstop").get(0).checked = !0;
                    var r = $("#J-trace-iswintimesstop-panel");
                    jQuery.cookie(a + "data") || n.show( - 100, 40, r);
                    var i = $(".chase-tab-t").eq(1),
                    o = $(".chase-tab-content").eq(1);
                    /超级2000/.test($("#J-balls-order-container").text()) ? (o.removeClass(".chase-tab-content-current"), i.hide()) : i.show()
                } else l.getCurrentGameTrace().hide(),
                n.hide()
            }),
            t.TraceTab = TraceTab = new e.Tab({
                par: "#J-trace-panel",
                triggers: ".chase-tab-t",
                panels: ".chase-tab-content",
                currPanelClass: "chase-tab-content-current",
                eventType: "click"
            }),
            TraceTab.addEvent("afterSwitch",
            function(e, a) {
                var n = ["normal", "advanced"];
                a < n.length && t.setTraceType(n[a]),
                t.updateStatistics()
            }),
            t.TraceAdvancedTab = TraceAdvancedTab = new e.Tab({
                par: "#J-trace-advanced-type-panel",
                triggers: ".tab-title li",
                panels: ".tab-content li",
                eventType: "click"
            }),
            TraceAdvancedTab.addEvent("afterSwitch",
            function(e, a) {
                var n = this.getPanel(a).find(".trace-advanced-type-switch");
                t.setAdvancedType(a),
                n.each(function() {
                    if (this.checked) return t.setTypeTypeType($(this).parent().attr("data-type")),
                    !1
                })
            });
            var r = new e.Hover({
                triggers: "#J-trace-iswintimesstop-hover",
                panels: "#chase-stop-tip-1",
                currPanelClass: "chase-stop-tip-current",
                hoverDelayOut: 300
            });
            $("#chase-stop-tip-1").mouseleave(function() {
                r.hide()
            });
            var i = new e.Hover({
                triggers: "#J-trace-iswinstop-hover",
                panels: "#chase-stop-tip-2",
                currPanelClass: "chase-stop-tip-current",
                hoverDelayOut: 300
            });
            $("#chase-stop-tip-2").mouseleave(function() {
                i.hide()
            }),
            $("#J-chase-stop-switch-1").click(function(e) {
                e.preventDefault(),
                $("#J-trace-iswintimesstop-panel").hide(),
                $("#J-trace-iswinstop-panel").show(),
                $("#J-trace-iswintimesstop").get(0).checked = !1,
                $("#J-trace-iswinstop").get(0).checked = !0,
                $("#J-trace-iswinstop-money").removeAttr("disabled"),
                $("#J-trace-iswintimesstop-times").attr("disabled", "disabled")
            }),
            $("#J-chase-stop-switch-2").click(function(e) {
                e.preventDefault(),
                $("#J-trace-iswinstop-panel").hide(),
                $("#J-trace-iswintimesstop-panel").show(),
                $("#J-trace-iswintimesstop").get(0).checked = !0,
                $("#J-trace-iswinstop").get(0).checked = !1,
                $("#J-trace-iswinstop-money").attr("disabled", "disabled"),
                $("#J-trace-iswintimesstop-times").removeAttr("disabled")
            }),
            $("#J-trace-iswinstop-money").keyup(function() {
                this.value = s(this.value, 1, 999999)
            }),
            $("#J-trace-iswintimesstop-times").keyup(function() {
                this.value = s(this.value, 1, 999999)
            }),
            $("#J-trace-iswintimesstop").click(function() {
                var e = $("#J-trace-iswintimesstop-times");
                this.checked ? e.attr("disabled", !1).focus() : e.attr("disabled", "disabled")
            }),
            $("#J-trace-iswinstop").click(function() {
                var e = $("#J-trace-iswinstop-money");
                this.checked ? e.attr("disabled", !1).focus() : e.attr("disabled", "disabled")
            }),
            $("#J-trace-normal-times").keyup(function() {
                var e, a = l.getCurrentGame().getDynamicConfig().tracemaxtimes,
                n = "" + this.value,
                r = $("#J-function-select-tab").find(".function-select-title li"),
                i = "current";
                n = n.replace(/[^\d]/g, ""),
                n = "" == n ? 1 : Number(n) > a ? a: n,
                this.value = n,
                e = Number(n),
                e > 0 && e <= 20 && e % 5 == 0 ? (r.removeClass(i).eq(e / 5 - 1).addClass(i), o.index = e / 5 - 1) : (r.removeClass(i), o.index = 22),
                t.buildDetail()
            });
            var o = new e.Tab({
                par: "#J-function-select-tab",
                triggers: ".function-select-title li",
                panels: ".function-select-panel li",
                eventType: "click",
                index: 1
            });
            o.addEvent("afterSwitch",
            function(e, a) {
                var n = this,
                r = parseInt(n.getTrigger(a).text());
                $("#J-trace-normal-times").val(r),
                t.buildDetail()
            }),
            t.normalSelectMultiple = new e.Select({
                realDom: "#J-trace-normal-multiple",
                isInput: !0,
                expands: {
                    inputEvent: function() {
                        var e = this;
                        e.getInput().keyup(function(t) {
                            var a = this.value,
                            n = 99999;
                            this.value = this.value.replace(/[^\d]/g, ""),
                            a = Number(this.value),
                            a < 1 && (this.value = 1),
                            a > n && (this.value = n),
                            e.setValue(this.value)
                        })
                    }
                }
            }),
            t.normalSelectMultiple.addEvent("change",
            function(e, a, n) {
                var r = t.getOrderData().amount,
                i = Number(a),
                o = l.getCurrentGameOrder().getOrderMaxMultiple(),
                s = o.maxnum,
                c = l.getCurrentGameMessage(),
                u = "";
                i > s ? (u = l.getCurrentGame().getGameConfig().getInstance().getTitleByName(o.gameMethod).join("-"), c.show({
                    confirmIsShow: !0,
                    mask: !0,
                    msg: "",
                    tpl: '<div class="pop-waring"><i class="ico-waring &lt;#=icon-class#&gt;"></i><h4 class="pop-text"><#=msg#></h4></div>',
                    data: {
                        tplData: {
                            msg: "您输入的倍数超过了<b>[" + u + "]</b> 玩法的最高倍数限制，系统将自动修改为最大可输入倍数"
                        }
                    },
                    confirmFun: function() {
                        a = s,
                        t.normalSelectMultiple.setValue(a),
                        c.hide(),
                        t.getTable().find(".trace-row-multiple").val(a),
                        t.getTable().find(".trace-row-money").each(function() {
                            var e = $(this);
                            Number(e.parent().parent().find(".trace-row-multiple").val());
                            e.html(t.formatMoney(r * Number(a)))
                        }),
                        t.updateStatistics()
                    }
                })) : (t.getTable().find(".trace-row-multiple").val(a), t.getTable().find(".trace-row-money").each(function() {
                    var e = $(this);
                    Number(e.parent().parent().find(".trace-row-multiple").val());
                    e.html(t.formatMoney(r * Number(a)))
                }), t.updateStatistics())
            }),
            t.panel.find(".chase-table").keyup(function(e) {
                var a = $(e.target),
                n = t.getOrderData().amount;
                if (a.hasClass("trace-row-multiple")) {
                    var r = Number(a.val()),
                    i = t.getRowTableType(),
                    o = Number(l.getCurrentGameOrder().getOrderMaxMultiple().maxnum);
                    0 == r ? (a.val(a.val().replace(/^0/g, "")), a.parent().parent().find(".trace-row-money").html("0.00")) : r > o ? (r = o, a.val(r), a.parent().parent().find(".trace-row-money").html(t.formatMoney(n * r))) : (a.parent().parent().find(".trace-row-money").html(t.formatMoney(n * r)), "trace_advanced_yingli_a" != i && "trace_advanced_yingli_b" != i && "trace_advanced_yinglilv_a" != i && "trace_advanced_yinglilv_b" != i || t.rebuildYinglilvRows()),
                    t.updateStatistics()
                }
            }).on("blur", ".trace-row-multiple",
            function(e) {
                var a = $(e.target),
                n = (Number(a.val()), t.getOrderData().amount);
                a.val(s(a.val(), 1, l.getCurrentGameOrder().getOrderMaxMultiple().maxnum)),
                a.parent().parent().find(".trace-row-money").html(t.formatMoney(n * Number(a.val()))),
                t.updateStatistics()
            }),
            setTimeout(function() {
                var e = l.getCurrentGame().getGameConfig().getInstance().defConfig.gameType;
                "slmmc" != $.trim(e) && "sl115" != $.trim(e) && t.buildStartNumberSelectDom()
            },
            10),
            $("#J-trace-advanced-times").keyup(function() {
                this.value = s(this.value, 10, Number($("#J-trace-number-max").text()))
            }),
            $("#J-trace-advance-multiple").keyup(function(e) {
                var t = $(e.target),
                a = Number(c(t.val())),
                n = Number(l.getCurrentGameOrder().getOrderMaxMultiple().maxnum);
                0 == a ? t.val(t.val().replace(/^0/g, "")) : a > n ? t.val(n) : t.val(a)
            }).blur(function() {
                this.value = s(this.value, 1, l.getCurrentGameOrder().getOrderMaxMultiple().maxnum)
            }),
            t.panel.find(".trace-advanced-type-switch").click(function() {
                var e, a = $(this),
                n = a.parent(),
                r = n.parent().children();
                r.each(function(i) {
                    e = r.get(i),
                    n.get(0) != e ? $(e).find('input[type="text"]').attr("disabled", "disabled") : ($(e).find('input[type="text"]').attr("disabled", !1).eq(0).focus(), t.setTypeTypeType(n.attr("data-type"))),
                    a.parent().hasClass("trace-input-multiple") ? this.value = s(this.value, 1, l.getCurrentGameOrder().getOrderMaxMultiple().maxnum) : this.value = s(this.value, 1, 99999)
                })
            }),
            $("#J-trace-advanced-type-panel").on("keyup", "input[type=text]",
            function(e) {
                var t = $(e.target);
                t.hasClass("trace-input-multiple") ? this.value = s(this.value, 1, l.getCurrentGameOrder().getOrderMaxMultiple().maxnum) : this.value = s(this.value, 1, 99999)
            }),
            $("#J-trace-builddetail").click(function() {
                t.confirmSetting()
            }),
            t.panel.find(".chase-table").click(function(e) {
                var a, n = $(e.target),
                r = $.trim(n.attr("data-action")),
                i = !0;
                if (r && "" != r) switch (r) {
                case "checkedAll":
                    i = !!n.get(0).checked,
                    a = t.getRowTableType(),
                    t.getTable().find(".trace-row-checked").each(function() {
                        this.checked = i
                    }),
                    "trace_advanced_yingli_a" != a && "trace_advanced_yingli_b" != a && "trace_advanced_yinglilv_a" != a && "trace_advanced_yinglilv_b" != a || t.rebuildYinglilvRows(),
                    t.updateStatistics();
                    break;
                case "checkedRow":
                    n.size() > 0 && (a = t.getRowTableType(), "trace_advanced_yingli_a" != a && "trace_advanced_yingli_b" != a && "trace_advanced_yinglilv_a" != a && "trace_advanced_yinglilv_b" != a || t.rebuildYinglilvRows(), t.updateStatistics())
                }
            })
        },
        buildStartNumberSelectDom: function() {
            var t, a = this,
            n = l.getCurrentGame().getDynamicConfig().gamenumbers,
            r = n.length,
            i = 0,
            o = [],
            s = l.getCurrentGame().getCurrentNumber(),
            c = "(当前期)",
            u = c,
            m = "";
            for (a.traceStartNumberSelect && (t = a.traceStartNumberSelect.getValue()); i < r; i++) u = s == n[i].number ? c: "",
            m = a.traceStartNumberSelect && n[i].number == t ? ' selected="selected" ': "",
            o.push('<option value="' + n[i].number + '" ' + m + " >" + n[i].number + u + "</option>");
            $("#J-traceStartNumber").html(o.join("")),
            $("#J-trace-number-max").text(r),
            a.traceStartNumberSelect && a.traceStartNumberSelect.dom.remove(),
            a.traceStartNumberSelect = new e.Select({
                realDom: "#J-traceStartNumber",
                cls: "chase-trace-startNumber-select"
            }),
            a.traceStartNumberSelect.addEvent("change",
            function(e, t, n) {
                a.setTraceStartNumber(t)
            })
        },
        updateTableNumber: function() {
            var e, t, a, n, r, i, o, s, c, u = this,
            m = l.getCurrentGame().getDynamicConfig().gamenumbers,
            d = m.length,
            g = l.getCurrentGame().getCurrentNumber(),
            p = "",
            f = "",
            h = '<span class="icon-period-current"></span>',
            b = 0,
            v = 0,
            y = l.getCurrentGame().getGameConfig().getInstance().defConfig.gameType;
            d > 0 && (e = u.getNormalRowTable().find("tr"), t = u.getAdvancedRowTable().find("tr"), o = u.getStartNumberIndexByNumber(a), e.each(function(e) {
                if (0 == e) return ! 0;
                if (n = $(this), r = n.find(".trace-row-number"), issuecodeNumber = n.find(".trace-row-number").attr("issuecode"), i = n.find(".trace-row-time"), multipleDom = n.find(".trace-row-multiple"), a = r.text().replace(/[^\d]/g, ""), s = n.find(".text-center"), n.find(".trace-row-multiple").removeAttr("disabled"), o + 1 < d) {
                    if (p = m[o + 1].number == g ? h: "", r.html(m[o + 1].number + p), multipleDom.val("1"), i.text(m[o + 1].time), s.html("").html(e), f != issuecodeNumber.substr(0, 8) && "" != f && "fc3d" != y && "p5" != y && "ssq" != y) {
                        switch (b) {
                        case 0:
                            c = "明天 ";
                            break;
                        case 1:
                            c = "后天 ";
                            break;
                        case 2:
                            c = "大后天 ";
                            break;
                        default:
                            c = ""
                        }
                        b++,
                        "" != jQuery.trim(c) && s.html("").append('<div class="icon-chase-mark">' + c + " " + n.find(".trace-row-number").text().substr(0, 8) + "</div>")
                    }
                    f = issuecodeNumber.substr(0, 8),
                    o++
                }
            }), o = u.getStartNumberIndexByNumber(a), t.each(function(e) {
                if (0 == e) return ! 0;
                if (n = $(this), r = n.find(".trace-row-number"), issuecodeNumber = n.find(".trace-row-number").attr("issuecode"), i = n.find(".trace-row-time"), multipleDom = n.find(".trace-row-multiple"), a = r.text().replace(/[^\d]/g, ""), s = n.find(".text-center"), n.find(".trace-row-multiple").removeAttr("disabled"), o + 1 < d) {
                    if (p = m[o + 1].number == g ? h: "", r.html(m[o + 1].number + p), multipleDom.val("1"), i.text(m[o + 1].time), s.html("").html(e), f != issuecodeNumber.substr(0, 8) && "" != f && "fc3d" != y && "p5" != y && "ssq" != y) {
                        switch (v) {
                        case 0:
                            c = "明天 ";
                            break;
                        case 1:
                            c = "后天 ";
                            break;
                        case 2:
                            c = "大后天 ";
                            break;
                        default:
                            c = ""
                        }
                        v++,
                        "" != jQuery.trim(c) && s.html("").append('<div class="icon-chase-mark">' + c + " " + n.find(".trace-row-number").text().substr(0, 8) + "</div>")
                    }
                    f = issuecodeNumber.substr(0, 8),
                    o++
                }
            }))
        },
        rebuildYinglilvRows: function() {
            var e = this,
            t = e.getRowTable().find("tr"),
            a = e.getOrderData(),
            n = e.getWinMoney(),
            r = null,
            i = null,
            o = null,
            l = 1,
            s = null,
            c = 0,
            u = null,
            m = null,
            d = null,
            g = -1;
            costAmount = 0,
            t.each(function(t) {
                t > 0 && (r = $(this), i = r.find(".trace-row-checked"), i.size() > 0 && i.get(0).checked && (o = r.find(".trace-row-multiple"), l = Number(o.val()), s = r.find(".trace-row-money"), c = Number(s.text().replace(",", "")), u = r.find(".trace-row-userGroupMoney"), m = r.find(".trace-row-winTotalAmount"), d = r.find(".trace-row-yinglilv"), costAmount += a.amount * l, s.text(e.formatMoney(a.amount * l)), u.text(e.formatMoney(n * l)), m.text(e.formatMoney(n * l - costAmount)), g = (n * l - costAmount) / costAmount * 100, d.text(Number(g).toFixed(2))))
            })
        },
        isOpen: function() {
            return this.isOpenPanel
        },
        setTypeTypeType: function(e) {
            this.typeTypeType = e
        },
        getTypeTypeType: function() {
            return this.typeTypeType
        },
        getIsWinStop: function() {
            var e = $("#J-trace-iswintimesstop"),
            t = $("#J-trace-iswinstop");
            return e.get(0).checked ? 1 : t.get(0).checked ? 2 : 0
        },
        getTraceWinStopValue: function() {
            var e = this,
            t = e.getIsWinStop();
            return 1 == t ? Number($("#J-trace-iswintimesstop-times").val()) : 2 == t ? Number($("#J-trace-iswinstop-money").val()) : -1
        },
        updateStatistics: function() {
            var e = this,
            t = e.getResultData();
            $("#J-trace-statistics-times").html(t.times),
            $("#J-trace-statistics-lotterys-num").html(t.lotterysNum),
            $("#J-trace-statistics-amount").html(e.formatMoney(t.amount))
        },
        getResultData: function() {
            var e, t, a, n, r, i, o = this,
            s = o.getOrderData(),
            c = o.getRowTable().find("tr"),
            u = 0,
            m = 0,
            d = 0,
            g = [],
            p = {
                times: 0,
                lotterysNum: 0,
                amount: 0,
                orderData: s,
                traceData: [],
                traceType: o.getTraceType()
            },
            f = "",
            h = l.getCurrentGame().getDynamicConfig().gamenumbers,
            b = 0,
            v = l.getCurrentGame().getGameConfig().getInstance().defConfig.gameType;
            return c.each(function(l) {
                if (0 != l) {
                    if (e = $(this), t = e.find(".trace-row-checked"), tracenumber = e.find(".trace-row-number").attr("issuecode"), traceNo = e.find(".text-center"), traceNo.html("").html(l), f != tracenumber.substr(0, 8) && "" != f && "fc3d" != v && "p5" != v && "ssq" != v) {
                        switch (b) {
                        case 0:
                            i = "明天 ";
                            break;
                        case 1:
                            i = "后天 ";
                            break;
                        case 2:
                            i = "大后天 ";
                            break;
                        default:
                            i = ""
                        }
                        "" != jQuery.trim(i) && traceNo.html("").append('<div class="icon-chase-mark">' + i + " " + e.find(".trace-row-number").text().substr(0, 8) + "</div>"),
                        b++
                    }
                    f = tracenumber.substr(0, 8),
                    t.size() > 0 && t.get(0).checked ? (a = t.parent(), r = o.getStartNumberIndexByNumber(a.find(".trace-row-number").text()), r = r == -1 ? 0 : r, n = h[r].issueCode, e.find(".trace-row-multiple").removeAttr("disabled"), "0" == e.find(".trace-row-multiple").val() && (e.find(".trace-row-multiple").val("1"), e.find(".trace-row-money").text(o.formatMoney(1 * s.amount))), g.push({
                        traceNumber: a.find(".trace-row-number").text(),
                        issueCode: n,
                        multiple: Number(a.parent().find(".trace-row-multiple").val())
                    }), u++, d += Number(e.find(".trace-row-money").text().replace(/,/g, ""))) : (e.find(".trace-row-money").text("0"), e.find(".trace-row-multiple").val("0"), e.find(".trace-row-multiple").attr("disabled", "disabled").css("border-color", "#CECECE"))
                }
            }),
            s && (m = u * s.count, p = {
                times: u,
                lotterysNum: m,
                amount: d,
                orderData: s,
                traceData: g,
                traceType: o.getTraceType()
            }),
            p
        },
        updateOrder: function(e) {
            var t = this,
            a = l.getCurrentGameOrder().getTotal(),
            n = t.getRowTableType(),
            r = l.getCurrentGameOrder().getOrderMaxMultiple(),
            i = r.maxnum,
            o = Number(t.normalSelectMultiple.getValue()),
            s = Number($("#J-trace-advance-multiple").val());
            t.setOrderData(a),
            o > i && t.normalSelectMultiple.setValue(i),
            s > i && $("#J-trace-advance-multiple").val(i),
            e || "trace_advanced_fanbei_a" != n && "trace_advanced_fanbei_b" != n && "trace_advanced_yingli_a" != n && "trace_advanced_yingli_b" != n && "trace_advanced_yinglilv_a" != n && "trace_advanced_yinglilv_b" != n || l.getCurrentGameMessage().show({
                type: "normal",
                closeFun: function() {
                    this.hide()
                },
                data: {
                    tplData: {
                        msg: "您的方案已被修改，如果需要根据最新方案进行追号，请点击生成追号计划按钮"
                    }
                }
            }),
            t.getAdvancedRowTable().html(""),
            t.updateDetail(a.amount),
            t.updateStatistics()
        },
        updateDetail: function(e) {
            var t, a = this,
            n = a.getTable().find("tr"),
            r = null,
            i = a.getRowTableType();
            "trace_advanced_yingli_a" == i || "trace_advanced_yingli_b" == i || "trace_advanced_yinglilv_a" == i || "trace_advanced_yinglilv_b" == i ? a.rebuildYinglilvRows() : (t = a.getAdvancedRowTable().attr("data-type"), "trace_advanced_fanbei_a" != t && "trace_advanced_fanbei_b" != t || (n = a.getAdvancedTable().find("tr"), n.each(function() {
                r = $(this),
                rowMoney = r.find(".trace-row-money"),
                rowMultiple = Number(r.find(".trace-row-multiple").val()),
                rowMoney.text(a.formatMoney(rowMultiple * e))
            }))),
            n = a.getNormalTable().find("tr"),
            n.each(function() {
                r = $(this),
                rowMoney = r.find(".trace-row-money"),
                rowMultiple = Number(r.find(".trace-row-multiple").val()),
                rowMoney.text(a.formatMoney(rowMultiple * e))
            })
        },
        getWinMoney: function() {
            for (var e = this,
            t = e.getOrderData().orders, a = 0, n = t.length, r = 0; a < n; a++) r += e.getPlayGroupMoneyByGameMethodName(t[a].type) * t[a].moneyUnit;
            return r
        },
        confirmSetting: function() {
            var e = this;
            e.setOrderData(l.getCurrentGameOrder().getTotal()),
            e.buildDetail()
        },
        isMoreBounsMethod: function() {
            for (var e = this,
            t = e.getOrderData().orders, a = 0, n = t.length; a < n; a++) if (type = t[a].type, "undefined" != typeof l.currentIsMoreBouns.moreBouns[type] && 1 == l.currentIsMoreBouns.moreBouns[type]) return t[a].typeText;
            return ""
        },
        isSameGameMethod: function() {
            var e = this,
            t = e.getOrderData().orders,
            a = "",
            n = -1;
            for (i = 0, len = t.length; i < len; i++) {
                if ("" != a) {
                    if (a != t[i].type) return ! 1
                } else a = t[i].type;
                if (n != -1) {
                    if (n != t[i].moneyUnit) return ! 1
                } else n = t[i].moneyUnit
            }
            return ! 0
        },
        getSameGameMethodName: function() {
            var e = this,
            t = e.getOrderData().orders;
            if (t.length > 0) return t[0].type
        },
        getSameGameMoneyUnti: function() {
            var e = this,
            t = e.getOrderData().orders;
            if (t.length > 0) return t[0].moneyUnit
        },
        setOrderData: function(e) {
            this.orderData = e
        },
        getOrderData: function() {
            return null == this.orderData ? {
                count: 0,
                amount: 0,
                orders: []
            }: this.orderData
        },
        getStartNumberIndexByNumber: function(e) {
            for (var t = l.getCurrentGame().getDynamicConfig().gamenumbers, a = t.length, n = 0; n < a; n++) if (t[n].number == e) return n;
            return - 1
        },
        getStartNumberByIndex: function(e) {
            var t = l.getCurrentGame().getDynamicConfig().gamenumbers;
            return t.length > e ? t[e] : {}
        },
        buildDetail: function() {
            var e = this,
            t = e.getTraceType(),
            a = l.getCurrentGameMessage();
            return e.setOrderData(l.getCurrentGameOrder().getTotal()),
            orderAmount = e.getOrderData().amount,
            "normal" != t && orderAmount <= 0 ? void a.show({
                type: "mustChoose",
                msg: "请至少选择一注投注号码！",
                data: {
                    tplData: {
                        msg: "请至少选择一注投注号码！"
                    }
                }
            }) : ($.isFunction(e["trace_" + t]) && e["trace_" + t].call(e), void e.updateStatistics())
        },
        trace_normal: function() {
            var e, t, a, n = this,
            r = n.defConfig,
            i = r.dataRowTemplate,
            o = [],
            s = (n.getTraceType(), n.getTimes()),
            c = n.getMultiple(),
            u = (l.getCurrentGameOrder().getOrderMaxMultiple().maxnum, 0),
            m = 0,
            d = l.getCurrentGame().getCurrentNumber(),
            g = '<span class="icon-period-current"></span>',
            p = "",
            f = n.traceStartNumberSelect.getValue();
            l.getCurrentGame().getDynamicConfig().gamenumbers.length;
            for (n.setOrderData(l.getCurrentGameOrder().getTotal()), u = n.getOrderData().amount, o.push(r.dataRowHeader), e = n.getStartNumberIndexByNumber(f), m = e, s += m; m < s; m++) t = n.getStartNumberByIndex(m),
            p = t.number,
            p == d && (p += g),
            t.number && (a = {
                No: m + 1,
                traceNumber: p,
                issueCode: t.issueCode,
                multiple: c,
                money: n.formatMoney(u * c),
                publishTime: t.time
            },
            o.push(n.formatRow(i, a)));
            n.getRowTable().html(o.join("")),
            n.getRowTable().attr("data-type", "trace_normal")
        },
        trace_advanced: function() {
            var e = this,
            t = e.getTraceType(),
            a = e.getAdvancedType(),
            n = e.getTypeTypeType(),
            r = "trace_" + t + "_" + a + "_" + n,
            i = "",
            o = "",
            s = e.isMoreBounsMethod();
            if ("fanbei" == a);
            else if (!e.isSameGameMethod() && ("yingli" == a || "yinglilv" == a) || "" != s) return i = "yingli" == a ? "盈利金额追号": "yinglilv" == a ? "盈利率追号": "盈利追号方式",
            e.isSameGameMethod() ? "" != s && (o = i + "时，" + s + ",为多奖金玩法，不支持盈利金额和盈利率追号") : o = i + "不支持混投<br />请确保您的投注都为同一玩法类型<br />且元角模式一致。",
            e.getRowTable().html(""),
            void l.getCurrentGameMessage().show({
                type: "mustChoose",
                msg: "",
                data: {
                    tplData: {
                        msg: o
                    }
                }
            });
            $.isFunction(e[r]) && e[r](),
            e.getRowTable().attr("data-type", r)
        },
        trace_advanced_fanbei_a: function(e) {
            var t, a, n, r = this,
            i = r.defConfig.dataRowTemplate,
            o = [],
            s = r.getTimes(),
            c = l.getCurrentGameOrder().getOrderMaxMultiple(),
            u = e || c.maxnum,
            m = l.getCurrentGame().getGameConfig().getInstance().getTitleByName(c.gameMethod).join("-"),
            d = Number($("#J-trace-advanced-fanbei-a-jiange").val()),
            g = r.getMultiple(),
            p = g,
            f = Number($("#J-trace-advanced-fanbei-a-multiple").val()),
            h = 0,
            b = d,
            v = l.getCurrentGame().getCurrentNumber(),
            y = '<span class="icon-period-current"></span>',
            C = "",
            T = r.traceStartNumberSelect.getValue(),
            D = (l.getCurrentGame().getDynamicConfig().gamenumbers.length, ""),
            w = "";
            for (o.push(r.defConfig.dataRowHeader), t = r.getStartNumberIndexByNumber(T), h = t, s += h, a = r.getStartNumberByIndex(h); h < s; h++) {
                if (b <= 0 && (b = d, p *= f), b--, p > u && (l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        r.trace_advanced_fanbei_a(u),
                        r.updateStatistics(),
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "翻倍追号中的<b>[" + m + "]</b>的倍数超过了最大倍数限制，系统将自动调整为最大可设置倍数"
                        }
                    }
                }), !e)) return;
                if (p = p > u ? u: p, a = r.getStartNumberByIndex(h), !a.number) break;
                C = a.number,
                C == v && (C += y),
                n = {
                    No: w,
                    traceNumber: C,
                    issueCode: a.issueCode,
                    multiple: p,
                    money: r.formatMoney(orderAmount * p),
                    publishTime: a.time
                },
                D = C.substr(0, 8),
                o.push(r.formatRow(i, n))
            }
            r.getRowTable().html(o.join(""))
        },
        trace_advanced_fanbei_b: function() {
            var e, t, a, n = this,
            r = n.defConfig.dataRowTemplate,
            i = [],
            o = n.getTimes(),
            s = l.getCurrentGameOrder().getOrderMaxMultiple().maxnum,
            c = (Number($("#J-trace-advanced-fanbei-a-jiange").val()), n.getMultiple(), 1),
            u = (Number($("#J-trace-advanced-fanbei-a-multiple").val()), 0),
            m = Number($("#J-trace-advanced-fanbei-b-num").val()),
            d = Number($("#J-trace-advance-multiple").val()),
            g = Number($("#J-trace-advanced-fanbei-b-multiple").val()),
            p = l.getCurrentGame().getCurrentNumber(),
            f = '<span class="icon-period-current"></span>',
            h = "",
            b = n.traceStartNumberSelect.getValue(),
            v = (l.getCurrentGame().getDynamicConfig().gamenumbers.length, ""),
            y = "";
            for (i.push(n.defConfig.dataRowHeader), e = n.getStartNumberIndexByNumber(b), u = e, o += u, t = n.getStartNumberByIndex(u); u < o && (c = u < m + e ? d > s ? s: d: g > s ? s: g, t = n.getStartNumberByIndex(u), t.number); u++) h = t.number,
            h == p && (h += f),
            a = {
                No: y,
                traceNumber: h,
                issueCode: t.issueCode,
                multiple: c,
                money: n.formatMoney(orderAmount * c),
                publishTime: t.time
            },
            v = h.substr(0, 8),
            i.push(n.formatRow(r, a));
            n.getRowTable().html(i.join(""))
        },
        trace_advanced_yingli_a: function(e) {
            var t, a, n, r, i = this,
            o = i.defConfig.dataRowTemplate,
            s = [],
            c = i.getTimes(),
            u = l.getCurrentGameOrder().getOrderMaxMultiple(),
            m = e || u.maxnum,
            d = l.getCurrentGame().getGameConfig().getInstance().getTitleByName(u.gameMethod).join("-"),
            t = i.getMultiple(),
            g = 0,
            p = (i.getSameGameMethodName(), Number($("#J-trace-advanced-yingli-a-money").val())),
            f = i.getSameGameMoneyUnti(),
            h = i.getWinMoney(),
            o = i.defConfig.dataRowYingliTemplate,
            b = i.getOrderData().orders,
            v = 0,
            y = 0,
            C = 0,
            T = 0,
            D = l.getCurrentGame().getCurrentNumber(),
            w = '<span class="icon-period-current"></span>',
            G = "",
            x = i.traceStartNumberSelect.getValue(),
            M = (l.getCurrentGame().getDynamicConfig().gamenumbers.length, ""),
            N = "";
            for (s.push(i.defConfig.dataRowYingliHeader), a = i.getStartNumberIndexByNumber(x), g = a, c += g, n = i.getStartNumberByIndex(g); g < c; g++) {
                if (v = 0, C = 0, $.each(b,
                function(e) {
                    var t = this,
                    a = t.num,
                    n = t.onePrice,
                    r = t.multiple,
                    i = a * r * n * f,
                    o = h * r;
                    C += o,
                    v += i
                }), t < 0) return l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "您设置的盈利金额追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                        }
                    }
                }),
                void i.getRowTable().html("");
                if (t > m) {
                    if (l.getCurrentGameMessage().show({
                        type: "normal",
                        closeText: "确定",
                        closeFun: function() {
                            i.trace_advanced_yingli_a(m),
                            i.updateStatistics(),
                            this.hide()
                        },
                        data: {
                            tplData: {
                                msg: "盈利金额追号中的<b>[" + d + "]</b>的倍数超过了最大倍数限制，系统将自动调整为最大可设置倍数"
                            }
                        }
                    }), t = e, !e) return;
                    t = e
                }
                if (2 == $("#J-select-rebate option:selected").attr("retPointValue")) return l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "高奖金模式不支持盈利金额和盈利率追号，请使用返点模式进行高级追号。"
                        }
                    }
                }),
                void i.getRowTable().html("");
                var S = !1,
                k = 99999;
                e: for (var B = 0; B <= 99999; B++) {
                    var I = v,
                    _ = y,
                    O = C,
                    J = T;
                    if (I *= t, _ += I, O = h * t - _, J = O / _, !(O < p)) {
                        S = !0,
                        v = I,
                        y = _,
                        C = O,
                        T = J;
                        break e
                    }
                    t++
                }
                if (t > k && !S && !g) return l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "您设置的盈利金额追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                        }
                    }
                }),
                void i.getRowTable().html("");
                if (t > k) {
                    l.getCurrentGameMessage().show({
                        type: "normal",
                        closeText: "确定",
                        closeFun: function() {
                            this.hide()
                        },
                        data: {
                            tplData: {
                                msg: "您设置的盈利金额追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                            }
                        }
                    });
                    break
                }
                if (n = i.getStartNumberByIndex(g), !n.number) break;
                G = n.number,
                G == D && (G += w),
                r = {
                    No: N,
                    traceNumber: G,
                    issueCode: n.issueCode,
                    multiple: t,
                    money: i.formatMoney(v),
                    userGroupMoney: i.formatMoney(h * t),
                    winTotalAmout: i.formatMoney(C),
                    yinglilv: Number(100 * T).toFixed(2)
                },
                M = G.substr(0, 8),
                s.push(i.formatRow(o, r))
            }
            i.getRowTable().html(s.join("")),
            i.trace_row_empty()
        },
        trace_advanced_yingli_b: function(e) {
            var t, a, n, r, i = this,
            o = i.defConfig.dataRowTemplate,
            s = [],
            c = i.getTimes(),
            u = l.getCurrentGameOrder().getOrderMaxMultiple(),
            m = e || u.maxnum,
            d = l.getCurrentGame().getGameConfig().getInstance().getTitleByName(u.gameMethod).join("-"),
            t = i.getMultiple(),
            g = 0,
            p = (i.getSameGameMethodName(), Number($("#J-trace-advanced-yingli-b-num").val())),
            f = Number($("#J-trace-advanced-yingli-b-money1").val()),
            h = Number($("#J-trace-advanced-yingli-b-money2").val()),
            b = i.getSameGameMoneyUnti(),
            v = i.getWinMoney(),
            o = i.defConfig.dataRowYingliTemplate,
            y = i.getOrderData().orders,
            C = 0,
            T = 0,
            D = 0,
            w = 0,
            G = l.getCurrentGame().getCurrentNumber(),
            x = '<span class="icon-period-current"></span>',
            M = "",
            N = i.traceStartNumberSelect.getValue(),
            S = (l.getCurrentGame().getDynamicConfig().gamenumbers.length, ""),
            k = "";
            for (s.push(i.defConfig.dataRowYingliHeader), a = i.getStartNumberIndexByNumber(N), g = a, c += g, n = i.getStartNumberByIndex(g); g < c; g++) {
                if (g + 1 > p + a && (f = h), C = 0, D = 0, $.each(y,
                function(e) {
                    var t = this,
                    a = t.num,
                    n = t.onePrice,
                    r = t.multiple,
                    i = a * r * n * b,
                    o = v * r;
                    D += o,
                    C += i
                }), t < 0) return l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "您设置的盈利金额追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                        }
                    }
                }),
                void i.getRowTable().html("");
                if (t > m) {
                    if (l.getCurrentGameMessage().show({
                        type: "normal",
                        closeText: "确定",
                        closeFun: function() {
                            i.trace_advanced_yingli_b(m),
                            i.updateStatistics(),
                            this.hide()
                        },
                        data: {
                            tplData: {
                                msg: "盈利金额追号中的<b>[" + d + "]</b>的倍数超过了最大倍数限制，系统将自动调整为最大可设置倍数"
                            }
                        }
                    }), t = e, !e) return;
                    t = e
                }
                var B = !1,
                I = 99999;
                e: for (var _ = 0; _ <= 99999; _++) {
                    var O = C,
                    J = T,
                    P = D,
                    j = w;
                    if (O *= t, J += O, P = v * t - J, j = P / J, !(P < f)) {
                        B = !0,
                        C = O,
                        T = J,
                        D = P,
                        w = j;
                        break e
                    }
                    t++
                }
                if (t > I && !B && !g) return l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "您设置的盈利金额追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                        }
                    }
                }),
                void i.getRowTable().html("");
                if (t > I) {
                    l.getCurrentGameMessage().show({
                        type: "normal",
                        closeText: "确定",
                        closeFun: function() {
                            this.hide()
                        },
                        data: {
                            tplData: {
                                msg: "您设置的盈利金额追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                            }
                        }
                    });
                    break
                }
                if (n = i.getStartNumberByIndex(g), !n.number) break;
                M = n.number,
                M == G && (M += x),
                r = {
                    No: k,
                    traceNumber: M,
                    issueCode: n.issueCode,
                    multiple: t,
                    money: i.formatMoney(C),
                    userGroupMoney: i.formatMoney(v * t),
                    winTotalAmout: i.formatMoney(D),
                    yinglilv: Number(100 * w).toFixed(2)
                },
                S = M.substr(0, 8),
                s.push(i.formatRow(o, r))
            }
            return 2 == $("#J-select-rebate option:selected").attr("retPointValue") ? (l.getCurrentGameMessage().show({
                type: "normal",
                closeText: "确定",
                closeFun: function() {
                    this.hide()
                },
                data: {
                    tplData: {
                        msg: "高奖金模式不支持盈利金额和盈利率追号，请使用返点模式进行高级追号。"
                    }
                }
            }), void i.getRowTable().html("")) : (i.getRowTable().html(s.join("")), void i.trace_row_empty())
        },
        trace_advanced_yinglilv_a: function(e) {
            var t, a, n, r, i = this,
            o = i.defConfig.dataRowTemplate,
            s = [],
            c = i.getTimes(),
            u = l.getCurrentGameOrder().getOrderMaxMultiple(),
            m = e || u.maxnum,
            d = l.getCurrentGame().getGameConfig().getInstance().getTitleByName(u.gameMethod).join("-"),
            t = i.getMultiple(),
            g = 0,
            p = (i.getSameGameMethodName(), Number($("#J-trace-advanced-yinglilv-a").val()) / 100),
            f = i.getSameGameMoneyUnti(),
            h = i.getWinMoney(),
            o = i.defConfig.dataRowYingliTemplate,
            b = i.getOrderData().orders,
            v = 0,
            y = 0,
            C = 0,
            T = l.getCurrentGame().getCurrentNumber(),
            D = '<span class="icon-period-current"></span>',
            w = "",
            G = i.traceStartNumberSelect.getValue(),
            x = (l.getCurrentGame().getDynamicConfig().gamenumbers.length, ""),
            M = "";
            for (s.push(i.defConfig.dataRowYingliHeader), a = i.getStartNumberIndexByNumber(G), g = a, c += g, n = i.getStartNumberByIndex(g); g < c; g++) {
                if (v = 0, C = 0, $.each(b,
                function(e) {
                    var t = this,
                    a = t.num,
                    n = t.onePrice,
                    r = t.multiple,
                    i = a * r * n * f,
                    o = h * r;
                    C += o,
                    v += i
                }), t < 0) return l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "您设置的盈利率追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                        }
                    }
                }),
                void i.getRowTable().html("");
                if (t > m) {
                    if (l.getCurrentGameMessage().show({
                        type: "normal",
                        closeText: "确定",
                        closeFun: function() {
                            i.trace_advanced_yinglilv_a(m),
                            i.updateStatistics(),
                            this.hide()
                        },
                        data: {
                            tplData: {
                                msg: "盈利率追号中的<b>[" + d + "]</b>的倍数超过了最大倍数限制，系统将自动调整为最大可设置倍数"
                            }
                        }
                    }), t = e, !e) return;
                    t = e
                }
                if (2 == $("#J-select-rebate option:selected").attr("retPointValue")) return l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "高奖金模式不支持盈利金额和盈利率追号，请使用返点模式进行高级追号。"
                        }
                    }
                }),
                void i.getRowTable().html("");
                var N = !1,
                S = 99999;
                e: for (var k = 0; k <= 99999; k++) {
                    var B = v,
                    I = y,
                    _ = C,
                    O = 0;
                    if (B *= t, I += B, _ = h * t - I, O = _ / I, !(O < p)) {
                        N = !0,
                        v = B,
                        y = I,
                        C = _;
                        break e
                    }
                    t++
                }
                if (t > S && !N && !g) return l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "您设置的盈利金额追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                        }
                    }
                }),
                void i.getRowTable().html("");
                if (t > S) {
                    l.getCurrentGameMessage().show({
                        type: "normal",
                        closeText: "确定",
                        closeFun: function() {
                            this.hide()
                        },
                        data: {
                            tplData: {
                                msg: "您设置的盈利金额追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                            }
                        }
                    });
                    break
                }
                if (n = i.getStartNumberByIndex(g), !n.number) break;
                w = n.number,
                w == T && (w += D),
                r = {
                    No: M,
                    traceNumber: w,
                    issueCode: n.issueCode,
                    multiple: t,
                    money: i.formatMoney(v),
                    userGroupMoney: i.formatMoney(h * t),
                    winTotalAmout: i.formatMoney(C),
                    yinglilv: Number(C / y * 100).toFixed(2)
                },
                s.push(i.formatRow(o, r))
            }
            x = w.substr(0, 8),
            i.getRowTable().html(s.join("")),
            i.trace_row_empty()
        },
        trace_advanced_yinglilv_b: function(e) {
            var t, a, n, r, i = this,
            o = i.defConfig.dataRowTemplate,
            s = [],
            c = i.getTimes(),
            u = l.getCurrentGameOrder().getOrderMaxMultiple(),
            m = e || u.maxnum,
            d = l.getCurrentGame().getGameConfig().getInstance().getTitleByName(u.gameMethod).join("-"),
            t = i.getMultiple(),
            g = 0,
            p = (i.getSameGameMethodName(), Number($("#J-trace-advanced-yinglilv-b-num").val())),
            f = Number($("#J-trace-advanced-yingli-b-yinglilv1").val()) / 100,
            h = Number($("#J-trace-advanced-yingli-b-yinglilv2").val()) / 100,
            b = 0,
            v = i.getSameGameMoneyUnti(),
            y = i.getWinMoney(),
            o = i.defConfig.dataRowYingliTemplate,
            C = i.getOrderData().orders,
            T = 0,
            D = 0,
            w = 0,
            G = l.getCurrentGame().getCurrentNumber(),
            x = '<span class="icon-period-current"></span>',
            M = "",
            N = i.traceStartNumberSelect.getValue(),
            S = (l.getCurrentGame().getDynamicConfig().gamenumbers.length, ""),
            k = "";
            for (s.push(i.defConfig.dataRowYingliHeader), a = i.getStartNumberIndexByNumber(N), g = a, c += g, n = i.getStartNumberByIndex(g); g < c; g++) {
                if (T = 0, w = 0, $.each(C,
                function(e) {
                    var t = this,
                    a = t.num,
                    n = t.onePrice,
                    r = t.multiple,
                    i = a * r * n * v,
                    o = a * y * r;
                    w += o,
                    T += i
                }), b = g < p + a ? f: h, t < 0) return l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "您设置的盈利率追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                        }
                    }
                }),
                void i.getRowTable().html("");
                if (t > m) {
                    if (l.getCurrentGameMessage().show({
                        type: "normal",
                        closeText: "确定",
                        closeFun: function() {
                            i.trace_advanced_yinglilv_a(m),
                            i.updateStatistics(),
                            this.hide()
                        },
                        data: {
                            tplData: {
                                msg: "盈利率追号中的<b>[" + d + "]</b>的倍数超过了最大倍数限制，系统将自动调整为最大可设置倍数"
                            }
                        }
                    }), t = e, !e) return;
                    t = e
                }
                var B = !1,
                I = 99999;
                e: for (var _ = 0; _ <= 99999; _++) {
                    var O = T,
                    J = D,
                    P = w,
                    j = 0;
                    if (O *= t, J += O, P = y * t - J, j = P / J, !(j < b)) {
                        B = !0,
                        T = O,
                        D = J,
                        w = P;
                        break e
                    }
                    t++
                }
                if (t > I && !B && !g) return l.getCurrentGameMessage().show({
                    type: "normal",
                    closeText: "确定",
                    closeFun: function() {
                        this.hide()
                    },
                    data: {
                        tplData: {
                            msg: "您设置的盈利金额追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                        }
                    }
                }),
                void i.getRowTable().html("");
                if (t > I) {
                    l.getCurrentGameMessage().show({
                        type: "normal",
                        closeText: "确定",
                        closeFun: function() {
                            this.hide()
                        },
                        data: {
                            tplData: {
                                msg: "您设置的盈利金额追号参数过高，无法达到您预期的目标值，请您重新修改参数设置。"
                            }
                        }
                    });
                    break
                }
                if (n = i.getStartNumberByIndex(g), !n.number) break;
                M = n.number,
                M == G && (M += x),
                r = {
                    No: k,
                    traceNumber: M,
                    issueCode: n.issueCode,
                    multiple: t,
                    money: i.formatMoney(T),
                    userGroupMoney: i.formatMoney(y * t),
                    winTotalAmout: i.formatMoney(w),
                    yinglilv: Number(w / D * 100).toFixed(2)
                },
                S = M.substr(0, 8),
                s.push(i.formatRow(o, r))
            }
            return 2 == $("#J-select-rebate option:selected").attr("retPointValue") ? (l.getCurrentGameMessage().show({
                type: "normal",
                closeText: "确定",
                closeFun: function() {
                    this.hide()
                },
                data: {
                    tplData: {
                        msg: "高奖金模式不支持盈利金额和盈利率追号，请使用返点模式进行高级追号。"
                    }
                }
            }), void i.getRowTable().html("")) : (i.getRowTable().html(s.join("")), void i.trace_row_empty())
        },
        trace_row_empty: function() {
            $("#J-trace-table-advanced-body .trace-row-number").size() <= 0 && l.getCurrentGameMessage().show({
                type: "normal",
                closeText: "返回",
                closeFun: function() {
                    this.hide()
                },
                data: {
                    tplData: {
                        msg: "设置参数有误！无法实现您设定的盈利参数！"
                    }
                }
            })
        },
        getMultipleByYinglilv: function(e, t, a, n) {
            for (var r = 1,
            i = 1e5; r < i; r++) if ((t * r - a * r - n) / (a * r + n) >= e) return r;
            return - 1
        },
        getMultipleByMoney: function(e, t, a, n) {
            for (var r = 1,
            i = 1e5; r < i; r++) if (e * r - n - a * r > t) return r;
            return - 1
        },
        getPlayGroupMoneyByGameMethodName: function(e) {
            var t = null;
            try {
                l.getCurrentGame().getDynamicConfig().gamelimit[e].usergroupmoney
            } catch(e) {}
            var a = l.getCurrentGame().getCurrentGameMethod().getGameMethodName(),
            n = l.getCurrentGame().getGameConfig().getInstance().getBetAwardUrl() + "?type=" + a + "&extent=currentFre&line=5&lenth=30";
            return t && Number(t) > 0 ? t: l.cacheData.gameBonus[n] && l.cacheData.gameBonus[n] > 0 ? Number(l.cacheData.gameBonus[n]) : void alert(l.getCurrentGame().getGameConfig().getInstance().getTitleByName(e) + "玩法类型奖金组读取失败，请刷新页面重试！")
        },
        formatRow: function(e, t) {
            var a, n, r = t;
            for (a in r) r.hasOwnProperty(a) && (n = RegExp("<#=" + a + "#>", "g"), e = e.replace(n, r[a]));
            return e
        },
        formatMoney: function(e) {
            var e = Number(e),
            t = /(-?\d+)(\d{3})/;
            for (e = Number.prototype.toFixed ? e.toFixed(2) : Math.round(100 * e) / 100, e = "" + e; t.test(e);) e = e.replace(t, "$1,$2");
            return e
        },
        getAdvancedTable: function() {
            var e = this;
            return e._advancedTable || (e._advancedTable = $("#J-trace-table-advanced"))
        },
        getAdvancedRowTable: function() {
            var e = this;
            return e._advancedTableContainer || (e._advancedTableContainer = $("#J-trace-table-advanced-body"))
        },
        getNormalTable: function() {
            var e = this;
            return e._table || (e._table = $("#J-trace-table"))
        },
        getNormalRowTable: function() {
            var e = this;
            return e._tableContainer || (e._tableContainer = $("#J-trace-table-body"))
        },
        getTable: function() {
            var e = this;
            return e.isAdvanced() ? e._advancedTable || (e._advancedTable = $("#J-trace-table-advanced")) : e._table || (e._table = $("#J-trace-table"))
        },
        getRowTable: function() {
            var e = this;
            return e.isAdvanced() ? e._advancedTableContainer || (e._advancedTableContainer = $("#J-trace-table-advanced-body")) : e._tableContainer || (e._tableContainer = $("#J-trace-table-body"))
        },
        setCurrentTraceNumber: function(e) {
            var t = this;
            t.currentTraceNumber = e
        },
        getCurrentTraceNumber: function() {
            return me.currentTraceNumber
        },
        setTraceStartNumber: function(e) {
            var t = this;
            t.traceStartNumber = e
        },
        getTraceStartNumber: function() {
            return me.traceStartNumber
        },
        getMultiple: function() {
            var e = this;
            return e.isAdvanced() ? e.getAdvancedMultiple() : e.getNormalMultiple()
        },
        getNormalMultiple: function() {
            return Number(this.normalSelectMultiple.getValue())
        },
        getAdvancedMultiple: function() {
            return Number($("#J-trace-advance-multiple").val())
        },
        setIsWinStop: function(e) {
            this.isWinStop = !!e
        },
        getTimes: function() {
            var e = this;
            return e.isAdvanced() ? e.getAdvancedTimes() : Number($("#J-trace-normal-times").val())
        },
        getAdvancedTimes: function() {
            return Number($("#J-trace-advanced-times").val())
        },
        isAdvanced: function() {
            var e = this;
            return "advanced" == e.traceType
        },
        setTraceType: function(e) {
            var t = this;
            e != t.traceType && (e = e ? e: "normal", t.traceType = e)
        },
        getTraceType: function() {
            return this.traceType
        },
        getRowTableType: function() {
            var e = this;
            return e.getRowTable().attr("data-type")
        },
        emptyRowTable: function() {
            var e = this;
            $("#J-trace-table-body").html(""),
            $("#J-trace-table-advanced-body").html(""),
            e.updateStatistics()
        },
        show: function() {
            var e = this;
            l.getCurrentGameOrder().editMultiples(1),
            e.setOrderData(l.getCurrentGameOrder().getTotal()),
            l.getCurrentGameStatistics().getMultipleDom().hide(),
            l.getCurrentGameStatistics().getMultipleTextDom().show(),
            e.panel.show(),
            e.isOpenPanel = !0,
            e.buildDetail()
        },
        hide: function() {
            var e = this;
            l.getCurrentGameOrder().restoreMultiples(),
            l.getCurrentGameStatistics().getMultipleDom().show(),
            l.getCurrentGameStatistics().getMultipleTextDom().hide(),
            e.panel.hide(),
            e.isOpenPanel = !1,
            e.reSetTab(),
            e.emptyRowTable(),
            $("#J-trace-switch").get(0).checked = !1,
            $("#J-trace-iswinstop-panel").hide(),
            $("#J-trace-iswintimesstop-panel").show(),
            $("#J-trace-iswintimesstop").get(0).checked = !1,
            this.traceTips.hide()
        },
        reSetTab: function() {
            var e = this,
            t = e.TraceTab,
            a = e.TraceAdvancedTab;
            t.triggers.removeClass(t.defConfig.currClass),
            t.triggers.eq(0).addClass(t.defConfig.currClass),
            t.panels.removeClass(t.defConfig.currPanelClass),
            t.panels.eq(0).addClass(t.defConfig.currPanelClass),
            t.index = 0,
            a.triggers.removeClass(a.defConfig.currClass),
            a.triggers.eq(0).addClass(a.defConfig.currClass),
            a.panels.removeClass(a.defConfig.currPanelClass),
            a.panels.eq(0).addClass(a.defConfig.currPanelClass),
            a.index = 0,
            $("#J-trace-normal-times").val(10),
            $("#J-function-select-tab .function-select-title li").removeClass("current").eq(1).addClass("current"),
            e.normalSelectMultiple.setValue(1),
            $("#J-trace-advanced-times").val(10),
            $("#J-trace-advance-multiple").val(1),
            $("#J-trace-advanced-fanbei-a-jiange").val(2),
            $("#J-trace-advanced-fanbei-a-multiple").val(2),
            $("#J-trace-advanced-fanbei-b-num").val(5),
            $("#J-trace-advanced-fanbei-b-multiple").val(3),
            $("#J-trace-advanced-yingli-a-money").val(100),
            $("#J-trace-advanced-yingli-b-num").val(2),
            $("#J-trace-advanced-yingli-b-money1").val(100),
            $("#J-trace-advanced-yingli-b-money2").val(50),
            $("#J-trace-advanced-yinglilv-a").val(10),
            $("#J-trace-advanced-yinglilv-b-num").val(5),
            $("#J-trace-advanced-yingli-b-yinglilv1").val(30),
            $("#J-trace-advanced-yingli-b-yinglilv2").val(10),
            e.setTraceType("normal"),
            e.advancedType = e.defConfig.advancedTypeHas[0],
            e.typeTypeType = "a",
            $("#J-trace-advanced-type-panel").find('input[type="radio"]').each(function(e) {
                if ((e + 1) % 2 != 0) {
                    var t, a = $(this),
                    n = a.parent(),
                    r = n.parent().children();
                    this.checked = !0,
                    r.each(function(e) {
                        t = r.get(e),
                        n.get(0) != t ? $(t).find('input[type="text"]').attr("disabled", "disabled") : $(t).find('input[type="text"]').attr("disabled", !1)
                    })
                }
            })
        }
    },
    m = e.Class(u, a);
    m.defConfig = o,
    m.getInstance = function(e) {
        return r || (r = new m(e))
    },
    e[t] = m
} (phoenix, "GameTrace", phoenix.Event),
function(e, t, a, n) {
    var r, i = {
        URL: "",
        handlingChargeURL: ""
    },
    o = e.Games,
    l = {
        init: function(e) {
            var t = this;
            t.defConfig;
            t.postLock = null,
            o.setCurrentGameSubmit(t),
            t.addEvent("afterSubmit",
            function() {
                t.cancelPostLock()
            })
        },
        formatMoney: function(e) {
            var e = Number(e),
            t = /(-?\d+)(\d{3})/;
            for (e = Number.prototype.toFixed ? e.toFixed(2) : Math.round(100 * e) / 100, e = "" + e; t.test(e);) e = e.replace(t, "$1,$2");
            return e
        },
        getSubmitData: function() {
            var e = {},
            t = o.getCurrentGameOrder().orderData,
            a = 0,
            n = t.length,
            r = o.getCurrentGameTrace().getResultData(),
            i = 0,
            l = r.traceData.length;
            for (e.gameType = o.getCurrentGame().getGameConfig().getInstance().defConfig.gameType, e.isTrace = r.traceData.length > 0 ? 1 : 0, e.traceWinStop = o.getCurrentGameTrace().getIsWinStop(), e.traceStopValue = o.getCurrentGameTrace().getTraceWinStopValue(), e.balls = [], e.ordersNumber = ""; a < n; a++) e.balls.push({
                id: t[a].id,
                ball: t[a].postParameter,
                type: t[a].type,
                moneyunit: t[a].moneyUnit,
                multiple: t[a].multiple,
                awardMode: t[a].awardMode,
                num: t[a].num
            });
            if (e.orders = [], e.isTrace < 1) e.orders.push({
                number: o.getCurrentGame().getCurrentNumber(),
                issueCode: o.getCurrentGame().getCurrentIssueCode(),
                multiple: 1
            }),
            e.amount = o.getCurrentGameStatistics().formatMoney(o.getCurrentGameOrder().getTotal().amount),
            e.ordersNumber = "第 " + o.getCurrentGame().getCurrentNumber() + " 期",
            e.onlyAmount = "";
            else {
                for (; i < l; i++) e.orders.push({
                    number: r.traceData[i].traceNumber,
                    issueCode: Number(r.traceData[i].issueCode),
                    multiple: r.traceData[i].multiple
                });
                e.ordersNumber = "第 " + e.orders[0].number + "  至  " + e.orders[l - 1].number + "   共  <strong class='color-red'>" + l + "</strong></span>  期",
                e.amount = o.getCurrentGameStatistics().formatMoney(r.amount, 2),
                e.onlyAmount = r.orderData.amount
            }
            return e
        },
        doPostLock: function() {
            var e = this;
            e.postLock = !0
        },
        cancelPostLock: function() {
            var e = this;
            e.postLock = null
        },
        clearData: function() {
            var e = o.getCurrentGameOrder();
            e.reSet(),
            e.cancelSelectOrder(),
            o.getCurrentGame().getCurrentGameMethod().reSet()
        },
        afterSubmitSuccess: function() {
            var e = "",
            t = "",
            a = this;
            try {
                $.ajax({
                    dataType: "json",
                    cache: !1,
                    url: o.getCurrentGame().getGameConfig().getInstance().getUserOrdersUrl(),
                    cache: !1,
                    success: function(t) {
                        $.isEmptyObject(t) || ("jsk3" == phoenix.Games.getCurrentGame().getGameConfig().getInstance().defConfig.gameType || "ahk3" == phoenix.Games.getCurrentGame().getGameConfig().getInstance().defConfig.gameType ? ($("#program-user-orders > tbody").html(""), $.each(t,
                        function(n) {
                            e += "<tr><td>" + t[n].orderCode + "</td>",
                            e += "<td>" + t[n].webIssueCode + "</td>",
                            e += "<td><span class='price'><dfn>&yen;</dfn>" + a.formatMoney(t[n].totamount / 1e4) + "</span></td>",
                            e += 2 == Number(t[n].status) ? "<td >中<span class='price color-red'><dfn>&yen;</dfn>" + a.formatMoney(t[n].totwin / 1e4) + "</span></td>": "<td >" + t[n].statusName + "</td>",
                            e += "<td>" + (2 == t[n].parentType ? "是": "否") + "</td>",
                            e += "<td>" + t[n].formatSaleTime + "</td>",
                            e += "<td><a target='_black' href='/gameUserCenter/queryOrderDetail?orderId=" + t[n].orderId + "' >查看</a></td></tr>"
                        })) : ($("#program-user-orders > tbody").html(""), $.each(t,
                        function(n) {
                            e += '<tr><td><a target="_black" href="/gameUserCenter/queryOrderDetail?orderId=' + t[n].orderId + '"> ' + t[n].webIssueCode + "</a></td>",
                            e += "<td><span class='price'><dfn>&yen;</dfn>" + a.formatMoney(t[n].totamount / 1e4) + "</span></td>",
                            e += 2 == Number(t[n].status) ? "<td >中<span class='price color-red'><dfn>&yen;</dfn>" + a.formatMoney(t[n].totwin / 1e4) + "</td></span></tr>": "<td >" + t[n].statusName + "</td></tr>"
                        })), $("#program-user-orders > tbody").append(e))
                    }
                }),
                $.ajax({
                    dataType: "json",
                    cache: !1,
                    url: o.getCurrentGame().getGameConfig().getInstance().getUserPlansUrl(),
                    cache: !1,
                    success: function(e) {
                        $.isEmptyObject(e) || ($("#program-user-plans > tbody").html(""), $.each(e,
                        function(n) {
                            switch (t += '<tr><td><a target="_black" href="/gameUserCenter/queryPlanDetail?planid=' + e[n].planid + '"> ' + e[n].startWebIssueCode + "</a></td>", t += "<td>" + Number(e[n].finishIssue) + "/" + Number(e[n].totalIssue) + "</td>", t += "<td><span class='price'><dfn>&yen;</dfn>" + a.formatMoney(e[n].totamount / 1e4) + " </span></td>", e[n].status) {
                            case 0:
                                t += "<td >未开始</td></tr>";
                                break;
                            case 1:
                                t += "<td >进行中</td></tr>";
                                break;
                            case 2:
                                t += "<td >已结束</td></tr>";
                                break;
                            case 3:
                                t += "<td >已终止</td></tr>";
                                break;
                            case 4:
                                t += "<td >暂停</td></tr>";
                                break;
                            default:
                                t += "<td ></td></tr>"
                            }
                        }), $("#program-user-plans > tbody").append(t))
                    }
                })
            } catch(e) {
                alert("网络异常，读取信息失败")
            }
        },
        balanceInquiry: function(e) {
            $.ajax({
                dataType: "json",
                cache: !1,
                url: o.getCurrentGame().getGameConfig().getInstance().getUserBalUrl(),
                data: "",
                success: function(t) {
                    var a = "" == t ? 0 : t,
                    n = phoenix.util.formatMoney(a / 1e4);
                    $("#" + e).html(n)
                }
            })
        },
        submitData: function() {
            var e = this,
            t = e.getSubmitData(),
            a = o.getCurrentGameMessage();
            if (t.balls.length <= 0) return a.show({
                type: "mustChoose",
                msg: "请至少选择一注投注号码！",
                data: {
                    tplData: {
                        msg: "请至少选择一注投注号码！"
                    }
                }
            }),
            void e.cancelPostLock();
            var r = !0;
            a.show({
                type: "checkLotters",
                msg: "请核对您的投注信息！",
                confirmIsShow: !0,
                confirmFun: function() {
                    e.postLock || (e.doPostLock(), e.fireEvent("beforeSubmit"), t.ordersNumber = n, t.onlyAmount = n, t.amount = phoenix.util.formatFloat(t.amount), $.ajax({
                        url: o.getCurrentGame().getGameConfig().getInstance().submitUrl(),
                        data: JSON.stringify(o.getCurrentGame().editSubmitData(t)),
                        dataType: "json",
                        method: "POST",
                        cache: !1,
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function() {
                            return !! r && ($(".confirm").html("提交中..."), $(".cancel").css("display", "none").attr("disabled", "true"), r = !1, void 0)
                        },
                        success: function(n) {
                            if (1 == Number(n.isSuccess)) {
                                var r = Number(t.isTrace) > 0 ? 1 : 0;
                                r > 0 ? (n.data.tplData.url = "/gameUserCenter/queryPlans?time=7", n.data.tplData.gameType = "追号记录") : (n.data.tplData.url = "/gameUserCenter/queryOrdersEnter?time=7", n.data.tplData.gameType = "投注记录"),
                                n.needPrint = !0,
                                a.show(n),
                                a.win.dom.find(".btn-link").remove(),
                                a.win.dom.append($('<a  target="view_window" href="/gameBet/downLoadOrder?orderCode=' + n.data.projectId + '" class="btn btn-link">打印订单</a>')),
                                e.clearData(),
                                e.balanceInquiry("spanBall"),
                                e.afterSubmitSuccess(),
                                setTimeout(function() {
                                    o.getCurrentGameTrace().hide(),
                                    $("html,body").animate({
                                        scrollTop: $("#J-top-game-menu").offset().top
                                    },
                                    1e3)
                                },
                                1500)
                            } else a.show(n)
                        },
                        complete: function() {
                            e.fireEvent("afterSubmit"),
                            r = !0,
                            $(".cancel").css("display", "display").removeAttr("disabled")
                        },
                        error: function(e) {
                            "404" == e.status || "0" == e.status || "401" == e.status ? a.show({
                                mask: !0,
                                title: "温馨提示",
                                content: "<div class='pop-title'><i class='ico-error'></i><h4 class='pop-text'>登录超时 请重新登入！</h4></div>",
                                cancelIsShow: !0,
                                cancelFun: function() {
                                    window.location.reload()
                                }
                            }) : a.show({
                                mask: !0,
                                title: "温馨提示",
                                content: "<div class='pop-title'><i class='ico-error'></i><h4 class='pop-text'>方案提交失败,<br />请检查网络并重新提交！</h4></div>",
                                cancelIsShow: !0,
                                cancelFun: function() {
                                    a.hide()
                                }
                            })
                        }
                    }))
                },
                cancelIsShow: !0,
                cancelFun: function() {
                    e.cancelPostLock(),
                    this.hide()
                },
                normalCloseFun: function() {
                    e.cancelPostLock()
                },
                callback: function() {
                    var e = Number(o.getCurrentGame().getGameConfig().getInstance().defConfig.backOutStartFee) / 1e4,
                    n = Number(o.getCurrentGame().getGameConfig().getInstance().defConfig.backOutRadio) / 1e4,
                    r = o.getCurrentGameStatistics().ToForamtmoney(t.amount);
                    r > e && ($("#showLotteryChareg").show(), a.getContentDom().find(".handlingCharge").html(o.getCurrentGameStatistics().formatMoney(r * n, 3)))
                },
                data: {
                    tplData: {
                        lotteryDate: t.ordersNumber,
                        lotteryName: o.getCurrentGame().getGameConfig().getInstance().getGameTypeCn(),
                        lotteryInfo: function() {
                            for (var e = "",
                            a = t.balls,
                            n = 0; n < a.length; n++) {
                                var r = a[n];
                                e += '<div style="line-height:25px;">' + o.getCurrentGame().getGameConfig().getInstance().getTitleByName(r.type).join("") + " " + r.ball + "</div>"
                            }
                            return e
                        },
                        lotteryamount: t.amount,
                        lotteryAcc: o.getCurrentGame().getDynamicConfig().username,
                        lotteryOnlyAmount: t.onlyAmount,
                        lotteryTraceInfo: function() {
                            var e = "";
                            return t.isTrace > 0 && (e = t.orders),
                            e
                        }
                    }
                }
            })
        }
    },
    s = e.Class(l, a);
    s.defConfig = i,
    s.getInstance = function(e) {
        return r || (r = new s(e))
    },
    e[t] = s
} (phoenix, "GameSubmit", phoenix.Event);