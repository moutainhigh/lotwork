!function () {
    function e(e, t, n) {
        t !== !1 ? z.addEventListener(e, Z[e], n) : z.removeEventListener(e, Z[e])
    }

    function t(e) {
        var t = y(e.target), i = w(t);
        if (ionic.tap.requiresNativeClick(i) || j)return !1;
        var r = ionic.tap.pointerCoord(e);
        n("click", i, r.x, r.y), p(i)
    }

    function n(e, t, n, i) {
        var r = document.createEvent("MouseEvents");
        r.initMouseEvent(e, !0, !0, window, 1, 0, 0, n, i, !1, !1, !1, !1, 0, null), r.isIonicTap = !0, t.dispatchEvent(r)
    }

    function i(e) {
        return "submit" == e.target.type && 0 === e.detail ? null : ionic.scroll.isScrolling && ionic.tap.containsOrIsTextInput(e.target) || !e.isIonicTap && !ionic.tap.requiresNativeClick(e.target) ? (e.stopPropagation(), ionic.tap.isLabelWithTextInput(e.target) || e.preventDefault(), !1) : void 0
    }

    function r(t) {
        return t.isIonicTap || d(t) ? null : q ? (t.stopPropagation(), ionic.tap.isTextInput(t.target) && Y === t.target || /^(select|option)$/i.test(t.target.tagName) || t.preventDefault(), !1) : (j = !1, G = ionic.tap.pointerCoord(t), e("mousemove"), void ionic.activator.start(t))
    }

    function o(n) {
        return q ? (n.stopPropagation(), n.preventDefault(), !1) : !d(n) && !/^(select|option)$/i.test(n.target.tagName) && ($(n) || t(n), e("mousemove", !1), ionic.activator.end(), void(j = !1))
    }

    function a(t) {
        if ($(t))return e("mousemove", !1), ionic.activator.end(), j = !0, !1
    }

    function s(t) {
        if (!d(t) && (j = !1, f(), G = ionic.tap.pointerCoord(t), e(X), ionic.activator.start(t), ionic.Platform.isIOS() && ionic.tap.isLabelWithTextInput(t.target))) {
            var n = w(y(t.target));
            n !== F && t.preventDefault()
        }
    }

    function c(e) {
        d(e) || (f(), $(e) || (t(e), /^(select|option)$/i.test(e.target.tagName) && e.preventDefault()), Y = e.target, u())
    }

    function l(t) {
        if ($(t))return j = !0, e(X, !1), ionic.activator.end(), !1
    }

    function u() {
        e(X, !1), ionic.activator.end(), j = !1
    }

    function f() {
        q = !0, clearTimeout(U), U = setTimeout(function () {
            q = !1
        }, 600)
    }

    function d(e) {
        return !!e.isTapHandled || (e.isTapHandled = !0, ionic.scroll.isScrolling && ionic.tap.containsOrIsTextInput(e.target) ? (e.preventDefault(), !0) : void 0)
    }

    function p(e) {
        W = null;
        var t = !1;
        "SELECT" == e.tagName ? (n("mousedown", e, 0, 0), e.focus && e.focus(), t = !0) : g() === e ? t = !0 : /^(input|textarea)$/i.test(e.tagName) || e.isContentEditable ? (t = !0, e.focus && e.focus(), e.value = e.value, q && (W = e)) : h(), t && (g(e), ionic.trigger("ionic.focusin", {target: e}, !0))
    }

    function h() {
        var e = g();
        e && (/^(input|textarea|select)$/i.test(e.tagName) || e.isContentEditable) && e.blur(), g(null)
    }

    function m(e) {
        q && ionic.tap.isTextInput(g()) && ionic.tap.isTextInput(W) && W !== e.target && (W.focus(), W = null), ionic.scroll.isScrolling = !1
    }

    function v() {
        g(null)
    }

    function g(e) {
        return arguments.length && (F = e), F || document.activeElement
    }

    function $(e) {
        if (!e || 1 !== e.target.nodeType || !G || 0 === G.x && 0 === G.y)return !1;
        var t = ionic.tap.pointerCoord(e), n = !(!e.target.classList || !e.target.classList.contains || "function" != typeof e.target.classList.contains), i = n && e.target.classList.contains("button") ? Q : K;
        return Math.abs(G.x - t.x) > i || Math.abs(G.y - t.y) > i
    }

    function y(e, t) {
        for (var n = e, i = 0; i < 6 && n; i++) {
            if ("LABEL" === n.tagName)return n;
            n = n.parentElement
        }
        if (t !== !1)return e
    }

    function w(e) {
        if (e && "LABEL" === e.tagName) {
            if (e.control)return e.control;
            if (e.querySelector) {
                var t = e.querySelector("input,textarea,select");
                if (t)return t
            }
        }
        return e
    }

    function b() {
        ionic.keyboard.isInitialized || (V() ? (window.addEventListener("native.keyboardshow", ue), window.addEventListener("native.keyboardhide", x)) : document.body.addEventListener("focusout", x), document.body.addEventListener("ionic.focusin", le), document.body.addEventListener("focusin", le), window.navigator.msPointerEnabled ? document.removeEventListener("MSPointerDown", b) : document.removeEventListener("touchstart", b), ionic.keyboard.isInitialized = !0)
    }

    function _(e) {
        clearTimeout(ne), ionic.keyboard.isOpen && !ionic.keyboard.isClosing || (ionic.keyboard.isOpening = !0, ionic.keyboard.isClosing = !1), ionic.keyboard.height = e.keyboardHeight, ae ? k(O, !0) : k(M, !0)
    }

    function S(e) {
        return clearTimeout(ne), e.target && !e.target.readOnly && ionic.tap.isKeyboardElement(e.target) && (ee = ionic.DomUtil.getParentWithClass(e.target, ce)) ? (J = e.target, ee.classList.contains("overflow-scroll") || (document.body.scrollTop = 0, ee.scrollTop = 0, ionic.requestAnimationFrame(function () {
            document.body.scrollTop = 0, ee.scrollTop = 0
        }), window.navigator.msPointerEnabled ? document.addEventListener("MSPointerMove", C, !1) : document.addEventListener("touchmove", C, !1)), ionic.keyboard.isOpen && !ionic.keyboard.isClosing || (ionic.keyboard.isOpening = !0, ionic.keyboard.isClosing = !1), document.addEventListener("keydown", E, !1), void(ionic.keyboard.isOpen || V() ? ionic.keyboard.isOpen && M() : k(M, !0))) : void(J = null)
    }

    function x() {
        clearTimeout(ne), (ionic.keyboard.isOpen || ionic.keyboard.isOpening) && (ionic.keyboard.isClosing = !0, ionic.keyboard.isOpening = !1), ne = setTimeout(function () {
            ionic.requestAnimationFrame(function () {
                ae ? k(function () {
                    O(), A()
                }, !1) : k(A, !1)
            })
        }, 50)
    }

    function T() {
        ionic.keyboard.isLandscape = !ionic.keyboard.isLandscape, ionic.Platform.isIOS() && O(), ionic.Platform.isAndroid() && (ionic.keyboard.isOpen && V() ? ae = !0 : k(O, !1))
    }

    function E(e) {
        ionic.scroll.isScrolling && C(e)
    }

    function C(e) {
        "TEXTAREA" !== e.target.tagName && e.preventDefault()
    }

    function k(e, t) {
        clearInterval(te);
        var n, i = 0, r = B(), o = r;
        return n = ionic.Platform.isAndroid() && ionic.Platform.version() < 4.4 ? 30 : ionic.Platform.isAndroid() ? 10 : 1, te = setInterval(function () {
            o = B(), ++i < n && (!I(o) && !P(o) || !ionic.keyboard.height) || (V() || (ionic.keyboard.height = Math.abs(r - window.innerHeight)), ionic.keyboard.isOpen = t, clearInterval(te), e())
        }, 50), n
    }

    function A() {
        clearTimeout(ne), ionic.keyboard.isOpen = !1, ionic.keyboard.isClosing = !1, J && ionic.trigger("resetScrollView", {target: J}, !0), ionic.requestAnimationFrame(function () {
            document.body.classList.remove(se)
        }), window.navigator.msPointerEnabled ? document.removeEventListener("MSPointerMove", C) : document.removeEventListener("touchmove", C), document.removeEventListener("keydown", E), ionic.Platform.isAndroid() && (V() && cordova.plugins.Keyboard.close(), J && J.blur()), J = null
    }

    function M() {
        ionic.keyboard.isOpen = !0, ionic.keyboard.isOpening = !1;
        var e = {keyboardHeight: D(), viewportHeight: ie};
        if (J) {
            e.target = J;
            var t = J.getBoundingClientRect();
            e.elementTop = Math.round(t.top), e.elementBottom = Math.round(t.bottom), e.windowHeight = e.viewportHeight - e.keyboardHeight, e.isElementUnderKeyboard = e.elementBottom > e.windowHeight, ionic.trigger("scrollChildIntoView", e, !0)
        }
        return setTimeout(function () {
            document.body.classList.add(se)
        }, 400), e
    }

    function D() {
        if (ionic.keyboard.height)return ionic.keyboard.height;
        if (ionic.Platform.isAndroid()) {
            if (ionic.Platform.isFullScreen)return 275;
            var e = window.innerHeight;
            return e < ie ? ie - e : 0
        }
        return ionic.Platform.isIOS() ? ionic.keyboard.isLandscape ? 206 : ionic.Platform.isWebView() ? 260 : 216 : 275
    }

    function I(e) {
        return !!(!ionic.keyboard.isLandscape && re && Math.abs(re - e) < 2)
    }

    function P(e) {
        return !!(ionic.keyboard.isLandscape && oe && Math.abs(oe - e) < 2)
    }

    function O() {
        ae = !1, ie = B(), ionic.keyboard.isLandscape && !oe ? oe = ie : ionic.keyboard.isLandscape || re || (re = ie), J && ionic.trigger("resetScrollView", {target: J}, !0), ionic.keyboard.isOpen && ionic.tap.isTextInput(J) && M()
    }

    function N() {
        var e = B();
        e / window.innerWidth < 1 && (ionic.keyboard.isLandscape = !0), ie = e, ionic.keyboard.isLandscape && !oe ? oe = ie : ionic.keyboard.isLandscape || re || (re = ie)
    }

    function B() {
        var e = window.innerHeight;
        return ionic.Platform.isAndroid() && ionic.Platform.isFullScreen || !ionic.keyboard.isOpen && !ionic.keyboard.isOpening || ionic.keyboard.isClosing ? e : e + D()
    }

    function V() {
        return !!(window.cordova && cordova.plugins && cordova.plugins.Keyboard)
    }

    function L() {
        var e;
        for (e = 0; e < document.head.children.length; e++)if ("viewport" == document.head.children[e].name) {
            fe = document.head.children[e];
            break
        }
        if (fe) {
            var t, n = fe.content.toLowerCase().replace(/\s+/g, "").split(",");
            for (e = 0; e < n.length; e++)n[e] && (t = n[e].split("="), de[t[0]] = t.length > 1 ? t[1] : "_");
            R()
        }
    }

    function R() {
        var e = de.width, t = de.height, n = ionic.Platform, i = n.version(), r = "device-width", o = "device-height", a = ionic.viewport.orientation();
        delete de.height, de.width = r, n.isIPad() ? i > 7 ? delete de.width : n.isWebView() ? 90 == a ? de.height = "0" : 7 == i && (de.height = o) : i < 7 && (de.height = "0") : n.isIOS() && (n.isWebView() ? i > 7 ? delete de.width : i < 7 ? t && (de.height = "0") : 7 == i && (de.height = o) : i < 7 && t && (de.height = "0")), e === de.width && t === de.height || H()
    }

    function H() {
        var e, t = [];
        for (e in de)de[e] && t.push(e + ("_" == de[e] ? "" : "=" + de[e]));
        fe.content = t.join(", ")
    }

    window.ionic = window.ionic || {}, window.ionic.views = {}, window.ionic.version = "1.1.1", function (e) {
        e.DelegateService = function (e) {
            function t() {
                return !0
            }

            if (e.indexOf("$getByHandle") > -1)throw new Error("Method '$getByHandle' is implicitly added to each delegate service. Do not list it as a method.");
            return ["$log", function (n) {
                function i(e, t) {
                    this._instances = e, this.handle = t
                }

                function r() {
                    this._instances = []
                }

                function o(e) {
                    return function () {
                        var t, i = this.handle, r = arguments, o = 0;
                        return this._instances.forEach(function (n) {
                            if ((!i || i == n.$$delegateHandle) && n.$$filterFn(n)) {
                                o++;
                                var a = n[e].apply(n, r);
                                1 === o && (t = a)
                            }
                        }), !o && i ? n.warn('Delegate for handle "' + i + '" could not find a corresponding element with delegate-handle="' + i + '"! ' + e + "() was not called!\nPossible cause: If you are calling " + e + '() immediately, and your element with delegate-handle="' + i + '" is a child of your controller, then your element may not be compiled yet. Put a $timeout around your call to ' + e + "() and try again.") : t
                    }
                }

                return e.forEach(function (e) {
                    i.prototype[e] = o(e)
                }), r.prototype = i.prototype, r.prototype._registerInstance = function (e, n, i) {
                    var r = this._instances;
                    return e.$$delegateHandle = n, e.$$filterFn = i || t, r.push(e), function () {
                        var t = r.indexOf(e);
                        t !== -1 && r.splice(t, 1)
                    }
                }, r.prototype.$getByHandle = function (e) {
                    return new i(this._instances, e)
                }, new r
            }]
        }
    }(window.ionic), function (e, t, n) {
        function i() {
            o = !0;
            for (var e = 0; e < r.length; e++)n.requestAnimationFrame(r[e]);
            r = [], t.removeEventListener("DOMContentLoaded", i)
        }

        var r = [], o = "complete" === t.readyState || "interactive" === t.readyState;
        o || t.addEventListener("DOMContentLoaded", i), e._rAF = function () {
            return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || function (t) {
                    e.setTimeout(t, 16)
                }
        }();
        var a = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.webkitCancelRequestAnimationFrame;
        n.DomUtil = {
            requestAnimationFrame: function (t) {
                return e._rAF(t)
            }, cancelAnimationFrame: function (e) {
                a(e)
            }, animationFrameThrottle: function (e) {
                var t, i, r;
                return function () {
                    t = arguments, r = this, i || (i = !0, n.requestAnimationFrame(function () {
                        e.apply(r, t), i = !1
                    }))
                }
            }, contains: function (e, t) {
                for (var n = t; n;) {
                    if (n === e)return !0;
                    n = n.parentNode
                }
            }, getPositionInParent: function (e) {
                return {left: e.offsetLeft, top: e.offsetTop}
            }, ready: function (e) {
                o ? n.requestAnimationFrame(e) : r.push(e)
            }, getTextBounds: function (n) {
                if (t.createRange) {
                    var i = t.createRange();
                    if (i.selectNodeContents(n), i.getBoundingClientRect) {
                        var r = i.getBoundingClientRect();
                        if (r) {
                            var o = e.scrollX, a = e.scrollY;
                            return {
                                top: r.top + a,
                                left: r.left + o,
                                right: r.left + o + r.width,
                                bottom: r.top + a + r.height,
                                width: r.width,
                                height: r.height
                            }
                        }
                    }
                }
                return null
            }, getChildIndex: function (e, t) {
                if (t)for (var n, i = e.parentNode.children, r = 0, o = 0, a = i.length; r < a; r++)if (n = i[r], n.nodeName && n.nodeName.toLowerCase() == t) {
                    if (n == e)return o;
                    o++
                }
                return Array.prototype.slice.call(e.parentNode.children).indexOf(e)
            }, swapNodes: function (e, t) {
                t.parentNode.insertBefore(e, t)
            }, elementIsDescendant: function (e, t, n) {
                var i = e;
                do {
                    if (i === t)return !0;
                    i = i.parentNode
                } while (i && i !== n);
                return !1
            }, getParentWithClass: function (e, t, n) {
                for (n = n || 10; e.parentNode && n--;) {
                    if (e.parentNode.classList && e.parentNode.classList.contains(t))return e.parentNode;
                    e = e.parentNode
                }
                return null
            }, getParentOrSelfWithClass: function (e, t, n) {
                for (n = n || 10; e && n--;) {
                    if (e.classList && e.classList.contains(t))return e;
                    e = e.parentNode
                }
                return null
            }, rectContains: function (e, t, n, i, r, o) {
                return !(e < n || e > r) && !(t < i || t > o)
            }, blurAll: function () {
                return t.activeElement && t.activeElement != t.body ? (t.activeElement.blur(), t.activeElement) : null
            }, cachedAttr: function (e, t, n) {
                if (e = e && e.length && e[0] || e, e && e.setAttribute) {
                    var i = "$attr-" + t;
                    return arguments.length > 2 ? e[i] !== n && (e.setAttribute(t, n), e[i] = n) : "undefined" == typeof e[i] && (e[i] = e.getAttribute(t)), e[i]
                }
            }, cachedStyles: function (e, t) {
                if (e = e && e.length && e[0] || e, e && e.style)for (var n in t)e["$style-" + n] !== t[n] && (e.style[n] = e["$style-" + n] = t[n])
            }
        }, n.requestAnimationFrame = n.DomUtil.requestAnimationFrame, n.cancelAnimationFrame = n.DomUtil.cancelAnimationFrame, n.animationFrameThrottle = n.DomUtil.animationFrameThrottle
    }(window, document, ionic), function (e) {
        e.CustomEvent = function () {
            if ("function" == typeof window.CustomEvent)return CustomEvent;
            var e = function (e, t) {
                var n;
                t = t || {bubbles: !1, cancelable: !1, detail: void 0};
                try {
                    n = document.createEvent("CustomEvent"), n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail)
                } catch (i) {
                    n = document.createEvent("Event");
                    for (var r in t)n[r] = t[r];
                    n.initEvent(e, t.bubbles, t.cancelable)
                }
                return n
            };
            return e.prototype = window.Event.prototype, e
        }(), e.EventController = {
            VIRTUALIZED_EVENTS: ["tap", "swipe", "swiperight", "swipeleft", "drag", "hold", "release"],
            trigger: function (t, n, i, r) {
                var o = new e.CustomEvent(t, {detail: n, bubbles: !!i, cancelable: !!r});
                n && n.target && n.target.dispatchEvent && n.target.dispatchEvent(o) || window.dispatchEvent(o)
            },
            on: function (t, n, i) {
                for (var r = i || window, o = 0, a = this.VIRTUALIZED_EVENTS.length; o < a; o++)if (t == this.VIRTUALIZED_EVENTS[o]) {
                    var s = new e.Gesture(i);
                    return s.on(t, n), s
                }
                r.addEventListener(t, n)
            },
            off: function (e, t, n) {
                n.removeEventListener(e, t)
            },
            onGesture: function (t, n, i, r) {
                var o = new e.Gesture(i, r);
                return o.on(t, n), o
            },
            offGesture: function (e, t, n) {
                e && e.off(t, n)
            },
            handlePopState: function () {
            }
        }, e.on = function () {
            e.EventController.on.apply(e.EventController, arguments)
        }, e.off = function () {
            e.EventController.off.apply(e.EventController, arguments)
        }, e.trigger = e.EventController.trigger, e.onGesture = function () {
            return e.EventController.onGesture.apply(e.EventController.onGesture, arguments)
        }, e.offGesture = function () {
            return e.EventController.offGesture.apply(e.EventController.offGesture, arguments)
        }
    }(window.ionic), function (e) {
        function t() {
            if (!e.Gestures.READY) {
                e.Gestures.event.determineEventTypes();
                for (var t in e.Gestures.gestures)e.Gestures.gestures.hasOwnProperty(t) && e.Gestures.detection.register(e.Gestures.gestures[t]);
                e.Gestures.event.onTouch(e.Gestures.DOCUMENT, e.Gestures.EVENT_MOVE, e.Gestures.detection.detect), e.Gestures.event.onTouch(e.Gestures.DOCUMENT, e.Gestures.EVENT_END, e.Gestures.detection.detect), e.Gestures.READY = !0
            }
        }

        e.Gesture = function (t, n) {
            return new e.Gestures.Instance(t, n || {})
        }, e.Gestures = {}, e.Gestures.defaults = {stop_browser_behavior: "disable-user-behavior"}, e.Gestures.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled, e.Gestures.HAS_TOUCHEVENTS = "ontouchstart" in window, e.Gestures.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i, e.Gestures.NO_MOUSEEVENTS = e.Gestures.HAS_TOUCHEVENTS && window.navigator.userAgent.match(e.Gestures.MOBILE_REGEX), e.Gestures.EVENT_TYPES = {}, e.Gestures.DIRECTION_DOWN = "down", e.Gestures.DIRECTION_LEFT = "left", e.Gestures.DIRECTION_UP = "up", e.Gestures.DIRECTION_RIGHT = "right", e.Gestures.POINTER_MOUSE = "mouse", e.Gestures.POINTER_TOUCH = "touch", e.Gestures.POINTER_PEN = "pen", e.Gestures.EVENT_START = "start", e.Gestures.EVENT_MOVE = "move", e.Gestures.EVENT_END = "end", e.Gestures.DOCUMENT = window.document, e.Gestures.plugins = {}, e.Gestures.READY = !1, e.Gestures.Instance = function (n, i) {
            var r = this;
            return null === n ? this : (t(), this.element = n, this.enabled = !0, this.options = e.Gestures.utils.extend(e.Gestures.utils.extend({}, e.Gestures.defaults), i || {}), this.options.stop_browser_behavior && e.Gestures.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), e.Gestures.event.onTouch(n, e.Gestures.EVENT_START, function (t) {
                r.enabled && e.Gestures.detection.startDetect(r, t)
            }), this)
        }, e.Gestures.Instance.prototype = {
            on: function (e, t) {
                for (var n = e.split(" "), i = 0; i < n.length; i++)this.element.addEventListener(n[i], t, !1);
                return this
            }, off: function (e, t) {
                for (var n = e.split(" "), i = 0; i < n.length; i++)this.element.removeEventListener(n[i], t, !1);
                return this
            }, trigger: function (t, n) {
                var i = e.Gestures.DOCUMENT.createEvent("Event");
                i.initEvent(t, !0, !0), i.gesture = n;
                var r = this.element;
                return e.Gestures.utils.hasParent(n.target, r) && (r = n.target), r.dispatchEvent(i), this
            }, enable: function (e) {
                return this.enabled = e, this
            }
        };
        var n = null, i = !1, r = !1;
        e.Gestures.event = {
            bindDom: function (e, t, n) {
                for (var i = t.split(" "), r = 0; r < i.length; r++)e.addEventListener(i[r], n, !1)
            }, onTouch: function (t, o, a) {
                var s = this;
                this.bindDom(t, e.Gestures.EVENT_TYPES[o], function (c) {
                    var l = c.type.toLowerCase();
                    if (!l.match(/mouse/) || !r) {
                        l.match(/touch/) || l.match(/pointerdown/) || l.match(/mouse/) && 1 === c.which ? i = !0 : l.match(/mouse/) && 1 !== c.which && (i = !1), l.match(/touch|pointer/) && (r = !0);
                        var u = 0;
                        i && (e.Gestures.HAS_POINTEREVENTS && o != e.Gestures.EVENT_END ? u = e.Gestures.PointerEvent.updatePointer(o, c) : l.match(/touch/) ? u = c.touches.length : r || (u = l.match(/up/) ? 0 : 1), u > 0 && o == e.Gestures.EVENT_END ? o = e.Gestures.EVENT_MOVE : u || (o = e.Gestures.EVENT_END), (u || null === n) && (n = c), a.call(e.Gestures.detection, s.collectEventData(t, o, s.getTouchList(n, o), c)), e.Gestures.HAS_POINTEREVENTS && o == e.Gestures.EVENT_END && (u = e.Gestures.PointerEvent.updatePointer(o, c))), u || (n = null, i = !1, r = !1, e.Gestures.PointerEvent.reset())
                    }
                })
            }, determineEventTypes: function () {
                var t;
                t = e.Gestures.HAS_POINTEREVENTS ? e.Gestures.PointerEvent.getEvents() : e.Gestures.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], e.Gestures.EVENT_TYPES[e.Gestures.EVENT_START] = t[0], e.Gestures.EVENT_TYPES[e.Gestures.EVENT_MOVE] = t[1], e.Gestures.EVENT_TYPES[e.Gestures.EVENT_END] = t[2]
            }, getTouchList: function (t) {
                return e.Gestures.HAS_POINTEREVENTS ? e.Gestures.PointerEvent.getTouchList() : t.touches ? t.touches : (t.identifier = 1, [t])
            }, collectEventData: function (t, n, i, r) {
                var o = e.Gestures.POINTER_TOUCH;
                return (r.type.match(/mouse/) || e.Gestures.PointerEvent.matchType(e.Gestures.POINTER_MOUSE, r)) && (o = e.Gestures.POINTER_MOUSE), {
                    center: e.Gestures.utils.getCenter(i),
                    timeStamp: (new Date).getTime(),
                    target: r.target,
                    touches: i,
                    eventType: n,
                    pointerType: o,
                    srcEvent: r,
                    preventDefault: function () {
                        this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault
                    },
                    stopPropagation: function () {
                        this.srcEvent.stopPropagation()
                    },
                    stopDetect: function () {
                        return e.Gestures.detection.stopDetect()
                    }
                }
            }
        }, e.Gestures.PointerEvent = {
            pointers: {}, getTouchList: function () {
                var e = this, t = [];
                return Object.keys(e.pointers).sort().forEach(function (n) {
                    t.push(e.pointers[n])
                }), t
            }, updatePointer: function (t, n) {
                return t == e.Gestures.EVENT_END ? this.pointers = {} : (n.identifier = n.pointerId, this.pointers[n.pointerId] = n), Object.keys(this.pointers).length
            }, matchType: function (t, n) {
                if (!n.pointerType)return !1;
                var i = {};
                return i[e.Gestures.POINTER_MOUSE] = n.pointerType == n.MSPOINTER_TYPE_MOUSE || n.pointerType == e.Gestures.POINTER_MOUSE, i[e.Gestures.POINTER_TOUCH] = n.pointerType == n.MSPOINTER_TYPE_TOUCH || n.pointerType == e.Gestures.POINTER_TOUCH, i[e.Gestures.POINTER_PEN] = n.pointerType == n.MSPOINTER_TYPE_PEN || n.pointerType == e.Gestures.POINTER_PEN, i[t]
            }, getEvents: function () {
                return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
            }, reset: function () {
                this.pointers = {}
            }
        }, e.Gestures.utils = {
            extend: function (e, t, n) {
                for (var i in t)void 0 !== e[i] && n || (e[i] = t[i]);
                return e
            }, hasParent: function (e, t) {
                for (; e;) {
                    if (e == t)return !0;
                    e = e.parentNode
                }
                return !1
            }, getCenter: function (e) {
                for (var t = [], n = [], i = 0, r = e.length; i < r; i++)t.push(e[i].pageX), n.push(e[i].pageY);
                return {
                    pageX: (Math.min.apply(Math, t) + Math.max.apply(Math, t)) / 2,
                    pageY: (Math.min.apply(Math, n) + Math.max.apply(Math, n)) / 2
                }
            }, getVelocity: function (e, t, n) {
                return {x: Math.abs(t / e) || 0, y: Math.abs(n / e) || 0}
            }, getAngle: function (e, t) {
                var n = t.pageY - e.pageY, i = t.pageX - e.pageX;
                return 180 * Math.atan2(n, i) / Math.PI
            }, getDirection: function (t, n) {
                var i = Math.abs(t.pageX - n.pageX), r = Math.abs(t.pageY - n.pageY);
                return i >= r ? t.pageX - n.pageX > 0 ? e.Gestures.DIRECTION_LEFT : e.Gestures.DIRECTION_RIGHT : t.pageY - n.pageY > 0 ? e.Gestures.DIRECTION_UP : e.Gestures.DIRECTION_DOWN
            }, getDistance: function (e, t) {
                var n = t.pageX - e.pageX, i = t.pageY - e.pageY;
                return Math.sqrt(n * n + i * i)
            }, getScale: function (e, t) {
                return e.length >= 2 && t.length >= 2 ? this.getDistance(t[0], t[1]) / this.getDistance(e[0], e[1]) : 1
            }, getRotation: function (e, t) {
                return e.length >= 2 && t.length >= 2 ? this.getAngle(t[1], t[0]) - this.getAngle(e[1], e[0]) : 0
            }, isVertical: function (t) {
                return t == e.Gestures.DIRECTION_UP || t == e.Gestures.DIRECTION_DOWN
            }, stopDefaultBrowserBehavior: function (e, t) {
                e && e.classList && (e.classList.add(t), e.onselectstart = function () {
                    return !1
                })
            }
        }, e.Gestures.detection = {
            gestures: [],
            current: null,
            previous: null,
            stopped: !1,
            startDetect: function (t, n) {
                this.current || (this.stopped = !1, this.current = {
                    inst: t,
                    startEvent: e.Gestures.utils.extend({}, n),
                    lastEvent: !1,
                    name: ""
                }, this.detect(n))
            },
            detect: function (t) {
                if (!this.current || this.stopped)return null;
                t = this.extendEventData(t);
                for (var n = this.current.inst.options, i = 0, r = this.gestures.length; i < r; i++) {
                    var o = this.gestures[i];
                    if (!this.stopped && n[o.name] !== !1 && o.handler.call(o, t, this.current.inst) === !1) {
                        this.stopDetect();
                        break
                    }
                }
                return this.current && (this.current.lastEvent = t), t.eventType == e.Gestures.EVENT_END && !t.touches.length - 1 && this.stopDetect(), t
            },
            stopDetect: function () {
                this.previous = e.Gestures.utils.extend({}, this.current), this.current = null, this.stopped = !0
            },
            extendEventData: function (t) {
                var n = this.current.startEvent;
                if (n && (t.touches.length != n.touches.length || t.touches === n.touches)) {
                    n.touches = [];
                    for (var i = 0, r = t.touches.length; i < r; i++)n.touches.push(e.Gestures.utils.extend({}, t.touches[i]))
                }
                var o = t.timeStamp - n.timeStamp, a = t.center.pageX - n.center.pageX, s = t.center.pageY - n.center.pageY, c = e.Gestures.utils.getVelocity(o, a, s);
                return e.Gestures.utils.extend(t, {
                    deltaTime: o,
                    deltaX: a,
                    deltaY: s,
                    velocityX: c.x,
                    velocityY: c.y,
                    distance: e.Gestures.utils.getDistance(n.center, t.center),
                    angle: e.Gestures.utils.getAngle(n.center, t.center),
                    direction: e.Gestures.utils.getDirection(n.center, t.center),
                    scale: e.Gestures.utils.getScale(n.touches, t.touches),
                    rotation: e.Gestures.utils.getRotation(n.touches, t.touches),
                    startEvent: n
                }), t
            },
            register: function (t) {
                var n = t.defaults || {};
                return void 0 === n[t.name] && (n[t.name] = !0), e.Gestures.utils.extend(e.Gestures.defaults, n, !0), t.index = t.index || 1e3, this.gestures.push(t), this.gestures.sort(function (e, t) {
                    return e.index < t.index ? -1 : e.index > t.index ? 1 : 0
                }), this.gestures
            }
        }, e.Gestures.gestures = e.Gestures.gestures || {}, e.Gestures.gestures.Hold = {
            name: "hold",
            index: 10,
            defaults: {hold_timeout: 500, hold_threshold: 1},
            timer: null,
            handler: function (t, n) {
                switch (t.eventType) {
                    case e.Gestures.EVENT_START:
                        clearTimeout(this.timer), e.Gestures.detection.current.name = this.name, this.timer = setTimeout(function () {
                            "hold" == e.Gestures.detection.current.name && (e.tap.cancelClick(), n.trigger("hold", t))
                        }, n.options.hold_timeout);
                        break;
                    case e.Gestures.EVENT_MOVE:
                        t.distance > n.options.hold_threshold && clearTimeout(this.timer);
                        break;
                    case e.Gestures.EVENT_END:
                        clearTimeout(this.timer)
                }
            }
        }, e.Gestures.gestures.Tap = {
            name: "tap",
            index: 100,
            defaults: {
                tap_max_touchtime: 250,
                tap_max_distance: 10,
                tap_always: !0,
                doubletap_distance: 20,
                doubletap_interval: 300
            },
            handler: function (t, n) {
                if (t.eventType == e.Gestures.EVENT_END && "touchcancel" != t.srcEvent.type) {
                    var i = e.Gestures.detection.previous, r = !1;
                    if (t.deltaTime > n.options.tap_max_touchtime || t.distance > n.options.tap_max_distance)return;
                    i && "tap" == i.name && t.timeStamp - i.lastEvent.timeStamp < n.options.doubletap_interval && t.distance < n.options.doubletap_distance && (n.trigger("doubletap", t), r = !0), r && !n.options.tap_always || (e.Gestures.detection.current.name = "tap", n.trigger("tap", t))
                }
            }
        }, e.Gestures.gestures.Swipe = {
            name: "swipe",
            index: 40,
            defaults: {swipe_max_touches: 1, swipe_velocity: .4},
            handler: function (t, n) {
                if (t.eventType == e.Gestures.EVENT_END) {
                    if (n.options.swipe_max_touches > 0 && t.touches.length > n.options.swipe_max_touches)return;
                    (t.velocityX > n.options.swipe_velocity || t.velocityY > n.options.swipe_velocity) && (n.trigger(this.name, t), n.trigger(this.name + t.direction, t))
                }
            }
        }, e.Gestures.gestures.Drag = {
            name: "drag",
            index: 50,
            defaults: {
                drag_min_distance: 10,
                correct_for_drag_min_distance: !0,
                drag_max_touches: 1,
                drag_block_horizontal: !0,
                drag_block_vertical: !0,
                drag_lock_to_axis: !1,
                drag_lock_min_distance: 25,
                prevent_default_directions: []
            },
            triggered: !1,
            handler: function (t, n) {
                if ("touchstart" == t.srcEvent.type || "touchend" == t.srcEvent.type ? this.preventedFirstMove = !1 : this.preventedFirstMove || "touchmove" != t.srcEvent.type || (n.options.prevent_default_directions.length > 0 && n.options.prevent_default_directions.indexOf(t.direction) != -1 && t.srcEvent.preventDefault(), this.preventedFirstMove = !0), e.Gestures.detection.current.name != this.name && this.triggered)return n.trigger(this.name + "end", t), void(this.triggered = !1);
                if (!(n.options.drag_max_touches > 0 && t.touches.length > n.options.drag_max_touches))switch (t.eventType) {
                    case e.Gestures.EVENT_START:
                        this.triggered = !1;
                        break;
                    case e.Gestures.EVENT_MOVE:
                        if (t.distance < n.options.drag_min_distance && e.Gestures.detection.current.name != this.name)return;
                        if (e.Gestures.detection.current.name != this.name && (e.Gestures.detection.current.name = this.name, n.options.correct_for_drag_min_distance)) {
                            var i = Math.abs(n.options.drag_min_distance / t.distance);
                            e.Gestures.detection.current.startEvent.center.pageX += t.deltaX * i, e.Gestures.detection.current.startEvent.center.pageY += t.deltaY * i, t = e.Gestures.detection.extendEventData(t)
                        }
                        (e.Gestures.detection.current.lastEvent.drag_locked_to_axis || n.options.drag_lock_to_axis && n.options.drag_lock_min_distance <= t.distance) && (t.drag_locked_to_axis = !0);
                        var r = e.Gestures.detection.current.lastEvent.direction;
                        t.drag_locked_to_axis && r !== t.direction && (e.Gestures.utils.isVertical(r) ? t.direction = t.deltaY < 0 ? e.Gestures.DIRECTION_UP : e.Gestures.DIRECTION_DOWN : t.direction = t.deltaX < 0 ? e.Gestures.DIRECTION_LEFT : e.Gestures.DIRECTION_RIGHT), this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), n.trigger(this.name + t.direction, t), (n.options.drag_block_vertical && e.Gestures.utils.isVertical(t.direction) || n.options.drag_block_horizontal && !e.Gestures.utils.isVertical(t.direction)) && t.preventDefault();
                        break;
                    case e.Gestures.EVENT_END:
                        this.triggered && n.trigger(this.name + "end", t), this.triggered = !1
                }
            }
        }, e.Gestures.gestures.Transform = {
            name: "transform",
            index: 45,
            defaults: {transform_min_scale: .01, transform_min_rotation: 1, transform_always_block: !1},
            triggered: !1,
            handler: function (t, n) {
                if (e.Gestures.detection.current.name != this.name && this.triggered)return n.trigger(this.name + "end", t), void(this.triggered = !1);
                if (!(t.touches.length < 2))switch (n.options.transform_always_block && t.preventDefault(), t.eventType) {
                    case e.Gestures.EVENT_START:
                        this.triggered = !1;
                        break;
                    case e.Gestures.EVENT_MOVE:
                        var i = Math.abs(1 - t.scale), r = Math.abs(t.rotation);
                        if (i < n.options.transform_min_scale && r < n.options.transform_min_rotation)return;
                        e.Gestures.detection.current.name = this.name, this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), r > n.options.transform_min_rotation && n.trigger("rotate", t), i > n.options.transform_min_scale && (n.trigger("pinch", t), n.trigger("pinch" + (t.scale < 1 ? "in" : "out"), t));
                        break;
                    case e.Gestures.EVENT_END:
                        this.triggered && n.trigger(this.name + "end", t), this.triggered = !1
                }
            }
        }, e.Gestures.gestures.Touch = {
            name: "touch",
            index: -(1 / 0),
            defaults: {prevent_default: !1, prevent_mouseevents: !1},
            handler: function (t, n) {
                return n.options.prevent_mouseevents && t.pointerType == e.Gestures.POINTER_MOUSE ? void t.stopDetect() : (n.options.prevent_default && t.preventDefault(), void(t.eventType == e.Gestures.EVENT_START && n.trigger(this.name, t)))
            }
        }, e.Gestures.gestures.Release = {
            name: "release", index: 1 / 0, handler: function (t, n) {
                t.eventType == e.Gestures.EVENT_END && n.trigger(this.name, t)
            }
        }
    }(window.ionic), function (e, t, n) {
        function i(e) {
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var t = new RegExp("[\\?&]" + e + "=([^&#]*)"), n = t.exec(location.search);
            return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
        }

        function r() {
            f.isWebView() ? t.addEventListener("deviceready", o, !1) : o(), a && e.removeEventListener("load", r, !1)
        }

        function o() {
            f.isReady = !0, f.detect();
            for (var e = 0; e < h.length; e++)h[e]();
            h = [], n.trigger("platformready", {target: t}), u(function () {
                t.body.classList.add("platform-ready")
            })
        }

        var a, s = "ios", c = "android", l = "windowsphone", u = n.requestAnimationFrame, f = n.Platform = {
            navigator: e.navigator,
            isReady: !1,
            isFullScreen: !1,
            platforms: null,
            grade: null,
            ua: navigator.userAgent,
            ready: function (e) {
                f.isReady ? e() : h.push(e)
            },
            detect: function () {
                f._checkPlatforms(), u(function () {
                    for (var e = 0; e < f.platforms.length; e++)t.body.classList.add("platform-" + f.platforms[e])
                })
            },
            setGrade: function (e) {
                var n = f.grade;
                f.grade = e, u(function () {
                    n && t.body.classList.remove("grade-" + n), t.body.classList.add("grade-" + e)
                })
            },
            device: function () {
                return e.device || {}
            },
            _checkPlatforms: function () {
                f.platforms = [];
                var t = "a";
                f.isWebView() ? (f.platforms.push("webview"), e.cordova || e.PhoneGap || e.phonegap ? f.platforms.push("cordova") : e.forge && f.platforms.push("trigger")) : f.platforms.push("browser"), f.isIPad() && f.platforms.push("ipad");
                var n = f.platform();
                if (n) {
                    f.platforms.push(n);
                    var i = f.version();
                    if (i) {
                        var r = i.toString();
                        r.indexOf(".") > 0 ? r = r.replace(".", "_") : r += "_0", f.platforms.push(n + r.split("_")[0]), f.platforms.push(n + r), f.isAndroid() && i < 4.4 ? t = i < 4 ? "c" : "b" : f.isWindowsPhone() && (t = "b")
                    }
                }
                f.setGrade(t)
            },
            isWebView: function () {
                return !!(e.cordova || e.PhoneGap || e.phonegap || e.forge)
            },
            isIPad: function () {
                return !!/iPad/i.test(f.navigator.platform) || /iPad/i.test(f.ua)
            },
            isIOS: function () {
                return f.is(s)
            },
            isAndroid: function () {
                return f.is(c)
            },
            isWindowsPhone: function () {
                return f.is(l)
            },
            platform: function () {
                return null === d && f.setPlatform(f.device().platform), d
            },
            setPlatform: function (e) {
                d = "undefined" != typeof e && null !== e && e.length ? e.toLowerCase() : i("ionicplatform") ? i("ionicplatform") : f.ua.indexOf("Android") > 0 ? c : /iPhone|iPad|iPod/.test(f.ua) ? s : f.ua.indexOf("Windows Phone") > -1 ? l : f.navigator.platform && navigator.platform.toLowerCase().split(" ")[0] || ""
            },
            version: function () {
                return null === p && f.setVersion(f.device().version), p
            },
            setVersion: function (e) {
                if ("undefined" != typeof e && null !== e && (e = e.split("."), e = parseFloat(e[0] + "." + (e.length > 1 ? e[1] : 0)), !isNaN(e)))return void(p = e);
                p = 0;
                var t = f.platform(), n = {
                    android: /Android (\d+).(\d+)?/,
                    ios: /OS (\d+)_(\d+)?/,
                    windowsphone: /Windows Phone (\d+).(\d+)?/
                };
                n[t] && (e = f.ua.match(n[t]), e && e.length > 2 && (p = parseFloat(e[1] + "." + e[2])))
            },
            is: function (e) {
                if (e = e.toLowerCase(), f.platforms)for (var t = 0; t < f.platforms.length; t++)if (f.platforms[t] === e)return !0;
                var n = f.platform();
                return n ? n === e.toLowerCase() : f.ua.toLowerCase().indexOf(e) >= 0
            },
            exitApp: function () {
                f.ready(function () {
                    navigator.app && navigator.app.exitApp && navigator.app.exitApp()
                })
            },
            showStatusBar: function (n) {
                f._showStatusBar = n, f.ready(function () {
                    u(function () {
                        f._showStatusBar ? (e.StatusBar && e.StatusBar.show(), t.body.classList.remove("status-bar-hide")) : (e.StatusBar && e.StatusBar.hide(), t.body.classList.add("status-bar-hide"))
                    })
                })
            },
            fullScreen: function (e, i) {
                f.isFullScreen = e !== !1, n.DomUtil.ready(function () {
                    u(function () {
                        f.isFullScreen ? t.body.classList.add("fullscreen") : t.body.classList.remove("fullscreen")
                    }), f.showStatusBar(i === !0)
                })
            }
        }, d = null, p = null, h = [];
        "complete" === t.readyState ? r() : (a = !0, e.addEventListener("load", r, !1))
    }(this, document, ionic), function (e, t) {
        "use strict";
        t.CSS = {}, function () {
            var n, i = ["webkitTransform", "transform", "-webkit-transform", "webkit-transform", "-moz-transform", "moz-transform", "MozTransform", "mozTransform", "msTransform"];
            for (n = 0; n < i.length; n++)if (void 0 !== e.documentElement.style[i[n]]) {
                t.CSS.TRANSFORM = i[n];
                break
            }
            for (i = ["webkitTransition", "mozTransition", "msTransition", "transition"], n = 0; n < i.length; n++)if (void 0 !== e.documentElement.style[i[n]]) {
                t.CSS.TRANSITION = i[n];
                break
            }
            var r = t.CSS.TRANSITION.indexOf("webkit") > -1;
            t.CSS.TRANSITION_DURATION = (r ? "-webkit-" : "") + "transition-duration", t.CSS.TRANSITIONEND = (r ? "webkitTransitionEnd " : "") + "transitionend"
        }(), "classList" in e.documentElement || !Object.defineProperty || "undefined" == typeof HTMLElement || Object.defineProperty(HTMLElement.prototype, "classList", {
            get: function () {
                function e(e) {
                    return function () {
                        var n, i = t.className.split(/\s+/);
                        for (n = 0; n < arguments.length; n++)e(i, i.indexOf(arguments[n]), arguments[n]);
                        t.className = i.join(" ")
                    }
                }

                var t = this;
                return {
                    add: e(function (e, t, n) {
                        ~t || e.push(n)
                    }), remove: e(function (e, t) {
                        ~t && e.splice(t, 1)
                    }), toggle: e(function (e, t, n) {
                        ~t ? e.splice(t, 1) : e.push(n)
                    }), contains: function (e) {
                        return !!~t.className.split(/\s+/).indexOf(e)
                    }, item: function (e) {
                        return t.className.split(/\s+/)[e] || null
                    }
                }
            }
        })
    }(document, ionic);
    var z, F, q, U, j, G, W, Y, X = "touchmove", K = 12, Q = 50, Z = {
        click: i,
        mousedown: r,
        mouseup: o,
        mousemove: a,
        touchstart: s,
        touchend: c,
        touchcancel: u,
        touchmove: l,
        pointerdown: s,
        pointerup: c,
        pointercancel: u,
        pointermove: l,
        MSPointerDown: s,
        MSPointerUp: c,
        MSPointerCancel: u,
        MSPointerMove: l,
        focusin: m,
        focusout: v
    };
    ionic.tap = {
        register: function (t) {
            return z = t, e("click", !0, !0), e("mouseup"), e("mousedown"), window.navigator.pointerEnabled ? (e("pointerdown"), e("pointerup"), e("pointcancel"), X = "pointermove") : window.navigator.msPointerEnabled ? (e("MSPointerDown"), e("MSPointerUp"), e("MSPointerCancel"), X = "MSPointerMove") : (e("touchstart"), e("touchend"), e("touchcancel")), e("focusin"), e("focusout"), function () {
                for (var t in Z)e(t, !1);
                z = null, F = null, q = !1, j = !1, G = null
            }
        }, ignoreScrollStart: function (e) {
            return e.defaultPrevented || /^(file|range)$/i.test(e.target.type) || "true" == (e.target.dataset ? e.target.dataset.preventScroll : e.target.getAttribute("data-prevent-scroll")) || !!/^(object|embed)$/i.test(e.target.tagName) || ionic.tap.isElementTapDisabled(e.target)
        }, isTextInput: function (e) {
            return !!e && ("TEXTAREA" == e.tagName || "true" === e.contentEditable || "INPUT" == e.tagName && !/^(radio|checkbox|range|file|submit|reset|color|image|button)$/i.test(e.type))
        }, isDateInput: function (e) {
            return !!e && "INPUT" == e.tagName && /^(date|time|datetime-local|month|week)$/i.test(e.type)
        }, isKeyboardElement: function (e) {
            return !ionic.Platform.isIOS() || ionic.Platform.isIPad() ? ionic.tap.isTextInput(e) && !ionic.tap.isDateInput(e) : ionic.tap.isTextInput(e) || !!e && "SELECT" == e.tagName
        }, isLabelWithTextInput: function (e) {
            var t = y(e, !1);
            return !!t && ionic.tap.isTextInput(w(t))
        }, containsOrIsTextInput: function (e) {
            return ionic.tap.isTextInput(e) || ionic.tap.isLabelWithTextInput(e)
        }, cloneFocusedInput: function (e) {
            ionic.tap.hasCheckedClone || (ionic.tap.hasCheckedClone = !0, ionic.requestAnimationFrame(function () {
                var t = e.querySelector(":focus");
                if (ionic.tap.isTextInput(t) && !ionic.tap.isDateInput(t)) {
                    var n = t.cloneNode(!0);
                    n.value = t.value, n.classList.add("cloned-text-input"), n.readOnly = !0, t.isContentEditable && (n.contentEditable = t.contentEditable, n.innerHTML = t.innerHTML), t.parentElement.insertBefore(n, t), t.classList.add("previous-input-focus"), n.scrollTop = t.scrollTop
                }
            }))
        }, hasCheckedClone: !1, removeClonedInputs: function (e) {
            ionic.tap.hasCheckedClone = !1, ionic.requestAnimationFrame(function () {
                var t, n = e.querySelectorAll(".cloned-text-input"), i = e.querySelectorAll(".previous-input-focus");
                for (t = 0; t < n.length; t++)n[t].parentElement.removeChild(n[t]);
                for (t = 0; t < i.length; t++)i[t].classList.remove("previous-input-focus"), i[t].style.top = "", ionic.keyboard.isOpen && !ionic.keyboard.isClosing && i[t].focus()
            })
        }, requiresNativeClick: function (e) {
            return !!(!e || e.disabled || /^(file|range)$/i.test(e.type) || /^(object|video)$/i.test(e.tagName) || ionic.tap.isLabelContainingFileInput(e)) || ionic.tap.isElementTapDisabled(e)
        }, isLabelContainingFileInput: function (e) {
            var t = y(e);
            if ("LABEL" !== t.tagName)return !1;
            var n = t.querySelector("input[type=file]");
            return !(!n || n.disabled !== !1)
        }, isElementTapDisabled: function (e) {
            if (e && 1 === e.nodeType)for (var t = e; t;) {
                if ("true" == (t.dataset ? t.dataset.tapDisabled : t.getAttribute("data-tap-disabled")))return !0;
                t = t.parentElement
            }
            return !1
        }, setTolerance: function (e, t) {
            K = e, Q = t
        }, cancelClick: function () {
            j = !0
        }, pointerCoord: function (e) {
            var t = {x: 0, y: 0};
            if (e) {
                var n = e.touches && e.touches.length ? e.touches : [e], i = e.changedTouches && e.changedTouches[0] || n[0];
                i && (t.x = i.clientX || i.pageX || 0, t.y = i.clientY || i.pageY || 0)
            }
            return t
        }
    }, ionic.DomUtil.ready(function () {
        var e = "undefined" != typeof angular ? angular : null;
        (!e || e && !e.scenario) && ionic.tap.register(document)
    }), function (e, t) {
        "use strict";
        function n() {
            o = {}, t.requestAnimationFrame(r)
        }

        function i() {
            for (var e in o)o[e] && (o[e].classList.add(c), a[e] = o[e]);
            o = {}
        }

        function r() {
            if (t.transition && t.transition.isActive)return void setTimeout(r, 400);
            for (var e in a)a[e] && (a[e].classList.remove(c), delete a[e])
        }

        var o = {}, a = {}, s = 0, c = "activated";
        t.activator = {
            start: function (e) {
                var n = t.tap.pointerCoord(e).x;
                n > 0 && n < 30 || t.requestAnimationFrame(function () {
                    if (!(t.scroll && t.scroll.isScrolling || t.tap.requiresNativeClick(e.target))) {
                        for (var n, r = e.target, a = 0; a < 6 && (r && 1 === r.nodeType); a++) {
                            if (n && r.classList && r.classList.contains("item")) {
                                n = r;
                                break
                            }
                            if ("A" == r.tagName || "BUTTON" == r.tagName || r.hasAttribute("ng-click")) {
                                n = r;
                                break
                            }
                            if (r.classList.contains("button")) {
                                n = r;
                                break
                            }
                            if ("ION-CONTENT" == r.tagName || r.classList && r.classList.contains("pane") || "BODY" == r.tagName)break;
                            r = r.parentElement
                        }
                        n && (o[s] = n, t.requestAnimationFrame(i), s = s > 29 ? 0 : s + 1)
                    }
                })
            }, end: function () {
                setTimeout(n, 200)
            }
        }
    }(document, ionic), function (e) {
        var t = 0;
        e.Utils = {
            arrayMove: function (e, t, n) {
                if (n >= e.length)for (var i = n - e.length; i-- + 1;)e.push(void 0);
                return e.splice(n, 0, e.splice(t, 1)[0]), e
            }, proxy: function (e, t) {
                var n = Array.prototype.slice.call(arguments, 2);
                return function () {
                    return e.apply(t, n.concat(Array.prototype.slice.call(arguments)))
                }
            }, debounce: function (e, t, n) {
                var i, r, o, a, s;
                return function () {
                    o = this, r = arguments, a = new Date;
                    var c = function () {
                        var l = new Date - a;
                        l < t ? i = setTimeout(c, t - l) : (i = null, n || (s = e.apply(o, r)))
                    }, l = n && !i;
                    return i || (i = setTimeout(c, t)), l && (s = e.apply(o, r)), s
                }
            }, throttle: function (e, t, n) {
                var i, r, o, a = null, s = 0;
                n || (n = {});
                var c = function () {
                    s = n.leading === !1 ? 0 : Date.now(), a = null, o = e.apply(i, r)
                };
                return function () {
                    var l = Date.now();
                    s || n.leading !== !1 || (s = l);
                    var u = t - (l - s);
                    return i = this, r = arguments, u <= 0 ? (clearTimeout(a), a = null, s = l, o = e.apply(i, r)) : a || n.trailing === !1 || (a = setTimeout(c, u)), o
                }
            }, inherit: function (t, n) {
                var i, r = this;
                i = t && t.hasOwnProperty("constructor") ? t.constructor : function () {
                    return r.apply(this, arguments)
                }, e.extend(i, r, n);
                var o = function () {
                    this.constructor = i
                };
                return o.prototype = r.prototype, i.prototype = new o, t && e.extend(i.prototype, t), i.__super__ = r.prototype, i
            }, extend: function (e) {
                for (var t = Array.prototype.slice.call(arguments, 1), n = 0; n < t.length; n++) {
                    var i = t[n];
                    if (i)for (var r in i)e[r] = i[r]
                }
                return e
            }, nextUid: function () {
                return "ion" + t++
            }, disconnectScope: function (e) {
                if (e && e.$root !== e) {
                    var t = e.$parent;
                    e.$$disconnected = !0, e.$broadcast("$ionic.disconnectScope", e), t.$$childHead === e && (t.$$childHead = e.$$nextSibling), t.$$childTail === e && (t.$$childTail = e.$$prevSibling), e.$$prevSibling && (e.$$prevSibling.$$nextSibling = e.$$nextSibling), e.$$nextSibling && (e.$$nextSibling.$$prevSibling = e.$$prevSibling), e.$$nextSibling = e.$$prevSibling = null
                }
            }, reconnectScope: function (e) {
                if (e && e.$root !== e && e.$$disconnected) {
                    var t = e.$parent;
                    e.$$disconnected = !1, e.$broadcast("$ionic.reconnectScope", e), e.$$prevSibling = t.$$childTail, t.$$childHead ? (t.$$childTail.$$nextSibling = e, t.$$childTail = e) : t.$$childHead = t.$$childTail = e
                }
            }, isScopeDisconnected: function (e) {
                for (var t = e; t;) {
                    if (t.$$disconnected)return !0;
                    t = t.$parent
                }
                return !1
            }
        }, e.inherit = e.Utils.inherit, e.extend = e.Utils.extend, e.throttle = e.Utils.throttle, e.proxy = e.Utils.proxy, e.debounce = e.Utils.debounce
    }(window.ionic);
    var J, ee, te, ne, ie = 0, re = 0, oe = 0, ae = !1, se = "keyboard-open", ce = "scroll-content", le = ionic.debounce(S, 200, !0), ue = ionic.debounce(_, 100, !0);
    ionic.keyboard = {
        isOpen: !1,
        isClosing: !1,
        isOpening: !1,
        height: 0,
        isLandscape: !1,
        isInitialized: !1,
        hide: function () {
            V() && cordova.plugins.Keyboard.close(), J && J.blur()
        },
        show: function () {
            V() && cordova.plugins.Keyboard.show()
        },
        disable: function () {
            V() ? (window.removeEventListener("native.keyboardshow", ue), window.removeEventListener("native.keyboardhide", x)) : document.body.removeEventListener("focusout", x), document.body.removeEventListener("ionic.focusin", le), document.body.removeEventListener("focusin", le), window.removeEventListener("orientationchange", T), window.navigator.msPointerEnabled ? document.removeEventListener("MSPointerDown", b) : document.removeEventListener("touchstart", b), ionic.keyboard.isInitialized = !1
        },
        enable: function () {
            b()
        }
    }, ie = B(), ionic.Platform.ready(function () {
        N(), window.addEventListener("orientationchange", T), setTimeout(N, 999), window.navigator.msPointerEnabled ? document.addEventListener("MSPointerDown", b, !1) : document.addEventListener("touchstart", b, !1)
    });
    var fe, de = {};
    ionic.viewport = {
        orientation: function () {
            return window.innerWidth > window.innerHeight ? 90 : 0
        }
    }, ionic.Platform.ready(function () {
        L(), window.addEventListener("orientationchange", function () {
            setTimeout(R, 1e3)
        }, !1)
    }), function (e) {
        "use strict";
        e.views.View = function () {
            this.initialize.apply(this, arguments)
        }, e.views.View.inherit = e.inherit, e.extend(e.views.View.prototype, {
            initialize: function () {
            }
        })
    }(window.ionic);
    var pe = {effect: {}};
    !function (e) {
        var t = Date.now || function () {
                return +new Date
            }, n = 60, i = 1e3, r = {}, o = 1;
        pe.effect.Animate = {
            requestAnimationFrame: function () {
                var t = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame, n = !!t;
                if (t && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(t.toString()) && (n = !1), n)return function (e, n) {
                    t(e, n)
                };
                var i = 60, r = {}, o = 0, a = 1, s = null, c = +new Date;
                return function (e) {
                    var t = a++;
                    return r[t] = e, o++, null === s && (s = setInterval(function () {
                        var e = +new Date, t = r;
                        r = {}, o = 0;
                        for (var n in t)t.hasOwnProperty(n) && (t[n](e), c = e);
                        e - c > 2500 && (clearInterval(s), s = null)
                    }, 1e3 / i)), t
                }
            }(), stop: function (e) {
                var t = null != r[e];
                return t && (r[e] = null), t
            }, isRunning: function (e) {
                return null != r[e]
            }, start: function (e, a, s, c, l, u) {
                var f = t(), d = f, p = 0, h = 0, m = o++;
                if (u || (u = document.body), m % 20 === 0) {
                    var v = {};
                    for (var g in r)v[g] = !0;
                    r = v
                }
                var $ = function (o) {
                    var v = o !== !0, g = t();
                    if (!r[m] || a && !a(m))return r[m] = null, void(s && s(n - h / ((g - f) / i), m, !1));
                    if (v)for (var y = Math.round((g - d) / (i / n)) - 1, w = 0; w < Math.min(y, 4); w++)$(!0), h++;
                    c && (p = (g - f) / c, p > 1 && (p = 1));
                    var b = l ? l(p) : p;
                    e(b, g, v) !== !1 && 1 !== p || !v ? v && (d = g, pe.effect.Animate.requestAnimationFrame($, u)) : (r[m] = null, s && s(n - h / ((g - f) / i), m, 1 === p || null == c))
                };
                return r[m] = !0, pe.effect.Animate.requestAnimationFrame($, u), m
            }
        }
    }(this), function (e) {
        var t = function () {
        }, n = function (e) {
            return Math.pow(e - 1, 3) + 1
        }, i = function (e) {
            return (e /= .5) < 1 ? .5 * Math.pow(e, 3) : .5 * (Math.pow(e - 2, 3) + 2)
        };
        e.views.Scroll = e.views.View.inherit({
            initialize: function (n) {
                var i = this;
                i.__container = n.el, i.__content = n.el.firstElementChild, setTimeout(function () {
                    i.__container && i.__content && (i.__container.scrollTop = 0, i.__content.scrollTop = 0)
                }), i.options = {
                    scrollingX: !1,
                    scrollbarX: !0,
                    scrollingY: !0,
                    scrollbarY: !0,
                    startX: 0,
                    startY: 0,
                    wheelDampen: 6,
                    minScrollbarSizeX: 5,
                    minScrollbarSizeY: 5,
                    scrollbarsFade: !0,
                    scrollbarFadeDelay: 300,
                    scrollbarResizeFadeDelay: 1e3,
                    animating: !0,
                    animationDuration: 250,
                    decelVelocityThreshold: 4,
                    decelVelocityThresholdPaging: 4,
                    bouncing: !0,
                    locking: !0,
                    paging: !1,
                    snapping: !1,
                    zooming: !1,
                    minZoom: .5,
                    maxZoom: 3,
                    speedMultiplier: 1,
                    deceleration: .97,
                    preventDefault: !1,
                    scrollingComplete: t,
                    penetrationDeceleration: .03,
                    penetrationAcceleration: .08,
                    scrollEventInterval: 10,
                    freeze: !1,
                    getContentWidth: function () {
                        return Math.max(i.__content.scrollWidth, i.__content.offsetWidth)
                    },
                    getContentHeight: function () {
                        return Math.max(i.__content.scrollHeight, i.__content.offsetHeight + 2 * i.__content.offsetTop)
                    }
                };
                for (var r in n)i.options[r] = n[r];
                i.hintResize = e.debounce(function () {
                    i.resize()
                }, 1e3, !0), i.onScroll = function () {
                    e.scroll.isScrolling ? (clearTimeout(i.scrollTimer), i.scrollTimer = setTimeout(i.setScrollStop, 80)) : setTimeout(i.setScrollStart, 50)
                }, i.freeze = function (e) {
                    return arguments.length && (i.options.freeze = e), i.options.freeze
                }, i.setScrollStart = function () {
                    e.scroll.isScrolling = Math.abs(e.scroll.lastTop - i.__scrollTop) > 1, clearTimeout(i.scrollTimer), i.scrollTimer = setTimeout(i.setScrollStop, 80)
                }, i.setScrollStop = function () {
                    e.scroll.isScrolling = !1, e.scroll.lastTop = i.__scrollTop
                }, i.triggerScrollEvent = e.throttle(function () {
                    i.onScroll(), e.trigger("scroll", {
                        scrollTop: i.__scrollTop,
                        scrollLeft: i.__scrollLeft,
                        target: i.__container
                    })
                }, i.options.scrollEventInterval), i.triggerScrollEndEvent = function () {
                    e.trigger("scrollend", {
                        scrollTop: i.__scrollTop,
                        scrollLeft: i.__scrollLeft,
                        target: i.__container
                    })
                }, i.__scrollLeft = i.options.startX, i.__scrollTop = i.options.startY, i.__callback = i.getRenderFn(), i.__initEventHandlers(), i.__createScrollbars()
            },
            run: function () {
                this.resize(), this.__fadeScrollbars("out", this.options.scrollbarResizeFadeDelay)
            },
            __isSingleTouch: !1,
            __isTracking: !1,
            __didDecelerationComplete: !1,
            __isGesturing: !1,
            __isDragging: !1,
            __isDecelerating: !1,
            __isAnimating: !1,
            __clientLeft: 0,
            __clientTop: 0,
            __clientWidth: 0,
            __clientHeight: 0,
            __contentWidth: 0,
            __contentHeight: 0,
            __snapWidth: 100,
            __snapHeight: 100,
            __refreshHeight: null,
            __refreshActive: !1,
            __refreshActivate: null,
            __refreshDeactivate: null,
            __refreshStart: null,
            __zoomLevel: 1,
            __scrollLeft: 0,
            __scrollTop: 0,
            __maxScrollLeft: 0,
            __maxScrollTop: 0,
            __scheduledLeft: 0,
            __scheduledTop: 0,
            __scheduledZoom: 0,
            __lastTouchLeft: null,
            __lastTouchTop: null,
            __lastTouchMove: null,
            __positions: null,
            __minDecelerationScrollLeft: null,
            __minDecelerationScrollTop: null,
            __maxDecelerationScrollLeft: null,
            __maxDecelerationScrollTop: null,
            __decelerationVelocityX: null,
            __decelerationVelocityY: null,
            __transformProperty: null,
            __perspectiveProperty: null,
            __indicatorX: null,
            __indicatorY: null,
            __scrollbarFadeTimeout: null,
            __didWaitForSize: null,
            __sizerTimeout: null,
            __initEventHandlers: function () {
                function t(e) {
                    return e.touches && e.touches.length ? e.touches : [{pageX: e.pageX, pageY: e.pageY}]
                }

                var n, i = this, r = i.__container;
                if (i.scrollChildIntoView = function (t) {
                        var o = r.getBoundingClientRect().bottom;
                        n = r.offsetHeight;
                        var a = i.isShrunkForKeyboard, s = r.parentNode.classList.contains("modal"), c = s && window.innerWidth >= 680;
                        if (!a) {
                            if (e.Platform.isIOS() || e.Platform.isFullScreen || c) {
                                var l = t.detail.viewportHeight - o, u = Math.max(0, t.detail.keyboardHeight - l);
                                e.requestAnimationFrame(function () {
                                    n -= u, r.style.height = n + "px", r.style.overflow = "visible", i.resize()
                                })
                            }
                            i.isShrunkForKeyboard = !0
                        }
                        t.detail.isElementUnderKeyboard && e.requestAnimationFrame(function () {
                            r.scrollTop = 0, i.isShrunkForKeyboard && !a && (o = r.getBoundingClientRect().bottom);
                            var s = .5 * n, c = (t.detail.elementBottom + t.detail.elementTop) / 2, l = c - o, u = l + s;
                            u > 0 && (e.Platform.isIOS() && e.tap.cloneFocusedInput(r, i), i.scrollBy(0, u, !0), i.onScroll())
                        }), t.stopPropagation()
                    }, i.resetScrollView = function () {
                        i.isShrunkForKeyboard && (i.isShrunkForKeyboard = !1, r.style.height = "", r.style.overflow = ""), i.resize()
                    }, r.addEventListener("scrollChildIntoView", i.scrollChildIntoView), document.addEventListener("resetScrollView", i.resetScrollView), i.touchStart = function (n) {
                        if (i.startCoordinates = e.tap.pointerCoord(n), !e.tap.ignoreScrollStart(n)) {
                            if (i.__isDown = !0, e.tap.containsOrIsTextInput(n.target) || "SELECT" === n.target.tagName)return void(i.__hasStarted = !1);
                            i.__isSelectable = !0, i.__enableScrollY = !0, i.__hasStarted = !0, i.doTouchStart(t(n), n.timeStamp), n.preventDefault()
                        }
                    }, i.touchMove = function (n) {
                        if (!(i.options.freeze || !i.__isDown || !i.__isDown && n.defaultPrevented || "TEXTAREA" === n.target.tagName && n.target.parentElement.querySelector(":focus"))) {
                            if (!i.__hasStarted && (e.tap.containsOrIsTextInput(n.target) || "SELECT" === n.target.tagName))return i.__hasStarted = !0, i.doTouchStart(t(n), n.timeStamp), void n.preventDefault();
                            if (i.startCoordinates) {
                                var o = e.tap.pointerCoord(n);
                                i.__isSelectable && e.tap.isTextInput(n.target) && Math.abs(i.startCoordinates.x - o.x) > 20 && (i.__enableScrollY = !1, i.__isSelectable = !0), i.__enableScrollY && Math.abs(i.startCoordinates.y - o.y) > 10 && (i.__isSelectable = !1, e.tap.cloneFocusedInput(r, i))
                            }
                            i.doTouchMove(t(n), n.timeStamp, n.scale), i.__isDown = !0
                        }
                    }, i.touchMoveBubble = function (e) {
                        i.__isDown && i.options.preventDefault && e.preventDefault()
                    }, i.touchEnd = function (t) {
                        i.__isDown && (i.doTouchEnd(t, t.timeStamp), i.__isDown = !1, i.__hasStarted = !1, i.__isSelectable = !0, i.__enableScrollY = !0, i.__isDragging || i.__isDecelerating || i.__isAnimating || e.tap.removeClonedInputs(r, i))
                    }, i.mouseWheel = e.animationFrameThrottle(function (t) {
                        var n = e.DomUtil.getParentOrSelfWithClass(t.target, "ionic-scroll");
                        i.options.freeze || n !== i.__container || (i.hintResize(), i.scrollBy((t.wheelDeltaX || t.deltaX || 0) / i.options.wheelDampen, (-t.wheelDeltaY || t.deltaY || 0) / i.options.wheelDampen), i.__fadeScrollbars("in"), clearTimeout(i.__wheelHideBarTimeout), i.__wheelHideBarTimeout = setTimeout(function () {
                            i.__fadeScrollbars("out")
                        }, 100))
                    }), "ontouchstart" in window)r.addEventListener("touchstart", i.touchStart, !1), i.options.preventDefault && r.addEventListener("touchmove", i.touchMoveBubble, !1), document.addEventListener("touchmove", i.touchMove, !1), document.addEventListener("touchend", i.touchEnd, !1), document.addEventListener("touchcancel", i.touchEnd, !1); else if (window.navigator.pointerEnabled)r.addEventListener("pointerdown", i.touchStart, !1), i.options.preventDefault && r.addEventListener("pointermove", i.touchMoveBubble, !1), document.addEventListener("pointermove", i.touchMove, !1), document.addEventListener("pointerup", i.touchEnd, !1), document.addEventListener("pointercancel", i.touchEnd, !1), document.addEventListener("wheel", i.mouseWheel, !1); else if (window.navigator.msPointerEnabled)r.addEventListener("MSPointerDown", i.touchStart, !1), i.options.preventDefault && r.addEventListener("MSPointerMove", i.touchMoveBubble, !1), document.addEventListener("MSPointerMove", i.touchMove, !1), document.addEventListener("MSPointerUp", i.touchEnd, !1), document.addEventListener("MSPointerCancel", i.touchEnd, !1), document.addEventListener("wheel", i.mouseWheel, !1); else {
                    var o = !1;
                    i.mouseDown = function (n) {
                        e.tap.ignoreScrollStart(n) || "SELECT" === n.target.tagName || (i.doTouchStart(t(n), n.timeStamp), e.tap.isTextInput(n.target) || n.preventDefault(), o = !0)
                    }, i.mouseMove = function (e) {
                        i.options.freeze || !o || !o && e.defaultPrevented || (i.doTouchMove(t(e), e.timeStamp), o = !0)
                    }, i.mouseMoveBubble = function (e) {
                        o && i.options.preventDefault && e.preventDefault()
                    }, i.mouseUp = function (e) {
                        o && (i.doTouchEnd(e, e.timeStamp), o = !1)
                    }, r.addEventListener("mousedown", i.mouseDown, !1), i.options.preventDefault && r.addEventListener("mousemove", i.mouseMoveBubble, !1), document.addEventListener("mousemove", i.mouseMove, !1), document.addEventListener("mouseup", i.mouseUp, !1), document.addEventListener("mousewheel", i.mouseWheel, !1), document.addEventListener("wheel", i.mouseWheel, !1)
                }
            },
            __cleanup: function () {
                var n = this, i = n.__container;
                i.removeEventListener("touchstart", n.touchStart), i.removeEventListener("touchmove", n.touchMoveBubble), document.removeEventListener("touchmove", n.touchMove), document.removeEventListener("touchend", n.touchEnd), document.removeEventListener("touchcancel", n.touchEnd), i.removeEventListener("pointerdown", n.touchStart), i.removeEventListener("pointermove", n.touchMoveBubble), document.removeEventListener("pointermove", n.touchMove), document.removeEventListener("pointerup", n.touchEnd), document.removeEventListener("pointercancel", n.touchEnd), i.removeEventListener("MSPointerDown", n.touchStart), i.removeEventListener("MSPointerMove", n.touchMoveBubble), document.removeEventListener("MSPointerMove", n.touchMove), document.removeEventListener("MSPointerUp", n.touchEnd), document.removeEventListener("MSPointerCancel", n.touchEnd), i.removeEventListener("mousedown", n.mouseDown), i.removeEventListener("mousemove", n.mouseMoveBubble), document.removeEventListener("mousemove", n.mouseMove), document.removeEventListener("mouseup", n.mouseUp), document.removeEventListener("mousewheel", n.mouseWheel), document.removeEventListener("wheel", n.mouseWheel), i.removeEventListener("scrollChildIntoView", n.scrollChildIntoView), document.removeEventListener("resetScrollView", n.resetScrollView), e.tap.removeClonedInputs(i, n), delete n.__container, delete n.__content, delete n.__indicatorX, delete n.__indicatorY, delete n.options.el, n.__callback = n.scrollChildIntoView = n.resetScrollView = t, n.mouseMove = n.mouseDown = n.mouseUp = n.mouseWheel = n.touchStart = n.touchMove = n.touchEnd = n.touchCancel = t, n.resize = n.scrollTo = n.zoomTo = n.__scrollingComplete = t, i = null
            },
            __createScrollbar: function (e) {
                var t = document.createElement("div"), n = document.createElement("div");
                return n.className = "scroll-bar-indicator scroll-bar-fade-out", "h" == e ? t.className = "scroll-bar scroll-bar-h" : t.className = "scroll-bar scroll-bar-v", t.appendChild(n), t
            },
            __createScrollbars: function () {
                var e, t, n = this;
                n.options.scrollingX && (e = {
                    el: n.__createScrollbar("h"),
                    sizeRatio: 1
                }, e.indicator = e.el.children[0], n.options.scrollbarX && n.__container.appendChild(e.el), n.__indicatorX = e), n.options.scrollingY && (t = {
                    el: n.__createScrollbar("v"),
                    sizeRatio: 1
                }, t.indicator = t.el.children[0], n.options.scrollbarY && n.__container.appendChild(t.el), n.__indicatorY = t)
            },
            __resizeScrollbars: function () {
                var t = this;
                if (t.__indicatorX) {
                    var n = Math.max(Math.round(t.__clientWidth * t.__clientWidth / t.__contentWidth), 20);
                    n > t.__contentWidth && (n = 0), n !== t.__indicatorX.size && e.requestAnimationFrame(function () {
                        t.__indicatorX.indicator.style.width = n + "px"
                    }), t.__indicatorX.size = n, t.__indicatorX.minScale = t.options.minScrollbarSizeX / n, t.__indicatorX.maxPos = t.__clientWidth - n, t.__indicatorX.sizeRatio = t.__maxScrollLeft ? t.__indicatorX.maxPos / t.__maxScrollLeft : 1
                }
                if (t.__indicatorY) {
                    var i = Math.max(Math.round(t.__clientHeight * t.__clientHeight / t.__contentHeight), 20);
                    i > t.__contentHeight && (i = 0), i !== t.__indicatorY.size && e.requestAnimationFrame(function () {
                        t.__indicatorY && (t.__indicatorY.indicator.style.height = i + "px")
                    }), t.__indicatorY.size = i, t.__indicatorY.minScale = t.options.minScrollbarSizeY / i, t.__indicatorY.maxPos = t.__clientHeight - i, t.__indicatorY.sizeRatio = t.__maxScrollTop ? t.__indicatorY.maxPos / t.__maxScrollTop : 1
                }
            },
            __repositionScrollbars: function () {
                var e, t, n, i, r, o, a = this, s = 0, c = 0;
                if (a.__indicatorX) {
                    a.__indicatorY && (s = 10), r = Math.round(a.__indicatorX.sizeRatio * a.__scrollLeft) || 0, n = a.__scrollLeft - (a.__maxScrollLeft - s), a.__scrollLeft < 0 ? (t = Math.max(a.__indicatorX.minScale, (a.__indicatorX.size - Math.abs(a.__scrollLeft)) / a.__indicatorX.size), r = 0, a.__indicatorX.indicator.style[a.__transformOriginProperty] = "left center") : n > 0 ? (t = Math.max(a.__indicatorX.minScale, (a.__indicatorX.size - n) / a.__indicatorX.size), r = a.__indicatorX.maxPos - s, a.__indicatorX.indicator.style[a.__transformOriginProperty] = "right center") : (r = Math.min(a.__maxScrollLeft, Math.max(0, r)), t = 1);
                    var l = "translate3d(" + r + "px, 0, 0) scaleX(" + t + ")";
                    a.__indicatorX.transformProp !== l && (a.__indicatorX.indicator.style[a.__transformProperty] = l, a.__indicatorX.transformProp = l)
                }
                if (a.__indicatorY) {
                    o = Math.round(a.__indicatorY.sizeRatio * a.__scrollTop) || 0, a.__indicatorX && (c = 10), i = a.__scrollTop - (a.__maxScrollTop - c), a.__scrollTop < 0 ? (e = Math.max(a.__indicatorY.minScale, (a.__indicatorY.size - Math.abs(a.__scrollTop)) / a.__indicatorY.size), o = 0, "center top" !== a.__indicatorY.originProp && (a.__indicatorY.indicator.style[a.__transformOriginProperty] = "center top", a.__indicatorY.originProp = "center top")) : i > 0 ? (e = Math.max(a.__indicatorY.minScale, (a.__indicatorY.size - i) / a.__indicatorY.size), o = a.__indicatorY.maxPos - c, "center bottom" !== a.__indicatorY.originProp && (a.__indicatorY.indicator.style[a.__transformOriginProperty] = "center bottom", a.__indicatorY.originProp = "center bottom")) : (o = Math.min(a.__maxScrollTop, Math.max(0, o)), e = 1);
                    var u = "translate3d(0," + o + "px, 0) scaleY(" + e + ")";
                    a.__indicatorY.transformProp !== u && (a.__indicatorY.indicator.style[a.__transformProperty] = u, a.__indicatorY.transformProp = u)
                }
            },
            __fadeScrollbars: function (e, t) {
                var n = this;
                if (n.options.scrollbarsFade) {
                    var i = "scroll-bar-fade-out";
                    n.options.scrollbarsFade === !0 && (clearTimeout(n.__scrollbarFadeTimeout), "in" == e ? (n.__indicatorX && n.__indicatorX.indicator.classList.remove(i), n.__indicatorY && n.__indicatorY.indicator.classList.remove(i)) : n.__scrollbarFadeTimeout = setTimeout(function () {
                        n.__indicatorX && n.__indicatorX.indicator.classList.add(i), n.__indicatorY && n.__indicatorY.indicator.classList.add(i)
                    }, t || n.options.scrollbarFadeDelay))
                }
            },
            __scrollingComplete: function () {
                this.options.scrollingComplete(), e.tap.removeClonedInputs(this.__container, this), this.__fadeScrollbars("out")
            },
            resize: function (e) {
                var t = this;
                t.__container && t.options && t.setDimensions(t.__container.clientWidth, t.__container.clientHeight, t.options.getContentWidth(), t.options.getContentHeight(), e)
            },
            getRenderFn: function () {
                var e, t = this, n = t.__content, i = document.documentElement.style;
                "MozAppearance" in i ? e = "gecko" : "WebkitAppearance" in i ? e = "webkit" : "string" == typeof navigator.cpuClass && (e = "trident");
                var r, o = {
                    trident: "ms",
                    gecko: "Moz",
                    webkit: "Webkit",
                    presto: "O"
                }[e], a = document.createElement("div"), s = o + "Perspective", c = o + "Transform", l = o + "TransformOrigin";
                return t.__perspectiveProperty = c, t.__transformProperty = c, t.__transformOriginProperty = l, a.style[s] !== r ? function (e, i, r, o) {
                    var a = "translate3d(" + -e + "px," + -i + "px,0) scale(" + r + ")";
                    a !== t.contentTransform && (n.style[c] = a, t.contentTransform = a), t.__repositionScrollbars(), o || t.triggerScrollEvent()
                } : a.style[c] !== r ? function (e, i, r, o) {
                    n.style[c] = "translate(" + -e + "px," + -i + "px) scale(" + r + ")", t.__repositionScrollbars(), o || t.triggerScrollEvent()
                } : function (e, i, r, o) {
                    n.style.marginLeft = e ? -e / r + "px" : "", n.style.marginTop = i ? -i / r + "px" : "", n.style.zoom = r || "", t.__repositionScrollbars(), o || t.triggerScrollEvent()
                }
            },
            setDimensions: function (e, t, n, i, r) {
                var o = this;
                (e || t || n || i) && (e === +e && (o.__clientWidth = e), t === +t && (o.__clientHeight = t), n === +n && (o.__contentWidth = n), i === +i && (o.__contentHeight = i), o.__computeScrollMax(), o.__resizeScrollbars(), r || o.scrollTo(o.__scrollLeft, o.__scrollTop, !0, null, !0))
            },
            setPosition: function (e, t) {
                this.__clientLeft = e || 0, this.__clientTop = t || 0
            },
            setSnapSize: function (e, t) {
                this.__snapWidth = e, this.__snapHeight = t
            },
            activatePullToRefresh: function (t, n) {
                var i = this;
                i.__refreshHeight = t, i.__refreshActivate = function () {
                    e.requestAnimationFrame(n.activate)
                }, i.__refreshDeactivate = function () {
                    e.requestAnimationFrame(n.deactivate)
                }, i.__refreshStart = function () {
                    e.requestAnimationFrame(n.start)
                }, i.__refreshShow = function () {
                    e.requestAnimationFrame(n.show)
                }, i.__refreshHide = function () {
                    e.requestAnimationFrame(n.hide)
                }, i.__refreshTail = function () {
                    e.requestAnimationFrame(n.tail)
                }, i.__refreshTailTime = 100, i.__minSpinTime = 600
            },
            triggerPullToRefresh: function () {
                this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, !0);
                var e = new Date;
                this.refreshStartTime = e.getTime(), this.__refreshStart && this.__refreshStart()
            },
            finishPullToRefresh: function () {
                var e = this, t = new Date, n = 0;
                e.refreshStartTime + e.__minSpinTime > t.getTime() && (n = e.refreshStartTime + e.__minSpinTime - t.getTime()), setTimeout(function () {
                    e.__refreshTail && e.__refreshTail(), setTimeout(function () {
                        e.__refreshActive = !1, e.__refreshDeactivate && e.__refreshDeactivate(), e.__refreshHide && e.__refreshHide(), e.scrollTo(e.__scrollLeft, e.__scrollTop, !0)
                    }, e.__refreshTailTime)
                }, n)
            },
            getValues: function () {
                return {left: this.__scrollLeft, top: this.__scrollTop, zoom: this.__zoomLevel}
            },
            getScrollMax: function () {
                return {left: this.__maxScrollLeft, top: this.__maxScrollTop}
            },
            zoomTo: function (e, t, n, i) {
                var r = this;
                if (!r.options.zooming)throw new Error("Zooming is not enabled!");
                r.__isDecelerating && (pe.effect.Animate.stop(r.__isDecelerating), r.__isDecelerating = !1);
                var o = r.__zoomLevel;
                null == n && (n = r.__clientWidth / 2), null == i && (i = r.__clientHeight / 2), e = Math.max(Math.min(e, r.options.maxZoom), r.options.minZoom), r.__computeScrollMax(e);
                var a = (n + r.__scrollLeft) * e / o - n, s = (i + r.__scrollTop) * e / o - i;
                a > r.__maxScrollLeft ? a = r.__maxScrollLeft : a < 0 && (a = 0), s > r.__maxScrollTop ? s = r.__maxScrollTop : s < 0 && (s = 0), r.__publish(a, s, e, t)
            },
            zoomBy: function (e, t, n, i) {
                this.zoomTo(this.__zoomLevel * e, t, n, i)
            },
            scrollTo: function (e, t, n, i, r) {
                var o = this;
                if (o.__isDecelerating && (pe.effect.Animate.stop(o.__isDecelerating), o.__isDecelerating = !1), null != i && i !== o.__zoomLevel) {
                    if (!o.options.zooming)throw new Error("Zooming is not enabled!");
                    e *= i, t *= i, o.__computeScrollMax(i)
                } else i = o.__zoomLevel;
                o.options.scrollingX ? o.options.paging ? e = Math.round(e / o.__clientWidth) * o.__clientWidth : o.options.snapping && (e = Math.round(e / o.__snapWidth) * o.__snapWidth) : e = o.__scrollLeft, o.options.scrollingY ? o.options.paging ? t = Math.round(t / o.__clientHeight) * o.__clientHeight : o.options.snapping && (t = Math.round(t / o.__snapHeight) * o.__snapHeight) : t = o.__scrollTop, e = Math.max(Math.min(o.__maxScrollLeft, e), 0), t = Math.max(Math.min(o.__maxScrollTop, t), 0), e === o.__scrollLeft && t === o.__scrollTop && (n = !1), o.__publish(e, t, i, n, r)
            },
            scrollBy: function (e, t, n) {
                var i = this, r = i.__isAnimating ? i.__scheduledLeft : i.__scrollLeft, o = i.__isAnimating ? i.__scheduledTop : i.__scrollTop;
                i.scrollTo(r + (e || 0), o + (t || 0), n)
            },
            doMouseZoom: function (e, t, n, i) {
                var r = e > 0 ? .97 : 1.03;
                return this.zoomTo(this.__zoomLevel * r, !1, n - this.__clientLeft, i - this.__clientTop)
            },
            doTouchStart: function (e, t) {
                var n = this;
                n.__decStopped = !(!n.__isDecelerating && !n.__isAnimating), n.hintResize(), t instanceof Date && (t = t.valueOf()), "number" != typeof t && (t = Date.now()), n.__interruptedAnimation = !0, n.__isDecelerating && (pe.effect.Animate.stop(n.__isDecelerating), n.__isDecelerating = !1, n.__interruptedAnimation = !0), n.__isAnimating && (pe.effect.Animate.stop(n.__isAnimating), n.__isAnimating = !1, n.__interruptedAnimation = !0);
                var i, r, o = 1 === e.length;
                o ? (i = e[0].pageX, r = e[0].pageY) : (i = Math.abs(e[0].pageX + e[1].pageX) / 2, r = Math.abs(e[0].pageY + e[1].pageY) / 2), n.__initialTouchLeft = i, n.__initialTouchTop = r, n.__initialTouches = e, n.__zoomLevelStart = n.__zoomLevel, n.__lastTouchLeft = i, n.__lastTouchTop = r, n.__lastTouchMove = t, n.__lastScale = 1, n.__enableScrollX = !o && n.options.scrollingX, n.__enableScrollY = !o && n.options.scrollingY, n.__isTracking = !0, n.__didDecelerationComplete = !1, n.__isDragging = !o, n.__isSingleTouch = o, n.__positions = []
            },
            doTouchMove: function (e, t, n) {
                t instanceof Date && (t = t.valueOf()), "number" != typeof t && (t = Date.now());
                var i = this;
                if (i.__isTracking) {
                    var r, o;
                    2 === e.length ? (r = Math.abs(e[0].pageX + e[1].pageX) / 2, o = Math.abs(e[0].pageY + e[1].pageY) / 2, !n && i.options.zooming && (n = i.__getScale(i.__initialTouches, e))) : (r = e[0].pageX, o = e[0].pageY);
                    var a = i.__positions;
                    if (i.__isDragging) {
                        i.__decStopped = !1;
                        var s = r - i.__lastTouchLeft, c = o - i.__lastTouchTop, l = i.__scrollLeft, u = i.__scrollTop, f = i.__zoomLevel;
                        if (null != n && i.options.zooming) {
                            var d = f;
                            if (f = f / i.__lastScale * n, f = Math.max(Math.min(f, i.options.maxZoom), i.options.minZoom), d !== f) {
                                var p = r - i.__clientLeft, h = o - i.__clientTop;
                                l = (p + l) * f / d - p, u = (h + u) * f / d - h, i.__computeScrollMax(f)
                            }
                        }
                        if (i.__enableScrollX) {
                            l -= s * i.options.speedMultiplier;
                            var m = i.__maxScrollLeft;
                            (l > m || l < 0) && (i.options.bouncing ? l += s / 2 * i.options.speedMultiplier : l = l > m ? m : 0)
                        }
                        if (i.__enableScrollY) {
                            u -= c * i.options.speedMultiplier;
                            var v = i.__maxScrollTop;
                            u > v || u < 0 ? i.options.bouncing || i.__refreshHeight && u < 0 ? (u += c / 2 * i.options.speedMultiplier, i.__enableScrollX || null == i.__refreshHeight || (u < 0 ? (i.__refreshHidden = !1, i.__refreshShow()) : (i.__refreshHide(), i.__refreshHidden = !0), !i.__refreshActive && u <= -i.__refreshHeight ? (i.__refreshActive = !0, i.__refreshActivate && i.__refreshActivate()) : i.__refreshActive && u > -i.__refreshHeight && (i.__refreshActive = !1, i.__refreshDeactivate && i.__refreshDeactivate()))) : u = u > v ? v : 0 : i.__refreshHeight && !i.__refreshHidden && (i.__refreshHide(), i.__refreshHidden = !0)
                        }
                        a.length > 60 && a.splice(0, 30), a.push(l, u, t), i.__publish(l, u, f)
                    } else {
                        var g = i.options.locking ? 3 : 0, $ = 5, y = Math.abs(r - i.__initialTouchLeft), w = Math.abs(o - i.__initialTouchTop);
                        i.__enableScrollX = i.options.scrollingX && y >= g, i.__enableScrollY = i.options.scrollingY && w >= g, a.push(i.__scrollLeft, i.__scrollTop, t), i.__isDragging = (i.__enableScrollX || i.__enableScrollY) && (y >= $ || w >= $), i.__isDragging && (i.__interruptedAnimation = !1, i.__fadeScrollbars("in"))
                    }
                    i.__lastTouchLeft = r, i.__lastTouchTop = o, i.__lastTouchMove = t, i.__lastScale = n
                }
            },
            doTouchEnd: function (t, n) {
                n instanceof Date && (n = n.valueOf()), "number" != typeof n && (n = Date.now());
                var i = this;
                if (i.__isTracking) {
                    if (i.__isTracking = !1, i.__isDragging)if (i.__isDragging = !1, i.__isSingleTouch && i.options.animating && n - i.__lastTouchMove <= 100) {
                        for (var r = i.__positions, o = r.length - 1, a = o, s = o; s > 0 && r[s] > i.__lastTouchMove - 100; s -= 3)a = s;
                        if (a !== o) {
                            var c = r[o] - r[a], l = i.__scrollLeft - r[a - 2], u = i.__scrollTop - r[a - 1];
                            i.__decelerationVelocityX = l / c * (1e3 / 60), i.__decelerationVelocityY = u / c * (1e3 / 60);
                            var f = i.options.paging || i.options.snapping ? i.options.decelVelocityThresholdPaging : i.options.decelVelocityThreshold;
                            (Math.abs(i.__decelerationVelocityX) > f || Math.abs(i.__decelerationVelocityY) > f) && (i.__refreshActive || i.__startDeceleration(n))
                        } else i.__scrollingComplete()
                    } else n - i.__lastTouchMove > 100 && i.__scrollingComplete(); else i.__decStopped && (t.isTapHandled = !0, i.__decStopped = !1);
                    if (!i.__isDecelerating)if (i.__refreshActive && i.__refreshStart) {
                        i.__publish(i.__scrollLeft, -i.__refreshHeight, i.__zoomLevel, !0);
                        var d = new Date;
                        i.refreshStartTime = d.getTime(), i.__refreshStart && i.__refreshStart(), e.Platform.isAndroid() || i.__startDeceleration()
                    } else(i.__interruptedAnimation || i.__isDragging) && i.__scrollingComplete(), i.scrollTo(i.__scrollLeft, i.__scrollTop, !0, i.__zoomLevel), i.__refreshActive && (i.__refreshActive = !1, i.__refreshDeactivate && i.__refreshDeactivate());
                    i.__positions.length = 0
                }
            },
            __publish: function (e, t, r, o, a) {
                var s = this, c = s.__isAnimating;
                if (c && (pe.effect.Animate.stop(c), s.__isAnimating = !1), o && s.options.animating) {
                    s.__scheduledLeft = e, s.__scheduledTop = t, s.__scheduledZoom = r;
                    var l = s.__scrollLeft, u = s.__scrollTop, f = s.__zoomLevel, d = e - l, p = t - u, h = r - f, m = function (e, t, n) {
                        n && (s.__scrollLeft = l + d * e, s.__scrollTop = u + p * e, s.__zoomLevel = f + h * e, s.__callback && s.__callback(s.__scrollLeft, s.__scrollTop, s.__zoomLevel, a))
                    }, v = function (e) {
                        return s.__isAnimating === e
                    }, g = function (e, t, n) {
                        t === s.__isAnimating && (s.__isAnimating = !1), (s.__didDecelerationComplete || n) && s.__scrollingComplete(), s.options.zooming && s.__computeScrollMax()
                    };
                    s.__isAnimating = pe.effect.Animate.start(m, v, g, s.options.animationDuration, c ? n : i)
                } else s.__scheduledLeft = s.__scrollLeft = e, s.__scheduledTop = s.__scrollTop = t, s.__scheduledZoom = s.__zoomLevel = r, s.__callback && s.__callback(e, t, r, a), s.options.zooming && s.__computeScrollMax()
            },
            __computeScrollMax: function (e) {
                var t = this;
                null == e && (e = t.__zoomLevel), t.__maxScrollLeft = Math.max(t.__contentWidth * e - t.__clientWidth, 0), t.__maxScrollTop = Math.max(t.__contentHeight * e - t.__clientHeight, 0), t.__didWaitForSize || t.__maxScrollLeft || t.__maxScrollTop || (t.__didWaitForSize = !0, t.__waitForSize())
            },
            __waitForSize: function () {
                var e = this;
                clearTimeout(e.__sizerTimeout);
                var t = function () {
                    e.resize(!0)
                };
                t(), e.__sizerTimeout = setTimeout(t, 500)
            },
            __startDeceleration: function () {
                var e = this;
                if (e.options.paging) {
                    var t = Math.max(Math.min(e.__scrollLeft, e.__maxScrollLeft), 0), n = Math.max(Math.min(e.__scrollTop, e.__maxScrollTop), 0), i = e.__clientWidth, r = e.__clientHeight;
                    e.__minDecelerationScrollLeft = Math.floor(t / i) * i, e.__minDecelerationScrollTop = Math.floor(n / r) * r, e.__maxDecelerationScrollLeft = Math.ceil(t / i) * i, e.__maxDecelerationScrollTop = Math.ceil(n / r) * r
                } else e.__minDecelerationScrollLeft = 0, e.__minDecelerationScrollTop = 0, e.__maxDecelerationScrollLeft = e.__maxScrollLeft, e.__maxDecelerationScrollTop = e.__maxScrollTop, e.__refreshActive && (e.__minDecelerationScrollTop = e.__refreshHeight * -1);
                var o = function (t, n, i) {
                    e.__stepThroughDeceleration(i)
                };
                e.__minVelocityToKeepDecelerating = e.options.snapping ? 4 : .1;
                var a = function () {
                    var t = Math.abs(e.__decelerationVelocityX) >= e.__minVelocityToKeepDecelerating || Math.abs(e.__decelerationVelocityY) >= e.__minVelocityToKeepDecelerating;
                    return t || (e.__didDecelerationComplete = !0, e.options.bouncing && !e.__refreshActive && e.scrollTo(Math.min(Math.max(e.__scrollLeft, 0), e.__maxScrollLeft), Math.min(Math.max(e.__scrollTop, 0), e.__maxScrollTop), e.__refreshActive)), t
                }, s = function () {
                    e.__isDecelerating = !1, e.__didDecelerationComplete && e.__scrollingComplete(), e.options.paging && e.scrollTo(e.__scrollLeft, e.__scrollTop, e.options.snapping)
                };
                e.__isDecelerating = pe.effect.Animate.start(o, a, s)
            },
            __stepThroughDeceleration: function (e) {
                var t = this, n = t.__scrollLeft + t.__decelerationVelocityX, i = t.__scrollTop + t.__decelerationVelocityY;
                if (!t.options.bouncing) {
                    var r = Math.max(Math.min(t.__maxDecelerationScrollLeft, n), t.__minDecelerationScrollLeft);
                    r !== n && (n = r, t.__decelerationVelocityX = 0);
                    var o = Math.max(Math.min(t.__maxDecelerationScrollTop, i), t.__minDecelerationScrollTop);
                    o !== i && (i = o, t.__decelerationVelocityY = 0)
                }
                if (e ? t.__publish(n, i, t.__zoomLevel) : (t.__scrollLeft = n, t.__scrollTop = i), !t.options.paging) {
                    var a = t.options.deceleration;
                    t.__decelerationVelocityX *= a, t.__decelerationVelocityY *= a
                }
                if (t.options.bouncing) {
                    var s = 0, c = 0, l = t.options.penetrationDeceleration, u = t.options.penetrationAcceleration;
                    if (n < t.__minDecelerationScrollLeft ? s = t.__minDecelerationScrollLeft - n : n > t.__maxDecelerationScrollLeft && (s = t.__maxDecelerationScrollLeft - n), i < t.__minDecelerationScrollTop ? c = t.__minDecelerationScrollTop - i : i > t.__maxDecelerationScrollTop && (c = t.__maxDecelerationScrollTop - i), 0 !== s) {
                        var f = s * t.__decelerationVelocityX <= t.__minDecelerationScrollLeft;
                        f && (t.__decelerationVelocityX += s * l);
                        var d = Math.abs(t.__decelerationVelocityX) <= t.__minVelocityToKeepDecelerating;
                        f && !d || (t.__decelerationVelocityX = s * u)
                    }
                    if (0 !== c) {
                        var p = c * t.__decelerationVelocityY <= t.__minDecelerationScrollTop;
                        p && (t.__decelerationVelocityY += c * l);
                        var h = Math.abs(t.__decelerationVelocityY) <= t.__minVelocityToKeepDecelerating;
                        p && !h || (t.__decelerationVelocityY = c * u)
                    }
                }
            },
            __getDistance: function (e, t) {
                var n = t.pageX - e.pageX, i = t.pageY - e.pageY;
                return Math.sqrt(n * n + i * i)
            },
            __getScale: function (e, t) {
                return e.length >= 2 && t.length >= 2 ? this.__getDistance(t[0], t[1]) / this.__getDistance(e[0], e[1]) : 1
            }
        }), e.scroll = {isScrolling: !1, lastTop: 0}
    }(ionic), function (e) {
        var t = function () {
        }, n = function (e) {
        };
        e.views.ScrollNative = e.views.View.inherit({
            initialize: function (n) {
                var i = this;
                i.__container = i.el = n.el, i.__content = n.el.firstElementChild, i.isNative = !0, i.__scrollTop = i.el.scrollTop, i.__scrollLeft = i.el.scrollLeft, i.__clientHeight = i.__content.clientHeight, i.__clientWidth = i.__content.clientWidth, i.__maxScrollTop = Math.max(i.__contentHeight - i.__clientHeight, 0), i.__maxScrollLeft = Math.max(i.__contentWidth - i.__clientWidth, 0), i.options = {
                    freeze: !1,
                    getContentWidth: function () {
                        return Math.max(i.__content.scrollWidth, i.__content.offsetWidth)
                    },
                    getContentHeight: function () {
                        return Math.max(i.__content.scrollHeight, i.__content.offsetHeight + 2 * i.__content.offsetTop)
                    }
                };
                for (var r in n)i.options[r] = n[r];
                i.onScroll = function () {
                    e.scroll.isScrolling || (e.scroll.isScrolling = !0), clearTimeout(i.scrollTimer), i.scrollTimer = setTimeout(function () {
                        e.scroll.isScrolling = !1
                    }, 80)
                }, i.freeze = t, i.__initEventHandlers()
            }, __callback: function () {
                n("__callback")
            }, zoomTo: function () {
                n("zoomTo")
            }, zoomBy: function () {
                n("zoomBy")
            }, activatePullToRefresh: function () {
                n("activatePullToRefresh")
            }, resize: function (e) {
                var t = this;
                t.__container && t.options && t.setDimensions(t.__container.clientWidth, t.__container.clientHeight, t.options.getContentWidth(), t.options.getContentHeight(), e)
            }, run: function () {
                this.resize()
            }, getValues: function () {
                var e = this;
                return e.update(), {left: e.__scrollLeft, top: e.__scrollTop, zoom: 1}
            }, update: function () {
                var e = this;
                e.__scrollLeft = e.el.scrollLeft, e.__scrollTop = e.el.scrollTop
            }, setDimensions: function (e, t, n, i) {
                var r = this;
                (e || t || n || i) && (e === +e && (r.__clientWidth = e), t === +t && (r.__clientHeight = t), n === +n && (r.__contentWidth = n), i === +i && (r.__contentHeight = i), r.__computeScrollMax())
            }, getScrollMax: function () {
                return {left: this.__maxScrollLeft, top: this.__maxScrollTop}
            }, scrollBy: function (e, t, n) {
                var i = this;
                i.update();
                var r = i.__isAnimating ? i.__scheduledLeft : i.__scrollLeft, o = i.__isAnimating ? i.__scheduledTop : i.__scrollTop;
                i.scrollTo(r + (e || 0), o + (t || 0), n)
            }, scrollTo: function (t, n, i) {
                function r(t, n) {
                    function i(e) {
                        return --e * e * e + 1
                    }

                    function r() {
                        var u = Date.now(), f = Math.min(1, (u - a) / s), d = i(f);
                        c != t && (o.el.scrollTop = parseInt(d * (t - c) + c, 10)), l != n && (o.el.scrollLeft = parseInt(d * (n - l) + l, 10)), f < 1 ? e.requestAnimationFrame(r) : (e.tap.removeClonedInputs(o.__container, o), o.resize())
                    }

                    var a = Date.now(), s = 250, c = o.el.scrollTop, l = o.el.scrollLeft;
                    return c === t && l === n ? void o.resize() : void e.requestAnimationFrame(r)
                }

                var o = this;
                return i ? void r(n, t) : (o.el.scrollTop = n, o.el.scrollLeft = t, void o.resize())
            }, __waitForSize: function () {
                var e = this;
                clearTimeout(e.__sizerTimeout);
                var t = function () {
                    e.resize(!0)
                };
                t(), e.__sizerTimeout = setTimeout(t, 500)
            }, __computeScrollMax: function () {
                var e = this;
                e.__maxScrollLeft = Math.max(e.__contentWidth - e.__clientWidth, 0), e.__maxScrollTop = Math.max(e.__contentHeight - e.__clientHeight, 0), e.__didWaitForSize || e.__maxScrollLeft || e.__maxScrollTop || (e.__didWaitForSize = !0, e.__waitForSize())
            }, __initEventHandlers: function () {
                var t, n = this, i = n.__container;
                n.scrollChildIntoView = function (r) {
                    var o = i.getBoundingClientRect().bottom;
                    t = i.offsetHeight;
                    var a = n.isShrunkForKeyboard, s = i.parentNode.classList.contains("modal"), c = s && window.innerWidth >= 680;
                    if (!a) {
                        if (e.Platform.isIOS() || e.Platform.isFullScreen || c) {
                            var l = r.detail.viewportHeight - o, u = Math.max(0, r.detail.keyboardHeight - l);
                            e.requestAnimationFrame(function () {
                                t -= u, i.style.height = t + "px", n.resize()
                            })
                        }
                        n.isShrunkForKeyboard = !0
                    }
                    r.detail.isElementUnderKeyboard && e.requestAnimationFrame(function () {
                        n.isShrunkForKeyboard && !a && (o = i.getBoundingClientRect().bottom);
                        var s = .5 * t, c = (r.detail.elementBottom + r.detail.elementTop) / 2, l = c - o, u = l + s;
                        u > 0 && (e.Platform.isIOS() ? setTimeout(function () {
                            e.tap.cloneFocusedInput(i, n), n.scrollBy(0, u, !0), n.onScroll()
                        }, 32) : (n.scrollBy(0, u, !0), n.onScroll()))
                    }), r.stopPropagation()
                }, n.resetScrollView = function () {
                    n.isShrunkForKeyboard && (n.isShrunkForKeyboard = !1, i.style.height = ""), n.resize()
                }, i.addEventListener("scroll", n.onScroll), i.addEventListener("scrollChildIntoView", n.scrollChildIntoView), document.addEventListener("resetScrollView", n.resetScrollView)
            }, __cleanup: function () {
                var n = this, i = n.__container;
                i.removeEventListener("resetScrollView", n.resetScrollView), i.removeEventListener("scroll", n.onScroll), i.removeEventListener("scrollChildIntoView", n.scrollChildIntoView), i.removeEventListener("resetScrollView", n.resetScrollView), e.tap.removeClonedInputs(i, n), delete n.__container, delete n.__content, delete n.__indicatorX, delete n.__indicatorY, delete n.options.el, n.resize = n.scrollTo = n.onScroll = n.resetScrollView = t, n.scrollChildIntoView = t, i = null
            }
        })
    }(ionic), function (e) {
        "use strict";
        var t = "item", n = "item-content", i = "item-sliding", r = "item-options", o = "item-placeholder", a = "item-reordering", s = "item-reorder", c = function () {
        };
        c.prototype = {
            start: function () {
            }, drag: function () {
            }, end: function () {
            }, isSameItem: function () {
                return !1
            }
        };
        var l = function (e) {
            this.dragThresholdX = e.dragThresholdX || 10, this.el = e.el, this.item = e.item, this.canSwipe = e.canSwipe
        };
        l.prototype = new c, l.prototype.start = function (o) {
            var a, s, c, l;
            this.canSwipe() && (a = o.target.classList.contains(n) ? o.target : o.target.classList.contains(t) ? o.target.querySelector("." + n) : e.DomUtil.getParentWithClass(o.target, n), a && (a.classList.remove(i), c = parseFloat(a.style[e.CSS.TRANSFORM].replace("translate3d(", "").split(",")[0]) || 0, s = a.parentNode.querySelector("." + r), s && (s.classList.remove("invisible"), l = s.offsetWidth, this._currentDrag = {
                buttons: s,
                buttonsWidth: l,
                content: a,
                startOffsetX: c
            })))
        }, l.prototype.isSameItem = function (e) {
            return !(!e._lastDrag || !this._currentDrag) && this._currentDrag.content == e._lastDrag.content
        }, l.prototype.clean = function (t) {
            function n() {
                i.buttons && i.buttons.classList.add("invisible")
            }

            var i = this._lastDrag;
            i && i.content && (i.content.style[e.CSS.TRANSITION] = "", i.content.style[e.CSS.TRANSFORM] = "", t ? (i.content.style[e.CSS.TRANSITION] = "none", n(), e.requestAnimationFrame(function () {
                i.content.style[e.CSS.TRANSITION] = ""
            })) : e.requestAnimationFrame(function () {
                setTimeout(n, 250)
            }))
        }, l.prototype.drag = e.animationFrameThrottle(function (t) {
            var n;
            if (this._currentDrag && (!this._isDragging && (Math.abs(t.gesture.deltaX) > this.dragThresholdX || Math.abs(this._currentDrag.startOffsetX) > 0) && (this._isDragging = !0), this._isDragging)) {
                n = this._currentDrag.buttonsWidth;
                var i = Math.min(0, this._currentDrag.startOffsetX + t.gesture.deltaX);
                i < -n && (i = Math.min(-n, -n + .4 * (t.gesture.deltaX + n))), this._currentDrag.content.$$ionicOptionsOpen = 0 !== i, this._currentDrag.content.style[e.CSS.TRANSFORM] = "translate3d(" + i + "px, 0, 0)", this._currentDrag.content.style[e.CSS.TRANSITION] = "none"
            }
        }), l.prototype.end = function (t, n) {
            var i = this;
            if (!i._currentDrag)return void(n && n());
            var r = -i._currentDrag.buttonsWidth;
            t.gesture.deltaX > -(i._currentDrag.buttonsWidth / 2) && ("left" == t.gesture.direction && Math.abs(t.gesture.velocityX) < .3 ? r = 0 : "right" == t.gesture.direction && (r = 0)), e.requestAnimationFrame(function () {
                if (0 === r) {
                    i._currentDrag.content.style[e.CSS.TRANSFORM] = "";
                    var t = i._currentDrag.buttons;
                    setTimeout(function () {
                        t && t.classList.add("invisible")
                    }, 250)
                } else i._currentDrag.content.style[e.CSS.TRANSFORM] = "translate3d(" + r + "px,0,0)";
                i._currentDrag.content.style[e.CSS.TRANSITION] = "", i._lastDrag || (i._lastDrag = {}), e.extend(i._lastDrag, i._currentDrag), i._currentDrag && (i._currentDrag.buttons = null, i._currentDrag.content = null), i._currentDrag = null, n && n()
            })
        };
        var u = function (e) {
            var t = this;
            if (t.dragThresholdY = e.dragThresholdY || 0, t.onReorder = e.onReorder, t.listEl = e.listEl, t.el = t.item = e.el, t.scrollEl = e.scrollEl, t.scrollView = e.scrollView, t.listElTrueTop = 0, t.listEl.offsetParent) {
                var n = t.listEl;
                do t.listElTrueTop += n.offsetTop, n = n.offsetParent; while (n)
            }
        };
        u.prototype = new c, u.prototype._moveElement = function (t) {
            var n = t.gesture.center.pageY + this.scrollView.getValues().top - this._currentDrag.elementHeight / 2 - this.listElTrueTop;
            this.el.style[e.CSS.TRANSFORM] = "translate3d(0, " + n + "px, 0)"
        }, u.prototype.deregister = function () {
            this.listEl = this.el = this.scrollEl = this.scrollView = null
        }, u.prototype.start = function (t) {
            var n = e.DomUtil.getChildIndex(this.el, this.el.nodeName.toLowerCase()), i = this.el.scrollHeight, r = this.el.cloneNode(!0);
            r.classList.add(o), this.el.parentNode.insertBefore(r, this.el), this.el.classList.add(a), this._currentDrag = {
                elementHeight: i,
                startIndex: n,
                placeholder: r,
                scrollHeight: scroll,
                list: r.parentNode
            }, this._moveElement(t)
        }, u.prototype.drag = e.animationFrameThrottle(function (t) {
            var n = this;
            if (this._currentDrag) {
                var i = 0, r = t.gesture.center.pageY, o = this.listElTrueTop;
                if (this.scrollView) {
                    var a = this.scrollView.__container;
                    i = this.scrollView.getValues().top;
                    var s = a.offsetTop, c = s - r + this._currentDrag.elementHeight / 2, l = r + this._currentDrag.elementHeight / 2 - s - a.offsetHeight;
                    t.gesture.deltaY < 0 && c > 0 && i > 0 && (this.scrollView.scrollBy(null, -c), e.requestAnimationFrame(function () {
                        n.drag(t)
                    })), t.gesture.deltaY > 0 && l > 0 && i < this.scrollView.getScrollMax().top && (this.scrollView.scrollBy(null, l), e.requestAnimationFrame(function () {
                        n.drag(t)
                    }))
                }
                !this._isDragging && Math.abs(t.gesture.deltaY) > this.dragThresholdY && (this._isDragging = !0), this._isDragging && (this._moveElement(t), this._currentDrag.currentY = i + r - o)
            }
        }), u.prototype._getReorderIndex = function () {
            for (var e, t = this, n = Array.prototype.slice.call(t._currentDrag.placeholder.parentNode.children).filter(function (e) {
                return e.nodeName === t.el.nodeName && e !== t.el
            }), i = t._currentDrag.currentY, r = 0, o = n.length; r < o; r++)if (e = n[r], r === o - 1) {
                if (i > e.offsetTop)return r
            } else if (0 === r) {
                if (i < e.offsetTop + e.offsetHeight)return r
            } else if (i > e.offsetTop - e.offsetHeight / 2 && i < e.offsetTop + e.offsetHeight)return r;
            return t._currentDrag.startIndex
        }, u.prototype.end = function (t, n) {
            if (!this._currentDrag)return void(n && n());
            var i = this._currentDrag.placeholder, r = this._getReorderIndex();
            this.el.classList.remove(a), this.el.style[e.CSS.TRANSFORM] = "", i.parentNode.insertBefore(this.el, i), i.parentNode.removeChild(i), this.onReorder && this.onReorder(this.el, this._currentDrag.startIndex, r), this._currentDrag = {
                placeholder: null,
                content: null
            }, this._currentDrag = null, n && n()
        }, e.views.ListView = e.views.View.inherit({
            initialize: function (t) {
                var n = this;
                t = e.extend({
                    onReorder: function () {
                    }, virtualRemoveThreshold: -200, virtualAddThreshold: 200, canSwipe: function () {
                        return !0
                    }
                }, t), e.extend(n, t), !n.itemHeight && n.listEl && (n.itemHeight = n.listEl.children[0] && parseInt(n.listEl.children[0].style.height, 10)), n.onRefresh = t.onRefresh || function () {
                    }, n.onRefreshOpening = t.onRefreshOpening || function () {
                    }, n.onRefreshHolding = t.onRefreshHolding || function () {
                    };
                var i = {};
                e.DomUtil.getParentOrSelfWithClass(n.el, "overflow-scroll") && (i.prevent_default_directions = ["left", "right"]), window.ionic.onGesture("release", function (e) {
                    n._handleEndDrag(e)
                }, n.el, i), window.ionic.onGesture("drag", function (e) {
                    n._handleDrag(e)
                }, n.el, i), n._initDrag()
            }, deregister: function () {
                this.el = this.listEl = this.scrollEl = this.scrollView = null, this.isScrollFreeze && self.scrollView.freeze(!1)
            }, stopRefreshing: function () {
                var e = this.el.querySelector(".list-refresher");
                e.style.height = "0"
            }, didScroll: function (e) {
                var t = this;
                if (t.isVirtual) {
                    var n = t.itemHeight, i = e.target.scrollHeight, r = t.el.parentNode.offsetHeight, o = Math.max(0, e.scrollTop + t.virtualRemoveThreshold), a = Math.min(i, Math.abs(e.scrollTop) + r + t.virtualAddThreshold), s = parseInt(Math.abs(o / n), 10), c = parseInt(Math.abs(a / n), 10);
                    t._virtualItemsToRemove = Array.prototype.slice.call(t.listEl.children, 0, s), t.renderViewport && t.renderViewport(o, a, s, c)
                }
            }, didStopScrolling: function () {
                if (this.isVirtual)for (var e = 0; e < this._virtualItemsToRemove.length; e++)this.didHideItem && this.didHideItem(e)
            }, clearDragEffects: function (e) {
                this._lastDragOp && (this._lastDragOp.clean && this._lastDragOp.clean(e), this._lastDragOp.deregister && this._lastDragOp.deregister(), this._lastDragOp = null)
            }, _initDrag: function () {
                this._lastDragOp && this._lastDragOp.deregister && this._lastDragOp.deregister(), this._lastDragOp = this._dragOp, this._dragOp = null
            }, _getItem: function (e) {
                for (; e;) {
                    if (e.classList && e.classList.contains(t))return e;
                    e = e.parentNode
                }
                return null
            }, _startDrag: function (t) {
                var n = this;
                n._isDragging = !1;
                var i, r = n._lastDragOp;
                n._didDragUpOrDown && r instanceof l && r.clean && r.clean(), !e.DomUtil.getParentOrSelfWithClass(t.target, s) || "up" != t.gesture.direction && "down" != t.gesture.direction ? !n._didDragUpOrDown && ("left" == t.gesture.direction || "right" == t.gesture.direction) && Math.abs(t.gesture.deltaX) > 5 && (i = n._getItem(t.target), i && i.querySelector(".item-options") && (n._dragOp = new l({
                    el: n.el,
                    item: i,
                    canSwipe: n.canSwipe
                }), n._dragOp.start(t), t.preventDefault(), n.isScrollFreeze = n.scrollView.freeze(!0))) : (i = n._getItem(t.target), i && (n._dragOp = new u({
                    listEl: n.el,
                    el: i,
                    scrollEl: n.scrollEl,
                    scrollView: n.scrollView,
                    onReorder: function (e, t, i) {
                        n.onReorder && n.onReorder(e, t, i)
                    }
                }), n._dragOp.start(t), t.preventDefault())), r && n._dragOp && !n._dragOp.isSameItem(r) && t.defaultPrevented && r.clean && r.clean()
            }, _handleEndDrag: function (e) {
                var t = this;
                t.scrollView && (t.isScrollFreeze = t.scrollView.freeze(!1)), t._didDragUpOrDown = !1, t._dragOp && t._dragOp.end(e, function () {
                    t._initDrag()
                })
            }, _handleDrag: function (e) {
                var t = this;
                Math.abs(e.gesture.deltaY) > 5 && (t._didDragUpOrDown = !0), t.isDragging || t._dragOp || t._startDrag(e), t._dragOp && (e.gesture.srcEvent.preventDefault(), t._dragOp.drag(e))
            }
        })
    }(ionic), function (e) {
        "use strict";
        e.views.Modal = e.views.View.inherit({
            initialize: function (t) {
                t = e.extend({
                    focusFirstInput: !1,
                    unfocusOnHide: !0,
                    focusFirstDelay: 600,
                    backdropClickToClose: !0,
                    hardwareBackButtonClose: !0
                }, t), e.extend(this, t), this.el = t.el
            }, show: function () {
                var e = this;
                e.focusFirstInput && window.setTimeout(function () {
                    var t = e.el.querySelector("input, textarea");
                    t && t.focus && t.focus()
                }, e.focusFirstDelay)
            }, hide: function () {
                if (this.unfocusOnHide) {
                    var e = this.el.querySelectorAll("input, textarea");
                    window.setTimeout(function () {
                        for (var t = 0; t < e.length; t++)e[t].blur && e[t].blur()
                    })
                }
            }
        })
    }(ionic), function (e) {
        "use strict";
        e.views.SideMenu = e.views.View.inherit({
            initialize: function (e) {
                this.el = e.el, this.isEnabled = "undefined" == typeof e.isEnabled || e.isEnabled, this.setWidth(e.width)
            }, getFullWidth: function () {
                return this.width
            }, setWidth: function (e) {
                this.width = e, this.el.style.width = e + "px"
            }, setIsEnabled: function (e) {
                this.isEnabled = e
            }, bringUp: function () {
                "0" !== this.el.style.zIndex && (this.el.style.zIndex = "0")
            }, pushDown: function () {
                "-1" !== this.el.style.zIndex && (this.el.style.zIndex = "-1")
            }
        }), e.views.SideMenuContent = e.views.View.inherit({
            initialize: function (t) {
                e.extend(this, {
                    animationClass: "menu-animated", onDrag: function () {
                    }, onEndDrag: function () {
                    }
                }, t), e.onGesture("drag", e.proxy(this._onDrag, this), this.el), e.onGesture("release", e.proxy(this._onEndDrag, this), this.el)
            }, _onDrag: function (e) {
                this.onDrag && this.onDrag(e)
            }, _onEndDrag: function (e) {
                this.onEndDrag && this.onEndDrag(e)
            }, disableAnimation: function () {
                this.el.classList.remove(this.animationClass)
            }, enableAnimation: function () {
                this.el.classList.add(this.animationClass)
            }, getTranslateX: function () {
                return parseFloat(this.el.style[e.CSS.TRANSFORM].replace("translate3d(", "").split(",")[0])
            }, setTranslateX: e.animationFrameThrottle(function (t) {
                this.el.style[e.CSS.TRANSFORM] = "translate3d(" + t + "px, 0, 0)"
            })
        })
    }(ionic), function (e) {
        "use strict";
        e.views.Slider = e.views.View.inherit({
            initialize: function (e) {
                function t() {
                    if (m.offsetWidth) {
                        v = w.children, y = v.length, v.length < 2 && (e.continuous = !1), h.transitions && e.continuous && v.length < 3 && (w.appendChild(v[0].cloneNode(!0)), w.appendChild(w.children[1].cloneNode(!0)), v = w.children), g = new Array(v.length), $ = m.offsetWidth || m.getBoundingClientRect().width, w.style.width = v.length * $ + "px";
                        for (var t = v.length; t--;) {
                            var n = v[t];
                            n.style.width = $ + "px", n.setAttribute("data-index", t), h.transitions && (n.style.left = t * -$ + "px", a(t, b > t ? -$ : b < t ? $ : 0, 0))
                        }
                        e.continuous && h.transitions && (a(r(b - 1), -$, 0), a(r(b + 1), $, 0)), h.transitions || (w.style.left = b * -$ + "px"), m.style.visibility = "visible", e.slidesChanged && e.slidesChanged()
                    }
                }

                function n(t) {
                    e.continuous ? o(b - 1, t) : b && o(b - 1, t)
                }

                function i(t) {
                    e.continuous ? o(b + 1, t) : b < v.length - 1 && o(b + 1, t)
                }

                function r(e) {
                    return (v.length + e % v.length) % v.length
                }

                function o(t, n) {
                    if (b != t) {
                        if (h.transitions) {
                            var i = Math.abs(b - t) / (b - t);
                            if (e.continuous) {
                                var o = i;
                                i = -g[r(t)] / $, i !== o && (t = -i * v.length + t)
                            }
                            for (var s = Math.abs(b - t) - 1; s--;)a(r((t > b ? t : b) - s - 1), $ * i, 0);
                            t = r(t), a(b, $ * i, n || _), a(t, 0, n || _), e.continuous && a(r(t - i), -($ * i), 0)
                        } else t = r(t), c(b * -$, t * -$, n || _);
                        b = t, p(e.callback && e.callback(b, v[b]))
                    }
                }

                function a(e, t, n) {
                    s(e, t, n), g[e] = t
                }

                function s(e, t, n) {
                    var i = v[e], r = i && i.style;
                    r && (r.webkitTransitionDuration = r.MozTransitionDuration = r.msTransitionDuration = r.OTransitionDuration = r.transitionDuration = n + "ms", r.webkitTransform = "translate(" + t + "px,0)translateZ(0)", r.msTransform = r.MozTransform = r.OTransform = "translateX(" + t + "px)")
                }

                function c(t, n, i) {
                    if (!i)return void(w.style.left = n + "px");
                    var r = +new Date, o = setInterval(function () {
                        var a = +new Date - r;
                        return a > i ? (w.style.left = n + "px", T && l(), e.transitionEnd && e.transitionEnd.call(event, b, v[b]), void clearInterval(o)) : void(w.style.left = (n - t) * (Math.floor(a / i * 100) / 100) + t + "px")
                    }, 4)
                }

                function l() {
                    S = setTimeout(i, T)
                }

                function u() {
                    T = e.auto || 0, clearTimeout(S)
                }

                var f = this, d = function () {
                }, p = function (e) {
                    setTimeout(e || d, 0)
                }, h = {
                    addEventListener: !!window.addEventListener,
                    touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
                    transitions: function (e) {
                        var t = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
                        for (var n in t)if (void 0 !== e.style[t[n]])return !0;
                        return !1
                    }(document.createElement("swipe"))
                }, m = e.el;
                if (m) {
                    var v, g, $, y, w = m.children[0];
                    e = e || {};
                    var b = parseInt(e.startSlide, 10) || 0, _ = e.speed || 300;
                    e.continuous = void 0 === e.continuous || e.continuous;
                    var S, x, T = e.auto || 0, E = {}, C = {}, k = {
                        handleEvent: function (n) {
                            switch ("mousedown" != n.type && "mouseup" != n.type && "mousemove" != n.type || (n.touches = [{
                                pageX: n.pageX,
                                pageY: n.pageY
                            }]), n.type) {
                                case"mousedown":
                                    this.start(n);
                                    break;
                                case"touchstart":
                                    this.start(n);
                                    break;
                                case"touchmove":
                                    this.touchmove(n);
                                    break;
                                case"mousemove":
                                    this.touchmove(n);
                                    break;
                                case"touchend":
                                    p(this.end(n));
                                    break;
                                case"mouseup":
                                    p(this.end(n));
                                    break;
                                case"webkitTransitionEnd":
                                case"msTransitionEnd":
                                case"oTransitionEnd":
                                case"otransitionend":
                                case"transitionend":
                                    p(this.transitionEnd(n));
                                    break;
                                case"resize":
                                    p(t)
                            }
                            e.stopPropagation && n.stopPropagation()
                        }, start: function (e) {
                            var t = e.touches[0];
                            E = {
                                x: t.pageX,
                                y: t.pageY,
                                time: +new Date
                            }, x = void 0, C = {}, h.touch ? (w.addEventListener("touchmove", this, !1), w.addEventListener("touchend", this, !1)) : (w.addEventListener("mousemove", this, !1), w.addEventListener("mouseup", this, !1), document.addEventListener("mouseup", this, !1))
                        }, touchmove: function (t) {
                            if (!(t.touches.length > 1 || t.scale && 1 !== t.scale || f.slideIsDisabled)) {
                                e.disableScroll && t.preventDefault();
                                var n = t.touches[0];
                                C = {
                                    x: n.pageX - E.x,
                                    y: n.pageY - E.y
                                }, "undefined" == typeof x && (x = !!(x || Math.abs(C.x) < Math.abs(C.y))), x || (t.preventDefault(), u(), e.continuous ? (s(r(b - 1), C.x + g[r(b - 1)], 0), s(b, C.x + g[b], 0), s(r(b + 1), C.x + g[r(b + 1)], 0)) : (C.x = C.x / (!b && C.x > 0 || b == v.length - 1 && C.x < 0 ? Math.abs(C.x) / $ + 1 : 1), s(b - 1, C.x + g[b - 1], 0), s(b, C.x + g[b], 0), s(b + 1, C.x + g[b + 1], 0)), e.onDrag && e.onDrag())
                            }
                        }, end: function () {
                            var t = +new Date - E.time, n = Number(t) < 250 && Math.abs(C.x) > 20 || Math.abs(C.x) > $ / 2, i = !b && C.x > 0 || b == v.length - 1 && C.x < 0;
                            e.continuous && (i = !1);
                            var o = C.x < 0;
                            x || (n && !i ? (o ? (e.continuous ? (a(r(b - 1), -$, 0), a(r(b + 2), $, 0)) : a(b - 1, -$, 0), a(b, g[b] - $, _), a(r(b + 1), g[r(b + 1)] - $, _), b = r(b + 1)) : (e.continuous ? (a(r(b + 1), $, 0), a(r(b - 2), -$, 0)) : a(b + 1, $, 0), a(b, g[b] + $, _), a(r(b - 1), g[r(b - 1)] + $, _), b = r(b - 1)), e.callback && e.callback(b, v[b])) : e.continuous ? (a(r(b - 1), -$, _), a(b, 0, _), a(r(b + 1), $, _)) : (a(b - 1, -$, _), a(b, 0, _), a(b + 1, $, _))), h.touch ? (w.removeEventListener("touchmove", k, !1), w.removeEventListener("touchend", k, !1)) : (w.removeEventListener("mousemove", k, !1), w.removeEventListener("mouseup", k, !1), document.removeEventListener("mouseup", k, !1)), e.onDragEnd && e.onDragEnd()
                        }, transitionEnd: function (t) {
                            parseInt(t.target.getAttribute("data-index"), 10) == b && (T && l(), e.transitionEnd && e.transitionEnd.call(t, b, v[b]))
                        }
                    };
                    this.update = function () {
                        setTimeout(t)
                    }, this.setup = function () {
                        t()
                    }, this.loop = function (t) {
                        return arguments.length && (e.continuous = !!t), e.continuous
                    }, this.enableSlide = function (e) {
                        return arguments.length && (this.slideIsDisabled = !e), !this.slideIsDisabled
                    }, this.slide = this.select = function (e, t) {
                        u(), o(e, t)
                    }, this.prev = this.previous = function () {
                        u(), n()
                    }, this.next = function () {
                        u(), i()
                    }, this.stop = function () {
                        u()
                    }, this.start = function () {
                        l()
                    }, this.autoPlay = function (e) {
                        !T || T < 0 ? u() : (T = e, l())
                    }, this.currentIndex = this.selected = function () {
                        return b
                    }, this.slidesCount = this.count = function () {
                        return y
                    }, this.kill = function () {
                        u(), w.style.width = "", w.style.left = "", v && (v = []), h.addEventListener ? (w.removeEventListener("touchstart", k, !1), w.removeEventListener("webkitTransitionEnd", k, !1), w.removeEventListener("msTransitionEnd", k, !1), w.removeEventListener("oTransitionEnd", k, !1), w.removeEventListener("otransitionend", k, !1), w.removeEventListener("transitionend", k, !1), window.removeEventListener("resize", k, !1)) : window.onresize = null
                    }, this.load = function () {
                        t(), T && l(), h.addEventListener ? (h.touch ? w.addEventListener("touchstart", k, !1) : w.addEventListener("mousedown", k, !1), h.transitions && (w.addEventListener("webkitTransitionEnd", k, !1), w.addEventListener("msTransitionEnd", k, !1), w.addEventListener("oTransitionEnd", k, !1), w.addEventListener("otransitionend", k, !1), w.addEventListener("transitionend", k, !1)), window.addEventListener("resize", k, !1)) : window.onresize = function () {
                            t()
                        }
                    }
                }
            }
        })
    }(ionic), function (e) {
        "use strict";
        e.views.Toggle = e.views.View.inherit({
            initialize: function (t) {
                var n = this;
                this.el = t.el, this.checkbox = t.checkbox, this.track = t.track, this.handle = t.handle, this.openPercent = -1, this.onChange = t.onChange || function () {
                    }, this.triggerThreshold = t.triggerThreshold || 20, this.dragStartHandler = function (e) {
                    n.dragStart(e)
                }, this.dragHandler = function (e) {
                    n.drag(e)
                }, this.holdHandler = function (e) {
                    n.hold(e)
                }, this.releaseHandler = function (e) {
                    n.release(e)
                }, this.dragStartGesture = e.onGesture("dragstart", this.dragStartHandler, this.el), this.dragGesture = e.onGesture("drag", this.dragHandler, this.el), this.dragHoldGesture = e.onGesture("hold", this.holdHandler, this.el), this.dragReleaseGesture = e.onGesture("release", this.releaseHandler, this.el)
            }, destroy: function () {
                e.offGesture(this.dragStartGesture, "dragstart", this.dragStartGesture), e.offGesture(this.dragGesture, "drag", this.dragGesture), e.offGesture(this.dragHoldGesture, "hold", this.holdHandler), e.offGesture(this.dragReleaseGesture, "release", this.releaseHandler)
            }, tap: function () {
                "disabled" !== this.el.getAttribute("disabled") && this.val(!this.checkbox.checked)
            }, dragStart: function (e) {
                this.checkbox.disabled || (this._dragInfo = {
                    width: this.el.offsetWidth,
                    left: this.el.offsetLeft,
                    right: this.el.offsetLeft + this.el.offsetWidth,
                    triggerX: this.el.offsetWidth / 2,
                    initialState: this.checkbox.checked
                }, e.gesture.srcEvent.preventDefault(), this.hold(e))
            }, drag: function (t) {
                var n = this;
                this._dragInfo && (t.gesture.srcEvent.preventDefault(), e.requestAnimationFrame(function () {
                    if (n._dragInfo) {
                        var e = t.gesture.touches[0].pageX - n._dragInfo.left, i = n._dragInfo.width - n.triggerThreshold;
                        n._dragInfo.initialState ? e < n.triggerThreshold ? n.setOpenPercent(0) : e > n._dragInfo.triggerX && n.setOpenPercent(100) : e < n._dragInfo.triggerX ? n.setOpenPercent(0) : e > i && n.setOpenPercent(100)
                    }
                }))
            }, endDrag: function () {
                this._dragInfo = null
            }, hold: function () {
                this.el.classList.add("dragging")
            }, release: function (e) {
                this.el.classList.remove("dragging"), this.endDrag(e)
            }, setOpenPercent: function (t) {
                if (this.openPercent < 0 || t < this.openPercent - 3 || t > this.openPercent + 3)if (this.openPercent = t, 0 === t)this.val(!1); else if (100 === t)this.val(!0); else {
                    var n = Math.round(t / 100 * this.track.offsetWidth - this.handle.offsetWidth);
                    n = n < 1 ? 0 : n, this.handle.style[e.CSS.TRANSFORM] = "translate3d(" + n + "px,0,0)"
                }
            }, val: function (t) {
                return t !== !0 && t !== !1 || ("" !== this.handle.style[e.CSS.TRANSFORM] && (this.handle.style[e.CSS.TRANSFORM] = ""), this.checkbox.checked = t, this.openPercent = t ? 100 : 0, this.onChange && this.onChange()), this.checkbox.checked
            }
        })
    }(ionic)
}(), function (e, t, n) {
    "use strict";
    function i(e, t) {
        return t = t || Error, function () {
            var n, i, r = 2, o = arguments, a = o[0], s = "[" + (e ? e + ":" : "") + a + "] ", c = o[1];
            for (s += c.replace(/\{\d+\}/g, function (e) {
                var t = +e.slice(1, -1), n = t + r;
                return n < o.length ? ye(o[n]) : e
            }), s += "\nhttp://errors.angularjs.org/1.4.3/" + (e ? e + "/" : "") + a, i = r, n = "?"; i < o.length; i++, n = "&")s += n + "p" + (i - r) + "=" + encodeURIComponent(ye(o[i]));
            return new t(s)
        }
    }

    function r(e) {
        if (null == e || k(e))return !1;
        var t = "length" in Object(e) && e.length;
        return !(e.nodeType !== Wi || !t) || (S(e) || Li(e) || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function o(e, t, n) {
        var i, a;
        if (e)if (E(e))for (i in e)"prototype" == i || "length" == i || "name" == i || e.hasOwnProperty && !e.hasOwnProperty(i) || t.call(n, e[i], i, e); else if (Li(e) || r(e)) {
            var s = "object" != typeof e;
            for (i = 0, a = e.length; i < a; i++)(s || i in e) && t.call(n, e[i], i, e)
        } else if (e.forEach && e.forEach !== o)e.forEach(t, n, e); else if (_(e))for (i in e)t.call(n, e[i], i, e); else if ("function" == typeof e.hasOwnProperty)for (i in e)e.hasOwnProperty(i) && t.call(n, e[i], i, e); else for (i in e)bi.call(e, i) && t.call(n, e[i], i, e);
        return e
    }

    function a(e, t, n) {
        for (var i = Object.keys(e).sort(), r = 0; r < i.length; r++)t.call(n, e[i[r]], i[r]);
        return i
    }

    function s(e) {
        return function (t, n) {
            e(n, t)
        }
    }

    function c() {
        return ++Bi
    }

    function l(e, t) {
        t ? e.$$hashKey = t : delete e.$$hashKey
    }

    function u(e, t, n) {
        for (var i = e.$$hashKey, r = 0, o = t.length; r < o; ++r) {
            var a = t[r];
            if (b(a) || E(a))for (var s = Object.keys(a), c = 0, f = s.length; c < f; c++) {
                var d = s[c], p = a[d];
                n && b(p) ? T(p) ? e[d] = new Date(p.valueOf()) : (b(e[d]) || (e[d] = Li(p) ? [] : {}), u(e[d], [p], !0)) : e[d] = p
            }
        }
        return l(e, i), e
    }

    function f(e) {
        return u(e, Ai.call(arguments, 1), !1)
    }

    function d(e) {
        return u(e, Ai.call(arguments, 1), !0)
    }

    function p(e) {
        return parseInt(e, 10)
    }

    function h(e, t) {
        return f(Object.create(e), t)
    }

    function m() {
    }

    function v(e) {
        return e
    }

    function g(e) {
        return function () {
            return e
        }
    }

    function $(e) {
        return E(e.toString) && e.toString !== Object.prototype.toString
    }

    function y(e) {
        return "undefined" == typeof e
    }

    function w(e) {
        return "undefined" != typeof e
    }

    function b(e) {
        return null !== e && "object" == typeof e
    }

    function _(e) {
        return null !== e && "object" == typeof e && !Pi(e)
    }

    function S(e) {
        return "string" == typeof e
    }

    function x(e) {
        return "number" == typeof e
    }

    function T(e) {
        return "[object Date]" === Ii.call(e)
    }

    function E(e) {
        return "function" == typeof e
    }

    function C(e) {
        return "[object RegExp]" === Ii.call(e)
    }

    function k(e) {
        return e && e.window === e
    }

    function A(e) {
        return e && e.$evalAsync && e.$watch
    }

    function M(e) {
        return "[object File]" === Ii.call(e)
    }

    function D(e) {
        return "[object FormData]" === Ii.call(e)
    }

    function I(e) {
        return "[object Blob]" === Ii.call(e)
    }

    function P(e) {
        return "boolean" == typeof e
    }

    function O(e) {
        return e && E(e.then)
    }

    function N(e) {
        return Ri.test(Ii.call(e))
    }

    function B(e) {
        return !(!e || !(e.nodeName || e.prop && e.attr && e.find))
    }

    function V(e) {
        var t, n = {}, i = e.split(",");
        for (t = 0; t < i.length; t++)n[i[t]] = !0;
        return n
    }

    function L(e) {
        return wi(e.nodeName || e[0] && e[0].nodeName)
    }

    function R(e, t) {
        var n = e.indexOf(t);
        return n >= 0 && e.splice(n, 1), n
    }

    function H(e, t, n, i) {
        if (k(e) || A(e))throw Oi("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        if (N(t))throw Oi("cpta", "Can't copy! TypedArray destination cannot be mutated.");
        if (t) {
            if (e === t)throw Oi("cpi", "Can't copy! Source and destination are identical.");
            n = n || [], i = i || [], b(e) && (n.push(e), i.push(t));
            var r;
            if (Li(e)) {
                t.length = 0;
                for (var a = 0; a < e.length; a++)t.push(H(e[a], null, n, i))
            } else {
                var s = t.$$hashKey;
                if (Li(t) ? t.length = 0 : o(t, function (e, n) {
                        delete t[n]
                    }), _(e))for (r in e)t[r] = H(e[r], null, n, i); else if (e && "function" == typeof e.hasOwnProperty)for (r in e)e.hasOwnProperty(r) && (t[r] = H(e[r], null, n, i)); else for (r in e)bi.call(e, r) && (t[r] = H(e[r], null, n, i));
                l(t, s)
            }
        } else if (t = e, b(e)) {
            var c;
            if (n && (c = n.indexOf(e)) !== -1)return i[c];
            if (Li(e))return H(e, [], n, i);
            if (N(e))t = new e.constructor(e); else if (T(e))t = new Date(e.getTime()); else {
                if (!C(e)) {
                    var u = Object.create(Pi(e));
                    return H(e, u, n, i)
                }
                t = new RegExp(e.source, e.toString().match(/[^\/]*$/)[0]), t.lastIndex = e.lastIndex
            }
            i && (n.push(e), i.push(t))
        }
        return t
    }

    function z(e, t) {
        if (Li(e)) {
            t = t || [];
            for (var n = 0, i = e.length; n < i; n++)t[n] = e[n]
        } else if (b(e)) {
            t = t || {};
            for (var r in e)"$" === r.charAt(0) && "$" === r.charAt(1) || (t[r] = e[r])
        }
        return t || e
    }

    function F(e, t) {
        if (e === t)return !0;
        if (null === e || null === t)return !1;
        if (e !== e && t !== t)return !0;
        var i, r, o, a = typeof e, s = typeof t;
        if (a == s && "object" == a) {
            if (!Li(e)) {
                if (T(e))return !!T(t) && F(e.getTime(), t.getTime());
                if (C(e))return !!C(t) && e.toString() == t.toString();
                if (A(e) || A(t) || k(e) || k(t) || Li(t) || T(t) || C(t))return !1;
                o = ve();
                for (r in e)if ("$" !== r.charAt(0) && !E(e[r])) {
                    if (!F(e[r], t[r]))return !1;
                    o[r] = !0
                }
                for (r in t)if (!(r in o || "$" === r.charAt(0) || t[r] === n || E(t[r])))return !1;
                return !0
            }
            if (!Li(t))return !1;
            if ((i = e.length) == t.length) {
                for (r = 0; r < i; r++)if (!F(e[r], t[r]))return !1;
                return !0
            }
        }
        return !1
    }

    function q(e, t, n) {
        return e.concat(Ai.call(t, n))
    }

    function U(e, t) {
        return Ai.call(e, t || 0)
    }

    function j(e, t) {
        var n = arguments.length > 2 ? U(arguments, 2) : [];
        return !E(t) || t instanceof RegExp ? t : n.length ? function () {
            return arguments.length ? t.apply(e, q(n, arguments, 0)) : t.apply(e, n)
        } : function () {
            return arguments.length ? t.apply(e, arguments) : t.call(e)
        }
    }

    function G(e, i) {
        var r = i;
        return "string" == typeof e && "$" === e.charAt(0) && "$" === e.charAt(1) ? r = n : k(i) ? r = "$WINDOW" : i && t === i ? r = "$DOCUMENT" : A(i) && (r = "$SCOPE"), r
    }

    function W(e, t) {
        return "undefined" == typeof e ? n : (x(t) || (t = t ? 2 : null), JSON.stringify(e, G, t))
    }

    function Y(e) {
        return S(e) ? JSON.parse(e) : e
    }

    function X(e, t) {
        var n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
        return isNaN(n) ? t : n
    }

    function K(e, t) {
        return e = new Date(e.getTime()), e.setMinutes(e.getMinutes() + t), e
    }

    function Q(e, t, n) {
        n = n ? -1 : 1;
        var i = X(t, e.getTimezoneOffset());
        return K(e, n * (i - e.getTimezoneOffset()))
    }

    function Z(e) {
        e = Ei(e).clone();
        try {
            e.empty()
        } catch (t) {
        }
        var n = Ei("<div>").append(e).html();
        try {
            return e[0].nodeType === Xi ? wi(n) : n.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (e, t) {
                return "<" + wi(t)
            })
        } catch (t) {
            return wi(n)
        }
    }

    function J(e) {
        try {
            return decodeURIComponent(e)
        } catch (t) {
        }
    }

    function ee(e) {
        var t, n, i = {};
        return o((e || "").split("&"), function (e) {
            if (e && (t = e.replace(/\+/g, "%20").split("="), n = J(t[0]), w(n))) {
                var r = !w(t[1]) || J(t[1]);
                bi.call(i, n) ? Li(i[n]) ? i[n].push(r) : i[n] = [i[n], r] : i[n] = r
            }
        }), i
    }

    function te(e) {
        var t = [];
        return o(e, function (e, n) {
            Li(e) ? o(e, function (e) {
                t.push(ie(n, !0) + (e === !0 ? "" : "=" + ie(e, !0)))
            }) : t.push(ie(n, !0) + (e === !0 ? "" : "=" + ie(e, !0)))
        }), t.length ? t.join("&") : ""
    }

    function ne(e) {
        return ie(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function ie(e, t) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, t ? "%20" : "+")
    }

    function re(e, t) {
        var n, i, r = Ui.length;
        for (i = 0; i < r; ++i)if (n = Ui[i] + t, S(n = e.getAttribute(n)))return n;
        return null
    }

    function oe(e, t) {
        var n, i, r = {};
        o(Ui, function (t) {
            var r = t + "app";
            !n && e.hasAttribute && e.hasAttribute(r) && (n = e, i = e.getAttribute(r))
        }), o(Ui, function (t) {
            var r, o = t + "app";
            !n && (r = e.querySelector("[" + o.replace(":", "\\:") + "]")) && (n = r, i = r.getAttribute(o))
        }), n && (r.strictDi = null !== re(n, "strict-di"), t(n, i ? [i] : [], r))
    }

    function ae(n, i, r) {
        b(r) || (r = {});
        var a = {strictDi: !1};
        r = f(a, r);
        var s = function () {
            if (n = Ei(n), n.injector()) {
                var e = n[0] === t ? "document" : Z(n);
                throw Oi("btstrpd", "App Already Bootstrapped with this Element '{0}'", e.replace(/</, "&lt;").replace(/>/, "&gt;"))
            }
            i = i || [], i.unshift(["$provide", function (e) {
                e.value("$rootElement", n)
            }]), r.debugInfoEnabled && i.push(["$compileProvider", function (e) {
                e.debugInfoEnabled(!0)
            }]), i.unshift("ng");
            var o = Ze(i, r.strictDi);
            return o.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function (e, t, n, i) {
                e.$apply(function () {
                    t.data("$injector", i), n(t)(e)
                })
            }]), o
        }, c = /^NG_ENABLE_DEBUG_INFO!/, l = /^NG_DEFER_BOOTSTRAP!/;
        return e && c.test(e.name) && (r.debugInfoEnabled = !0, e.name = e.name.replace(c, "")), e && !l.test(e.name) ? s() : (e.name = e.name.replace(l, ""), Ni.resumeBootstrap = function (e) {
            return o(e, function (e) {
                i.push(e)
            }), s()
        }, void(E(Ni.resumeDeferredBootstrap) && Ni.resumeDeferredBootstrap()))
    }

    function se() {
        e.name = "NG_ENABLE_DEBUG_INFO!" + e.name, e.location.reload()
    }

    function ce(e) {
        var t = Ni.element(e).injector();
        if (!t)throw Oi("test", "no injector found for element argument to getTestability");
        return t.get("$$testability")
    }

    function le(e, t) {
        return t = t || "_", e.replace(ji, function (e, n) {
            return (n ? t : "") + e.toLowerCase()
        })
    }

    function ue() {
        var t;
        if (!Gi) {
            var i = qi();
            Ci = e.jQuery, w(i) && (Ci = null === i ? n : e[i]), Ci && Ci.fn.on ? (Ei = Ci, f(Ci.fn, {
                scope: pr.scope,
                isolateScope: pr.isolateScope,
                controller: pr.controller,
                injector: pr.injector,
                inheritedData: pr.inheritedData
            }), t = Ci.cleanData, Ci.cleanData = function (e) {
                var n;
                if (Vi)Vi = !1; else for (var i, r = 0; null != (i = e[r]); r++)n = Ci._data(i, "events"), n && n.$destroy && Ci(i).triggerHandler("$destroy");
                t(e)
            }) : Ei = ke, Ni.element = Ei, Gi = !0
        }
    }

    function fe(e, t, n) {
        if (!e)throw Oi("areq", "Argument '{0}' is {1}", t || "?", n || "required");
        return e
    }

    function de(e, t, n) {
        return n && Li(e) && (e = e[e.length - 1]), fe(E(e), t, "not a function, got " + (e && "object" == typeof e ? e.constructor.name || "Object" : typeof e)), e
    }

    function pe(e, t) {
        if ("hasOwnProperty" === e)throw Oi("badname", "hasOwnProperty is not a valid {0} name", t)
    }

    function he(e, t, n) {
        if (!t)return e;
        for (var i, r = t.split("."), o = e, a = r.length, s = 0; s < a; s++)i = r[s], e && (e = (o = e)[i]);
        return !n && E(e) ? j(o, e) : e
    }

    function me(e) {
        var t = e[0], n = e[e.length - 1], i = [t];
        do {
            if (t = t.nextSibling, !t)break;
            i.push(t)
        } while (t !== n);
        return Ei(i)
    }

    function ve() {
        return Object.create(null)
    }

    function ge(e) {
        function t(e, t, n) {
            return e[t] || (e[t] = n())
        }

        var n = i("$injector"), r = i("ng"), o = t(e, "angular", Object);
        return o.$$minErr = o.$$minErr || i, t(o, "module", function () {
            var e = {};
            return function (i, o, a) {
                var s = function (e, t) {
                    if ("hasOwnProperty" === e)throw r("badname", "hasOwnProperty is not a valid {0} name", t)
                };
                return s(i, "module"), o && e.hasOwnProperty(i) && (e[i] = null), t(e, i, function () {
                    function e(e, t, n, i) {
                        return i || (i = r), function () {
                            return i[n || "push"]([e, t, arguments]), u
                        }
                    }

                    function t(e, t) {
                        return function (n, o) {
                            return o && E(o) && (o.$$moduleName = i), r.push([e, t, arguments]), u
                        }
                    }

                    if (!o)throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", i);
                    var r = [], s = [], c = [], l = e("$injector", "invoke", "push", s), u = {
                        _invokeQueue: r,
                        _configBlocks: s,
                        _runBlocks: c,
                        requires: o,
                        name: i,
                        provider: t("$provide", "provider"),
                        factory: t("$provide", "factory"),
                        service: t("$provide", "service"),
                        value: e("$provide", "value"),
                        constant: e("$provide", "constant", "unshift"),
                        decorator: t("$provide", "decorator"),
                        animation: t("$animateProvider", "register"),
                        filter: t("$filterProvider", "register"),
                        controller: t("$controllerProvider", "register"),
                        directive: t("$compileProvider", "directive"),
                        config: l,
                        run: function (e) {
                            return c.push(e), this
                        }
                    };
                    return a && l(a), u
                })
            }
        })
    }

    function $e(e) {
        var t = [];
        return JSON.stringify(e, function (e, n) {
            if (n = G(e, n), b(n)) {
                if (t.indexOf(n) >= 0)return "<<already seen>>";
                t.push(n)
            }
            return n
        })
    }

    function ye(e) {
        return "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? $e(e) : e
    }

    function we(t) {
        f(t, {
            bootstrap: ae,
            copy: H,
            extend: f,
            merge: d,
            equals: F,
            element: Ei,
            forEach: o,
            injector: Ze,
            noop: m,
            bind: j,
            toJson: W,
            fromJson: Y,
            identity: v,
            isUndefined: y,
            isDefined: w,
            isString: S,
            isFunction: E,
            isObject: b,
            isNumber: x,
            isElement: B,
            isArray: Li,
            version: Ji,
            isDate: T,
            lowercase: wi,
            uppercase: _i,
            callbacks: {counter: 0},
            getTestability: ce,
            $$minErr: i,
            $$csp: Fi,
            reloadWithDebugInfo: se
        }), ki = ge(e);
        try {
            ki("ngLocale")
        } catch (n) {
            ki("ngLocale", []).provider("$locale", Dt)
        }
        ki("ng", ["ngLocale"], ["$provide", function (e) {
            e.provider({$$sanitizeUri: gn}), e.provider("$compile", ct).directive({
                a: lo,
                input: Co,
                textarea: Co,
                form: mo,
                script: ya,
                select: _a,
                style: xa,
                option: Sa,
                ngBind: Mo,
                ngBindHtml: Io,
                ngBindTemplate: Do,
                ngClass: Oo,
                ngClassEven: Bo,
                ngClassOdd: No,
                ngCloak: Vo,
                ngController: Lo,
                ngForm: vo,
                ngHide: pa,
                ngIf: zo,
                ngInclude: Fo,
                ngInit: Uo,
                ngNonBindable: ra,
                ngPluralize: ca,
                ngRepeat: la,
                ngShow: da,
                ngStyle: ha,
                ngSwitch: ma,
                ngSwitchWhen: va,
                ngSwitchDefault: ga,
                ngOptions: sa,
                ngTransclude: $a,
                ngModel: ta,
                ngList: jo,
                ngChange: Po,
                pattern: Ea,
                ngPattern: Ea,
                required: Ta,
                ngRequired: Ta,
                minlength: ka,
                ngMinlength: ka,
                maxlength: Ca,
                ngMaxlength: Ca,
                ngValue: Ao,
                ngModelOptions: ia
            }).directive({ngInclude: qo}).directive(uo).directive(Ro), e.provider({
                $anchorScroll: Je,
                $animate: kr,
                $$animateQueue: Cr,
                $$AnimateRunner: Er,
                $browser: ot,
                $cacheFactory: at,
                $controller: pt,
                $document: ht,
                $exceptionHandler: mt,
                $filter: Dn,
                $interpolate: At,
                $interval: Mt,
                $http: Tt,
                $httpParamSerializer: gt,
                $httpParamSerializerJQLike: $t,
                $httpBackend: Ct,
                $location: jt,
                $log: Gt,
                $parse: fn,
                $rootScope: vn,
                $q: dn,
                $$q: pn,
                $sce: bn,
                $sceDelegate: wn,
                $sniffer: _n,
                $templateCache: st,
                $templateRequest: Sn,
                $$testability: xn,
                $timeout: Tn,
                $window: kn,
                $$rAF: mn,
                $$jqLite: We,
                $$HashMap: gr,
                $$cookieReader: Mn
            })
        }])
    }

    function be() {
        return ++tr
    }

    function _e(e) {
        return e.replace(rr, function (e, t, n, i) {
            return i ? n.toUpperCase() : n
        }).replace(or, "Moz$1")
    }

    function Se(e) {
        return !lr.test(e)
    }

    function xe(e) {
        var t = e.nodeType;
        return t === Wi || !t || t === Qi
    }

    function Te(e) {
        for (var t in er[e.ng339])return !0;
        return !1
    }

    function Ee(e, t) {
        var n, i, r, a, s = t.createDocumentFragment(), c = [];
        if (Se(e))c.push(t.createTextNode(e)); else {
            for (n = n || s.appendChild(t.createElement("div")), i = (ur.exec(e) || ["", ""])[1].toLowerCase(), r = dr[i] || dr._default, n.innerHTML = r[1] + e.replace(fr, "<$1></$2>") + r[2], a = r[0]; a--;)n = n.lastChild;
            c = q(c, n.childNodes), n = s.firstChild, n.textContent = ""
        }
        return s.textContent = "", s.innerHTML = "", o(c, function (e) {
            s.appendChild(e)
        }), s
    }

    function Ce(e, n) {
        n = n || t;
        var i;
        return (i = cr.exec(e)) ? [n.createElement(i[1])] : (i = Ee(e, n)) ? i.childNodes : []
    }

    function ke(e) {
        if (e instanceof ke)return e;
        var t;
        if (S(e) && (e = Hi(e), t = !0), !(this instanceof ke)) {
            if (t && "<" != e.charAt(0))throw sr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new ke(e)
        }
        t ? Le(this, Ce(e)) : Le(this, e)
    }

    function Ae(e) {
        return e.cloneNode(!0)
    }

    function Me(e, t) {
        if (t || Ie(e), e.querySelectorAll)for (var n = e.querySelectorAll("*"), i = 0, r = n.length; i < r; i++)Ie(n[i])
    }

    function De(e, t, n, i) {
        if (w(i))throw sr("offargs", "jqLite#off() does not support the `selector` argument");
        var r = Pe(e), a = r && r.events, s = r && r.handle;
        if (s)if (t)o(t.split(" "), function (t) {
            if (w(n)) {
                var i = a[t];
                if (R(i || [], n), i && i.length > 0)return
            }
            ir(e, t, s), delete a[t]
        }); else for (t in a)"$destroy" !== t && ir(e, t, s), delete a[t]
    }

    function Ie(e, t) {
        var i = e.ng339, r = i && er[i];
        if (r) {
            if (t)return void delete r.data[t];
            r.handle && (r.events.$destroy && r.handle({}, "$destroy"), De(e)), delete er[i], e.ng339 = n
        }
    }

    function Pe(e, t) {
        var i = e.ng339, r = i && er[i];
        return t && !r && (e.ng339 = i = be(), r = er[i] = {events: {}, data: {}, handle: n}), r
    }

    function Oe(e, t, n) {
        if (xe(e)) {
            var i = w(n), r = !i && t && !b(t), o = !t, a = Pe(e, !r), s = a && a.data;
            if (i)s[t] = n; else {
                if (o)return s;
                if (r)return s && s[t];
                f(s, t)
            }
        }
    }

    function Ne(e, t) {
        return !!e.getAttribute && (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + t + " ") > -1
    }

    function Be(e, t) {
        t && e.setAttribute && o(t.split(" "), function (t) {
            e.setAttribute("class", Hi((" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Hi(t) + " ", " ")))
        })
    }

    function Ve(e, t) {
        if (t && e.setAttribute) {
            var n = (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            o(t.split(" "), function (e) {
                e = Hi(e), n.indexOf(" " + e + " ") === -1 && (n += e + " ")
            }), e.setAttribute("class", Hi(n))
        }
    }

    function Le(e, t) {
        if (t)if (t.nodeType)e[e.length++] = t; else {
            var n = t.length;
            if ("number" == typeof n && t.window !== t) {
                if (n)for (var i = 0; i < n; i++)e[e.length++] = t[i]
            } else e[e.length++] = t
        }
    }

    function Re(e, t) {
        return He(e, "$" + (t || "ngController") + "Controller")
    }

    function He(e, t, i) {
        e.nodeType == Qi && (e = e.documentElement);
        for (var r = Li(t) ? t : [t]; e;) {
            for (var o = 0, a = r.length; o < a; o++)if ((i = Ei.data(e, r[o])) !== n)return i;
            e = e.parentNode || e.nodeType === Zi && e.host
        }
    }

    function ze(e) {
        for (Me(e, !0); e.firstChild;)e.removeChild(e.firstChild)
    }

    function Fe(e, t) {
        t || Me(e);
        var n = e.parentNode;
        n && n.removeChild(e)
    }

    function qe(t, n) {
        n = n || e, "complete" === n.document.readyState ? n.setTimeout(t) : Ei(n).on("load", t)
    }

    function Ue(e, t) {
        var n = hr[t.toLowerCase()];
        return n && mr[L(e)] && n
    }

    function je(e, t) {
        var n = e.nodeName;
        return ("INPUT" === n || "TEXTAREA" === n) && vr[t]
    }

    function Ge(e, t) {
        var n = function (n, i) {
            n.isDefaultPrevented = function () {
                return n.defaultPrevented
            };
            var r = t[i || n.type], o = r ? r.length : 0;
            if (o) {
                if (y(n.immediatePropagationStopped)) {
                    var a = n.stopImmediatePropagation;
                    n.stopImmediatePropagation = function () {
                        n.immediatePropagationStopped = !0, n.stopPropagation && n.stopPropagation(), a && a.call(n)
                    }
                }
                n.isImmediatePropagationStopped = function () {
                    return n.immediatePropagationStopped === !0
                }, o > 1 && (r = z(r));
                for (var s = 0; s < o; s++)n.isImmediatePropagationStopped() || r[s].call(e, n)
            }
        };
        return n.elem = e, n
    }

    function We() {
        this.$get = function () {
            return f(ke, {
                hasClass: function (e, t) {
                    return e.attr && (e = e[0]), Ne(e, t)
                }, addClass: function (e, t) {
                    return e.attr && (e = e[0]), Ve(e, t)
                }, removeClass: function (e, t) {
                    return e.attr && (e = e[0]), Be(e, t)
                }
            })
        }
    }

    function Ye(e, t) {
        var n = e && e.$$hashKey;
        if (n)return "function" == typeof n && (n = e.$$hashKey()), n;
        var i = typeof e;
        return n = "function" == i || "object" == i && null !== e ? e.$$hashKey = i + ":" + (t || c)() : i + ":" + e
    }

    function Xe(e, t) {
        if (t) {
            var n = 0;
            this.nextUid = function () {
                return ++n
            }
        }
        o(e, this.put, this)
    }

    function Ke(e) {
        var t = e.toString().replace(br, ""), n = t.match($r);
        return n ? "function(" + (n[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
    }

    function Qe(e, t, n) {
        var i, r, a, s;
        if ("function" == typeof e) {
            if (!(i = e.$inject)) {
                if (i = [], e.length) {
                    if (t)throw S(n) && n || (n = e.name || Ke(e)), _r("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", n);
                    r = e.toString().replace(br, ""), a = r.match($r), o(a[1].split(yr), function (e) {
                        e.replace(wr, function (e, t, n) {
                            i.push(n)
                        })
                    })
                }
                e.$inject = i
            }
        } else Li(e) ? (s = e.length - 1, de(e[s], "fn"), i = e.slice(0, s)) : de(e, "fn", !0);
        return i
    }

    function Ze(e, t) {
        function i(e) {
            return function (t, n) {
                return b(t) ? void o(t, s(e)) : e(t, n)
            }
        }

        function r(e, t) {
            if (pe(e, "service"), (E(t) || Li(t)) && (t = x.instantiate(t)), !t.$get)throw _r("pget", "Provider '{0}' must define $get factory method.", e);
            return _[e + v] = t
        }

        function a(e, t) {
            return function () {
                var n = C.invoke(t, this);
                if (y(n))throw _r("undef", "Provider '{0}' must return a value from $get factory method.", e);
                return n
            }
        }

        function c(e, t, n) {
            return r(e, {$get: n !== !1 ? a(e, t) : t})
        }

        function l(e, t) {
            return c(e, ["$injector", function (e) {
                return e.instantiate(t)
            }])
        }

        function u(e, t) {
            return c(e, g(t), !1)
        }

        function f(e, t) {
            pe(e, "constant"), _[e] = t, T[e] = t
        }

        function d(e, t) {
            var n = x.get(e + v), i = n.$get;
            n.$get = function () {
                var e = C.invoke(i, n);
                return C.invoke(t, null, {$delegate: e})
            }
        }

        function p(e) {
            var t, n = [];
            return o(e, function (e) {
                function i(e) {
                    var t, n;
                    for (t = 0, n = e.length; t < n; t++) {
                        var i = e[t], r = x.get(i[0]);
                        r[i[1]].apply(r, i[2])
                    }
                }

                if (!w.get(e)) {
                    w.put(e, !0);
                    try {
                        S(e) ? (t = ki(e), n = n.concat(p(t.requires)).concat(t._runBlocks), i(t._invokeQueue), i(t._configBlocks)) : E(e) ? n.push(x.invoke(e)) : Li(e) ? n.push(x.invoke(e)) : de(e, "module")
                    } catch (r) {
                        throw Li(e) && (e = e[e.length - 1]), r.message && r.stack && r.stack.indexOf(r.message) == -1 && (r = r.message + "\n" + r.stack), _r("modulerr", "Failed to instantiate module {0} due to:\n{1}", e, r.stack || r.message || r)
                    }
                }
            }), n
        }

        function h(e, n) {
            function i(t, i) {
                if (e.hasOwnProperty(t)) {
                    if (e[t] === m)throw _r("cdep", "Circular dependency found: {0}", t + " <- " + $.join(" <- "));
                    return e[t]
                }
                try {
                    return $.unshift(t), e[t] = m, e[t] = n(t, i)
                } catch (r) {
                    throw e[t] === m && delete e[t], r
                } finally {
                    $.shift()
                }
            }

            function r(e, n, r, o) {
                "string" == typeof r && (o = r, r = null);
                var a, s, c, l = [], u = Ze.$$annotate(e, t, o);
                for (s = 0, a = u.length; s < a; s++) {
                    if (c = u[s], "string" != typeof c)throw _r("itkn", "Incorrect injection token! Expected service name as string, got {0}", c);
                    l.push(r && r.hasOwnProperty(c) ? r[c] : i(c, o))
                }
                return Li(e) && (e = e[a]), e.apply(n, l)
            }

            function o(e, t, n) {
                var i = Object.create((Li(e) ? e[e.length - 1] : e).prototype || null), o = r(e, i, t, n);
                return b(o) || E(o) ? o : i
            }

            return {
                invoke: r, instantiate: o, get: i, annotate: Ze.$$annotate, has: function (t) {
                    return _.hasOwnProperty(t + v) || e.hasOwnProperty(t)
                }
            }
        }

        t = t === !0;
        var m = {}, v = "Provider", $ = [], w = new Xe([], (!0)), _ = {
            $provide: {
                provider: i(r),
                factory: i(c),
                service: i(l),
                value: i(u),
                constant: i(f),
                decorator: d
            }
        }, x = _.$injector = h(_, function (e, t) {
            throw Ni.isString(t) && $.push(t), _r("unpr", "Unknown provider: {0}", $.join(" <- "))
        }), T = {}, C = T.$injector = h(T, function (e, t) {
            var i = x.get(e + v, t);
            return C.invoke(i.$get, i, n, e)
        });
        return o(p(e), function (e) {
            e && C.invoke(e)
        }), C
    }

    function Je() {
        var e = !0;
        this.disableAutoScrolling = function () {
            e = !1
        }, this.$get = ["$window", "$location", "$rootScope", function (t, n, i) {
            function r(e) {
                var t = null;
                return Array.prototype.some.call(e, function (e) {
                    if ("a" === L(e))return t = e, !0
                }), t
            }

            function o() {
                var e = s.yOffset;
                if (E(e))e = e(); else if (B(e)) {
                    var n = e[0], i = t.getComputedStyle(n);
                    e = "fixed" !== i.position ? 0 : n.getBoundingClientRect().bottom
                } else x(e) || (e = 0);
                return e
            }

            function a(e) {
                if (e) {
                    e.scrollIntoView();
                    var n = o();
                    if (n) {
                        var i = e.getBoundingClientRect().top;
                        t.scrollBy(0, i - n)
                    }
                } else t.scrollTo(0, 0)
            }

            function s(e) {
                e = S(e) ? e : n.hash();
                var t;
                e ? (t = c.getElementById(e)) ? a(t) : (t = r(c.getElementsByName(e))) ? a(t) : "top" === e && a(null) : a(null)
            }

            var c = t.document;
            return e && i.$watch(function () {
                return n.hash()
            }, function (e, t) {
                e === t && "" === e || qe(function () {
                    i.$evalAsync(s)
                })
            }), s
        }]
    }

    function et(e, t) {
        return e || t ? e ? t ? (Li(e) && (e = e.join(" ")), Li(t) && (t = t.join(" ")), e + " " + t) : e : t : ""
    }

    function tt(e) {
        for (var t = 0; t < e.length; t++) {
            var n = e[t];
            if (n.nodeType === xr)return n
        }
    }

    function nt(e) {
        S(e) && (e = e.split(" "));
        var t = ve();
        return o(e, function (e) {
            e.length && (t[e] = !0)
        }), t
    }

    function it(e) {
        return b(e) ? e : {}
    }

    function rt(e, t, n, i) {
        function r(e) {
            try {
                e.apply(null, U(arguments, 1))
            } finally {
                if ($--, 0 === $)for (; w.length;)try {
                    w.pop()()
                } catch (t) {
                    n.error(t)
                }
            }
        }

        function a(e) {
            var t = e.indexOf("#");
            return t === -1 ? "" : e.substr(t)
        }

        function s() {
            l(), u()
        }

        function c() {
            try {
                return p.state
            } catch (e) {
            }
        }

        function l() {
            b = c(), b = y(b) ? null : b, F(b, k) && (b = k), k = b
        }

        function u() {
            S === f.url() && _ === b || (S = f.url(), _ = b, o(E, function (e) {
                e(f.url(), b)
            }))
        }

        var f = this, d = (t[0], e.location), p = e.history, h = e.setTimeout, v = e.clearTimeout, g = {};
        f.isMock = !1;
        var $ = 0, w = [];
        f.$$completeOutstandingRequest = r, f.$$incOutstandingRequestCount = function () {
            $++
        }, f.notifyWhenNoOutstandingRequests = function (e) {
            0 === $ ? e() : w.push(e)
        };
        var b, _, S = d.href, x = t.find("base"), T = null;
        l(), _ = b, f.url = function (t, n, r) {
            if (y(r) && (r = null), d !== e.location && (d = e.location), p !== e.history && (p = e.history), t) {
                var o = _ === r;
                if (S === t && (!i.history || o))return f;
                var s = S && Bt(S) === Bt(t);
                return S = t, _ = r, !i.history || s && o ? (s && !T || (T = t), n ? d.replace(t) : s ? d.hash = a(t) : d.href = t) : (p[n ? "replaceState" : "pushState"](r, "", t), l(), _ = b), f
            }
            return T || d.href.replace(/%27/g, "'")
        }, f.state = function () {
            return b
        };
        var E = [], C = !1, k = null;
        f.onUrlChange = function (t) {
            return C || (i.history && Ei(e).on("popstate", s), Ei(e).on("hashchange", s), C = !0), E.push(t), t
        }, f.$$applicationDestroyed = function () {
            Ei(e).off("hashchange popstate", s)
        }, f.$$checkUrlChange = u, f.baseHref = function () {
            var e = x.attr("href");
            return e ? e.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        }, f.defer = function (e, t) {
            var n;
            return $++, n = h(function () {
                delete g[n], r(e)
            }, t || 0), g[n] = !0, n
        }, f.defer.cancel = function (e) {
            return !!g[e] && (delete g[e], v(e), r(m), !0)
        }
    }

    function ot() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function (e, t, n, i) {
            return new rt(e, i, t, n)
        }]
    }

    function at() {
        this.$get = function () {
            function e(e, n) {
                function r(e) {
                    e != d && (p ? p == e && (p = e.n) : p = e, o(e.n, e.p), o(e, d), d = e, d.n = null)
                }

                function o(e, t) {
                    e != t && (e && (e.p = t), t && (t.n = e))
                }

                if (e in t)throw i("$cacheFactory")("iid", "CacheId '{0}' is already taken!", e);
                var a = 0, s = f({}, n, {id: e}), c = {}, l = n && n.capacity || Number.MAX_VALUE, u = {}, d = null, p = null;
                return t[e] = {
                    put: function (e, t) {
                        if (!y(t)) {
                            if (l < Number.MAX_VALUE) {
                                var n = u[e] || (u[e] = {key: e});
                                r(n)
                            }
                            return e in c || a++, c[e] = t, a > l && this.remove(p.key), t
                        }
                    }, get: function (e) {
                        if (l < Number.MAX_VALUE) {
                            var t = u[e];
                            if (!t)return;
                            r(t)
                        }
                        return c[e]
                    }, remove: function (e) {
                        if (l < Number.MAX_VALUE) {
                            var t = u[e];
                            if (!t)return;
                            t == d && (d = t.p), t == p && (p = t.n), o(t.n, t.p), delete u[e]
                        }
                        delete c[e], a--
                    }, removeAll: function () {
                        c = {}, a = 0, u = {}, d = p = null
                    }, destroy: function () {
                        c = null, s = null, u = null, delete t[e]
                    }, info: function () {
                        return f({}, s, {size: a})
                    }
                }
            }

            var t = {};
            return e.info = function () {
                var e = {};
                return o(t, function (t, n) {
                    e[n] = t.info()
                }), e
            }, e.get = function (e) {
                return t[e]
            }, e
        }
    }

    function st() {
        this.$get = ["$cacheFactory", function (e) {
            return e("templates")
        }]
    }

    function ct(e, i) {
        function r(e, t, n) {
            var i = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/, r = {};
            return o(e, function (e, o) {
                var a = e.match(i);
                if (!a)throw Ar("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", t, o, e, n ? "controller bindings definition" : "isolate scope definition");
                r[o] = {mode: a[1][0], collection: "*" === a[2], optional: "?" === a[3], attrName: a[4] || o}
            }), r
        }

        function a(e, t) {
            var n = {isolateScope: null, bindToController: null};
            if (b(e.scope) && (e.bindToController === !0 ? (n.bindToController = r(e.scope, t, !0), n.isolateScope = {}) : n.isolateScope = r(e.scope, t, !1)), b(e.bindToController) && (n.bindToController = r(e.bindToController, t, !0)), b(n.bindToController)) {
                var i = e.controller, o = e.controllerAs;
                if (!i)throw Ar("noctrl", "Cannot bind to controller without directive '{0}'s controller.", t);
                if (!dt(i, o))throw Ar("noident", "Cannot bind to controller without identifier for directive '{0}'.", t)
            }
            return n
        }

        function c(e) {
            var t = e.charAt(0);
            if (!t || t !== wi(t))throw Ar("baddir", "Directive name '{0}' is invalid. The first character must be a lowercase letter", e);
            if (e !== e.trim())throw Ar("baddir", "Directive name '{0}' is invalid. The name should not contain leading or trailing whitespaces", e)
        }

        var l = {}, u = "Directive", d = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, p = /(([\w\-]+)(?:\:([^;]+))?;?)/, $ = V("ngSrc,ngSrcset,src,srcset"), y = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, _ = /^(on[a-z]+|formaction)$/;
        this.directive = function T(t, n) {
            return pe(t, "directive"), S(t) ? (c(t), fe(n, "directiveFactory"), l.hasOwnProperty(t) || (l[t] = [], e.factory(t + u, ["$injector", "$exceptionHandler", function (e, n) {
                var i = [];
                return o(l[t], function (r, o) {
                    try {
                        var s = e.invoke(r);
                        E(s) ? s = {compile: g(s)} : !s.compile && s.link && (s.compile = g(s.link)), s.priority = s.priority || 0, s.index = o, s.name = s.name || t, s.require = s.require || s.controller && s.name, s.restrict = s.restrict || "EA";
                        var c = s.$$bindings = a(s, s.name);
                        b(c.isolateScope) && (s.$$isolateBindings = c.isolateScope), s.$$moduleName = r.$$moduleName, i.push(s)
                    } catch (l) {
                        n(l)
                    }
                }), i
            }])), l[t].push(n)) : o(t, s(T)), this
        }, this.aHrefSanitizationWhitelist = function (e) {
            return w(e) ? (i.aHrefSanitizationWhitelist(e), this) : i.aHrefSanitizationWhitelist()
        }, this.imgSrcSanitizationWhitelist = function (e) {
            return w(e) ? (i.imgSrcSanitizationWhitelist(e), this) : i.imgSrcSanitizationWhitelist()
        };
        var x = !0;
        this.debugInfoEnabled = function (e) {
            return w(e) ? (x = e, this) : x
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function (e, i, r, a, s, c, g, w, T, C, k) {
            function M(e, t) {
                try {
                    e.addClass(t)
                } catch (n) {
                }
            }

            function D(e, t, n, i, r) {
                e instanceof Ei || (e = Ei(e)), o(e, function (t, n) {
                    t.nodeType == Xi && t.nodeValue.match(/\S+/) && (e[n] = Ei(t).wrap("<span></span>").parent()[0])
                });
                var a = P(e, t, e, n, i, r);
                D.$$addScopeClass(e);
                var s = null;
                return function (t, n, i) {
                    fe(t, "scope"), i = i || {};
                    var r = i.parentBoundTranscludeFn, o = i.transcludeControllers, c = i.futureParentElement;
                    r && r.$$boundTransclude && (r = r.$$boundTransclude), s || (s = I(c));
                    var l;
                    if (l = "html" !== s ? Ei(Q(s, Ei("<div>").append(e).html())) : n ? pr.clone.call(e) : e, o)for (var u in o)l.data("$" + u + "Controller", o[u].instance);
                    return D.$$addScopeInfo(l, t), n && n(l, t), a && a(t, l, l, r), l
                }
            }

            function I(e) {
                var t = e && e[0];
                return t && "foreignobject" !== L(t) && t.toString().match(/SVG/) ? "svg" : "html"
            }

            function P(e, t, i, r, o, a) {
                function s(e, i, r, o) {
                    var a, s, c, l, u, f, d, p, v;
                    if (h) {
                        var g = i.length;
                        for (v = new Array(g), u = 0; u < m.length; u += 3)d = m[u], v[d] = i[d]
                    } else v = i;
                    for (u = 0, f = m.length; u < f;)if (c = v[m[u++]], a = m[u++], s = m[u++], a) {
                        if (a.scope) {
                            l = e.$new(), D.$$addScopeInfo(Ei(c), l);
                            var $ = a.$$destroyBindings;
                            $ && (a.$$destroyBindings = null, l.$on("$destroyed", $))
                        } else l = e;
                        p = a.transcludeOnThisElement ? O(e, a.transclude, o) : !a.templateOnThisElement && o ? o : !o && t ? O(e, t) : null, a(s, l, c, r, p, a)
                    } else s && s(e, c.childNodes, n, o)
                }

                for (var c, l, u, f, d, p, h, m = [], v = 0; v < e.length; v++)c = new oe, l = N(e[v], [], c, 0 === v ? r : n, o), u = l.length ? H(l, e[v], c, t, i, null, [], [], a) : null, u && u.scope && D.$$addScopeClass(c.$$element), d = u && u.terminal || !(f = e[v].childNodes) || !f.length ? null : P(f, u ? (u.transcludeOnThisElement || !u.templateOnThisElement) && u.transclude : t), (u || d) && (m.push(v, u, d), p = !0, h = h || u), a = null;
                return p ? s : null
            }

            function O(e, t, n) {
                var i = function (i, r, o, a, s) {
                    return i || (i = e.$new(!1, s), i.$$transcluded = !0), t(i, r, {
                        parentBoundTranscludeFn: n,
                        transcludeControllers: o,
                        futureParentElement: a
                    })
                };
                return i
            }

            function N(e, t, n, i, r) {
                var o, a, s = e.nodeType, c = n.$attr;
                switch (s) {
                    case Wi:
                        q(t, lt(L(e)), "E", i, r);
                        for (var l, u, f, h, m, v, g = e.attributes, $ = 0, y = g && g.length; $ < y; $++) {
                            var w = !1, _ = !1;
                            l = g[$], u = l.name, m = Hi(l.value), h = lt(u), (v = ue.test(h)) && (u = u.replace(Mr, "").substr(8).replace(/_(.)/g, function (e, t) {
                                return t.toUpperCase()
                            }));
                            var x = h.replace(/(Start|End)$/, "");
                            j(x) && h === x + "Start" && (w = u, _ = u.substr(0, u.length - 5) + "end", u = u.substr(0, u.length - 6)), f = lt(u.toLowerCase()), c[f] = u, !v && n.hasOwnProperty(f) || (n[f] = m, Ue(e, f) && (n[f] = !0)), ee(e, t, m, f, v), q(t, f, "A", i, r, w, _)
                        }
                        if (a = e.className, b(a) && (a = a.animVal), S(a) && "" !== a)for (; o = p.exec(a);)f = lt(o[2]), q(t, f, "C", i, r) && (n[f] = Hi(o[3])), a = a.substr(o.index + o[0].length);
                        break;
                    case Xi:
                        if (11 === Ti)for (; e.parentNode && e.nextSibling && e.nextSibling.nodeType === Xi;)e.nodeValue = e.nodeValue + e.nextSibling.nodeValue, e.parentNode.removeChild(e.nextSibling);
                        K(t, e.nodeValue);
                        break;
                    case Ki:
                        try {
                            o = d.exec(e.nodeValue), o && (f = lt(o[1]), q(t, f, "M", i, r) && (n[f] = Hi(o[2])))
                        } catch (T) {
                        }
                }
                return t.sort(Y), t
            }

            function B(e, t, n) {
                var i = [], r = 0;
                if (t && e.hasAttribute && e.hasAttribute(t)) {
                    do {
                        if (!e)throw Ar("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", t, n);
                        e.nodeType == Wi && (e.hasAttribute(t) && r++, e.hasAttribute(n) && r--), i.push(e), e = e.nextSibling
                    } while (r > 0)
                } else i.push(e);
                return Ei(i)
            }

            function V(e, t, n) {
                return function (i, r, o, a, s) {
                    return r = B(r[0], t, n), e(i, r, o, a, s)
                }
            }

            function H(e, i, o, a, s, l, u, f, d) {
                function p(e, t, n, i) {
                    e && (n && (e = V(e, n, i)), e.require = g.require, e.directiveName = $, (M === g || g.$$isolateScope) && (e = ne(e, {isolateScope: !0})), u.push(e)), t && (n && (t = V(t, n, i)), t.require = g.require, t.directiveName = $, (M === g || g.$$isolateScope) && (t = ne(t, {isolateScope: !0})), f.push(t))
                }

                function h(e, t, n, i) {
                    var r;
                    if (S(t)) {
                        var o = t.match(y), a = t.substring(o[0].length), s = o[1] || o[3], c = "?" === o[2];
                        if ("^^" === s ? n = n.parent() : (r = i && i[a], r = r && r.instance), !r) {
                            var l = "$" + a + "Controller";
                            r = s ? n.inheritedData(l) : n.data(l)
                        }
                        if (!r && !c)throw Ar("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", a, e)
                    } else if (Li(t)) {
                        r = [];
                        for (var u = 0, f = t.length; u < f; u++)r[u] = h(e, t[u], n, i)
                    }
                    return r || null
                }

                function m(e, t, n, i, r, o) {
                    var a = ve();
                    for (var s in i) {
                        var l = i[s], u = {
                            $scope: l === M || l.$$isolateScope ? r : o,
                            $element: e,
                            $attrs: t,
                            $transclude: n
                        }, f = l.controller;
                        "@" == f && (f = t[l.name]);
                        var d = c(f, u, !0, l.controllerAs);
                        a[l.name] = d, R || e.data("$" + l.name + "Controller", d.instance)
                    }
                    return a
                }

                function v(e, t, r, a, s, c) {
                    function l(e, t, i) {
                        var r;
                        return A(e) || (i = t, t = e, e = n), R && (r = y), i || (i = R ? b.parent() : b), s(e, t, r, i, P)
                    }

                    var d, p, v, g, $, y, w, b, _;
                    if (i === r ? (_ = o, b = o.$$element) : (b = Ei(r), _ = new oe(b, o)), M && ($ = t.$new(!0)), s && (w = l, w.$$boundTransclude = s), k && (y = m(b, _, w, k, $, t)), M && (D.$$addScopeInfo(b, $, !0, !(I && (I === M || I === M.$$originalDirective))), D.$$addScopeClass(b, !0), $.$$isolateBindings = M.$$isolateBindings, re(t, _, $, $.$$isolateBindings, M, $)), y) {
                        var S, x, T = M || C;
                        T && y[T.name] && (S = T.$$bindings.bindToController, g = y[T.name], g && g.identifier && S && (x = g, c.$$destroyBindings = re(t, _, g.instance, S, T)));
                        for (d in y) {
                            g = y[d];
                            var E = g();
                            E !== g.instance && (g.instance = E, b.data("$" + d + "Controller", E), g === x && (c.$$destroyBindings(), c.$$destroyBindings = re(t, _, E, S, T)))
                        }
                    }
                    for (d = 0, p = u.length; d < p; d++)v = u[d], ie(v, v.isolateScope ? $ : t, b, _, v.require && h(v.directiveName, v.require, b, y), w);
                    var P = t;
                    for (M && (M.template || null === M.templateUrl) && (P = $), e && e(P, r.childNodes, n, s), d = f.length - 1; d >= 0; d--)v = f[d], ie(v, v.isolateScope ? $ : t, b, _, v.require && h(v.directiveName, v.require, b, y), w)
                }

                d = d || {};
                for (var g, $, w, _, x, T = -Number.MAX_VALUE, C = d.newScopeDirective, k = d.controllerDirectives, M = d.newIsolateScopeDirective, I = d.templateDirective, P = d.nonTlbTranscludeDirective, O = !1, L = !1, R = d.hasElementTranscludeDirective, H = o.$$element = Ei(i), F = l, q = a, j = 0, Y = e.length; j < Y; j++) {
                    g = e[j];
                    var K = g.$$start, J = g.$$end;
                    if (K && (H = B(i, K, J)), w = n, T > g.priority)break;
                    if ((x = g.scope) && (g.templateUrl || (b(x) ? (X("new/isolated scope", M || C, g, H), M = g) : X("new/isolated scope", M, g, H)), C = C || g), $ = g.name, !g.templateUrl && g.controller && (x = g.controller, k = k || ve(), X("'" + $ + "' controller", k[$], g, H), k[$] = g), (x = g.transclude) && (O = !0, g.$$tlb || (X("transclusion", P, g, H), P = g), "element" == x ? (R = !0, T = g.priority, w = H, H = o.$$element = Ei(t.createComment(" " + $ + ": " + o[$] + " ")), i = H[0], te(s, U(w), i), q = D(w, a, T, F && F.name, {nonTlbTranscludeDirective: P})) : (w = Ei(Ae(i)).contents(), H.empty(), q = D(w, a))), g.template)if (L = !0, X("template", I, g, H), I = g, x = E(g.template) ? g.template(H, o) : g.template, x = ce(x), g.replace) {
                        if (F = g, w = Se(x) ? [] : ft(Q(g.templateNamespace, Hi(x))), i = w[0], 1 != w.length || i.nodeType !== Wi)throw Ar("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", $, "");
                        te(s, H, i);
                        var ee = {$attr: {}}, ae = N(i, [], ee), se = e.splice(j + 1, e.length - (j + 1));
                        M && z(ae), e = e.concat(ae).concat(se), G(o, ee), Y = e.length
                    } else H.html(x);
                    if (g.templateUrl)L = !0, X("template", I, g, H), I = g, g.replace && (F = g), v = W(e.splice(j, e.length - j), H, o, s, O && q, u, f, {
                        controllerDirectives: k,
                        newScopeDirective: C !== g && C,
                        newIsolateScopeDirective: M,
                        templateDirective: I,
                        nonTlbTranscludeDirective: P
                    }), Y = e.length; else if (g.compile)try {
                        _ = g.compile(H, o, q), E(_) ? p(null, _, K, J) : _ && p(_.pre, _.post, K, J)
                    } catch (le) {
                        r(le, Z(H))
                    }
                    g.terminal && (v.terminal = !0, T = Math.max(T, g.priority))
                }
                return v.scope = C && C.scope === !0, v.transcludeOnThisElement = O, v.templateOnThisElement = L, v.transclude = q, d.hasElementTranscludeDirective = R, v
            }

            function z(e) {
                for (var t = 0, n = e.length; t < n; t++)e[t] = h(e[t], {$$isolateScope: !0})
            }

            function q(t, i, o, a, s, c, f) {
                if (i === s)return null;
                var d = null;
                if (l.hasOwnProperty(i))for (var p, m = e.get(i + u), v = 0, g = m.length; v < g; v++)try {
                    p = m[v], (a === n || a > p.priority) && p.restrict.indexOf(o) != -1 && (c && (p = h(p, {
                        $$start: c,
                        $$end: f
                    })), t.push(p), d = p)
                } catch ($) {
                    r($)
                }
                return d
            }

            function j(t) {
                if (l.hasOwnProperty(t))for (var n, i = e.get(t + u), r = 0, o = i.length; r < o; r++)if (n = i[r], n.multiElement)return !0;
                return !1
            }

            function G(e, t) {
                var n = t.$attr, i = e.$attr, r = e.$$element;
                o(e, function (i, r) {
                    "$" != r.charAt(0) && (t[r] && t[r] !== i && (i += ("style" === r ? ";" : " ") + t[r]), e.$set(r, i, !0, n[r]))
                }), o(t, function (t, o) {
                    "class" == o ? (M(r, t), e["class"] = (e["class"] ? e["class"] + " " : "") + t) : "style" == o ? (r.attr("style", r.attr("style") + ";" + t), e.style = (e.style ? e.style + ";" : "") + t) : "$" == o.charAt(0) || e.hasOwnProperty(o) || (e[o] = t, i[o] = n[o])
                })
            }

            function W(e, t, n, i, r, s, c, l) {
                var u, f, d = [], p = t[0], m = e.shift(), v = h(m, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: m
                }), g = E(m.templateUrl) ? m.templateUrl(t, n) : m.templateUrl, $ = m.templateNamespace;
                return t.empty(), a(g).then(function (a) {
                    var h, y, w, _;
                    if (a = ce(a), m.replace) {
                        if (w = Se(a) ? [] : ft(Q($, Hi(a))), h = w[0], 1 != w.length || h.nodeType !== Wi)throw Ar("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", m.name, g);
                        y = {$attr: {}}, te(i, t, h);
                        var S = N(h, [], y);
                        b(m.scope) && z(S), e = S.concat(e), G(n, y)
                    } else h = p, t.html(a);
                    for (e.unshift(v), u = H(e, h, n, r, t, m, s, c, l), o(i, function (e, n) {
                        e == h && (i[n] = t[0])
                    }), f = P(t[0].childNodes, r); d.length;) {
                        var x = d.shift(), T = d.shift(), E = d.shift(), C = d.shift(), k = t[0];
                        if (!x.$$destroyed) {
                            if (T !== p) {
                                var A = T.className;
                                l.hasElementTranscludeDirective && m.replace || (k = Ae(h)), te(E, Ei(T), k), M(Ei(k), A)
                            }
                            _ = u.transcludeOnThisElement ? O(x, u.transclude, C) : C, u(f, x, k, i, _, u)
                        }
                    }
                    d = null
                }), function (e, t, n, i, r) {
                    var o = r;
                    t.$$destroyed || (d ? d.push(t, n, i, o) : (u.transcludeOnThisElement && (o = O(t, u.transclude, r)), u(f, t, n, i, o, u)))
                }
            }

            function Y(e, t) {
                var n = t.priority - e.priority;
                return 0 !== n ? n : e.name !== t.name ? e.name < t.name ? -1 : 1 : e.index - t.index
            }

            function X(e, t, n, i) {
                function r(e) {
                    return e ? " (module: " + e + ")" : ""
                }

                if (t)throw Ar("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", t.name, r(t.$$moduleName), n.name, r(n.$$moduleName), e, Z(i))
            }

            function K(e, t) {
                var n = i(t, !0);
                n && e.push({
                    priority: 0, compile: function (e) {
                        var t = e.parent(), i = !!t.length;
                        return i && D.$$addBindingClass(t), function (e, t) {
                            var r = t.parent();
                            i || D.$$addBindingClass(r), D.$$addBindingInfo(r, n.expressions), e.$watch(n, function (e) {
                                t[0].nodeValue = e
                            })
                        }
                    }
                })
            }

            function Q(e, n) {
                switch (e = wi(e || "html")) {
                    case"svg":
                    case"math":
                        var i = t.createElement("div");
                        return i.innerHTML = "<" + e + ">" + n + "</" + e + ">", i.childNodes[0].childNodes;
                    default:
                        return n
                }
            }

            function J(e, t) {
                if ("srcdoc" == t)return T.HTML;
                var n = L(e);
                return "xlinkHref" == t || "form" == n && "action" == t || "img" != n && ("src" == t || "ngSrc" == t) ? T.RESOURCE_URL : void 0
            }

            function ee(e, t, n, r, o) {
                var a = J(e, r);
                o = $[r] || o;
                var s = i(n, !0, a, o);
                if (s) {
                    if ("multiple" === r && "select" === L(e))throw Ar("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", Z(e));
                    t.push({
                        priority: 100, compile: function () {
                            return {
                                pre: function (e, t, c) {
                                    var l = c.$$observers || (c.$$observers = {});
                                    if (_.test(r))throw Ar("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    var u = c[r];
                                    u !== n && (s = u && i(u, !0, a, o), n = u), s && (c[r] = s(e), (l[r] || (l[r] = [])).$$inter = !0, (c.$$observers && c.$$observers[r].$$scope || e).$watch(s, function (e, t) {
                                        "class" === r && e != t ? c.$updateClass(e, t) : c.$set(r, e)
                                    }))
                                }
                            }
                        }
                    })
                }
            }

            function te(e, n, i) {
                var r, o, a = n[0], s = n.length, c = a.parentNode;
                if (e)for (r = 0, o = e.length; r < o; r++)if (e[r] == a) {
                    e[r++] = i;
                    for (var l = r, u = l + s - 1, f = e.length; l < f; l++, u++)u < f ? e[l] = e[u] : delete e[l];
                    e.length -= s - 1, e.context === a && (e.context = i);
                    break
                }
                c && c.replaceChild(i, a);
                var d = t.createDocumentFragment();
                d.appendChild(a), Ei.hasData(a) && (Ei(i).data(Ei(a).data()), Ci ? (Vi = !0, Ci.cleanData([a])) : delete Ei.cache[a[Ei.expando]]);
                for (var p = 1, h = n.length; p < h; p++) {
                    var m = n[p];
                    Ei(m).remove(), d.appendChild(m), delete n[p]
                }
                n[0] = i, n.length = 1
            }

            function ne(e, t) {
                return f(function () {
                    return e.apply(null, arguments)
                }, e, t)
            }

            function ie(e, t, n, i, o, a) {
                try {
                    e(t, n, i, o, a)
                } catch (s) {
                    r(s, Z(n))
                }
            }

            function re(e, t, r, a, c, l) {
                var u;
                o(a, function (o, a) {
                    var l, f, d, p, h = o.attrName, v = o.optional, g = o.mode;
                    switch (bi.call(t, h) || (t[h] = n), g) {
                        case"@":
                            t[h] || v || (r[a] = n), t.$observe(h, function (e) {
                                r[a] = e
                            }), t.$$observers[h].$$scope = e, t[h] && (r[a] = i(t[h])(e));
                            break;
                        case"=":
                            if (v && !t[h])return;
                            f = s(t[h]), p = f.literal ? F : function (e, t) {
                                return e === t || e !== e && t !== t
                            }, d = f.assign || function () {
                                    throw l = r[a] = f(e), Ar("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", t[h], c.name)
                                }, l = r[a] = f(e);
                            var $ = function (t) {
                                return p(t, r[a]) || (p(t, l) ? d(e, t = r[a]) : r[a] = t), l = t
                            };
                            $.$stateful = !0;
                            var y;
                            y = o.collection ? e.$watchCollection(t[h], $) : e.$watch(s(t[h], $), null, f.literal), u = u || [], u.push(y);
                            break;
                        case"&":
                            if (f = s(t[h]), f === m && v)break;
                            r[a] = function (t) {
                                return f(e, t)
                            }
                    }
                });
                var f = u ? function () {
                    for (var e = 0, t = u.length; e < t; ++e)u[e]()
                } : m;
                return l && f !== m ? (l.$on("$destroy", f), m) : f
            }

            var oe = function (e, t) {
                if (t) {
                    var n, i, r, o = Object.keys(t);
                    for (n = 0, i = o.length; n < i; n++)r = o[n], this[r] = t[r]
                } else this.$attr = {};
                this.$$element = e
            };
            oe.prototype = {
                $normalize: lt, $addClass: function (e) {
                    e && e.length > 0 && C.addClass(this.$$element, e)
                }, $removeClass: function (e) {
                    e && e.length > 0 && C.removeClass(this.$$element, e)
                }, $updateClass: function (e, t) {
                    var n = ut(e, t);
                    n && n.length && C.addClass(this.$$element, n);
                    var i = ut(t, e);
                    i && i.length && C.removeClass(this.$$element, i)
                }, $set: function (e, t, i, a) {
                    var s, c = this.$$element[0], l = Ue(c, e), u = je(c, e), f = e;
                    if (l ? (this.$$element.prop(e, t), a = l) : u && (this[u] = t, f = u), this[e] = t, a ? this.$attr[e] = a : (a = this.$attr[e], a || (this.$attr[e] = a = le(e, "-"))), s = L(this.$$element), "a" === s && "href" === e || "img" === s && "src" === e)this[e] = t = k(t, "src" === e); else if ("img" === s && "srcset" === e) {
                        for (var d = "", p = Hi(t), h = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, m = /\s/.test(p) ? h : /(,)/, v = p.split(m), g = Math.floor(v.length / 2), $ = 0; $ < g; $++) {
                            var y = 2 * $;
                            d += k(Hi(v[y]), !0), d += " " + Hi(v[y + 1])
                        }
                        var w = Hi(v[2 * $]).split(/\s/);
                        d += k(Hi(w[0]), !0), 2 === w.length && (d += " " + Hi(w[1])), this[e] = t = d
                    }
                    i !== !1 && (null === t || t === n ? this.$$element.removeAttr(a) : this.$$element.attr(a, t));
                    var b = this.$$observers;
                    b && o(b[f], function (e) {
                        try {
                            e(t)
                        } catch (n) {
                            r(n)
                        }
                    })
                }, $observe: function (e, t) {
                    var n = this, i = n.$$observers || (n.$$observers = ve()), r = i[e] || (i[e] = []);
                    return r.push(t), g.$evalAsync(function () {
                        !r.$$inter && n.hasOwnProperty(e) && t(n[e])
                    }), function () {
                        R(r, t)
                    }
                }
            };
            var ae = i.startSymbol(), se = i.endSymbol(), ce = "{{" == ae || "}}" == se ? v : function (e) {
                return e.replace(/\{\{/g, ae).replace(/}}/g, se)
            }, ue = /^ngAttr[A-Z]/;
            return D.$$addBindingInfo = x ? function (e, t) {
                var n = e.data("$binding") || [];
                Li(t) ? n = n.concat(t) : n.push(t), e.data("$binding", n)
            } : m, D.$$addBindingClass = x ? function (e) {
                M(e, "ng-binding")
            } : m, D.$$addScopeInfo = x ? function (e, t, n, i) {
                var r = n ? i ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                e.data(r, t)
            } : m, D.$$addScopeClass = x ? function (e, t) {
                M(e, t ? "ng-isolate-scope" : "ng-scope")
            } : m, D
        }]
    }

    function lt(e) {
        return _e(e.replace(Mr, ""))
    }

    function ut(e, t) {
        var n = "", i = e.split(/\s+/), r = t.split(/\s+/);
        e:for (var o = 0; o < i.length; o++) {
            for (var a = i[o], s = 0; s < r.length; s++)if (a == r[s])continue e;
            n += (n.length > 0 ? " " : "") + a
        }
        return n
    }

    function ft(e) {
        e = Ei(e);
        var t = e.length;
        if (t <= 1)return e;
        for (; t--;) {
            var n = e[t];
            n.nodeType === Ki && Mi.call(e, t, 1)
        }
        return e
    }

    function dt(e, t) {
        if (t && S(t))return t;
        if (S(e)) {
            var n = Ir.exec(e);
            if (n)return n[3]
        }
    }

    function pt() {
        var e = {}, t = !1;
        this.register = function (t, n) {
            pe(t, "controller"), b(t) ? f(e, t) : e[t] = n
        }, this.allowGlobals = function () {
            t = !0
        }, this.$get = ["$injector", "$window", function (r, o) {
            function a(e, t, n, r) {
                if (!e || !b(e.$scope))throw i("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", r, t);
                e.$scope[t] = n
            }

            return function (i, s, c, l) {
                var u, d, p, h;
                if (c = c === !0, l && S(l) && (h = l), S(i)) {
                    if (d = i.match(Ir), !d)throw Dr("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", i);
                    p = d[1], h = h || d[3], i = e.hasOwnProperty(p) ? e[p] : he(s.$scope, p, !0) || (t ? he(o, p, !0) : n), de(i, p, !0)
                }
                if (c) {
                    var m = (Li(i) ? i[i.length - 1] : i).prototype;
                    u = Object.create(m || null), h && a(s, h, u, p || i.name);
                    var v;
                    return v = f(function () {
                        var e = r.invoke(i, u, s, p);
                        return e !== u && (b(e) || E(e)) && (u = e, h && a(s, h, u, p || i.name)), u
                    }, {instance: u, identifier: h})
                }
                return u = r.instantiate(i, s, p), h && a(s, h, u, p || i.name), u
            }
        }]
    }

    function ht() {
        this.$get = ["$window", function (e) {
            return Ei(e.document)
        }]
    }

    function mt() {
        this.$get = ["$log", function (e) {
            return function (t, n) {
                e.error.apply(e, arguments)
            }
        }]
    }

    function vt(e) {
        return b(e) ? T(e) ? e.toISOString() : W(e) : e
    }

    function gt() {
        this.$get = function () {
            return function (e) {
                if (!e)return "";
                var t = [];
                return a(e, function (e, n) {
                    null === e || y(e) || (Li(e) ? o(e, function (e, i) {
                        t.push(ie(n) + "=" + ie(vt(e)))
                    }) : t.push(ie(n) + "=" + ie(vt(e))))
                }), t.join("&")
            }
        }
    }

    function $t() {
        this.$get = function () {
            return function (e) {
                function t(e, i, r) {
                    null === e || y(e) || (Li(e) ? o(e, function (e) {
                        t(e, i + "[]")
                    }) : b(e) && !T(e) ? a(e, function (e, n) {
                        t(e, i + (r ? "" : "[") + n + (r ? "" : "]"))
                    }) : n.push(ie(i) + "=" + ie(vt(e))))
                }

                if (!e)return "";
                var n = [];
                return t(e, "", !0), n.join("&")
            }
        }
    }

    function yt(e, t) {
        if (S(e)) {
            var n = e.replace(Vr, "").trim();
            if (n) {
                var i = t("Content-Type");
                (i && 0 === i.indexOf(Pr) || wt(n)) && (e = Y(n))
            }
        }
        return e
    }

    function wt(e) {
        var t = e.match(Nr);
        return t && Br[t[0]].test(e)
    }

    function bt(e) {
        function t(e, t) {
            e && (i[e] = i[e] ? i[e] + ", " + t : t)
        }

        var n, i = ve();
        return S(e) ? o(e.split("\n"), function (e) {
            n = e.indexOf(":"), t(wi(Hi(e.substr(0, n))), Hi(e.substr(n + 1)))
        }) : b(e) && o(e, function (e, n) {
            t(wi(n), Hi(e))
        }), i
    }

    function _t(e) {
        var t;
        return function (n) {
            if (t || (t = bt(e)), n) {
                var i = t[wi(n)];
                return void 0 === i && (i = null), i
            }
            return t
        }
    }

    function St(e, t, n, i) {
        return E(i) ? i(e, t, n) : (o(i, function (i) {
            e = i(e, t, n)
        }), e)
    }

    function xt(e) {
        return 200 <= e && e < 300
    }

    function Tt() {
        var e = this.defaults = {
            transformResponse: [yt],
            transformRequest: [function (e) {
                return !b(e) || M(e) || I(e) || D(e) ? e : W(e)
            }],
            headers: {common: {Accept: "application/json, text/plain, */*"}, post: z(Or), put: z(Or), patch: z(Or)},
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            paramSerializer: "$httpParamSerializer"
        }, t = !1;
        this.useApplyAsync = function (e) {
            return w(e) ? (t = !!e, this) : t
        };
        var r = this.interceptors = [];
        this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function (a, s, c, l, u, d) {
            function p(t) {
                function r(e) {
                    var t = f({}, e);
                    return e.data ? t.data = St(e.data, e.headers, e.status, c.transformResponse) : t.data = e.data, xt(e.status) ? t : u.reject(t)
                }

                function a(e, t) {
                    var n, i = {};
                    return o(e, function (e, r) {
                        E(e) ? (n = e(t), null != n && (i[r] = n)) : i[r] = e
                    }), i
                }

                function s(t) {
                    var n, i, r, o = e.headers, s = f({}, t.headers);
                    o = f({}, o.common, o[wi(t.method)]);
                    e:for (n in o) {
                        i = wi(n);
                        for (r in s)if (wi(r) === i)continue e;
                        s[n] = o[n]
                    }
                    return a(s, z(t))
                }

                if (!Ni.isObject(t))throw i("$http")("badreq", "Http request configuration must be an object.  Received: {0}", t);
                var c = f({
                    method: "get",
                    transformRequest: e.transformRequest,
                    transformResponse: e.transformResponse,
                    paramSerializer: e.paramSerializer
                }, t);
                c.headers = s(t), c.method = _i(c.method), c.paramSerializer = S(c.paramSerializer) ? d.get(c.paramSerializer) : c.paramSerializer;
                var l = function (t) {
                    var i = t.headers, a = St(t.data, _t(i), n, t.transformRequest);
                    return y(a) && o(i, function (e, t) {
                        "content-type" === wi(t) && delete i[t]
                    }), y(t.withCredentials) && !y(e.withCredentials) && (t.withCredentials = e.withCredentials), v(t, a).then(r, r)
                }, p = [l, n], h = u.when(c);
                for (o(_, function (e) {
                    (e.request || e.requestError) && p.unshift(e.request, e.requestError), (e.response || e.responseError) && p.push(e.response, e.responseError)
                }); p.length;) {
                    var m = p.shift(), g = p.shift();
                    h = h.then(m, g)
                }
                return h.success = function (e) {
                    return de(e, "fn"), h.then(function (t) {
                        e(t.data, t.status, t.headers, c)
                    }), h
                }, h.error = function (e) {
                    return de(e, "fn"), h.then(null, function (t) {
                        e(t.data, t.status, t.headers, c)
                    }), h
                }, h
            }

            function h(e) {
                o(arguments, function (e) {
                    p[e] = function (t, n) {
                        return p(f({}, n || {}, {method: e, url: t}))
                    }
                })
            }

            function m(e) {
                o(arguments, function (e) {
                    p[e] = function (t, n, i) {
                        return p(f({}, i || {}, {method: e, url: t, data: n}))
                    }
                })
            }

            function v(i, r) {
                function o(e, n, i, r) {
                    function o() {
                        c(n, e, i, r)
                    }

                    h && (xt(e) ? h.put(x, [e, n, bt(i), r]) : h.remove(x)), t ? l.$applyAsync(o) : (o(), l.$$phase || l.$apply())
                }

                function c(e, t, n, r) {
                    t = Math.max(t, 0), (xt(t) ? v.resolve : v.reject)({
                        data: e,
                        status: t,
                        headers: _t(n),
                        config: i,
                        statusText: r
                    })
                }

                function f(e) {
                    c(e.data, e.status, z(e.headers()), e.statusText)
                }

                function d() {
                    var e = p.pendingRequests.indexOf(i);
                    e !== -1 && p.pendingRequests.splice(e, 1)
                }

                var h, m, v = u.defer(), _ = v.promise, S = i.headers, x = g(i.url, i.paramSerializer(i.params));
                if (p.pendingRequests.push(i), _.then(d, d), !i.cache && !e.cache || i.cache === !1 || "GET" !== i.method && "JSONP" !== i.method || (h = b(i.cache) ? i.cache : b(e.cache) ? e.cache : $), h && (m = h.get(x), w(m) ? O(m) ? m.then(f, f) : Li(m) ? c(m[1], m[0], z(m[2]), m[3]) : c(m, 200, {}, "OK") : h.put(x, _)), y(m)) {
                    var T = Cn(i.url) ? s()[i.xsrfCookieName || e.xsrfCookieName] : n;
                    T && (S[i.xsrfHeaderName || e.xsrfHeaderName] = T), a(i.method, x, r, o, S, i.timeout, i.withCredentials, i.responseType)
                }
                return _
            }

            function g(e, t) {
                return t.length > 0 && (e += (e.indexOf("?") == -1 ? "?" : "&") + t), e
            }

            var $ = c("$http");
            e.paramSerializer = S(e.paramSerializer) ? d.get(e.paramSerializer) : e.paramSerializer;
            var _ = [];
            return o(r, function (e) {
                _.unshift(S(e) ? d.get(e) : d.invoke(e))
            }), p.pendingRequests = [], h("get", "delete", "head", "jsonp"), m("post", "put", "patch"), p.defaults = e, p
        }]
    }

    function Et() {
        return new e.XMLHttpRequest
    }

    function Ct() {
        this.$get = ["$browser", "$window", "$document", function (e, t, n) {
            return kt(e, Et, e.defer, t.angular.callbacks, n[0])
        }]
    }

    function kt(e, t, i, r, a) {
        function s(e, t, n) {
            var i = a.createElement("script"), o = null;
            return i.type = "text/javascript", i.src = e, i.async = !0, o = function (e) {
                ir(i, "load", o), ir(i, "error", o), a.body.removeChild(i), i = null;
                var s = -1, c = "unknown";
                e && ("load" !== e.type || r[t].called || (e = {type: "error"}), c = e.type, s = "error" === e.type ? 404 : 200), n && n(s, c)
            }, nr(i, "load", o), nr(i, "error", o), a.body.appendChild(i), o
        }

        return function (a, c, l, u, f, d, p, h) {
            function v() {
                y && y(), b && b.abort()
            }

            function g(t, r, o, a, s) {
                x !== n && i.cancel(x), y = b = null, t(r, o, a, s), e.$$completeOutstandingRequest(m)
            }

            if (e.$$incOutstandingRequestCount(), c = c || e.url(), "jsonp" == wi(a)) {
                var $ = "_" + (r.counter++).toString(36);
                r[$] = function (e) {
                    r[$].data = e, r[$].called = !0
                };
                var y = s(c.replace("JSON_CALLBACK", "angular.callbacks." + $), $, function (e, t) {
                    g(u, e, r[$].data, "", t), r[$] = m
                })
            } else {
                var b = t();
                b.open(a, c, !0), o(f, function (e, t) {
                    w(e) && b.setRequestHeader(t, e)
                }), b.onload = function () {
                    var e = b.statusText || "", t = "response" in b ? b.response : b.responseText, n = 1223 === b.status ? 204 : b.status;
                    0 === n && (n = t ? 200 : "file" == En(c).protocol ? 404 : 0), g(u, n, t, b.getAllResponseHeaders(), e)
                };
                var _ = function () {
                    g(u, -1, null, null, "")
                };
                if (b.onerror = _, b.onabort = _, p && (b.withCredentials = !0), h)try {
                    b.responseType = h
                } catch (S) {
                    if ("json" !== h)throw S
                }
                b.send(l)
            }
            if (d > 0)var x = i(v, d); else O(d) && d.then(v)
        }
    }

    function At() {
        var e = "{{", t = "}}";
        this.startSymbol = function (t) {
            return t ? (e = t, this) : e
        }, this.endSymbol = function (e) {
            return e ? (t = e, this) : t
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function (n, i, r) {
            function o(e) {
                return "\\\\\\" + e
            }

            function a(n) {
                return n.replace(d, e).replace(p, t)
            }

            function s(e) {
                if (null == e)return "";
                switch (typeof e) {
                    case"string":
                        break;
                    case"number":
                        e = "" + e;
                        break;
                    default:
                        e = W(e)
                }
                return e
            }

            function c(o, c, d, p) {
                function h(e) {
                    try {
                        return e = k(e), p && !w(e) ? e : s(e)
                    } catch (t) {
                        i(Lr.interr(o, t))
                    }
                }

                p = !!p;
                for (var m, v, g, $ = 0, b = [], _ = [], S = o.length, x = [], T = []; $ < S;) {
                    if ((m = o.indexOf(e, $)) == -1 || (v = o.indexOf(t, m + l)) == -1) {
                        $ !== S && x.push(a(o.substring($)));
                        break
                    }
                    $ !== m && x.push(a(o.substring($, m))), g = o.substring(m + l, v), b.push(g), _.push(n(g, h)), $ = v + u, T.push(x.length), x.push("")
                }
                if (d && x.length > 1 && Lr.throwNoconcat(o), !c || b.length) {
                    var C = function (e) {
                        for (var t = 0, n = b.length; t < n; t++) {
                            if (p && y(e[t]))return;
                            x[T[t]] = e[t]
                        }
                        return x.join("")
                    }, k = function (e) {
                        return d ? r.getTrusted(d, e) : r.valueOf(e)
                    };
                    return f(function (e) {
                        var t = 0, n = b.length, r = new Array(n);
                        try {
                            for (; t < n; t++)r[t] = _[t](e);
                            return C(r)
                        } catch (a) {
                            i(Lr.interr(o, a))
                        }
                    }, {
                        exp: o, expressions: b, $$watchDelegate: function (e, t) {
                            var n;
                            return e.$watchGroup(_, function (i, r) {
                                var o = C(i);
                                E(t) && t.call(this, o, i !== r ? n : o, e), n = o
                            })
                        }
                    })
                }
            }

            var l = e.length, u = t.length, d = new RegExp(e.replace(/./g, o), "g"), p = new RegExp(t.replace(/./g, o), "g");
            return c.startSymbol = function () {
                return e
            }, c.endSymbol = function () {
                return t
            }, c
        }]
    }

    function Mt() {
        this.$get = ["$rootScope", "$window", "$q", "$$q", function (e, t, n, i) {
            function r(r, a, s, c) {
                var l = arguments.length > 4, u = l ? U(arguments, 4) : [], f = t.setInterval, d = t.clearInterval, p = 0, h = w(c) && !c, m = (h ? i : n).defer(), v = m.promise;
                return s = w(s) ? s : 0, v.then(null, null, l ? function () {
                    r.apply(null, u)
                } : r), v.$$intervalId = f(function () {
                    m.notify(p++), s > 0 && p >= s && (m.resolve(p), d(v.$$intervalId), delete o[v.$$intervalId]), h || e.$apply()
                }, a), o[v.$$intervalId] = m, v
            }

            var o = {};
            return r.cancel = function (e) {
                return !!(e && e.$$intervalId in o) && (o[e.$$intervalId].reject("canceled"), t.clearInterval(e.$$intervalId), delete o[e.$$intervalId], !0)
            }, r
        }]
    }

    function Dt() {
        this.$get = function () {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a",
                    ERANAMES: ["Before Christ", "Anno Domini"],
                    ERAS: ["BC", "AD"]
                },
                pluralCat: function (e) {
                    return 1 === e ? "one" : "other"
                }
            }
        }
    }

    function It(e) {
        for (var t = e.split("/"), n = t.length; n--;)t[n] = ne(t[n]);
        return t.join("/")
    }

    function Pt(e, t) {
        var n = En(e);
        t.$$protocol = n.protocol, t.$$host = n.hostname, t.$$port = p(n.port) || Hr[n.protocol] || null
    }

    function Ot(e, t) {
        var n = "/" !== e.charAt(0);
        n && (e = "/" + e);
        var i = En(e);
        t.$$path = decodeURIComponent(n && "/" === i.pathname.charAt(0) ? i.pathname.substring(1) : i.pathname), t.$$search = ee(i.search), t.$$hash = decodeURIComponent(i.hash), t.$$path && "/" != t.$$path.charAt(0) && (t.$$path = "/" + t.$$path)
    }

    function Nt(e, t) {
        if (0 === t.indexOf(e))return t.substr(e.length)
    }

    function Bt(e) {
        var t = e.indexOf("#");
        return t == -1 ? e : e.substr(0, t)
    }

    function Vt(e) {
        return e.replace(/(#.+)|#$/, "$1")
    }

    function Lt(e) {
        return e.substr(0, Bt(e).lastIndexOf("/") + 1)
    }

    function Rt(e) {
        return e.substring(0, e.indexOf("/", e.indexOf("//") + 2))
    }

    function Ht(e, t) {
        this.$$html5 = !0, t = t || "";
        var i = Lt(e);
        Pt(e, this), this.$$parse = function (e) {
            var t = Nt(i, e);
            if (!S(t))throw zr("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', e, i);
            Ot(t, this), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function () {
            var e = te(this.$$search), t = this.$$hash ? "#" + ne(this.$$hash) : "";
            this.$$url = It(this.$$path) + (e ? "?" + e : "") + t, this.$$absUrl = i + this.$$url.substr(1)
        }, this.$$parseLinkUrl = function (r, o) {
            if (o && "#" === o[0])return this.hash(o.slice(1)), !0;
            var a, s, c;
            return (a = Nt(e, r)) !== n ? (s = a, c = (a = Nt(t, a)) !== n ? i + (Nt("/", a) || a) : e + s) : (a = Nt(i, r)) !== n ? c = i + a : i == r + "/" && (c = i), c && this.$$parse(c), !!c
        }
    }

    function zt(e, t) {
        var n = Lt(e);
        Pt(e, this), this.$$parse = function (i) {
            function r(e, t, n) {
                var i, r = /^\/[A-Z]:(\/.*)/;
                return 0 === t.indexOf(n) && (t = t.replace(n, "")), r.exec(t) ? e : (i = r.exec(e), i ? i[1] : e)
            }

            var o, a = Nt(e, i) || Nt(n, i);
            y(a) || "#" !== a.charAt(0) ? this.$$html5 ? o = a : (o = "", y(a) && (e = i, this.replace())) : (o = Nt(t, a), y(o) && (o = a)), Ot(o, this), this.$$path = r(this.$$path, o, e), this.$$compose()
        }, this.$$compose = function () {
            var n = te(this.$$search), i = this.$$hash ? "#" + ne(this.$$hash) : "";
            this.$$url = It(this.$$path) + (n ? "?" + n : "") + i, this.$$absUrl = e + (this.$$url ? t + this.$$url : "")
        }, this.$$parseLinkUrl = function (t, n) {
            return Bt(e) == Bt(t) && (this.$$parse(t), !0)
        }
    }

    function Ft(e, t) {
        this.$$html5 = !0, zt.apply(this, arguments);
        var n = Lt(e);
        this.$$parseLinkUrl = function (i, r) {
            if (r && "#" === r[0])return this.hash(r.slice(1)), !0;
            var o, a;
            return e == Bt(i) ? o = i : (a = Nt(n, i)) ? o = e + t + a : n === i + "/" && (o = n), o && this.$$parse(o), !!o
        }, this.$$compose = function () {
            var n = te(this.$$search), i = this.$$hash ? "#" + ne(this.$$hash) : "";
            this.$$url = It(this.$$path) + (n ? "?" + n : "") + i, this.$$absUrl = e + t + this.$$url
        }
    }

    function qt(e) {
        return function () {
            return this[e]
        }
    }

    function Ut(e, t) {
        return function (n) {
            return y(n) ? this[e] : (this[e] = t(n), this.$$compose(), this)
        }
    }

    function jt() {
        var e = "", t = {enabled: !1, requireBase: !0, rewriteLinks: !0};
        this.hashPrefix = function (t) {
            return w(t) ? (e = t, this) : e
        }, this.html5Mode = function (e) {
            return P(e) ? (t.enabled = e, this) : b(e) ? (P(e.enabled) && (t.enabled = e.enabled), P(e.requireBase) && (t.requireBase = e.requireBase), P(e.rewriteLinks) && (t.rewriteLinks = e.rewriteLinks), this) : t
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function (n, i, r, o, a) {
            function s(e, t, n) {
                var r = l.url(), o = l.$$state;
                try {
                    i.url(e, t, n), l.$$state = i.state()
                } catch (a) {
                    throw l.url(r), l.$$state = o, a
                }
            }

            function c(e, t) {
                n.$broadcast("$locationChangeSuccess", l.absUrl(), e, l.$$state, t)
            }

            var l, u, f, d = i.baseHref(), p = i.url();
            if (t.enabled) {
                if (!d && t.requireBase)throw zr("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                f = Rt(p) + (d || "/"), u = r.history ? Ht : Ft
            } else f = Bt(p), u = zt;
            l = new u(f, "#" + e), l.$$parseLinkUrl(p, p), l.$$state = i.state();
            var h = /^\s*(javascript|mailto):/i;
            o.on("click", function (e) {
                if (t.rewriteLinks && !e.ctrlKey && !e.metaKey && !e.shiftKey && 2 != e.which && 2 != e.button) {
                    for (var r = Ei(e.target); "a" !== L(r[0]);)if (r[0] === o[0] || !(r = r.parent())[0])return;
                    var s = r.prop("href"), c = r.attr("href") || r.attr("xlink:href");
                    b(s) && "[object SVGAnimatedString]" === s.toString() && (s = En(s.animVal).href), h.test(s) || !s || r.attr("target") || e.isDefaultPrevented() || l.$$parseLinkUrl(s, c) && (e.preventDefault(), l.absUrl() != i.url() && (n.$apply(), a.angular["ff-684208-preventDefault"] = !0))
                }
            }), Vt(l.absUrl()) != Vt(p) && i.url(l.absUrl(), !0);
            var m = !0;
            return i.onUrlChange(function (e, t) {
                n.$evalAsync(function () {
                    var i, r = l.absUrl(), o = l.$$state;
                    l.$$parse(e), l.$$state = t, i = n.$broadcast("$locationChangeStart", e, r, t, o).defaultPrevented, l.absUrl() === e && (i ? (l.$$parse(r), l.$$state = o, s(r, !1, o)) : (m = !1, c(r, o)))
                }), n.$$phase || n.$digest()
            }), n.$watch(function () {
                var e = Vt(i.url()), t = Vt(l.absUrl()), o = i.state(), a = l.$$replace, u = e !== t || l.$$html5 && r.history && o !== l.$$state;
                (m || u) && (m = !1, n.$evalAsync(function () {
                    var t = l.absUrl(), i = n.$broadcast("$locationChangeStart", t, e, l.$$state, o).defaultPrevented;
                    l.absUrl() === t && (i ? (l.$$parse(e), l.$$state = o) : (u && s(t, a, o === l.$$state ? null : l.$$state), c(e, o)))
                })), l.$$replace = !1
            }), l
        }]
    }

    function Gt() {
        var e = !0, t = this;
        this.debugEnabled = function (t) {
            return w(t) ? (e = t, this) : e
        }, this.$get = ["$window", function (n) {
            function i(e) {
                return e instanceof Error && (e.stack ? e = e.message && e.stack.indexOf(e.message) === -1 ? "Error: " + e.message + "\n" + e.stack : e.stack : e.sourceURL && (e = e.message + "\n" + e.sourceURL + ":" + e.line)), e
            }

            function r(e) {
                var t = n.console || {}, r = t[e] || t.log || m, a = !1;
                try {
                    a = !!r.apply
                } catch (s) {
                }
                return a ? function () {
                    var e = [];
                    return o(arguments, function (t) {
                        e.push(i(t))
                    }), r.apply(t, e)
                } : function (e, t) {
                    r(e, null == t ? "" : t)
                }
            }

            return {
                log: r("log"), info: r("info"), warn: r("warn"), error: r("error"), debug: function () {
                    var n = r("debug");
                    return function () {
                        e && n.apply(t, arguments)
                    }
                }()
            }
        }]
    }

    function Wt(e, t) {
        if ("__defineGetter__" === e || "__defineSetter__" === e || "__lookupGetter__" === e || "__lookupSetter__" === e || "__proto__" === e)throw qr("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", t);
        return e
    }

    function Yt(e, t) {
        if (e) {
            if (e.constructor === e)throw qr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
            if (e.window === e)throw qr("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", t);
            if (e.children && (e.nodeName || e.prop && e.attr && e.find))throw qr("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", t);
            if (e === Object)throw qr("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", t)
        }
        return e
    }

    function Xt(e, t) {
        if (e) {
            if (e.constructor === e)throw qr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
            if (e === Ur || e === jr || e === Gr)throw qr("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", t)
        }
    }

    function Kt(e, t) {
        return "undefined" != typeof e ? e : t
    }

    function Qt(e, t) {
        return "undefined" == typeof e ? t : "undefined" == typeof t ? e : e + t
    }

    function Zt(e, t) {
        var n = e(t);
        return !n.$stateful
    }

    function Jt(e, t) {
        var n, i;
        switch (e.type) {
            case Kr.Program:
                n = !0, o(e.body, function (e) {
                    Jt(e.expression, t), n = n && e.expression.constant
                }), e.constant = n;
                break;
            case Kr.Literal:
                e.constant = !0, e.toWatch = [];
                break;
            case Kr.UnaryExpression:
                Jt(e.argument, t), e.constant = e.argument.constant, e.toWatch = e.argument.toWatch;
                break;
            case Kr.BinaryExpression:
                Jt(e.left, t), Jt(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = e.left.toWatch.concat(e.right.toWatch);
                break;
            case Kr.LogicalExpression:
                Jt(e.left, t), Jt(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = e.constant ? [] : [e];
                break;
            case Kr.ConditionalExpression:
                Jt(e.test, t), Jt(e.alternate, t), Jt(e.consequent, t), e.constant = e.test.constant && e.alternate.constant && e.consequent.constant, e.toWatch = e.constant ? [] : [e];
                break;
            case Kr.Identifier:
                e.constant = !1, e.toWatch = [e];
                break;
            case Kr.MemberExpression:
                Jt(e.object, t), e.computed && Jt(e.property, t), e.constant = e.object.constant && (!e.computed || e.property.constant), e.toWatch = [e];
                break;
            case Kr.CallExpression:
                n = !!e.filter && Zt(t, e.callee.name), i = [], o(e.arguments, function (e) {
                    Jt(e, t), n = n && e.constant, e.constant || i.push.apply(i, e.toWatch)
                }), e.constant = n, e.toWatch = e.filter && Zt(t, e.callee.name) ? i : [e];
                break;
            case Kr.AssignmentExpression:
                Jt(e.left, t), Jt(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = [e];
                break;
            case Kr.ArrayExpression:
                n = !0, i = [], o(e.elements, function (e) {
                    Jt(e, t), n = n && e.constant, e.constant || i.push.apply(i, e.toWatch)
                }), e.constant = n, e.toWatch = i;
                break;
            case Kr.ObjectExpression:
                n = !0, i = [], o(e.properties, function (e) {
                    Jt(e.value, t), n = n && e.value.constant, e.value.constant || i.push.apply(i, e.value.toWatch)
                }), e.constant = n, e.toWatch = i;
                break;
            case Kr.ThisExpression:
                e.constant = !1, e.toWatch = []
        }
    }

    function en(e) {
        if (1 == e.length) {
            var t = e[0].expression, i = t.toWatch;
            return 1 !== i.length ? i : i[0] !== t ? i : n
        }
    }

    function tn(e) {
        return e.type === Kr.Identifier || e.type === Kr.MemberExpression
    }

    function nn(e) {
        if (1 === e.body.length && tn(e.body[0].expression))return {
            type: Kr.AssignmentExpression,
            left: e.body[0].expression,
            right: {type: Kr.NGValueParameter},
            operator: "="
        }
    }

    function rn(e) {
        return 0 === e.body.length || 1 === e.body.length && (e.body[0].expression.type === Kr.Literal || e.body[0].expression.type === Kr.ArrayExpression || e.body[0].expression.type === Kr.ObjectExpression)
    }

    function on(e) {
        return e.constant
    }

    function an(e, t) {
        this.astBuilder = e, this.$filter = t
    }

    function sn(e, t) {
        this.astBuilder = e, this.$filter = t
    }

    function cn(e, t, n, i) {
        Yt(e, i);
        for (var r, o = t.split("."), a = 0; o.length > 1; a++) {
            r = Wt(o.shift(), i);
            var s = Yt(e[r], i);
            s || (s = {}, e[r] = s), e = s
        }
        return r = Wt(o.shift(), i), Yt(e[r], i), e[r] = n, n
    }

    function ln(e) {
        return "constructor" == e
    }

    function un(e) {
        return E(e.valueOf) ? e.valueOf() : Zr.call(e)
    }

    function fn() {
        var e = ve(), t = ve();
        this.$get = ["$filter", "$sniffer", function (i, r) {
            function a(e, t) {
                return null == e || null == t ? e === t : ("object" != typeof e || (e = un(e), "object" != typeof e)) && (e === t || e !== e && t !== t)
            }

            function s(e, t, i, r, o) {
                var s, c = r.inputs;
                if (1 === c.length) {
                    var l = a;
                    return c = c[0], e.$watch(function (e) {
                        var t = c(e);
                        return a(t, l) || (s = r(e, n, n, [t]), l = t && un(t)), s
                    }, t, i, o)
                }
                for (var u = [], f = [], d = 0, p = c.length; d < p; d++)u[d] = a, f[d] = null;
                return e.$watch(function (e) {
                    for (var t = !1, i = 0, o = c.length; i < o; i++) {
                        var l = c[i](e);
                        (t || (t = !a(l, u[i]))) && (f[i] = l, u[i] = l && un(l))
                    }
                    return t && (s = r(e, n, n, f)), s
                }, t, i, o)
            }

            function c(e, t, n, i) {
                var r, o;
                return r = e.$watch(function (e) {
                    return i(e)
                }, function (e, n, i) {
                    o = e, E(t) && t.apply(this, arguments), w(e) && i.$$postDigest(function () {
                        w(o) && r()
                    })
                }, n)
            }

            function l(e, t, n, i) {
                function r(e) {
                    var t = !0;
                    return o(e, function (e) {
                        w(e) || (t = !1)
                    }), t
                }

                var a, s;
                return a = e.$watch(function (e) {
                    return i(e)
                }, function (e, n, i) {
                    s = e, E(t) && t.call(this, e, n, i), r(e) && i.$$postDigest(function () {
                        r(s) && a()
                    })
                }, n)
            }

            function u(e, t, n, i) {
                var r;
                return r = e.$watch(function (e) {
                    return i(e)
                }, function (e, n, i) {
                    E(t) && t.apply(this, arguments), r()
                }, n)
            }

            function f(e, t) {
                if (!t)return e;
                var n = e.$$watchDelegate, i = n !== l && n !== c, r = i ? function (n, i, r, o) {
                    var a = e(n, i, r, o);
                    return t(a, n, i)
                } : function (n, i, r, o) {
                    var a = e(n, i, r, o), s = t(a, n, i);
                    return w(a) ? s : a
                };
                return e.$$watchDelegate && e.$$watchDelegate !== s ? r.$$watchDelegate = e.$$watchDelegate : t.$stateful || (r.$$watchDelegate = s, r.inputs = e.inputs ? e.inputs : [e]), r
            }

            var d = {csp: r.csp, expensiveChecks: !1}, p = {csp: r.csp, expensiveChecks: !0};
            return function (n, r, o) {
                var a, h, v;
                switch (typeof n) {
                    case"string":
                        n = n.trim(), v = n;
                        var g = o ? t : e;
                        if (a = g[v], !a) {
                            ":" === n.charAt(0) && ":" === n.charAt(1) && (h = !0, n = n.substring(2));
                            var $ = o ? p : d, y = new Xr($), w = new Qr(y, i, $);
                            a = w.parse(n), a.constant ? a.$$watchDelegate = u : h ? a.$$watchDelegate = a.literal ? l : c : a.inputs && (a.$$watchDelegate = s), g[v] = a
                        }
                        return f(a, r);
                    case"function":
                        return f(n, r);
                    default:
                        return m
                }
            }
        }]
    }

    function dn() {
        this.$get = ["$rootScope", "$exceptionHandler", function (e, t) {
            return hn(function (t) {
                e.$evalAsync(t)
            }, t)
        }]
    }

    function pn() {
        this.$get = ["$browser", "$exceptionHandler", function (e, t) {
            return hn(function (t) {
                e.defer(t)
            }, t)
        }]
    }

    function hn(e, t) {
        function r(e, t, n) {
            function i(t) {
                return function (n) {
                    r || (r = !0, t.call(e, n))
                }
            }

            var r = !1;
            return [i(t), i(n)]
        }

        function a() {
            this.$$state = {status: 0}
        }

        function s(e, t) {
            return function (n) {
                t.call(e, n)
            }
        }

        function c(e) {
            var i, r, o;
            o = e.pending, e.processScheduled = !1, e.pending = n;
            for (var a = 0, s = o.length; a < s; ++a) {
                r = o[a][0], i = o[a][e.status];
                try {
                    E(i) ? r.resolve(i(e.value)) : 1 === e.status ? r.resolve(e.value) : r.reject(e.value)
                } catch (c) {
                    r.reject(c), t(c)
                }
            }
        }

        function l(t) {
            !t.processScheduled && t.pending && (t.processScheduled = !0, e(function () {
                c(t)
            }))
        }

        function u() {
            this.promise = new a, this.resolve = s(this, this.resolve), this.reject = s(this, this.reject), this.notify = s(this, this.notify)
        }

        function f(e) {
            var t = new u, n = 0, i = Li(e) ? [] : {};
            return o(e, function (e, r) {
                n++, g(e).then(function (e) {
                    i.hasOwnProperty(r) || (i[r] = e, --n || t.resolve(i))
                }, function (e) {
                    i.hasOwnProperty(r) || t.reject(e)
                })
            }), 0 === n && t.resolve(i), t.promise
        }

        var d = i("$q", TypeError), p = function () {
            return new u
        };
        a.prototype = {
            then: function (e, t, n) {
                var i = new u;
                return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([i, e, t, n]), this.$$state.status > 0 && l(this.$$state), i.promise
            }, "catch": function (e) {
                return this.then(null, e)
            }, "finally": function (e, t) {
                return this.then(function (t) {
                    return v(t, !0, e)
                }, function (t) {
                    return v(t, !1, e)
                }, t)
            }
        }, u.prototype = {
            resolve: function (e) {
                this.promise.$$state.status || (e === this.promise ? this.$$reject(d("qcycle", "Expected promise to be resolved with value other than itself '{0}'", e)) : this.$$resolve(e))
            }, $$resolve: function (e) {
                var n, i;
                i = r(this, this.$$resolve, this.$$reject);
                try {
                    (b(e) || E(e)) && (n = e && e.then), E(n) ? (this.promise.$$state.status = -1, n.call(e, i[0], i[1], this.notify)) : (this.promise.$$state.value = e, this.promise.$$state.status = 1, l(this.promise.$$state))
                } catch (o) {
                    i[1](o), t(o)
                }
            }, reject: function (e) {
                this.promise.$$state.status || this.$$reject(e)
            }, $$reject: function (e) {
                this.promise.$$state.value = e, this.promise.$$state.status = 2, l(this.promise.$$state)
            }, notify: function (n) {
                var i = this.promise.$$state.pending;
                this.promise.$$state.status <= 0 && i && i.length && e(function () {
                    for (var e, r, o = 0, a = i.length; o < a; o++) {
                        r = i[o][0], e = i[o][3];
                        try {
                            r.notify(E(e) ? e(n) : n)
                        } catch (s) {
                            t(s)
                        }
                    }
                })
            }
        };
        var h = function (e) {
            var t = new u;
            return t.reject(e), t.promise
        }, m = function (e, t) {
            var n = new u;
            return t ? n.resolve(e) : n.reject(e), n.promise
        }, v = function (e, t, n) {
            var i = null;
            try {
                E(n) && (i = n())
            } catch (r) {
                return m(r, !1)
            }
            return O(i) ? i.then(function () {
                return m(e, t)
            }, function (e) {
                return m(e, !1)
            }) : m(e, t)
        }, g = function (e, t, n, i) {
            var r = new u;
            return r.resolve(e), r.promise.then(t, n, i)
        }, $ = g, y = function w(e) {
            function t(e) {
                i.resolve(e)
            }

            function n(e) {
                i.reject(e)
            }

            if (!E(e))throw d("norslvr", "Expected resolverFn, got '{0}'", e);
            if (!(this instanceof w))return new w(e);
            var i = new u;
            return e(t, n), i.promise
        };
        return y.defer = p, y.reject = h, y.when = g, y.resolve = $, y.all = f, y
    }

    function mn() {
        this.$get = ["$window", "$timeout", function (e, t) {
            function n() {
                for (var e = 0; e < u.length; e++) {
                    var t = u[e];
                    t && (u[e] = null, t())
                }
                l = u.length = 0
            }

            function i(e) {
                var t = u.length;
                return l++, u.push(e), 0 === t && (c = s(n)), function () {
                    t >= 0 && (u[t] = null, t = null, 0 === --l && c && (c(), c = null, u.length = 0))
                }
            }

            var r = e.requestAnimationFrame || e.webkitRequestAnimationFrame, o = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.webkitCancelRequestAnimationFrame, a = !!r, s = a ? function (e) {
                var t = r(e);
                return function () {
                    o(t)
                }
            } : function (e) {
                var n = t(e, 16.66, !1);
                return function () {
                    t.cancel(n)
                }
            };
            i.supported = a;
            var c, l = 0, u = [];
            return i
        }]
    }

    function vn() {
        function e(e) {
            function t() {
                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = c(), this.$$ChildScope = null
            }

            return t.prototype = e, t
        }

        var t = 10, n = i("$rootScope"), a = null, s = null;
        this.digestTtl = function (e) {
            return arguments.length && (t = e), t
        }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function (i, l, u, f) {
            function d(e) {
                e.currentScope.$$destroyed = !0
            }

            function p() {
                this.$id = c(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$$isolateBindings = null
            }

            function h(e) {
                if (x.$$phase)throw n("inprog", "{0} already in progress", x.$$phase);
                x.$$phase = e
            }

            function v() {
                x.$$phase = null
            }

            function g(e, t) {
                do e.$$watchersCount += t; while (e = e.$parent)
            }

            function $(e, t, n) {
                do e.$$listenerCount[n] -= t, 0 === e.$$listenerCount[n] && delete e.$$listenerCount[n]; while (e = e.$parent)
            }

            function w() {
            }

            function _() {
                for (; k.length;)try {
                    k.shift()()
                } catch (e) {
                    l(e)
                }
                s = null
            }

            function S() {
                null === s && (s = f.defer(function () {
                    x.$apply(_)
                }))
            }

            p.prototype = {
                constructor: p, $new: function (t, n) {
                    var i;
                    return n = n || this, t ? (i = new p, i.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = e(this)), i = new this.$$ChildScope), i.$parent = n, i.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = i, n.$$childTail = i) : n.$$childHead = n.$$childTail = i, (t || n != this) && i.$on("$destroy", d), i
                }, $watch: function (e, t, n, i) {
                    var r = u(e);
                    if (r.$$watchDelegate)return r.$$watchDelegate(this, t, n, r, e);
                    var o = this, s = o.$$watchers, c = {fn: t, last: w, get: r, exp: i || e, eq: !!n};
                    return a = null, E(t) || (c.fn = m), s || (s = o.$$watchers = []), s.unshift(c), g(this, 1), function () {
                        R(s, c) >= 0 && g(o, -1), a = null
                    }
                }, $watchGroup: function (e, t) {
                    function n() {
                        c = !1, l ? (l = !1, t(r, r, s)) : t(r, i, s)
                    }

                    var i = new Array(e.length), r = new Array(e.length), a = [], s = this, c = !1, l = !0;
                    if (!e.length) {
                        var u = !0;
                        return s.$evalAsync(function () {
                            u && t(r, r, s)
                        }), function () {
                            u = !1
                        }
                    }
                    return 1 === e.length ? this.$watch(e[0], function (e, n, o) {
                        r[0] = e, i[0] = n, t(r, e === n ? r : i, o)
                    }) : (o(e, function (e, t) {
                        var o = s.$watch(e, function (e, o) {
                            r[t] = e, i[t] = o, c || (c = !0, s.$evalAsync(n))
                        });
                        a.push(o)
                    }), function () {
                        for (; a.length;)a.shift()()
                    })
                }, $watchCollection: function (e, t) {
                    function n(e) {
                        o = e;
                        var t, n, i, s, c;
                        if (!y(o)) {
                            if (b(o))if (r(o)) {
                                a !== p && (a = p, v = a.length = 0, f++), t = o.length, v !== t && (f++, a.length = v = t);
                                for (var l = 0; l < t; l++)c = a[l], s = o[l], i = c !== c && s !== s, i || c === s || (f++, a[l] = s)
                            } else {
                                a !== h && (a = h = {}, v = 0, f++), t = 0;
                                for (n in o)o.hasOwnProperty(n) && (t++, s = o[n], c = a[n], n in a ? (i = c !== c && s !== s, i || c === s || (f++, a[n] = s)) : (v++, a[n] = s, f++));
                                if (v > t) {
                                    f++;
                                    for (n in a)o.hasOwnProperty(n) || (v--, delete a[n])
                                }
                            } else a !== o && (a = o, f++);
                            return f
                        }
                    }

                    function i() {
                        if (m ? (m = !1, t(o, o, c)) : t(o, s, c), l)if (b(o))if (r(o)) {
                            s = new Array(o.length);
                            for (var e = 0; e < o.length; e++)s[e] = o[e]
                        } else {
                            s = {};
                            for (var n in o)bi.call(o, n) && (s[n] = o[n])
                        } else s = o
                    }

                    n.$stateful = !0;
                    var o, a, s, c = this, l = t.length > 1, f = 0, d = u(e, n), p = [], h = {}, m = !0, v = 0;
                    return this.$watch(d, i)
                }, $digest: function () {
                    var e, i, r, o, c, u, d, p, m, g, $ = t, y = this, b = [];
                    h("$digest"), f.$$checkUrlChange(), this === x && null !== s && (f.defer.cancel(s), _()), a = null;
                    do {
                        for (u = !1, p = y; T.length;) {
                            try {
                                g = T.shift(), g.scope.$eval(g.expression, g.locals)
                            } catch (S) {
                                l(S)
                            }
                            a = null
                        }
                        e:do {
                            if (o = p.$$watchers)for (c = o.length; c--;)try {
                                if (e = o[c])if ((i = e.get(p)) === (r = e.last) || (e.eq ? F(i, r) : "number" == typeof i && "number" == typeof r && isNaN(i) && isNaN(r))) {
                                    if (e === a) {
                                        u = !1;
                                        break e
                                    }
                                } else u = !0, a = e, e.last = e.eq ? H(i, null) : i, e.fn(i, r === w ? i : r, p), $ < 5 && (m = 4 - $, b[m] || (b[m] = []), b[m].push({
                                    msg: E(e.exp) ? "fn: " + (e.exp.name || e.exp.toString()) : e.exp,
                                    newVal: i,
                                    oldVal: r
                                }))
                            } catch (S) {
                                l(S)
                            }
                            if (!(d = p.$$watchersCount && p.$$childHead || p !== y && p.$$nextSibling))for (; p !== y && !(d = p.$$nextSibling);)p = p.$parent
                        } while (p = d);
                        if ((u || T.length) && !$--)throw v(), n("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", t, b)
                    } while (u || T.length);
                    for (v(); C.length;)try {
                        C.shift()()
                    } catch (S) {
                        l(S)
                    }
                }, $destroy: function () {
                    if (!this.$$destroyed) {
                        var e = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this === x && f.$$applicationDestroyed(), g(this, -this.$$watchersCount);
                        for (var t in this.$$listenerCount)$(this, this.$$listenerCount[t], t);
                        e && e.$$childHead == this && (e.$$childHead = this.$$nextSibling), e && e.$$childTail == this && (e.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = m, this.$on = this.$watch = this.$watchGroup = function () {
                            return m
                        }, this.$$listeners = {}, this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null
                    }
                }, $eval: function (e, t) {
                    return u(e)(this, t)
                }, $evalAsync: function (e, t) {
                    x.$$phase || T.length || f.defer(function () {
                        T.length && x.$digest()
                    }), T.push({scope: this, expression: e, locals: t})
                }, $$postDigest: function (e) {
                    C.push(e)
                }, $apply: function (e) {
                    try {
                        return h("$apply"), this.$eval(e)
                    } catch (t) {
                        l(t)
                    } finally {
                        v();
                        try {
                            x.$digest()
                        } catch (t) {
                            throw l(t), t
                        }
                    }
                }, $applyAsync: function (e) {
                    function t() {
                        n.$eval(e)
                    }

                    var n = this;
                    e && k.push(t), S()
                }, $on: function (e, t) {
                    var n = this.$$listeners[e];
                    n || (this.$$listeners[e] = n = []), n.push(t);
                    var i = this;
                    do i.$$listenerCount[e] || (i.$$listenerCount[e] = 0), i.$$listenerCount[e]++; while (i = i.$parent);
                    var r = this;
                    return function () {
                        var i = n.indexOf(t);
                        i !== -1 && (n[i] = null, $(r, 1, e))
                    }
                }, $emit: function (e, t) {
                    var n, i, r, o = [], a = this, s = !1, c = {
                        name: e, targetScope: a, stopPropagation: function () {
                            s = !0
                        }, preventDefault: function () {
                            c.defaultPrevented = !0
                        }, defaultPrevented: !1
                    }, u = q([c], arguments, 1);
                    do {
                        for (n = a.$$listeners[e] || o, c.currentScope = a, i = 0, r = n.length; i < r; i++)if (n[i])try {
                            n[i].apply(null, u)
                        } catch (f) {
                            l(f)
                        } else n.splice(i, 1), i--, r--;
                        if (s)return c.currentScope = null, c;
                        a = a.$parent
                    } while (a);
                    return c.currentScope = null, c
                }, $broadcast: function (e, t) {
                    var n = this, i = n, r = n, o = {
                        name: e, targetScope: n, preventDefault: function () {
                            o.defaultPrevented = !0
                        }, defaultPrevented: !1
                    };
                    if (!n.$$listenerCount[e])return o;
                    for (var a, s, c, u = q([o], arguments, 1); i = r;) {
                        for (o.currentScope = i, a = i.$$listeners[e] || [], s = 0, c = a.length; s < c; s++)if (a[s])try {
                            a[s].apply(null, u)
                        } catch (f) {
                            l(f)
                        } else a.splice(s, 1), s--, c--;
                        if (!(r = i.$$listenerCount[e] && i.$$childHead || i !== n && i.$$nextSibling))for (; i !== n && !(r = i.$$nextSibling);)i = i.$parent
                    }
                    return o.currentScope = null, o
                }
            };
            var x = new p, T = x.$$asyncQueue = [], C = x.$$postDigestQueue = [], k = x.$$applyAsyncQueue = [];
            return x
        }]
    }

    function gn() {
        var e = /^\s*(https?|ftp|mailto|tel|file):/, t = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function (t) {
            return w(t) ? (e = t, this) : e
        }, this.imgSrcSanitizationWhitelist = function (e) {
            return w(e) ? (t = e, this) : t
        }, this.$get = function () {
            return function (n, i) {
                var r, o = i ? t : e;
                return r = En(n).href, "" === r || r.match(o) ? n : "unsafe:" + r
            }
        }
    }

    function $n(e) {
        if ("self" === e)return e;
        if (S(e)) {
            if (e.indexOf("***") > -1)throw Jr("iwcard", "Illegal sequence *** in string matcher.  String: {0}", e);
            return e = zi(e).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + e + "$")
        }
        if (C(e))return new RegExp("^" + e.source + "$");
        throw Jr("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
    }

    function yn(e) {
        var t = [];
        return w(e) && o(e, function (e) {
            t.push($n(e))
        }), t
    }

    function wn() {
        this.SCE_CONTEXTS = eo;
        var e = ["self"], t = [];
        this.resourceUrlWhitelist = function (t) {
            return arguments.length && (e = yn(t)), e
        }, this.resourceUrlBlacklist = function (e) {
            return arguments.length && (t = yn(e)), t
        }, this.$get = ["$injector", function (i) {
            function r(e, t) {
                return "self" === e ? Cn(t) : !!e.exec(t.href)
            }

            function o(n) {
                var i, o, a = En(n.toString()), s = !1;
                for (i = 0, o = e.length; i < o; i++)if (r(e[i], a)) {
                    s = !0;
                    break
                }
                if (s)for (i = 0, o = t.length; i < o; i++)if (r(t[i], a)) {
                    s = !1;
                    break
                }
                return s
            }

            function a(e) {
                var t = function (e) {
                    this.$$unwrapTrustedValue = function () {
                        return e
                    }
                };
                return e && (t.prototype = new e), t.prototype.valueOf = function () {
                    return this.$$unwrapTrustedValue()
                }, t.prototype.toString = function () {
                    return this.$$unwrapTrustedValue().toString()
                }, t
            }

            function s(e, t) {
                var i = d.hasOwnProperty(e) ? d[e] : null;
                if (!i)throw Jr("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", e, t);
                if (null === t || t === n || "" === t)return t;
                if ("string" != typeof t)throw Jr("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", e);
                return new i(t)
            }

            function c(e) {
                return e instanceof f ? e.$$unwrapTrustedValue() : e
            }

            function l(e, t) {
                if (null === t || t === n || "" === t)return t;
                var i = d.hasOwnProperty(e) ? d[e] : null;
                if (i && t instanceof i)return t.$$unwrapTrustedValue();
                if (e === eo.RESOURCE_URL) {
                    if (o(t))return t;
                    throw Jr("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", t.toString())
                }
                if (e === eo.HTML)return u(t);
                throw Jr("unsafe", "Attempting to use an unsafe value in a safe context.")
            }

            var u = function (e) {
                throw Jr("unsafe", "Attempting to use an unsafe value in a safe context.")
            };
            i.has("$sanitize") && (u = i.get("$sanitize"));
            var f = a(), d = {};
            return d[eo.HTML] = a(f), d[eo.CSS] = a(f), d[eo.URL] = a(f), d[eo.JS] = a(f), d[eo.RESOURCE_URL] = a(d[eo.URL]), {
                trustAs: s,
                getTrusted: l,
                valueOf: c
            }
        }]
    }

    function bn() {
        var e = !0;
        this.enabled = function (t) {
            return arguments.length && (e = !!t), e
        }, this.$get = ["$parse", "$sceDelegate", function (t, n) {
            if (e && Ti < 8)throw Jr("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var i = z(eo);
            i.isEnabled = function () {
                return e
            }, i.trustAs = n.trustAs, i.getTrusted = n.getTrusted, i.valueOf = n.valueOf, e || (i.trustAs = i.getTrusted = function (e, t) {
                return t
            }, i.valueOf = v), i.parseAs = function (e, n) {
                var r = t(n);
                return r.literal && r.constant ? r : t(n, function (t) {
                    return i.getTrusted(e, t)
                })
            };
            var r = i.parseAs, a = i.getTrusted, s = i.trustAs;
            return o(eo, function (e, t) {
                var n = wi(t);
                i[_e("parse_as_" + n)] = function (t) {
                    return r(e, t)
                }, i[_e("get_trusted_" + n)] = function (t) {
                    return a(e, t)
                }, i[_e("trust_as_" + n)] = function (t) {
                    return s(e, t)
                }
            }), i
        }]
    }

    function _n() {
        this.$get = ["$window", "$document", function (e, t) {
            var n, i, r = {}, o = p((/android (\d+)/.exec(wi((e.navigator || {}).userAgent)) || [])[1]), a = /Boxee/i.test((e.navigator || {}).userAgent), s = t[0] || {}, c = /^(Moz|webkit|ms)(?=[A-Z])/, l = s.body && s.body.style, u = !1, f = !1;
            if (l) {
                for (var d in l)if (i = c.exec(d)) {
                    n = i[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
                    break
                }
                n || (n = "WebkitOpacity" in l && "webkit"), u = !!("transition" in l || n + "Transition" in l), f = !!("animation" in l || n + "Animation" in l), !o || u && f || (u = S(l.webkitTransition), f = S(l.webkitAnimation))
            }
            return {
                history: !(!e.history || !e.history.pushState || o < 4 || a), hasEvent: function (e) {
                    if ("input" === e && Ti <= 11)return !1;
                    if (y(r[e])) {
                        var t = s.createElement("div");
                        r[e] = "on" + e in t
                    }
                    return r[e]
                }, csp: Fi(), vendorPrefix: n, transitions: u, animations: f, android: o
            }
        }]
    }

    function Sn() {
        this.$get = ["$templateCache", "$http", "$q", "$sce", function (e, t, n, i) {
            function r(o, a) {
                function s(e) {
                    if (!a)throw Ar("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", o, e.status, e.statusText);
                    return n.reject(e)
                }

                r.totalPendingRequests++, S(o) && e.get(o) || (o = i.getTrustedResourceUrl(o));
                var c = t.defaults && t.defaults.transformResponse;
                Li(c) ? c = c.filter(function (e) {
                    return e !== yt
                }) : c === yt && (c = null);
                var l = {cache: e, transformResponse: c};
                return t.get(o, l)["finally"](function () {
                    r.totalPendingRequests--
                }).then(function (t) {
                    return e.put(o, t.data), t.data
                }, s)
            }

            return r.totalPendingRequests = 0, r
        }]
    }

    function xn() {
        this.$get = ["$rootScope", "$browser", "$location", function (e, t, n) {
            var i = {};
            return i.findBindings = function (e, t, n) {
                var i = e.getElementsByClassName("ng-binding"), r = [];
                return o(i, function (e) {
                    var i = Ni.element(e).data("$binding");
                    i && o(i, function (i) {
                        if (n) {
                            var o = new RegExp("(^|\\s)" + zi(t) + "(\\s|\\||$)");
                            o.test(i) && r.push(e)
                        } else i.indexOf(t) != -1 && r.push(e)
                    })
                }), r
            }, i.findModels = function (e, t, n) {
                for (var i = ["ng-", "data-ng-", "ng\\:"], r = 0; r < i.length; ++r) {
                    var o = n ? "=" : "*=", a = "[" + i[r] + "model" + o + '"' + t + '"]', s = e.querySelectorAll(a);
                    if (s.length)return s
                }
            }, i.getLocation = function () {
                return n.url()
            }, i.setLocation = function (t) {
                t !== n.url() && (n.url(t), e.$digest())
            }, i.whenStable = function (e) {
                t.notifyWhenNoOutstandingRequests(e)
            }, i
        }]
    }

    function Tn() {
        this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function (e, t, n, i, r) {
            function o(o, s, c) {
                E(o) || (c = s, s = o, o = m);
                var l, u = U(arguments, 3), f = w(c) && !c, d = (f ? i : n).defer(), p = d.promise;
                return l = t.defer(function () {
                    try {
                        d.resolve(o.apply(null, u))
                    } catch (t) {
                        d.reject(t), r(t)
                    } finally {
                        delete a[p.$$timeoutId]
                    }
                    f || e.$apply()
                }, s), p.$$timeoutId = l, a[l] = d, p
            }

            var a = {};
            return o.cancel = function (e) {
                return !!(e && e.$$timeoutId in a) && (a[e.$$timeoutId].reject("canceled"), delete a[e.$$timeoutId], t.defer.cancel(e.$$timeoutId))
            }, o
        }]
    }

    function En(e) {
        var t = e;
        return Ti && (to.setAttribute("href", t), t = to.href), to.setAttribute("href", t), {
            href: to.href,
            protocol: to.protocol ? to.protocol.replace(/:$/, "") : "",
            host: to.host,
            search: to.search ? to.search.replace(/^\?/, "") : "",
            hash: to.hash ? to.hash.replace(/^#/, "") : "",
            hostname: to.hostname,
            port: to.port,
            pathname: "/" === to.pathname.charAt(0) ? to.pathname : "/" + to.pathname
        }
    }

    function Cn(e) {
        var t = S(e) ? En(e) : e;
        return t.protocol === no.protocol && t.host === no.host
    }

    function kn() {
        this.$get = g(e)
    }

    function An(e) {
        function t(e) {
            try {
                return decodeURIComponent(e)
            } catch (t) {
                return e
            }
        }

        var i = e[0] || {}, r = {}, o = "";
        return function () {
            var e, a, s, c, l, u = i.cookie || "";
            if (u !== o)for (o = u, e = o.split("; "), r = {}, s = 0; s < e.length; s++)a = e[s], c = a.indexOf("="), c > 0 && (l = t(a.substring(0, c)), r[l] === n && (r[l] = t(a.substring(c + 1))));
            return r
        }
    }

    function Mn() {
        this.$get = An
    }

    function Dn(e) {
        function t(i, r) {
            if (b(i)) {
                var a = {};
                return o(i, function (e, n) {
                    a[n] = t(n, e)
                }), a
            }
            return e.factory(i + n, r)
        }

        var n = "Filter";
        this.register = t, this.$get = ["$injector", function (e) {
            return function (t) {
                return e.get(t + n)
            }
        }], t("currency", Bn), t("date", Xn), t("filter", In), t("json", Kn), t("limitTo", Qn), t("lowercase", so), t("number", Vn), t("orderBy", Zn), t("uppercase", co)
    }

    function In() {
        return function (e, t, n) {
            if (!r(e)) {
                if (null == e)return e;
                throw i("filter")("notarray", "Expected array but received: {0}", e)
            }
            var o, a, s = Nn(t);
            switch (s) {
                case"function":
                    o = t;
                    break;
                case"boolean":
                case"null":
                case"number":
                case"string":
                    a = !0;
                case"object":
                    o = Pn(t, n, a);
                    break;
                default:
                    return e
            }
            return Array.prototype.filter.call(e, o)
        }
    }

    function Pn(e, t, n) {
        var i, r = b(e) && "$" in e;
        return t === !0 ? t = F : E(t) || (t = function (e, t) {
            return !y(e) && (null === e || null === t ? e === t : !(b(t) || b(e) && !$(e)) && (e = wi("" + e), t = wi("" + t), e.indexOf(t) !== -1))
        }), i = function (i) {
            return r && !b(i) ? On(i, e.$, t, !1) : On(i, e, t, n)
        }
    }

    function On(e, t, n, i, r) {
        var o = Nn(e), a = Nn(t);
        if ("string" === a && "!" === t.charAt(0))return !On(e, t.substring(1), n, i);
        if (Li(e))return e.some(function (e) {
            return On(e, t, n, i)
        });
        switch (o) {
            case"object":
                var s;
                if (i) {
                    for (s in e)if ("$" !== s.charAt(0) && On(e[s], t, n, !0))return !0;
                    return !r && On(e, t, n, !1)
                }
                if ("object" === a) {
                    for (s in t) {
                        var c = t[s];
                        if (!E(c) && !y(c)) {
                            var l = "$" === s, u = l ? e : e[s];
                            if (!On(u, c, n, l, l))return !1
                        }
                    }
                    return !0
                }
                return n(e, t);
            case"function":
                return !1;
            default:
                return n(e, t)
        }
    }

    function Nn(e) {
        return null === e ? "null" : typeof e
    }

    function Bn(e) {
        var t = e.NUMBER_FORMATS;
        return function (e, n, i) {
            return y(n) && (n = t.CURRENCY_SYM), y(i) && (i = t.PATTERNS[1].maxFrac), null == e ? e : Ln(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, i).replace(/\u00A4/g, n)
        }
    }

    function Vn(e) {
        var t = e.NUMBER_FORMATS;
        return function (e, n) {
            return null == e ? e : Ln(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n)
        }
    }

    function Ln(e, t, n, i, r) {
        if (b(e))return "";
        var o = e < 0;
        e = Math.abs(e);
        var a = e === 1 / 0;
        if (!a && !isFinite(e))return "";
        var s = e + "", c = "", l = !1, u = [];
        if (a && (c = "∞"), !a && s.indexOf("e") !== -1) {
            var f = s.match(/([\d\.]+)e(-?)(\d+)/);
            f && "-" == f[2] && f[3] > r + 1 ? e = 0 : (c = s, l = !0)
        }
        if (a || l)r > 0 && e < 1 && (c = e.toFixed(r), e = parseFloat(c)); else {
            var d = (s.split(io)[1] || "").length;
            y(r) && (r = Math.min(Math.max(t.minFrac, d), t.maxFrac)), e = +(Math.round(+(e.toString() + "e" + r)).toString() + "e" + -r);
            var p = ("" + e).split(io), h = p[0];
            p = p[1] || "";
            var m, v = 0, g = t.lgSize, $ = t.gSize;
            if (h.length >= g + $)for (v = h.length - g, m = 0; m < v; m++)(v - m) % $ === 0 && 0 !== m && (c += n), c += h.charAt(m);
            for (m = v; m < h.length; m++)(h.length - m) % g === 0 && 0 !== m && (c += n), c += h.charAt(m);
            for (; p.length < r;)p += "0";
            r && "0" !== r && (c += i + p.substr(0, r))
        }
        return 0 === e && (o = !1), u.push(o ? t.negPre : t.posPre, c, o ? t.negSuf : t.posSuf), u.join("")
    }

    function Rn(e, t, n) {
        var i = "";
        for (e < 0 && (i = "-", e = -e), e = "" + e; e.length < t;)e = "0" + e;
        return n && (e = e.substr(e.length - t)), i + e
    }

    function Hn(e, t, n, i) {
        return n = n || 0, function (r) {
            var o = r["get" + e]();
            return (n > 0 || o > -n) && (o += n), 0 === o && n == -12 && (o = 12), Rn(o, t, i)
        }
    }

    function zn(e, t) {
        return function (n, i) {
            var r = n["get" + e](), o = _i(t ? "SHORT" + e : e);
            return i[o][r]
        }
    }

    function Fn(e, t, n) {
        var i = -1 * n, r = i >= 0 ? "+" : "";
        return r += Rn(Math[i > 0 ? "floor" : "ceil"](i / 60), 2) + Rn(Math.abs(i % 60), 2)
    }

    function qn(e) {
        var t = new Date(e, 0, 1).getDay();
        return new Date(e, 0, (t <= 4 ? 5 : 12) - t)
    }

    function Un(e) {
        return new Date(e.getFullYear(), e.getMonth(), e.getDate() + (4 - e.getDay()))
    }

    function jn(e) {
        return function (t) {
            var n = qn(t.getFullYear()), i = Un(t), r = +i - +n, o = 1 + Math.round(r / 6048e5);
            return Rn(o, e)
        }
    }

    function Gn(e, t) {
        return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1]
    }

    function Wn(e, t) {
        return e.getFullYear() <= 0 ? t.ERAS[0] : t.ERAS[1]
    }

    function Yn(e, t) {
        return e.getFullYear() <= 0 ? t.ERANAMES[0] : t.ERANAMES[1]
    }

    function Xn(e) {
        function t(e) {
            var t;
            if (t = e.match(n)) {
                var i = new Date(0), r = 0, o = 0, a = t[8] ? i.setUTCFullYear : i.setFullYear, s = t[8] ? i.setUTCHours : i.setHours;
                t[9] && (r = p(t[9] + t[10]), o = p(t[9] + t[11])), a.call(i, p(t[1]), p(t[2]) - 1, p(t[3]));
                var c = p(t[4] || 0) - r, l = p(t[5] || 0) - o, u = p(t[6] || 0), f = Math.round(1e3 * parseFloat("0." + (t[7] || 0)));
                return s.call(i, c, l, u, f), i
            }
            return e
        }

        var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function (n, i, r) {
            var a, s, c = "", l = [];
            if (i = i || "mediumDate", i = e.DATETIME_FORMATS[i] || i, S(n) && (n = ao.test(n) ? p(n) : t(n)), x(n) && (n = new Date(n)), !T(n) || !isFinite(n.getTime()))return n;
            for (; i;)s = oo.exec(i), s ? (l = q(l, s, 1), i = l.pop()) : (l.push(i), i = null);
            var u = n.getTimezoneOffset();
            return r && (u = X(r, n.getTimezoneOffset()), n = Q(n, r, !0)), o(l, function (t) {
                a = ro[t], c += a ? a(n, e.DATETIME_FORMATS, u) : t.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), c
        }
    }

    function Kn() {
        return function (e, t) {
            return y(t) && (t = 2), W(e, t)
        }
    }

    function Qn() {
        return function (e, t, n) {
            return t = Math.abs(Number(t)) === 1 / 0 ? Number(t) : p(t), isNaN(t) ? e : (x(e) && (e = e.toString()), Li(e) || S(e) ? (n = !n || isNaN(n) ? 0 : p(n), n = n < 0 && n >= -e.length ? e.length + n : n, t >= 0 ? e.slice(n, n + t) : 0 === n ? e.slice(t, e.length) : e.slice(Math.max(0, n + t), n)) : e)
        }
    }

    function Zn(e) {
        function t(t, n) {
            return n = n ? -1 : 1, t.map(function (t) {
                var i = 1, r = v;
                if (E(t))r = t; else if (S(t) && ("+" != t.charAt(0) && "-" != t.charAt(0) || (i = "-" == t.charAt(0) ? -1 : 1, t = t.substring(1)), "" !== t && (r = e(t), r.constant))) {
                    var o = r();
                    r = function (e) {
                        return e[o]
                    }
                }
                return {get: r, descending: i * n}
            })
        }

        function n(e) {
            switch (typeof e) {
                case"number":
                case"boolean":
                case"string":
                    return !0;
                default:
                    return !1
            }
        }

        function i(e, t) {
            return "function" == typeof e.valueOf && (e = e.valueOf(), n(e)) ? e : $(e) && (e = e.toString(), n(e)) ? e : t
        }

        function o(e, t) {
            var n = typeof e;
            return null === e ? (n = "string", e = "null") : "string" === n ? e = e.toLowerCase() : "object" === n && (e = i(e, t)), {
                value: e,
                type: n
            }
        }

        function a(e, t) {
            var n = 0;
            return e.type === t.type ? e.value !== t.value && (n = e.value < t.value ? -1 : 1) : n = e.type < t.type ? -1 : 1, n
        }

        return function (e, n, i) {
            function s(e, t) {
                return {
                    value: e, predicateValues: l.map(function (n) {
                        return o(n.get(e), t)
                    })
                }
            }

            function c(e, t) {
                for (var n = 0, i = 0, r = l.length; i < r && !(n = a(e.predicateValues[i], t.predicateValues[i]) * l[i].descending); ++i);
                return n
            }

            if (!r(e))return e;
            Li(n) || (n = [n]), 0 === n.length && (n = ["+"]);
            var l = t(n, i), u = Array.prototype.map.call(e, s);
            return u.sort(c), e = u.map(function (e) {
                return e.value
            })
        }
    }

    function Jn(e) {
        return E(e) && (e = {link: e}), e.restrict = e.restrict || "AC", g(e)
    }

    function ei(e, t) {
        e.$name = t
    }

    function ti(e, t, i, r, a) {
        var s = this, c = [], l = s.$$parentForm = e.parent().controller("form") || fo;
        s.$error = {}, s.$$success = {}, s.$pending = n, s.$name = a(t.name || t.ngForm || "")(i), s.$dirty = !1, s.$pristine = !0, s.$valid = !0, s.$invalid = !1, s.$submitted = !1, l.$addControl(s), s.$rollbackViewValue = function () {
            o(c, function (e) {
                e.$rollbackViewValue()
            })
        }, s.$commitViewValue = function () {
            o(c, function (e) {
                e.$commitViewValue()
            })
        }, s.$addControl = function (e) {
            pe(e.$name, "input"), c.push(e), e.$name && (s[e.$name] = e)
        }, s.$$renameControl = function (e, t) {
            var n = e.$name;
            s[n] === e && delete s[n], s[t] = e, e.$name = t
        }, s.$removeControl = function (e) {
            e.$name && s[e.$name] === e && delete s[e.$name], o(s.$pending, function (t, n) {
                s.$setValidity(n, null, e)
            }), o(s.$error, function (t, n) {
                s.$setValidity(n, null, e)
            }), o(s.$$success, function (t, n) {
                s.$setValidity(n, null, e)
            }), R(c, e)
        }, vi({
            ctrl: this, $element: e, set: function (e, t, n) {
                var i = e[t];
                if (i) {
                    var r = i.indexOf(n);
                    r === -1 && i.push(n)
                } else e[t] = [n]
            }, unset: function (e, t, n) {
                var i = e[t];
                i && (R(i, n), 0 === i.length && delete e[t])
            }, parentForm: l, $animate: r
        }), s.$setDirty = function () {
            r.removeClass(e, Yo), r.addClass(e, Xo), s.$dirty = !0, s.$pristine = !1, l.$setDirty()
        }, s.$setPristine = function () {
            r.setClass(e, Yo, Xo + " " + po), s.$dirty = !1, s.$pristine = !0, s.$submitted = !1, o(c, function (e) {
                e.$setPristine()
            })
        }, s.$setUntouched = function () {
            o(c, function (e) {
                e.$setUntouched()
            })
        }, s.$setSubmitted = function () {
            r.addClass(e, po), s.$submitted = !0, l.$setSubmitted()
        }
    }

    function ni(e) {
        e.$formatters.push(function (t) {
            return e.$isEmpty(t) ? t : t.toString()
        })
    }

    function ii(e, t, n, i, r, o) {
        ri(e, t, n, i, r, o), ni(i)
    }

    function ri(e, t, n, i, r, o) {
        var a = wi(t[0].type);
        if (!r.android) {
            var s = !1;
            t.on("compositionstart", function (e) {
                s = !0
            }), t.on("compositionend", function () {
                s = !1, c()
            })
        }
        var c = function (e) {
            if (l && (o.defer.cancel(l), l = null), !s) {
                var r = t.val(), c = e && e.type;
                "password" === a || n.ngTrim && "false" === n.ngTrim || (r = Hi(r)), (i.$viewValue !== r || "" === r && i.$$hasNativeValidators) && i.$setViewValue(r, c)
            }
        };
        if (r.hasEvent("input"))t.on("input", c); else {
            var l, u = function (e, t, n) {
                l || (l = o.defer(function () {
                    l = null, t && t.value === n || c(e)
                }))
            };
            t.on("keydown", function (e) {
                var t = e.keyCode;
                91 === t || 15 < t && t < 19 || 37 <= t && t <= 40 || u(e, this, this.value)
            }), r.hasEvent("paste") && t.on("paste cut", u)
        }
        t.on("change", c), i.$render = function () {
            t.val(i.$isEmpty(i.$viewValue) ? "" : i.$viewValue)
        }
    }

    function oi(e, t) {
        if (T(e))return e;
        if (S(e)) {
            So.lastIndex = 0;
            var n = So.exec(e);
            if (n) {
                var i = +n[1], r = +n[2], o = 0, a = 0, s = 0, c = 0, l = qn(i), u = 7 * (r - 1);
                return t && (o = t.getHours(), a = t.getMinutes(), s = t.getSeconds(), c = t.getMilliseconds()), new Date(i, 0, l.getDate() + u, o, a, s, c)
            }
        }
        return NaN
    }

    function ai(e, t) {
        return function (n, i) {
            var r, a;
            if (T(n))return n;
            if (S(n)) {
                if ('"' == n.charAt(0) && '"' == n.charAt(n.length - 1) && (n = n.substring(1, n.length - 1)), go.test(n))return new Date(n);
                if (e.lastIndex = 0, r = e.exec(n))return r.shift(), a = i ? {
                    yyyy: i.getFullYear(),
                    MM: i.getMonth() + 1,
                    dd: i.getDate(),
                    HH: i.getHours(),
                    mm: i.getMinutes(),
                    ss: i.getSeconds(),
                    sss: i.getMilliseconds() / 1e3
                } : {yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0, ss: 0, sss: 0}, o(r, function (e, n) {
                    n < t.length && (a[t[n]] = +e)
                }), new Date(a.yyyy, a.MM - 1, a.dd, a.HH, a.mm, a.ss || 0, 1e3 * a.sss || 0)
            }
            return NaN
        }
    }

    function si(e, t, i, r) {
        return function (o, a, s, c, l, u, f) {
            function d(e) {
                return e && !(e.getTime && e.getTime() !== e.getTime())
            }

            function p(e) {
                return w(e) ? T(e) ? e : i(e) : n
            }

            ci(o, a, s, c), ri(o, a, s, c, l, u);
            var h, m = c && c.$options && c.$options.timezone;
            if (c.$$parserName = e, c.$parsers.push(function (e) {
                    if (c.$isEmpty(e))return null;
                    if (t.test(e)) {
                        var r = i(e, h);
                        return m && (r = Q(r, m)), r
                    }
                    return n
                }), c.$formatters.push(function (e) {
                    if (e && !T(e))throw Jo("datefmt", "Expected `{0}` to be a date", e);
                    return d(e) ? (h = e, h && m && (h = Q(h, m, !0)), f("date")(e, r, m)) : (h = null, "")
                }), w(s.min) || s.ngMin) {
                var v;
                c.$validators.min = function (e) {
                    return !d(e) || y(v) || i(e) >= v
                }, s.$observe("min", function (e) {
                    v = p(e), c.$validate()
                })
            }
            if (w(s.max) || s.ngMax) {
                var g;
                c.$validators.max = function (e) {
                    return !d(e) || y(g) || i(e) <= g
                }, s.$observe("max", function (e) {
                    g = p(e), c.$validate()
                })
            }
        }
    }

    function ci(e, t, i, r) {
        var o = t[0], a = r.$$hasNativeValidators = b(o.validity);
        a && r.$parsers.push(function (e) {
            var i = t.prop(yi) || {};
            return i.badInput && !i.typeMismatch ? n : e
        })
    }

    function li(e, t, i, r, o, a) {
        if (ci(e, t, i, r), ri(e, t, i, r, o, a), r.$$parserName = "number", r.$parsers.push(function (e) {
                return r.$isEmpty(e) ? null : wo.test(e) ? parseFloat(e) : n
            }), r.$formatters.push(function (e) {
                if (!r.$isEmpty(e)) {
                    if (!x(e))throw Jo("numfmt", "Expected `{0}` to be a number", e);
                    e = e.toString()
                }
                return e
            }), w(i.min) || i.ngMin) {
            var s;
            r.$validators.min = function (e) {
                return r.$isEmpty(e) || y(s) || e >= s
            }, i.$observe("min", function (e) {
                w(e) && !x(e) && (e = parseFloat(e, 10)), s = x(e) && !isNaN(e) ? e : n, r.$validate()
            })
        }
        if (w(i.max) || i.ngMax) {
            var c;
            r.$validators.max = function (e) {
                return r.$isEmpty(e) || y(c) || e <= c
            }, i.$observe("max", function (e) {
                w(e) && !x(e) && (e = parseFloat(e, 10)), c = x(e) && !isNaN(e) ? e : n, r.$validate()
            })
        }
    }

    function ui(e, t, n, i, r, o) {
        ri(e, t, n, i, r, o), ni(i), i.$$parserName = "url", i.$validators.url = function (e, t) {
            var n = e || t;
            return i.$isEmpty(n) || $o.test(n)
        }
    }

    function fi(e, t, n, i, r, o) {
        ri(e, t, n, i, r, o), ni(i), i.$$parserName = "email", i.$validators.email = function (e, t) {
            var n = e || t;
            return i.$isEmpty(n) || yo.test(n)
        }
    }

    function di(e, t, n, i) {
        y(n.name) && t.attr("name", c());
        var r = function (e) {
            t[0].checked && i.$setViewValue(n.value, e && e.type)
        };
        t.on("click", r), i.$render = function () {
            var e = n.value;
            t[0].checked = e == i.$viewValue
        }, n.$observe("value", i.$render)
    }

    function pi(e, t, n, r, o) {
        var a;
        if (w(r)) {
            if (a = e(r), !a.constant)throw i("ngModel")("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", n, r);
            return a(t)
        }
        return o
    }

    function hi(e, t, n, i, r, o, a, s) {
        var c = pi(s, e, "ngTrueValue", n.ngTrueValue, !0), l = pi(s, e, "ngFalseValue", n.ngFalseValue, !1), u = function (e) {
            i.$setViewValue(t[0].checked, e && e.type)
        };
        t.on("click", u), i.$render = function () {
            t[0].checked = i.$viewValue
        }, i.$isEmpty = function (e) {
            return e === !1
        }, i.$formatters.push(function (e) {
            return F(e, c)
        }), i.$parsers.push(function (e) {
            return e ? c : l
        })
    }

    function mi(e, t) {
        return e = "ngClass" + e, ["$animate", function (n) {
            function i(e, t) {
                var n = [];
                e:for (var i = 0; i < e.length; i++) {
                    for (var r = e[i], o = 0; o < t.length; o++)if (r == t[o])continue e;
                    n.push(r)
                }
                return n
            }

            function r(e) {
                var t = [];
                return Li(e) ? (o(e, function (e) {
                    t = t.concat(r(e))
                }), t) : S(e) ? e.split(" ") : b(e) ? (o(e, function (e, n) {
                    e && (t = t.concat(n.split(" ")))
                }), t) : e
            }

            return {
                restrict: "AC", link: function (a, s, c) {
                    function l(e) {
                        var t = f(e, 1);
                        c.$addClass(t)
                    }

                    function u(e) {
                        var t = f(e, -1);
                        c.$removeClass(t)
                    }

                    function f(e, t) {
                        var n = s.data("$classCounts") || ve(), i = [];
                        return o(e, function (e) {
                            (t > 0 || n[e]) && (n[e] = (n[e] || 0) + t, n[e] === +(t > 0) && i.push(e))
                        }), s.data("$classCounts", n), i.join(" ")
                    }

                    function d(e, t) {
                        var r = i(t, e), o = i(e, t);
                        r = f(r, 1), o = f(o, -1), r && r.length && n.addClass(s, r), o && o.length && n.removeClass(s, o)
                    }

                    function p(e) {
                        if (t === !0 || a.$index % 2 === t) {
                            var n = r(e || []);
                            if (h) {
                                if (!F(e, h)) {
                                    var i = r(h);
                                    d(i, n)
                                }
                            } else l(n)
                        }
                        h = z(e)
                    }

                    var h;
                    a.$watch(c[e], p, !0), c.$observe("class", function (t) {
                        p(a.$eval(c[e]))
                    }), "ngClass" !== e && a.$watch("$index", function (n, i) {
                        var o = 1 & n;
                        if (o !== (1 & i)) {
                            var s = r(a.$eval(c[e]));
                            o === t ? l(s) : u(s)
                        }
                    })
                }
            }
        }]
    }

    function vi(e) {
        function t(e, t, c) {
            t === n ? i("$pending", e, c) : r("$pending", e, c), P(t) ? t ? (f(s.$error, e, c), u(s.$$success, e, c)) : (u(s.$error, e, c), f(s.$$success, e, c)) : (f(s.$error, e, c), f(s.$$success, e, c)), s.$pending ? (o(Zo, !0), s.$valid = s.$invalid = n, a("", null)) : (o(Zo, !1), s.$valid = gi(s.$error), s.$invalid = !s.$valid, a("", s.$valid));
            var l;
            l = s.$pending && s.$pending[e] ? n : !s.$error[e] && (!!s.$$success[e] || null), a(e, l), d.$setValidity(e, l, s)
        }

        function i(e, t, n) {
            s[e] || (s[e] = {}), u(s[e], t, n)
        }

        function r(e, t, i) {
            s[e] && f(s[e], t, i), gi(s[e]) && (s[e] = n)
        }

        function o(e, t) {
            t && !l[e] ? (p.addClass(c, e), l[e] = !0) : !t && l[e] && (p.removeClass(c, e), l[e] = !1)
        }

        function a(e, t) {
            e = e ? "-" + le(e, "-") : "", o(Go + e, t === !0), o(Wo + e, t === !1)
        }

        var s = e.ctrl, c = e.$element, l = {}, u = e.set, f = e.unset, d = e.parentForm, p = e.$animate;
        l[Wo] = !(l[Go] = c.hasClass(Go)), s.$setValidity = t
    }

    function gi(e) {
        if (e)for (var t in e)if (e.hasOwnProperty(t))return !1;
        return !0
    }

    var $i = /^\/(.+)\/([a-z]*)$/, yi = "validity", wi = function (e) {
        return S(e) ? e.toLowerCase() : e
    }, bi = Object.prototype.hasOwnProperty, _i = function (e) {
        return S(e) ? e.toUpperCase() : e
    }, Si = function (e) {
        return S(e) ? e.replace(/[A-Z]/g, function (e) {
            return String.fromCharCode(32 | e.charCodeAt(0))
        }) : e
    }, xi = function (e) {
        return S(e) ? e.replace(/[a-z]/g, function (e) {
            return String.fromCharCode(e.charCodeAt(0) & -33)
        }) : e
    };
    "i" !== "I".toLowerCase() && (wi = Si, _i = xi);
    var Ti, Ei, Ci, ki, Ai = [].slice, Mi = [].splice, Di = [].push, Ii = Object.prototype.toString, Pi = Object.getPrototypeOf, Oi = i("ng"), Ni = e.angular || (e.angular = {}), Bi = 0;
    Ti = t.documentMode, m.$inject = [], v.$inject = [];
    var Vi, Li = Array.isArray, Ri = /^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/, Hi = function (e) {
        return S(e) ? e.trim() : e
    }, zi = function (e) {
        return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    }, Fi = function () {
        if (w(Fi.isActive_))return Fi.isActive_;
        var e = !(!t.querySelector("[ng-csp]") && !t.querySelector("[data-ng-csp]"));
        if (!e)try {
            new Function("")
        } catch (n) {
            e = !0
        }
        return Fi.isActive_ = e
    }, qi = function () {
        if (w(qi.name_))return qi.name_;
        var e, n, i, r, o = Ui.length;
        for (n = 0; n < o; ++n)if (i = Ui[n], e = t.querySelector("[" + i.replace(":", "\\:") + "jq]")) {
            r = e.getAttribute(i + "jq");
            break
        }
        return qi.name_ = r
    }, Ui = ["ng-", "data-ng-", "ng:", "x-ng-"], ji = /[A-Z]/g, Gi = !1, Wi = 1, Yi = 2, Xi = 3, Ki = 8, Qi = 9, Zi = 11, Ji = {
        full: "1.4.3",
        major: 1,
        minor: 4,
        dot: 3,
        codeName: "foam-acceleration"
    };
    ke.expando = "ng339";
    var er = ke.cache = {}, tr = 1, nr = function (e, t, n) {
        e.addEventListener(t, n, !1)
    }, ir = function (e, t, n) {
        e.removeEventListener(t, n, !1)
    };
    ke._data = function (e) {
        return this.cache[e[this.expando]] || {}
    };
    var rr = /([\:\-\_]+(.))/g, or = /^moz([A-Z])/, ar = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
    }, sr = i("jqLite"), cr = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, lr = /<|&#?\w+;/, ur = /<([\w:]+)/, fr = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, dr = {
        option: [1, '<select multiple="multiple">', "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    dr.optgroup = dr.option, dr.tbody = dr.tfoot = dr.colgroup = dr.caption = dr.thead, dr.th = dr.td;
    var pr = ke.prototype = {
        ready: function (n) {
            function i() {
                r || (r = !0, n())
            }

            var r = !1;
            "complete" === t.readyState ? setTimeout(i) : (this.on("DOMContentLoaded", i), ke(e).on("load", i))
        }, toString: function () {
            var e = [];
            return o(this, function (t) {
                e.push("" + t)
            }), "[" + e.join(", ") + "]"
        }, eq: function (e) {
            return Ei(e >= 0 ? this[e] : this[this.length + e])
        }, length: 0, push: Di, sort: [].sort, splice: [].splice
    }, hr = {};
    o("multiple,selected,checked,disabled,readOnly,required,open".split(","), function (e) {
        hr[wi(e)] = e
    });
    var mr = {};
    o("input,select,option,textarea,button,form,details".split(","), function (e) {
        mr[e] = !0
    });
    var vr = {ngMinlength: "minlength", ngMaxlength: "maxlength", ngMin: "min", ngMax: "max", ngPattern: "pattern"};
    o({data: Oe, removeData: Ie, hasData: Te}, function (e, t) {
        ke[t] = e
    }), o({
        data: Oe, inheritedData: He, scope: function (e) {
            return Ei.data(e, "$scope") || He(e.parentNode || e, ["$isolateScope", "$scope"])
        }, isolateScope: function (e) {
            return Ei.data(e, "$isolateScope") || Ei.data(e, "$isolateScopeNoTemplate")
        }, controller: Re, injector: function (e) {
            return He(e, "$injector")
        }, removeAttr: function (e, t) {
            e.removeAttribute(t)
        }, hasClass: Ne, css: function (e, t, n) {
            return t = _e(t), w(n) ? void(e.style[t] = n) : e.style[t]
        }, attr: function (e, t, i) {
            var r = e.nodeType;
            if (r !== Xi && r !== Yi && r !== Ki) {
                var o = wi(t);
                if (hr[o]) {
                    if (!w(i))return e[t] || (e.attributes.getNamedItem(t) || m).specified ? o : n;
                    i ? (e[t] = !0, e.setAttribute(t, o)) : (e[t] = !1, e.removeAttribute(o))
                } else if (w(i))e.setAttribute(t, i); else if (e.getAttribute) {
                    var a = e.getAttribute(t, 2);
                    return null === a ? n : a
                }
            }
        }, prop: function (e, t, n) {
            return w(n) ? void(e[t] = n) : e[t]
        }, text: function () {
            function e(e, t) {
                if (y(t)) {
                    var n = e.nodeType;
                    return n === Wi || n === Xi ? e.textContent : ""
                }
                e.textContent = t
            }

            return e.$dv = "", e
        }(), val: function (e, t) {
            if (y(t)) {
                if (e.multiple && "select" === L(e)) {
                    var n = [];
                    return o(e.options, function (e) {
                        e.selected && n.push(e.value || e.text)
                    }), 0 === n.length ? null : n
                }
                return e.value
            }
            e.value = t
        }, html: function (e, t) {
            return y(t) ? e.innerHTML : (Me(e, !0), void(e.innerHTML = t))
        }, empty: ze
    }, function (e, t) {
        ke.prototype[t] = function (t, i) {
            var r, o, a = this.length;
            if (e !== ze && (2 == e.length && e !== Ne && e !== Re ? t : i) === n) {
                if (b(t)) {
                    for (r = 0; r < a; r++)if (e === Oe)e(this[r], t); else for (o in t)e(this[r], o, t[o]);
                    return this
                }
                for (var s = e.$dv, c = s === n ? Math.min(a, 1) : a, l = 0; l < c; l++) {
                    var u = e(this[l], t, i);
                    s = s ? s + u : u
                }
                return s
            }
            for (r = 0; r < a; r++)e(this[r], t, i);
            return this
        }
    }), o({
        removeData: Ie, on: function Aa(e, t, n, i) {
            if (w(i))throw sr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            if (xe(e)) {
                var r = Pe(e, !0), o = r.events, a = r.handle;
                a || (a = r.handle = Ge(e, o));
                for (var s = t.indexOf(" ") >= 0 ? t.split(" ") : [t], c = s.length; c--;) {
                    t = s[c];
                    var l = o[t];
                    l || (o[t] = [], "mouseenter" === t || "mouseleave" === t ? Aa(e, ar[t], function (e) {
                        var n = this, i = e.relatedTarget;
                        i && (i === n || n.contains(i)) || a(e, t)
                    }) : "$destroy" !== t && nr(e, t, a), l = o[t]), l.push(n)
                }
            }
        }, off: De, one: function (e, t, n) {
            e = Ei(e), e.on(t, function i() {
                e.off(t, n), e.off(t, i)
            }), e.on(t, n)
        }, replaceWith: function (e, t) {
            var n, i = e.parentNode;
            Me(e), o(new ke(t), function (t) {
                n ? i.insertBefore(t, n.nextSibling) : i.replaceChild(t, e), n = t
            })
        }, children: function (e) {
            var t = [];
            return o(e.childNodes, function (e) {
                e.nodeType === Wi && t.push(e)
            }), t
        }, contents: function (e) {
            return e.contentDocument || e.childNodes || []
        }, append: function (e, t) {
            var n = e.nodeType;
            if (n === Wi || n === Zi) {
                t = new ke(t);
                for (var i = 0, r = t.length; i < r; i++) {
                    var o = t[i];
                    e.appendChild(o)
                }
            }
        }, prepend: function (e, t) {
            if (e.nodeType === Wi) {
                var n = e.firstChild;
                o(new ke(t), function (t) {
                    e.insertBefore(t, n)
                })
            }
        }, wrap: function (e, t) {
            t = Ei(t).eq(0).clone()[0];
            var n = e.parentNode;
            n && n.replaceChild(t, e), t.appendChild(e)
        }, remove: Fe, detach: function (e) {
            Fe(e, !0)
        }, after: function (e, t) {
            var n = e, i = e.parentNode;
            t = new ke(t);
            for (var r = 0, o = t.length; r < o; r++) {
                var a = t[r];
                i.insertBefore(a, n.nextSibling), n = a
            }
        }, addClass: Ve, removeClass: Be, toggleClass: function (e, t, n) {
            t && o(t.split(" "), function (t) {
                var i = n;
                y(i) && (i = !Ne(e, t)), (i ? Ve : Be)(e, t)
            })
        }, parent: function (e) {
            var t = e.parentNode;
            return t && t.nodeType !== Zi ? t : null
        }, next: function (e) {
            return e.nextElementSibling
        }, find: function (e, t) {
            return e.getElementsByTagName ? e.getElementsByTagName(t) : []
        }, clone: Ae, triggerHandler: function (e, t, n) {
            var i, r, a, s = t.type || t, c = Pe(e), l = c && c.events, u = l && l[s];
            u && (i = {
                preventDefault: function () {
                    this.defaultPrevented = !0
                }, isDefaultPrevented: function () {
                    return this.defaultPrevented === !0
                }, stopImmediatePropagation: function () {
                    this.immediatePropagationStopped = !0
                }, isImmediatePropagationStopped: function () {
                    return this.immediatePropagationStopped === !0
                }, stopPropagation: m, type: s, target: e
            }, t.type && (i = f(i, t)), r = z(u), a = n ? [i].concat(n) : [i], o(r, function (t) {
                i.isImmediatePropagationStopped() || t.apply(e, a)
            }))
        }
    }, function (e, t) {
        ke.prototype[t] = function (t, n, i) {
            for (var r, o = 0, a = this.length; o < a; o++)y(r) ? (r = e(this[o], t, n, i), w(r) && (r = Ei(r))) : Le(r, e(this[o], t, n, i));
            return w(r) ? r : this
        }, ke.prototype.bind = ke.prototype.on, ke.prototype.unbind = ke.prototype.off
    }), Xe.prototype = {
        put: function (e, t) {
            this[Ye(e, this.nextUid)] = t
        }, get: function (e) {
            return this[Ye(e, this.nextUid)]
        }, remove: function (e) {
            var t = this[e = Ye(e, this.nextUid)];
            return delete this[e], t
        }
    };
    var gr = [function () {
        this.$get = [function () {
            return Xe
        }]
    }], $r = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, yr = /,/, wr = /^\s*(_?)(\S+?)\1\s*$/, br = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, _r = i("$injector");
    Ze.$$annotate = Qe;
    var Sr = i("$animate"), xr = 1, Tr = "ng-animate", Er = function () {
        this.$get = ["$q", "$$rAF", function (e, t) {
            function n() {
            }

            return n.all = m, n.chain = m, n.prototype = {
                end: m,
                cancel: m,
                resume: m,
                pause: m,
                complete: m,
                then: function (n, i) {
                    return e(function (e) {
                        t(function () {
                            e()
                        })
                    }).then(n, i)
                }
            }, n
        }]
    }, Cr = function () {
        var e = new Xe, t = [];
        this.$get = ["$$AnimateRunner", "$rootScope", function (n, i) {
            function r(n, r, a) {
                var s = e.get(n);
                s || (e.put(n, s = {}), t.push(n)), r && o(r.split(" "), function (e) {
                    e && (s[e] = !0)
                }), a && o(a.split(" "), function (e) {
                    e && (s[e] = !1)
                }), t.length > 1 || i.$$postDigest(function () {
                    o(t, function (t) {
                        var n = e.get(t);
                        if (n) {
                            var i = nt(t.attr("class")), r = "", a = "";
                            o(n, function (e, t) {
                                var n = !!i[t];
                                e !== n && (e ? r += (r.length ? " " : "") + t : a += (a.length ? " " : "") + t)
                            }), o(t, function (e) {
                                r && Ve(e, r), a && Be(e, a)
                            }), e.remove(t)
                        }
                    }), t.length = 0
                })
            }

            return {
                enabled: m, on: m, off: m, pin: m, push: function (e, t, i, o) {
                    return o && o(), i = i || {}, i.from && e.css(i.from), i.to && e.css(i.to), (i.addClass || i.removeClass) && r(e, i.addClass, i.removeClass), new n
                }
            }
        }]
    }, kr = ["$provide", function (e) {
        var t = this;
        this.$$registeredAnimations = Object.create(null), this.register = function (n, i) {
            if (n && "." !== n.charAt(0))throw Sr("notcsel", "Expecting class selector starting with '.' got '{0}'.", n);
            var r = n + "-animation";
            t.$$registeredAnimations[n.substr(1)] = r, e.factory(r, i)
        }, this.classNameFilter = function (e) {
            if (1 === arguments.length && (this.$$classNameFilter = e instanceof RegExp ? e : null, this.$$classNameFilter)) {
                var t = new RegExp("(\\s+|\\/)" + Tr + "(\\s+|\\/)");
                if (t.test(this.$$classNameFilter.toString()))throw Sr("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', Tr)
            }
            return this.$$classNameFilter
        }, this.$get = ["$$animateQueue", function (e) {
            function t(e, t, n) {
                if (n) {
                    var i = tt(n);
                    !i || i.parentNode || i.previousElementSibling || (n = null)
                }
                n ? n.after(e) : t.prepend(e)
            }

            return {
                on: e.on, off: e.off, pin: e.pin, enabled: e.enabled, cancel: function (e) {
                    e.end && e.end()
                }, enter: function (n, i, r, o) {
                    return i = i && Ei(i), r = r && Ei(r), i = i || r.parent(), t(n, i, r), e.push(n, "enter", it(o))
                }, move: function (n, i, r, o) {
                    return i = i && Ei(i), r = r && Ei(r), i = i || r.parent(), t(n, i, r), e.push(n, "move", it(o))
                }, leave: function (t, n) {
                    return e.push(t, "leave", it(n), function () {
                        t.remove()
                    })
                }, addClass: function (t, n, i) {
                    return i = it(i), i.addClass = et(i.addclass, n), e.push(t, "addClass", i)
                }, removeClass: function (t, n, i) {
                    return i = it(i), i.removeClass = et(i.removeClass, n), e.push(t, "removeClass", i)
                }, setClass: function (t, n, i, r) {
                    return r = it(r), r.addClass = et(r.addClass, n), r.removeClass = et(r.removeClass, i), e.push(t, "setClass", r)
                }, animate: function (t, n, i, r, o) {
                    return o = it(o), o.from = o.from ? f(o.from, n) : n, o.to = o.to ? f(o.to, i) : i, r = r || "ng-inline-animate", o.tempClasses = et(o.tempClasses, r), e.push(t, "animate", o)
                }
            }
        }]
    }], Ar = i("$compile");
    ct.$inject = ["$provide", "$$sanitizeUriProvider"];
    var Mr = /^((?:x|data)[\:\-_])/i, Dr = i("$controller"), Ir = /^(\S+)(\s+as\s+(\w+))?$/, Pr = "application/json", Or = {"Content-Type": Pr + ";charset=utf-8"}, Nr = /^\[|^\{(?!\{)/, Br = {
        "[": /]$/,
        "{": /}$/
    }, Vr = /^\)\]\}',?\n/, Lr = Ni.$interpolateMinErr = i("$interpolate");
    Lr.throwNoconcat = function (e) {
        throw Lr("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", e)
    }, Lr.interr = function (e, t) {
        return Lr("interr", "Can't interpolate: {0}\n{1}", e, t.toString())
    };
    var Rr = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, Hr = {
        http: 80,
        https: 443,
        ftp: 21
    }, zr = i("$location"), Fr = {
        $$html5: !1, $$replace: !1, absUrl: qt("$$absUrl"), url: function (e) {
            if (y(e))return this.$$url;
            var t = Rr.exec(e);
            return (t[1] || "" === e) && this.path(decodeURIComponent(t[1])), (t[2] || t[1] || "" === e) && this.search(t[3] || ""), this.hash(t[5] || ""), this
        }, protocol: qt("$$protocol"), host: qt("$$host"), port: qt("$$port"), path: Ut("$$path", function (e) {
            return e = null !== e ? e.toString() : "", "/" == e.charAt(0) ? e : "/" + e
        }), search: function (e, t) {
            switch (arguments.length) {
                case 0:
                    return this.$$search;
                case 1:
                    if (S(e) || x(e))e = e.toString(), this.$$search = ee(e); else {
                        if (!b(e))throw zr("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                        e = H(e, {}), o(e, function (t, n) {
                            null == t && delete e[n]
                        }), this.$$search = e
                    }
                    break;
                default:
                    y(t) || null === t ? delete this.$$search[e] : this.$$search[e] = t
            }
            return this.$$compose(), this
        }, hash: Ut("$$hash", function (e) {
            return null !== e ? e.toString() : ""
        }), replace: function () {
            return this.$$replace = !0, this
        }
    };
    o([Ft, zt, Ht], function (e) {
        e.prototype = Object.create(Fr), e.prototype.state = function (t) {
            if (!arguments.length)return this.$$state;
            if (e !== Ht || !this.$$html5)throw zr("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
            return this.$$state = y(t) ? null : t, this
        }
    });
    var qr = i("$parse"), Ur = Function.prototype.call, jr = Function.prototype.apply, Gr = Function.prototype.bind, Wr = ve();
    o("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function (e) {
        Wr[e] = !0
    });
    var Yr = {n: "\n", f: "\f", r: "\r", t: "\t", v: "\x0B", "'": "'", '"': '"'}, Xr = function (e) {
        this.options = e
    };
    Xr.prototype = {
        constructor: Xr, lex: function (e) {
            for (this.text = e, this.index = 0, this.tokens = []; this.index < this.text.length;) {
                var t = this.text.charAt(this.index);
                if ('"' === t || "'" === t)this.readString(t); else if (this.isNumber(t) || "." === t && this.isNumber(this.peek()))this.readNumber(); else if (this.isIdent(t))this.readIdent(); else if (this.is(t, "(){}[].,;:?"))this.tokens.push({
                    index: this.index,
                    text: t
                }), this.index++; else if (this.isWhitespace(t))this.index++; else {
                    var n = t + this.peek(), i = n + this.peek(2), r = Wr[t], o = Wr[n], a = Wr[i];
                    if (r || o || a) {
                        var s = a ? i : o ? n : t;
                        this.tokens.push({index: this.index, text: s, operator: !0}), this.index += s.length
                    } else this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
            }
            return this.tokens
        }, is: function (e, t) {
            return t.indexOf(e) !== -1
        }, peek: function (e) {
            var t = e || 1;
            return this.index + t < this.text.length && this.text.charAt(this.index + t)
        }, isNumber: function (e) {
            return "0" <= e && e <= "9" && "string" == typeof e
        }, isWhitespace: function (e) {
            return " " === e || "\r" === e || "\t" === e || "\n" === e || "\x0B" === e || " " === e
        }, isIdent: function (e) {
            return "a" <= e && e <= "z" || "A" <= e && e <= "Z" || "_" === e || "$" === e
        }, isExpOperator: function (e) {
            return "-" === e || "+" === e || this.isNumber(e)
        }, throwError: function (e, t, n) {
            n = n || this.index;
            var i = w(t) ? "s " + t + "-" + this.index + " [" + this.text.substring(t, n) + "]" : " " + n;
            throw qr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", e, i, this.text)
        }, readNumber: function () {
            for (var e = "", t = this.index; this.index < this.text.length;) {
                var n = wi(this.text.charAt(this.index));
                if ("." == n || this.isNumber(n))e += n; else {
                    var i = this.peek();
                    if ("e" == n && this.isExpOperator(i))e += n; else if (this.isExpOperator(n) && i && this.isNumber(i) && "e" == e.charAt(e.length - 1))e += n; else {
                        if (!this.isExpOperator(n) || i && this.isNumber(i) || "e" != e.charAt(e.length - 1))break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            this.tokens.push({index: t, text: e, constant: !0, value: Number(e)})
        }, readIdent: function () {
            for (var e = this.index; this.index < this.text.length;) {
                var t = this.text.charAt(this.index);
                if (!this.isIdent(t) && !this.isNumber(t))break;
                this.index++
            }
            this.tokens.push({index: e, text: this.text.slice(e, this.index), identifier: !0})
        }, readString: function (e) {
            var t = this.index;
            this.index++;
            for (var n = "", i = e, r = !1; this.index < this.text.length;) {
                var o = this.text.charAt(this.index);
                if (i += o, r) {
                    if ("u" === o) {
                        var a = this.text.substring(this.index + 1, this.index + 5);
                        a.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + a + "]"), this.index += 4, n += String.fromCharCode(parseInt(a, 16))
                    } else {
                        var s = Yr[o];
                        n += s || o
                    }
                    r = !1
                } else if ("\\" === o)r = !0; else {
                    if (o === e)return this.index++, void this.tokens.push({index: t, text: i, constant: !0, value: n});
                    n += o
                }
                this.index++
            }
            this.throwError("Unterminated quote", t)
        }
    };
    var Kr = function (e, t) {
        this.lexer = e, this.options = t
    };
    Kr.Program = "Program", Kr.ExpressionStatement = "ExpressionStatement", Kr.AssignmentExpression = "AssignmentExpression", Kr.ConditionalExpression = "ConditionalExpression", Kr.LogicalExpression = "LogicalExpression", Kr.BinaryExpression = "BinaryExpression", Kr.UnaryExpression = "UnaryExpression", Kr.CallExpression = "CallExpression", Kr.MemberExpression = "MemberExpression", Kr.Identifier = "Identifier", Kr.Literal = "Literal", Kr.ArrayExpression = "ArrayExpression", Kr.Property = "Property", Kr.ObjectExpression = "ObjectExpression", Kr.ThisExpression = "ThisExpression", Kr.NGValueParameter = "NGValueParameter", Kr.prototype = {
        ast: function (e) {
            this.text = e, this.tokens = this.lexer.lex(e);
            var t = this.program();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), t
        },
        program: function () {
            for (var e = []; ;)if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && e.push(this.expressionStatement()), !this.expect(";"))return {
                type: Kr.Program,
                body: e
            }
        },
        expressionStatement: function () {
            return {type: Kr.ExpressionStatement, expression: this.filterChain()}
        },
        filterChain: function () {
            for (var e, t = this.expression(); e = this.expect("|");)t = this.filter(t);
            return t
        },
        expression: function () {
            return this.assignment()
        },
        assignment: function () {
            var e = this.ternary();
            return this.expect("=") && (e = {
                type: Kr.AssignmentExpression,
                left: e,
                right: this.assignment(),
                operator: "="
            }), e
        },
        ternary: function () {
            var e, t, n = this.logicalOR();
            return this.expect("?") && (e = this.expression(), this.consume(":")) ? (t = this.expression(), {
                type: Kr.ConditionalExpression,
                test: n,
                alternate: e,
                consequent: t
            }) : n
        },
        logicalOR: function () {
            for (var e = this.logicalAND(); this.expect("||");)e = {
                type: Kr.LogicalExpression,
                operator: "||",
                left: e,
                right: this.logicalAND()
            };
            return e
        },
        logicalAND: function () {
            for (var e = this.equality(); this.expect("&&");)e = {
                type: Kr.LogicalExpression,
                operator: "&&",
                left: e,
                right: this.equality()
            };
            return e
        },
        equality: function () {
            for (var e, t = this.relational(); e = this.expect("==", "!=", "===", "!==");)t = {
                type: Kr.BinaryExpression,
                operator: e.text,
                left: t,
                right: this.relational()
            };
            return t
        },
        relational: function () {
            for (var e, t = this.additive(); e = this.expect("<", ">", "<=", ">=");)t = {
                type: Kr.BinaryExpression,
                operator: e.text,
                left: t,
                right: this.additive()
            };
            return t
        },
        additive: function () {
            for (var e, t = this.multiplicative(); e = this.expect("+", "-");)t = {
                type: Kr.BinaryExpression,
                operator: e.text,
                left: t,
                right: this.multiplicative()
            };
            return t
        },
        multiplicative: function () {
            for (var e, t = this.unary(); e = this.expect("*", "/", "%");)t = {
                type: Kr.BinaryExpression,
                operator: e.text,
                left: t,
                right: this.unary()
            };
            return t
        },
        unary: function () {
            var e;
            return (e = this.expect("+", "-", "!")) ? {
                type: Kr.UnaryExpression,
                operator: e.text,
                prefix: !0,
                argument: this.unary()
            } : this.primary()
        },
        primary: function () {
            var e;
            this.expect("(") ? (e = this.filterChain(), this.consume(")")) : this.expect("[") ? e = this.arrayDeclaration() : this.expect("{") ? e = this.object() : this.constants.hasOwnProperty(this.peek().text) ? e = H(this.constants[this.consume().text]) : this.peek().identifier ? e = this.identifier() : this.peek().constant ? e = this.constant() : this.throwError("not a primary expression", this.peek());
            for (var t; t = this.expect("(", "[", ".");)"(" === t.text ? (e = {
                type: Kr.CallExpression,
                callee: e,
                arguments: this.parseArguments()
            }, this.consume(")")) : "[" === t.text ? (e = {
                type: Kr.MemberExpression,
                object: e,
                property: this.expression(),
                computed: !0
            }, this.consume("]")) : "." === t.text ? e = {
                type: Kr.MemberExpression,
                object: e,
                property: this.identifier(),
                computed: !1
            } : this.throwError("IMPOSSIBLE");
            return e
        },
        filter: function (e) {
            for (var t = [e], n = {
                type: Kr.CallExpression,
                callee: this.identifier(),
                arguments: t,
                filter: !0
            }; this.expect(":");)t.push(this.expression());
            return n
        },
        parseArguments: function () {
            var e = [];
            if (")" !== this.peekToken().text)do e.push(this.expression()); while (this.expect(","));
            return e
        },
        identifier: function () {
            var e = this.consume();
            return e.identifier || this.throwError("is not a valid identifier", e), {type: Kr.Identifier, name: e.text}
        },
        constant: function () {
            return {type: Kr.Literal, value: this.consume().value}
        },
        arrayDeclaration: function () {
            var e = [];
            if ("]" !== this.peekToken().text)do {
                if (this.peek("]"))break;
                e.push(this.expression())
            } while (this.expect(","));
            return this.consume("]"), {type: Kr.ArrayExpression, elements: e}
        },
        object: function () {
            var e, t = [];
            if ("}" !== this.peekToken().text)do {
                if (this.peek("}"))break;
                e = {
                    type: Kr.Property,
                    kind: "init"
                }, this.peek().constant ? e.key = this.constant() : this.peek().identifier ? e.key = this.identifier() : this.throwError("invalid key", this.peek()), this.consume(":"), e.value = this.expression(), t.push(e)
            } while (this.expect(","));
            return this.consume("}"), {type: Kr.ObjectExpression, properties: t}
        },
        throwError: function (e, t) {
            throw qr("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", t.text, e, t.index + 1, this.text, this.text.substring(t.index))
        },
        consume: function (e) {
            if (0 === this.tokens.length)throw qr("ueoe", "Unexpected end of expression: {0}", this.text);
            var t = this.expect(e);
            return t || this.throwError("is unexpected, expecting [" + e + "]", this.peek()), t
        },
        peekToken: function () {
            if (0 === this.tokens.length)throw qr("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0]
        },
        peek: function (e, t, n, i) {
            return this.peekAhead(0, e, t, n, i)
        },
        peekAhead: function (e, t, n, i, r) {
            if (this.tokens.length > e) {
                var o = this.tokens[e], a = o.text;
                if (a === t || a === n || a === i || a === r || !t && !n && !i && !r)return o
            }
            return !1
        },
        expect: function (e, t, n, i) {
            var r = this.peek(e, t, n, i);
            return !!r && (this.tokens.shift(), r)
        },
        constants: {
            "true": {type: Kr.Literal, value: !0},
            "false": {type: Kr.Literal, value: !1},
            "null": {type: Kr.Literal, value: null},
            undefined: {type: Kr.Literal, value: n},
            "this": {type: Kr.ThisExpression}
        }
    }, an.prototype = {
        compile: function (e, t) {
            var i = this, r = this.astBuilder.ast(e);
            this.state = {
                nextId: 0,
                filters: {},
                expensiveChecks: t,
                fn: {vars: [], body: [], own: {}},
                assign: {vars: [], body: [], own: {}},
                inputs: []
            }, Jt(r, i.$filter);
            var a, s = "";
            if (this.stage = "assign", a = nn(r)) {
                this.state.computing = "assign";
                var c = this.nextId();
                this.recurse(a, c), s = "fn.assign=" + this.generateFunction("assign", "s,v,l")
            }
            var l = en(r.body);
            i.stage = "inputs", o(l, function (e, t) {
                var n = "fn" + t;
                i.state[n] = {vars: [], body: [], own: {}}, i.state.computing = n;
                var r = i.nextId();
                i.recurse(e, r), i.return_(r), i.state.inputs.push(n), e.watchId = t
            }), this.state.computing = "fn", this.stage = "main", this.recurse(r);
            var u = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + s + this.watchFns() + "return fn;", f = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "ifDefined", "plus", "text", u)(this.$filter, Wt, Yt, Xt, Kt, Qt, e);
            return this.state = this.stage = n, f.literal = rn(r), f.constant = on(r), f
        }, USE: "use", STRICT: "strict", watchFns: function () {
            var e = [], t = this.state.inputs, n = this;
            return o(t, function (t) {
                e.push("var " + t + "=" + n.generateFunction(t, "s"))
            }), t.length && e.push("fn.inputs=[" + t.join(",") + "];"), e.join("")
        }, generateFunction: function (e, t) {
            return "function(" + t + "){" + this.varsPrefix(e) + this.body(e) + "};"
        }, filterPrefix: function () {
            var e = [], t = this;
            return o(this.state.filters, function (n, i) {
                e.push(n + "=$filter(" + t.escape(i) + ")")
            }), e.length ? "var " + e.join(",") + ";" : ""
        }, varsPrefix: function (e) {
            return this.state[e].vars.length ? "var " + this.state[e].vars.join(",") + ";" : ""
        }, body: function (e) {
            return this.state[e].body.join("")
        }, recurse: function (e, t, i, r, a, s) {
            var c, l, u, f, d = this;
            if (r = r || m, !s && w(e.watchId))return t = t || this.nextId(), void this.if_("i", this.lazyAssign(t, this.computedMember("i", e.watchId)), this.lazyRecurse(e, t, i, r, a, !0));
            switch (e.type) {
                case Kr.Program:
                    o(e.body, function (t, i) {
                        d.recurse(t.expression, n, n, function (e) {
                            l = e
                        }), i !== e.body.length - 1 ? d.current().body.push(l, ";") : d.return_(l)
                    });
                    break;
                case Kr.Literal:
                    f = this.escape(e.value), this.assign(t, f), r(f);
                    break;
                case Kr.UnaryExpression:
                    this.recurse(e.argument, n, n, function (e) {
                        l = e
                    }), f = e.operator + "(" + this.ifDefined(l, 0) + ")", this.assign(t, f), r(f);
                    break;
                case Kr.BinaryExpression:
                    this.recurse(e.left, n, n, function (e) {
                        c = e
                    }), this.recurse(e.right, n, n, function (e) {
                        l = e
                    }), f = "+" === e.operator ? this.plus(c, l) : "-" === e.operator ? this.ifDefined(c, 0) + e.operator + this.ifDefined(l, 0) : "(" + c + ")" + e.operator + "(" + l + ")", this.assign(t, f), r(f);
                    break;
                case Kr.LogicalExpression:
                    t = t || this.nextId(), d.recurse(e.left, t), d.if_("&&" === e.operator ? t : d.not(t), d.lazyRecurse(e.right, t)), r(t);
                    break;
                case Kr.ConditionalExpression:
                    t = t || this.nextId(), d.recurse(e.test, t), d.if_(t, d.lazyRecurse(e.alternate, t), d.lazyRecurse(e.consequent, t)), r(t);
                    break;
                case Kr.Identifier:
                    t = t || this.nextId(), i && (i.context = "inputs" === d.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", e.name) + "?l:s"), i.computed = !1, i.name = e.name), Wt(e.name), d.if_("inputs" === d.stage || d.not(d.getHasOwnProperty("l", e.name)), function () {
                        d.if_("inputs" === d.stage || "s", function () {
                            a && 1 !== a && d.if_(d.not(d.nonComputedMember("s", e.name)), d.lazyAssign(d.nonComputedMember("s", e.name), "{}")), d.assign(t, d.nonComputedMember("s", e.name))
                        })
                    }, t && d.lazyAssign(t, d.nonComputedMember("l", e.name))), (d.state.expensiveChecks || ln(e.name)) && d.addEnsureSafeObject(t), r(t);
                    break;
                case Kr.MemberExpression:
                    c = i && (i.context = this.nextId()) || this.nextId(), t = t || this.nextId(), d.recurse(e.object, c, n, function () {
                        d.if_(d.notNull(c), function () {
                            e.computed ? (l = d.nextId(), d.recurse(e.property, l), d.addEnsureSafeMemberName(l), a && 1 !== a && d.if_(d.not(d.computedMember(c, l)), d.lazyAssign(d.computedMember(c, l), "{}")), f = d.ensureSafeObject(d.computedMember(c, l)), d.assign(t, f), i && (i.computed = !0, i.name = l)) : (Wt(e.property.name), a && 1 !== a && d.if_(d.not(d.nonComputedMember(c, e.property.name)), d.lazyAssign(d.nonComputedMember(c, e.property.name), "{}")), f = d.nonComputedMember(c, e.property.name), (d.state.expensiveChecks || ln(e.property.name)) && (f = d.ensureSafeObject(f)), d.assign(t, f), i && (i.computed = !1, i.name = e.property.name))
                        }, function () {
                            d.assign(t, "undefined")
                        }), r(t)
                    }, !!a);
                    break;
                case Kr.CallExpression:
                    t = t || this.nextId(), e.filter ? (l = d.filter(e.callee.name), u = [], o(e.arguments, function (e) {
                        var t = d.nextId();
                        d.recurse(e, t), u.push(t)
                    }), f = l + "(" + u.join(",") + ")", d.assign(t, f), r(t)) : (l = d.nextId(), c = {}, u = [], d.recurse(e.callee, l, c, function () {
                        d.if_(d.notNull(l), function () {
                            d.addEnsureSafeFunction(l), o(e.arguments, function (e) {
                                d.recurse(e, d.nextId(), n, function (e) {
                                    u.push(d.ensureSafeObject(e))
                                })
                            }), c.name ? (d.state.expensiveChecks || d.addEnsureSafeObject(c.context), f = d.member(c.context, c.name, c.computed) + "(" + u.join(",") + ")") : f = l + "(" + u.join(",") + ")", f = d.ensureSafeObject(f), d.assign(t, f)
                        }, function () {
                            d.assign(t, "undefined")
                        }), r(t)
                    }));
                    break;
                case Kr.AssignmentExpression:
                    if (l = this.nextId(), c = {}, !tn(e.left))throw qr("lval", "Trying to assing a value to a non l-value");
                    this.recurse(e.left, n, c, function () {
                        d.if_(d.notNull(c.context), function () {
                            d.recurse(e.right, l), d.addEnsureSafeObject(d.member(c.context, c.name, c.computed)), f = d.member(c.context, c.name, c.computed) + e.operator + l, d.assign(t, f), r(t || f)
                        })
                    }, 1);
                    break;
                case Kr.ArrayExpression:
                    u = [], o(e.elements, function (e) {
                        d.recurse(e, d.nextId(), n, function (e) {
                            u.push(e)
                        })
                    }), f = "[" + u.join(",") + "]", this.assign(t, f), r(f);
                    break;
                case Kr.ObjectExpression:
                    u = [], o(e.properties, function (e) {
                        d.recurse(e.value, d.nextId(), n, function (t) {
                            u.push(d.escape(e.key.type === Kr.Identifier ? e.key.name : "" + e.key.value) + ":" + t)
                        })
                    }), f = "{" + u.join(",") + "}", this.assign(t, f), r(f);
                    break;
                case Kr.ThisExpression:
                    this.assign(t, "s"), r("s");
                    break;
                case Kr.NGValueParameter:
                    this.assign(t, "v"), r("v")
            }
        }, getHasOwnProperty: function (e, t) {
            var n = e + "." + t, i = this.current().own;
            return i.hasOwnProperty(n) || (i[n] = this.nextId(!1, e + "&&(" + this.escape(t) + " in " + e + ")")), i[n]
        }, assign: function (e, t) {
            if (e)return this.current().body.push(e, "=", t, ";"), e
        }, filter: function (e) {
            return this.state.filters.hasOwnProperty(e) || (this.state.filters[e] = this.nextId(!0)), this.state.filters[e]
        }, ifDefined: function (e, t) {
            return "ifDefined(" + e + "," + this.escape(t) + ")"
        }, plus: function (e, t) {
            return "plus(" + e + "," + t + ")"
        }, return_: function (e) {
            this.current().body.push("return ", e, ";")
        }, if_: function (e, t, n) {
            if (e === !0)t(); else {
                var i = this.current().body;
                i.push("if(", e, "){"), t(), i.push("}"), n && (i.push("else{"), n(), i.push("}"))
            }
        }, not: function (e) {
            return "!(" + e + ")"
        }, notNull: function (e) {
            return e + "!=null"
        }, nonComputedMember: function (e, t) {
            return e + "." + t
        }, computedMember: function (e, t) {
            return e + "[" + t + "]"
        }, member: function (e, t, n) {
            return n ? this.computedMember(e, t) : this.nonComputedMember(e, t)
        }, addEnsureSafeObject: function (e) {
            this.current().body.push(this.ensureSafeObject(e), ";")
        }, addEnsureSafeMemberName: function (e) {
            this.current().body.push(this.ensureSafeMemberName(e), ";")
        }, addEnsureSafeFunction: function (e) {
            this.current().body.push(this.ensureSafeFunction(e), ";")
        }, ensureSafeObject: function (e) {
            return "ensureSafeObject(" + e + ",text)"
        }, ensureSafeMemberName: function (e) {
            return "ensureSafeMemberName(" + e + ",text)"
        }, ensureSafeFunction: function (e) {
            return "ensureSafeFunction(" + e + ",text)"
        }, lazyRecurse: function (e, t, n, i, r, o) {
            var a = this;
            return function () {
                a.recurse(e, t, n, i, r, o)
            }
        }, lazyAssign: function (e, t) {
            var n = this;
            return function () {
                n.assign(e, t)
            }
        }, stringEscapeRegex: /[^ a-zA-Z0-9]/g, stringEscapeFn: function (e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }, escape: function (e) {
            if (S(e))return "'" + e.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
            if (x(e))return e.toString();
            if (e === !0)return "true";
            if (e === !1)return "false";
            if (null === e)return "null";
            if ("undefined" == typeof e)return "undefined";
            throw qr("esc", "IMPOSSIBLE")
        }, nextId: function (e, t) {
            var n = "v" + this.state.nextId++;
            return e || this.current().vars.push(n + (t ? "=" + t : "")), n
        }, current: function () {
            return this.state[this.state.computing]
        }
    }, sn.prototype = {
        compile: function (e, t) {
            var n = this, i = this.astBuilder.ast(e);
            this.expression = e, this.expensiveChecks = t, Jt(i, n.$filter);
            var r, a;
            (r = nn(i)) && (a = this.recurse(r));
            var s, c = en(i.body);
            c && (s = [], o(c, function (e, t) {
                var i = n.recurse(e);
                e.input = i, s.push(i), e.watchId = t
            }));
            var l = [];
            o(i.body, function (e) {
                l.push(n.recurse(e.expression))
            });
            var u = 0 === i.body.length ? function () {
            } : 1 === i.body.length ? l[0] : function (e, t) {
                var n;
                return o(l, function (i) {
                    n = i(e, t)
                }), n
            };
            return a && (u.assign = function (e, t, n) {
                return a(e, n, t)
            }), s && (u.inputs = s), u.literal = rn(i), u.constant = on(i), u
        }, recurse: function (e, t, i) {
            var r, a, s, c = this;
            if (e.input)return this.inputs(e.input, e.watchId);
            switch (e.type) {
                case Kr.Literal:
                    return this.value(e.value, t);
                case Kr.UnaryExpression:
                    return a = this.recurse(e.argument), this["unary" + e.operator](a, t);
                case Kr.BinaryExpression:
                    return r = this.recurse(e.left), a = this.recurse(e.right), this["binary" + e.operator](r, a, t);
                case Kr.LogicalExpression:
                    return r = this.recurse(e.left), a = this.recurse(e.right), this["binary" + e.operator](r, a, t);
                case Kr.ConditionalExpression:
                    return this["ternary?:"](this.recurse(e.test), this.recurse(e.alternate), this.recurse(e.consequent), t);
                case Kr.Identifier:
                    return Wt(e.name, c.expression), c.identifier(e.name, c.expensiveChecks || ln(e.name), t, i, c.expression);
                case Kr.MemberExpression:
                    return r = this.recurse(e.object, !1, !!i), e.computed || (Wt(e.property.name, c.expression), a = e.property.name), e.computed && (a = this.recurse(e.property)), e.computed ? this.computedMember(r, a, t, i, c.expression) : this.nonComputedMember(r, a, c.expensiveChecks, t, i, c.expression);
                case Kr.CallExpression:
                    return s = [], o(e.arguments, function (e) {
                        s.push(c.recurse(e))
                    }), e.filter && (a = this.$filter(e.callee.name)), e.filter || (a = this.recurse(e.callee, !0)), e.filter ? function (e, i, r, o) {
                        for (var c = [], l = 0; l < s.length; ++l)c.push(s[l](e, i, r, o));
                        var u = a.apply(n, c, o);
                        return t ? {context: n, name: n, value: u} : u
                    } : function (e, n, i, r) {
                        var o, l = a(e, n, i, r);
                        if (null != l.value) {
                            Yt(l.context, c.expression), Xt(l.value, c.expression);
                            for (var u = [], f = 0; f < s.length; ++f)u.push(Yt(s[f](e, n, i, r), c.expression));
                            o = Yt(l.value.apply(l.context, u), c.expression)
                        }
                        return t ? {value: o} : o
                    };
                case Kr.AssignmentExpression:
                    return r = this.recurse(e.left, !0, 1), a = this.recurse(e.right), function (e, n, i, o) {
                        var s = r(e, n, i, o), l = a(e, n, i, o);
                        return Yt(s.value, c.expression), s.context[s.name] = l, t ? {value: l} : l
                    };
                case Kr.ArrayExpression:
                    return s = [], o(e.elements, function (e) {
                        s.push(c.recurse(e))
                    }), function (e, n, i, r) {
                        for (var o = [], a = 0; a < s.length; ++a)o.push(s[a](e, n, i, r));
                        return t ? {value: o} : o
                    };
                case Kr.ObjectExpression:
                    return s = [], o(e.properties, function (e) {
                        s.push({
                            key: e.key.type === Kr.Identifier ? e.key.name : "" + e.key.value,
                            value: c.recurse(e.value)
                        })
                    }), function (e, n, i, r) {
                        for (var o = {}, a = 0; a < s.length; ++a)o[s[a].key] = s[a].value(e, n, i, r);
                        return t ? {value: o} : o
                    };
                case Kr.ThisExpression:
                    return function (e) {
                        return t ? {value: e} : e
                    };
                case Kr.NGValueParameter:
                    return function (e, n, i, r) {
                        return t ? {value: i} : i
                    }
            }
        }, "unary+": function (e, t) {
            return function (n, i, r, o) {
                var a = e(n, i, r, o);
                return a = w(a) ? +a : 0, t ? {value: a} : a
            }
        }, "unary-": function (e, t) {
            return function (n, i, r, o) {
                var a = e(n, i, r, o);
                return a = w(a) ? -a : 0, t ? {value: a} : a
            }
        }, "unary!": function (e, t) {
            return function (n, i, r, o) {
                var a = !e(n, i, r, o);
                return t ? {value: a} : a
            }
        }, "binary+": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a), c = t(i, r, o, a), l = Qt(s, c);
                return n ? {value: l} : l
            }
        }, "binary-": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a), c = t(i, r, o, a), l = (w(s) ? s : 0) - (w(c) ? c : 0);
                return n ? {value: l} : l
            }
        }, "binary*": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) * t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary/": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) / t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary%": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) % t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary===": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) === t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary!==": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) !== t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary==": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) == t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary!=": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) != t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary<": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) < t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary>": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) > t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary<=": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) <= t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary>=": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) >= t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary&&": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) && t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "binary||": function (e, t, n) {
            return function (i, r, o, a) {
                var s = e(i, r, o, a) || t(i, r, o, a);
                return n ? {value: s} : s
            }
        }, "ternary?:": function (e, t, n, i) {
            return function (r, o, a, s) {
                var c = e(r, o, a, s) ? t(r, o, a, s) : n(r, o, a, s);
                return i ? {value: c} : c
            }
        }, value: function (e, t) {
            return function () {
                return t ? {context: n, name: n, value: e} : e
            }
        }, identifier: function (e, t, i, r, o) {
            return function (a, s, c, l) {
                var u = s && e in s ? s : a;
                r && 1 !== r && u && !u[e] && (u[e] = {});
                var f = u ? u[e] : n;
                return t && Yt(f, o), i ? {context: u, name: e, value: f} : f
            }
        }, computedMember: function (e, t, n, i, r) {
            return function (o, a, s, c) {
                var l, u, f = e(o, a, s, c);
                return null != f && (l = t(o, a, s, c), Wt(l, r), i && 1 !== i && f && !f[l] && (f[l] = {}), u = f[l], Yt(u, r)), n ? {
                    context: f,
                    name: l,
                    value: u
                } : u
            }
        }, nonComputedMember: function (e, t, i, r, o, a) {
            return function (s, c, l, u) {
                var f = e(s, c, l, u);
                o && 1 !== o && f && !f[t] && (f[t] = {});
                var d = null != f ? f[t] : n;
                return (i || ln(t)) && Yt(d, a), r ? {context: f, name: t, value: d} : d
            }
        }, inputs: function (e, t) {
            return function (n, i, r, o) {
                return o ? o[t] : e(n, i, r)
            }
        }
    };
    var Qr = function (e, t, n) {
        this.lexer = e, this.$filter = t, this.options = n, this.ast = new Kr(this.lexer), this.astCompiler = n.csp ? new sn(this.ast, t) : new an(this.ast, t)
    };
    Qr.prototype = {
        constructor: Qr, parse: function (e) {
            return this.astCompiler.compile(e, this.options.expensiveChecks)
        }
    };
    var Zr = (ve(), ve(), Object.prototype.valueOf), Jr = i("$sce"), eo = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, Ar = i("$compile"), to = t.createElement("a"), no = En(e.location.href);
    An.$inject = ["$document"], Dn.$inject = ["$provide"], Bn.$inject = ["$locale"], Vn.$inject = ["$locale"];
    var io = ".", ro = {
        yyyy: Hn("FullYear", 4),
        yy: Hn("FullYear", 2, 0, !0),
        y: Hn("FullYear", 1),
        MMMM: zn("Month"),
        MMM: zn("Month", !0),
        MM: Hn("Month", 2, 1),
        M: Hn("Month", 1, 1),
        dd: Hn("Date", 2),
        d: Hn("Date", 1),
        HH: Hn("Hours", 2),
        H: Hn("Hours", 1),
        hh: Hn("Hours", 2, -12),
        h: Hn("Hours", 1, -12),
        mm: Hn("Minutes", 2),
        m: Hn("Minutes", 1),
        ss: Hn("Seconds", 2),
        s: Hn("Seconds", 1),
        sss: Hn("Milliseconds", 3),
        EEEE: zn("Day"),
        EEE: zn("Day", !0),
        a: Gn,
        Z: Fn,
        ww: jn(2),
        w: jn(1),
        G: Wn,
        GG: Wn,
        GGG: Wn,
        GGGG: Yn
    }, oo = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/, ao = /^\-?\d+$/;
    Xn.$inject = ["$locale"];
    var so = g(wi), co = g(_i);
    Zn.$inject = ["$parse"];
    var lo = g({
        restrict: "E", compile: function (e, t) {
            if (!t.href && !t.xlinkHref)return function (e, t) {
                if ("a" === t[0].nodeName.toLowerCase()) {
                    var n = "[object SVGAnimatedString]" === Ii.call(t.prop("href")) ? "xlink:href" : "href";
                    t.on("click", function (e) {
                        t.attr(n) || e.preventDefault()
                    })
                }
            }
        }
    }), uo = {};
    o(hr, function (e, t) {
        function n(e, n, r) {
            e.$watch(r[i], function (e) {
                r.$set(t, !!e)
            })
        }

        if ("multiple" != e) {
            var i = lt("ng-" + t), r = n;
            "checked" === e && (r = function (e, t, r) {
                r.ngModel !== r[i] && n(e, t, r)
            }), uo[i] = function () {
                return {restrict: "A", priority: 100, link: r}
            }
        }
    }), o(vr, function (e, t) {
        uo[t] = function () {
            return {
                priority: 100, link: function (e, n, i) {
                    if ("ngPattern" === t && "/" == i.ngPattern.charAt(0)) {
                        var r = i.ngPattern.match($i);
                        if (r)return void i.$set("ngPattern", new RegExp(r[1], r[2]))
                    }
                    e.$watch(i[t], function (e) {
                        i.$set(t, e)
                    })
                }
            }
        }
    }), o(["src", "srcset", "href"], function (e) {
        var t = lt("ng-" + e);
        uo[t] = function () {
            return {
                priority: 99, link: function (n, i, r) {
                    var o = e, a = e;
                    "href" === e && "[object SVGAnimatedString]" === Ii.call(i.prop("href")) && (a = "xlinkHref", r.$attr[a] = "xlink:href", o = null), r.$observe(t, function (t) {
                        return t ? (r.$set(a, t), void(Ti && o && i.prop(o, r[a]))) : void("href" === e && r.$set(a, null))
                    })
                }
            }
        }
    });
    var fo = {
        $addControl: m,
        $$renameControl: ei,
        $removeControl: m,
        $setValidity: m,
        $setDirty: m,
        $setPristine: m,
        $setSubmitted: m
    }, po = "ng-submitted";
    ti.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
    var ho = function (e) {
        return ["$timeout", function (t) {
            var i = {
                name: "form", restrict: e ? "EAC" : "E", controller: ti, compile: function (i, r) {
                    i.addClass(Yo).addClass(Go);
                    var o = r.name ? "name" : !(!e || !r.ngForm) && "ngForm";
                    return {
                        pre: function (e, i, r, a) {
                            if (!("action" in r)) {
                                var s = function (t) {
                                    e.$apply(function () {
                                        a.$commitViewValue(), a.$setSubmitted()
                                    }), t.preventDefault()
                                };
                                nr(i[0], "submit", s), i.on("$destroy", function () {
                                    t(function () {
                                        ir(i[0], "submit", s)
                                    }, 0, !1)
                                })
                            }
                            var c = a.$$parentForm;
                            o && (cn(e, a.$name, a, a.$name), r.$observe(o, function (t) {
                                a.$name !== t && (cn(e, a.$name, n, a.$name), c.$$renameControl(a, t), cn(e, a.$name, a, a.$name))
                            })), i.on("$destroy", function () {
                                c.$removeControl(a), o && cn(e, r[o], n, a.$name), f(a, fo)
                            })
                        }
                    }
                }
            };
            return i
        }]
    }, mo = ho(), vo = ho(!0), go = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, $o = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, yo = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, wo = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, bo = /^(\d{4})-(\d{2})-(\d{2})$/, _o = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, So = /^(\d{4})-W(\d\d)$/, xo = /^(\d{4})-(\d\d)$/, To = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Eo = {
        text: ii,
        date: si("date", bo, ai(bo, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
        "datetime-local": si("datetimelocal", _o, ai(_o, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: si("time", To, ai(To, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
        week: si("week", So, oi, "yyyy-Www"),
        month: si("month", xo, ai(xo, ["yyyy", "MM"]), "yyyy-MM"),
        number: li,
        url: ui,
        email: fi,
        radio: di,
        checkbox: hi,
        hidden: m,
        button: m,
        submit: m,
        reset: m,
        file: m
    }, Co = ["$browser", "$sniffer", "$filter", "$parse", function (e, t, n, i) {
        return {
            restrict: "E", require: ["?ngModel"], link: {
                pre: function (r, o, a, s) {
                    s[0] && (Eo[wi(a.type)] || Eo.text)(r, o, a, s[0], t, e, n, i)
                }
            }
        }
    }], ko = /^(true|false|\d+)$/, Ao = function () {
        return {
            restrict: "A", priority: 100, compile: function (e, t) {
                return ko.test(t.ngValue) ? function (e, t, n) {
                    n.$set("value", e.$eval(n.ngValue))
                } : function (e, t, n) {
                    e.$watch(n.ngValue, function (e) {
                        n.$set("value", e)
                    })
                }
            }
        }
    }, Mo = ["$compile", function (e) {
        return {
            restrict: "AC", compile: function (t) {
                return e.$$addBindingClass(t), function (t, i, r) {
                    e.$$addBindingInfo(i, r.ngBind), i = i[0], t.$watch(r.ngBind, function (e) {
                        i.textContent = e === n ? "" : e
                    })
                }
            }
        }
    }], Do = ["$interpolate", "$compile", function (e, t) {
        return {
            compile: function (i) {
                return t.$$addBindingClass(i), function (i, r, o) {
                    var a = e(r.attr(o.$attr.ngBindTemplate));
                    t.$$addBindingInfo(r, a.expressions), r = r[0], o.$observe("ngBindTemplate", function (e) {
                        r.textContent = e === n ? "" : e
                    })
                }
            }
        }
    }], Io = ["$sce", "$parse", "$compile", function (e, t, n) {
        return {
            restrict: "A", compile: function (i, r) {
                var o = t(r.ngBindHtml), a = t(r.ngBindHtml, function (e) {
                    return (e || "").toString()
                });
                return n.$$addBindingClass(i), function (t, i, r) {
                    n.$$addBindingInfo(i, r.ngBindHtml), t.$watch(a, function () {
                        i.html(e.getTrustedHtml(o(t)) || "")
                    })
                }
            }
        }
    }], Po = g({
        restrict: "A", require: "ngModel", link: function (e, t, n, i) {
            i.$viewChangeListeners.push(function () {
                e.$eval(n.ngChange)
            })
        }
    }), Oo = mi("", !0), No = mi("Odd", 0), Bo = mi("Even", 1), Vo = Jn({
        compile: function (e, t) {
            t.$set("ngCloak", n), e.removeClass("ng-cloak")
        }
    }), Lo = [function () {
        return {restrict: "A", scope: !0, controller: "@", priority: 500}
    }], Ro = {}, Ho = {blur: !0, focus: !0};
    o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (e) {
        var t = lt("ng-" + e);
        Ro[t] = ["$parse", "$rootScope", function (n, i) {
            return {
                restrict: "A", compile: function (r, o) {
                    var a = n(o[t], null, !0);
                    return function (t, n) {
                        n.on(e, function (n) {
                            var r = function () {
                                a(t, {
                                    $event: n
                                })
                            };
                            Ho[e] && i.$$phase ? t.$evalAsync(r) : t.$apply(r)
                        })
                    }
                }
            }
        }]
    });
    var zo = ["$animate", function (e) {
        return {
            multiElement: !0,
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function (n, i, r, o, a) {
                var s, c, l;
                n.$watch(r.ngIf, function (n) {
                    n ? c || a(function (n, o) {
                        c = o, n[n.length++] = t.createComment(" end ngIf: " + r.ngIf + " "), s = {clone: n}, e.enter(n, i.parent(), i)
                    }) : (l && (l.remove(), l = null), c && (c.$destroy(), c = null), s && (l = me(s.clone), e.leave(l).then(function () {
                        l = null
                    }), s = null))
                })
            }
        }
    }], Fo = ["$templateRequest", "$anchorScroll", "$animate", function (e, t, n) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: Ni.noop,
            compile: function (i, r) {
                var o = r.ngInclude || r.src, a = r.onload || "", s = r.autoscroll;
                return function (i, r, c, l, u) {
                    var f, d, p, h = 0, m = function () {
                        d && (d.remove(), d = null), f && (f.$destroy(), f = null), p && (n.leave(p).then(function () {
                            d = null
                        }), d = p, p = null)
                    };
                    i.$watch(o, function (o) {
                        var c = function () {
                            !w(s) || s && !i.$eval(s) || t()
                        }, d = ++h;
                        o ? (e(o, !0).then(function (e) {
                            if (d === h) {
                                var t = i.$new();
                                l.template = e;
                                var s = u(t, function (e) {
                                    m(), n.enter(e, null, r).then(c)
                                });
                                f = t, p = s, f.$emit("$includeContentLoaded", o), i.$eval(a)
                            }
                        }, function () {
                            d === h && (m(), i.$emit("$includeContentError", o))
                        }), i.$emit("$includeContentRequested", o)) : (m(), l.template = null)
                    })
                }
            }
        }
    }], qo = ["$compile", function (e) {
        return {
            restrict: "ECA", priority: -400, require: "ngInclude", link: function (n, i, r, o) {
                return /SVG/.test(i[0].toString()) ? (i.empty(), void e(Ee(o.template, t).childNodes)(n, function (e) {
                    i.append(e)
                }, {futureParentElement: i})) : (i.html(o.template), void e(i.contents())(n))
            }
        }
    }], Uo = Jn({
        priority: 450, compile: function () {
            return {
                pre: function (e, t, n) {
                    e.$eval(n.ngInit)
                }
            }
        }
    }), jo = function () {
        return {
            restrict: "A", priority: 100, require: "ngModel", link: function (e, t, i, r) {
                var a = t.attr(i.$attr.ngList) || ", ", s = "false" !== i.ngTrim, c = s ? Hi(a) : a, l = function (e) {
                    if (!y(e)) {
                        var t = [];
                        return e && o(e.split(c), function (e) {
                            e && t.push(s ? Hi(e) : e)
                        }), t
                    }
                };
                r.$parsers.push(l), r.$formatters.push(function (e) {
                    return Li(e) ? e.join(a) : n
                }), r.$isEmpty = function (e) {
                    return !e || !e.length
                }
            }
        }
    }, Go = "ng-valid", Wo = "ng-invalid", Yo = "ng-pristine", Xo = "ng-dirty", Ko = "ng-untouched", Qo = "ng-touched", Zo = "ng-pending", Jo = new i("ngModel"), ea = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function (e, t, i, r, a, s, c, l, u, f) {
        this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = n, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = n, this.$name = f(i.name || "", !1)(e);
        var d, p = a(i.ngModel), h = p.assign, v = p, g = h, $ = null, b = this;
        this.$$setOptions = function (e) {
            if (b.$options = e, e && e.getterSetter) {
                var t = a(i.ngModel + "()"), n = a(i.ngModel + "($$$p)");
                v = function (e) {
                    var n = p(e);
                    return E(n) && (n = t(e)), n
                }, g = function (e, t) {
                    E(p(e)) ? n(e, {$$$p: b.$modelValue}) : h(e, b.$modelValue)
                }
            } else if (!p.assign)throw Jo("nonassign", "Expression '{0}' is non-assignable. Element: {1}", i.ngModel, Z(r))
        }, this.$render = m, this.$isEmpty = function (e) {
            return y(e) || "" === e || null === e || e !== e
        };
        var _ = r.inheritedData("$formController") || fo, S = 0;
        vi({
            ctrl: this, $element: r, set: function (e, t) {
                e[t] = !0
            }, unset: function (e, t) {
                delete e[t]
            }, parentForm: _, $animate: s
        }), this.$setPristine = function () {
            b.$dirty = !1, b.$pristine = !0, s.removeClass(r, Xo), s.addClass(r, Yo)
        }, this.$setDirty = function () {
            b.$dirty = !0, b.$pristine = !1, s.removeClass(r, Yo), s.addClass(r, Xo), _.$setDirty()
        }, this.$setUntouched = function () {
            b.$touched = !1, b.$untouched = !0, s.setClass(r, Ko, Qo)
        }, this.$setTouched = function () {
            b.$touched = !0, b.$untouched = !1, s.setClass(r, Qo, Ko)
        }, this.$rollbackViewValue = function () {
            c.cancel($), b.$viewValue = b.$$lastCommittedViewValue, b.$render()
        }, this.$validate = function () {
            if (!x(b.$modelValue) || !isNaN(b.$modelValue)) {
                var e = b.$$lastCommittedViewValue, t = b.$$rawModelValue, i = b.$valid, r = b.$modelValue, o = b.$options && b.$options.allowInvalid;
                b.$$runValidators(t, e, function (e) {
                    o || i === e || (b.$modelValue = e ? t : n, b.$modelValue !== r && b.$$writeModelToScope())
                })
            }
        }, this.$$runValidators = function (e, t, i) {
            function r() {
                var e = b.$$parserName || "parse";
                return d !== n ? (d || (o(b.$validators, function (e, t) {
                    c(t, null)
                }), o(b.$asyncValidators, function (e, t) {
                    c(t, null)
                })), c(e, d), d) : (c(e, null), !0)
            }

            function a() {
                var n = !0;
                return o(b.$validators, function (i, r) {
                    var o = i(e, t);
                    n = n && o, c(r, o)
                }), !!n || (o(b.$asyncValidators, function (e, t) {
                    c(t, null)
                }), !1)
            }

            function s() {
                var i = [], r = !0;
                o(b.$asyncValidators, function (o, a) {
                    var s = o(e, t);
                    if (!O(s))throw Jo("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", s);
                    c(a, n), i.push(s.then(function () {
                        c(a, !0)
                    }, function (e) {
                        r = !1, c(a, !1)
                    }))
                }), i.length ? u.all(i).then(function () {
                    l(r)
                }, m) : l(!0)
            }

            function c(e, t) {
                f === S && b.$setValidity(e, t)
            }

            function l(e) {
                f === S && i(e)
            }

            S++;
            var f = S;
            return r() && a() ? void s() : void l(!1)
        }, this.$commitViewValue = function () {
            var e = b.$viewValue;
            c.cancel($), (b.$$lastCommittedViewValue !== e || "" === e && b.$$hasNativeValidators) && (b.$$lastCommittedViewValue = e, b.$pristine && this.$setDirty(), this.$$parseAndValidate())
        }, this.$$parseAndValidate = function () {
            function t() {
                b.$modelValue !== a && b.$$writeModelToScope()
            }

            var i = b.$$lastCommittedViewValue, r = i;
            if (d = !y(r) || n)for (var o = 0; o < b.$parsers.length; o++)if (r = b.$parsers[o](r), y(r)) {
                d = !1;
                break
            }
            x(b.$modelValue) && isNaN(b.$modelValue) && (b.$modelValue = v(e));
            var a = b.$modelValue, s = b.$options && b.$options.allowInvalid;
            b.$$rawModelValue = r, s && (b.$modelValue = r, t()), b.$$runValidators(r, b.$$lastCommittedViewValue, function (e) {
                s || (b.$modelValue = e ? r : n, t())
            })
        }, this.$$writeModelToScope = function () {
            g(e, b.$modelValue), o(b.$viewChangeListeners, function (e) {
                try {
                    e()
                } catch (n) {
                    t(n)
                }
            })
        }, this.$setViewValue = function (e, t) {
            b.$viewValue = e, b.$options && !b.$options.updateOnDefault || b.$$debounceViewValueCommit(t)
        }, this.$$debounceViewValueCommit = function (t) {
            var n, i = 0, r = b.$options;
            r && w(r.debounce) && (n = r.debounce, x(n) ? i = n : x(n[t]) ? i = n[t] : x(n["default"]) && (i = n["default"])), c.cancel($), i ? $ = c(function () {
                b.$commitViewValue()
            }, i) : l.$$phase ? b.$commitViewValue() : e.$apply(function () {
                b.$commitViewValue()
            })
        }, e.$watch(function () {
            var t = v(e);
            if (t !== b.$modelValue && (b.$modelValue === b.$modelValue || t === t)) {
                b.$modelValue = b.$$rawModelValue = t, d = n;
                for (var i = b.$formatters, r = i.length, o = t; r--;)o = i[r](o);
                b.$viewValue !== o && (b.$viewValue = b.$$lastCommittedViewValue = o, b.$render(), b.$$runValidators(t, o, m))
            }
            return t
        })
    }], ta = ["$rootScope", function (e) {
        return {
            restrict: "A",
            require: ["ngModel", "^?form", "^?ngModelOptions"],
            controller: ea,
            priority: 1,
            compile: function (t) {
                return t.addClass(Yo).addClass(Ko).addClass(Go), {
                    pre: function (e, t, n, i) {
                        var r = i[0], o = i[1] || fo;
                        r.$$setOptions(i[2] && i[2].$options), o.$addControl(r), n.$observe("name", function (e) {
                            r.$name !== e && o.$$renameControl(r, e)
                        }), e.$on("$destroy", function () {
                            o.$removeControl(r)
                        })
                    }, post: function (t, n, i, r) {
                        var o = r[0];
                        o.$options && o.$options.updateOn && n.on(o.$options.updateOn, function (e) {
                            o.$$debounceViewValueCommit(e && e.type)
                        }), n.on("blur", function (n) {
                            o.$touched || (e.$$phase ? t.$evalAsync(o.$setTouched) : t.$apply(o.$setTouched))
                        })
                    }
                }
            }
        }
    }], na = /(\s+|^)default(\s+|$)/, ia = function () {
        return {
            restrict: "A", controller: ["$scope", "$attrs", function (e, t) {
                var i = this;
                this.$options = H(e.$eval(t.ngModelOptions)), this.$options.updateOn !== n ? (this.$options.updateOnDefault = !1, this.$options.updateOn = Hi(this.$options.updateOn.replace(na, function () {
                    return i.$options.updateOnDefault = !0, " "
                }))) : this.$options.updateOnDefault = !0
            }]
        }
    }, ra = Jn({
        terminal: !0,
        priority: 1e3
    }), oa = i("ngOptions"), aa = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, sa = ["$compile", "$parse", function (e, n) {
        function i(e, t, i) {
            function o(e, t, n, i, r) {
                this.selectValue = e, this.viewValue = t, this.label = n, this.group = i, this.disabled = r
            }

            function a(e) {
                var t;
                if (!l && r(e))t = e; else {
                    t = [];
                    for (var n in e)e.hasOwnProperty(n) && "$" !== n.charAt(0) && t.push(n)
                }
                return t
            }

            var s = e.match(aa);
            if (!s)throw oa("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", e, Z(t));
            var c = s[5] || s[7], l = s[6], u = / as /.test(s[0]) && s[1], f = s[9], d = n(s[2] ? s[1] : c), p = u && n(u), h = p || d, m = f && n(f), v = f ? function (e, t) {
                return m(i, t)
            } : function (e) {
                return Ye(e)
            }, g = function (e, t) {
                return v(e, S(e, t))
            }, $ = n(s[2] || s[1]), y = n(s[3] || ""), w = n(s[4] || ""), b = n(s[8]), _ = {}, S = l ? function (e, t) {
                return _[l] = t, _[c] = e, _
            } : function (e) {
                return _[c] = e, _
            };
            return {
                trackBy: f, getTrackByValue: g, getWatchables: n(b, function (e) {
                    var t = [];
                    e = e || [];
                    for (var n = a(e), r = n.length, o = 0; o < r; o++) {
                        var c = e === n ? o : n[o], l = (e[c], S(e[c], c)), u = v(e[c], l);
                        if (t.push(u), s[2] || s[1]) {
                            var f = $(i, l);
                            t.push(f)
                        }
                        if (s[4]) {
                            var d = w(i, l);
                            t.push(d)
                        }
                    }
                    return t
                }), getOptions: function () {
                    for (var e = [], t = {}, n = b(i) || [], r = a(n), s = r.length, c = 0; c < s; c++) {
                        var l = n === r ? c : r[c], u = n[l], d = S(u, l), p = h(i, d), m = v(p, d), _ = $(i, d), x = y(i, d), T = w(i, d), E = new o(m, p, _, x, T);
                        e.push(E), t[m] = E
                    }
                    return {
                        items: e, selectValueMap: t, getOptionFromViewValue: function (e) {
                            return t[g(e)]
                        }, getViewValueFromOption: function (e) {
                            return f ? Ni.copy(e.viewValue) : e.viewValue
                        }
                    }
                }
            }
        }

        var a = t.createElement("option"), s = t.createElement("optgroup");
        return {
            restrict: "A", terminal: !0, require: ["select", "?ngModel"], link: function (t, n, r, c) {
                function l(e, t) {
                    e.element = t, t.disabled = e.disabled, e.value !== t.value && (t.value = e.selectValue), e.label !== t.label && (t.label = e.label, t.textContent = e.label)
                }

                function u(e, t, n, i) {
                    var r;
                    return t && wi(t.nodeName) === n ? r = t : (r = i.cloneNode(!1), t ? e.insertBefore(r, t) : e.appendChild(r)), r
                }

                function f(e) {
                    for (var t; e;)t = e.nextSibling, Fe(e), e = t
                }

                function d(e) {
                    var t = m && m[0], n = _ && _[0];
                    if (t || n)for (; e && (e === t || e === n);)e = e.nextSibling;
                    return e
                }

                function p() {
                    var e = S && v.readValue();
                    S = x.getOptions();
                    var t = {}, i = n[0].firstChild;
                    if (b && n.prepend(m), i = d(i), S.items.forEach(function (e) {
                            var r, o, c;
                            e.group ? (r = t[e.group], r || (o = u(n[0], i, "optgroup", s), i = o.nextSibling, o.label = e.group, r = t[e.group] = {
                                groupElement: o,
                                currentOptionElement: o.firstChild
                            }), c = u(r.groupElement, r.currentOptionElement, "option", a), l(e, c), r.currentOptionElement = c.nextSibling) : (c = u(n[0], i, "option", a), l(e, c), i = c.nextSibling)
                        }), Object.keys(t).forEach(function (e) {
                            f(t[e].currentOptionElement)
                        }), f(i), h.$render(), !h.$isEmpty(e)) {
                        var r = v.readValue();
                        (x.trackBy ? F(e, r) : e === r) || (h.$setViewValue(r), h.$render())
                    }
                }

                var h = c[1];
                if (h) {
                    for (var m, v = c[0], g = r.multiple, $ = 0, y = n.children(), w = y.length; $ < w; $++)if ("" === y[$].value) {
                        m = y.eq($);
                        break
                    }
                    var b = !!m, _ = Ei(a.cloneNode(!1));
                    _.val("?");
                    var S, x = i(r.ngOptions, n, t), T = function () {
                        b || n.prepend(m), n.val(""), m.prop("selected", !0), m.attr("selected", !0)
                    }, E = function () {
                        b || m.remove()
                    }, C = function () {
                        n.prepend(_), n.val("?"), _.prop("selected", !0), _.attr("selected", !0)
                    }, k = function () {
                        _.remove()
                    };
                    g ? (h.$isEmpty = function (e) {
                        return !e || 0 === e.length
                    }, v.writeValue = function (e) {
                        S.items.forEach(function (e) {
                            e.element.selected = !1
                        }), e && e.forEach(function (e) {
                            var t = S.getOptionFromViewValue(e);
                            t && !t.disabled && (t.element.selected = !0)
                        })
                    }, v.readValue = function () {
                        var e = n.val() || [], t = [];
                        return o(e, function (e) {
                            var n = S.selectValueMap[e];
                            n.disabled || t.push(S.getViewValueFromOption(n))
                        }), t
                    }, x.trackBy && t.$watchCollection(function () {
                        if (Li(h.$viewValue))return h.$viewValue.map(function (e) {
                            return x.getTrackByValue(e)
                        })
                    }, function () {
                        h.$render()
                    })) : (v.writeValue = function (e) {
                        var t = S.getOptionFromViewValue(e);
                        t && !t.disabled ? n[0].value !== t.selectValue && (k(), E(), n[0].value = t.selectValue, t.element.selected = !0, t.element.setAttribute("selected", "selected")) : null === e || b ? (k(), T()) : (E(), C())
                    }, v.readValue = function () {
                        var e = S.selectValueMap[n.val()];
                        return e && !e.disabled ? (E(), k(), S.getViewValueFromOption(e)) : null
                    }, x.trackBy && t.$watch(function () {
                        return x.getTrackByValue(h.$viewValue)
                    }, function () {
                        h.$render()
                    })), b ? (m.remove(), e(m)(t), m.removeClass("ng-scope")) : m = Ei(a.cloneNode(!1)), p(), t.$watchCollection(x.getWatchables, p)
                }
            }
        }
    }], ca = ["$locale", "$interpolate", "$log", function (e, t, n) {
        var i = /{}/g, r = /^when(Minus)?(.+)$/;
        return {
            link: function (a, s, c) {
                function l(e) {
                    s.text(e || "")
                }

                var u, f = c.count, d = c.$attr.when && s.attr(c.$attr.when), p = c.offset || 0, h = a.$eval(d) || {}, v = {}, g = t.startSymbol(), $ = t.endSymbol(), w = g + f + "-" + p + $, b = Ni.noop;
                o(c, function (e, t) {
                    var n = r.exec(t);
                    if (n) {
                        var i = (n[1] ? "-" : "") + wi(n[2]);
                        h[i] = s.attr(c.$attr[t])
                    }
                }), o(h, function (e, n) {
                    v[n] = t(e.replace(i, w))
                }), a.$watch(f, function (t) {
                    var i = parseFloat(t), r = isNaN(i);
                    if (r || i in h || (i = e.pluralCat(i - p)), i !== u && !(r && x(u) && isNaN(u))) {
                        b();
                        var o = v[i];
                        y(o) ? (null != t && n.debug("ngPluralize: no rule defined for '" + i + "' in " + d), b = m, l()) : b = a.$watch(o, l), u = i
                    }
                })
            }
        }
    }], la = ["$parse", "$animate", function (e, a) {
        var s = "$$NG_REMOVED", c = i("ngRepeat"), l = function (e, t, n, i, r, o, a) {
            e[n] = i, r && (e[r] = o), e.$index = t, e.$first = 0 === t, e.$last = t === a - 1, e.$middle = !(e.$first || e.$last), e.$odd = !(e.$even = 0 === (1 & t))
        }, u = function (e) {
            return e.clone[0]
        }, f = function (e) {
            return e.clone[e.clone.length - 1]
        };
        return {
            restrict: "A",
            multiElement: !0,
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            compile: function (i, d) {
                var p = d.ngRepeat, h = t.createComment(" end ngRepeat: " + p + " "), m = p.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!m)throw c("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", p);
                var v = m[1], g = m[2], $ = m[3], y = m[4];
                if (m = v.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), !m)throw c("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", v);
                var w = m[3] || m[1], b = m[2];
                if ($ && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test($) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test($)))throw c("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", $);
                var _, S, x, T, E = {$id: Ye};
                return y ? _ = e(y) : (x = function (e, t) {
                    return Ye(t)
                }, T = function (e) {
                    return e
                }), function (e, t, i, d, m) {
                    _ && (S = function (t, n, i) {
                        return b && (E[b] = t), E[w] = n, E.$index = i, _(e, E)
                    });
                    var v = ve();
                    e.$watchCollection(g, function (i) {
                        var d, g, y, _, E, C, k, A, M, D, I, P, O = t[0], N = ve();
                        if ($ && (e[$] = i), r(i))M = i, A = S || x; else {
                            A = S || T, M = [];
                            for (var B in i)i.hasOwnProperty(B) && "$" !== B.charAt(0) && M.push(B)
                        }
                        for (_ = M.length, I = new Array(_), d = 0; d < _; d++)if (E = i === M ? d : M[d], C = i[E], k = A(E, C, d), v[k])D = v[k], delete v[k], N[k] = D, I[d] = D; else {
                            if (N[k])throw o(I, function (e) {
                                e && e.scope && (v[e.id] = e)
                            }), c("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", p, k, C);
                            I[d] = {id: k, scope: n, clone: n}, N[k] = !0
                        }
                        for (var V in v) {
                            if (D = v[V], P = me(D.clone), a.leave(P), P[0].parentNode)for (d = 0, g = P.length; d < g; d++)P[d][s] = !0;
                            D.scope.$destroy()
                        }
                        for (d = 0; d < _; d++)if (E = i === M ? d : M[d], C = i[E], D = I[d], D.scope) {
                            y = O;
                            do y = y.nextSibling; while (y && y[s]);
                            u(D) != y && a.move(me(D.clone), null, Ei(O)), O = f(D), l(D.scope, d, w, C, b, E, _)
                        } else m(function (e, t) {
                            D.scope = t;
                            var n = h.cloneNode(!1);
                            e[e.length++] = n, a.enter(e, null, Ei(O)), O = n, D.clone = e, N[D.id] = D, l(D.scope, d, w, C, b, E, _)
                        });
                        v = N
                    })
                }
            }
        }
    }], ua = "ng-hide", fa = "ng-hide-animate", da = ["$animate", function (e) {
        return {
            restrict: "A", multiElement: !0, link: function (t, n, i) {
                t.$watch(i.ngShow, function (t) {
                    e[t ? "removeClass" : "addClass"](n, ua, {tempClasses: fa})
                })
            }
        }
    }], pa = ["$animate", function (e) {
        return {
            restrict: "A", multiElement: !0, link: function (t, n, i) {
                t.$watch(i.ngHide, function (t) {
                    e[t ? "addClass" : "removeClass"](n, ua, {tempClasses: fa})
                })
            }
        }
    }], ha = Jn(function (e, t, n) {
        e.$watch(n.ngStyle, function (e, n) {
            n && e !== n && o(n, function (e, n) {
                t.css(n, "")
            }), e && t.css(e)
        }, !0)
    }), ma = ["$animate", function (e) {
        return {
            require: "ngSwitch", controller: ["$scope", function () {
                this.cases = {}
            }], link: function (n, i, r, a) {
                var s = r.ngSwitch || r.on, c = [], l = [], u = [], f = [], d = function (e, t) {
                    return function () {
                        e.splice(t, 1)
                    }
                };
                n.$watch(s, function (n) {
                    var i, r;
                    for (i = 0, r = u.length; i < r; ++i)e.cancel(u[i]);
                    for (u.length = 0, i = 0, r = f.length; i < r; ++i) {
                        var s = me(l[i].clone);
                        f[i].$destroy();
                        var p = u[i] = e.leave(s);
                        p.then(d(u, i))
                    }
                    l.length = 0, f.length = 0, (c = a.cases["!" + n] || a.cases["?"]) && o(c, function (n) {
                        n.transclude(function (i, r) {
                            f.push(r);
                            var o = n.element;
                            i[i.length++] = t.createComment(" end ngSwitchWhen: ");
                            var a = {clone: i};
                            l.push(a), e.enter(i, o.parent(), o)
                        })
                    })
                })
            }
        }
    }], va = Jn({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function (e, t, n, i, r) {
            i.cases["!" + n.ngSwitchWhen] = i.cases["!" + n.ngSwitchWhen] || [], i.cases["!" + n.ngSwitchWhen].push({
                transclude: r,
                element: t
            })
        }
    }), ga = Jn({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function (e, t, n, i, r) {
            i.cases["?"] = i.cases["?"] || [], i.cases["?"].push({transclude: r, element: t})
        }
    }), $a = Jn({
        restrict: "EAC", link: function (e, t, n, r, o) {
            if (!o)throw i("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", Z(t));
            o(function (e) {
                t.empty(), t.append(e)
            })
        }
    }), ya = ["$templateCache", function (e) {
        return {
            restrict: "E", terminal: !0, compile: function (t, n) {
                if ("text/ng-template" == n.type) {
                    var i = n.id, r = t[0].text;
                    e.put(i, r)
                }
            }
        }
    }], wa = {$setViewValue: m, $render: m}, ba = ["$element", "$scope", "$attrs", function (e, i, r) {
        var o = this, a = new Xe;
        o.ngModelCtrl = wa, o.unknownOption = Ei(t.createElement("option")), o.renderUnknownOption = function (t) {
            var n = "? " + Ye(t) + " ?";
            o.unknownOption.val(n), e.prepend(o.unknownOption), e.val(n)
        }, i.$on("$destroy", function () {
            o.renderUnknownOption = m
        }), o.removeUnknownOption = function () {
            o.unknownOption.parent() && o.unknownOption.remove()
        }, o.readValue = function () {
            return o.removeUnknownOption(), e.val()
        }, o.writeValue = function (t) {
            o.hasOption(t) ? (o.removeUnknownOption(), e.val(t), "" === t && o.emptyOption.prop("selected", !0)) : null == t && o.emptyOption ? (o.removeUnknownOption(), e.val("")) : o.renderUnknownOption(t)
        }, o.addOption = function (e, t) {
            pe(e, '"option value"'), "" === e && (o.emptyOption = t);
            var n = a.get(e) || 0;
            a.put(e, n + 1)
        }, o.removeOption = function (e) {
            var t = a.get(e);
            t && (1 === t ? (a.remove(e), "" === e && (o.emptyOption = n)) : a.put(e, t - 1))
        }, o.hasOption = function (e) {
            return !!a.get(e)
        }
    }], _a = function () {
        return {
            restrict: "E", require: ["select", "?ngModel"], controller: ba, link: function (e, t, n, i) {
                var r = i[1];
                if (r) {
                    var a = i[0];
                    if (a.ngModelCtrl = r, r.$render = function () {
                            a.writeValue(r.$viewValue)
                        }, t.on("change", function () {
                            e.$apply(function () {
                                r.$setViewValue(a.readValue())
                            })
                        }), n.multiple) {
                        a.readValue = function () {
                            var e = [];
                            return o(t.find("option"), function (t) {
                                t.selected && e.push(t.value)
                            }), e
                        }, a.writeValue = function (e) {
                            var n = new Xe(e);
                            o(t.find("option"), function (e) {
                                e.selected = w(n.get(e.value))
                            })
                        };
                        var s, c = NaN;
                        e.$watch(function () {
                            c !== r.$viewValue || F(s, r.$viewValue) || (s = z(r.$viewValue), r.$render()), c = r.$viewValue
                        }), r.$isEmpty = function (e) {
                            return !e || 0 === e.length
                        }
                    }
                }
            }
        }
    }, Sa = ["$interpolate", function (e) {
        function t(e) {
            e[0].hasAttribute("selected") && (e[0].selected = !0)
        }

        return {
            restrict: "E", priority: 100, compile: function (n, i) {
                if (y(i.value)) {
                    var r = e(n.text(), !0);
                    r || i.$set("value", n.text())
                }
                return function (e, n, i) {
                    var o = "$selectController", a = n.parent(), s = a.data(o) || a.parent().data(o);
                    s && s.ngModelCtrl && (r ? e.$watch(r, function (e, r) {
                        i.$set("value", e), r !== e && s.removeOption(r), s.addOption(e, n), s.ngModelCtrl.$render(), t(n)
                    }) : (s.addOption(i.value, n), s.ngModelCtrl.$render(), t(n)), n.on("$destroy", function () {
                        s.removeOption(i.value), s.ngModelCtrl.$render()
                    }))
                }
            }
        }
    }], xa = g({restrict: "E", terminal: !1}), Ta = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (e, t, n, i) {
                i && (n.required = !0, i.$validators.required = function (e, t) {
                    return !n.required || !i.$isEmpty(t)
                }, n.$observe("required", function () {
                    i.$validate()
                }))
            }
        }
    }, Ea = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (e, t, r, o) {
                if (o) {
                    var a, s = r.ngPattern || r.pattern;
                    r.$observe("pattern", function (e) {
                        if (S(e) && e.length > 0 && (e = new RegExp("^" + e + "$")), e && !e.test)throw i("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", s, e, Z(t));
                        a = e || n, o.$validate()
                    }), o.$validators.pattern = function (e) {
                        return o.$isEmpty(e) || y(a) || a.test(e)
                    }
                }
            }
        }
    }, Ca = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (e, t, n, i) {
                if (i) {
                    var r = -1;
                    n.$observe("maxlength", function (e) {
                        var t = p(e);
                        r = isNaN(t) ? -1 : t, i.$validate()
                    }), i.$validators.maxlength = function (e, t) {
                        return r < 0 || i.$isEmpty(t) || t.length <= r
                    }
                }
            }
        }
    }, ka = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (e, t, n, i) {
                if (i) {
                    var r = 0;
                    n.$observe("minlength", function (e) {
                        r = p(e) || 0, i.$validate()
                    }), i.$validators.minlength = function (e, t) {
                        return i.$isEmpty(t) || t.length >= r
                    }
                }
            }
        }
    };
    return e.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (ue(), we(Ni), void Ei(t).ready(function () {
        oe(t, ae)
    }))
}(window, document), !window.angular.$$csp() && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'), function (e, t, n) {
    "use strict";
    function i(e, t, n) {
        if (!e)throw ngMinErr("areq", "Argument '{0}' is {1}", t || "?", n || "required");
        return e
    }

    function r(e, t) {
        return e || t ? e ? t ? (L(e) && (e = e.join(" ")), L(t) && (t = t.join(" ")), e + " " + t) : e : t : ""
    }

    function o(e) {
        var t = {};
        return e && (e.to || e.from) && (t.to = e.to, t.from = e.from), t
    }

    function a(e, t, n) {
        var i = "";
        return e = L(e) ? e : e && R(e) && e.length ? e.split(/\s+/) : [], V(e, function (e, r) {
            e && e.length > 0 && (i += r > 0 ? " " : "", i += n ? t + e : e + t)
        }), i
    }

    function s(e, t) {
        var n = e.indexOf(t);
        t >= 0 && e.splice(n, 1)
    }

    function c(e) {
        if (e instanceof B)switch (e.length) {
            case 0:
                return [];
            case 1:
                if (e[0].nodeType === j)return e;
                break;
            default:
                return B(l(e))
        }
        if (e.nodeType === j)return B(e)
    }

    function l(e) {
        if (!e[0])return e;
        for (var t = 0; t < e.length; t++) {
            var n = e[t];
            if (n.nodeType == j)return n
        }
    }

    function u(e, t, n) {
        V(t, function (t) {
            e.addClass(t, n)
        })
    }

    function f(e, t, n) {
        V(t, function (t) {
            e.removeClass(t, n)
        })
    }

    function d(e) {
        return function (t, n) {
            n.addClass && (u(e, t, n.addClass), n.addClass = null), n.removeClass && (f(e, t, n.removeClass), n.removeClass = null)
        }
    }

    function p(e) {
        if (e = e || {}, !e.$$prepared) {
            var t = e.domOperation || O;
            e.domOperation = function () {
                e.$$domOperationFired = !0, t(), t = O
            }, e.$$prepared = !0
        }
        return e
    }

    function h(e, t) {
        m(e, t), v(e, t)
    }

    function m(e, t) {
        t.from && (e.css(t.from), t.from = null)
    }

    function v(e, t) {
        t.to && (e.css(t.to), t.to = null)
    }

    function g(e, t, n) {
        var i = (t.addClass || "") + " " + (n.addClass || ""), r = (t.removeClass || "") + " " + (n.removeClass || ""), o = $(e.attr("class"), i, r);
        return N(t, n), o.addClass ? t.addClass = o.addClass : t.addClass = null, o.removeClass ? t.removeClass = o.removeClass : t.removeClass = null, t
    }

    function $(e, t, n) {
        function i(e) {
            R(e) && (e = e.split(" "));
            var t = {};
            return V(e, function (e) {
                e.length && (t[e] = !0)
            }), t
        }

        var r = 1, o = -1, a = {};
        e = i(e), t = i(t), V(t, function (e, t) {
            a[t] = r
        }), n = i(n), V(n, function (e, t) {
            a[t] = a[t] === r ? null : o
        });
        var s = {addClass: "", removeClass: ""};
        return V(a, function (t, n) {
            var i, a;
            t === r ? (i = "addClass", a = !e[n]) : t === o && (i = "removeClass", a = e[n]), a && (s[i].length && (s[i] += " "), s[i] += n)
        }), s
    }

    function y(e) {
        return e instanceof t.element ? e[0] : e
    }

    function w(e, t, n) {
        var i = Object.create(null), r = e.getComputedStyle(t) || {};
        return V(n, function (e, t) {
            var n = r[e];
            if (n) {
                var o = n.charAt(0);
                ("-" === o || "+" === o || o >= 0) && (n = b(n)), 0 === n && (n = null), i[t] = n
            }
        }), i
    }

    function b(e) {
        var t = 0, n = e.split(/\s*,\s*/);
        return V(n, function (e) {
            "s" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)), e = parseFloat(e) || 0, t = t ? Math.max(e, t) : e
        }), t
    }

    function _(e) {
        return 0 === e || null != e
    }

    function S(e, t) {
        var n = M, i = e + "s";
        return t ? n += Q : i += " linear all", [n, i]
    }

    function x(e) {
        return [ce, e + "s"]
    }

    function T(e, t) {
        var n = t ? se : le;
        return [n, e + "s"]
    }

    function E(e, t) {
        var n = t ? "-" + t + "s" : "";
        return k(e, [le, n]), [le, n]
    }

    function C(e, t) {
        var n = t ? "paused" : "", i = I + ne;
        return k(e, [i, n]), [i, n]
    }

    function k(e, t) {
        var n = t[0], i = t[1];
        e.style[n] = i
    }

    function A() {
        var e = Object.create(null);
        return {
            flush: function () {
                e = Object.create(null)
            }, count: function (t) {
                var n = e[t];
                return n ? n.total : 0
            }, get: function (t) {
                var n = e[t];
                return n && n.value
            }, put: function (t, n) {
                e[t] ? e[t].total++ : e[t] = {total: 1, value: n}
            }
        }
    }

    var M, D, I, P, O = t.noop, N = t.extend, B = t.element, V = t.forEach, L = t.isArray, R = t.isString, H = t.isObject, z = t.isUndefined, F = t.isDefined, q = t.isFunction, U = t.isElement, j = 1, G = "ng-animate", W = "$$ngAnimateChildren", Y = ["$$rAF", function (e) {
        function t(e) {
            o.push([].concat(e)), n()
        }

        function n() {
            if (o.length) {
                for (var t = [], a = 0; a < o.length; a++) {
                    var s = o[a];
                    i(s), s.length && t.push(s)
                }
                o = t, r || e(function () {
                    r || n()
                })
            }
        }

        function i(e) {
            var t = e.shift();
            t()
        }

        var r, o = [];
        return t.waitUntilQuiet = function (t) {
            r && r(), r = e(function () {
                r = null, t(), n()
            })
        }, t
    }], X = [function () {
        return function (e, n, i) {
            var r = i.ngAnimateChildren;
            t.isString(r) && 0 === r.length ? n.data(W, !0) : i.$observe("ngAnimateChildren", function (e) {
                e = "on" === e || "true" === e, n.data(W, e)
            })
        }
    }], K = "";
    e.ontransitionend === n && e.onwebkittransitionend !== n ? (K = "-webkit-", M = "WebkitTransition", D = "webkitTransitionEnd transitionend") : (M = "transition", D = "transitionend"), e.onanimationend === n && e.onwebkitanimationend !== n ? (K = "-webkit-", I = "WebkitAnimation", P = "webkitAnimationEnd animationend") : (I = "animation", P = "animationend");
    var Q = "Duration", Z = "Property", J = "Delay", ee = "TimingFunction", te = "IterationCount", ne = "PlayState", ie = 3, re = 1.5, oe = 1e3, ae = 9999, se = I + J, ce = I + Q, le = M + J, ue = M + Q, fe = {
        transitionDuration: ue,
        transitionDelay: le,
        transitionProperty: M + Z,
        animationDuration: ce,
        animationDelay: se,
        animationIterationCount: I + te
    }, de = {
        transitionDuration: ue,
        transitionDelay: le,
        animationDuration: ce,
        animationDelay: se
    }, pe = ["$animateProvider", function (e) {
        var t = A(), n = A();
        this.$get = ["$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$document", "$sniffer", "$$rAFScheduler", function (e, i, r, c, l, u, f) {
            function g(e, t) {
                var n = "$$ngAnimateParentKey", i = e.parentNode, r = i[n] || (i[n] = ++R);
                return r + "-" + e.getAttribute("class") + "-" + t
            }

            function $(n, i, r, o) {
                var a = t.get(r);
                return a || (a = w(e, n, o), "infinite" === a.animationIterationCount && (a.animationIterationCount = 1)), t.put(r, a), a
            }

            function b(r, o, s, c) {
                var l;
                if (t.count(s) > 0 && (l = n.get(s), !l)) {
                    var u = a(o, "-stagger");
                    i.addClass(r, u), l = w(e, r, c), l.animationDuration = Math.max(l.animationDuration, 0), l.transitionDuration = Math.max(l.transitionDuration, 0), i.removeClass(r, u), n.put(s, l)
                }
                return l || {}
            }

            function A(e) {
                z.push(e), f.waitUntilQuiet(function () {
                    t.flush(), n.flush();
                    for (var e = H.offsetWidth + 1, i = 0; i < z.length; i++)z[i](e);
                    z.length = 0
                })
            }

            function O(e, t, n) {
                var i = $(e, t, n, fe), r = i.animationDelay, o = i.transitionDelay;
                return i.maxDelay = r && o ? Math.max(r, o) : r || o, i.maxDuration = Math.max(i.animationDuration * i.animationIterationCount, i.transitionDuration), i
            }

            function N(e, n) {
                function l() {
                    d()
                }

                function f() {
                    d(!0)
                }

                function d(t) {
                    H || F && z || (H = !0, z = !1, i.removeClass(e, ce), i.removeClass(e, ue), C(R, !1), E(R, !1), V(X, function (e) {
                        R.style[e[0]] = ""
                    }), B(e, n), h(e, n), n.onDone && n.onDone(), q && q.complete(!t))
                }

                function $(e) {
                    Te.blockTransition && E(R, e), Te.blockKeyframeAnimation && C(R, !!e)
                }

                function w() {
                    return q = new r({end: l, cancel: f}), d(), {
                        $$willAnimate: !1, start: function () {
                            return q
                        }, end: l
                    }
                }

                function N() {
                    function t() {
                        if (!H) {
                            if ($(!1), V(X, function (e) {
                                    var t = e[0], n = e[1];
                                    R.style[t] = n
                                }), B(e, n), i.addClass(e, ue), Te.recalculateTimingStyles) {
                                if (le = R.className + " " + ce, he = g(R, le), Se = O(R, le, he), xe = Se.maxDelay, j = Math.max(xe, 0), W = Se.maxDuration, 0 === W)return void d();
                                Te.hasTransitions = Se.transitionDuration > 0, Te.hasAnimations = Se.animationDuration > 0
                            }
                            if (Te.applyTransitionDelay || Te.applyAnimationDelay) {
                                xe = "boolean" != typeof n.delay && _(n.delay) ? parseFloat(n.delay) : xe, j = Math.max(xe, 0);
                                var t;
                                Te.applyTransitionDelay && (Se.transitionDelay = xe, t = T(xe), X.push(t), R.style[t[0]] = t[1]), Te.applyAnimationDelay && (Se.animationDelay = xe, t = T(xe, !0), X.push(t), R.style[t[0]] = t[1])
                            }
                            if (G = j * oe, Y = W * oe, n.easing) {
                                var s, u = n.easing;
                                Te.hasTransitions && (s = M + ee, X.push([s, u]), R.style[s] = u), Te.hasAnimations && (s = I + ee, X.push([s, u]), R.style[s] = u)
                            }
                            Se.transitionDuration && l.push(D), Se.animationDuration && l.push(P), a = Date.now(), e.on(l.join(" "), o), c(r, G + re * Y), v(e, n)
                        }
                    }

                    function r() {
                        d()
                    }

                    function o(e) {
                        e.stopPropagation();
                        var t = e.originalEvent || e, n = t.$manualTimeStamp || t.timeStamp || Date.now(), i = parseFloat(t.elapsedTime.toFixed(ie));
                        Math.max(n - a, 0) >= G && i >= W && (F = !0, d())
                    }

                    if (!H) {
                        if (!R.parentNode)return void d();
                        var a, l = [], u = function (e) {
                            if (F)z && e && (z = !1, d()); else if (z = !e, Se.animationDuration) {
                                var t = C(R, z);
                                z ? X.push(t) : s(X, t)
                            }
                        }, f = be > 0 && (Se.transitionDuration && 0 === me.transitionDuration || Se.animationDuration && 0 === me.animationDuration) && Math.max(me.animationDelay, me.transitionDelay);
                        f ? c(t, Math.floor(f * be * oe), !1) : t(), U.resume = function () {
                            u(!0)
                        }, U.pause = function () {
                            u(!1)
                        }
                    }
                }

                var R = y(e);
                if (!R || !R.parentNode)return w();
                n = p(n);
                var H, z, F, q, U, j, G, W, Y, X = [], K = e.attr("class"), Q = o(n);
                if (0 === n.duration || !u.animations && !u.transitions)return w();
                var J = n.event && L(n.event) ? n.event.join(" ") : n.event, te = J && n.structural, ne = "", se = "";
                te ? ne = a(J, "ng-", !0) : J && (ne = J), n.addClass && (se += a(n.addClass, "-add")), n.removeClass && (se.length && (se += " "), se += a(n.removeClass, "-remove")), n.applyClassesEarly && se.length && (B(e, n), se = "");
                var ce = [ne, se].join(" ").trim(), le = K + " " + ce, ue = a(ce, "-active"), fe = Q.to && Object.keys(Q.to).length > 0, pe = (n.keyframeStyle || "").length > 0;
                if (!pe && !fe && !ce)return w();
                var he, me;
                if (n.stagger > 0) {
                    var ve = parseFloat(n.stagger);
                    me = {transitionDelay: ve, animationDelay: ve, transitionDuration: 0, animationDuration: 0}
                } else he = g(R, le), me = b(R, ce, he, de);
                i.addClass(e, ce);
                var ge;
                if (n.transitionStyle) {
                    var $e = [M, n.transitionStyle];
                    k(R, $e), X.push($e)
                }
                if (n.duration >= 0) {
                    ge = R.style[M].length > 0;
                    var ye = S(n.duration, ge);
                    k(R, ye), X.push(ye)
                }
                if (n.keyframeStyle) {
                    var we = [I, n.keyframeStyle];
                    k(R, we), X.push(we)
                }
                var be = me ? n.staggerIndex >= 0 ? n.staggerIndex : t.count(he) : 0, _e = 0 === be;
                _e && E(R, ae);
                var Se = O(R, le, he), xe = Se.maxDelay;
                j = Math.max(xe, 0), W = Se.maxDuration;
                var Te = {};
                return Te.hasTransitions = Se.transitionDuration > 0, Te.hasAnimations = Se.animationDuration > 0, Te.hasTransitionAll = Te.hasTransitions && "all" == Se.transitionProperty, Te.applyTransitionDuration = fe && (Te.hasTransitions && !Te.hasTransitionAll || Te.hasAnimations && !Te.hasTransitions), Te.applyAnimationDuration = n.duration && Te.hasAnimations, Te.applyTransitionDelay = _(n.delay) && (Te.applyTransitionDuration || Te.hasTransitions), Te.applyAnimationDelay = _(n.delay) && Te.hasAnimations, Te.recalculateTimingStyles = se.length > 0, (Te.applyTransitionDuration || Te.applyAnimationDuration) && (W = n.duration ? parseFloat(n.duration) : W, Te.applyTransitionDuration && (Te.hasTransitions = !0, Se.transitionDuration = W, ge = R.style[M + Z].length > 0, X.push(S(W, ge))), Te.applyAnimationDuration && (Te.hasAnimations = !0, Se.animationDuration = W, X.push(x(W)))), 0 !== W || Te.recalculateTimingStyles ? (null == n.duration && Se.transitionDuration > 0 && (Te.recalculateTimingStyles = Te.recalculateTimingStyles || _e), G = j * oe, Y = W * oe, n.skipBlocking || (Te.blockTransition = Se.transitionDuration > 0, Te.blockKeyframeAnimation = Se.animationDuration > 0 && me.animationDelay > 0 && 0 === me.animationDuration), m(e, n), Te.blockTransition || E(R, !1), $(W), {
                    $$willAnimate: !0,
                    end: l,
                    start: function () {
                        if (!H)return U = {end: l, cancel: f, resume: null, pause: null}, q = new r(U), A(N), q
                    }
                }) : w()
            }

            var B = d(i), R = 0, H = y(l).body, z = [];
            return N
        }]
    }], he = ["$$animationProvider", function (e) {
        e.drivers.push("$$animateCssDriver");
        var t = "ng-animate-shim", n = "ng-anchor", i = "ng-anchor-out", r = "ng-anchor-in";
        this.$get = ["$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$document", "$sniffer", function (e, o, a, s, c, l) {
            function u(e) {
                return e.replace(/\bng-\S+\b/g, "")
            }

            function f(e, t) {
                return R(e) && (e = e.split(" ")), R(t) && (t = t.split(" ")), e.filter(function (e) {
                    return t.indexOf(e) === -1
                }).join(" ")
            }

            function d(o, s, c) {
                function l(e) {
                    var t = {}, n = y(e).getBoundingClientRect();
                    return V(["width", "height", "top", "left"], function (e) {
                        var i = n[e];
                        switch (e) {
                            case"top":
                                i += m.scrollTop;
                                break;
                            case"left":
                                i += m.scrollLeft
                        }
                        t[e] = Math.floor(i) + "px"
                    }), t
                }

                function d() {
                    var t = e($, {addClass: i, delay: !0, from: l(s)});
                    return t.$$willAnimate ? t : null
                }

                function p(e) {
                    return e.attr("class") || ""
                }

                function h() {
                    var t = u(p(c)), n = f(t, w), o = f(w, t), a = e($, {
                        to: l(c),
                        addClass: r + " " + n,
                        removeClass: i + " " + o,
                        delay: !0
                    });
                    return a.$$willAnimate ? a : null
                }

                function v() {
                    $.remove(), s.removeClass(t), c.removeClass(t)
                }

                var $ = B(y(s).cloneNode(!0)), w = u(p($));
                s.addClass(t), c.addClass(t), $.addClass(n), g.append($);
                var b, _ = d();
                if (!_ && (b = h(), !b))return v();
                var S = _ || b;
                return {
                    start: function () {
                        function e() {
                            n && n.end()
                        }

                        var t, n = S.start();
                        return n.done(function () {
                            return n = null, !b && (b = h()) ? (n = b.start(), n.done(function () {
                                n = null, v(), t.complete()
                            }), n) : (v(), void t.complete())
                        }), t = new a({end: e, cancel: e})
                    }
                }
            }

            function p(e, t, n, i) {
                var r = h(e), o = h(t), s = [];
                if (V(i, function (e) {
                        var t = e.out, i = e["in"], r = d(n, t, i);
                        r && s.push(r)
                    }), r || o || 0 !== s.length)return {
                    start: function () {
                        function e() {
                            V(t, function (e) {
                                e.end()
                            })
                        }

                        var t = [];
                        r && t.push(r.start()),
                        o && t.push(o.start()), V(s, function (e) {
                            t.push(e.start())
                        });
                        var n = new a({end: e, cancel: e});
                        return a.all(t, function (e) {
                            n.complete(e)
                        }), n
                    }
                }
            }

            function h(t) {
                var n = t.element, i = t.options || {};
                t.structural ? (i.structural = i.applyClassesEarly = !0, i.event = t.event, "leave" === i.event && (i.onDone = i.domOperation)) : i.event = null;
                var r = e(n, i);
                return r.$$willAnimate ? r : null
            }

            if (!l.animations && !l.transitions)return O;
            var m = y(c).body, v = y(s), g = B(m.parentNode === v ? m : v);
            return function (e) {
                return e.from && e.to ? p(e.from, e.to, e.classes, e.anchors) : h(e)
            }
        }]
    }], me = ["$animateProvider", function (e) {
        this.$get = ["$injector", "$$AnimateRunner", "$$rAFMutex", "$$jqLite", function (t, n, i, r) {
            function o(n) {
                n = L(n) ? n : n.split(" ");
                for (var i = [], r = {}, o = 0; o < n.length; o++) {
                    var a = n[o], s = e.$$registeredAnimations[a];
                    s && !r[a] && (i.push(t.get(s)), r[a] = !0)
                }
                return i
            }

            var a = d(r);
            return function (e, t, i, r) {
                function s() {
                    r.domOperation(), a(e, r)
                }

                function c(e, t, i, r, o) {
                    var a;
                    switch (i) {
                        case"animate":
                            a = [t, r.from, r.to, o];
                            break;
                        case"setClass":
                            a = [t, m, v, o];
                            break;
                        case"addClass":
                            a = [t, m, o];
                            break;
                        case"removeClass":
                            a = [t, v, o];
                            break;
                        default:
                            a = [t, o]
                    }
                    a.push(r);
                    var s = e.apply(e, a);
                    if (s)if (q(s.start) && (s = s.start()), s instanceof n)s.done(o); else if (q(s))return s;
                    return O
                }

                function l(e, t, i, r, o) {
                    var a = [];
                    return V(r, function (r) {
                        var s = r[o];
                        s && a.push(function () {
                            var r, o, a = !1, l = function (e) {
                                a || (a = !0, (o || O)(e), r.complete(!e))
                            };
                            return r = new n({
                                end: function () {
                                    l()
                                }, cancel: function () {
                                    l(!0)
                                }
                            }), o = c(s, e, t, i, function (e) {
                                var t = e === !1;
                                l(t)
                            }), r
                        })
                    }), a
                }

                function u(e, t, i, r, o) {
                    var a = l(e, t, i, r, o);
                    if (0 === a.length) {
                        var s, c;
                        "beforeSetClass" === o ? (s = l(e, "removeClass", i, r, "beforeRemoveClass"), c = l(e, "addClass", i, r, "beforeAddClass")) : "setClass" === o && (s = l(e, "removeClass", i, r, "removeClass"), c = l(e, "addClass", i, r, "addClass")), s && (a = a.concat(s)), c && (a = a.concat(c))
                    }
                    if (0 !== a.length)return function (e) {
                        var t = [];
                        return a.length && V(a, function (e) {
                            t.push(e())
                        }), t.length ? n.all(t, e) : e(), function (e) {
                            V(t, function (t) {
                                e ? t.cancel() : t.end()
                            })
                        }
                    }
                }

                3 === arguments.length && H(i) && (r = i, i = null), r = p(r), i || (i = e.attr("class") || "", r.addClass && (i += " " + r.addClass), r.removeClass && (i += " " + r.removeClass));
                var f, d, m = r.addClass, v = r.removeClass, g = o(i);
                if (g.length) {
                    var $, y;
                    "leave" == t ? (y = "leave", $ = "afterLeave") : (y = "before" + t.charAt(0).toUpperCase() + t.substr(1), $ = t), "enter" !== t && "move" !== t && (f = u(e, t, r, g, y)), d = u(e, t, r, g, $)
                }
                if (f || d)return {
                    start: function () {
                        function t(t) {
                            c = !0, s(), h(e, r), l.complete(t)
                        }

                        function i(e) {
                            c || ((o || O)(e), t(e))
                        }

                        var o, a = [];
                        f && a.push(function (e) {
                            o = f(e)
                        }), a.length ? a.push(function (e) {
                            s(), e(!0)
                        }) : s(), d && a.push(function (e) {
                            o = d(e)
                        });
                        var c = !1, l = new n({
                            end: function () {
                                i()
                            }, cancel: function () {
                                i(!0)
                            }
                        });
                        return n.chain(a, t), l
                    }
                }
            }
        }]
    }], ve = ["$$animationProvider", function (e) {
        e.drivers.push("$$animateJsDriver"), this.$get = ["$$animateJs", "$$AnimateRunner", function (e, t) {
            function n(t) {
                var n = t.element, i = t.event, r = t.options, o = t.classes;
                return e(n, i, o, r)
            }

            return function (e) {
                if (e.from && e.to) {
                    var i = n(e.from), r = n(e.to);
                    if (!i && !r)return;
                    return {
                        start: function () {
                            function e() {
                                return function () {
                                    V(o, function (e) {
                                        e.end()
                                    })
                                }
                            }

                            function n(e) {
                                a.complete(e)
                            }

                            var o = [];
                            i && o.push(i.start()), r && o.push(r.start()), t.all(o, n);
                            var a = new t({end: e(), cancel: e()});
                            return a
                        }
                    }
                }
                return n(e)
            }
        }]
    }], ge = "data-ng-animate", $e = "$ngAnimatePin", ye = ["$animateProvider", function (e) {
        function t(e, t, n, i) {
            return a[e].some(function (e) {
                return e(t, n, i)
            })
        }

        function n(e, t) {
            e = e || {};
            var n = (e.addClass || "").length > 0, i = (e.removeClass || "").length > 0;
            return t ? n && i : n || i
        }

        var r = 1, o = 2, a = this.rules = {skip: [], cancel: [], join: []};
        a.join.push(function (e, t, i) {
            return !t.structural && n(t.options)
        }), a.skip.push(function (e, t, i) {
            return !t.structural && !n(t.options)
        }), a.skip.push(function (e, t, n) {
            return "leave" == n.event && t.structural
        }), a.skip.push(function (e, t, n) {
            return n.structural && !t.structural
        }), a.cancel.push(function (e, t, n) {
            return n.structural && t.structural
        }), a.cancel.push(function (e, t, n) {
            return n.state === o && t.structural
        }), a.cancel.push(function (e, t, n) {
            var i = t.options, r = n.options;
            return i.addClass && i.addClass === r.removeClass || i.removeClass && i.removeClass === r.addClass
        }), this.$get = ["$$rAF", "$rootScope", "$rootElement", "$document", "$$HashMap", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", function (a, s, u, f, m, v, $, w, b) {
            function _(e, t) {
                return g(e, t, {})
            }

            function S(e, t) {
                var n = y(e), i = [], r = G[t];
                return r && V(r, function (e) {
                    e.node.contains(n) && i.push(e.callback)
                }), i
            }

            function x(e, t, n, i) {
                a(function () {
                    V(S(t, e), function (e) {
                        e(t, n, i)
                    })
                })
            }

            function T(e, i, a) {
                function l(t, n, i, r) {
                    x(n, e, i, r), t.progress(n, i, r)
                }

                function u(t) {
                    K(e, a), h(e, a), a.domOperation(), m.complete(!t)
                }

                var f, d;
                e = c(e), e && (f = y(e), d = e.parent()), a = p(a);
                var m = new $;
                if (!f)return u(), m;
                L(a.addClass) && (a.addClass = a.addClass.join(" ")), L(a.removeClass) && (a.removeClass = a.removeClass.join(" ")), a.from && !H(a.from) && (a.from = null), a.to && !H(a.to) && (a.to = null);
                var w = [f.className, a.addClass, a.removeClass].join(" ");
                if (!X(w))return u(), m;
                var b = ["enter", "move", "leave"].indexOf(i) >= 0, S = !O || P.get(f), T = !S && I.get(f) || {}, k = !!T.state;
                if (S || k && T.state == r || (S = !M(e, d, i)), S)return u(), m;
                b && E(e);
                var N = {structural: b, element: e, event: i, close: u, options: a, runner: m};
                if (k) {
                    var B = t("skip", e, N, T);
                    if (B)return T.state === o ? (u(), m) : (g(e, T.options, a), T.runner);
                    var V = t("cancel", e, N, T);
                    if (V)T.state === o ? T.runner.end() : T.structural ? T.close() : g(e, N.options, T.options); else {
                        var R = t("join", e, N, T);
                        if (R) {
                            if (T.state !== o)return i = N.event = T.event, a = g(e, T.options, N.options), m;
                            _(e, a)
                        }
                    }
                } else _(e, a);
                var z = N.structural;
                if (z || (z = "animate" === N.event && Object.keys(N.options.to || {}).length > 0 || n(N.options)), !z)return u(), C(e), m;
                b && A(d);
                var F = (T.counter || 0) + 1;
                return N.counter = F, D(e, r, N), s.$$postDigest(function () {
                    var t = I.get(f), r = !t;
                    t = t || {};
                    var s = e.parent() || [], c = s.length > 0 && ("animate" === t.event || t.structural || n(t.options));
                    if (r || t.counter !== F || !c)return r && (K(e, a), h(e, a)), (r || b && t.event !== i) && (a.domOperation(), m.end()), void(c || C(e));
                    i = !t.structural && n(t.options, !0) ? "setClass" : t.event, t.structural && A(s), D(e, o);
                    var d = v(e, i, t.options);
                    d.done(function (t) {
                        u(!t);
                        var n = I.get(f);
                        n && n.counter === F && C(y(e)), l(m, i, "close", {})
                    }), m.setHost(d), l(m, i, "start", {})
                }), m
            }

            function E(e) {
                var t = y(e), n = t.querySelectorAll("[" + ge + "]");
                V(n, function (e) {
                    var t = parseInt(e.getAttribute(ge)), n = I.get(e);
                    switch (t) {
                        case o:
                            n.runner.end();
                        case r:
                            n && I.remove(e)
                    }
                })
            }

            function C(e) {
                var t = y(e);
                t.removeAttribute(ge), I.remove(t)
            }

            function k(e, t) {
                return y(e) === y(t)
            }

            function A(e) {
                function t(e, t) {
                    !t.structural && n(t.options) && (t.state === o && t.runner.end(), C(e))
                }

                for (var i = y(e); ;) {
                    if (!i || i.nodeType !== j)break;
                    var r = I.get(i);
                    r && t(i, r), i = i.parentNode
                }
            }

            function M(e, t, n) {
                var i, r = !1, o = !1, a = !1, s = e.data($e);
                for (s && (t = s); t && t.length;) {
                    o || (o = k(t, u));
                    var c = t[0];
                    if (c.nodeType !== j)break;
                    var l = I.get(c) || {};
                    if (a || (a = l.structural || P.get(c)), z(i) || i === !0) {
                        var f = t.data(W);
                        F(f) && (i = f)
                    }
                    if (a && i === !1)break;
                    o || (o = k(t, u), o || (s = t.data($e), s && (t = s))), r || (r = k(t, q)), t = t.parent()
                }
                var d = !a || i;
                return d && o && r
            }

            function D(e, t, n) {
                n = n || {}, n.state = t;
                var i = y(e);
                i.setAttribute(ge, t);
                var r = I.get(i), o = r ? N(r, n) : n;
                I.put(i, o)
            }

            var I = new m, P = new m, O = null, R = s.$watch(function () {
                return 0 === w.totalPendingRequests
            }, function (e) {
                e && (R(), s.$$postDigest(function () {
                    s.$$postDigest(function () {
                        null === O && (O = !0)
                    })
                }))
            }), q = B(f[0].body), G = {}, Y = e.classNameFilter(), X = Y ? function (e) {
                return Y.test(e)
            } : function () {
                return !0
            }, K = d(b);
            return {
                on: function (e, t, n) {
                    var i = l(t);
                    G[e] = G[e] || [], G[e].push({node: i, callback: n})
                }, off: function (e, t, n) {
                    function i(e, t, n) {
                        var i = l(t);
                        return e.filter(function (e) {
                            var t = e.node === i && (!n || e.callback === n);
                            return !t
                        })
                    }

                    var r = G[e];
                    r && (G[e] = 1 === arguments.length ? null : i(r, t, n))
                }, pin: function (e, t) {
                    i(U(e), "element", "not an element"), i(U(t), "parentElement", "not an element"), e.data($e, t)
                }, push: function (e, t, n, i) {
                    return n = n || {}, n.domOperation = i, T(e, t, n)
                }, enabled: function (e, t) {
                    var n = arguments.length;
                    if (0 === n)t = !!O; else {
                        var i = U(e);
                        if (i) {
                            var r = y(e), o = P.get(r);
                            1 === n ? t = !o : (t = !!t, t ? o && P.remove(r) : P.put(r, !0))
                        } else t = O = !!e
                    }
                    return t
                }
            }
        }]
    }], we = ["$$rAF", function (e) {
        return function () {
            var t = !1;
            return e(function () {
                t = !0
            }), function (n) {
                t ? n() : e(n)
            }
        }
    }], be = ["$q", "$$rAFMutex", function (e, t) {
        function n(e) {
            this.setHost(e), this._doneCallbacks = [], this._runInAnimationFrame = t(), this._state = 0
        }

        var i = 0, r = 1, o = 2;
        return n.chain = function (e, t) {
            function n() {
                return i === e.length ? void t(!0) : void e[i](function (e) {
                    return e === !1 ? void t(!1) : (i++, void n())
                })
            }

            var i = 0;
            n()
        }, n.all = function (e, t) {
            function n(n) {
                r = r && n, ++i === e.length && t(r)
            }

            var i = 0, r = !0;
            V(e, function (e) {
                e.done(n)
            })
        }, n.prototype = {
            setHost: function (e) {
                this.host = e || {}
            }, done: function (e) {
                this._state === o ? e() : this._doneCallbacks.push(e)
            }, progress: O, getPromise: function () {
                if (!this.promise) {
                    var t = this;
                    this.promise = e(function (e, n) {
                        t.done(function (t) {
                            t === !1 ? n() : e()
                        })
                    })
                }
                return this.promise
            }, then: function (e, t) {
                return this.getPromise().then(e, t)
            }, "catch": function (e) {
                return this.getPromise()["catch"](e)
            }, "finally": function (e) {
                return this.getPromise()["finally"](e)
            }, pause: function () {
                this.host.pause && this.host.pause()
            }, resume: function () {
                this.host.resume && this.host.resume()
            }, end: function () {
                this.host.end && this.host.end(), this._resolve(!0)
            }, cancel: function () {
                this.host.cancel && this.host.cancel(), this._resolve(!1)
            }, complete: function (e) {
                var t = this;
                t._state === i && (t._state = r, t._runInAnimationFrame(function () {
                    t._resolve(e)
                }))
            }, _resolve: function (e) {
                this._state !== o && (V(this._doneCallbacks, function (t) {
                    t(e)
                }), this._doneCallbacks.length = 0, this._state = o)
            }
        }, n
    }], _e = ["$animateProvider", function (e) {
        function t(e, t) {
            e.data(s, t)
        }

        function n(e) {
            e.removeData(s)
        }

        function i(e) {
            return e.data(s)
        }

        var o = "ng-animate-ref", a = this.drivers = [], s = "$$animationRunner";
        this.$get = ["$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$rAFScheduler", function (e, s, c, l, u) {
            var f = [], m = d(e), v = 0, g = 0, $ = [];
            return function (d, w, b) {
                function _(e) {
                    var t = "[" + o + "]", n = e.hasAttribute(o) ? [e] : e.querySelectorAll(t), i = [];
                    return V(n, function (e) {
                        var t = e.getAttribute(o);
                        t && t.length && i.push(e)
                    }), i
                }

                function S(e) {
                    var t = [], n = {};
                    V(e, function (e, i) {
                        var r = e.element, a = y(r), s = e.event, c = ["enter", "move"].indexOf(s) >= 0, l = e.structural ? _(a) : [];
                        if (l.length) {
                            var u = c ? "to" : "from";
                            V(l, function (e) {
                                var t = e.getAttribute(o);
                                n[t] = n[t] || {}, n[t][u] = {animationID: i, element: B(e)}
                            })
                        } else t.push(e)
                    });
                    var i = {}, r = {};
                    return V(n, function (n, o) {
                        var a = n.from, s = n.to;
                        if (!a || !s) {
                            var c = a ? a.animationID : s.animationID, l = c.toString();
                            return void(i[l] || (i[l] = !0, t.push(e[c])))
                        }
                        var u = e[a.animationID], f = e[s.animationID], d = a.animationID.toString();
                        if (!r[d]) {
                            var p = r[d] = {
                                structural: !0, beforeStart: function () {
                                    u.beforeStart(), f.beforeStart()
                                }, close: function () {
                                    u.close(), f.close()
                                }, classes: x(u.classes, f.classes), from: u, to: f, anchors: []
                            };
                            p.classes.length ? t.push(p) : (t.push(u), t.push(f))
                        }
                        r[d].anchors.push({out: a.element, "in": s.element})
                    }), t
                }

                function x(e, t) {
                    e = e.split(" "), t = t.split(" ");
                    for (var n = [], i = 0; i < e.length; i++) {
                        var r = e[i];
                        if ("ng-" !== r.substring(0, 3))for (var o = 0; o < t.length; o++)if (r === t[o]) {
                            n.push(r);
                            break
                        }
                    }
                    return n.join(" ")
                }

                function T(e) {
                    for (var t = a.length - 1; t >= 0; t--) {
                        var n = a[t];
                        if (c.has(n)) {
                            var i = c.get(n), r = i(e);
                            if (r)return r
                        }
                    }
                }

                function E() {
                    d.addClass(G), P && e.addClass(d, P)
                }

                function C(e, t) {
                    function n(e) {
                        i(e).setHost(t)
                    }

                    e.from && e.to ? (n(e.from.element), n(e.to.element)) : n(e.element)
                }

                function k() {
                    var e = i(d);
                    !e || "leave" === w && b.$$domOperationFired || e.end()
                }

                function A(t) {
                    d.off("$destroy", k), n(d), m(d, b), h(d, b), b.domOperation(), P && e.removeClass(d, P), d.removeClass(G), D.complete(!t)
                }

                b = p(b);
                var M = ["enter", "move", "leave"].indexOf(w) >= 0, D = new l({
                    end: function () {
                        A()
                    }, cancel: function () {
                        A(!0)
                    }
                });
                if (!a.length)return A(), D;
                t(d, D);
                var I = r(d.attr("class"), r(b.addClass, b.removeClass)), P = b.tempClasses;
                P && (I += " " + P, b.tempClasses = null);
                var O;
                return M || (O = v, v += 1), f.push({
                    element: d,
                    classes: I,
                    event: w,
                    classBasedIndex: O,
                    structural: M,
                    options: b,
                    beforeStart: E,
                    close: A
                }), d.on("$destroy", k), f.length > 1 ? D : (s.$$postDigest(function () {
                    g = v, v = 0, $.length = 0;
                    var e = [];
                    V(f, function (t) {
                        i(t.element) && e.push(t)
                    }), f.length = 0, V(S(e), function (e) {
                        function t() {
                            e.beforeStart();
                            var t, n = e.close, r = e.anchors ? e.from.element || e.to.element : e.element;
                            if (i(r) && y(r).parentNode) {
                                var o = T(e);
                                o && (t = o.start)
                            }
                            if (t) {
                                var a = t();
                                a.done(function (e) {
                                    n(!e)
                                }), C(e, a)
                            } else n()
                        }

                        e.structural ? t() : ($.push({
                            node: y(e.element),
                            fn: t
                        }), e.classBasedIndex === g - 1 && ($ = $.sort(function (e, t) {
                            return t.node.contains(e.node)
                        }).map(function (e) {
                            return e.fn
                        }), u($)))
                    })
                }), D)
            }
        }]
    }];
    t.module("ngAnimate", []).directive("ngAnimateChildren", X).factory("$$rAFMutex", we).factory("$$rAFScheduler", Y).factory("$$AnimateRunner", be).provider("$$animateQueue", ye).provider("$$animation", _e).provider("$animateCss", pe).provider("$$animateCssDriver", he).provider("$$animateJs", me).provider("$$animateJsDriver", ve)
}(window, window.angular), function (e, t, n) {
    "use strict";
    function i() {
        this.$get = ["$$sanitizeUri", function (e) {
            return function (t) {
                var n = [];
                return a(t, l(n, function (t, n) {
                    return !/^unsafe/.test(e(t, n))
                })), n.join("")
            }
        }]
    }

    function r(e) {
        var n = [], i = l(n, t.noop);
        return i.chars(e), n.join("")
    }

    function o(e, n) {
        var i, r = {}, o = e.split(",");
        for (i = 0; i < o.length; i++)r[n ? t.lowercase(o[i]) : o[i]] = !0;
        return r
    }

    function a(e, n) {
        function i(e, i, o, a) {
            if (i = t.lowercase(i), T[i])for (; y.last() && E[y.last()];)r("", y.last());
            x[i] && y.last() == i && r("", i), a = b[i] || !!a, a || y.push(i);
            var c = {};
            o.replace(p, function (e, t, n, i, r) {
                var o = n || i || r || "";
                c[t] = s(o)
            }), n.start && n.start(i, c, a)
        }

        function r(e, i) {
            var r, o = 0;
            if (i = t.lowercase(i))for (o = y.length - 1; o >= 0 && y[o] != i; o--);
            if (o >= 0) {
                for (r = y.length - 1; r >= o; r--)n.end && n.end(y[r]);
                y.length = o
            }
        }

        "string" != typeof e && (e = null === e || "undefined" == typeof e ? "" : "" + e);
        var o, a, c, l, y = [], w = e;
        for (y.last = function () {
            return y[y.length - 1]
        }; e;) {
            if (l = "", a = !0, y.last() && k[y.last()] ? (e = e.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*" + y.last() + "[^>]*>", "i"), function (e, t) {
                    return t = t.replace(v, "$1").replace($, "$1"), n.chars && n.chars(s(t)), ""
                }), r("", y.last())) : (0 === e.indexOf("<!--") ? (o = e.indexOf("--", 4), o >= 0 && e.lastIndexOf("-->", o) === o && (n.comment && n.comment(e.substring(4, o)), e = e.substring(o + 3), a = !1)) : g.test(e) ? (c = e.match(g), c && (e = e.replace(c[0], ""), a = !1)) : m.test(e) ? (c = e.match(d), c && (e = e.substring(c[0].length), c[0].replace(d, r), a = !1)) : h.test(e) && (c = e.match(f), c ? (c[4] && (e = e.substring(c[0].length), c[0].replace(f, i)), a = !1) : (l += "<", e = e.substring(1))), a && (o = e.indexOf("<"), l += o < 0 ? e : e.substring(0, o), e = o < 0 ? "" : e.substring(o), n.chars && n.chars(s(l)))), e == w)throw u("badparse", "The sanitizer was unable to parse the following block of html: {0}", e);
            w = e
        }
        r()
    }

    function s(e) {
        return e ? (O.innerHTML = e.replace(/</g, "&lt;"), O.textContent) : ""
    }

    function c(e) {
        return e.replace(/&/g, "&amp;").replace(y, function (e) {
            var t = e.charCodeAt(0), n = e.charCodeAt(1);
            return "&#" + (1024 * (t - 55296) + (n - 56320) + 65536) + ";"
        }).replace(w, function (e) {
            return "&#" + e.charCodeAt(0) + ";"
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function l(e, n) {
        var i = !1, r = t.bind(e, e.push);
        return {
            start: function (e, o, a) {
                e = t.lowercase(e), !i && k[e] && (i = e), i || A[e] !== !0 || (r("<"), r(e), t.forEach(o, function (i, o) {
                    var a = t.lowercase(o), s = "img" === e && "src" === a || "background" === a;
                    P[a] !== !0 || M[a] === !0 && !n(i, s) || (r(" "), r(o), r('="'), r(c(i)), r('"'))
                }), r(a ? "/>" : ">"))
            }, end: function (e) {
                e = t.lowercase(e), i || A[e] !== !0 || (r("</"), r(e), r(">")), e == i && (i = !1)
            }, chars: function (e) {
                i || r(c(e))
            }
        }
    }

    var u = t.$$minErr("$sanitize"), f = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/, d = /^<\/\s*([\w:-]+)[^>]*>/, p = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, h = /^</, m = /^<\//, v = /<!--(.*?)-->/g, g = /<!DOCTYPE([^>]*?)>/i, $ = /<!\[CDATA\[(.*?)]]>/g, y = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, w = /([^\#-~| |!])/g, b = o("area,br,col,hr,img,wbr"), _ = o("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), S = o("rp,rt"), x = t.extend({}, S, _), T = t.extend({}, _, o("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), E = t.extend({}, S, o("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")), C = o("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use"), k = o("script,style"), A = t.extend({}, b, T, E, x, C), M = o("background,cite,href,longdesc,src,usemap,xlink:href"), D = o("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"), I = o("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0), P = t.extend({}, M, I, D), O = document.createElement("pre");
    t.module("ngSanitize", []).provider("$sanitize", i), t.module("ngSanitize").filter("linky", ["$sanitize", function (e) {
        var n = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"”’]/i, i = /^mailto:/i;
        return function (o, a) {
            function s(e) {
                e && p.push(r(e))
            }

            function c(e, n) {
                p.push("<a "), t.isDefined(a) && p.push('target="', a, '" '), p.push('href="', e.replace(/"/g, "&quot;"), '">'), s(n), p.push("</a>")
            }

            if (!o)return o;
            for (var l, u, f, d = o, p = []; l = d.match(n);)u = l[0], l[2] || l[4] || (u = (l[3] ? "http://" : "mailto:") + u), f = l.index, s(d.substr(0, f)), c(u, l[0].replace(i, "")), d = d.substring(f + l[0].length);
            return s(d), e(p.join(""))
        }
    }])
}(window, window.angular), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"), function (e, t, n) {
    "use strict";
    function i(e, t) {
        return L(new (L(function () {
        }, {prototype: e})), t)
    }

    function r(e) {
        return V(arguments, function (t) {
            t !== e && V(t, function (t, n) {
                e.hasOwnProperty(n) || (e[n] = t)
            })
        }), e
    }

    function o(e, t) {
        var n = [];
        for (var i in e.path) {
            if (e.path[i] !== t.path[i])break;
            n.push(e.path[i])
        }
        return n
    }

    function a(e) {
        if (Object.keys)return Object.keys(e);
        var n = [];
        return t.forEach(e, function (e, t) {
            n.push(t)
        }), n
    }

    function s(e, t) {
        if (Array.prototype.indexOf)return e.indexOf(t, Number(arguments[2]) || 0);
        var n = e.length >>> 0, i = Number(arguments[2]) || 0;
        for (i = i < 0 ? Math.ceil(i) : Math.floor(i), i < 0 && (i += n); i < n; i++)if (i in e && e[i] === t)return i;
        return -1
    }

    function c(e, t, n, i) {
        var r, c = o(n, i), l = {}, u = [];
        for (var f in c)if (c[f].params && (r = a(c[f].params), r.length))for (var d in r)s(u, r[d]) >= 0 || (u.push(r[d]), l[r[d]] = e[r[d]]);
        return L({}, l, t)
    }

    function l(e, t, n) {
        if (!n) {
            n = [];
            for (var i in e)n.push(i)
        }
        for (var r = 0; r < n.length; r++) {
            var o = n[r];
            if (e[o] != t[o])return !1
        }
        return !0
    }

    function u(e, t) {
        var n = {};
        return V(e, function (e) {
            n[e] = t[e]
        }), n
    }

    function f(e) {
        var t = {}, n = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        for (var i in e)s(n, i) == -1 && (t[i] = e[i]);
        return t
    }

    function d(e, t) {
        var n = B(e), i = n ? [] : {};
        return V(e, function (e, r) {
            t(e, r) && (i[n ? i.length : r] = e)
        }), i
    }

    function p(e, t) {
        var n = B(e) ? [] : {};
        return V(e, function (e, i) {
            n[i] = t(e, i)
        }), n
    }

    function h(e, t) {
        var i = 1, o = 2, c = {}, l = [], u = c, d = L(e.when(c), {$$promises: c, $$values: c});
        this.study = function (c) {
            function p(e, n) {
                if ($[n] !== o) {
                    if (g.push(n), $[n] === i)throw g.splice(0, s(g, n)), new Error("Cyclic dependency: " + g.join(" -> "));
                    if ($[n] = i, O(e))v.push(n, [function () {
                        return t.get(e)
                    }], l); else {
                        var r = t.annotate(e);
                        V(r, function (e) {
                            e !== n && c.hasOwnProperty(e) && p(c[e], e)
                        }), v.push(n, e, r)
                    }
                    g.pop(), $[n] = o
                }
            }

            function h(e) {
                return N(e) && e.then && e.$$promises
            }

            if (!N(c))throw new Error("'invocables' must be an object");
            var m = a(c || {}), v = [], g = [], $ = {};
            return V(c, p), c = g = $ = null, function (i, o, a) {
                function s() {
                    --w || (b || r(y, o.$$values), g.$$values = y, g.$$promises = g.$$promises || !0, delete g.$$inheritedValues, p.resolve(y))
                }

                function c(e) {
                    g.$$failure = e, p.reject(e)
                }

                function l(n, r, o) {
                    function l(e) {
                        f.reject(e), c(e)
                    }

                    function u() {
                        if (!I(g.$$failure))try {
                            f.resolve(t.invoke(r, a, y)), f.promise.then(function (e) {
                                y[n] = e, s()
                            }, l)
                        } catch (e) {
                            l(e)
                        }
                    }

                    var f = e.defer(), d = 0;
                    V(o, function (e) {
                        $.hasOwnProperty(e) && !i.hasOwnProperty(e) && (d++, $[e].then(function (t) {
                            y[e] = t, --d || u()
                        }, l))
                    }), d || u(), $[n] = f.promise
                }

                if (h(i) && a === n && (a = o, o = i, i = null), i) {
                    if (!N(i))throw new Error("'locals' must be an object")
                } else i = u;
                if (o) {
                    if (!h(o))throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                } else o = d;
                var p = e.defer(), g = p.promise, $ = g.$$promises = {}, y = L({}, i), w = 1 + v.length / 3, b = !1;
                if (I(o.$$failure))return c(o.$$failure), g;
                o.$$inheritedValues && r(y, f(o.$$inheritedValues, m)), L($, o.$$promises), o.$$values ? (b = r(y, f(o.$$values, m)), g.$$inheritedValues = f(o.$$values, m), s()) : (o.$$inheritedValues && (g.$$inheritedValues = f(o.$$inheritedValues, m)), o.then(s, c));
                for (var _ = 0, S = v.length; _ < S; _ += 3)i.hasOwnProperty(v[_]) ? s() : l(v[_], v[_ + 1], v[_ + 2]);
                return g
            }
        }, this.resolve = function (e, t, n, i) {
            return this.study(e)(t, n, i)
        }
    }

    function m(e, t, n) {
        this.fromConfig = function (e, t, n) {
            return I(e.template) ? this.fromString(e.template, t) : I(e.templateUrl) ? this.fromUrl(e.templateUrl, t) : I(e.templateProvider) ? this.fromProvider(e.templateProvider, t, n) : null
        }, this.fromString = function (e, t) {
            return P(e) ? e(t) : e
        }, this.fromUrl = function (n, i) {
            return P(n) && (n = n(i)), null == n ? null : e.get(n, {
                cache: t,
                headers: {Accept: "text/html"}
            }).then(function (e) {
                return e.data
            })
        }, this.fromProvider = function (e, t, i) {
            return n.invoke(e, null, i || {params: t})
        }
    }

    function v(e, t, r) {
        function o(t, n, i, r) {
            if (v.push(t), h[t])return h[t];
            if (!/^\w+(-+\w+)*(?:\[\])?$/.test(t))throw new Error("Invalid parameter name '" + t + "' in pattern '" + e + "'");
            if (m[t])throw new Error("Duplicate parameter name '" + t + "' in pattern '" + e + "'");
            return m[t] = new H.Param(t, n, i, r), m[t]
        }

        function a(e, t, n) {
            var i = ["", ""], r = e.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
            if (!t)return r;
            switch (n) {
                case!1:
                    i = ["(", ")"];
                    break;
                case!0:
                    i = ["?(", ")?"];
                    break;
                default:
                    i = ["(" + n + "|", ")?"]
            }
            return r + i[0] + t + i[1]
        }

        function s(n, r) {
            var o, a, s, c, l;
            return o = n[2] || n[3], l = t.params[o], s = e.substring(d, n.index), a = r ? n[4] : n[4] || ("*" == n[1] ? ".*" : null), c = H.type(a || "string") || i(H.type("string"), {pattern: new RegExp(a)}), {
                id: o,
                regexp: a,
                segment: s,
                type: c,
                cfg: l
            }
        }

        t = L({params: {}}, N(t) ? t : {});
        var c, l = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, u = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, f = "^", d = 0, p = this.segments = [], h = r ? r.params : {}, m = this.params = r ? r.params.$$new() : new H.ParamSet, v = [];
        this.source = e;
        for (var g, $, y; (c = l.exec(e)) && (g = s(c, !1), !(g.segment.indexOf("?") >= 0));)$ = o(g.id, g.type, g.cfg, "path"), f += a(g.segment, $.type.pattern.source, $.squash), p.push(g.segment), d = l.lastIndex;
        y = e.substring(d);
        var w = y.indexOf("?");
        if (w >= 0) {
            var b = this.sourceSearch = y.substring(w);
            if (y = y.substring(0, w), this.sourcePath = e.substring(0, d + w), b.length > 0)for (d = 0; c = u.exec(b);)g = s(c, !0), $ = o(g.id, g.type, g.cfg, "search"), d = l.lastIndex
        } else this.sourcePath = e, this.sourceSearch = "";
        f += a(y) + (t.strict === !1 ? "/?" : "") + "$", p.push(y), this.regexp = new RegExp(f, t.caseInsensitive ? "i" : n), this.prefix = p[0], this.$$paramNames = v
    }

    function g(e) {
        L(this, e)
    }

    function $() {
        function e(e) {
            return null != e ? e.toString().replace(/\//g, "%2F") : e
        }

        function r(e) {
            return null != e ? e.toString().replace(/%2F/g, "/") : e
        }

        function o(e) {
            return this.pattern.test(e)
        }

        function c() {
            return {strict: y, caseInsensitive: m}
        }

        function l(e) {
            return P(e) || B(e) && P(e[e.length - 1])
        }

        function u() {
            for (; S.length;) {
                var e = S.shift();
                if (e.pattern)throw new Error("You cannot override a type's .pattern at runtime.");
                t.extend(b[e.name], h.invoke(e.def))
            }
        }

        function f(e) {
            L(this, e || {})
        }

        H = this;
        var h, m = !1, y = !0, w = !1, b = {}, _ = !0, S = [], x = {
            string: {
                encode: e,
                decode: r,
                is: o,
                pattern: /[^\/]*/
            },
            "int": {
                encode: e, decode: function (e) {
                    return parseInt(e, 10)
                }, is: function (e) {
                    return I(e) && this.decode(e.toString()) === e
                }, pattern: /\d+/
            },
            bool: {
                encode: function (e) {
                    return e ? 1 : 0
                }, decode: function (e) {
                    return 0 !== parseInt(e, 10)
                }, is: function (e) {
                    return e === !0 || e === !1
                }, pattern: /0|1/
            },
            date: {
                encode: function (e) {
                    return this.is(e) ? [e.getFullYear(), ("0" + (e.getMonth() + 1)).slice(-2), ("0" + e.getDate()).slice(-2)].join("-") : n
                },
                decode: function (e) {
                    if (this.is(e))return e;
                    var t = this.capture.exec(e);
                    return t ? new Date(t[1], t[2] - 1, t[3]) : n
                },
                is: function (e) {
                    return e instanceof Date && !isNaN(e.valueOf())
                },
                equals: function (e, t) {
                    return this.is(e) && this.is(t) && e.toISOString() === t.toISOString()
                },
                pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
            },
            json: {encode: t.toJson, decode: t.fromJson, is: t.isObject, equals: t.equals, pattern: /[^\/]*/},
            any: {encode: t.identity, decode: t.identity, is: t.identity, equals: t.equals, pattern: /.*/}
        };
        $.$$getDefaultValue = function (e) {
            if (!l(e.value))return e.value;
            if (!h)throw new Error("Injectable functions cannot be called at configuration time");
            return h.invoke(e.value)
        }, this.caseInsensitive = function (e) {
            return I(e) && (m = e), m
        }, this.strictMode = function (e) {
            return I(e) && (y = e), y
        }, this.defaultSquashPolicy = function (e) {
            if (!I(e))return w;
            if (e !== !0 && e !== !1 && !O(e))throw new Error("Invalid squash policy: " + e + ". Valid policies: false, true, arbitrary-string");
            return w = e, e
        }, this.compile = function (e, t) {
            return new v(e, L(c(), t))
        }, this.isMatcher = function (e) {
            if (!N(e))return !1;
            var t = !0;
            return V(v.prototype, function (n, i) {
                P(n) && (t = t && I(e[i]) && P(e[i]))
            }), t
        }, this.type = function (e, t, n) {
            if (!I(t))return b[e];
            if (b.hasOwnProperty(e))throw new Error("A type named '" + e + "' has already been defined.");
            return b[e] = new g(L({name: e}, t)), n && (S.push({name: e, def: n}), _ || u()), this
        }, V(x, function (e, t) {
            b[t] = new g(L({name: t}, e))
        }), b = i(b, {}), this.$get = ["$injector", function (e) {
            return h = e, _ = !1, u(), V(x, function (e, t) {
                b[t] || (b[t] = new g(e))
            }), this
        }], this.Param = function (e, t, i, r) {
            function o(e) {
                var t = N(e) ? a(e) : [], n = s(t, "value") === -1 && s(t, "type") === -1 && s(t, "squash") === -1 && s(t, "array") === -1;
                return n && (e = {value: e}), e.$$fn = l(e.value) ? e.value : function () {
                    return e.value
                }, e
            }

            function c(t, n, i) {
                if (t.type && n)throw new Error("Param '" + e + "' has two type configurations.");
                return n ? n : t.type ? t.type instanceof g ? t.type : new g(t.type) : "config" === i ? b.any : b.string
            }

            function u() {
                var t = {array: "search" === r && "auto"}, n = e.match(/\[\]$/) ? {array: !0} : {};
                return L(t, n, i).array
            }

            function f(e, t) {
                var n = e.squash;
                if (!t || n === !1)return !1;
                if (!I(n) || null == n)return w;
                if (n === !0 || O(n))return n;
                throw new Error("Invalid squash policy: '" + n + "'. Valid policies: false, true, or arbitrary string")
            }

            function m(e, t, i, r) {
                var o, a, c = [{from: "", to: i || t ? n : ""}, {from: null, to: i || t ? n : ""}];
                return o = B(e.replace) ? e.replace : [], O(r) && o.push({from: r, to: n}), a = p(o, function (e) {
                    return e.from
                }), d(c, function (e) {
                    return s(a, e.from) === -1
                }).concat(o)
            }

            function v() {
                if (!h)throw new Error("Injectable functions cannot be called at configuration time");
                return h.invoke(i.$$fn)
            }

            function $(e) {
                function t(e) {
                    return function (t) {
                        return t.from === e
                    }
                }

                function n(e) {
                    var n = p(d(_.replace, t(e)), function (e) {
                        return e.to
                    });
                    return n.length ? n[0] : e
                }

                return e = n(e), I(e) ? _.type.decode(e) : v()
            }

            function y() {
                return "{Param:" + e + " " + t + " squash: '" + T + "' optional: " + x + "}"
            }

            var _ = this;
            i = o(i), t = c(i, t, r);
            var S = u();
            t = S ? t.$asArray(S, "search" === r) : t, "string" !== t.name || S || "path" !== r || i.value !== n || (i.value = "");
            var x = i.value !== n, T = f(i, x), E = m(i, S, x, T);
            L(this, {
                id: e,
                type: t,
                location: r,
                array: S,
                squash: T,
                replace: E,
                isOptional: x,
                value: $,
                dynamic: n,
                config: i,
                toString: y
            })
        }, f.prototype = {
            $$new: function () {
                return i(this, L(new f, {$$parent: this}))
            }, $$keys: function () {
                for (var e = [], t = [], n = this, i = a(f.prototype); n;)t.push(n), n = n.$$parent;
                return t.reverse(), V(t, function (t) {
                    V(a(t), function (t) {
                        s(e, t) === -1 && s(i, t) === -1 && e.push(t)
                    })
                }), e
            }, $$values: function (e) {
                var t = {}, n = this;
                return V(n.$$keys(), function (i) {
                    t[i] = n[i].value(e && e[i])
                }), t
            }, $$equals: function (e, t) {
                var n = !0, i = this;
                return V(i.$$keys(), function (r) {
                    var o = e && e[r], a = t && t[r];
                    i[r].type.equals(o, a) || (n = !1)
                }), n
            }, $$validates: function (e) {
                var t, n, i, r = !0, o = this;
                return V(this.$$keys(), function (a) {
                    i = o[a], n = e[a], t = !n && i.isOptional, r = r && (t || !!i.type.is(n))
                }), r
            }, $$parent: n
        }, this.ParamSet = f
    }

    function y(e, i) {
        function r(e) {
            var t = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(e.source);
            return null != t ? t[1].replace(/\\(.)/g, "$1") : ""
        }

        function o(e, t) {
            return e.replace(/\$(\$|\d{1,2})/, function (e, n) {
                return t["$" === n ? 0 : Number(n)]
            })
        }

        function a(e, t, n) {
            if (!n)return !1;
            var i = e.invoke(t, t, {$match: n});
            return !I(i) || i
        }

        function s(i, r, o, a) {
            function s(e, t, n) {
                return "/" === m ? e : t ? m.slice(0, -1) + e : n ? m.slice(1) + e : e
            }

            function d(e) {
                function t(e) {
                    var t = e(o, i);
                    return !!t && (O(t) && i.replace().url(t), !0)
                }

                if (!e || !e.defaultPrevented) {
                    var r = h && i.url() === h;
                    if (h = n, r)return !0;
                    var a, s = l.length;
                    for (a = 0; a < s; a++)if (t(l[a]))return;
                    u && t(u)
                }
            }

            function p() {
                return c = c || r.$on("$locationChangeSuccess", d)
            }

            var h, m = a.baseHref(), v = i.url();
            return f || p(), {
                sync: function () {
                    d()
                }, listen: function () {
                    return p()
                }, update: function (e) {
                    return e ? void(v = i.url()) : void(i.url() !== v && (i.url(v), i.replace()))
                }, push: function (e, t, r) {
                    i.url(e.format(t || {})), h = r && r.$$avoidResync ? i.url() : n, r && r.replace && i.replace()
                }, href: function (n, r, o) {
                    if (!n.validates(r))return null;
                    var a = e.html5Mode();
                    t.isObject(a) && (a = a.enabled);
                    var c = n.format(r);
                    if (o = o || {}, a || null === c || (c = "#" + e.hashPrefix() + c), c = s(c, a, o.absolute), !o.absolute || !c)return c;
                    var l = !a && c ? "/" : "", u = i.port();
                    return u = 80 === u || 443 === u ? "" : ":" + u, [i.protocol(), "://", i.host(), u, l, c].join("")
                }
            }
        }

        var c, l = [], u = null, f = !1;
        this.rule = function (e) {
            if (!P(e))throw new Error("'rule' must be a function");
            return l.push(e), this
        }, this.otherwise = function (e) {
            if (O(e)) {
                var t = e;
                e = function () {
                    return t
                }
            } else if (!P(e))throw new Error("'rule' must be a function");
            return u = e, this
        }, this.when = function (e, t) {
            var n, s = O(t);
            if (O(e) && (e = i.compile(e)), !s && !P(t) && !B(t))throw new Error("invalid 'handler' in when()");
            var c = {
                matcher: function (e, t) {
                    return s && (n = i.compile(t), t = ["$match", function (e) {
                        return n.format(e)
                    }]), L(function (n, i) {
                        return a(n, t, e.exec(i.path(), i.search()))
                    }, {prefix: O(e.prefix) ? e.prefix : ""})
                }, regex: function (e, t) {
                    if (e.global || e.sticky)throw new Error("when() RegExp must not be global or sticky");
                    return s && (n = t, t = ["$match", function (e) {
                        return o(n, e)
                    }]), L(function (n, i) {
                        return a(n, t, e.exec(i.path()))
                    }, {prefix: r(e)})
                }
            }, l = {matcher: i.isMatcher(e), regex: e instanceof RegExp};
            for (var u in l)if (l[u])return this.rule(c[u](e, t));
            throw new Error("invalid 'what' in when()")
        }, this.deferIntercept = function (e) {
            e === n && (e = !0), f = e
        }, this.$get = s, s.$inject = ["$location", "$rootScope", "$injector", "$browser"]
    }

    function w(e, r) {
        function o(e) {
            return 0 === e.indexOf(".") || 0 === e.indexOf("^")
        }

        function f(e, t) {
            if (!e)return n;
            var i = O(e), r = i ? e : e.name, a = o(r);
            if (a) {
                if (!t)throw new Error("No reference point given for path '" + r + "'");
                t = f(t);
                for (var s = r.split("."), c = 0, l = s.length, u = t; c < l; c++)if ("" !== s[c] || 0 !== c) {
                    if ("^" !== s[c])break;
                    if (!u.parent)throw new Error("Path '" + r + "' not valid for state '" + t.name + "'");
                    u = u.parent
                } else u = t;
                s = s.slice(c).join("."), r = u.name + (u.name && s ? "." : "") + s
            }
            var d = x[r];
            return !d || !i && (i || d !== e && d.self !== e) ? n : d
        }

        function d(e, t) {
            T[e] || (T[e] = []), T[e].push(t)
        }

        function h(e) {
            for (var t = T[e] || []; t.length;)m(t.shift())
        }

        function m(t) {
            t = i(t, {
                self: t, resolve: t.resolve || {}, toString: function () {
                    return this.name
                }
            });
            var n = t.name;
            if (!O(n) || n.indexOf("@") >= 0)throw new Error("State must have a valid name");
            if (x.hasOwnProperty(n))throw new Error("State '" + n + "'' is already defined");
            var r = n.indexOf(".") !== -1 ? n.substring(0, n.lastIndexOf(".")) : O(t.parent) ? t.parent : N(t.parent) && O(t.parent.name) ? t.parent.name : "";
            if (r && !x[r])return d(r, t.self);
            for (var o in C)P(C[o]) && (t[o] = C[o](t, C.$delegates[o]));
            return x[n] = t, !t[E] && t.url && e.when(t.url, ["$match", "$stateParams", function (e, n) {
                S.$current.navigable == t && l(e, n) || S.transitionTo(t, e, {inherit: !0, location: !1})
            }]), h(n), t
        }

        function v(e) {
            return e.indexOf("*") > -1
        }

        function g(e) {
            var t = e.split("."), n = S.$current.name.split(".");
            if ("**" === t[0] && (n = n.slice(s(n, t[1])), n.unshift("**")), "**" === t[t.length - 1] && (n.splice(s(n, t[t.length - 2]) + 1, Number.MAX_VALUE), n.push("**")), t.length != n.length)return !1;
            for (var i = 0, r = t.length; i < r; i++)"*" === t[i] && (n[i] = "*");
            return n.join("") === t.join("")
        }

        function $(e, t) {
            return O(e) && !I(t) ? C[e] : P(t) && O(e) ? (C[e] && !C.$delegates[e] && (C.$delegates[e] = C[e]), C[e] = t, this) : this
        }

        function y(e, t) {
            return N(e) ? t = e : t.name = e, m(t), this
        }

        function w(e, r, o, s, d, h, m, $, y) {
            function w(t, n, i, o) {
                var a = e.$broadcast("$stateNotFound", t, n, i);
                if (a.defaultPrevented)return m.update(), A;
                if (!a.retry)return null;
                if (o.$retry)return m.update(), M;
                var s = S.transition = r.when(a.retry);
                return s.then(function () {
                    return s !== S.transition ? C : (t.options.$retry = !0, S.transitionTo(t.to, t.toParams, t.options))
                }, function () {
                    return A
                }), m.update(), s
            }

            function T(e, n, i, a, c, l) {
                var f = i ? n : u(e.params.$$keys(), n), p = {$stateParams: f};
                c.resolve = d.resolve(e.resolve, p, c.resolve, e);
                var h = [c.resolve.then(function (e) {
                    c.globals = e
                })];
                return a && h.push(a), V(e.views, function (n, i) {
                    var r = n.resolve && n.resolve !== e.resolve ? n.resolve : {};
                    r.$template = [function () {
                        return o.load(i, {view: n, locals: p, params: f, notify: l.notify}) || ""
                    }], h.push(d.resolve(r, p, c.resolve, e).then(function (o) {
                        if (P(n.controllerProvider) || B(n.controllerProvider)) {
                            var a = t.extend({}, r, p);
                            o.$$controller = s.invoke(n.controllerProvider, null, a)
                        } else o.$$controller = n.controller;
                        o.$$state = e, o.$$controllerAs = n.controllerAs, c[i] = o
                    }))
                }), r.all(h).then(function (e) {
                    return c
                })
            }

            var C = r.reject(new Error("transition superseded")), k = r.reject(new Error("transition prevented")), A = r.reject(new Error("transition aborted")), M = r.reject(new Error("transition failed"));
            return _.locals = {resolve: null, globals: {$stateParams: {}}}, S = {
                params: {},
                current: _.self,
                $current: _,
                transition: null
            }, S.reload = function () {
                return S.transitionTo(S.current, h, {reload: !0, inherit: !1, notify: !0})
            }, S.go = function (e, t, n) {
                return S.transitionTo(e, t, L({inherit: !0, relative: S.$current}, n))
            }, S.transitionTo = function (t, n, o) {
                n = n || {}, o = L({
                    location: !0,
                    inherit: !1,
                    relative: null,
                    notify: !0,
                    reload: !1,
                    $retry: !1
                }, o || {});
                var a, l = S.$current, d = S.params, p = l.path, v = f(t, o.relative);
                if (!I(v)) {
                    var g = {to: t, toParams: n, options: o}, $ = w(g, l.self, d, o);
                    if ($)return $;
                    if (t = g.to, n = g.toParams, o = g.options, v = f(t, o.relative), !I(v)) {
                        if (!o.relative)throw new Error("No such state '" + t + "'");
                        throw new Error("Could not resolve '" + t + "' from state '" + o.relative + "'")
                    }
                }
                if (v[E])throw new Error("Cannot transition to abstract state '" + t + "'");
                if (o.inherit && (n = c(h, n || {}, S.$current, v)), !v.params.$$validates(n))return M;
                n = v.params.$$values(n), t = v;
                var y = t.path, x = 0, A = y[x], D = _.locals, P = [];
                if (!o.reload)for (; A && A === p[x] && A.ownParams.$$equals(n, d);)D = P[x] = A.locals, x++, A = y[x];
                if (b(t, l, D, o))return t.self.reloadOnSearch !== !1 && m.update(), S.transition = null, r.when(S.current);
                if (n = u(t.params.$$keys(), n || {}), o.notify && e.$broadcast("$stateChangeStart", t.self, n, l.self, d).defaultPrevented)return m.update(), k;
                for (var O = r.when(D), N = x; N < y.length; N++, A = y[N])D = P[N] = i(D), O = T(A, n, A === t, O, D, o);
                var B = S.transition = O.then(function () {
                    var i, r, a;
                    if (S.transition !== B)return C;
                    for (i = p.length - 1; i >= x; i--)a = p[i], a.self.onExit && s.invoke(a.self.onExit, a.self, a.locals.globals), a.locals = null;
                    for (i = x; i < y.length; i++)r = y[i], r.locals = P[i], r.self.onEnter && s.invoke(r.self.onEnter, r.self, r.locals.globals);
                    return S.transition !== B ? C : (S.$current = t, S.current = t.self, S.params = n, R(S.params, h), S.transition = null, o.location && t.navigable && m.push(t.navigable.url, t.navigable.locals.globals.$stateParams, {
                        $$avoidResync: !0,
                        replace: "replace" === o.location
                    }), o.notify && e.$broadcast("$stateChangeSuccess", t.self, n, l.self, d), m.update(!0), S.current)
                }, function (i) {
                    return S.transition !== B ? C : (S.transition = null, a = e.$broadcast("$stateChangeError", t.self, n, l.self, d, i), a.defaultPrevented || m.update(), r.reject(i))
                });
                return B
            }, S.is = function (e, t, i) {
                i = L({relative: S.$current}, i || {});
                var r = f(e, i.relative);
                return I(r) ? S.$current === r && (!t || l(r.params.$$values(t), h)) : n
            }, S.includes = function (e, t, i) {
                if (i = L({relative: S.$current}, i || {}), O(e) && v(e)) {
                    if (!g(e))return !1;
                    e = S.$current.name
                }
                var r = f(e, i.relative);
                return I(r) ? !!I(S.$current.includes[r.name]) && (!t || l(r.params.$$values(t), h, a(t))) : n
            }, S.href = function (e, t, i) {
                i = L({lossy: !0, inherit: !0, absolute: !1, relative: S.$current}, i || {});
                var r = f(e, i.relative);
                if (!I(r))return null;
                i.inherit && (t = c(h, t || {}, S.$current, r));
                var o = r && i.lossy ? r.navigable : r;
                return o && o.url !== n && null !== o.url ? m.href(o.url, u(r.params.$$keys(), t || {}), {absolute: i.absolute}) : null
            }, S.get = function (e, t) {
                if (0 === arguments.length)return p(a(x), function (e) {
                    return x[e].self
                });
                var n = f(e, t || S.$current);
                return n && n.self ? n.self : null
            }, S
        }

        function b(e, t, n, i) {
            if (e === t && (n === t.locals && !i.reload || e.self.reloadOnSearch === !1))return !0
        }

        var _, S, x = {}, T = {}, E = "abstract", C = {
            parent: function (e) {
                if (I(e.parent) && e.parent)return f(e.parent);
                var t = /^(.+)\.[^.]+$/.exec(e.name);
                return t ? f(t[1]) : _
            }, data: function (e) {
                return e.parent && e.parent.data && (e.data = e.self.data = L({}, e.parent.data, e.data)), e.data
            }, url: function (e) {
                var t = e.url, n = {params: e.params || {}};
                if (O(t))return "^" == t.charAt(0) ? r.compile(t.substring(1), n) : (e.parent.navigable || _).url.concat(t, n);
                if (!t || r.isMatcher(t))return t;
                throw new Error("Invalid url '" + t + "' in state '" + e + "'")
            }, navigable: function (e) {
                return e.url ? e : e.parent ? e.parent.navigable : null
            }, ownParams: function (e) {
                var t = e.url && e.url.params || new H.ParamSet;
                return V(e.params || {}, function (e, n) {
                    t[n] || (t[n] = new H.Param(n, null, e, "config"))
                }), t
            }, params: function (e) {
                return e.parent && e.parent.params ? L(e.parent.params.$$new(), e.ownParams) : new H.ParamSet
            }, views: function (e) {
                var t = {};
                return V(I(e.views) ? e.views : {"": e}, function (n, i) {
                    i.indexOf("@") < 0 && (i += "@" + e.parent.name), t[i] = n
                }), t
            }, path: function (e) {
                return e.parent ? e.parent.path.concat(e) : []
            }, includes: function (e) {
                var t = e.parent ? L({}, e.parent.includes) : {};
                return t[e.name] = !0, t
            }, $delegates: {}
        };
        _ = m({
            name: "",
            url: "^",
            views: null,
            "abstract": !0
        }), _.navigable = null, this.decorator = $, this.state = y, this.$get = w, w.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory"]
    }

    function b() {
        function e(e, t) {
            return {
                load: function (n, i) {
                    var r, o = {
                        template: null,
                        controller: null,
                        view: null,
                        locals: null,
                        notify: !0,
                        async: !0,
                        params: {}
                    };
                    return i = L(o, i), i.view && (r = t.fromConfig(i.view, i.params, i.locals)), r && i.notify && e.$broadcast("$viewContentLoading", i), r
                }
            }
        }

        this.$get = e, e.$inject = ["$rootScope", "$templateFactory"]
    }

    function _() {
        var e = !1;
        this.useAnchorScroll = function () {
            e = !0
        }, this.$get = ["$anchorScroll", "$timeout", function (t, n) {
            return e ? t : function (e) {
                n(function () {
                    e[0].scrollIntoView()
                }, 0, !1)
            }
        }]
    }

    function S(e, n, i, r) {
        function o() {
            return n.has ? function (e) {
                return n.has(e) ? n.get(e) : null
            } : function (e) {
                try {
                    return n.get(e)
                } catch (t) {
                    return null
                }
            }
        }

        function a(e, t) {
            var n = function () {
                return {
                    enter: function (e, t, n) {
                        t.after(e), n()
                    }, leave: function (e, t) {
                        e.remove(), t()
                    }
                }
            };
            if (l)return {
                enter: function (e, t, n) {
                    var i = l.enter(e, null, t, n);
                    i && i.then && i.then(n)
                }, leave: function (e, t) {
                    var n = l.leave(e, t);
                    n && n.then && n.then(t)
                }
            };
            if (c) {
                var i = c && c(t, e);
                return {
                    enter: function (e, t, n) {
                        i.enter(e, null, t), n()
                    }, leave: function (e, t) {
                        i.leave(e), t()
                    }
                }
            }
            return n()
        }

        var s = o(), c = s("$animator"), l = s("$animate"), u = {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            compile: function (n, o, s) {
                return function (n, o, c) {
                    function l() {
                        f && (f.remove(), f = null), p && (p.$destroy(), p = null), d && (g.leave(d, function () {
                            f = null
                        }), f = d, d = null)
                    }

                    function u(a) {
                        var u, f = T(n, c, o, r), $ = f && e.$current && e.$current.locals[f];
                        if (a || $ !== h) {
                            u = n.$new(), h = e.$current.locals[f];
                            var y = s(u, function (e) {
                                g.enter(e, o, function () {
                                    p && p.$emit("$viewContentAnimationEnded"), (t.isDefined(v) && !v || n.$eval(v)) && i(e)
                                }), l()
                            });
                            d = y, p = u, p.$emit("$viewContentLoaded"), p.$eval(m)
                        }
                    }

                    var f, d, p, h, m = c.onload || "", v = c.autoscroll, g = a(c, n);
                    n.$on("$stateChangeSuccess", function () {
                        u(!1)
                    }), n.$on("$viewContentLoading", function () {
                        u(!1)
                    }), u(!0)
                }
            }
        };
        return u
    }

    function x(e, t, n, i) {
        return {
            restrict: "ECA", priority: -400, compile: function (r) {
                var o = r.html();
                return function (r, a, s) {
                    var c = n.$current, l = T(r, s, a, i), u = c && c.locals[l];
                    if (u) {
                        a.data("$uiView", {name: l, state: u.$$state}), a.html(u.$template ? u.$template : o);
                        var f = e(a.contents());
                        if (u.$$controller) {
                            u.$scope = r;
                            var d = t(u.$$controller, u);
                            u.$$controllerAs && (r[u.$$controllerAs] = d), a.data("$ngControllerController", d), a.children().data("$ngControllerController", d)
                        }
                        f(r)
                    }
                }
            }
        }
    }

    function T(e, t, n, i) {
        var r = i(t.uiView || t.name || "")(e), o = n.inheritedData("$uiView");
        return r.indexOf("@") >= 0 ? r : r + "@" + (o ? o.state.name : "")
    }

    function E(e, t) {
        var n, i = e.match(/^\s*({[^}]*})\s*$/);
        if (i && (e = t + "(" + i[1] + ")"), n = e.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !n || 4 !== n.length)throw new Error("Invalid state ref '" + e + "'");
        return {state: n[1], paramExpr: n[3] || null}
    }

    function C(e) {
        var t = e.parent().inheritedData("$uiView");
        if (t && t.state && t.state.name)return t.state
    }

    function k(e, n) {
        var i = ["location", "inherit", "reload"];
        return {
            restrict: "A", require: ["?^uiSrefActive", "?^uiSrefActiveEq"], link: function (r, o, a, s) {
                var c = E(a.uiSref, e.current.name), l = null, u = C(o) || e.$current, f = null, d = "A" === o.prop("tagName"), p = "FORM" === o[0].nodeName, h = p ? "action" : "href", m = !0, v = {
                    relative: u,
                    inherit: !0
                }, g = r.$eval(a.uiSrefOpts) || {};
                t.forEach(i, function (e) {
                    e in g && (v[e] = g[e])
                });
                var $ = function (n) {
                    if (n && (l = t.copy(n)), m) {
                        f = e.href(c.state, l, v);
                        var i = s[1] || s[0];
                        return i && i.$$setStateInfo(c.state, l), null === f ? (m = !1, !1) : void a.$set(h, f)
                    }
                };
                c.paramExpr && (r.$watch(c.paramExpr, function (e, t) {
                    e !== l && $(e)
                }, !0), l = t.copy(r.$eval(c.paramExpr))), $(), p || o.bind("click", function (t) {
                    var i = t.which || t.button;
                    if (!(i > 1 || t.ctrlKey || t.metaKey || t.shiftKey || o.attr("target"))) {
                        var r = n(function () {
                            e.go(c.state, l, v)
                        });
                        t.preventDefault();
                        var a = d && !f ? 1 : 0;
                        t.preventDefault = function () {
                            a-- <= 0 && n.cancel(r)
                        }
                    }
                })
            }
        }
    }

    function A(e, t, n) {
        return {
            restrict: "A", controller: ["$scope", "$element", "$attrs", function (t, i, r) {
                function o() {
                    a() ? i.addClass(l) : i.removeClass(l)
                }

                function a() {
                    return "undefined" != typeof r.uiSrefActiveEq ? s && e.is(s.name, c) : s && e.includes(s.name, c)
                }

                var s, c, l;
                l = n(r.uiSrefActiveEq || r.uiSrefActive || "", !1)(t), this.$$setStateInfo = function (t, n) {
                    s = e.get(t, C(i)), c = n, o()
                }, t.$on("$stateChangeSuccess", o)
            }]
        }
    }

    function M(e) {
        var t = function (t) {
            return e.is(t)
        };
        return t.$stateful = !0, t
    }

    function D(e) {
        var t = function (t) {
            return e.includes(t)
        };
        return t.$stateful = !0, t
    }

    var I = t.isDefined, P = t.isFunction, O = t.isString, N = t.isObject, B = t.isArray, V = t.forEach, L = t.extend, R = t.copy;
    t.module("ui.router.util", ["ng"]), t.module("ui.router.router", ["ui.router.util"]), t.module("ui.router.state", ["ui.router.router", "ui.router.util"]), t.module("ui.router", ["ui.router.state"]), t.module("ui.router.compat", ["ui.router"]), h.$inject = ["$q", "$injector"], t.module("ui.router.util").service("$resolve", h), m.$inject = ["$http", "$templateCache", "$injector"], t.module("ui.router.util").service("$templateFactory", m);
    var H;
    v.prototype.concat = function (e, t) {
        var n = {caseInsensitive: H.caseInsensitive(), strict: H.strictMode(), squash: H.defaultSquashPolicy()};
        return new v(this.sourcePath + e + this.sourceSearch, L(n, t), this)
    }, v.prototype.toString = function () {
        return this.source
    }, v.prototype.exec = function (e, t) {
        function n(e) {
            function t(e) {
                return e.split("").reverse().join("")
            }

            function n(e) {
                return e.replace(/\\-/, "-")
            }

            var i = t(e).split(/-(?!\\)/), r = p(i, t);
            return p(r, n).reverse()
        }

        var i = this.regexp.exec(e);
        if (!i)return null;
        t = t || {};
        var r, o, a, s = this.parameters(), c = s.length, l = this.segments.length - 1, u = {};
        if (l !== i.length - 1)throw new Error("Unbalanced capture group in route '" + this.source + "'");
        for (r = 0; r < l; r++) {
            a = s[r];
            var f = this.params[a], d = i[r + 1];
            for (o = 0; o < f.replace; o++)f.replace[o].from === d && (d = f.replace[o].to);
            d && f.array === !0 && (d = n(d)), u[a] = f.value(d)
        }
        for (; r < c; r++)a = s[r], u[a] = this.params[a].value(t[a]);
        return u
    }, v.prototype.parameters = function (e) {
        return I(e) ? this.params[e] || null : this.$$paramNames
    }, v.prototype.validates = function (e) {
        return this.params.$$validates(e)
    }, v.prototype.format = function (e) {
        function t(e) {
            return encodeURIComponent(e).replace(/-/g, function (e) {
                return "%5C%" + e.charCodeAt(0).toString(16).toUpperCase()
            })
        }

        e = e || {};
        var n = this.segments, i = this.parameters(), r = this.params;
        if (!this.validates(e))return null;
        var o, a = !1, s = n.length - 1, c = i.length, l = n[0];
        for (o = 0; o < c; o++) {
            var u = o < s, f = i[o], d = r[f], h = d.value(e[f]), m = d.isOptional && d.type.equals(d.value(), h), v = !!m && d.squash, g = d.type.encode(h);
            if (u) {
                var $ = n[o + 1];
                if (v === !1)null != g && (l += B(g) ? p(g, t).join("-") : encodeURIComponent(g)), l += $; else if (v === !0) {
                    var y = l.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
                    l += $.match(y)[1]
                } else O(v) && (l += v + $)
            } else {
                if (null == g || m && v !== !1)continue;
                B(g) || (g = [g]), g = p(g, encodeURIComponent).join("&" + f + "="), l += (a ? "&" : "?") + (f + "=" + g), a = !0
            }
        }
        return l
    }, g.prototype.is = function (e, t) {
        return !0
    }, g.prototype.encode = function (e, t) {
        return e
    }, g.prototype.decode = function (e, t) {
        return e
    }, g.prototype.equals = function (e, t) {
        return e == t
    }, g.prototype.$subPattern = function () {
        var e = this.pattern.toString();
        return e.substr(1, e.length - 2)
    }, g.prototype.pattern = /.*/, g.prototype.toString = function () {
        return "{Type:" + this.name + "}"
    }, g.prototype.$asArray = function (e, t) {
        function i(e, t) {
            function i(e, t) {
                return function () {
                    return e[t].apply(e, arguments)
                }
            }

            function r(e) {
                return B(e) ? e : I(e) ? [e] : []
            }

            function o(e) {
                switch (e.length) {
                    case 0:
                        return n;
                    case 1:
                        return "auto" === t ? e[0] : e;
                    default:
                        return e
                }
            }

            function a(e) {
                return !e
            }

            function s(e, t) {
                return function (n) {
                    n = r(n);
                    var i = p(n, e);
                    return t === !0 ? 0 === d(i, a).length : o(i)
                }
            }

            function c(e) {
                return function (t, n) {
                    var i = r(t), o = r(n);
                    if (i.length !== o.length)return !1;
                    for (var a = 0; a < i.length; a++)if (!e(i[a], o[a]))return !1;
                    return !0
                }
            }

            this.encode = s(i(e, "encode")), this.decode = s(i(e, "decode")), this.is = s(i(e, "is"), !0), this.equals = c(i(e, "equals")), this.pattern = e.pattern, this.$arrayMode = t
        }

        if (!e)return this;
        if ("auto" === e && !t)throw new Error("'auto' array mode is for query parameters only");
        return new i(this, e)
    }, t.module("ui.router.util").provider("$urlMatcherFactory", $), t.module("ui.router.util").run(["$urlMatcherFactory", function (e) {
    }]), y.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], t.module("ui.router.router").provider("$urlRouter", y), w.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], t.module("ui.router.state").value("$stateParams", {}).provider("$state", w), b.$inject = [], t.module("ui.router.state").provider("$view", b), t.module("ui.router.state").provider("$uiViewScroll", _), S.$inject = ["$state", "$injector", "$uiViewScroll", "$interpolate"], x.$inject = ["$compile", "$controller", "$state", "$interpolate"], t.module("ui.router.state").directive("uiView", S), t.module("ui.router.state").directive("uiView", x), k.$inject = ["$state", "$timeout"], A.$inject = ["$state", "$stateParams", "$interpolate"], t.module("ui.router.state").directive("uiSref", k).directive("uiSrefActive", A).directive("uiSrefActiveEq", A), M.$inject = ["$state"], D.$inject = ["$state"], t.module("ui.router.state").filter("isState", M).filter("includedByState", D)
}(window, window.angular), function () {
    function e(e, t, n, i, r, o) {
        function a(i, a, s, c, l) {
            function f() {
                L.resizeRequiresRefresh(y.__clientWidth, y.__clientHeight) && v()
            }

            function d() {
                var e;
                return e = {
                    dataLength: 0, width: 0, height: 0, resizeRequiresRefresh: function (t, n) {
                        var i = e.dataLength && t && n && (t !== e.width || n !== e.height);
                        return e.width = t, e.height = n, !!i
                    }, dataChangeRequiresRefresh: function (t) {
                        var n = t.length > 0 || t.length < e.dataLength;
                        return e.dataLength = t.length, !!n
                    }
                }
            }

            function p() {
                return T || (T = new e({
                        afterItemsNode: V[0],
                        containerNode: b,
                        heightData: A,
                        widthData: M,
                        forceRefreshImages: !(!u(s.forceRefreshImages) || "false" === s.forceRefreshImages),
                        keyExpression: E,
                        renderBuffer: O,
                        scope: i,
                        scrollView: c.scrollView,
                        transclude: l
                    }))
            }

            function h() {
                var e = angular.element(y.__content.querySelector(".collection-repeat-after-container"));
                if (!e.length) {
                    var t = !1, n = [].filter.call(y.__content.childNodes, function (e) {
                        return ionic.DomUtil.contains(e, b) ? (t = !0, !1) : t
                    });
                    e = angular.element('<span class="collection-repeat-after-container">'), y.options.scrollingX && e.addClass("horizontal"), e.append(n), y.__content.appendChild(e[0])
                }
                return e
            }

            function m() {
                N ? g(N, A) : A.computed = !0, B ? g(B, M) : M.computed = !0
            }

            function v() {
                var e = I.length > 0;
                if (e && (A.computed || M.computed) && $(), e && A.computed) {
                    if (A.value = D.height, !A.value)throw new Error('collection-repeat tried to compute the height of repeated elements "' + S + '", but was unable to. Please provide the "item-height" attribute. http://ionicframework.com/docs/api/directive/collectionRepeat/')
                } else!A.dynamic && A.getValue && (A.value = A.getValue());
                if (e && M.computed) {
                    if (M.value = D.width, !M.value)throw new Error('collection-repeat tried to compute the width of repeated elements "' + S + '", but was unable to. Please provide the "item-width" attribute. http://ionicframework.com/docs/api/directive/collectionRepeat/')
                } else!M.dynamic && M.getValue && (M.value = M.getValue());
                p().refreshLayout()
            }

            function g(e, n) {
                if (e) {
                    var i;
                    try {
                        i = t(e)
                    } catch (r) {
                        e.trim().match(/\d+(px|%)$/) && (e = '"' + e + '"'), i = t(e)
                    }
                    var o = e.replace(/(\'|\"|px|%)/g, "").trim(), a = o.length && !/([a-zA-Z]|\$|:|\?)/.test(o);
                    if (n.attrValue = e, a) {
                        var s = parseInt(i());
                        if (e.indexOf("%") > -1) {
                            var c = s / 100;
                            n.getValue = n === A ? function () {
                                return Math.floor(c * y.__clientHeight)
                            } : function () {
                                return Math.floor(c * y.__clientWidth)
                            }
                        } else n.value = s
                    } else n.dynamic = !0, n.getValue = n === A ? function (e, t) {
                        var n = i(e, t);
                        return n.charAt && "%" === n.charAt(n.length - 1) ? Math.floor(parseInt(n) / 100 * y.__clientHeight) : parseInt(n)
                    } : function (e, t) {
                        var n = i(e, t);
                        return n.charAt && "%" === n.charAt(n.length - 1) ? Math.floor(parseInt(n) / 100 * y.__clientWidth) : parseInt(n)
                    }
                }
            }

            function $() {
                H || l(z = i.$new(), function (e) {
                    e[0].removeAttribute("collection-repeat"), H = e[0]
                }), z[E] = (k(i) || [])[0], r.$$phase || z.$digest(), b.appendChild(H);
                var e = n.getComputedStyle(H);
                D.width = parseInt(e.width), D.height = parseInt(e.height), b.removeChild(H)
            }

            var y = c.scrollView, w = a[0], b = angular.element('<div class="collection-repeat-container">')[0];
            if (w.parentNode.replaceChild(b, w), y.options.scrollingX && y.options.scrollingY)throw new Error("collection-repeat expected a parent x or y scrollView, not an xy scrollView.");
            var S = s.collectionRepeat, x = S.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
            if (!x)throw new Error("collection-repeat expected expression in form of '_item_ in _collection_[ track by _id_]' but got '" + s.collectionRepeat + "'.");
            var T, E = x[1], C = x[2], k = t(C), A = {}, M = {}, D = {}, I = [], P = s.itemRenderBuffer || s.collectionBufferSize, O = angular.isDefined(P) ? parseInt(P) : _, N = s.itemHeight || s.collectionItemHeight, B = s.itemWidth || s.collectionItemWidth, V = h(), L = d();
            m(), c.$element.on("scroll-resize", v), angular.element(n).on("resize", f);
            var R = r.$on("$ionicExposeAside", ionic.animationFrameThrottle(function () {
                c.scrollView.resize(), f()
            }));
            o(v, 0, !1), i.$watchCollection(k, function (e) {
                if (I = e || (e = []), !angular.isArray(e))throw new Error("collection-repeat expected an array for '" + C + "', but got a " + typeof value);
                i.$$postDigest(function () {
                    p().setData(I), L.dataChangeRequiresRefresh(I) && v()
                })
            }), i.$on("$destroy", function () {
                angular.element(n).off("resize", f), R(), c.$element && c.$element.off("scroll-resize", v), H && H.parentNode && H.parentNode.removeChild(H), z && z.$destroy(), z = H = null, T && T.destroy(), T = null
            });
            var H, z
        }

        return {restrict: "A", priority: 1e3, transclude: "element", $$tlb: !0, require: "^^$ionicScroll", link: a}
    }

    function t(e, t, n) {
        var i = {primaryPos: 0, secondaryPos: 0, primarySize: 0, secondarySize: 0, rowPrimarySize: 0};
        return function (r) {
            function o() {
                return a(!0)
            }

            function a(t) {
                if (!a.destroyed) {
                    var n, r, o, l, u, f = ee.getScrollValue(), d = f + ee.scrollPrimarySize;
                    ee.updateRenderRange(f, d), U = Math.max(0, U - T), j = Math.min(A.length - 1, j + T);
                    for (n in Q)(n < U || n > j) && (o = Q[n], delete Q[n], X.push(o), o.isShown = !1);
                    for (n = U; n <= j; n++)n >= A.length || Q[n] && !t || (o = Q[n] || (Q[n] = X.length ? X.pop() : Y.length ? Y.shift() : new c), K.push(o), o.isShown = !0, u = o.scope, u.$index = n, u[x] = A[n], u.$first = 0 === n, u.$last = n === A.length - 1, u.$middle = !(u.$first || u.$last), u.$odd = !(u.$even = 0 === (1 & n)), u.$$disconnected && ionic.Utils.reconnectScope(o.scope), l = ee.getDimensions(n), o.secondaryPos === l.secondaryPos && o.primaryPos === l.primaryPos || (o.node.style[ionic.CSS.TRANSFORM] = H.replace(L, o.primaryPos = l.primaryPos).replace(R, o.secondaryPos = l.secondaryPos)), o.secondarySize === l.secondarySize && o.primarySize === l.primarySize || (o.node.style.cssText = o.node.style.cssText.replace(b, z.replace(L, (o.primarySize = l.primarySize) + 1).replace(R, o.secondarySize = l.secondarySize))));
                    for (j === A.length - 1 && (l = ee.getDimensions(A.length - 1) || i, g.style[ionic.CSS.TRANSFORM] = H.replace(L, l.primaryPos + l.primarySize).replace(R, 0)); X.length;)o = X.pop(), o.scope.$broadcast("$collectionRepeatLeave"), ionic.Utils.disconnectScope(o.scope), Y.push(o), o.node.style[ionic.CSS.TRANSFORM] = "translate3d(-9999px,-9999px,0)", o.primaryPos = o.secondaryPos = null;
                    if (y)for (n = 0, r = K.length; n < r && (o = K[n]); n++)if (o.images)for (var p, h = 0, m = o.images.length; h < m && (p = o.images[h]); h++) {
                        var v = p.src;
                        p.src = w, p.src = v
                    }
                    if (t)for (var $ = e.$$phase; K.length;)o = K.pop(), $ || o.scope.$digest(); else s()
                }
            }

            function s() {
                var t;
                s.running || (s.running = !0, n(function () {
                    for (var n = e.$$phase; K.length;)t = K.pop(), t.isShown && (n || t.scope.$digest());
                    s.running = !1
                }))
            }

            function c() {
                var e = this;
                this.scope = E.$new(), this.id = "item" + Z++, k(this.scope, function (t) {
                    e.element = t, e.element.data("$$collectionRepeatItem", e), e.node = t[0], e.node.style[ionic.CSS.TRANSFORM] = "translate3d(-9999px,-9999px,0)", e.node.style.cssText += " height: 0px; width: 0px;", ionic.Utils.disconnectScope(e.scope), $.appendChild(e.node), e.images = t[0].getElementsByTagName("img")
                })
            }

            function l() {
                this.getItemPrimarySize = I, this.getItemSecondarySize = O, this.getScrollValue = function () {
                    return Math.max(0, Math.min(C.__scrollTop - F, C.__maxScrollTop - F - q))
                }, this.refreshDirection = function () {
                    this.scrollPrimarySize = C.__clientHeight, this.scrollSecondarySize = C.__clientWidth, this.estimatedPrimarySize = m, this.estimatedSecondarySize = v, this.estimatedItemsAcross = B && Math.floor(C.__clientWidth / v) || 1
                }
            }

            function u() {
                this.getItemPrimarySize = O, this.getItemSecondarySize = I, this.getScrollValue = function () {
                    return Math.max(0, Math.min(C.__scrollLeft - F, C.__maxScrollLeft - F - q))
                }, this.refreshDirection = function () {
                    this.scrollPrimarySize = C.__clientWidth, this.scrollSecondarySize = C.__clientHeight, this.estimatedPrimarySize = v, this.estimatedSecondarySize = m, this.estimatedItemsAcross = B && Math.floor(C.__clientHeight / m) || 1
                }
            }

            function f() {
                this.getEstimatedSecondaryPos = function (e) {
                    return e % this.estimatedItemsAcross * this.estimatedSecondarySize
                }, this.getEstimatedPrimaryPos = function (e) {
                    return Math.floor(e / this.estimatedItemsAcross) * this.estimatedPrimarySize
                }, this.getEstimatedIndex = function (e) {
                    return Math.floor(e / this.estimatedPrimarySize) * this.estimatedItemsAcross
                }
            }

            function d() {
                this.getEstimatedSecondaryPos = function () {
                    return 0
                }, this.getEstimatedPrimaryPos = function (e) {
                    return e * this.estimatedPrimarySize
                }, this.getEstimatedIndex = function (e) {
                    return Math.floor(e / this.estimatedPrimarySize)
                }
            }

            function p() {
                this.getContentSize = function () {
                    return this.getEstimatedPrimaryPos(A.length - 1) + this.estimatedPrimarySize + F + q
                };
                var e = {};
                this.getDimensions = function (t) {
                    return e.primaryPos = this.getEstimatedPrimaryPos(t), e.secondaryPos = this.getEstimatedSecondaryPos(t), e.primarySize = this.estimatedPrimarySize, e.secondarySize = this.estimatedSecondarySize, e
                }, this.updateRenderRange = function (e, t) {
                    U = Math.max(0, this.getEstimatedIndex(e)), j = Math.min(A.length - 1, this.getEstimatedIndex(t) + this.estimatedItemsAcross - 1), W = Math.max(0, this.getEstimatedPrimaryPos(U)), G = this.getEstimatedPrimaryPos(j) + this.estimatedPrimarySize
                }
            }

            function h() {
                function e(e) {
                    var t, o, a;
                    for (t = Math.max(0, n); t <= e && (a = s[t]); t++)o = s[t - 1] || i, a.primarySize = r.getItemPrimarySize(t, A[t]), a.secondarySize = r.scrollSecondarySize, a.primaryPos = o.primaryPos + o.primarySize, a.secondaryPos = 0
                }

                function t(e) {
                    var t, o, a;
                    for (t = Math.max(n, 0); t <= e && (a = s[t]); t++)o = s[t - 1] || i, a.secondarySize = Math.min(r.getItemSecondarySize(t, A[t]), r.scrollSecondarySize), a.secondaryPos = o.secondaryPos + o.secondarySize, 0 === t || a.secondaryPos + a.secondarySize > r.scrollSecondarySize ? (a.secondaryPos = 0, a.primarySize = r.getItemPrimarySize(t, A[t]), a.primaryPos = o.primaryPos + o.rowPrimarySize, a.rowStartIndex = t, a.rowPrimarySize = a.primarySize) : (a.primarySize = r.getItemPrimarySize(t, A[t]), a.primaryPos = o.primaryPos, a.rowStartIndex = o.rowStartIndex, s[a.rowStartIndex].rowPrimarySize = a.rowPrimarySize = Math.max(s[a.rowStartIndex].rowPrimarySize, a.primarySize), a.rowPrimarySize = Math.max(a.primarySize, a.rowPrimarySize))
                }

                var n, r = this, o = ionic.debounce(J, 25, !0), a = B ? t : e, s = [];
                this.getContentSize = function () {
                    var e = s[n] || i;
                    return (e.primaryPos + e.primarySize || 0) + this.getEstimatedPrimaryPos(A.length - n - 1) + F + q
                }, this.onDestroy = function () {
                    s.length = 0
                }, this.onRefreshData = function () {
                    var e, t;
                    for (e = s.length, t = A.length; e < t; e++)s.push({});
                    n = -1
                }, this.onRefreshLayout = function () {
                    n = -1
                }, this.getDimensions = function (e) {
                    return e = Math.min(e, A.length - 1), n < e && (e > .9 * A.length ? (a(A.length - 1), n = A.length - 1, J()) : (a(e), n = e, o())), s[e]
                };
                var c = -1, l = -1;
                this.updateRenderRange = function (e, t) {
                    var n, i, r;
                    if (this.getDimensions(2 * this.getEstimatedIndex(t)), c === -1 || 0 === e)n = 0; else if (e >= l)for (n = c, i = A.length; n < i && !((r = this.getDimensions(n)) && r.primaryPos + r.rowPrimarySize >= e); n++); else for (n = c; n >= 0; n--)if ((r = this.getDimensions(n)) && r.primaryPos <= e) {
                        n = B ? r.rowStartIndex : n;
                        break
                    }
                    U = Math.min(Math.max(0, n), A.length - 1), W = U !== -1 ? this.getDimensions(U).primaryPos : -1;
                    var o;
                    for (n = U + 1, i = A.length; n < i; n++)if ((r = this.getDimensions(n)) && r.primaryPos + r.rowPrimarySize > t) {
                        if (B)for (o = r; n < i - 1 && (r = this.getDimensions(n + 1)).primaryPos === o.primaryPos;)n++;
                        break
                    }
                    j = Math.min(n, A.length - 1), G = j !== -1 ? (r = this.getDimensions(j)).primaryPos + (r.rowPrimarySize || r.primarySize) : -1, l = e, c = U
                }
            }

            var m, v, g = r.afterItemsNode, $ = r.containerNode, y = r.forceRefreshImages, _ = r.heightData, S = r.widthData, x = r.keyExpression, T = r.renderBuffer, E = r.scope, C = r.scrollView, k = r.transclude, A = [], M = {}, D = _.getValue || function () {
                    return _.value
                }, I = function (e, t) {
                return M[x] = t, M.$index = e, D(E, M)
            }, P = S.getValue || function () {
                    return S.value
                }, O = function (e, t) {
                return M[x] = t, M.$index = e, P(E, M)
            }, N = !!C.options.scrollingY, B = N ? S.dynamic || S.value !== C.__clientWidth : _.dynamic || _.value !== C.__clientHeight, V = !_.dynamic && !S.dynamic, L = "PRIMARY", R = "SECONDARY", H = N ? "translate3d(SECONDARYpx,PRIMARYpx,0)" : "translate3d(PRIMARYpx,SECONDARYpx,0)", z = N ? "height: PRIMARYpx; width: SECONDARYpx;" : "height: SECONDARYpx; width: PRIMARYpx;", F = 0, q = 0, U = -1, j = -1, G = -1, W = -1, Y = [], X = [], K = [], Q = {}, Z = 0, J = N ? function () {
                C.setDimensions(null, null, null, ee.getContentSize(), !0)
            } : function () {
                C.setDimensions(null, null, ee.getContentSize(), null, !0)
            }, ee = N ? new l : new u;
            (B ? f : d).call(ee), (V ? p : h).call(ee);
            var te = N ? "getContentHeight" : "getContentWidth", ne = C.options[te];
            C.options[te] = angular.bind(ee, ee.getContentSize), C.__$callback = C.__callback, C.__callback = function (e, t, n, i) {
                var r = ee.getScrollValue();
                (U === -1 || r + ee.scrollPrimarySize > G || r < W) && a(), C.__$callback(e, t, n, i)
            };
            var ie = !1, re = !1;
            this.refreshLayout = function () {
                A.length ? (m = I(0, A[0]), v = O(0, A[0])) : (m = 100, v = 100);
                var e = getComputedStyle(g) || {}, n = g.firstElementChild && getComputedStyle(g.firstElementChild) || {}, i = g.lastElementChild && getComputedStyle(g.lastElementChild) || {};
                q = (parseInt(e[N ? "height" : "width"]) || 0) + (n && parseInt(n[N ? "marginTop" : "marginLeft"]) || 0) + (i && parseInt(i[N ? "marginBottom" : "marginRight"]) || 0), F = 0;
                var r = $;
                do F += r[N ? "offsetTop" : "offsetLeft"]; while (ionic.DomUtil.contains(C.__content, r = r.offsetParent));
                var a = $.previousElementSibling, s = a ? t.getComputedStyle(a) : {}, l = parseInt(s[N ? "marginBottom" : "marginRight"] || 0);
                if ($.style[ionic.CSS.TRANSFORM] = H.replace(L, -l).replace(R, 0), F -= l, C.__clientHeight && C.__clientWidth || (C.__clientWidth = C.__container.clientWidth, C.__clientHeight = C.__container.clientHeight), (ee.onRefreshLayout || angular.noop)(), ee.refreshDirection(), J(), !ie)for (var u = Math.max(20, 3 * T), f = 0; f < u; f++)Y.push(new c);
                ie = !0, ie && re && ((C.__scrollLeft > C.__maxScrollLeft || C.__scrollTop > C.__maxScrollTop) && C.resize(), o(!0))
            }, this.setData = function (e) {
                A = e, (ee.onRefreshData || angular.noop)(), re = !0
            }, this.destroy = function () {
                a.destroyed = !0, Y.forEach(function (e) {
                    e.scope.$destroy(), e.scope = e.element = e.node = e.images = null
                }), Y.length = K.length = X.length = 0, Q = {}, C.options[te] = ne, C.__callback = C.__$callback, C.resize(), (ee.onDestroy || angular.noop)()
            }
        }
    }

    function n(e) {
        return ["$ionicGesture", "$parse", function (t, n) {
            var i = e.substr(2).toLowerCase();
            return function (r, o, a) {
                var s = n(a[e]), c = function (e) {
                    r.$apply(function () {
                        s(r, {$event: e})
                    })
                }, l = t.on(i, c, o);
                r.$on("$destroy", function () {
                    t.off(l, i, c)
                })
            }
        }]
    }

    function i() {
        return ["$ionicScrollDelegate", function (e) {
            return {
                restrict: "E", link: function (t, n, i) {
                    function r(t) {
                        for (var i = 3, r = t.target; i-- && r;) {
                            if (r.classList.contains("button") || r.tagName.match(/input|textarea|select/i) || r.isContentEditable)return;
                            r = r.parentNode
                        }
                        var o = t.gesture && t.gesture.touches[0] || t.detail.touches[0], a = n[0].getBoundingClientRect();
                        ionic.DomUtil.rectContains(o.pageX, o.pageY, a.left, a.top - 20, a.left + a.width, a.top + a.height) && e.scrollTop(!0)
                    }

                    "true" != i.noTapScroll && (ionic.on("tap", r, n[0]), t.$on("$destroy", function () {
                        ionic.off("tap", r, n[0])
                    }))
                }
            }
        }]
    }

    function r(e) {
        return ["$document", "$timeout", function (t, n) {
            return {
                restrict: "E", controller: "$ionicHeaderBar", compile: function (i) {
                    function r(t, n, i, r) {
                        e ? (t.$watch(function () {
                            return n[0].className
                        }, function (e) {
                            var n = e.indexOf("ng-hide") === -1, i = e.indexOf("bar-subheader") !== -1;
                            t.$hasHeader = n && !i, t.$hasSubheader = n && i, t.$emit("$ionicSubheader", t.$hasSubheader)
                        }), t.$on("$destroy", function () {
                            delete t.$hasHeader, delete t.$hasSubheader
                        }), r.align(), t.$on("$ionicHeader.align", function () {
                            ionic.requestAnimationFrame(function () {
                                r.align()
                            })
                        })) : (t.$watch(function () {
                            return n[0].className
                        }, function (e) {
                            var n = e.indexOf("ng-hide") === -1, i = e.indexOf("bar-subfooter") !== -1;
                            t.$hasFooter = n && !i, t.$hasSubfooter = n && i
                        }), t.$on("$destroy", function () {
                            delete t.$hasFooter, delete t.$hasSubfooter
                        }), t.$watch("$hasTabs", function (e) {
                            n.toggleClass("has-tabs", !!e)
                        }), r.align(), t.$on("$ionicFooter.align", function () {
                            ionic.requestAnimationFrame(function () {
                                r.align()
                            })
                        }))
                    }

                    return i.addClass(e ? "bar bar-header" : "bar bar-footer"), n(function () {
                        e && t[0].getElementsByClassName("tabs-top").length && i.addClass("has-tabs-top")
                    }), {pre: r}
                }
            }
        }]
    }

    function o(e) {
        return e.clientHeight
    }

    function a(e) {
        e.stopPropagation()
    }

    var s = angular.module("ionic", ["ngAnimate", "ngSanitize", "ui.router", "ngIOS9UIWebViewPatch"]), c = angular.extend, l = angular.forEach, u = angular.isDefined, f = angular.isNumber, d = angular.isString, p = angular.element, h = angular.noop;
    s.factory("$ionicActionSheet", ["$rootScope", "$compile", "$animate", "$timeout", "$ionicTemplateLoader", "$ionicPlatform", "$ionicBody", "IONIC_BACK_PRIORITY", function (e, t, n, i, r, o, a, s) {
        function l(r) {
            function l(e) {
                e && /icon/.test(e) && (u.$actionSheetHasIcon = !0)
            }

            var u = e.$new(!0);
            c(u, {
                cancel: h,
                destructiveButtonClicked: h,
                buttonClicked: h,
                $deregisterBackButton: h,
                buttons: [],
                cancelOnStateChange: !0
            }, r || {});
            for (var f = 0; f < u.buttons.length; f++)l(u.buttons[f].text);
            l(u.cancelText), l(u.destructiveText);
            var d = u.element = t('<ion-action-sheet ng-class="cssClass" buttons="buttons"></ion-action-sheet>')(u), m = p(d[0].querySelector(".action-sheet-wrapper")), v = u.cancelOnStateChange ? e.$on("$stateChangeSuccess", function () {
                u.cancel()
            }) : h;
            return u.removeSheet = function (e) {
                u.removed || (u.removed = !0, m.removeClass("action-sheet-up"), i(function () {
                    a.removeClass("action-sheet-open")
                }, 400), u.$deregisterBackButton(), v(), n.removeClass(d, "active").then(function () {
                    u.$destroy(), d.remove(), u.cancel.$scope = m = null, (e || h)()
                }))
            }, u.showSheet = function (e) {
                u.removed || (a.append(d).addClass("action-sheet-open"), n.addClass(d, "active").then(function () {
                    u.removed || (e || h)()
                }), i(function () {
                    u.removed || m.addClass("action-sheet-up")
                }, 20, !1))
            }, u.$deregisterBackButton = o.registerBackButtonAction(function () {
                i(u.cancel)
            }, s.actionSheet), u.cancel = function () {
                u.removeSheet(r.cancel)
            }, u.buttonClicked = function (e) {
                r.buttonClicked(e, r.buttons[e]) === !0 && u.removeSheet()
            }, u.destructiveButtonClicked = function () {
                r.destructiveButtonClicked() === !0 && u.removeSheet()
            }, u.showSheet(), u.cancel.$scope = u, u.cancel
        }

        return {show: l}
    }]), p.prototype.addClass = function (e) {
        var t, n, i, r, o, a;
        if (e && "ng-scope" != e && "ng-isolate-scope" != e)for (t = 0; t < this.length; t++)if (r = this[t], r.setAttribute)if (e.indexOf(" ") < 0 && r.classList.add)r.classList.add(e); else {
            for (a = (" " + (r.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " "), o = e.split(" "), n = 0; n < o.length; n++)i = o[n].trim(), a.indexOf(" " + i + " ") === -1 && (a += i + " ");
            r.setAttribute("class", a.trim());
        }
        return this
    }, p.prototype.removeClass = function (e) {
        var t, n, i, r, o;
        if (e)for (t = 0; t < this.length; t++)if (o = this[t], o.getAttribute)if (e.indexOf(" ") < 0 && o.classList.remove)o.classList.remove(e); else for (i = e.split(" "), n = 0; n < i.length; n++)r = i[n], o.setAttribute("class", (" " + (o.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + r.trim() + " ", " ").trim());
        return this
    }, s.factory("$ionicBackdrop", ["$document", "$timeout", "$$rAF", function (e, t, n) {
        function i() {
            s++, 1 === s && (a.addClass("visible"), n(function () {
                s >= 1 && a.addClass("active")
            }))
        }

        function r() {
            1 === s && (a.removeClass("active"), t(function () {
                0 === s && a.removeClass("visible")
            }, 400, !1)), s = Math.max(0, s - 1)
        }

        function o() {
            return a
        }

        var a = p('<div class="backdrop">'), s = 0;
        return e[0].body.appendChild(a[0]), {retain: i, release: r, getElement: o, _element: a}
    }]), s.factory("$ionicBind", ["$parse", "$interpolate", function (e, t) {
        var n = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
        return function (i, r, o) {
            l(o || {}, function (o, a) {
                var s, c, l = o.match(n) || [], u = l[3] || a, f = l[1];
                switch (f) {
                    case"@":
                        if (!r[u])return;
                        r.$observe(u, function (e) {
                            i[a] = e
                        }), r[u] && (i[a] = t(r[u])(i));
                        break;
                    case"=":
                        if (!r[u])return;
                        c = i.$watch(r[u], function (e) {
                            i[a] = e
                        }), i.$on("$destroy", c);
                        break;
                    case"&":
                        if (r[u] && r[u].match(RegExp(a + "(.*?)")))throw new Error('& expression binding "' + a + '" looks like it will recursively call "' + r[u] + '" and cause a stack overflow! Please choose a different scopeName.');
                        s = e(r[u]), i[a] = function (e) {
                            return s(i, e)
                        }
                }
            })
        }
    }]), s.factory("$ionicBody", ["$document", function (e) {
        return {
            addClass: function () {
                for (var t = 0; t < arguments.length; t++)e[0].body.classList.add(arguments[t]);
                return this
            }, removeClass: function () {
                for (var t = 0; t < arguments.length; t++)e[0].body.classList.remove(arguments[t]);
                return this
            }, enableClass: function (e) {
                var t = Array.prototype.slice.call(arguments).slice(1);
                return e ? this.addClass.apply(this, t) : this.removeClass.apply(this, t), this
            }, append: function (t) {
                return e[0].body.appendChild(t.length ? t[0] : t), this
            }, get: function () {
                return e[0].body
            }
        }
    }]), s.factory("$ionicClickBlock", ["$document", "$ionicBody", "$timeout", function (e, t, n) {
        function i(e) {
            e.preventDefault(), e.stopPropagation()
        }

        function r() {
            c && (a ? a.classList.remove(l) : (a = e[0].createElement("div"), a.className = "click-block", t.append(a), a.addEventListener("touchstart", i), a.addEventListener("mousedown", i)), c = !1)
        }

        function o() {
            a && a.classList.add(l)
        }

        var a, s, c, l = "click-block-hide";
        return {
            show: function (e) {
                c = !0, n.cancel(s), s = n(this.hide, e || 310, !1), r()
            }, hide: function () {
                c = !1, n.cancel(s), o()
            }
        }
    }]), s.factory("$ionicGesture", [function () {
        return {
            on: function (e, t, n, i) {
                return window.ionic.onGesture(e, t, n[0], i)
            }, off: function (e, t, n) {
                return window.ionic.offGesture(e, t, n)
            }
        }
    }]), s.factory("$ionicHistory", ["$rootScope", "$state", "$location", "$window", "$timeout", "$ionicViewSwitcher", "$ionicNavViewDelegate", function (e, t, n, i, r, o, a) {
        function s(e) {
            return e ? B.views[e] : null
        }

        function l(e) {
            return e ? s(e.backViewId) : null
        }

        function f(e) {
            return e ? s(e.forwardViewId) : null
        }

        function d(e) {
            return e ? B.histories[e] : null
        }

        function p(e) {
            var t = h(e);
            return B.histories[t.historyId] || (B.histories[t.historyId] = {
                historyId: t.historyId,
                parentHistoryId: h(t.scope.$parent).historyId,
                stack: [],
                cursor: -1
            }), d(t.historyId)
        }

        function h(t) {
            for (var n = t; n;) {
                if (n.hasOwnProperty("$historyId"))return {historyId: n.$historyId, scope: n};
                n = n.$parent
            }
            return {historyId: "root", scope: e}
        }

        function m(e) {
            B.currentView = s(e), B.backView = l(B.currentView), B.forwardView = f(B.currentView)
        }

        function v() {
            var e;
            if (t && t.current && t.current.name) {
                if (e = t.current.name, t.params)for (var n in t.params)t.params.hasOwnProperty(n) && t.params[n] && (e += "_" + n + "=" + t.params[n]);
                return e
            }
            return ionic.Utils.nextUid()
        }

        function g() {
            var e;
            if (t && t.params)for (var n in t.params)t.params.hasOwnProperty(n) && (e = e || {}, e[n] = t.params[n]);
            return e
        }

        function $(e) {
            return e && e.length && /ion-side-menus|ion-tabs/i.test(e[0].tagName)
        }

        function y(e, t) {
            return (!t || !t.$$state || t.$$state.self.canSwipeBack !== !1) && (!e || "false" !== e.attr("can-swipe-back"))
        }

        var w, b, _, S, x, T = "initialView", E = "newView", C = "moveBack", k = "moveForward", A = "back", M = "forward", D = "enter", I = "exit", P = "swap", O = "none", N = 0, B = {
            histories: {
                root: {
                    historyId: "root",
                    parentHistoryId: null,
                    stack: [],
                    cursor: -1
                }
            }, views: {}, backView: null, forwardView: null, currentView: null
        }, V = function () {
        };
        return V.prototype.initialize = function (e) {
            if (e) {
                for (var t in e)this[t] = e[t];
                return this
            }
            return null
        }, V.prototype.go = function () {
            if (this.stateName)return t.go(this.stateName, this.stateParams);
            if (this.url && this.url !== n.url()) {
                if (B.backView === this)return i.history.go(-1);
                if (B.forwardView === this)return i.history.go(1);
                n.url(this.url)
            }
            return null
        }, V.prototype.destroy = function () {
            this.scope && (this.scope.$destroy && this.scope.$destroy(), this.scope = null)
        }, {
            register: function (e, t) {
                var i, a, c, u = v(), f = p(e), $ = B.currentView, V = B.backView, L = B.forwardView, R = null, H = null, z = O, F = f.historyId, q = n.url();
                if (w !== u && (w = u, N++), x)R = x.viewId, H = x.action, z = x.direction, x = null; else if (V && V.stateId === u)R = V.viewId, F = V.historyId, H = C, V.historyId === $.historyId ? z = A : $ && (z = I, i = d(V.historyId), i && i.parentHistoryId === $.historyId ? z = D : (i = d($.historyId), i && i.parentHistoryId === f.parentHistoryId && (z = P))); else if (L && L.stateId === u)R = L.viewId, F = L.historyId, H = k, L.historyId === $.historyId ? z = M : $ && (z = I, $.historyId === f.parentHistoryId ? z = D : (i = d($.historyId), i && i.parentHistoryId === f.parentHistoryId && (z = P))), i = h(e), L.historyId && i.scope && (i.scope.$historyId = L.historyId, F = L.historyId); else if ($ && $.historyId !== F && f.cursor > -1 && f.stack.length > 0 && f.cursor < f.stack.length && f.stack[f.cursor].stateId === u) {
                    var U = f.stack[f.cursor];
                    R = U.viewId, F = U.historyId, H = C, z = P, i = d($.historyId), i && i.parentHistoryId === F ? z = I : (i = d(F), i && i.parentHistoryId === $.historyId && (z = D)), i = s(U.backViewId), i && U.historyId !== i.historyId && (f.stack[f.cursor].backViewId = $.viewId)
                } else {
                    if (c = o.createViewEle(t), this.isAbstractEle(c, t))return {
                        action: "abstractView",
                        direction: O,
                        ele: c
                    };
                    if (R = ionic.Utils.nextUid(), $) {
                        if ($.forwardViewId = R, H = E, L && $.stateId !== L.stateId && $.historyId === L.historyId && (i = d(L.historyId))) {
                            for (a = i.stack.length - 1; a >= L.index; a--) {
                                var j = i.stack[a];
                                j && j.destroy && j.destroy(), i.stack.splice(a)
                            }
                            F = L.historyId
                        }
                        f.historyId === $.historyId ? z = M : $.historyId !== f.historyId && (z = D, i = d($.historyId), i && i.parentHistoryId === f.parentHistoryId ? z = P : (i = d(i.parentHistoryId), i && i.historyId === f.historyId && (z = I)))
                    } else H = T;
                    N < 2 && (z = O), B.views[R] = this.createView({
                        viewId: R,
                        index: f.stack.length,
                        historyId: f.historyId,
                        backViewId: $ && $.viewId ? $.viewId : null,
                        forwardViewId: null,
                        stateId: u,
                        stateName: this.currentStateName(),
                        stateParams: g(),
                        url: q,
                        canSwipeBack: y(c, t)
                    }), f.stack.push(B.views[R])
                }
                if (_ && _(), r.cancel(S), b) {
                    if (b.disableAnimate && (z = O), b.disableBack && (B.views[R].backViewId = null), b.historyRoot) {
                        for (a = 0; a < f.stack.length; a++)f.stack[a].viewId === R ? (f.stack[a].index = 0, f.stack[a].backViewId = f.stack[a].forwardViewId = null) : delete B.views[f.stack[a].viewId];
                        f.stack = [B.views[R]]
                    }
                    b = null
                }
                if (m(R), B.backView && F == B.backView.historyId && u == B.backView.stateId && q == B.backView.url)for (a = 0; a < f.stack.length; a++)if (f.stack[a].viewId == R) {
                    H = "dupNav", z = O, a > 0 && (f.stack[a - 1].forwardViewId = null), B.forwardView = null, B.currentView.index = B.backView.index, B.currentView.backViewId = B.backView.backViewId, B.backView = l(B.backView), f.stack.splice(a, 1);
                    break
                }
                return f.cursor = B.currentView.index, {
                    viewId: R,
                    action: H,
                    direction: z,
                    historyId: F,
                    enableBack: this.enabledBack(B.currentView),
                    isHistoryRoot: 0 === B.currentView.index,
                    ele: c
                }
            }, registerHistory: function (e) {
                e.$historyId = ionic.Utils.nextUid()
            }, createView: function (e) {
                var t = new V;
                return t.initialize(e)
            }, getViewById: s, viewHistory: function () {
                return B
            }, currentView: function (e) {
                return arguments.length && (B.currentView = e), B.currentView
            }, currentHistoryId: function () {
                return B.currentView ? B.currentView.historyId : null
            }, currentTitle: function (e) {
                if (B.currentView)return arguments.length && (B.currentView.title = e), B.currentView.title
            }, backView: function (e) {
                return arguments.length && (B.backView = e), B.backView
            }, backTitle: function (e) {
                var t = e && s(e.backViewId) || B.backView;
                return t && t.title
            }, forwardView: function (e) {
                return arguments.length && (B.forwardView = e), B.forwardView
            }, currentStateName: function () {
                return t && t.current ? t.current.name : null
            }, isCurrentStateNavView: function (e) {
                return !!(t && t.current && t.current.views && t.current.views[e])
            }, goToHistoryRoot: function (e) {
                if (e) {
                    var t = d(e);
                    if (t && t.stack.length) {
                        if (B.currentView && B.currentView.viewId === t.stack[0].viewId)return;
                        x = {viewId: t.stack[0].viewId, action: C, direction: A}, t.stack[0].go()
                    }
                }
            }, goBack: function (e) {
                if (u(e) && e !== -1) {
                    if (e > -1)return;
                    var t = B.histories[this.currentHistoryId()], n = t.cursor + e + 1;
                    n < 1 && (n = 1), t.cursor = n, m(t.stack[n].viewId);
                    for (var i = n - 1, o = [], a = s(t.stack[i].forwardViewId); a && (o.push(a.stateId || a.viewId), i++, !(i >= t.stack.length));)a = s(t.stack[i].forwardViewId);
                    var c = this;
                    o.length && r(function () {
                        c.clearCache(o)
                    }, 600)
                }
                B.backView && B.backView.go()
            }, enabledBack: function (e) {
                var t = l(e);
                return !(!t || t.historyId !== e.historyId)
            }, clearHistory: function () {
                var e = B.histories, t = B.currentView;
                if (e)for (var n in e)e[n].stack && (e[n].stack = [], e[n].cursor = -1), t && t.historyId === n ? (t.backViewId = t.forwardViewId = null, e[n].stack.push(t)) : e[n].destroy && e[n].destroy();
                for (var i in B.views)i !== t.viewId && delete B.views[i];
                t && m(t.viewId)
            }, clearCache: function (e) {
                return r(function () {
                    a._instances.forEach(function (t) {
                        t.clearCache(e)
                    })
                })
            }, nextViewOptions: function (t) {
                return _ && _(), arguments.length && (r.cancel(S), null === t ? b = t : (b = b || {}, c(b, t), b.expire && (_ = e.$on("$stateChangeSuccess", function () {
                    S = r(function () {
                        b = null
                    }, b.expire)
                })))), b
            }, isAbstractEle: function (e, t) {
                return !!(t && t.$$state && t.$$state.self["abstract"]) || !(!e || !$(e) && !$(e.children()))
            }, isActiveScope: function (e) {
                if (!e)return !1;
                for (var t, n = e, i = this.currentHistoryId(); n;) {
                    if (n.$$disconnected)return !1;
                    if (!t && n.hasOwnProperty("$historyId") && (t = !0), i) {
                        if (n.hasOwnProperty("$historyId") && i == n.$historyId)return !0;
                        if (n.hasOwnProperty("$activeHistoryId") && i == n.$activeHistoryId) {
                            if (n.hasOwnProperty("$historyId"))return !0;
                            if (!t)return !0
                        }
                    }
                    t && n.hasOwnProperty("$activeHistoryId") && (t = !1), n = n.$parent
                }
                return !i || "root" == i
            }
        }
    }]).run(["$rootScope", "$state", "$location", "$document", "$ionicPlatform", "$ionicHistory", "IONIC_BACK_PRIORITY", function (e, t, n, i, r, o, a) {
        function s(e) {
            var t = o.backView();
            return t ? t.go() : ionic.Platform.exitApp(), e.preventDefault(), !1
        }

        e.$on("$ionicView.beforeEnter", function () {
            ionic.keyboard && ionic.keyboard.hide && ionic.keyboard.hide()
        }), e.$on("$ionicHistory.change", function (e, i) {
            if (!i)return null;
            var r = o.viewHistory(), a = i.historyId ? r.histories[i.historyId] : null;
            if (a && a.cursor > -1 && a.cursor < a.stack.length) {
                var s = a.stack[a.cursor];
                return s.go(i)
            }
            !i.url && i.uiSref && (i.url = t.href(i.uiSref)), i.url && (0 === i.url.indexOf("#") && (i.url = i.url.replace("#", "")), i.url !== n.url() && n.url(i.url))
        }), e.$ionicGoBack = function (e) {
            o.goBack(e)
        }, e.$on("$ionicView.afterEnter", function (e, t) {
            t && t.title && (i[0].title = t.title)
        }), r.registerBackButtonAction(s, a.view)
    }]), s.provider("$ionicConfig", function () {
        function e(e, i) {
            a.platform[e] = i, r.platform[e] = {}, t(a, a.platform[e]), n(a.platform[e], r.platform[e], "")
        }

        function t(e, n) {
            for (var i in e)i != o && e.hasOwnProperty(i) && (angular.isObject(e[i]) ? (u(n[i]) || (n[i] = {}), t(e[i], n[i])) : u(n[i]) || (n[i] = null))
        }

        function n(e, t, r) {
            l(e, function (s, c) {
                angular.isObject(e[c]) ? (t[c] = {}, n(e[c], t[c], r + "." + c)) : t[c] = function (n) {
                    if (arguments.length)return e[c] = n, t;
                    if (e[c] == o) {
                        var s = i(a.platform, ionic.Platform.platform() + r + "." + c);
                        return s || s === !1 ? s : i(a.platform, "default" + r + "." + c)
                    }
                    return e[c]
                }
            })
        }

        function i(e, t) {
            t = t.split(".");
            for (var n = 0; n < t.length; n++) {
                if (!e || !u(e[t[n]]))return null;
                e = e[t[n]]
            }
            return e
        }

        var r = this;
        r.platform = {};
        var o = "platform", a = {
            views: {
                maxCache: o,
                forwardCache: o,
                transition: o,
                swipeBackEnabled: o,
                swipeBackHitWidth: o
            },
            navBar: {alignTitle: o, positionPrimaryButtons: o, positionSecondaryButtons: o, transition: o},
            backButton: {icon: o, text: o, previousTitleText: o},
            form: {checkbox: o, toggle: o},
            scrolling: {jsScrolling: o},
            spinner: {icon: o},
            tabs: {style: o, position: o},
            templates: {maxPrefetch: o},
            platform: {}
        };
        n(a, r, ""), e("default", {
            views: {
                maxCache: 10,
                forwardCache: !1,
                transition: "ios",
                swipeBackEnabled: !0,
                swipeBackHitWidth: 45
            },
            navBar: {
                alignTitle: "center",
                positionPrimaryButtons: "left",
                positionSecondaryButtons: "right",
                transition: "view"
            },
            backButton: {icon: "ion-ios-arrow-back", text: "Back", previousTitleText: !0},
            form: {checkbox: "circle", toggle: "large"},
            scrolling: {jsScrolling: !0},
            spinner: {icon: "ios"},
            tabs: {style: "standard", position: "bottom"},
            templates: {maxPrefetch: 30}
        }), e("ios", {}), e("android", {
            views: {transition: "android", swipeBackEnabled: !1},
            navBar: {alignTitle: "left", positionPrimaryButtons: "right", positionSecondaryButtons: "right"},
            backButton: {icon: "ion-android-arrow-back", text: !1, previousTitleText: !1},
            form: {checkbox: "square", toggle: "small"},
            spinner: {icon: "android"},
            tabs: {style: "striped", position: "top"}
        }), e("windowsphone", {spinner: {icon: "android"}}), r.transitions = {
            views: {},
            navBar: {}
        }, r.transitions.views.ios = function (e, t, n, i) {
            function r(e, t, n, i) {
                var r = {};
                r[ionic.CSS.TRANSITION_DURATION] = o.shouldAnimate ? "" : 0, r.opacity = t, i > -1 && (r.boxShadow = "0 0 10px rgba(0,0,0," + (o.shouldAnimate ? .45 * i : .3) + ")"), r[ionic.CSS.TRANSFORM] = "translate3d(" + n + "%,0,0)", ionic.DomUtil.cachedStyles(e, r)
            }

            var o = {
                run: function (i) {
                    "forward" == n ? (r(e, 1, 99 * (1 - i), 1 - i), r(t, 1 - .1 * i, i * -33, -1)) : "back" == n ? (r(e, 1 - .1 * (1 - i), (1 - i) * -33, -1), r(t, 1, 100 * i, 1 - i)) : (r(e, 1, 0, -1), r(t, 0, 0, -1))
                }, shouldAnimate: i && ("forward" == n || "back" == n)
            };
            return o
        }, r.transitions.navBar.ios = function (e, t, n, i) {
            function r(e, t, n, i) {
                var r = {};
                r[ionic.CSS.TRANSITION_DURATION] = s.shouldAnimate ? "" : "0ms", r.opacity = 1 === t ? "" : t, e.setCss("buttons-left", r), e.setCss("buttons-right", r), e.setCss("back-button", r), r[ionic.CSS.TRANSFORM] = "translate3d(" + i + "px,0,0)", e.setCss("back-text", r), r[ionic.CSS.TRANSFORM] = "translate3d(" + n + "px,0,0)", e.setCss("title", r)
            }

            function o(e, t, n) {
                if (e && t) {
                    var i = (e.titleTextX() + e.titleWidth()) * (1 - n), o = t && (t.titleTextX() - e.backButtonTextLeft()) * (1 - n) || 0;
                    r(e, n, i, o)
                }
            }

            function a(e, t, n) {
                if (e && t) {
                    var i = (-(e.titleTextX() - t.backButtonTextLeft()) - e.titleLeftRight()) * n;
                    r(e, 1 - n, i, 0)
                }
            }

            var s = {
                run: function (n) {
                    var i = e.controller(), r = t && t.controller();
                    "back" == s.direction ? (a(i, r, 1 - n), o(r, i, 1 - n)) : (o(i, r, n), a(r, i, n))
                }, direction: n, shouldAnimate: i && ("forward" == n || "back" == n)
            };
            return s
        }, r.transitions.views.android = function (e, t, n, i) {
            function r(e, t) {
                var n = {};
                n[ionic.CSS.TRANSITION_DURATION] = o.shouldAnimate ? "" : 0, n[ionic.CSS.TRANSFORM] = "translate3d(" + t + "%,0,0)", ionic.DomUtil.cachedStyles(e, n)
            }

            i = i && ("forward" == n || "back" == n);
            var o = {
                run: function (i) {
                    "forward" == n ? (r(e, 99 * (1 - i)), r(t, i * -100)) : "back" == n ? (r(e, (1 - i) * -100), r(t, 100 * i)) : (r(e, 0), r(t, 0))
                }, shouldAnimate: i
            };
            return o
        }, r.transitions.navBar.android = function (e, t, n, i) {
            function r(e, t) {
                if (e) {
                    var n = {};
                    n.opacity = 1 === t ? "" : t, e.setCss("buttons-left", n), e.setCss("buttons-right", n), e.setCss("back-button", n), e.setCss("back-text", n), e.setCss("title", n)
                }
            }

            return {
                run: function (n) {
                    r(e.controller(), n), r(t && t.controller(), 1 - n)
                }, shouldAnimate: i && ("forward" == n || "back" == n)
            }
        }, r.transitions.views.none = function (e, t) {
            return {
                run: function (n) {
                    r.transitions.views.android(e, t, !1, !1).run(n)
                }, shouldAnimate: !1
            }
        }, r.transitions.navBar.none = function (e, t) {
            return {
                run: function (n) {
                    r.transitions.navBar.ios(e, t, !1, !1).run(n), r.transitions.navBar.android(e, t, !1, !1).run(n)
                }, shouldAnimate: !1
            }
        }, r.setPlatformConfig = e, r.$get = function () {
            return r
        }
    }).config(["$compileProvider", function (e) {
        e.aHrefSanitizationWhitelist(/^\s*(https?|sms|tel|geo|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/), e.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|content|blob|ms-appx|x-wmapp0):|data:image\//)
    }]);
    var m = '<div class="loading-container"><div class="loading"></div></div>', v = "$ionicLoading instance.hide() has been deprecated. Use $ionicLoading.hide().", g = "$ionicLoading instance.show() has been deprecated. Use $ionicLoading.show().", $ = "$ionicLoading instance.setContent() has been deprecated. Use $ionicLoading.show({ template: 'my content' }).";
    s.constant("$ionicLoadingConfig", {template: "<ion-spinner></ion-spinner>"}).factory("$ionicLoading", ["$ionicLoadingConfig", "$ionicBody", "$ionicTemplateLoader", "$ionicBackdrop", "$timeout", "$q", "$log", "$compile", "$ionicPlatform", "$rootScope", "IONIC_BACK_PRIORITY", function (e, t, n, i, r, o, a, s, l, u, f) {
        function d() {
            return w || (w = n.compile({template: m, appendTo: t.get()}).then(function (e) {
                return e.show = function (a) {
                    var c = a.templateUrl ? n.load(a.templateUrl) : o.when(a.template || a.content || "");
                    e.scope = a.scope || e.scope, e.isShown || (e.hasBackdrop = !a.noBackdrop && a.showBackdrop !== !1, e.hasBackdrop && (i.retain(), i.getElement().addClass("backdrop-loading"))), a.duration && (r.cancel(e.durationTimeout), e.durationTimeout = r(angular.bind(e, e.hide), +a.duration)), b(), b = l.registerBackButtonAction(h, f.loading), c.then(function (n) {
                        if (n) {
                            var i = e.element.children();
                            i.html(n), s(i.contents())(e.scope)
                        }
                        e.isShown && (e.element.addClass("visible"), ionic.requestAnimationFrame(function () {
                            e.isShown && (e.element.addClass("active"), t.addClass("loading-active"))
                        }))
                    }), e.isShown = !0
                }, e.hide = function () {
                    b(), e.isShown && (e.hasBackdrop && (i.release(), i.getElement().removeClass("backdrop-loading")), e.element.removeClass("active"), t.removeClass("loading-active"), setTimeout(function () {
                        !e.isShown && e.element.removeClass("visible")
                    }, 200)), r.cancel(e.durationTimeout), e.isShown = !1
                }, e
            })), w
        }

        function p(t) {
            t = c({}, e || {}, t || {});
            var n = t.delay || t.showDelay || 0;
            return _(), S(), t.hideOnStateChange && (_ = u.$on("$stateChangeSuccess", y), S = u.$on("$stateChangeError", y)), r.cancel(x), x = r(h, n), x.then(d).then(function (e) {
                return e.show(t)
            }), {
                hide: function () {
                    return a.error(v), y.apply(this, arguments)
                }, show: function () {
                    return a.error(g), p.apply(this, arguments)
                }, setContent: function (e) {
                    return a.error($), d().then(function (t) {
                        t.show({template: e})
                    })
                }
            }
        }

        function y() {
            _(), S(), r.cancel(x), d().then(function (e) {
                e.hide()
            })
        }

        var w, b = h, _ = h, S = h, x = o.when();
        return {show: p, hide: y, _getLoader: d}
    }]), s.factory("$ionicModal", ["$rootScope", "$ionicBody", "$compile", "$timeout", "$ionicPlatform", "$ionicTemplateLoader", "$$q", "$log", "$ionicClickBlock", "$window", "IONIC_BACK_PRIORITY", function (e, t, n, i, r, o, a, s, l, u, f) {
        var d = ionic.views.Modal.inherit({
            initialize: function (e) {
                ionic.views.Modal.prototype.initialize.call(this, e), this.animation = e.animation || "slide-in-up"
            }, show: function (e) {
                var n = this;
                if (n.scope.$$destroyed)return s.error("Cannot call " + n.viewType + ".show() after remove(). Please create a new " + n.viewType + " instance."), a.when();
                l.show(600), g.add(n);
                var o = p(n.modalEl);
                n.el.classList.remove("hide"), i(function () {
                    n._isShown && t.addClass(n.viewType + "-open")
                }, 400, !1), n.el.parentElement || (o.addClass(n.animation), t.append(n.el));
                var c = o.data("$$ionicScrollController");
                return c && c.resize(), e && n.positionView && (n.positionView(e, o), n._onWindowResize = function () {
                    n._isShown && n.positionView(e, o)
                }, ionic.on("resize", n._onWindowResize, window)), o.addClass("ng-enter active").removeClass("ng-leave ng-leave-active"), n._isShown = !0, n._deregisterBackButton = r.registerBackButtonAction(n.hardwareBackButtonClose ? angular.bind(n, n.hide) : h, f.modal), ionic.views.Modal.prototype.show.call(n), i(function () {
                    n._isShown && (o.addClass("ng-enter-active"), ionic.trigger("resize"), n.scope.$parent && n.scope.$parent.$broadcast(n.viewType + ".shown", n), n.el.classList.add("active"), n.scope.$broadcast("$ionicHeader.align"), n.scope.$broadcast("$ionicFooter.align"))
                }, 20), i(function () {
                    n._isShown && n.$el.on("click", function (e) {
                        n.backdropClickToClose && e.target === n.el && g.isHighest(n) && n.hide()
                    })
                }, 400)
            }, hide: function () {
                var e = this, n = p(e.modalEl);
                return l.show(600), g.remove(e), e.el.classList.remove("active"), n.addClass("ng-leave"), i(function () {
                    e._isShown || n.addClass("ng-leave-active").removeClass("ng-enter ng-enter-active active")
                }, 20, !1), e.$el.off("click"), e._isShown = !1, e.scope.$parent && e.scope.$parent.$broadcast(e.viewType + ".hidden", e), e._deregisterBackButton && e._deregisterBackButton(), ionic.views.Modal.prototype.hide.call(e), e.positionView && ionic.off("resize", e._onWindowResize, window), i(function () {
                    t.removeClass(e.viewType + "-open"), e.el.classList.add("hide")
                }, e.hideDelay || 320)
            }, remove: function () {
                var e = this;
                return e.scope.$parent && e.scope.$parent.$broadcast(e.viewType + ".removed", e), e.hide().then(function () {
                    e.scope.$destroy(), e.$el.remove()
                })
            }, isShown: function () {
                return !!this._isShown
            }
        }), m = function (t, i) {
            var r = i.scope && i.scope.$new() || e.$new(!0);
            i.viewType = i.viewType || "modal", c(r, {
                $hasHeader: !1,
                $hasSubheader: !1,
                $hasFooter: !1,
                $hasSubfooter: !1,
                $hasTabs: !1,
                $hasTabsTop: !1
            });
            var o = n("<ion-" + i.viewType + ">" + t + "</ion-" + i.viewType + ">")(r);
            i.$el = o, i.el = o[0], i.modalEl = i.el.querySelector("." + i.viewType);
            var a = new d(i);
            return a.scope = r, i.scope || (r[i.viewType] = a), a
        }, v = [], g = {
            add: function (e) {
                v.push(e)
            }, remove: function (e) {
                var t = v.indexOf(e);
                t > -1 && t < v.length && v.splice(t, 1)
            }, isHighest: function (e) {
                var t = v.indexOf(e);
                return t > -1 && t === v.length - 1
            }
        };
        return {
            fromTemplate: function (e, t) {
                var n = m(e, t || {});
                return n
            }, fromTemplateUrl: function (e, t, n) {
                var i;
                return angular.isFunction(t) && (i = t, t = n), o.load(e).then(function (e) {
                    var n = m(e, t || {});
                    return i && i(n), n
                })
            }, stack: g
        }
    }]), s.service("$ionicNavBarDelegate", ionic.DelegateService(["align", "showBackButton", "showBar", "title", "changeTitle", "setTitle", "getTitle", "back", "getPreviousTitle"])), s.service("$ionicNavViewDelegate", ionic.DelegateService(["clearCache"])), s.constant("IONIC_BACK_PRIORITY", {
        view: 100,
        sideMenu: 150,
        modal: 200,
        actionSheet: 300,
        popup: 400,
        loading: 500
    }).provider("$ionicPlatform", function () {
        return {
            $get: ["$q", function (e) {
                var t = {
                    onHardwareBackButton: function (e) {
                        ionic.Platform.ready(function () {
                            document.addEventListener("backbutton", e, !1)
                        })
                    }, offHardwareBackButton: function (e) {
                        ionic.Platform.ready(function () {
                            document.removeEventListener("backbutton", e)
                        })
                    }, $backButtonActions: {}, registerBackButtonAction: function (e, n, i) {
                        t._hasBackButtonHandler || (t.$backButtonActions = {}, t.onHardwareBackButton(t.hardwareBackButtonClick), t._hasBackButtonHandler = !0);
                        var r = {id: i ? i : ionic.Utils.nextUid(), priority: n ? n : 0, fn: e};
                        return t.$backButtonActions[r.id] = r, function () {
                            delete t.$backButtonActions[r.id]
                        }
                    }, hardwareBackButtonClick: function (e) {
                        var n, i;
                        for (i in t.$backButtonActions)(!n || t.$backButtonActions[i].priority >= n.priority) && (n = t.$backButtonActions[i]);
                        if (n)return n.fn(e), n
                    }, is: function (e) {
                        return ionic.Platform.is(e)
                    }, on: function (e, t) {
                        return ionic.Platform.ready(function () {
                            document.addEventListener(e, t, !1)
                        }), function () {
                            ionic.Platform.ready(function () {
                                document.removeEventListener(e, t)
                            })
                        }
                    }, ready: function (t) {
                        var n = e.defer();
                        return ionic.Platform.ready(function () {
                            n.resolve(), t && t()
                        }), n.promise
                    }
                };
                return t
            }]
        }
    }), s.factory("$ionicPopover", ["$ionicModal", "$ionicPosition", "$document", "$window", function (e, t, n, i) {
        function r(e, n) {
            var r = p(e.target || e), a = t.offset(r), s = n.prop("offsetWidth"), c = n.prop("offsetHeight"), l = i.innerWidth, u = i.innerHeight, f = {left: a.left + a.width / 2 - s / 2}, d = p(n[0].querySelector(".popover-arrow"));
            f.left < o ? f.left = o : f.left + s + o > l && (f.left = l - s - o), a.top + a.height + c > u && a.top - c > 0 ? (f.top = a.top - c, n.addClass("popover-bottom")) : (f.top = a.top + a.height, n.removeClass("popover-bottom")), d.css({left: a.left + a.width / 2 - d.prop("offsetWidth") / 2 - f.left + "px"}), n.css({
                top: f.top + "px",
                left: f.left + "px",
                marginLeft: "0",
                opacity: "1"
            })
        }

        var o = 6, a = {viewType: "popover", hideDelay: 1, animation: "none", positionView: r};
        return {
            fromTemplate: function (t, n) {
                return e.fromTemplate(t, ionic.Utils.extend(a, n || {}))
            }, fromTemplateUrl: function (t, n) {
                return e.fromTemplateUrl(t, ionic.Utils.extend(a, n || {}))
            }
        }
    }]);
    var y = '<div class="popup-container" ng-class="cssClass"><div class="popup"><div class="popup-head"><h3 class="popup-title" ng-bind-html="title"></h3><h5 class="popup-sub-title" ng-bind-html="subTitle" ng-if="subTitle"></h5></div><div class="popup-body"></div><div class="popup-buttons" ng-show="buttons.length"><button ng-repeat="button in buttons" ng-click="$buttonTapped(button, $event)" class="button" ng-class="button.type || \'button-default\'" ng-bind-html="button.text"></button></div></div></div>';
    s.factory("$ionicPopup", ["$ionicTemplateLoader", "$ionicBackdrop", "$q", "$timeout", "$rootScope", "$ionicBody", "$compile", "$ionicPlatform", "$ionicModal", "IONIC_BACK_PRIORITY", function (e, t, n, i, r, o, a, s, l, u) {
        function f(t) {
            t = c({scope: null, title: "", buttons: []}, t || {});
            var s = {};
            return s.scope = (t.scope || r).$new(), s.element = p(y), s.responseDeferred = n.defer(), o.get().appendChild(s.element[0]), a(s.element)(s.scope), c(s.scope, {
                title: t.title,
                buttons: t.buttons,
                subTitle: t.subTitle,
                cssClass: t.cssClass,
                $buttonTapped: function (e, t) {
                    var n = (e.onTap || h)(t);
                    t = t.originalEvent || t, t.defaultPrevented || s.responseDeferred.resolve(n)
                }
            }), n.when(t.templateUrl ? e.load(t.templateUrl) : t.template || t.content || "").then(function (e) {
                var t = p(s.element[0].querySelector(".popup-body"));
                e ? (t.html(e), a(t.contents())(s.scope)) : t.remove()
            }), s.show = function () {
                s.isShown || s.removed || (l.stack.add(s), s.isShown = !0, ionic.requestAnimationFrame(function () {
                    s.isShown && (s.element.removeClass("popup-hidden"), s.element.addClass("popup-showing active"), v(s.element))
                }))
            }, s.hide = function (e) {
                return e = e || h, s.isShown ? (l.stack.remove(s), s.isShown = !1, s.element.removeClass("active"), s.element.addClass("popup-hidden"), void i(e, 250, !1)) : e()
            }, s.remove = function () {
                s.removed || (s.hide(function () {
                    s.element.remove(), s.scope.$destroy()
                }), s.removed = !0)
            }, s
        }

        function d() {
            var e = _[_.length - 1];
            e && e.responseDeferred.resolve()
        }

        function m(e) {
            function n() {
                _.push(r), i(r.show, a, !1), r.responseDeferred.promise.then(function (e) {
                    var n = _.indexOf(r);
                    return n !== -1 && _.splice(n, 1), r.remove(), _.length > 0 ? _[_.length - 1].show() : (t.release(), i(function () {
                        _.length || o.removeClass("popup-open")
                    }, 400, !1), (S._backButtonActionDone || h)()), e
                })
            }

            var r = S._createPopup(e), a = 0;
            return _.length > 0 ? (a = b.stackPushDelay, i(_[_.length - 1].hide, a, !1)) : (o.addClass("popup-open"), t.retain(), S._backButtonActionDone = s.registerBackButtonAction(d, u.popup)), r.responseDeferred.promise.close = function (e) {
                r.removed || r.responseDeferred.resolve(e)
            }, r.responseDeferred.notify({close: r.responseDeferred.close}), n(), r.responseDeferred.promise
        }

        function v(e) {
            var t = e[0].querySelector("[autofocus]");
            t && t.focus()
        }

        function g(e) {
            return m(c({
                buttons: [{
                    text: e.okText || "OK", type: e.okType || "button-positive", onTap: function () {
                        return !0
                    }
                }]
            }, e || {}))
        }

        function $(e) {
            return m(c({
                buttons: [{
                    text: e.cancelText || "Cancel",
                    type: e.cancelType || "button-default",
                    onTap: function () {
                        return !1
                    }
                }, {
                    text: e.okText || "OK", type: e.okType || "button-positive", onTap: function () {
                        return !0
                    }
                }]
            }, e || {}))
        }

        function w(e) {
            var t = r.$new(!0);
            t.data = {};
            var n = "";
            return e.template && /<[a-z][\s\S]*>/i.test(e.template) === !1 && (n = "<span>" + e.template + "</span>", delete e.template), m(c({
                template: n + '<input ng-model="data.response" type="' + (e.inputType || "text") + '" placeholder="' + (e.inputPlaceholder || "") + '">',
                scope: t,
                buttons: [{
                    text: e.cancelText || "Cancel", type: e.cancelType || "button-default", onTap: function () {
                    }
                }, {
                    text: e.okText || "OK", type: e.okType || "button-positive", onTap: function () {
                        return t.data.response || ""
                    }
                }]
            }, e || {}))
        }

        var b = {stackPushDelay: 75}, _ = [], S = {
            show: m,
            alert: g,
            confirm: $,
            prompt: w,
            _createPopup: f,
            _popupStack: _
        };
        return S
    }]), s.factory("$ionicPosition", ["$document", "$window", function (e, t) {
        function n(e, n) {
            return e.currentStyle ? e.currentStyle[n] : t.getComputedStyle ? t.getComputedStyle(e)[n] : e.style[n]
        }

        function i(e) {
            return "static" === (n(e, "position") || "static")
        }

        var r = function (t) {
            for (var n = e[0], r = t.offsetParent || n; r && r !== n && i(r);)r = r.offsetParent;
            return r || n
        };
        return {
            position: function (t) {
                var n = this.offset(t), i = {top: 0, left: 0}, o = r(t[0]);
                o != e[0] && (i = this.offset(p(o)), i.top += o.clientTop - o.scrollTop, i.left += o.clientLeft - o.scrollLeft);
                var a = t[0].getBoundingClientRect();
                return {
                    width: a.width || t.prop("offsetWidth"),
                    height: a.height || t.prop("offsetHeight"),
                    top: n.top - i.top,
                    left: n.left - i.left
                }
            }, offset: function (n) {
                var i = n[0].getBoundingClientRect();
                return {
                    width: i.width || n.prop("offsetWidth"),
                    height: i.height || n.prop("offsetHeight"),
                    top: i.top + (t.pageYOffset || e[0].documentElement.scrollTop),
                    left: i.left + (t.pageXOffset || e[0].documentElement.scrollLeft)
                }
            }
        }
    }]), s.service("$ionicScrollDelegate", ionic.DelegateService(["resize", "scrollTop", "scrollBottom", "scrollTo", "scrollBy", "zoomTo", "zoomBy", "getScrollPosition", "anchorScroll", "freezeScroll", "freezeAllScrolls", "getScrollView"])), s.service("$ionicSideMenuDelegate", ionic.DelegateService(["toggleLeft", "toggleRight", "getOpenRatio", "isOpen", "isOpenLeft", "isOpenRight", "canDragContent", "edgeDragThreshold"])), s.service("$ionicSlideBoxDelegate", ionic.DelegateService(["update", "slide", "select", "enableSlide", "previous", "next", "stop", "autoPlay", "start", "currentIndex", "selected", "slidesCount", "count", "loop"])), s.service("$ionicTabsDelegate", ionic.DelegateService(["select", "selectedIndex"])), function () {
        var e = [];
        s.factory("$ionicTemplateCache", ["$http", "$templateCache", "$timeout", function (t, n, i) {
            function r(e) {
                return "undefined" == typeof e ? o() : (d(e) && (e = [e]), l(e, function (e) {
                    s.push(e)
                }), void(a && o()))
            }

            function o() {
                var e;
                if (r._runCount++, a = !0, 0 !== s.length) {
                    for (var c = 0; c < 4 && (e = s.pop());)d(e) && t.get(e, {cache: n}), c++;
                    s.length && i(o, 1e3)
                }
            }

            var a, s = e;
            return r._runCount = 0, r
        }]).config(["$stateProvider", "$ionicConfigProvider", function (t, n) {
            var i = t.state;
            t.state = function (r, o) {
                if ("object" == typeof o) {
                    var a = o.prefetchTemplate !== !1 && e.length < n.templates.maxPrefetch();
                    if (a && d(o.templateUrl) && e.push(o.templateUrl), angular.isObject(o.views))for (var s in o.views)a = o.views[s].prefetchTemplate !== !1 && e.length < n.templates.maxPrefetch(), a && d(o.views[s].templateUrl) && e.push(o.views[s].templateUrl)
                }
                return i.call(t, r, o)
            }
        }]).run(["$ionicTemplateCache", function (e) {
            e()
        }])
    }(), s.factory("$ionicTemplateLoader", ["$compile", "$controller", "$http", "$q", "$rootScope", "$templateCache", function (e, t, n, i, r, o) {
        function a(e) {
            return n.get(e, {cache: o}).then(function (e) {
                return e.data && e.data.trim()
            })
        }

        function s(n) {
            n = c({template: "", templateUrl: "", scope: null, controller: null, locals: {}, appendTo: null}, n || {});
            var o = n.templateUrl ? this.load(n.templateUrl) : i.when(n.template);
            return o.then(function (i) {
                var o, a = n.scope || r.$new(), s = p("<div>").html(i).contents();
                return n.controller && (o = t(n.controller, c(n.locals, {$scope: a})), s.children().data("$ngControllerController", o)), n.appendTo && p(n.appendTo).append(s), e(s)(a), {
                    element: s,
                    scope: a
                }
            })
        }

        return {load: a, compile: s}
    }]), s.factory("$ionicViewService", ["$ionicHistory", "$log", function (e, t) {
        function n(e, n) {
            t.warn("$ionicViewService" + e + " is deprecated, please use $ionicHistory" + n + " instead: http://ionicframework.com/docs/nightly/api/service/$ionicHistory/")
        }

        n("", "");
        var i = {
            getCurrentView: "currentView",
            getBackView: "backView",
            getForwardView: "forwardView",
            getCurrentStateName: "currentStateName",
            nextViewOptions: "nextViewOptions",
            clearHistory: "clearHistory"
        };
        return l(i, function (t, r) {
            i[r] = function () {
                return n("." + r, "." + t), e[t].apply(this, arguments)
            }
        }), i
    }]), s.factory("$ionicViewSwitcher", ["$timeout", "$document", "$q", "$ionicClickBlock", "$ionicConfig", "$ionicNavBarDelegate", function (e, t, n, i, r, o) {
        function a(e, t) {
            return s(e)["abstract"] ? s(e).name : t ? t.stateId || t.viewId : ionic.Utils.nextUid()
        }

        function s(e) {
            return e && e.$$state && e.$$state.self || {}
        }

        function f(e, t, n, i) {
            var o = s(e), a = v || D(t, "view-transition") || o.viewTransition || r.views.transition() || "ios", l = r.navBar.transition();
            return n = g || D(t, "view-direction") || o.viewDirection || n || "none", c(d(i), {
                transition: a,
                navBarTransition: "view" === l ? a : l,
                direction: n,
                shouldAnimate: "none" !== a && "none" !== n
            })
        }

        function d(e) {
            return e = e || {}, {
                viewId: e.viewId,
                historyId: e.historyId,
                stateId: e.stateId,
                stateName: e.stateName,
                stateParams: e.stateParams
            }
        }

        function h(e, t) {
            return arguments.length > 1 ? void D(e, T, t) : D(e, T)
        }

        function m(e) {
            if (e && e.length) {
                var t = e.scope();
                t && (t.$emit("$ionicView.unloaded", e.data(x)), t.$destroy()), e.remove()
            }
        }

        var v, g, $ = "webkitTransitionEnd transitionend", y = "$noCache", w = "$destroyEle", b = "$eleId", _ = "$accessed", S = "$fallbackTimer", x = "$viewData", T = "nav-view", E = "active", C = "cached", k = "stage", A = 0;
        ionic.transition = ionic.transition || {}, ionic.transition.isActive = !1;
        var M, D = ionic.DomUtil.cachedAttr, I = [], P = 1100, O = {
            create: function (t, l, p, T, M, N) {
                var B, V, L, R = ++A, H = {
                    init: function (e, t) {
                        O.isTransitioning(!0), H.loadViewElements(e), H.render(e, function () {
                            t && t()
                        })
                    }, loadViewElements: function (e) {
                        var n, i, r, o = t.getViewElements(), s = a(l, p), c = t.activeEleId();
                        for (n = 0, i = o.length; n < i && (r = o.eq(n), r.data(b) === s ? r.data(y) ? (r.data(b, s + ionic.Utils.nextUid()), r.data(w, !0)) : B = r : u(c) && r.data(b) === c && (V = r), !B || !V); n++);
                        L = !!B, L || (B = e.ele || O.createViewEle(l), B.data(b, s)), N && t.activeEleId(s), e.ele = null
                    }, render: function (e, n) {
                        if (L)ionic.Utils.reconnectScope(B.scope()); else {
                            h(B, k);
                            var i = f(l, B, e.direction, p), o = r.transitions.views[i.transition] || r.transitions.views.none;
                            o(B, null, i.direction, !0).run(0), B.data(x, {
                                viewId: i.viewId,
                                historyId: i.historyId,
                                stateName: i.stateName,
                                stateParams: i.stateParams
                            }), s(l).cache !== !1 && "false" !== s(l).cache && "false" != B.attr("cache-view") && 0 !== r.views.maxCache() || B.data(y, !0);
                            var a = t.appendViewElement(B, l);
                            delete i.direction, delete i.transition, a.$emit("$ionicView.loaded", i)
                        }
                        B.data(_, Date.now()), n && n()
                    }, transition: function (a, s, u) {
                        function m() {
                            h(B, U.shouldAnimate ? "entering" : E), h(V, U.shouldAnimate ? "leaving" : C), U.run(1), o._instances.forEach(function (e) {
                                e.triggerTransitionStart(R)
                            }), U.shouldAnimate || w()
                        }

                        function y(e) {
                            e.target === this && w()
                        }

                        function w() {
                            w.x || (w.x = !0, B.off($, y), e.cancel(B.data(S)), V && e.cancel(V.data(S)), H.emit("after", z, F), x && x.resolve(t), R === A && (n.all(I).then(O.transitionEnd), H.cleanup(z)), o._instances.forEach(function (e) {
                                e.triggerTransitionEnd()
                            }), v = g = p = T = B = V = null)
                        }

                        function b(e) {
                            e.target === this && _()
                        }

                        function _() {
                            h(B, C), h(V, E), B.off($, b), e.cancel(B.data(S)), O.transitionEnd([t])
                        }

                        var x, z = f(l, B, a, p), F = c(c({}, z), d(T));
                        z.transitionId = F.transitionId = R, z.fromCache = !!L, z.enableBack = !!s, z.renderStart = M, z.renderEnd = N, D(B.parent(), "nav-view-transition", z.transition), D(B.parent(), "nav-view-direction", z.direction), e.cancel(B.data(S));
                        var q = r.transitions.views[z.transition] || r.transitions.views.none, U = q(B, V, z.direction, z.shouldAnimate && u && N);
                        if (U.shouldAnimate && (B.on($, y), B.data(S, e(w, P)), i.show(P)), M && (H.emit("before", z, F), h(B, k), U.run(0)), N && (x = n.defer(), I.push(x.promise)), M && N)e(m, 16); else {
                            if (!N)return h(B, "entering"), h(V, "leaving"), {
                                run: U.run, cancel: function (t) {
                                    t ? (B.on($, b), B.data(S, e(_, P)), i.show(P)) : _(), U.shouldAnimate = t, U.run(0), U = null
                                }
                            };
                            N && m()
                        }
                    }, emit: function (e, t, n) {
                        var i = B.scope(), r = V && V.scope();
                        "after" == e && (i && i.$emit("$ionicView.enter", t), r ? r.$emit("$ionicView.leave", n) : i && n && n.viewId && i.$emit("$ionicNavView.leave", n)), i && i.$emit("$ionicView." + e + "Enter", t), r ? r.$emit("$ionicView." + e + "Leave", n) : i && n && n.viewId && i.$emit("$ionicNavView." + e + "Leave", n)
                    }, cleanup: function (e) {
                        V && "back" == e.direction && !r.views.forwardCache() && m(V);
                        var n, i, o, a = t.getViewElements(), s = a.length, c = s - 1 > r.views.maxCache(), l = Date.now();
                        for (n = 0; n < s; n++)i = a.eq(n), c && i.data(_) < l ? (l = i.data(_), o = a.eq(n)) : i.data(w) && h(i) != E && m(i);
                        m(o), B.data(y) && B.data(w, !0)
                    }, enteringEle: function () {
                        return B
                    }, leavingEle: function () {
                        return V
                    }
                };
                return H
            }, transitionEnd: function (e) {
                l(e, function (e) {
                    e.transitionEnd()
                }), O.isTransitioning(!1), i.hide(), I = []
            }, nextTransition: function (e) {
                v = e
            }, nextDirection: function (e) {
                g = e
            }, isTransitioning: function (t) {
                return arguments.length && (ionic.transition.isActive = !!t, e.cancel(M), t && (M = e(function () {
                    O.isTransitioning(!1)
                }, 999))), ionic.transition.isActive
            }, createViewEle: function (e) {
                var n = t[0].createElement("div");
                return e && e.$template && (n.innerHTML = e.$template, 1 === n.children.length) ? (n.children[0].classList.add("pane"), p(n.children[0])) : (n.className = "pane", p(n))
            }, viewEleIsActive: function (e, t) {
                h(e, t ? E : C)
            }, getTransitionData: f, navViewAttr: h, destroyViewEle: m
        };
        return O
    }]), angular.module("ngIOS9UIWebViewPatch", ["ng"]).config(["$provide", function (e) {
        "use strict";
        e.decorator("$browser", ["$delegate", "$window", function (e, t) {
            function n(e) {
                return /(iPhone|iPad|iPod).* OS 9_\d/.test(e) && !/Version\/9\./.test(e)
            }

            function i(e) {
                function t() {
                    n = null
                }

                var n = null, i = e.url;
                return e.url = function () {
                    return arguments.length ? (n = arguments[0], i.apply(e, arguments)) : n || i.apply(e, arguments)
                }, window.addEventListener("popstate", t, !1), window.addEventListener("hashchange", t, !1), e
            }

            return n(t.navigator.userAgent) ? i(e) : e
        }])
    }]), s.config(["$provide", function (e) {
        e.decorator("$compile", ["$delegate", function (e) {
            return e.$$addScopeInfo = function (e, t, n, i) {
                var r = n ? i ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                e.data(r, t)
            }, e
        }])
    }]), s.config(["$provide", function (e) {
        function t(e, t) {
            return e.__hash = e.hash, e.hash = function (n) {
                return u(n) && n.length > 0 && t(function () {
                    var e = document.querySelector(".scroll-content");
                    e && (e.scrollTop = 0)
                }, 0, !1), e.__hash(n)
            }, e
        }

        e.decorator("$location", ["$delegate", "$timeout", t])
    }]), s.controller("$ionicHeaderBar", ["$scope", "$element", "$attrs", "$q", "$ionicConfig", "$ionicHistory", function (e, t, n, i, r, o) {
        function a(e) {
            return x[e] || (x[e] = t[0].querySelector("." + e)), x[e]
        }

        var s = "title", c = "back-text", l = "back-button", u = "default-title", f = "previous-title", d = "hide", p = this, h = "", m = "", v = 0, g = 0, $ = "", y = !1, w = !0, b = !0, _ = !1, S = 0;
        p.beforeEnter = function (t) {
            e.$broadcast("$ionicView.beforeEnter", t)
        }, p.title = function (e) {
            return arguments.length && e !== h && (a(s).innerHTML = e, h = e, S = 0), h
        }, p.enableBack = function (e, t) {
            return arguments.length && (y = e, t || p.updateBackButton()), y
        }, p.showBack = function (e, t) {
            return arguments.length && (w = e, t || p.updateBackButton()), w
        }, p.showNavBack = function (e) {
            b = e, p.updateBackButton()
        }, p.updateBackButton = function () {
            var e;
            (w && b && y) !== _ && (_ = w && b && y, e = a(l), e && e.classList[_ ? "remove" : "add"](d)), y && (e = e || a(l), e && (p.backButtonIcon !== r.backButton.icon() && (e = a(l + " .icon"), e && (p.backButtonIcon = r.backButton.icon(), e.className = "icon " + p.backButtonIcon)), p.backButtonText !== r.backButton.text() && (e = a(l + " .back-text"), e && (e.textContent = p.backButtonText = r.backButton.text()))))
        }, p.titleTextWidth = function () {
            if (!S) {
                var e = ionic.DomUtil.getTextBounds(a(s));
                S = Math.min(e && e.width || 30)
            }
            return S
        }, p.titleWidth = function () {
            var e = p.titleTextWidth(), t = a(s).offsetWidth;
            return t < e && (e = t + (v - g - 5)), e
        }, p.titleTextX = function () {
            return t[0].offsetWidth / 2 - p.titleWidth() / 2
        }, p.titleLeftRight = function () {
            return v - g
        }, p.backButtonTextLeft = function () {
            for (var e = 0, t = a(c); t;)e += t.offsetLeft, t = t.parentElement;
            return e
        }, p.resetBackButton = function (e) {
            if (r.backButton.previousTitleText()) {
                var t = a(f);
                if (t) {
                    t.classList.remove(d);
                    var n = e && o.getViewById(e.viewId), i = o.backTitle(n);
                    i !== m && (m = t.innerHTML = i)
                }
                var s = a(u);
                s && s.classList.remove(d)
            }
        }, p.align = function (e) {
            var i = a(s);
            e = e || n.alignTitle || r.navBar.alignTitle();
            var o = p.calcWidths(e, !1);
            if (w && m && r.backButton.previousTitleText()) {
                var c = p.calcWidths(e, !0), l = t[0].offsetWidth - c.titleLeft - c.titleRight;
                p.titleTextWidth() <= l && (o = c)
            }
            return p.updatePositions(i, o.titleLeft, o.titleRight, o.buttonsLeft, o.buttonsRight, o.css, o.showPrevTitle)
        }, p.calcWidths = function (e, n) {
            var i, r, o, p, h, m, v, g, $, y = a(s), b = a(l), _ = t[0].childNodes, S = 0, x = 0, T = 0, E = 0, C = "", k = 0;
            for (i = 0; i < _.length; i++) {
                if (h = _[i], v = 0, 1 == h.nodeType) {
                    if (h === y) {
                        $ = !0;
                        continue
                    }
                    if (h.classList.contains(d))continue;
                    if (w && h === b) {
                        for (r = 0; r < h.childNodes.length; r++)if (p = h.childNodes[r], 1 == p.nodeType)if (p.classList.contains(c))for (o = 0; o < p.children.length; o++)if (m = p.children[o], n) {
                            if (m.classList.contains(u))continue;
                            k += m.offsetWidth
                        } else {
                            if (m.classList.contains(f))continue;
                            k += m.offsetWidth
                        } else k += p.offsetWidth; else 3 == p.nodeType && p.nodeValue.trim() && (g = ionic.DomUtil.getTextBounds(p), k += g && g.width || 0);
                        v = k || h.offsetWidth
                    } else v = h.offsetWidth
                } else 3 == h.nodeType && h.nodeValue.trim() && (g = ionic.DomUtil.getTextBounds(h), v = g && g.width || 0);
                $ ? x += v : S += v
            }
            if ("left" == e)C = "title-left", S && (T = S + 15), x && (E = x + 15); else if ("right" == e)C = "title-right", S && (T = S + 15), x && (E = x + 15); else {
                var A = Math.max(S, x) + 10;
                A > 10 && (T = E = A)
            }
            return {
                backButtonWidth: k,
                buttonsLeft: S,
                buttonsRight: x,
                titleLeft: T,
                titleRight: E,
                showPrevTitle: n,
                css: C
            }
        }, p.updatePositions = function (e, n, o, s, c, l, h) {
            var m = i.defer();
            if (e && (n !== v && (e.style.left = n ? n + "px" : "", v = n), o !== g && (e.style.right = o ? o + "px" : "", g = o), l !== $ && (l && e.classList.add(l), $ && e.classList.remove($), $ = l)), r.backButton.previousTitleText()) {
                var y = a(f), w = a(u);
                y && y.classList[h ? "remove" : "add"](d), w && w.classList[h ? "add" : "remove"](d)
            }
            return ionic.requestAnimationFrame(function () {
                if (e && e.offsetWidth + 10 < e.scrollWidth) {
                    var n = c + 5, i = t[0].offsetWidth - v - p.titleTextWidth() - 20;
                    o = i < n ? n : i, o !== g && (e.style.right = o + "px", g = o)
                }
                m.resolve()
            }), m.promise
        }, p.setCss = function (e, t) {
            ionic.DomUtil.cachedStyles(a(e), t)
        };
        var x = {};
        e.$on("$destroy", function () {
            for (var e in x)x[e] = null
        })
    }]), s.controller("$ionInfiniteScroll", ["$scope", "$attrs", "$element", "$timeout", function (e, t, n, i) {
        function r() {
            ionic.requestAnimationFrame(function () {
                n[0].classList.add("active")
            }), c.isLoading = !0, e.$parent && e.$parent.$apply(t.onInfinite || "")
        }

        function o() {
            ionic.requestAnimationFrame(function () {
                n[0].classList.remove("active")
            }), i(function () {
                c.jsScrolling && c.scrollView.resize(), (c.jsScrolling && c.scrollView.__container && c.scrollView.__container.offsetHeight > 0 || !c.jsScrolling) && c.checkBounds()
            }, 30, !1), c.isLoading = !1
        }

        function a() {
            if (!c.isLoading) {
                var e = {};
                if (c.jsScrolling) {
                    e = c.getJSMaxScroll();
                    var t = c.scrollView.getValues();
                    (e.left !== -1 && t.left >= e.left || e.top !== -1 && t.top >= e.top) && r()
                } else e = c.getNativeMaxScroll(), (e.left !== -1 && c.scrollEl.scrollLeft >= e.left - c.scrollEl.clientWidth || e.top !== -1 && c.scrollEl.scrollTop >= e.top - c.scrollEl.clientHeight) && r()
            }
        }

        function s(e) {
            var n = (t.distance || "2.5%").trim(), i = n.indexOf("%") !== -1;
            return i ? e * (1 - parseFloat(n) / 100) : e - parseFloat(n)
        }

        var c = this;
        c.isLoading = !1, e.icon = function () {
            return u(t.icon) ? t.icon : "ion-load-d"
        }, e.spinner = function () {
            return u(t.spinner) ? t.spinner : ""
        }, e.$on("scroll.infiniteScrollComplete", function () {
            o()
        }), e.$on("$destroy", function () {
            c.scrollCtrl && c.scrollCtrl.$element && c.scrollCtrl.$element.off("scroll", c.checkBounds), c.scrollEl && c.scrollEl.removeEventListener && c.scrollEl.removeEventListener("scroll", c.checkBounds)
        }), c.checkBounds = ionic.Utils.throttle(a, 300), c.getJSMaxScroll = function () {
            var e = c.scrollView.getScrollMax();
            return {
                left: c.scrollView.options.scrollingX ? s(e.left) : -1,
                top: c.scrollView.options.scrollingY ? s(e.top) : -1
            }
        }, c.getNativeMaxScroll = function () {
            var e = {
                left: c.scrollEl.scrollWidth,
                top: c.scrollEl.scrollHeight
            }, t = window.getComputedStyle(c.scrollEl) || {};
            return {
                left: "scroll" === t.overflowX || "auto" === t.overflowX || "scroll" === c.scrollEl.style["overflow-x"] ? s(e.left) : -1,
                top: "scroll" === t.overflowY || "auto" === t.overflowY || "scroll" === c.scrollEl.style["overflow-y"] ? s(e.top) : -1
            }
        }, c.__finishInfiniteScroll = o
    }]), s.service("$ionicListDelegate", ionic.DelegateService(["showReorder", "showDelete", "canSwipeItems", "closeOptionButtons"])).controller("$ionicList", ["$scope", "$attrs", "$ionicListDelegate", "$ionicHistory", function (e, t, n, i) {
        var r = this, o = !0, a = !1, s = !1, c = n._registerInstance(r, t.delegateHandle, function () {
            return i.isActiveScope(e)
        });
        e.$on("$destroy", c), r.showReorder = function (e) {
            return arguments.length && (a = !!e), a
        }, r.showDelete = function (e) {
            return arguments.length && (s = !!e), s
        }, r.canSwipeItems = function (e) {
            return arguments.length && (o = !!e), o
        }, r.closeOptionButtons = function () {
            r.listView && r.listView.clearDragEffects()
        }
    }]), s.controller("$ionicNavBar", ["$scope", "$element", "$attrs", "$compile", "$timeout", "$ionicNavBarDelegate", "$ionicConfig", "$ionicHistory", function (e, t, n, i, r, o, a, s) {
        function c(e, t) {
            var n = console.warn || console.log;
            n && n.call(console, "navBarController." + e + " is deprecated, please use " + t + " instead")
        }

        function f(e) {
            if (k[e])return p(k[e])
        }

        function d() {
            for (var e = 0; e < C.length; e++)if (C[e].isActive)return C[e]
        }

        function h() {
            for (var e = 0; e < C.length; e++)if (!C[e].isActive)return C[e]
        }

        function m(e, t) {
            e && ionic.DomUtil.cachedAttr(e.containerEle(), "nav-bar", t)
        }

        function v(e) {
            ionic.DomUtil.cachedAttr(t, "nav-swipe", e)
        }

        var g, $, y, w = "hide", b = "$ionNavBarController", _ = "primaryButtons", S = "secondaryButtons", x = "backButton", T = "primaryButtons secondaryButtons leftButtons rightButtons title".split(" "), E = this, C = [], k = {}, A = !0;
        t.parent().data(b, E);
        var M = n.delegateHandle || "navBar" + ionic.Utils.nextUid(), D = o._registerInstance(E, M);
        E.init = function () {
            t.addClass("nav-bar-container"), ionic.DomUtil.cachedAttr(t, "nav-bar-transition", a.views.transition()), E.createHeaderBar(!1), E.createHeaderBar(!0), e.$emit("ionNavBar.init", M)
        }, E.createHeaderBar = function (r) {
            function o(e, t) {
                e && ("title" === t ? v.append(e) : "rightButtons" == t || t == S && "left" != a.navBar.positionSecondaryButtons() || t == _ && "right" == a.navBar.positionPrimaryButtons() ? (m || (m = p('<div class="buttons buttons-right">'), d.append(m)), t == S ? m.append(e) : m.prepend(e)) : (h || (h = p('<div class="buttons buttons-left">'), g[x] ? g[x].after(h) : d.prepend(h)), t == S ? h.append(e) : h.prepend(e)))
            }

            var s = p('<div class="nav-bar-block">');
            ionic.DomUtil.cachedAttr(s, "nav-bar", r ? "active" : "cached");
            var c = n.alignTitle || a.navBar.alignTitle(), d = p("<ion-header-bar>").addClass(n["class"]).attr("align-title", c);
            u(n.noTapScroll) && d.attr("no-tap-scroll", n.noTapScroll);
            var h, m, v = p('<div class="title title-' + c + '">'), g = {}, $ = {};
            g[x] = f(x), g[x] && d.append(g[x]), d.append(v), l(T, function (e) {
                g[e] = f(e), o(g[e], e)
            });
            for (var y = 0; y < d[0].children.length; y++)d[0].children[y].classList.add("header-item");
            s.append(d), t.append(i(s)(e.$new()));
            var b = d.data("$ionHeaderBarController");
            b.backButtonIcon = a.backButton.icon(), b.backButtonText = a.backButton.text();
            var E = {
                isActive: r, title: function (e) {
                    b.title(e)
                }, setItem: function (e, t) {
                    E.removeItem(t), e ? ("title" === t && E.title(""), o(e, t), g[t] && g[t].addClass(w), $[t] = e) : g[t] && g[t].removeClass(w)
                }, removeItem: function (e) {
                    $[e] && ($[e].scope().$destroy(), $[e].remove(), $[e] = null)
                }, containerEle: function () {
                    return s
                }, headerBarEle: function () {
                    return d
                }, afterLeave: function () {
                    l(T, function (e) {
                        E.removeItem(e)
                    }), b.resetBackButton()
                }, controller: function () {
                    return b
                }, destroy: function () {
                    l(T, function (e) {
                        E.removeItem(e)
                    }), s.scope().$destroy();
                    for (var e in g)g[e] && (g[e].removeData(), g[e] = null);
                    h && h.removeData(), m && m.removeData(), v.removeData(), d.removeData(), s.remove(), s = d = v = h = m = null
                }
            };
            return C.push(E), E
        }, E.navElement = function (e, t) {
            return u(t) && (k[e] = t), k[e]
        }, E.update = function (e) {
            var t = !e.hasHeaderBar && e.showNavBar;
            e.transition = a.views.transition(), t || (e.direction = "none"), E.enable(t);
            var n = E.isInitialized ? h() : d(), i = E.isInitialized ? d() : null, r = n.controller();
            r.enableBack(e.enableBack, !0), r.showBack(e.showBack, !0), r.updateBackButton(), E.title(e.title, n), E.showBar(t), e.navBarItems && l(T, function (t) {
                n.setItem(e.navBarItems[t], t)
            }), E.transition(n, i, e), E.isInitialized = !0, v("")
        }, E.transition = function (n, i, o) {
            function s() {
                for (var e = 0; e < C.length; e++)C[e].isActive = !1;
                n.isActive = !0, m(n, "active"), m(i, "cached"), E.activeTransition = f = $ = null
            }

            var c = n.controller(), l = a.transitions.navBar[o.navBarTransition] || a.transitions.navBar.none, u = o.transitionId;
            c.beforeEnter(o);
            var f = l(n, i, o.direction, o.shouldAnimate && E.isInitialized);
            ionic.DomUtil.cachedAttr(t, "nav-bar-transition", o.navBarTransition), ionic.DomUtil.cachedAttr(t, "nav-bar-direction", o.direction), f.shouldAnimate && o.renderEnd ? m(n, "stage") : (m(n, "entering"), m(i, "leaving")), c.resetBackButton(o), f.run(0), E.activeTransition = {
                run: function (e) {
                    f.shouldAnimate = !1, f.direction = "back", f.run(e)
                }, cancel: function (t, r, o) {
                    v(r), m(i, "active"), m(n, "cached"), f.shouldAnimate = t, f.run(0), E.activeTransition = f = null;
                    var a;
                    o.showBar !== E.showBar() && E.showBar(o.showBar), o.showBackButton !== E.showBackButton() && E.showBackButton(o.showBackButton), a && e.$apply()
                }, complete: function (e, t) {
                    v(t), f.shouldAnimate = e, f.run(1), $ = s
                }
            }, r(c.align, 16), (g = function () {
                y === u && (m(n, "entering"), m(i, "leaving"), f.run(1), $ = function () {
                    y != u && f.shouldAnimate || s()
                }, g = null)
            })()
        }, E.triggerTransitionStart = function (e) {
            y = e, g && g()
        }, E.triggerTransitionEnd = function () {
            $ && $()
        }, E.showBar = function (t) {
            return arguments.length && (E.visibleBar(t), e.$parent.$hasHeader = !!t), !!e.$parent.$hasHeader
        }, E.visibleBar = function (e) {
            e && !A ? (t.removeClass(w), E.align()) : !e && A && t.addClass(w), A = e
        }, E.enable = function (e) {
            E.visibleBar(e);
            for (var t = 0; t < o._instances.length; t++)o._instances[t] !== E && o._instances[t].visibleBar(!1)
        }, E.showBackButton = function (t) {
            if (arguments.length) {
                for (var n = 0; n < C.length; n++)C[n].controller().showNavBack(!!t);
                e.$isBackButtonShown = !!t
            }
            return e.$isBackButtonShown
        }, E.showActiveBackButton = function (e) {
            var t = d();
            if (t)return arguments.length ? t.controller().showBack(e) : t.controller().showBack()
        }, E.title = function (t, n) {
            return u(t) && (t = t || "", n = n || d(), n && n.title(t), e.$title = t, s.currentTitle(t)), e.$title
        }, E.align = function (e, t) {
            t = t || d(), t && t.controller().align(e)
        }, E.hasTabsTop = function (e) {
            t[e ? "addClass" : "removeClass"]("nav-bar-tabs-top")
        }, E.hasBarSubheader = function (e) {
            t[e ? "addClass" : "removeClass"]("nav-bar-has-subheader")
        }, E.changeTitle = function (e) {
            c("changeTitle(val)", "title(val)"), E.title(e)
        }, E.setTitle = function (e) {
            c("setTitle(val)", "title(val)"), E.title(e)
        }, E.getTitle = function () {
            return c("getTitle()", "title()"), E.title()
        }, E.back = function () {
            c("back()", "$ionicHistory.goBack()"), s.goBack()
        }, E.getPreviousTitle = function () {
            c("getPreviousTitle()", "$ionicHistory.backTitle()"), s.goBack()
        }, e.$on("$destroy", function () {
            e.$parent.$hasHeader = !1, t.parent().removeData(b);
            for (var n = 0; n < C.length; n++)C[n].destroy();
            t.remove(), t = C = null, D()
        })
    }]), s.controller("$ionicNavView", ["$scope", "$element", "$attrs", "$compile", "$controller", "$ionicNavBarDelegate", "$ionicNavViewDelegate", "$ionicHistory", "$ionicViewSwitcher", "$ionicConfig", "$ionicScrollDelegate", function (e, t, n, i, r, o, a, s, l, u, f) {
        function d(e, n) {
            for (var i, r, o = t.children(), a = 0, s = o.length; a < s; a++)if (i = o.eq(a), A(i) == T) {
                r = i.scope(), r && r.$emit(e.name.replace("Tabs", "View"), n);
                break
            }
        }

        function p(e) {
            ionic.DomUtil.cachedAttr(t, "nav-swipe", e)
        }

        function h(e, t) {
            var n = v();
            n && n.hasTabsTop(t)
        }

        function m(e, t) {
            var n = v();
            n && n.hasBarSubheader(t)
        }

        function v() {
            if ($)for (var e = 0; e < o._instances.length; e++)if (o._instances[e].$$delegateHandle == $)return o._instances[e];
            return t.inheritedData("$ionNavBarController")
        }

        var g, $, y, w, b, _ = "$eleId", S = "$destroyEle", x = "$noCache", T = "active", E = "cached", C = this, k = !1, A = l.navViewAttr;
        C.scope = e, C.element = t, C.init = function () {
            var i = n.name || "", r = t.parent().inheritedData("$uiView"), o = r && r.state ? r.state.name : "";
            i.indexOf("@") < 0 && (i = i + "@" + o);
            var s = {name: i, state: null};
            t.data("$uiView", s);
            var c = a._registerInstance(C, n.delegateHandle);
            return e.$on("$destroy", function () {
                c(), C.isSwipeFreeze && f.freezeAllScrolls(!1)
            }), e.$on("$ionicHistory.deselect", C.cacheCleanup), e.$on("$ionicTabs.top", h), e.$on("$ionicSubheader", m), e.$on("$ionicTabs.beforeLeave", d), e.$on("$ionicTabs.afterLeave", d), e.$on("$ionicTabs.leave", d), ionic.Platform.ready(function () {
                ionic.Platform.isWebView() && u.views.swipeBackEnabled() && C.initSwipeBack()
            }), s
        }, C.register = function (t) {
            var n = c({}, s.currentView()), i = s.register(e, t);
            C.update(i);
            var r = s.getViewById(i.viewId) || {}, o = w !== i.viewId;
            C.render(i, t, r, n, o, !0)
        }, C.update = function (e) {
            k = !0, g = e.direction;
            var n = t.parent().inheritedData("$ionNavViewController");
            n && (n.isPrimary(!1), "enter" !== g && "exit" !== g || (n.direction(g), "enter" === g && (g = "none")))
        }, C.render = function (e, t, n, i, r, o) {
            var a = l.create(C, t, n, i, r, o);
            a.init(e, function () {
                a.transition(C.direction(), e.enableBack, !b), w = b = null
            })
        }, C.beforeEnter = function (e) {
            if (k) {
                $ = e.navBarDelegate;
                var t = v();
                t && t.update(e), p("")
            }
        }, C.activeEleId = function (e) {
            return arguments.length && (y = e), y
        }, C.transitionEnd = function () {
            var e, n, i, r = t.children();
            for (e = 0, n = r.length; e < n; e++)i = r.eq(e), i.data(_) === y ? A(i, T) : "leaving" !== A(i) && A(i) !== T && A(i) !== E || (i.data(S) || i.data(x) ? l.destroyViewEle(i) : (A(i, E), ionic.Utils.disconnectScope(i.scope())));
            p(""), C.isSwipeFreeze && f.freezeAllScrolls(!1)
        }, C.cacheCleanup = function () {
            for (var e = t.children(), n = 0, i = e.length; n < i; n++)e.eq(n).data(S) && l.destroyViewEle(e.eq(n))
        }, C.clearCache = function (e) {
            var n, i, r, o, a, s, c = t.children();
            for (r = 0, o = c.length; r < o; r++)if (n = c.eq(r), e)for (s = n.data(_), a = 0; a < e.length; a++)s === e[a] && l.destroyViewEle(n); else A(n) == E ? l.destroyViewEle(n) : A(n) == T && (i = n.scope(), i && i.$broadcast("$ionicView.clearCache"))
        }, C.getViewElements = function () {
            return t.children()
        }, C.appendViewElement = function (n, o) {
            var a = i(n);
            t.append(n);
            var s = e.$new();
            if (o && o.$$controller) {
                o.$scope = s;
                var c = r(o.$$controller, o);
                o.$$controllerAs && (s[o.$$controllerAs] = c), t.children().data("$ngControllerController", c)
            }
            return a(s), s
        }, C.title = function (e) {
            var t = v();
            t && t.title(e)
        }, C.enableBackButton = function (e) {
            var t = v();
            t && t.enableBackButton(e)
        }, C.showBackButton = function (e) {
            var t = v();
            return !t || (arguments.length ? t.showActiveBackButton(e) : t.showActiveBackButton())
        }, C.showBar = function (e) {
            var t = v();
            return !t || (arguments.length ? t.showBar(e) : t.showBar())
        }, C.isPrimary = function (e) {
            return arguments.length && (k = e), k
        }, C.direction = function (e) {
            return arguments.length && (g = e), g
        }, C.initSwipeBack = function () {
            function n(e) {
                if (k && (_ = o(e), !(_ > x))) {
                    h = s.backView();
                    var n = s.currentView();
                    if (h && h.historyId === n.historyId && n.canSwipeBack !== !1) {
                        y || (y = window.innerWidth), C.isSwipeFreeze = f.freezeAllScrolls(!0);
                        var a = {direction: "back"};
                        S = [], T = {showBar: C.showBar(), showBackButton: C.showBackButton()};
                        var u = l.create(C, a, h, n, !0, !1);
                        u.loadViewElements(a), u.render(a), c = u.transition("back", s.enabledBack(h), !0), d = v(), g = ionic.onGesture("drag", i, t[0]), $ = ionic.onGesture("release", r, t[0])
                    }
                }
            }

            function i(e) {
                if (k && c) {
                    var t = o(e);
                    if (S.push({t: Date.now(), x: t}), t >= y - 15)r(e); else {
                        var n = Math.min(Math.max(a(t), 0), 1);
                        c.run(n), d && d.activeTransition && d.activeTransition.run(n)
                    }
                }
            }

            function r(e) {
                if (k && c && S && S.length > 1) {
                    for (var t = Date.now(), n = o(e), s = S[S.length - 1], l = S.length - 2; l >= 0 && !(t - s.t > 200); l--)s = S[l];
                    var u = n >= S[S.length - 2].x, m = a(n), v = Math.abs(s.x - n) / (t - s.t);
                    if (w = h.viewId, b = m < .03 || m > .97, u && (m > .5 || v > .1)) {
                        var _ = v > .5 || v < .05 || n > y - 45 ? "fast" : "slow";
                        p(b ? "" : _), h.go(), d && d.activeTransition && d.activeTransition.complete(!b, _)
                    } else p(b ? "" : "fast"), w = null, c.cancel(!b), d && d.activeTransition && d.activeTransition.cancel(!b, "fast", T), b = null
                }
                ionic.offGesture(g, "drag", i), ionic.offGesture($, "release", r), y = c = S = null, C.isSwipeFreeze = f.freezeAllScrolls(!1)
            }

            function o(e) {
                return ionic.tap.pointerCoord(e.gesture.srcEvent).x
            }

            function a(e) {
                return (e - _) / y
            }

            var c, d, h, m, g, $, y, _, S, x = u.views.swipeBackHitWidth(), T = {};
            m = ionic.onGesture("dragstart", n, t[0]), e.$on("$destroy", function () {
                ionic.offGesture(m, "dragstart", n), ionic.offGesture(g, "drag", i), ionic.offGesture($, "release", r), C.element = c = d = null
            })
        }
    }]), s.controller("$ionicRefresher", ["$scope", "$attrs", "$element", "$ionicBind", "$timeout", function (e, t, n, i, r) {
        function o() {
            (I || S) && (M = null, S ? (S = !1, T = 0, E > C ? (v(), d(C, A)) : (d(0, A, m), x = !1)) : (T = 0, x = !1, f(!1)))
        }

        function a(e) {
            if (I && !(e.touches.length > 1)) {
                if (null === M && (M = parseInt(e.touches[0].screenY, 10)), ionic.Platform.isAndroid() && 4.4 === ionic.Platform.version() && 0 === w.scrollTop && (S = !0, e.preventDefault()), D = parseInt(e.touches[0].screenY, 10) - M, D - T <= 0 || 0 !== w.scrollTop)return x && (x = !1, f(!1)), S && l(w, parseInt(D - T, 10) * -1), void(0 !== E && c(0));
                D > 0 && 0 === w.scrollTop && !x && (T = D), e.preventDefault(), x || (x = !0, f(!0)), S = !0, c(parseInt((D - T) / 3, 10)), !k && E > C ? (k = !0, ionic.requestAnimationFrame(h)) : k && E < C && (k = !1, ionic.requestAnimationFrame(m))
            }
        }

        function s(e) {
            I = 0 === e.target.scrollTop || S
        }

        function c(e) {
            b.style[ionic.CSS.TRANSFORM] = "translateY(" + e + "px)", E = e
        }

        function l(e, t) {
            e.scrollTop = t;
            var n = document.createEvent("UIEvents");
            n.initUIEvent("scroll", !0, !0, window, 1), e.dispatchEvent(n)
        }

        function f(e) {
            e ? ionic.requestAnimationFrame(function () {
                b.classList.add("overscroll"), g()
            }) : ionic.requestAnimationFrame(function () {
                b.classList.remove("overscroll"), $(), m()
            })
        }

        function d(e, t, n) {
            function i(e) {
                return --e * e * e + 1
            }

            function r() {
                var s = Date.now(), l = Math.min(1, (s - o) / t), u = i(l);
                c(parseInt(u * (e - a) + a, 10)), l < 1 ? ionic.requestAnimationFrame(r) : (e < 5 && e > -5 && (x = !1, f(!1)), n && n())
            }

            var o = Date.now(), a = E;
            return a === e ? void n() : void ionic.requestAnimationFrame(r)
        }

        function p() {
            ionic.off("touchmove", a, b), ionic.off("touchend", o, b), ionic.off("scroll", s, w), w = null, b = null
        }

        function h() {
            n[0].classList.add("active"), e.$onPulling()
        }

        function m() {
            r(function () {
                n.removeClass("active refreshing refreshing-tail"), k && (k = !1)
            }, 150)
        }

        function v() {
            n[0].classList.add("refreshing"), e.$onRefresh()
        }

        function g() {
            n[0].classList.remove("invisible")
        }

        function $() {
            n[0].classList.add("invisible")
        }

        function y() {
            n[0].classList.add("refreshing-tail")
        }

        var w, b, _ = this, S = !1, x = !1, T = 0, E = 0, C = 60, k = !1, A = 500, M = null, D = null, I = !0;
        u(t.pullingIcon) || t.$set("pullingIcon", "ion-android-arrow-down"), e.showSpinner = !u(t.refreshingIcon) && "none" != t.spinner, e.showIcon = u(t.refreshingIcon), i(e, t, {
            pullingIcon: "@",
            pullingText: "@",
            refreshingIcon: "@",
            refreshingText: "@",
            spinner: "@",
            disablePullingRotation: "@",
            $onRefresh: "&onRefresh",
            $onPulling: "&onPulling"
        }), e.$on("scroll.refreshComplete", function () {
            r(function () {
                ionic.requestAnimationFrame(y), d(0, A, m), r(function () {
                    x && (x = !1, f(!1))
                }, A)
            }, A)
        }), _.init = function () {
            if (w = n.parent().parent()[0], b = n.parent()[0], !(w && w.classList.contains("ionic-scroll") && b && b.classList.contains("scroll")))throw new Error("Refresher must be immediate child of ion-content or ion-scroll");
            ionic.on("touchmove", a, b), ionic.on("touchend", o, b), ionic.on("scroll", s, w), e.$on("$destroy", p)
        }, _.getRefresherDomMethods = function () {
            return {activate: h, deactivate: m, start: v, show: g, hide: $, tail: y}
        }, _.__handleTouchmove = a, _.__getScrollChild = function () {
            return b
        }, _.__getScrollParent = function () {
            return w
        }
    }]), s.controller("$ionicScroll", ["$scope", "scrollViewOptions", "$timeout", "$window", "$location", "$document", "$ionicScrollDelegate", "$ionicHistory", function (e, t, n, i, r, o, a, s) {
        var c = this;
        c.__timeout = n, c._scrollViewOptions = t, c.isNative = function () {
            return !!t.nativeScrolling
        };
        var l, f = c.element = t.el, d = c.$element = p(f);
        l = c.isNative() ? c.scrollView = new ionic.views.ScrollNative(t) : c.scrollView = new ionic.views.Scroll(t), (d.parent().length ? d.parent() : d).data("$$ionicScrollController", c);
        var h = a._registerInstance(c, t.delegateHandle, function () {
            return s.isActiveScope(e)
        });
        u(t.bouncing) || ionic.Platform.ready(function () {
            l.options && (l.options.bouncing = !0, ionic.Platform.isAndroid() && (l.options.bouncing = !1, l.options.deceleration = .95))
        });
        var m = angular.bind(l, l.resize);
        angular.element(i).on("resize", m);
        var v = function (t) {
            var n = (t.originalEvent || t).detail || {};
            e.$onScroll && e.$onScroll({event: t, scrollTop: n.scrollTop || 0, scrollLeft: n.scrollLeft || 0})
        };
        d.on("scroll", v), e.$on("$destroy", function () {
            h(), l && l.__cleanup && l.__cleanup(), angular.element(i).off("resize", m), d.off("scroll", v), l = c.scrollView = t = c._scrollViewOptions = t.el = c._scrollViewOptions.el = d = c.$element = f = null
        }), n(function () {
            l && l.run && l.run()
        }), c.getScrollView = function () {
            return l
        }, c.getScrollPosition = function () {
            return l.getValues()
        }, c.resize = function () {
            return n(m, 0, !1).then(function () {
                d && d.triggerHandler("scroll-resize")
            })
        }, c.scrollTop = function (e) {
            c.resize().then(function () {
                l.scrollTo(0, 0, !!e)
            })
        }, c.scrollBottom = function (e) {
            c.resize().then(function () {
                var t = l.getScrollMax();
                l.scrollTo(t.left, t.top, !!e)
            })
        }, c.scrollTo = function (e, t, n) {
            c.resize().then(function () {
                l.scrollTo(e, t, !!n)
            })
        }, c.zoomTo = function (e, t, n, i) {
            c.resize().then(function () {
                l.zoomTo(e, !!t, n, i)
            })
        }, c.zoomBy = function (e, t, n, i) {
            c.resize().then(function () {
                l.zoomBy(e, !!t, n, i)
            })
        }, c.scrollBy = function (e, t, n) {
            c.resize().then(function () {
                l.scrollBy(e, t, !!n)
            })
        }, c.anchorScroll = function (e) {
            c.resize().then(function () {
                var t = r.hash(), n = t && o[0].getElementById(t);
                if (!t || !n)return void l.scrollTo(0, 0, !!e);
                var i = n, a = 0, s = 0;
                do null !== i && (a += i.offsetLeft), null !== i && (s += i.offsetTop), i = i.offsetParent; while (i.attributes != c.element.attributes && i.offsetParent);
                l.scrollTo(a, s, !!e)
            })
        }, c.freezeScroll = l.freeze, c.freezeAllScrolls = function (e) {
            for (var t = 0; t < a._instances.length; t++)a._instances[t].freezeScroll(e)
        }, c._setRefresher = function (e, t, n) {
            c.refresher = t;
            var i = c.refresher.clientHeight || 60;
            l.activatePullToRefresh(i, n)
        }
    }]), s.controller("$ionicSideMenus", ["$scope", "$attrs", "$ionicSideMenuDelegate", "$ionicPlatform", "$ionicBody", "$ionicHistory", "$ionicScrollDelegate", "IONIC_BACK_PRIORITY", "$rootScope", function (e, t, n, i, r, o, a, s, c) {
        function l(e) {
            e && !y.isScrollFreeze ? a.freezeAllScrolls(e) : !e && y.isScrollFreeze && a.freezeAllScrolls(!1), y.isScrollFreeze = e
        }

        var u, d, p, m, v, g, $, y = this, w = !0;
        y.$scope = e, y.initialize = function (e) {
            y.left = e.left, y.right = e.right, y.setContent(e.content), y.dragThresholdX = e.dragThresholdX || 10, o.registerHistory(y.$scope)
        }, y.setContent = function (e) {
            e && (y.content = e, y.content.onDrag = function (e) {
                y._handleDrag(e)
            }, y.content.endDrag = function (e) {
                y._endDrag(e)
            })
        }, y.isOpenLeft = function () {
            return y.getOpenAmount() > 0
        }, y.isOpenRight = function () {
            return y.getOpenAmount() < 0
        }, y.toggleLeft = function (e) {
            if (!$ && y.left.isEnabled) {
                var t = y.getOpenAmount();
                0 === arguments.length && (e = t <= 0), y.content.enableAnimation(), e ? (y.openPercentage(100), c.$emit("$ionicSideMenuOpen", "left")) : (y.openPercentage(0), c.$emit("$ionicSideMenuClose", "left"))
            }
        }, y.toggleRight = function (e) {
            if (!$ && y.right.isEnabled) {
                var t = y.getOpenAmount();
                0 === arguments.length && (e = t >= 0), y.content.enableAnimation(), e ? (y.openPercentage(-100), c.$emit("$ionicSideMenuOpen", "right")) : (y.openPercentage(0), c.$emit("$ionicSideMenuClose", "right"))
            }
        }, y.toggle = function (e) {
            "right" == e ? y.toggleRight() : y.toggleLeft()
        }, y.close = function () {
            y.openPercentage(0), c.$emit("$ionicSideMenuClose", "left"), c.$emit("$ionicSideMenuClose", "right")
        }, y.getOpenAmount = function () {
            return y.content && y.content.getTranslateX() || 0
        }, y.getOpenRatio = function () {
            var e = y.getOpenAmount();
            return e >= 0 ? e / y.left.width : e / y.right.width
        }, y.isOpen = function () {
            return 0 !== y.getOpenAmount()
        }, y.getOpenPercentage = function () {
            return 100 * y.getOpenRatio()
        }, y.openPercentage = function (e) {
            var t = e / 100;
            y.left && e >= 0 ? y.openAmount(y.left.width * t) : y.right && e < 0 && y.openAmount(y.right.width * t), r.enableClass(0 !== e, "menu-open"), l(!1)
        }, y.openAmount = function (e) {
            var t = y.left && y.left.width || 0, n = y.right && y.right.width || 0;
            return (y.left && y.left.isEnabled || !(e > 0)) && (y.right && y.right.isEnabled || !(e < 0)) ? d && e > t ? void y.content.setTranslateX(t) : u && e < -n ? void y.content.setTranslateX(-n) : (y.content.setTranslateX(e), void(e >= 0 ? (d = !0, u = !1, e > 0 && (y.right && y.right.pushDown && y.right.pushDown(), y.left && y.left.bringUp && y.left.bringUp())) : (u = !0, d = !1, y.right && y.right.bringUp && y.right.bringUp(), y.left && y.left.pushDown && y.left.pushDown()))) : void y.content.setTranslateX(0)
        }, y.snapToRest = function (e) {
            y.content.enableAnimation(), p = !1;
            var t = y.getOpenRatio();
            if (0 === t)return void y.openPercentage(0);
            var n = .3, i = e.gesture.velocityX, r = e.gesture.direction;
            t > 0 && t < .5 && "right" == r && i < n ? y.openPercentage(0) : t > .5 && "left" == r && i < n ? y.openPercentage(100) : t < 0 && t > -.5 && "left" == r && i < n ? y.openPercentage(0) : t < .5 && "right" == r && i < n ? y.openPercentage(-100) : "right" == r && t >= 0 && (t >= .5 || i > n) ? y.openPercentage(100) : "left" == r && t <= 0 && (t <= -.5 || i > n) ? y.openPercentage(-100) : y.openPercentage(0)
        }, y.enableMenuWithBackViews = function (e) {
            return arguments.length && (w = !!e), w
        }, y.isAsideExposed = function () {
            return !!$
        }, y.exposeAside = function (e) {
            (y.left && y.left.isEnabled || y.right && y.right.isEnabled) && (y.close(), $ = e, y.left && y.left.isEnabled ? y.content.setMarginLeft($ ? y.left.width : 0) : y.right && y.right.isEnabled && y.content.setMarginRight($ ? y.right.width : 0), y.$scope.$emit("$ionicExposeAside", $))
        }, y.activeAsideResizing = function (e) {
            r.enableClass(e, "aside-resizing")
        }, y._endDrag = function (e) {
            l(!1), $ || (p && y.snapToRest(e), m = null, v = null, g = null)
        }, y._handleDrag = function (t) {
            !$ && e.dragContent && (m ? v = t.gesture.touches[0].pageX : (m = t.gesture.touches[0].pageX, v = m), !p && Math.abs(v - m) > y.dragThresholdX && (m = v, p = !0, y.content.disableAnimation(), g = y.getOpenAmount()), p && (y.openAmount(g + (v - m)), l(!0)))
        }, y.canDragContent = function (t) {
            return arguments.length && (e.dragContent = !!t), e.dragContent
        }, y.edgeThreshold = 25, y.edgeThresholdEnabled = !1, y.edgeDragThreshold = function (e) {
            return arguments.length && (f(e) && e > 0 ? (y.edgeThreshold = e, y.edgeThresholdEnabled = !0) : y.edgeThresholdEnabled = !!e), y.edgeThresholdEnabled
        }, y.isDraggableTarget = function (t) {
            var n = y.edgeThresholdEnabled && !y.isOpen(), i = t.gesture.startEvent && t.gesture.startEvent.center && t.gesture.startEvent.center.pageX, r = !n || i <= y.edgeThreshold || i >= y.content.element.offsetWidth - y.edgeThreshold, a = o.backView(), s = !!w || !a;
            if (!s) {
                var c = o.currentView() || {};
                return a.historyId !== c.historyId
            }
            return (e.dragContent || y.isOpen()) && r && !t.gesture.srcEvent.defaultPrevented && s && !t.target.tagName.match(/input|textarea|select|object|embed/i) && !t.target.isContentEditable && !(t.target.dataset ? t.target.dataset.preventScroll : "true" == t.target.getAttribute("data-prevent-scroll"))
        }, e.sideMenuContentTranslateX = 0;
        var b = h, _ = angular.bind(y, y.close);
        e.$watch(function () {
            return 0 !== y.getOpenAmount()
        }, function (e) {
            b(), e && (b = i.registerBackButtonAction(_, s.sideMenu))
        });
        var S = n._registerInstance(y, t.delegateHandle, function () {
            return o.isActiveScope(e)
        });
        e.$on("$destroy", function () {
            S(), b(), y.$scope = null, y.content && (y.content.element = null, y.content = null), l(!1)
        }), y.initialize({left: {width: 275}, right: {width: 275}})
    }]), function (e) {
        function t(e, i, r, o) {
            var a, s, c, l = document.createElement(d[e] || e);
            for (a in i)if (angular.isArray(i[a]))for (s = 0; s < i[a].length; s++)if (i[a][s].fn)for (c = 0; c < i[a][s].t; c++)t(a, i[a][s].fn(c, o), l, o); else t(a, i[a][s], l, o); else n(l, a, i[a]);
            r.appendChild(l)
        }

        function n(e, t, n) {
            e.setAttribute(d[t] || t, n)
        }

        function i(e, t) {
            var n = e.split(";"), i = n.slice(t), r = n.slice(0, n.length - i.length);
            return n = i.concat(r).reverse(), n.join(";") + ";" + n[0]
        }

        function r(e, t) {
            return e /= t / 2, e < 1 ? .5 * e * e * e : (e -= 2, .5 * (e * e * e + 2))
        }

        var o = "translate(32,32)", a = "stroke-opacity", c = "round", l = "indefinite", u = "750ms", f = "none", d = {
            a: "animate",
            an: "attributeName",
            at: "animateTransform",
            c: "circle",
            da: "stroke-dasharray",
            os: "stroke-dashoffset",
            f: "fill",
            lc: "stroke-linecap",
            rc: "repeatCount",
            sw: "stroke-width",
            t: "transform",
            v: "values"
        }, p = {v: "0,32,32;360,32,32", an: "transform", type: "rotate", rc: l, dur: u}, h = {
            sw: 4,
            lc: c,
            line: [{
                fn: function (e, t) {
                    return {
                        y1: "ios" == t ? 17 : 12,
                        y2: "ios" == t ? 29 : 20,
                        t: o + " rotate(" + (30 * e + (e < 6 ? 180 : -180)) + ")",
                        a: [{
                            fn: function () {
                                return {an: a, dur: u, v: i("0;.1;.15;.25;.35;.45;.55;.65;.7;.85;1", e), rc: l}
                            }, t: 1
                        }]
                    }
                }, t: 12
            }]
        }, m = {
            android: {c: [{sw: 6, da: 128, os: 82, r: 26, cx: 32, cy: 32, f: f}]},
            ios: h,
            "ios-small": h,
            bubbles: {
                sw: 0, c: [{
                    fn: function (e) {
                        return {
                            cx: 24 * Math.cos(2 * Math.PI * e / 8),
                            cy: 24 * Math.sin(2 * Math.PI * e / 8),
                            t: o,
                            a: [{
                                fn: function () {
                                    return {an: "r", dur: u, v: i("1;2;3;4;5;6;7;8", e), rc: l}
                                }, t: 1
                            }]
                        }
                    }, t: 8
                }]
            },
            circles: {
                c: [{
                    fn: function (e) {
                        return {
                            r: 5,
                            cx: 24 * Math.cos(2 * Math.PI * e / 8),
                            cy: 24 * Math.sin(2 * Math.PI * e / 8),
                            t: o,
                            sw: 0,
                            a: [{
                                fn: function () {
                                    return {an: "fill-opacity", dur: u, v: i(".3;.3;.3;.4;.7;.85;.9;1", e), rc: l}
                                }, t: 1
                            }]
                        }
                    }, t: 8
                }]
            },
            crescent: {c: [{sw: 4, da: 128, os: 82, r: 26, cx: 32, cy: 32, f: f, at: [p]}]},
            dots: {
                c: [{
                    fn: function (e) {
                        return {
                            cx: 16 + 16 * e, cy: 32, sw: 0, a: [{
                                fn: function () {
                                    return {an: "fill-opacity", dur: u, v: i(".5;.6;.8;1;.8;.6;.5", e), rc: l}
                                }, t: 1
                            }, {
                                fn: function () {
                                    return {an: "r", dur: u, v: i("4;5;6;5;4;3;3", e), rc: l}
                                }, t: 1
                            }]
                        }
                    }, t: 3
                }]
            },
            lines: {
                sw: 7, lc: c, line: [{
                    fn: function (e) {
                        return {
                            x1: 10 + 14 * e, x2: 10 + 14 * e, a: [{
                                fn: function () {
                                    return {an: "y1", dur: u, v: i("16;18;28;18;16", e), rc: l}
                                }, t: 1
                            }, {
                                fn: function () {
                                    return {an: "y2", dur: u, v: i("48;44;36;46;48", e), rc: l}
                                }, t: 1
                            }, {
                                fn: function () {
                                    return {an: a, dur: u, v: i("1;.8;.5;.4;1", e), rc: l}
                                }, t: 1
                            }]
                        }
                    }, t: 4
                }]
            },
            ripple: {
                f: f, "fill-rule": "evenodd", sw: 3, circle: [{
                    fn: function (e) {
                        return {
                            cx: 32, cy: 32, a: [{
                                fn: function () {
                                    return {
                                        an: "r",
                                        begin: e * -1 + "s",
                                        dur: "2s",
                                        v: "0;24",
                                        keyTimes: "0;1",
                                        keySplines: "0.1,0.2,0.3,1",
                                        calcMode: "spline",
                                        rc: l
                                    }
                                }, t: 1
                            }, {
                                fn: function () {
                                    return {an: a, begin: e * -1 + "s", dur: "2s", v: ".2;1;.2;0", rc: l}
                                }, t: 1
                            }]
                        }
                    }, t: 2
                }]
            },
            spiral: {
                defs: [{
                    linearGradient: [{
                        id: "sGD",
                        gradientUnits: "userSpaceOnUse",
                        x1: 55,
                        y1: 46,
                        x2: 2,
                        y2: 46,
                        stop: [{offset: .1, "class": "stop1"}, {offset: 1, "class": "stop2"}]
                    }]
                }],
                g: [{
                    sw: 4,
                    lc: c,
                    f: f,
                    path: [{
                        stroke: "url(#sGD)",
                        d: "M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"
                    }, {d: "M60,32 C60,16,47.464,4,32,4S4,16,4,32"}],
                    at: [p]
                }]
            }
        }, v = {
            android: function (t) {
                function i() {
                    var t = r(Date.now() - o, 650), u = 1, f = 0, d = 188 - 58 * t, p = 182 - 182 * t;
                    a % 2 && (u = -1, f = -64, d = 128 - -58 * t, p = 182 * t);
                    var h = [0, -101, -90, -11, -180, 79, -270, -191][a];
                    n(l, "da", Math.max(Math.min(d, 188), 128)), n(l, "os", Math.max(Math.min(p, 182), 0)), n(l, "t", "scale(" + u + ",1) translate(" + f + ",0) rotate(" + h + ",32,32)"), s += 4.1, s > 359 && (s = 0), n(c, "t", "rotate(" + s + ",32,32)"), t >= 1 && (a++, a > 7 && (a = 0), o = Date.now()), e.requestAnimationFrame(i)
                }

                var o, a = 0, s = 0, c = t.querySelector("g"), l = t.querySelector("circle");
                return function () {
                    o = Date.now(), i()
                }
            }
        };
        s.controller("$ionicSpinner", ["$element", "$attrs", "$ionicConfig", function (e, n, i) {
            var r;
            this.init = function () {
                r = n.icon || i.spinner.icon();
                var o = document.createElement("div");
                return t("svg", {viewBox: "0 0 64 64", g: [m[r]]}, o, r), e.html(o.innerHTML), this.start(), r
            }, this.start = function () {
                v[r] && v[r](e[0])()
            }
        }])
    }(ionic), s.controller("$ionicTab", ["$scope", "$ionicHistory", "$attrs", "$location", "$state", function (e, t, n, i, r) {
        this.$scope = e, this.hrefMatchesState = function () {
            return n.href && 0 === i.path().indexOf(n.href.replace(/^#/, "").replace(/\/$/, ""))
        }, this.srefMatchesState = function () {
            return n.uiSref && r.includes(n.uiSref.split("(")[0])
        }, this.navNameMatchesState = function () {
            return this.navViewName && t.isCurrentStateNavView(this.navViewName)
        }, this.tabMatchesState = function () {
            return this.hrefMatchesState() || this.srefMatchesState() || this.navNameMatchesState()
        }
    }]), s.controller("$ionicTabs", ["$scope", "$element", "$ionicHistory", function (e, t, n) {
        var i, r = this, o = null, a = null;
        r.tabs = [], r.selectedIndex = function () {
            return r.tabs.indexOf(o)
        }, r.selectedTab = function () {
            return o
        }, r.previousSelectedTab = function () {
            return a
        }, r.add = function (e) {
            n.registerHistory(e), r.tabs.push(e)
        }, r.remove = function (e) {
            var t = r.tabs.indexOf(e);
            if (t !== -1) {
                if (e.$tabSelected)if (r.deselect(e), 1 === r.tabs.length); else {
                    var n = t === r.tabs.length - 1 ? t - 1 : t + 1;
                    r.select(r.tabs[n])
                }
                r.tabs.splice(t, 1)
            }
        }, r.deselect = function (e) {
            e.$tabSelected && (a = o, o = i = null, e.$tabSelected = !1, (e.onDeselect || h)(), e.$broadcast && e.$broadcast("$ionicHistory.deselect"))
        }, r.select = function (t, a) {
            var s;
            if (f(t)) {
                if (s = t, s >= r.tabs.length)return;
                t = r.tabs[s]
            } else s = r.tabs.indexOf(t);
            1 === arguments.length && (a = !(!t.navViewName && !t.uiSref)), o && o.$historyId == t.$historyId ? a && n.goToHistoryRoot(t.$historyId) : i !== s && (l(r.tabs, function (e) {
                r.deselect(e)
            }), o = t, i = s, r.$scope && r.$scope.$parent && (r.$scope.$parent.$activeHistoryId = t.$historyId), t.$tabSelected = !0, (t.onSelect || h)(), a && e.$emit("$ionicHistory.change", {
                type: "tab",
                tabIndex: s,
                historyId: t.$historyId,
                navViewName: t.navViewName,
                hasNavView: !!t.navViewName,
                title: t.title,
                url: t.href,
                uiSref: t.uiSref
            }))
        }, r.hasActiveScope = function () {
            for (var e = 0; e < r.tabs.length; e++)if (n.isActiveScope(r.tabs[e]))return !0;
            return !1
        }
    }]), s.controller("$ionicView", ["$scope", "$element", "$attrs", "$compile", "$rootScope", function (e, t, n, i, r) {
        function o() {
            var t = u(n.viewTitle) && "viewTitle" || u(n.title) && "title";
            t && (a(n[t]), $.push(n.$observe(t, a))), u(n.hideBackButton) && $.push(e.$watch(n.hideBackButton, function (e) {
                d.showBackButton(!e)
            })), u(n.hideNavBar) && $.push(e.$watch(n.hideNavBar, function (e) {
                d.showBar(!e)
            }))
        }

        function a(e) {
            u(e) && e !== m && (m = e, d.title(m))
        }

        function s() {
            for (var e = 0; e < $.length; e++)$[e]();
            $ = []
        }

        function l(t) {
            if (t)return i(t)(e.$new())
        }

        function f(t) {
            return !!e.$eval(n[t])
        }

        var d, p, h, m, v = this, g = {}, $ = [], y = e.$on("ionNavBar.init", function (e, t) {
            e.stopPropagation(), p = t
        });
        v.init = function () {
            y();
            var n = t.inheritedData("$ionModalController");
            d = t.inheritedData("$ionNavViewController"), d && !n && (e.$on("$ionicView.beforeEnter", v.beforeEnter), e.$on("$ionicView.afterEnter", o), e.$on("$ionicView.beforeLeave", s))
        }, v.beforeEnter = function (t, i) {
            if (i && !i.viewNotified) {
                i.viewNotified = !0, r.$$phase || e.$digest(), m = u(n.viewTitle) ? n.viewTitle : n.title;
                var o = {};
                for (var a in g)o[a] = l(g[a]);
                d.beforeEnter(c(i, {
                    title: m,
                    showBack: !f("hideBackButton"),
                    navBarItems: o,
                    navBarDelegate: p || null,
                    showNavBar: !f("hideNavBar"),
                    hasHeaderBar: !!h
                })), s()
            }
        }, v.navElement = function (e, t) {
            g[e] = t
        }
    }]), s.directive("ionActionSheet", ["$document", function (e) {
        return {
            restrict: "E",
            scope: !0,
            replace: !0,
            link: function (t, n) {
                var i = function (e) {
                    27 == e.which && (t.cancel(), t.$apply())
                }, r = function (e) {
                    e.target == n[0] && (t.cancel(), t.$apply())
                };
                t.$on("$destroy", function () {
                    n.remove(), e.unbind("keyup", i)
                }), e.bind("keyup", i), n.bind("click", r)
            },
            template: '<div class="action-sheet-backdrop"><div class="action-sheet-wrapper"><div class="action-sheet" ng-class="{\'action-sheet-has-icons\': $actionSheetHasIcon}"><div class="action-sheet-group action-sheet-options"><div class="action-sheet-title" ng-if="titleText" ng-bind-html="titleText"></div><button class="button action-sheet-option" ng-click="buttonClicked($index)" ng-repeat="b in buttons" ng-bind-html="b.text"></button><button class="button destructive action-sheet-destructive" ng-if="destructiveText" ng-click="destructiveButtonClicked()" ng-bind-html="destructiveText"></button></div><div class="action-sheet-group action-sheet-cancel" ng-if="cancelText"><button class="button" ng-click="cancel()" ng-bind-html="cancelText"></button></div></div></div></div>'
        }
    }]), s.directive("ionCheckbox", ["$ionicConfig", function (e) {
        return {
            restrict: "E",
            replace: !0,
            require: "?ngModel",
            transclude: !0,
            template: '<label class="item item-checkbox"><div class="checkbox checkbox-input-hidden disable-pointer-events"><input type="checkbox"><i class="checkbox-icon"></i></div><div class="item-content disable-pointer-events" ng-transclude></div></label>',
            compile: function (t, n) {
                var i = t.find("input");
                l({
                    name: n.name,
                    "ng-value": n.ngValue,
                    "ng-model": n.ngModel,
                    "ng-checked": n.ngChecked,
                    "ng-disabled": n.ngDisabled,
                    "ng-true-value": n.ngTrueValue,
                    "ng-false-value": n.ngFalseValue,
                    "ng-change": n.ngChange,
                    "ng-required": n.ngRequired,
                    required: n.required
                }, function (e, t) {
                    u(e) && i.attr(t, e)
                });
                var r = t[0].querySelector(".checkbox");
                r.classList.add("checkbox-" + e.form.checkbox())
            }
        }
    }]), s.directive("collectionRepeat", e).factory("$ionicCollectionManager", t);
    var w = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", b = /height:.*?px;\s*width:.*?px/, _ = 3;
    e.$inject = ["$ionicCollectionManager", "$parse", "$window", "$$rAF", "$rootScope", "$timeout"], t.$inject = ["$rootScope", "$window", "$$rAF"], s.directive("ionContent", ["$timeout", "$controller", "$ionicBind", "$ionicConfig", function (e, t, n, i) {
        return {
            restrict: "E", require: "^?ionNavView", scope: !0, priority: 800, compile: function (e, r) {
                function o(e, i, o) {
                    function l() {
                        e.$onScrollComplete({
                            scrollTop: s.scrollView.__scrollTop,
                            scrollLeft: s.scrollView.__scrollLeft
                        })
                    }

                    var f = e.$parent;
                    if (e.$watch(function () {
                            return (f.$hasHeader ? " has-header" : "") + (f.$hasSubheader ? " has-subheader" : "") + (f.$hasFooter ? " has-footer" : "") + (f.$hasSubfooter ? " has-subfooter" : "") + (f.$hasTabs ? " has-tabs" : "") + (f.$hasTabsTop ? " has-tabs-top" : "")
                        }, function (e, t) {
                            i.removeClass(t), i.addClass(e)
                        }), e.$hasHeader = e.$hasSubheader = e.$hasFooter = e.$hasSubfooter = e.$hasTabs = e.$hasTabsTop = !1, n(e, o, {
                            $onScroll: "&onScroll",
                            $onScrollComplete: "&onScrollComplete",
                            hasBouncing: "@",
                            padding: "@",
                            direction: "@",
                            scrollbarX: "@",
                            scrollbarY: "@",
                            startX: "@",
                            startY: "@",
                            scrollEventInterval: "@"
                        }), e.direction = e.direction || "y", u(o.padding) && e.$watch(o.padding, function (e) {
                            (a || i).toggleClass("padding", !!e)
                        }), "false" === o.scroll); else {
                        var d = {};
                        c ? (i.addClass("overflow-scroll"), d = {
                            el: i[0],
                            delegateHandle: r.delegateHandle,
                            startX: e.$eval(e.startX) || 0,
                            startY: e.$eval(e.startY) || 0,
                            nativeScrolling: !0
                        }) : d = {
                            el: i[0],
                            delegateHandle: r.delegateHandle,
                            locking: "true" === (r.locking || "true"),
                            bouncing: e.$eval(e.hasBouncing),
                            startX: e.$eval(e.startX) || 0,
                            startY: e.$eval(e.startY) || 0,
                            scrollbarX: e.$eval(e.scrollbarX) !== !1,
                            scrollbarY: e.$eval(e.scrollbarY) !== !1,
                            scrollingX: e.direction.indexOf("x") >= 0,
                            scrollingY: e.direction.indexOf("y") >= 0,
                            scrollEventInterval: parseInt(e.scrollEventInterval, 10) || 10,
                            scrollingComplete: l
                        }, s = t("$ionicScroll", {$scope: e, scrollViewOptions: d}), e.$on("$destroy", function () {
                            d && (d.scrollingComplete = h, delete d.el), a = null, i = null, r.$$element = null
                        })
                    }
                }

                var a, s;
                e.addClass("scroll-content ionic-scroll"), "false" != r.scroll ? (a = p('<div class="scroll"></div>'), a.append(e.contents()), e.append(a)) : e.addClass("scroll-content-false");
                var c = "true" === r.overflowScroll || !i.scrolling.jsScrolling();
                return c && (c = !e[0].querySelector("[collection-repeat]")), {pre: o}
            }
        }
    }]), s.directive("exposeAsideWhen", ["$window", function (e) {
        return {
            restrict: "A", require: "^ionSideMenus", link: function (t, n, i, r) {
                function o() {
                    var t = "large" == i.exposeAsideWhen ? "(min-width:768px)" : i.exposeAsideWhen;
                    r.exposeAside(e.matchMedia(t).matches), r.activeAsideResizing(!1)
                }

                function a() {
                    r.activeAsideResizing(!0), s()
                }

                var s = ionic.debounce(function () {
                    t.$apply(o)
                }, 300, !1);
                t.$evalAsync(o), ionic.on("resize", a, e), t.$on("$destroy", function () {
                    ionic.off("resize", a, e)
                })
            }
        }
    }]);
    var S = "onHold onTap onDoubleTap onTouch onRelease onDragStart onDrag onDragEnd onDragUp onDragRight onDragDown onDragLeft onSwipe onSwipeUp onSwipeRight onSwipeDown onSwipeLeft".split(" ");
    S.forEach(function (e) {
        s.directive(e, n(e))
    }), s.directive("ionHeaderBar", i()).directive("ionHeaderBar", r(!0)).directive("ionFooterBar", r(!1)), s.directive("ionInfiniteScroll", ["$timeout", function (e) {
        return {
            restrict: "E", require: ["?^$ionicScroll", "ionInfiniteScroll"], template: function (e, t) {
                return t.icon ? '<i class="icon {{icon()}} icon-refreshing {{scrollingType}}"></i>' : '<ion-spinner icon="{{spinner()}}"></ion-spinner>'
            }, scope: !0, controller: "$ionInfiniteScroll", link: function (t, n, i, r) {
                var o = r[1], a = o.scrollCtrl = r[0], s = o.jsScrolling = !a.isNative();
                if (s)o.scrollView = a.scrollView, t.scrollingType = "js-scrolling", a.$element.on("scroll", o.checkBounds); else {
                    var c = ionic.DomUtil.getParentOrSelfWithClass(n[0].parentNode, "overflow-scroll");
                    if (o.scrollEl = c, !c)throw"Infinite scroll must be used inside a scrollable div";
                    o.scrollEl.addEventListener("scroll", o.checkBounds)
                }
                var l = !u(i.immediateCheck) || t.$eval(i.immediateCheck);
                l && e(function () {
                    o.checkBounds()
                })
            }
        }
    }]), s.directive("ionItem", ["$$rAF", function (e) {
        return {
            restrict: "E", controller: ["$scope", "$element", function (e, t) {
                this.$scope = e, this.$element = t
            }], scope: !0, compile: function (t, n) {
                var i = u(n.href) || u(n.ngHref) || u(n.uiSref), r = i || /ion-(delete|option|reorder)-button/i.test(t.html());
                if (r) {
                    var o = p(i ? "<a></a>" : "<div></div>");
                    o.addClass("item-content"), (u(n.href) || u(n.ngHref)) && (o.attr("ng-href", "{{$href()}}"), u(n.target) && o.attr("target", "{{$target()}}")), o.append(t.contents()), t.addClass("item item-complex").append(o)
                } else t.addClass("item");
                return function (t, n, i) {
                    t.$href = function () {
                        return i.href || i.ngHref
                    }, t.$target = function () {
                        return i.target
                    };
                    var r = n[0].querySelector(".item-content");
                    r && t.$on("$collectionRepeatLeave", function () {
                        r && r.$$ionicOptionsOpen && (r.style[ionic.CSS.TRANSFORM] = "", r.style[ionic.CSS.TRANSITION] = "none", e(function () {
                            r.style[ionic.CSS.TRANSITION] = ""
                        }), r.$$ionicOptionsOpen = !1)
                    })
                }
            }
        }
    }]);
    var x = '<div class="item-left-edit item-delete enable-pointer-events"></div>';
    s.directive("ionDeleteButton", function () {
        function e(e) {
            e.stopPropagation()
        }

        return {
            restrict: "E",
            require: ["^^ionItem", "^?ionList"],
            priority: Number.MAX_VALUE,
            compile: function (t, n) {
                return n.$set("class", (n["class"] || "") + " button icon button-icon", !0), function (t, n, i, r) {
                    function o() {
                        s = s || n.controller("ionList"), s && s.showDelete() && c.addClass("visible active")
                    }

                    var a = r[0], s = r[1], c = p(x);
                    c.append(n), a.$element.append(c).addClass("item-left-editable"), n.on("click", e), o(), t.$on("$ionic.reconnectScope", o)
                }
            }
        }
    }), s.directive("itemFloatingLabel", function () {
        return {
            restrict: "C", link: function (e, t) {
                var n = t[0], i = n.querySelector("input, textarea"), r = n.querySelector(".input-label");
                if (i && r) {
                    var o = function () {
                        i.value ? r.classList.add("has-input") : r.classList.remove("has-input")
                    };
                    i.addEventListener("input", o);
                    var a = p(i).controller("ngModel");
                    a && (a.$render = function () {
                        i.value = a.$viewValue || "", o()
                    }), e.$on("$destroy", function () {
                        i.removeEventListener("input", o)
                    })
                }
            }
        }
    });
    var T = '<div class="item-options invisible"></div>';
    s.directive("ionOptionButton", [function () {
        function e(e) {
            e.stopPropagation()
        }

        return {
            restrict: "E", require: "^ionItem", priority: Number.MAX_VALUE, compile: function (t, n) {
                return n.$set("class", (n["class"] || "") + " button", !0), function (t, n, i, r) {
                    r.optionsContainer || (r.optionsContainer = p(T), r.$element.append(r.optionsContainer)), r.optionsContainer.append(n), r.$element.addClass("item-right-editable"), n.on("click", e)
                }
            }
        }
    }]);
    var E = '<div data-prevent-scroll="true" class="item-right-edit item-reorder enable-pointer-events"></div>';
    s.directive("ionReorderButton", ["$parse", function (e) {
        return {
            restrict: "E",
            require: ["^ionItem", "^?ionList"],
            priority: Number.MAX_VALUE,
            compile: function (t, n) {
                return n.$set("class", (n["class"] || "") + " button icon button-icon", !0), t[0].setAttribute("data-prevent-scroll", !0), function (t, n, i, r) {
                    var o = r[0], a = r[1], s = e(i.onReorder);
                    t.$onReorder = function (e, n) {
                        s(t, {$fromIndex: e, $toIndex: n})
                    }, i.ngClick || i.onClick || i.onclick || (n[0].onclick = function (e) {
                        return e.stopPropagation(), !1
                    });
                    var c = p(E);
                    c.append(n), o.$element.append(c).addClass("item-right-editable"), a && a.showReorder() && c.addClass("visible active")
                }
            }
        }
    }]), s.directive("keyboardAttach", function () {
        return function (e, t) {
            function n(e) {
                if (!ionic.Platform.isAndroid() || ionic.Platform.isFullScreen) {
                    var n = e.keyboardHeight || e.detail.keyboardHeight;
                    t.css("bottom", n + "px"), r = t.controller("$ionicScroll"), r && (r.scrollView.__container.style.bottom = n + o(t[0]) + "px")
                }
            }

            function i() {
                ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen || (t.css("bottom", ""), r && (r.scrollView.__container.style.bottom = ""))
            }

            ionic.on("native.keyboardshow", n, window), ionic.on("native.keyboardhide", i, window), ionic.on("native.showkeyboard", n, window), ionic.on("native.hidekeyboard", i, window);
            var r;
            e.$on("$destroy", function () {
                ionic.off("native.keyboardshow", n, window), ionic.off("native.keyboardhide", i, window), ionic.off("native.showkeyboard", n, window), ionic.off("native.hidekeyboard", i, window)
            })
        }
    }), s.directive("ionList", ["$timeout", function (e) {
        return {
            restrict: "E",
            require: ["ionList", "^?$ionicScroll"],
            controller: "$ionicList",
            compile: function (t, n) {
                var i = p('<div class="list">').append(t.contents()).addClass(n.type);
                return t.append(i), function (t, i, r, o) {
                    function a() {
                        function r(e, t) {
                            t() && e.addClass("visible") || e.removeClass("active"), ionic.requestAnimationFrame(function () {
                                t() && e.addClass("active") || e.removeClass("visible")
                            })
                        }

                        var o = s.listView = new ionic.views.ListView({
                            el: i[0],
                            listEl: i.children()[0],
                            scrollEl: c && c.element,
                            scrollView: c && c.scrollView,
                            onReorder: function (t, n, i) {
                                var r = p(t).scope();
                                r && r.$onReorder && e(function () {
                                    r.$onReorder(n, i)
                                })
                            },
                            canSwipe: function () {
                                return s.canSwipeItems()
                            }
                        });
                        t.$on("$destroy", function () {
                            o && (o.deregister && o.deregister(), o = null)
                        }), u(n.canSwipe) && t.$watch("!!(" + n.canSwipe + ")", function (e) {
                            s.canSwipeItems(e)
                        }), u(n.showDelete) && t.$watch("!!(" + n.showDelete + ")", function (e) {
                            s.showDelete(e)
                        }), u(n.showReorder) && t.$watch("!!(" + n.showReorder + ")", function (e) {
                            s.showReorder(e)
                        }), t.$watch(function () {
                            return s.showDelete()
                        }, function (e, t) {
                            if (e || t) {
                                e && s.closeOptionButtons(), s.canSwipeItems(!e), i.children().toggleClass("list-left-editing", e), i.toggleClass("disable-pointer-events", e);
                                var n = p(i[0].getElementsByClassName("item-delete"));
                                r(n, s.showDelete)
                            }
                        }), t.$watch(function () {
                            return s.showReorder()
                        }, function (e, t) {
                            if (e || t) {
                                e && s.closeOptionButtons(), s.canSwipeItems(!e), i.children().toggleClass("list-right-editing", e), i.toggleClass("disable-pointer-events", e);
                                var n = p(i[0].getElementsByClassName("item-reorder"));
                                r(n, s.showReorder)
                            }
                        })
                    }

                    var s = o[0], c = o[1];
                    e(a)
                }
            }
        }
    }]), s.directive("menuClose", ["$ionicHistory", "$timeout", function (e, t) {
        return {
            restrict: "AC", link: function (n, i) {
                i.bind("click", function () {
                    var n = i.inheritedData("$ionSideMenusController");
                    n && (e.nextViewOptions({historyRoot: !0, disableAnimate: !0, expire: 300}), t(function () {
                        e.nextViewOptions({historyRoot: !1, disableAnimate: !1})
                    }, 300), n.close())
                })
            }
        }
    }]), s.directive("menuToggle", function () {
        return {
            restrict: "AC", link: function (e, t, n) {
                e.$on("$ionicView.beforeEnter", function (e, n) {
                    if (n.enableBack) {
                        var i = t.inheritedData("$ionSideMenusController");
                        i.enableMenuWithBackViews() || t.addClass("hide")
                    } else t.removeClass("hide")
                }), t.bind("click", function () {
                    var e = t.inheritedData("$ionSideMenusController");
                    e && e.toggle(n.menuToggle)
                })
            }
        }
    }), s.directive("ionModal", [function () {
        return {
            restrict: "E",
            transclude: !0,
            replace: !0,
            controller: [function () {
            }],
            template: '<div class="modal-backdrop"><div class="modal-backdrop-bg"></div><div class="modal-wrapper" ng-transclude></div></div>'
        }
    }]), s.directive("ionModalView", function () {
        return {
            restrict: "E", compile: function (e) {
                e.addClass("modal")
            }
        }
    }), s.directive("ionNavBackButton", ["$ionicConfig", "$document", function (e, t) {
        return {
            restrict: "E", require: "^ionNavBar", compile: function (n, i) {
                function r(e) {
                    return /ion-|icon/.test(e.className)
                }

                var o = t[0].createElement("button");
                for (var a in i.$attr)o.setAttribute(i.$attr[a], i[a]);
                i.ngClick || o.setAttribute("ng-click", "$ionicGoBack()"), o.className = "button back-button hide buttons " + (n.attr("class") || ""), o.innerHTML = n.html() || "";
                for (var s, c, l, u, f = r(n[0]), d = 0; d < n[0].childNodes.length; d++)s = n[0].childNodes[d], 1 === s.nodeType ? r(s) ? f = !0 : s.classList.contains("default-title") ? l = !0 : s.classList.contains("previous-title") && (u = !0) : c || 3 !== s.nodeType || (c = !!s.nodeValue.trim());
                var p = e.backButton.icon();
                if (!f && p && "none" !== p && (o.innerHTML = '<i class="icon ' + p + '"></i> ' + o.innerHTML, o.className += " button-clear"), !c) {
                    var h = t[0].createElement("span");
                    h.className = "back-text", !l && e.backButton.text() && (h.innerHTML += '<span class="default-title">' + e.backButton.text() + "</span>"), !u && e.backButton.previousTitleText() && (h.innerHTML += '<span class="previous-title"></span>'), o.appendChild(h)
                }
                return n.attr("class", "hide"), n.empty(), {
                    pre: function (e, t, n, i) {
                        i.navElement("backButton", o.outerHTML), o = null
                    }
                }
            }
        }
    }]), s.directive("ionNavBar", function () {
        return {
            restrict: "E", controller: "$ionicNavBar", scope: !0, link: function (e, t, n, i) {
                i.init()
            }
        }
    }), s.directive("ionNavButtons", ["$document", function (e) {
        return {
            require: "^ionNavBar", restrict: "E", compile: function (t, n) {
                var i = "left";
                /^primary|secondary|right$/i.test(n.side || "") && (i = n.side.toLowerCase());
                var r = e[0].createElement("span");
                r.className = i + "-buttons", r.innerHTML = t.html();
                var o = i + "Buttons";
                return t.attr("class", "hide"), t.empty(), {
                    pre: function (e, t, n, i) {
                        var a = t.parent().data("$ionViewController");
                        a ? a.navElement(o, r.outerHTML) : i.navElement(o, r.outerHTML), r = null
                    }
                }
            }
        }
    }]), s.directive("navDirection", ["$ionicViewSwitcher", function (e) {
        return {
            restrict: "A", priority: 1e3, link: function (t, n, i) {
                n.bind("click", function () {
                    e.nextDirection(i.navDirection)
                })
            }
        }
    }]), s.directive("ionNavTitle", ["$document", function (e) {
        return {
            require: "^ionNavBar", restrict: "E", compile: function (t, n) {
                var i = "title", r = e[0].createElement("span");
                for (var o in n.$attr)r.setAttribute(n.$attr[o], n[o]);
                return r.classList.add("nav-bar-title"), r.innerHTML = t.html(), t.attr("class", "hide"), t.empty(), {
                    pre: function (e, t, n, o) {
                        var a = t.parent().data("$ionViewController");
                        a ? a.navElement(i, r.outerHTML) : o.navElement(i, r.outerHTML), r = null
                    }
                }
            }
        }
    }]), s.directive("navTransition", ["$ionicViewSwitcher", function (e) {
        return {
            restrict: "A", priority: 1e3, link: function (t, n, i) {
                n.bind("click", function () {
                    e.nextTransition(i.navTransition)
                })
            }
        }
    }]), s.directive("ionNavView", ["$state", "$ionicConfig", function (e, t) {
        return {
            restrict: "E",
            terminal: !0,
            priority: 2e3,
            transclude: !0,
            controller: "$ionicNavView",
            compile: function (n, i, r) {
                return n.addClass("view-container"), ionic.DomUtil.cachedAttr(n, "nav-view-transition", t.views.transition()), function (t, n, i, o) {
                    function a(t) {
                        var n = e.$current && e.$current.locals[c.name];
                        n && (t || n !== s) && (s = n, c.state = n.$$state, o.register(n))
                    }

                    var s;
                    r(t, function (e) {
                        n.append(e)
                    });
                    var c = o.init();
                    t.$on("$stateChangeSuccess", function () {
                        a(!1)
                    }), t.$on("$viewContentLoading", function () {
                        a(!1)
                    }), a(!0)
                }
            }
        }
    }]), s.config(["$provide", function (e) {
        e.decorator("ngClickDirective", ["$delegate", function (e) {
            return e.shift(), e
        }])
    }]).factory("$ionicNgClick", ["$parse", function (e) {
        return function (t, n, i) {
            var r = angular.isFunction(i) ? i : e(i);
            n.on("click", function (e) {
                t.$apply(function () {
                    r(t, {$event: e})
                })
            }), n.onclick = h
        }
    }]).directive("ngClick", ["$ionicNgClick", function (e) {
        return function (t, n, i) {
            e(t, n, i.ngClick)
        }
    }]).directive("ionStopEvent", function () {
        return {
            restrict: "A", link: function (e, t, n) {
                t.bind(n.ionStopEvent, a)
            }
        }
    }), s.directive("ionPane", function () {
        return {
            restrict: "E", link: function (e, t) {
                t.addClass("pane")
            }
        }
    }), s.directive("ionPopover", [function () {
        return {
            restrict: "E", transclude: !0, replace: !0, controller: [function () {
            }], template: '<div class="popover-backdrop"><div class="popover-wrapper" ng-transclude></div></div>'
        }
    }]), s.directive("ionPopoverView", function () {
        return {
            restrict: "E", compile: function (e) {
                e.append(p('<div class="popover-arrow">')), e.addClass("popover")
            }
        }
    }), s.directive("ionRadio", function () {
        return {
            restrict: "E",
            replace: !0,
            require: "?ngModel",
            transclude: !0,
            template: '<label class="item item-radio"><input type="radio" name="radio-group"><div class="radio-content"><div class="item-content disable-pointer-events" ng-transclude></div><i class="radio-icon disable-pointer-events icon ion-checkmark"></i></div></label>',
            compile: function (e, t) {
                if (t.icon) {
                    var n = e.find("i");
                    n.removeClass("ion-checkmark").addClass(t.icon)
                }
                var i = e.find("input");
                return l({
                    name: t.name,
                    value: t.value,
                    disabled: t.disabled,
                    "ng-value": t.ngValue,
                    "ng-model": t.ngModel,
                    "ng-disabled": t.ngDisabled,
                    "ng-change": t.ngChange,
                    "ng-required": t.ngRequired,
                    required: t.required
                }, function (e, t) {
                    u(e) && i.attr(t, e)
                }), function (e, t, n) {
                    e.getValue = function () {
                        return e.ngValue || n.value
                    }
                }
            }
        }
    }), s.directive("ionRefresher", [function () {
        return {
            restrict: "E",
            replace: !0,
            require: ["?^$ionicScroll", "ionRefresher"],
            controller: "$ionicRefresher",
            template: '<div class="scroll-refresher invisible" collection-repeat-ignore><div class="ionic-refresher-content" ng-class="{\'ionic-refresher-with-text\': pullingText || refreshingText}"><div class="icon-pulling" ng-class="{\'pulling-rotation-disabled\':disablePullingRotation}"><i class="icon {{pullingIcon}}"></i></div><div class="text-pulling" ng-bind-html="pullingText"></div><div class="icon-refreshing"><ion-spinner ng-if="showSpinner" icon="{{spinner}}"></ion-spinner><i ng-if="showIcon" class="icon {{refreshingIcon}}"></i></div><div class="text-refreshing" ng-bind-html="refreshingText"></div></div></div>',
            link: function (e, t, n, i) {
                var r = i[0], o = i[1];
                !r || r.isNative() ? o.init() : (t[0].classList.add("js-scrolling"), r._setRefresher(e, t[0], o.getRefresherDomMethods()), e.$on("scroll.refreshComplete", function () {
                    e.$evalAsync(function () {
                        r.scrollView.finishPullToRefresh()
                    })
                }))
            }
        }
    }]), s.directive("ionScroll", ["$timeout", "$controller", "$ionicBind", function (e, t, n) {
        return {
            restrict: "E", scope: !0, controller: function () {
            }, compile: function (e) {
                function i(e, i, o) {
                    n(e, o, {
                        direction: "@",
                        paging: "@",
                        $onScroll: "&onScroll",
                        scroll: "@",
                        scrollbarX: "@",
                        scrollbarY: "@",
                        zooming: "@",
                        minZoom: "@",
                        maxZoom: "@"
                    }), e.direction = e.direction || "y", u(o.padding) && e.$watch(o.padding, function (e) {
                        r.toggleClass("padding", !!e)
                    }), e.$eval(e.paging) === !0 && r.addClass("scroll-paging"), e.direction || (e.direction = "y");
                    var a = e.$eval(e.paging) === !0, s = {
                        el: i[0],
                        delegateHandle: o.delegateHandle,
                        locking: "true" === (o.locking || "true"),
                        bouncing: e.$eval(o.hasBouncing),
                        paging: a,
                        scrollbarX: e.$eval(e.scrollbarX) !== !1,
                        scrollbarY: e.$eval(e.scrollbarY) !== !1,
                        scrollingX: e.direction.indexOf("x") >= 0,
                        scrollingY: e.direction.indexOf("y") >= 0,
                        zooming: e.$eval(e.zooming) === !0,
                        maxZoom: e.$eval(e.maxZoom) || 3,
                        minZoom: e.$eval(e.minZoom) || .5,
                        preventDefault: !0
                    };
                    a && (s.speedMultiplier = .8, s.bouncing = !1), t("$ionicScroll", {$scope: e, scrollViewOptions: s})
                }

                e.addClass("scroll-view ionic-scroll");
                var r = p('<div class="scroll"></div>');
                return r.append(e.contents()), e.append(r), {pre: i}
            }
        }
    }]), s.directive("ionSideMenu", function () {
        return {
            restrict: "E", require: "^ionSideMenus", scope: !0, compile: function (e, t) {
                return angular.isUndefined(t.isEnabled) && t.$set("isEnabled", "true"), angular.isUndefined(t.width) && t.$set("width", "275"), e.addClass("menu menu-" + t.side), function (e, n, i, r) {
                    e.side = i.side || "left";
                    var o = r[e.side] = new ionic.views.SideMenu({width: t.width, el: n[0], isEnabled: !0});
                    e.$watch(i.width, function (e) {
                        var t = +e;
                        t && t == e && o.setWidth(+e)
                    }), e.$watch(i.isEnabled, function (e) {
                        o.setIsEnabled(!!e)
                    })
                }
            }
        }
    }), s.directive("ionSideMenuContent", ["$timeout", "$ionicGesture", "$window", function (e, t, n) {
        return {
            restrict: "EA", require: "^ionSideMenus", scope: !0, compile: function (i, r) {
                function o(o, a, s, c) {
                    function l(e) {
                        0 !== c.getOpenAmount() ? (c.close(), e.gesture.srcEvent.preventDefault(), m = null, v = null) : m || (m = ionic.tap.pointerCoord(e.gesture.srcEvent))
                    }

                    function f(e) {
                        c.isDraggableTarget(e) && "x" == h(e) && (c._handleDrag(e), e.gesture.srcEvent.preventDefault())
                    }

                    function d(e) {
                        "x" == h(e) && e.gesture.srcEvent.preventDefault()
                    }

                    function p(e) {
                        c._endDrag(e), m = null, v = null
                    }

                    function h(e) {
                        if (v)return v;
                        if (e && e.gesture) {
                            if (m) {
                                var t = ionic.tap.pointerCoord(e.gesture.srcEvent), n = Math.abs(t.x - m.x), i = Math.abs(t.y - m.y), r = n < i ? "y" : "x";
                                return Math.max(n, i) > 30 && (v = r), r
                            }
                            m = ionic.tap.pointerCoord(e.gesture.srcEvent)
                        }
                        return "y"
                    }

                    var m = null, v = null;
                    u(r.dragContent) ? o.$watch(r.dragContent, function (e) {
                        c.canDragContent(e)
                    }) : c.canDragContent(!0), u(r.edgeDragThreshold) && o.$watch(r.edgeDragThreshold, function (e) {
                        c.edgeDragThreshold(e)
                    });
                    var g = {
                        element: i[0], onDrag: function () {
                        }, endDrag: function () {
                        }, getTranslateX: function () {
                            return o.sideMenuContentTranslateX || 0
                        }, setTranslateX: ionic.animationFrameThrottle(function (t) {
                            var n = g.offsetX + t;
                            a[0].style[ionic.CSS.TRANSFORM] = "translate3d(" + n + "px,0,0)", e(function () {
                                o.sideMenuContentTranslateX = t
                            })
                        }), setMarginLeft: ionic.animationFrameThrottle(function (e) {
                            e ? (e = parseInt(e, 10), a[0].style[ionic.CSS.TRANSFORM] = "translate3d(" + e + "px,0,0)", a[0].style.width = n.innerWidth - e + "px", g.offsetX = e) : (a[0].style[ionic.CSS.TRANSFORM] = "translate3d(0,0,0)", a[0].style.width = "", g.offsetX = 0)
                        }), setMarginRight: ionic.animationFrameThrottle(function (e) {
                            e ? (e = parseInt(e, 10), a[0].style.width = n.innerWidth - e + "px", g.offsetX = e) : (a[0].style.width = "", g.offsetX = 0), a[0].style[ionic.CSS.TRANSFORM] = "translate3d(0,0,0)"
                        }), enableAnimation: function () {
                            o.animationEnabled = !0, a[0].classList.add("menu-animated")
                        }, disableAnimation: function () {
                            o.animationEnabled = !1, a[0].classList.remove("menu-animated")
                        }, offsetX: 0
                    };
                    c.setContent(g);
                    var $ = {stop_browser_behavior: !1};
                    ionic.DomUtil.getParentOrSelfWithClass(a[0], "overflow-scroll") && ($.prevent_default_directions = ["left", "right"]);
                    var y = t.on("tap", l, a, $), w = t.on("dragright", f, a, $), b = t.on("dragleft", f, a, $), _ = t.on("dragup", d, a, $), S = t.on("dragdown", d, a, $), x = t.on("release", p, a, $);
                    o.$on("$destroy", function () {
                        g && (g.element = null, g = null), t.off(b, "dragleft", f), t.off(w, "dragright", f), t.off(_, "dragup", d), t.off(S, "dragdown", d), t.off(x, "release", p), t.off(y, "tap", l)
                    })
                }

                return i.addClass("menu-content pane"), {pre: o}
            }
        }
    }]), s.directive("ionSideMenus", ["$ionicBody", function (e) {
        return {
            restrict: "ECA", controller: "$ionicSideMenus", compile: function (t, n) {
                function i(t, n, i, r) {
                    r.enableMenuWithBackViews(t.$eval(i.enableMenuWithBackViews)), t.$on("$ionicExposeAside", function (n, i) {
                        t.$exposeAside || (t.$exposeAside = {}), t.$exposeAside.active = i, e.enableClass(i, "aside-open")
                    }), t.$on("$ionicView.beforeEnter", function (e, n) {
                        n.historyId && (t.$activeHistoryId = n.historyId)
                    }), t.$on("$destroy", function () {
                        e.removeClass("menu-open", "aside-open")
                    })
                }

                return n.$set("class", (n["class"] || "") + " view"), {pre: i}
            }
        }
    }]), s.directive("ionSlideBox", ["$timeout", "$compile", "$ionicSlideBoxDelegate", "$ionicHistory", "$ionicScrollDelegate", function (e, t, n, i, r) {
        return {
            restrict: "E",
            replace: !0,
            transclude: !0,
            scope: {
                autoPlay: "=",
                doesContinue: "@",
                slideInterval: "@",
                showPager: "@",
                pagerClick: "&",
                disableScroll: "@",
                onSlideChanged: "&",
                activeSlide: "=?"
            },
            controller: ["$scope", "$element", "$attrs", function (t, o, a) {
                function s(e) {
                    e && !c.isScrollFreeze ? r.freezeAllScrolls(e) : !e && c.isScrollFreeze && r.freezeAllScrolls(!1), c.isScrollFreeze = e
                }

                var c = this, l = t.$eval(t.doesContinue) === !0, f = !!u(a.autoPlay) && !!t.autoPlay, d = f ? t.$eval(t.slideInterval) || 4e3 : 0, p = new ionic.views.Slider({
                    el: o[0],
                    auto: d,
                    continuous: l,
                    startSlide: t.activeSlide,
                    slidesChanged: function () {
                        t.currentSlide = p.currentIndex(), e(function () {
                        })
                    },
                    callback: function (n) {
                        t.currentSlide = n, t.onSlideChanged({
                            index: t.currentSlide,
                            $index: t.currentSlide
                        }), t.$parent.$broadcast("slideBox.slideChanged", n), t.activeSlide = n, e(function () {
                        })
                    },
                    onDrag: function () {
                        s(!0)
                    },
                    onDragEnd: function () {
                        s(!1)
                    }
                });
                p.enableSlide(t.$eval(a.disableScroll) !== !0), t.$watch("activeSlide", function (e) {
                    u(e) && p.slide(e)
                }), t.$on("slideBox.nextSlide", function () {
                    p.next()
                }), t.$on("slideBox.prevSlide", function () {
                    p.prev()
                }), t.$on("slideBox.setSlide", function (e, t) {
                    p.slide(t)
                }), this.__slider = p;
                var h = n._registerInstance(p, a.delegateHandle, function () {
                    return i.isActiveScope(t)
                });
                t.$on("$destroy", function () {
                    h(), p.kill()
                }), this.slidesCount = function () {
                    return p.slidesCount()
                }, this.onPagerClick = function (e) {
                    t.pagerClick({index: e})
                }, e(function () {
                    p.load()
                })
            }],
            template: '<div class="slider"><div class="slider-slides" ng-transclude></div></div>',
            link: function (e, n, i) {
                function r() {
                    if (!o) {
                        var i = e.$new();
                        o = p("<ion-pager></ion-pager>"), n.append(o), o = t(o)(i)
                    }
                    return o
                }

                u(i.showPager) || (e.showPager = !0, r().toggleClass("hide", !1)), i.$observe("showPager", function (t) {
                    void 0 !== t && (t = e.$eval(t), r().toggleClass("hide", !t))
                });
                var o
            }
        }
    }]).directive("ionSlide", function () {
        return {
            restrict: "E", require: "^ionSlideBox", compile: function (e) {
                e.addClass("slider-slide")
            }
        }
    }).directive("ionPager", function () {
        return {
            restrict: "E",
            replace: !0,
            require: "^ionSlideBox",
            template: '<div class="slider-pager"><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span></div>',
            link: function (e, t, n, i) {
                var r = function (e) {
                    for (var n = t[0].children, i = n.length, r = 0; r < i; r++)r == e ? n[r].classList.add("active") : n[r].classList.remove("active")
                };
                e.pagerClick = function (e) {
                    i.onPagerClick(e)
                }, e.numSlides = function () {
                    return new Array(i.slidesCount())
                }, e.$watch("currentSlide", function (e) {
                    r(e)
                })
            }
        }
    }), s.directive("ionSpinner", function () {
        return {
            restrict: "E", controller: "$ionicSpinner",
            link: function (e, t, n, i) {
                var r = i.init();
                t.addClass("spinner spinner-" + r)
            }
        }
    }), s.directive("ionTab", ["$compile", "$ionicConfig", "$ionicBind", "$ionicViewSwitcher", function (e, t, n, i) {
        function r(e, t) {
            return u(t) ? " " + e + '="' + t + '"' : ""
        }

        return {
            restrict: "E",
            require: ["^ionTabs", "ionTab"],
            controller: "$ionicTab",
            scope: !0,
            compile: function (o, a) {
                for (var s = "<ion-tab-nav" + r("ng-click", a.ngClick) + r("title", a.title) + r("icon", a.icon) + r("icon-on", a.iconOn) + r("icon-off", a.iconOff) + r("badge", a.badge) + r("badge-style", a.badgeStyle) + r("hidden", a.hidden) + r("disabled", a.disabled) + r("class", a["class"]) + "></ion-tab-nav>", c = document.createElement("div"), l = 0; l < o[0].children.length; l++)c.appendChild(o[0].children[l].cloneNode(!0));
                var u = c.childElementCount;
                o.empty();
                var f, d;
                return u && ("ION-NAV-VIEW" === c.children[0].tagName && (f = c.children[0].getAttribute("name"), c.children[0].classList.add("view-container"), d = !0), 1 === u && (c = c.children[0]), d || c.classList.add("pane"), c.classList.add("tab-content")), function (r, o, a, l) {
                    function d() {
                        y.tabMatchesState() && $.select(r, !1)
                    }

                    function h(n) {
                        n && u ? (w || (v = r.$new(), g = p(c), i.viewEleIsActive(g, !0), $.$element.append(g), e(g)(v), w = !0), i.viewEleIsActive(g, !0)) : w && g && (t.views.maxCache() > 0 ? i.viewEleIsActive(g, !1) : m())
                    }

                    function m() {
                        v && v.$destroy(), w && g && g.remove(), c.innerHTML = "", w = v = g = null
                    }

                    var v, g, $ = l[0], y = l[1], w = !1;
                    r.$tabSelected = !1, n(r, a, {
                        onSelect: "&",
                        onDeselect: "&",
                        title: "@",
                        uiSref: "@",
                        href: "@"
                    }), $.add(r), r.$on("$destroy", function () {
                        r.$tabsDestroy || $.remove(r), b.isolateScope().$destroy(), b.remove(), b = c = g = null
                    }), o[0].removeAttribute("title"), f && (y.navViewName = r.navViewName = f), r.$on("$stateChangeSuccess", d), d();
                    var b = p(s);
                    b.data("$ionTabsController", $), b.data("$ionTabController", y), $.$tabsElement.append(e(b)(r)), r.$watch("$tabSelected", h), r.$on("$ionicView.afterEnter", function () {
                        i.viewEleIsActive(g, r.$tabSelected)
                    }), r.$on("$ionicView.clearCache", function () {
                        r.$tabSelected || m()
                    })
                }
            }
        }
    }]), s.directive("ionTabNav", [function () {
        return {
            restrict: "E",
            replace: !0,
            require: ["^ionTabs", "^ionTab"],
            template: "<a ng-class=\"{'tab-item-active': isTabActive(), 'has-badge':badge, 'tab-hidden':isHidden()}\" " + ' ng-disabled="disabled()" class="tab-item"><span class="badge {{badgeStyle}}" ng-if="badge">{{badge}}</span><i class="icon {{getIconOn()}}" ng-if="getIconOn() && isTabActive()"></i><i class="icon {{getIconOff()}}" ng-if="getIconOff() && !isTabActive()"></i><span class="tab-title" ng-bind-html="title"></span></a>',
            scope: {
                title: "@",
                icon: "@",
                iconOn: "@",
                iconOff: "@",
                badge: "=",
                hidden: "@",
                disabled: "&",
                badgeStyle: "@",
                "class": "@"
            },
            link: function (e, t, n, i) {
                var r = i[0], o = i[1];
                t[0].removeAttribute("title"), e.selectTab = function (e) {
                    e.preventDefault(), r.select(o.$scope, !0)
                }, n.ngClick || t.on("click", function (t) {
                    e.$apply(function () {
                        e.selectTab(t)
                    })
                }), e.isHidden = function () {
                    return "true" === n.hidden || n.hidden === !0
                }, e.getIconOn = function () {
                    return e.iconOn || e.icon
                }, e.getIconOff = function () {
                    return e.iconOff || e.icon
                }, e.isTabActive = function () {
                    return r.selectedTab() === o.$scope
                }
            }
        }
    }]), s.directive("ionTabs", ["$ionicTabsDelegate", "$ionicConfig", function (e, t) {
        return {
            restrict: "E", scope: !0, controller: "$ionicTabs", compile: function (n) {
                function i(t, n, i, r) {
                    function a(e, t) {
                        e.stopPropagation();
                        var n = r.previousSelectedTab();
                        n && n.$broadcast(e.name.replace("NavView", "Tabs"), t)
                    }

                    var s = e._registerInstance(r, i.delegateHandle, r.hasActiveScope);
                    r.$scope = t, r.$element = n, r.$tabsElement = p(n[0].querySelector(".tabs")), t.$watch(function () {
                        return n[0].className
                    }, function (e) {
                        var n = e.indexOf("tabs-top") !== -1, i = e.indexOf("tabs-item-hide") !== -1;
                        t.$hasTabs = !n && !i, t.$hasTabsTop = n && !i, t.$emit("$ionicTabs.top", t.$hasTabsTop)
                    }), t.$on("$ionicNavView.beforeLeave", a), t.$on("$ionicNavView.afterLeave", a), t.$on("$ionicNavView.leave", a), t.$on("$destroy", function () {
                        t.$tabsDestroy = !0, s(), r.$tabsElement = r.$element = r.$scope = o = null, delete t.$hasTabs, delete t.$hasTabsTop
                    })
                }

                function r(e, t, n, i) {
                    i.selectedTab() || i.select(0)
                }

                var o = p('<div class="tab-nav tabs">');
                return o.append(n.contents()), n.append(o).addClass("tabs-" + t.tabs.position() + " tabs-" + t.tabs.style()), {
                    pre: i,
                    post: r
                }
            }
        }
    }]), s.directive("ionToggle", ["$timeout", "$ionicConfig", function (e, t) {
        return {
            restrict: "E",
            replace: !0,
            require: "?ngModel",
            transclude: !0,
            template: '<div class="item item-toggle"><div ng-transclude></div><label class="toggle"><input type="checkbox"><div class="track"><div class="handle"></div></div></label></div>',
            compile: function (e, n) {
                var i = e.find("input");
                return l({
                    name: n.name,
                    "ng-value": n.ngValue,
                    "ng-model": n.ngModel,
                    "ng-checked": n.ngChecked,
                    "ng-disabled": n.ngDisabled,
                    "ng-true-value": n.ngTrueValue,
                    "ng-false-value": n.ngFalseValue,
                    "ng-change": n.ngChange,
                    "ng-required": n.ngRequired,
                    required: n.required
                }, function (e, t) {
                    u(e) && i.attr(t, e)
                }), n.toggleClass && e[0].getElementsByTagName("label")[0].classList.add(n.toggleClass), e.addClass("toggle-" + t.form.toggle()), function (e, t) {
                    var n = t[0].getElementsByTagName("label")[0], i = n.children[0], r = n.children[1], o = r.children[0], a = p(i).controller("ngModel");
                    e.toggle = new ionic.views.Toggle({
                        el: n, track: r, checkbox: i, handle: o, onChange: function () {
                            a && (a.$setViewValue(i.checked), e.$apply())
                        }
                    }), e.$on("$destroy", function () {
                        e.toggle.destroy()
                    })
                }
            }
        }
    }]), s.directive("ionView", function () {
        return {
            restrict: "EA", priority: 1e3, controller: "$ionicView", compile: function (e) {
                return e.addClass("pane"), e[0].removeAttribute("title"), function (e, t, n, i) {
                    i.init()
                }
            }
        }
    })
}(), !function () {
    var e = {}, t = null, n = !0, i = !1;
    try {
        "undefined" != typeof AudioContext ? t = new AudioContext : "undefined" != typeof webkitAudioContext ? t = new webkitAudioContext : n = !1
    } catch (r) {
        n = !1
    }
    if (!n)if ("undefined" != typeof Audio)try {
        new Audio
    } catch (r) {
        i = !0
    } else i = !0;
    if (n) {
        var o = "undefined" == typeof t.createGain ? t.createGainNode() : t.createGain();
        o.gain.value = 1, o.connect(t.destination)
    }
    var a = function (e) {
        this._volume = 1, this._muted = !1, this.usingWebAudio = n, this.ctx = t, this.noAudio = i, this._howls = [], this._codecs = e, this.iOSAutoEnable = !0
    };
    a.prototype = {
        volume: function (e) {
            var t = this;
            if (e = parseFloat(e), e >= 0 && 1 >= e) {
                t._volume = e, n && (o.gain.value = e);
                for (var i in t._howls)if (t._howls.hasOwnProperty(i) && t._howls[i]._webAudio === !1)for (var r = 0; r < t._howls[i]._audioNode.length; r++)t._howls[i]._audioNode[r].volume = t._howls[i]._volume * t._volume;
                return t
            }
            return n ? o.gain.value : t._volume
        }, mute: function () {
            return this._setMuted(!0), this
        }, unmute: function () {
            return this._setMuted(!1), this
        }, _setMuted: function (e) {
            var t = this;
            t._muted = e, n && (o.gain.value = e ? 0 : t._volume);
            for (var i in t._howls)if (t._howls.hasOwnProperty(i) && t._howls[i]._webAudio === !1)for (var r = 0; r < t._howls[i]._audioNode.length; r++)t._howls[i]._audioNode[r].muted = e
        }, codecs: function (e) {
            return this._codecs[e]
        }, _enableiOSAudio: function () {
            var e = this;
            if (!t || !e._iOSEnabled && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                e._iOSEnabled = !1;
                var n = function () {
                    var i = t.createBuffer(1, 1, 22050), r = t.createBufferSource();
                    r.buffer = i, r.connect(t.destination), "undefined" == typeof r.start ? r.noteOn(0) : r.start(0), setTimeout(function () {
                        (r.playbackState === r.PLAYING_STATE || r.playbackState === r.FINISHED_STATE) && (e._iOSEnabled = !0, e.iOSAutoEnable = !1, window.removeEventListener("touchend", n, !1))
                    }, 0)
                };
                return window.addEventListener("touchend", n, !1), e
            }
        }
    };
    var s = null, c = {};
    i || (s = new Audio, c = {
        mp3: !!s.canPlayType("audio/mpeg;").replace(/^no$/, ""),
        opus: !!s.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
        ogg: !!s.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
        wav: !!s.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
        aac: !!s.canPlayType("audio/aac;").replace(/^no$/, ""),
        m4a: !!(s.canPlayType("audio/x-m4a;") || s.canPlayType("audio/m4a;") || s.canPlayType("audio/aac;")).replace(/^no$/, ""),
        mp4: !!(s.canPlayType("audio/x-mp4;") || s.canPlayType("audio/mp4;") || s.canPlayType("audio/aac;")).replace(/^no$/, ""),
        weba: !!s.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
    });
    var l = new a(c), u = function (e) {
        var i = this;
        i._autoplay = e.autoplay || !1, i._buffer = e.buffer || !1, i._duration = e.duration || 0, i._format = e.format || null, i._loop = e.loop || !1, i._loaded = !1, i._sprite = e.sprite || {}, i._src = e.src || "", i._pos3d = e.pos3d || [0, 0, -.5], i._volume = void 0 !== e.volume ? e.volume : 1, i._urls = e.urls || [], i._rate = e.rate || 1, i._model = e.model || null, i._onload = [e.onload || function () {
        }], i._onloaderror = [e.onloaderror || function () {
        }], i._onend = [e.onend || function () {
        }], i._onpause = [e.onpause || function () {
        }], i._onplay = [e.onplay || function () {
        }], i._onendTimer = [], i._webAudio = n && !i._buffer, i._audioNode = [], i._webAudio && i._setupAudioNode(), "undefined" != typeof t && t && l.iOSAutoEnable && l._enableiOSAudio(), l._howls.push(i), i.load()
    };
    if (u.prototype = {
            load: function () {
                var e = this, t = null;
                if (i)return void e.on("loaderror");
                for (var n = 0; n < e._urls.length; n++) {
                    var r, o;
                    if (e._format)r = e._format; else {
                        if (o = e._urls[n], r = /^data:audio\/([^;,]+);/i.exec(o), r || (r = /\.([^.]+)$/.exec(o.split("?", 1)[0])), !r)return void e.on("loaderror");
                        r = r[1].toLowerCase()
                    }
                    if (c[r]) {
                        t = e._urls[n];
                        break
                    }
                }
                if (!t)return void e.on("loaderror");
                if (e._src = t, e._webAudio)f(e, t); else {
                    var s = new Audio;
                    s.addEventListener("error", function () {
                        s.error && 4 === s.error.code && (a.noAudio = !0), e.on("loaderror", {type: s.error ? s.error.code : 0})
                    }, !1), e._audioNode.push(s), s.src = t, s._pos = 0, s.preload = "auto", s.volume = l._muted ? 0 : e._volume * l.volume();
                    var u = function () {
                        e._duration = Math.ceil(10 * s.duration) / 10, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = {_default: [0, 1e3 * e._duration]}), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play(), s.removeEventListener("canplaythrough", u, !1)
                    };
                    s.addEventListener("canplaythrough", u, !1), s.load()
                }
                return e
            }, urls: function (e) {
                var t = this;
                return e ? (t.stop(), t._urls = "string" == typeof e ? [e] : e, t._loaded = !1, t.load(), t) : t._urls
            }, play: function (e, n) {
                var i = this;
                return "function" == typeof e && (n = e), e && "function" != typeof e || (e = "_default"), i._loaded ? i._sprite[e] ? (i._inactiveNode(function (r) {
                    r._sprite = e;
                    var o = r._pos > 0 ? r._pos : i._sprite[e][0] / 1e3, a = 0;
                    i._webAudio ? (a = i._sprite[e][1] / 1e3 - r._pos, r._pos > 0 && (o = i._sprite[e][0] / 1e3 + o)) : a = i._sprite[e][1] / 1e3 - (o - i._sprite[e][0] / 1e3);
                    var s, c = !(!i._loop && !i._sprite[e][2]), u = "string" == typeof n ? n : Math.round(Date.now() * Math.random()) + "";
                    if (function () {
                            var t = {id: u, sprite: e, loop: c};
                            s = setTimeout(function () {
                                !i._webAudio && c && i.stop(t.id).play(e, t.id), i._webAudio && !c && (i._nodeById(t.id).paused = !0, i._nodeById(t.id)._pos = 0, i._clearEndTimer(t.id)), i._webAudio || c || i.stop(t.id), i.on("end", u)
                            }, 1e3 * a), i._onendTimer.push({timer: s, id: t.id})
                        }(), i._webAudio) {
                        var f = i._sprite[e][0] / 1e3, d = i._sprite[e][1] / 1e3;
                        r.id = u, r.paused = !1, h(i, [c, f, d], u), i._playStart = t.currentTime, r.gain.value = i._volume, "undefined" == typeof r.bufferSource.start ? c ? r.bufferSource.noteGrainOn(0, o, 86400) : r.bufferSource.noteGrainOn(0, o, a) : c ? r.bufferSource.start(0, o, 86400) : r.bufferSource.start(0, o, a)
                    } else {
                        if (4 !== r.readyState && (r.readyState || !navigator.isCocoonJS))return i._clearEndTimer(u), function () {
                            var t = i, o = e, a = n, s = r, c = function () {
                                t.play(o, a), s.removeEventListener("canplaythrough", c, !1)
                            };
                            s.addEventListener("canplaythrough", c, !1)
                        }(), i;
                        r.readyState = 4, r.id = u, r.currentTime = o, r.muted = l._muted || r.muted, r.volume = i._volume * l.volume(), setTimeout(function () {
                            r.play()
                        }, 0)
                    }
                    return i.on("play"), "function" == typeof n && n(u), i
                }), i) : ("function" == typeof n && n(), i) : (i.on("load", function () {
                    i.play(e, n)
                }), i)
            }, pause: function (e) {
                var t = this;
                if (!t._loaded)return t.on("play", function () {
                    t.pause(e)
                }), t;
                t._clearEndTimer(e);
                var n = e ? t._nodeById(e) : t._activeNode();
                if (n)if (n._pos = t.pos(null, e), t._webAudio) {
                    if (!n.bufferSource || n.paused)return t;
                    n.paused = !0, "undefined" == typeof n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                } else n.pause();
                return t.on("pause"), t
            }, stop: function (e) {
                var t = this;
                if (!t._loaded)return t.on("play", function () {
                    t.stop(e)
                }), t;
                t._clearEndTimer(e);
                var n = e ? t._nodeById(e) : t._activeNode();
                if (n)if (n._pos = 0, t._webAudio) {
                    if (!n.bufferSource || n.paused)return t;
                    n.paused = !0, "undefined" == typeof n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                } else isNaN(n.duration) || (n.pause(), n.currentTime = 0);
                return t
            }, mute: function (e) {
                var t = this;
                if (!t._loaded)return t.on("play", function () {
                    t.mute(e)
                }), t;
                var n = e ? t._nodeById(e) : t._activeNode();
                return n && (t._webAudio ? n.gain.value = 0 : n.muted = !0), t
            }, unmute: function (e) {
                var t = this;
                if (!t._loaded)return t.on("play", function () {
                    t.unmute(e)
                }), t;
                var n = e ? t._nodeById(e) : t._activeNode();
                return n && (t._webAudio ? n.gain.value = t._volume : n.muted = !1), t
            }, volume: function (e, t) {
                var n = this;
                if (e = parseFloat(e), e >= 0 && 1 >= e) {
                    if (n._volume = e, !n._loaded)return n.on("play", function () {
                        n.volume(e, t)
                    }), n;
                    var i = t ? n._nodeById(t) : n._activeNode();
                    return i && (n._webAudio ? i.gain.value = e : i.volume = e * l.volume()), n
                }
                return n._volume
            }, loop: function (e) {
                var t = this;
                return "boolean" == typeof e ? (t._loop = e, t) : t._loop
            }, sprite: function (e) {
                var t = this;
                return "object" == typeof e ? (t._sprite = e, t) : t._sprite
            }, pos: function (e, n) {
                var i = this;
                if (!i._loaded)return i.on("load", function () {
                    i.pos(e)
                }), "number" == typeof e ? i : i._pos || 0;
                e = parseFloat(e);
                var r = n ? i._nodeById(n) : i._activeNode();
                if (r)return e >= 0 ? (i.pause(n), r._pos = e, i.play(r._sprite, n), i) : i._webAudio ? r._pos + (t.currentTime - i._playStart) : r.currentTime;
                if (e >= 0)return i;
                for (var o = 0; o < i._audioNode.length; o++)if (i._audioNode[o].paused && 4 === i._audioNode[o].readyState)return i._webAudio ? i._audioNode[o]._pos : i._audioNode[o].currentTime
            }, pos3d: function (e, t, n, i) {
                var r = this;
                if (t = "undefined" != typeof t && t ? t : 0, n = "undefined" != typeof n && n ? n : -.5, !r._loaded)return r.on("play", function () {
                    r.pos3d(e, t, n, i)
                }), r;
                if (!(e >= 0 || 0 > e))return r._pos3d;
                if (r._webAudio) {
                    var o = i ? r._nodeById(i) : r._activeNode();
                    o && (r._pos3d = [e, t, n], o.panner.setPosition(e, t, n), o.panner.panningModel = r._model || "HRTF")
                }
                return r
            }, fade: function (e, t, n, i, r) {
                var o = this, a = Math.abs(e - t), s = e > t ? "down" : "up", c = a / .01, l = n / c;
                if (!o._loaded)return o.on("load", function () {
                    o.fade(e, t, n, i, r)
                }), o;
                o.volume(e, r);
                for (var u = 1; c >= u; u++)!function () {
                    var e = o._volume + ("up" === s ? .01 : -.01) * u, n = Math.round(1e3 * e) / 1e3, a = t;
                    setTimeout(function () {
                        o.volume(n, r), n === a && i && i()
                    }, l * u)
                }()
            }, fadeIn: function (e, t, n) {
                return this.volume(0).play().fade(0, e, t, n)
            }, fadeOut: function (e, t, n, i) {
                var r = this;
                return r.fade(r._volume, e, t, function () {
                    n && n(), r.pause(i), r.on("end")
                }, i)
            }, _nodeById: function (e) {
                for (var t = this, n = t._audioNode[0], i = 0; i < t._audioNode.length; i++)if (t._audioNode[i].id === e) {
                    n = t._audioNode[i];
                    break
                }
                return n
            }, _activeNode: function () {
                for (var e = this, t = null, n = 0; n < e._audioNode.length; n++)if (!e._audioNode[n].paused) {
                    t = e._audioNode[n];
                    break
                }
                return e._drainPool(), t
            }, _inactiveNode: function (e) {
                for (var t = this, n = null, i = 0; i < t._audioNode.length; i++)if (t._audioNode[i].paused && 4 === t._audioNode[i].readyState) {
                    e(t._audioNode[i]), n = !0;
                    break
                }
                if (t._drainPool(), !n) {
                    var r;
                    if (t._webAudio)r = t._setupAudioNode(), e(r); else {
                        t.load(), r = t._audioNode[t._audioNode.length - 1];
                        var o = navigator.isCocoonJS ? "canplaythrough" : "loadedmetadata", a = function () {
                            r.removeEventListener(o, a, !1), e(r)
                        };
                        r.addEventListener(o, a, !1)
                    }
                }
            }, _drainPool: function () {
                var e, t = this, n = 0;
                for (e = 0; e < t._audioNode.length; e++)t._audioNode[e].paused && n++;
                for (e = t._audioNode.length - 1; e >= 0 && !(5 >= n); e--)t._audioNode[e].paused && (t._webAudio && t._audioNode[e].disconnect(0), n--, t._audioNode.splice(e, 1))
            }, _clearEndTimer: function (e) {
                for (var t = this, n = 0, i = 0; i < t._onendTimer.length; i++)if (t._onendTimer[i].id === e) {
                    n = i;
                    break
                }
                var r = t._onendTimer[n];
                r && (clearTimeout(r.timer), t._onendTimer.splice(n, 1))
            }, _setupAudioNode: function () {
                var e = this, n = e._audioNode, i = e._audioNode.length;
                return n[i] = "undefined" == typeof t.createGain ? t.createGainNode() : t.createGain(), n[i].gain.value = e._volume, n[i].paused = !0, n[i]._pos = 0, n[i].readyState = 4, n[i].connect(o), n[i].panner = t.createPanner(), n[i].panner.panningModel = e._model || "equalpower", n[i].panner.setPosition(e._pos3d[0], e._pos3d[1], e._pos3d[2]), n[i].panner.connect(n[i]), n[i]
            }, on: function (e, t) {
                var n = this, i = n["_on" + e];
                if ("function" == typeof t)i.push(t); else for (var r = 0; r < i.length; r++)t ? i[r].call(n, t) : i[r].call(n);
                return n
            }, off: function (e, t) {
                var n = this, i = n["_on" + e], r = t ? t.toString() : null;
                if (r) {
                    for (var o = 0; o < i.length; o++)if (r === i[o].toString()) {
                        i.splice(o, 1);
                        break
                    }
                } else n["_on" + e] = [];
                return n
            }, unload: function () {
                for (var t = this, n = t._audioNode, i = 0; i < t._audioNode.length; i++)n[i].paused || (t.stop(n[i].id), t.on("end", n[i].id)), t._webAudio ? n[i].disconnect(0) : n[i].src = "";
                for (i = 0; i < t._onendTimer.length; i++)clearTimeout(t._onendTimer[i].timer);
                var r = l._howls.indexOf(t);
                null !== r && r >= 0 && l._howls.splice(r, 1), delete e[t._src], t = null
            }
        }, n)var f = function (t, n) {
        if (n in e)return t._duration = e[n].duration, void p(t);
        if (/^data:[^;]+;base64,/.test(n)) {
            for (var i = atob(n.split(",")[1]), r = new Uint8Array(i.length), o = 0; o < i.length; ++o)r[o] = i.charCodeAt(o);
            d(r.buffer, t, n)
        } else {
            var a = new XMLHttpRequest;
            a.open("GET", n, !0), a.responseType = "arraybuffer", a.onload = function () {
                d(a.response, t, n)
            }, a.onerror = function () {
                t._webAudio && (t._buffer = !0, t._webAudio = !1, t._audioNode = [], delete t._gainNode, delete e[n], t.load())
            };
            try {
                a.send()
            } catch (s) {
                a.onerror()
            }
        }
    }, d = function (n, i, r) {
        t.decodeAudioData(n, function (t) {
            t && (e[r] = t, p(i, t))
        }, function (e) {
            i.on("loaderror")
        })
    }, p = function (e, t) {
        e._duration = t ? t.duration : e._duration, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = {_default: [0, 1e3 * e._duration]}), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play()
    }, h = function (n, i, r) {
        var o = n._nodeById(r);
        o.bufferSource = t.createBufferSource(), o.bufferSource.buffer = e[n._src], o.bufferSource.connect(o.panner), o.bufferSource.loop = i[0], i[0] && (o.bufferSource.loopStart = i[1], o.bufferSource.loopEnd = i[1] + i[2]), o.bufferSource.playbackRate.value = n._rate
    };
    "function" == typeof define && define.amd && define(function () {
        return {Howler: l, Howl: u}
    }), "undefined" != typeof exports && (exports.Howler = l, exports.Howl = u), "undefined" != typeof window && (window.Howler = l, window.Howl = u)
}(), function (e, t, n) {
    "use strict";
    e.map(["localStorage", "sessionStorage"], function (i) {
        var r = {
            cookiePrefix: "fallback:" + i + ":",
            cookieOptions: {path: "/", domain: n.domain, expires: "localStorage" === i ? {expires: 365} : void 0}
        };
        try {
            e.support[i] = i in t && null !== t[i]
        } catch (o) {
            e.support[i] = !1
        }
        e[i] = function (o, a) {
            var s = e.extend({}, r, e[i].options);
            return this.getItem = function (n) {
                var r = function (n) {
                    return JSON.parse(e.support[i] ? t[i].getItem(n) : e.cookie(s.cookiePrefix + n))
                };
                if ("string" == typeof n)return r(n);
                for (var o = [], a = n.length; a--;)o[a] = r(n[a]);
                return o
            }, this.setItem = function (n, r) {
                return r = JSON.stringify(r), e.support[i] ? t[i].setItem(n, r) : e.cookie(s.cookiePrefix + n, r, s.cookieOptions)
            }, this.removeItem = function (n) {
                return e.support[i] ? t[i].removeItem(n) : e.cookie(s.cookiePrefix + n, null, e.extend(s.cookieOptions, {expires: -1}))
            }, this.clear = function () {
                if (e.support[i])return t[i].clear();
                var r = new RegExp("^" + s.cookiePrefix, ""), o = e.extend(s.cookieOptions, {expires: -1});
                n.cookie && "" !== n.cookie && e.map(n.cookie.split(";"), function (t) {
                    r.test(t = e.trim(t)) && e.cookie(t.substr(0, t.indexOf("=")), null, o)
                })
            }, "undefined" != typeof o ? "undefined" != typeof a ? null === a ? this.removeItem(o) : this.setItem(o, a) : this.getItem(o) : this
        }, e[i].options = r
    })
}($, window, document), function (e, t, n) {
    "use strict";
    function i(e) {
        return null != e && "" !== e && "hasOwnProperty" !== e && s.test("." + e)
    }

    function r(e, r) {
        if (!i(r))throw a("badmember", 'Dotted member path "@{0}" is invalid.', r);
        for (var o = r.split("."), s = 0, c = o.length; s < c && t.isDefined(e); s++) {
            var l = o[s];
            e = null !== e ? e[l] : n
        }
        return e
    }

    function o(e, n) {
        n = n || {}, t.forEach(n, function (e, t) {
            delete n[t]
        });
        for (var i in e)!e.hasOwnProperty(i) || "$" === i.charAt(0) && "$" === i.charAt(1) || (n[i] = e[i]);
        return n
    }

    var a = t.$$minErr("$resource"), s = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
    t.module("ngResource", ["ng"]).provider("$resource", function () {
        var e = /^https?:\/\/[^\/]*/, i = this;
        this.defaults = {
            stripTrailingSlashes: !0,
            actions: {
                get: {method: "GET"},
                save: {method: "POST"},
                query: {method: "GET", isArray: !0},
                remove: {method: "DELETE"},
                "delete": {method: "DELETE"}
            }
        }, this.$get = ["$http", "$log", "$q", function (s, c, l) {
            function u(e) {
                return f(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
            }

            function f(e, t) {
                return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
            }

            function d(e, t) {
                this.template = e, this.defaults = v({}, i.defaults, t), this.urlParams = {}
            }

            function p(e, u, f, y) {
                function w(e, t) {
                    var n = {};
                    return t = v({}, u, t), m(t, function (t, i) {
                        $(t) && (t = t()), n[i] = t && t.charAt && "@" == t.charAt(0) ? r(e, t.substr(1)) : t
                    }), n
                }

                function b(e) {
                    return e.resource
                }

                function _(e) {
                    o(e || {}, this)
                }

                var S = new d(e, y);
                return f = v({}, i.defaults.actions, f), _.prototype.toJSON = function () {
                    var e = v({}, this);
                    return delete e.$promise, delete e.$resolved, e
                }, m(f, function (e, r) {
                    var u = /^(POST|PUT|PATCH)$/i.test(e.method), f = !1;
                    t.isNumber(e.timeout) || (e.timeout && (c.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value has to be re-used for multiple requests. If you are looking for a way to cancel requests, you should use the `cancellable` option."), delete e.timeout), f = t.isDefined(e.cancellable) ? e.cancellable : y && t.isDefined(y.cancellable) ? y.cancellable : i.defaults.cancellable), _[r] = function (i, c, d, p) {
                        var y, x, T, E = {};
                        switch (arguments.length) {
                            case 4:
                                T = p, x = d;
                            case 3:
                            case 2:
                                if (!$(c)) {
                                    E = i, y = c, x = d;
                                    break
                                }
                                if ($(i)) {
                                    x = i, T = c;
                                    break
                                }
                                x = c, T = d;
                            case 1:
                                $(i) ? x = i : u ? y = i : E = i;
                                break;
                            case 0:
                                break;
                            default:
                                throw a("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length)
                        }
                        var C, k = this instanceof _, A = k ? y : e.isArray ? [] : new _(y), M = {}, D = e.interceptor && e.interceptor.response || b, I = e.interceptor && e.interceptor.responseError || n;
                        m(e, function (e, t) {
                            switch (t) {
                                default:
                                    M[t] = g(e);
                                    break;
                                case"params":
                                case"isArray":
                                case"interceptor":
                                case"cancellable":
                            }
                        }), !k && f && (C = l.defer(), M.timeout = C.promise), u && (M.data = y), S.setUrlParams(M, v({}, w(y, e.params || {}), E), e.url);
                        var P = s(M).then(function (n) {
                            var i = n.data;
                            if (i) {
                                if (t.isArray(i) !== !!e.isArray)throw a("badcfg", "Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})", r, e.isArray ? "array" : "object", t.isArray(i) ? "array" : "object", M.method, M.url);
                                if (e.isArray)A.length = 0, m(i, function (e) {
                                    "object" == typeof e ? A.push(new _(e)) : A.push(e)
                                }); else {
                                    var s = A.$promise;
                                    o(i, A), A.$promise = s
                                }
                            }
                            return n.resource = A, n
                        }, function (e) {
                            return (T || h)(e), l.reject(e)
                        });
                        return P["finally"](function () {
                            A.$resolved = !0, !k && f && (A.$cancelRequest = t.noop, C = M.timeout = null)
                        }), P = P.then(function (e) {
                            var t = D(e);
                            return (x || h)(t, e.headers), t
                        }, I), k ? P : (A.$promise = P, A.$resolved = !1, f && (A.$cancelRequest = C.resolve), A)
                    }, _.prototype["$" + r] = function (e, t, n) {
                        $(e) && (n = t, t = e, e = {});
                        var i = _[r].call(this, e, this, t, n);
                        return i.$promise || i
                    }
                }), _.bind = function (t) {
                    return p(e, v({}, u, t), f)
                }, _
            }

            var h = t.noop, m = t.forEach, v = t.extend, g = t.copy, $ = t.isFunction;
            return d.prototype = {
                setUrlParams: function (n, i, r) {
                    var o, s, c = this, l = r || c.template, d = "", p = c.urlParams = {};
                    m(l.split(/\W/), function (e) {
                        if ("hasOwnProperty" === e)throw a("badname", "hasOwnProperty is not a valid parameter name.");
                        !new RegExp("^\\d+$").test(e) && e && new RegExp("(^|[^\\\\]):" + e + "(\\W|$)").test(l) && (p[e] = {isQueryParamValue: new RegExp("\\?.*=:" + e + "(?:\\W|$)").test(l)})
                    }), l = l.replace(/\\:/g, ":"), l = l.replace(e, function (e) {
                        return d = e, ""
                    }), i = i || {}, m(c.urlParams, function (e, n) {
                        o = i.hasOwnProperty(n) ? i[n] : c.defaults[n], t.isDefined(o) && null !== o ? (s = e.isQueryParamValue ? f(o, !0) : u(o), l = l.replace(new RegExp(":" + n + "(\\W|$)", "g"), function (e, t) {
                            return s + t
                        })) : l = l.replace(new RegExp("(/?):" + n + "(\\W|$)", "g"), function (e, t, n) {
                            return "/" == n.charAt(0) ? n : t + n
                        })
                    }), c.defaults.stripTrailingSlashes && (l = l.replace(/\/+$/, "") || "/"), l = l.replace(/\/\.(?=\w+($|\?))/, "."), n.url = d + l.replace(/\/\\\./, "/."), m(i, function (e, t) {
                        c.urlParams[t] || (n.params = n.params || {}, n.params[t] = e)
                    })
                }
            }, p
        }]
    })
}(window, window.angular), function () {
    "use strict";
    function e(e) {
        var t = function () {
        };
        return t.prototype = e.prototype || e, new t
    }

    function t(e, t, n) {
        if (n) {
            var i = {};
            for (var r in e)r !== t && (i[r] = e[r])
        } else delete e[t];
        return i || e
    }

    function n(t, n, i) {
        if (!t || !n)return t || n || {};
        t = e(t), n = e(n);
        for (var r in n)t[r] = i && t[r] ? t[r] : n[r];
        return t
    }

    function i(e) {
        for (var r = {}, o = 0; o < e.length; o++) {
            "function" == typeof e[o] && (e[o] = e[o].prototype);
            var a = t(e[o], "initialize", !0);
            r = a.implement ? i(a.implement) : n(r, a)
        }
        return r
    }

    var r = "1.0", o = window.Class, a = window.Class = function (r) {
        r = r || {};
        var o = function () {
            return this.initialize ? this.initialize.apply(this, arguments) : s
        };
        if (r.implement) {
            var s = window === this ? e(o.prototype) : this, c = r.implement;
            t(r, "implement"), r = n(r, i(c))
        }
        o.prototype = e(r), o.constructor = o, o._parent = e(r);
        for (var l = 0, u = ["extend", "implement", "getOptions", "setOptions"]; l < u.length; l++)o[u[l]] = a[u[l]];
        return o
    };
    a.extend = function (e) {
        var r = this;
        e.implement && (this.prototype = n(this.prototype, i(e.implement)), t(e, "implement"));
        for (var o in e)e[o] = "function" == typeof e[o] && /parent/.test(e[o].toString()) ? function (e, t) {
            return function () {
                return this.parent = r._parent[t], e.apply(this, arguments)
            }
        }(e[o], o) : e[o];
        return this._parent = n(this._parent, e, !0), this.prototype = n(this.prototype, e), this
    }, a.implement = function (e) {
        return this.prototype = n(this.prototype, i(e))
    }, a.getOptions = function () {
        return this.prototype.options || {}
    }, a.setOptions = function (e) {
        return this.prototype.options = n(this.prototype.options, e)
    }, a.noConflict = function () {
        return window.Class = o, a
    }, a.version = r
}();
var businesstool = new Class({
    initialize: function (e, t, n, i, r, o, a, s, c, l, u, f, d, p, h, m, v, g) {
        this.$rootScope = e, this.$scope = t, this.$state = n, this.Tip = i, this.$filter = r, this.$ionicScrollDelegate = o, this.$timeout = a, this.$ionicPopup = s, this.$resource = c, this.$ionicSlideBoxDelegate = l, this.angular = u, this.ballBucket = f, this.ballBucketIdentify = d, this.game = p, this.gameFactory = h, this.globelMultipleData = m, this.danshiCache = v, this.serverGameConfig = g
    }, hanlder: function (e, t, n) {
        n[t] = !1
    }, getShopCar: function () {
        return {
            count: 0,
            moneyUnit: this.$rootScope.moneyUnit,
            awardMode: this.$rootScope.awardMode,
            onePrice: this.$rootScope.onePrice,
            multiple: this.$rootScope.multiple,
            total: 0,
            continuesBet: this.$rootScope.globelMultipleData.continuesBet
        }
    }, getSubmitData: function () {
        var e = this, t = {
            gameType: "cqssc",
            isTrace: 0,
            traceWinStop: 1,
            traceStopValue: -1,
            balls: [],
            orders: [],
            amount: 0,
            isWap: 1
        }, n = this.ballBucket, i = 0, r = e.globelMultipleData.continuesBet;
        if (r > 1) {
            t.isTrace = 1, 1 != e.globelMultipleData.traceWinStop && (t.traceWinStop = 0), t.traceStopValue = 1;
            var o, a;
            for (o = 0; o < r; o++)a = e.$rootScope.IssueInfo.gamenumbers[o], t.orders.push({
                number: a.number,
                issueCode: a.issueCode,
                multiple: e.globelMultipleData.multiple
            })
        } else t.orders.push({
            number: e.$rootScope.IssueInfo.number,
            issueCode: e.$rootScope.IssueInfo.issueCode,
            multiple: 1
        });
        return n.some(function (n, o, a) {
            i += a[o].total;
            var s = 1;
            1 == r && (s = a[o].multiple * e.globelMultipleData.multiple), t.balls.push({
                id: o,
                ball: a[o].ballLabel,
                type: a[o].type,
                moneyunit: a[o].moneyUnit,
                multiple: s,
                awardMode: a[o].awardMode,
                num: a[o].count
            })
        }), t.amount = this.totalMoney, t
    }, isNotModity: function (e) {
        return !this.game[this.getNormalMethodName(e)].prototype.isEditor
    }, setRS: function (e, t) {
        e.label = this.$rootScope.currentMethodTitle, e.type = t;
        var n = this.game[this.getNormalMethodName(t)].prototype, i = n.checkBallArray;
        e.checkBallArray = this.angular.extend({}, i), e.id = n.id, e.maxmultiple = configData.gameLimits[t].maxmultiple, this.$filter("filterArray")(e.checkBallArray, t, e);
        var r = this.angular.extend({}, e);
        this.removeDuplicateData(r.refer, r) ? new this.Tip("该注单已存在!").start() : (this.ballBucket.unshift(r), this.ballBucketIdentify.unshift(r.refer))
    }, removeDuplicateData: function (e) {
        return this.ballBucketIdentify.indexOf(e) > -1
    }, cleanupBalls: function (e) {
        var t = this.getNormalMethodName(e), n = this.game[t].prototype = this.gameFactory()[t].prototype, i = this.$rootScope.ballsTree = n.checkBallArray;
        this.$rootScope.hasChoose = !1, this.resetBalls(i, e)
    }, cleanStyleRecoredandSetCur: function (e) {
        var t = this.$rootScope.gameMethedsCollection;
        for (var n in t)t[n].cur = !1;
        e.cur = !0
    }, cleanStyleRecoredandSetCur: function (e) {
        var t = this.$rootScope.gameMethedsCollection;
        for (var n in t)t[n].cur = !1;
        e.cur = !0
    }, editBalls: function (e, t) {
        t.type;
        this.$rootScope.ballsTree = this.game[e].prototype.checkBallArray = t.checkBallArray, this.$rootScope.editorCurrentBacket = t, this.game[e].prototype.isEditor = !0, this.$rootScope.currentEditingItem = t, this.$rootScope.iseditor = !0, this.$rootScope.currentMethodTitle = t.label, this.$rootScope.currentMethodName = t.type, this.$rootScope.shopCar.multiple = this.$scope.globelMultipleData.continuesBet > 1 ? this.$rootScope.globelMultipleData.multiple : t.multiple, console.log(this.$rootScope.shopCar), this.$rootScope.moneyUnit = this.$rootScope.shopCar.moneyUnit = t.moneyUnit, this.$rootScope.awardMode = this.$rootScope.shopCar.awardMode = t.awardMode, this.getResult(1, this.getNormalMethodName(t.type)), this.$state.go("pick")
    }, getTotalAll: function () {
        if (this.$rootScope.totalObject) {
            this.$rootScope.totalObject.totalM = 0, this.$rootScope.totalObject.totalCount = 0;
            for (var e = 0; e < this.ballBucket.length; e++) {
                var t = this.ballBucket[e];
                this.$rootScope.totalObject.totalM += t.count * t.onePrice * t.moneyUnit * (this.$rootScope.globelMultipleData.continuesBet > 1 ? this.$rootScope.globelMultipleData.multiple : t.totalMultiple), this.$rootScope.totalObject.totalCount += t.count
            }
        }
    }, resetTitleActive: function (e, t) {
        for (var n in t)t[n].active = !1;
        t[e].active = !0
    }, getDxqdsq: function () {
        return {
            da: {val: "大", cur: !1},
            xiao: {val: "小", cur: !1},
            quan: {val: "全", cur: !1},
            dan: {val: "单", cur: !1},
            shuang: {val: "双", cur: !1},
            qing: {val: "清", cur: !1}
        }
    }, resetBalls: function (e, t) {
        var n = this, i = e instanceof Array ? e : this.game._.values(e);
        i.some(function (e, i, r) {
            r[i].dxqdsq || /^.+?baodan$/.test(t) || (r[i].dxqdsq = n.getDxqdsq())
        })
    }, renderBall: function (e) {
        var t = this.getNormalMethodName(e.type), n = this.$rootScope.ballsTree = this.game[t].prototype.checkBallArray;
        this.resetBalls(n, t)
    }, changeBallIndexRange: function (e) {
        var t = /\w+san\.zuxuan\.hezhi/, n = /\w+er\.zuxuan\.hezhi/;
        t.test(e.type) || n.test(e.type) ? this.$scope.startPosstion = 1 : this.$scope.startPosstion = 0
    }, setCurrentMethodTitle: function (e) {
        this.$rootScope.PrecurrentMethodTitle = this.$rootScope.currentMethodTitle = e.label, this.$rootScope.ProcurrentMethodName = this.$rootScope.currentMethodName = e.type
    }, hasDanshiErrror: function (e) {
        return e.errorData.length > 0 || e.repeatData.length > 0
    }, isDanshi: function (e) {
        return /danshi|hunhezuxuan/.test(e.type || e)
    }, isEmptyballBucket: function () {
        return !this.ballBucket.length
    }, cleanupballBucket: function () {
        this.ballBucketIdentify.splice(0, this.ballBucket.length), this.ballBucket.splice(0, this.ballBucket.length)
    }, getNormalMethodName: function (e) {
        return e.replace(/\.|_2000/g, "")
    }, clearDanshicache: function () {
        var e = {textaraData: "", hasChoose: !1, hasDanshiErrror: !1, mintotal: 0};
        for (var t in e)this.$rootScope[t] = e[t], $(".text-areas").val(""), $("#tips-danshi").show()
    }, business: function (e, t) {
        var n = this.$rootScope.isDanshi = this.$scope.isDanshi = this.isDanshi(e);
        t && this.$scope.slideHasChanged(t), n ? (this.cleanStyleRecoredandSetCur(e), this.$rootScope.ProcurrentMethodName != e.type && this.clearDanshicache(this.$rootScope), this.setCurrentMethodTitle(e)) : ($(".scroll-content").css("position", ""), this.cleanStyleRecoredandSetCur(e), this.changeBallIndexRange(e), this.setCurrentMethodTitle(e), this.renderBall(e), this.getResult(1, this.getNormalMethodName(e.type)))
    }, getResult: function (e, t, n) {
        var i = this.$rootScope.shopCar, r = this.getNormalMethodName(t);
        if (this.isDanshi(t)) {
            var o = this.$scope.danshiData = new (this.game[this.getNormalMethodName(this.$rootScope.currentMethodName)])(n || "");
            console.log(this.$scope.danshiData);
            var a = i.count = o.data.length;
            this.$rootScope.textaraData = n, this.$rootScope.hasChoose = a > 0, this.$rootScope.hasDanshiErrror = this.hasDanshiErrror(o), this.$rootScope.mintotal = this.$filter("number")(i.total = a * i.onePrice * i.moneyUnit * i.multiple * this.globelMultipleData.multiple, 1), this.danshiCache[r] = {
                mintotal: this.$scope.mintotal,
                hasDanshiErrror: this.$rootScope.hasDanshiErrror,
                hasChoose: this.$rootScope.hasChoose,
                textaraData: this.$rootScope.textaraData
            }
        } else {
            var o = this.game[r].prototype.getData(), a = i.count = o.count;
            this.$rootScope.hasChoose = o.result.join().replace(/,/g, ""), this.$scope.mintotal = this.$filter("number")(i.total = a * i.onePrice * i.moneyUnit * i.multiple * this.globelMultipleData.multiple, 1)
        }
    }
}), initPick = new Class({
    initialize: function (e, t, n, i, r, o, a, s, c, l, u, f, d, p, h, m, v, g, y, w) {
        this.$rootScope = e, this.$scope = t, this.$state = n, this.Tip = i, this.$filter = r, this.$ionicScrollDelegate = o, this.$timeout = a, this.$ionicPopup = s, this.$resource = c, this.$ionicSlideBoxDelegate = l, this.angular = u, this.ballBucket = f, this.ballBucketIdentify = d, this.game = p, this.gameFactory = h, this.globelMultipleData = m, this.danshiCache = v, this.saveBetAwardUrl = w, this.t = $(".text-areas"), this.serverGameConfig = g,
            this.defConfig = y, this.shareOptions = {
            ballBucket: f,
            ballBucketIdentify: d,
            game: p,
            angular: u,
            gameFactory: h,
            globelMultipleData: m,
            danshiCache: v,
            serverGameConfig: g,
            defConfig: y
        }, this.$scope.goBack = function () {
            this.ballBucket.length > 0 ? s.confirm({
                title: "确认返回",
                template: '<p style="color:gray;"> 返回上层将清空已选号码，您确定返回吗</p>',
                buttons: [{text: "取消"}, {
                    text: "确定", type: "button-positive", onTap: function (e) {
                        window.location.href = returnUrl
                    }
                }]
            }) : window.location.href = returnUrl
        }
    }, getShareOptions: function () {
        return this.shareOptions
    }, init: function () {
        var e = this;
        e.hasError(), e.styleInit(), e.initData(), e.initEvent(), e.setAward()
    }, hasError: function () {
        var e = this;
        try {
            e.isDanshi(e.serverGameConfig.defaultMethod) || (e.$rootScope.ballsTree = e.game[e.serverGameConfig.defaultMethod.replace(/\./g, "")].prototype.checkBallArray)
        } catch (t) {
        }
    }, setawardGroups: function (e) {
        var t = this;
        t.$resource(t.saveBetAwardUrl).get({awardGroupId: e || t.$scope.bonus.choice}, function (e) {
            return 1 != e.status ? (!window.debug && t.$scope.goBack(), !1) : void new t.Tip("奖金组设置成功").start()
        })
    }, t: $(".text-areas"), setAward: function () {
        var e = this;
        if (null == e.serverGameConfig.awardGroupRetStatus && e.serverGameConfig.awardGroups && !window.debug)if (e.serverGameConfig.awardGroups.length > 1) {
            var t = e.serverGameConfig.awardGroups, n = "<ion-list class='select-jjz'>";
            for (var i in t)n += '<ion-radio ng-model="bonus.choice" ng-value="' + t[i].awardGroupId + '">' + t[i].awardName.replace("奖金组", "") + "</ion-radio>";
            n += "</ion-list><hr class='clear '><p>注: 奖金组一经设定,不可修改</p>", e.$scope.bonus = {choice: e.serverGameConfig.awardGroups[e.serverGameConfig.awardGroups.length - 1].awardGroupId}, e.$ionicPopup.show({
                template: n,
                title: "温馨提示",
                subTitle: "请选择一个奖金组,便于您投注时使用。",
                scope: e.$scope,
                buttons: [{
                    text: "<b>确定</b>", type: "button-positive", onTap: function (t) {
                        return e.$scope.bonus.choice ? (e.setawardGroups(), e.$scope.bonus) : void t.preventDefault()
                    }
                }, {
                    text: "取消", type: "button-default", onTap: function (t) {
                        !window.debug && e.$scope.goBack()
                    }
                }]
            })
        } else e.setawardGroups(e.serverGameConfig.awardGroups[0].awardGroupId)
    }, initEvent: function () {
        var e = this;
        e.$rootScope.dirction = 'left';
        e.$scope.cloaseAllWindow = function () {
            e.$scope.poptypeshow = !1, e.$scope.menuShow = !1, e.$scope.extraisShow = !1
        }, e.$scope.clickMutit = function (t) {
            e.$scope.globelMultipleData.continuesBet > 1 || (e.$scope.extraisShow = !0, t.stopPropagation())
        }, e.$scope.changeMethod = function (t) {
            e.$rootScope.iseditor || (e.$scope.poptypeshow = !e.$scope.poptypeshow), e.$scope.switchMethodBox(), t.stopPropagation()
        }, e.$scope.switchMethodBox = function () {
            e.$scope.poptypeshow ? $("#methodBox").css("height", "1200px") : $("#methodBox").css("height", "0px")
        }, e.$rootScope.yuanjiao = function () {
            1 == e.$rootScope.moneyUnit ? e.$rootScope.moneyUnit = .1 : e.$rootScope.moneyUnit = 1;
            var t = new e.Tip("已切换" + e.defConfig.moneyUnitData[e.$rootScope.moneyUnit] + "模式");
            t.start(), e.$rootScope.premoneyUnit = e.$rootScope.shopCar.moneyUnit = e.$rootScope.moneyUnit, $.localStorage("yuanjiao", e.$rootScope.premoneyUnit), e.getResult(1, e.getNormalMethodName(e.$rootScope.currentMethodName))
        }, e.$rootScope.fandian = function () {
            var t = "";
            1 == e.$rootScope.awardMode ? (e.$rootScope.shopCar.awardMode = e.$rootScope.awardMode = 2, t = "<span>返点已转化为奖金<br />（当前 1880奖金组）</span>") : 2 == e.$rootScope.awardMode && (e.$rootScope.shopCar.awardMode = e.$rootScope.awardMode = 1, t = "<span>保留投注返点<br />（当前 1800奖金组）</span>"), new e.Tip(t).start()
        }, e.$scope.initMM = function () {
            return e.uniquePrefix()
        }, e.$scope.initMethed = function (t, n, i, r, o) {
            n.type = i, n.label = r;
            var a = e.$rootScope.serverGameConfig.defaultMethod;
            if (a == i) {
                var s = i.substr(0, i.indexOf("."));
                for (var c in e.$scope.initilesData) {
                    var l = e.$scope.initilesData[c];
                    if (l.name == s) {
                        l.active = !0;
                        var u = l.i;
                        setTimeout(function () {
                            e.$scope.slideChange(u)
                        }, 100)
                    }
                }
                e.business(n)
            }
            return e.$rootScope.gameMethedsCollection.indexOf(n) == e.$rootScope.gameMethedsCollection.lastIndexOf(n) && e.$rootScope.gameMethedsCollection.push(n), e.uniquePrefix()
        }, e.$rootScope.ballBucket = e.ballBucket, e.$scope.customMutiple = function (t, n) {
            if (e.$scope.extraisShow) {
                var i = e.$rootScope.shopCar, r = e.serverGameConfig.gameLimits[e.$rootScope.currentMethodName].maxmultiple / i.moneyUnit;
                i.multiple += t, i.multiple = Math.max(1, i.multiple), i.multiple = Math.min(r, i.multiple), e.$scope.mintotal = e.$filter("number")(i.count * i.onePrice * i.moneyUnit * i.multiple, 1), e.game[e.getNormalMethodName(e.$rootScope.currentMethodName)].prototype.isEditor && (e.$rootScope.editorCurrentBacket.multiple = i.multiple), n.stopPropagation()
            }
        }, e.$scope.goBucket = function (t) {
            if (e.$rootScope.isDanshi) {
                var n = e.$scope.danshiData, i = n.data.join(" "), r = e.$rootScope.shopCar, o = n.data.length, a = c = {
                    isDanshi: !0,
                    count: o,
                    moneyUnit: r.moneyUnit,
                    awardMode: r.awardMode,
                    onePrice: r.onePrice,
                    multiple: r.multiple,
                    total: r.total,
                    continuesBet: r.continuesBet,
                    label: e.$rootScope.currentMethodTitle,
                    type: e.$rootScope.currentMethodName,
                    maxmultiple: e.game[e.getNormalMethodName(e.$rootScope.currentMethodName)].prototype.maxmultiple,
                    ballLabel: i,
                    refer: e.$rootScope.currentMethodName + "=>" + i,
                    totalMultiple: 1
                };
                o > 0 && $(".text-areas").val().trim() && (e.removeDuplicateData(a.refer, a) ? new e.Tip("该注单已存在!").start() : (e.ballBucket.unshift(a), e.ballBucketIdentify.unshift(a.refer))), o > 0 || !e.isEmptyballBucket() ? e.$state.go("drawing") : new e.Tip("请输入符合规范的注单").start()
            } else {
                var s = e.$rootScope.setBukets(t, !0);
                if (!e.isEmptyballBucket() && !e.$rootScope.hasChoose || s)if (t && !s)new e.Tip("号码选择不完整，请重新选择！").start(); else {
                    if (t) {
                        var c = e.$rootScope.shopCar, l = e.$rootScope.currentEditingItem;
                        l.count = c.count, l.moneyUnit = c.moneyUnit, l.awardMode = c.awardMode, l.multiple = e.$rootScope.globelMultipleData.continuesBet > 1 ? e.$rootScope.globelMultipleData.multiple : c.multiple, console.log(l.multiple), l.onePrice = c.onePrice, l.total = c.total, l.continuesBet = c.continuesBet
                    }
                    e.game[e.getNormalMethodName(e.$rootScope.currentMethodName)].prototype.isEditor = !1, e.$rootScope.iseditor = !1, e.getTotalAll(), e.$rootScope.shopCar = e.getShopCar(), e.$state.go("drawing")
                }
            }
        }, e.$rootScope.setBukets = function (t, n) {
            if ("imadanshi" == t)return void e.$scope.goBucket();
            var i = e.$rootScope.shopCar, r = e.$rootScope.currentMethodName;
            i.label = e.$rootScope.currentMethodTitle;
            var o = i.count;
            if (i.count > 0 && e.isNotModity(r))e.setRS(i, r), e.$rootScope.shopCar = e.getShopCar(), e.cleanupBalls(e.getNormalMethodName(r)), e.$scope.mintotal = 0; else {
                var o = e.game[e.getNormalMethodName(r)].prototype.getData().count;
                if (!(o <= 0 && e.$rootScope.hasChoose))return e.ballBucket.length && n || e.$scope.getRandom(), e.ballBucket.length;
                var a = new e.Tip(e.game[e.getNormalMethodName(r)].prototype.tip || "您选择的号码不完整");
                a.start()
            }
            return o > 0
        }, e.$scope.showPlayInfo = function () {
            if (!e.game[e.getNormalMethodName(e.$rootScope.currentMethodName)].prototype.tip)return void(top.location.href = "#/intro");
            var t = e.$ionicPopup.confirm({
                title: "玩法说明",
                cssClass: "showPlayInfo",
                template: e.game[e.getNormalMethodName(e.$rootScope.currentMethodName)].prototype.tip + "<br />基础奖金1800元",
                cancelText: "查看玩法说明",
                okText: "关闭"
            });
            t.then(function (e) {
                e || (top.location.href = "#/intro")
            })
        }, e.$scope.slideHander = function (t) {
            e.$ionicSlideBoxDelegate.slide(t)
        }, e.$scope.slideHasChanged = function (t, $event) {
            if (t == 8) {
                e.$scope.mainSlideChange(1, $event);
                e.$rootScope.dirction = 'right';
            } else if (t == 7) {
                if (e.$rootScope.dirction == 'right') {
                    e.$scope.mainSlideChange(0, $event);
                    e.$rootScope.dirction = 'left';
                }
            }
            !isNaN(t) && e.resetTitleActive(t, e.$scope.initilesData);
        }, e.$scope.slideChange = function (t, n) {
            void 0 != t && (e.$ionicSlideBoxDelegate.slide(t), e.resetTitleActive(t, e.$scope.initilesData), n && n.stopPropagation())
        }, e.$scope.mainSlideChange = function (t, n) {
            void 0 != t && (0 == t && ($("#play_type_box").animate({"margin-left": "0px"}), $(".ar-poptype .strategy-select").removeClass("super-2000"), e.$scope.slideChange(4, n), $(".ar-popmenu ul li").eq(2).show()), 1 == t && ($("#play_type_box").animate({"margin-left": "-100%"}), $(".ar-poptype .strategy-select").addClass("super-2000"), e.$scope.slideChange(8, n), $(".ar-popmenu ul li").eq(2).hide()), n && n.stopPropagation())
        }, e.$scope.initiles = function (t, n) {
            return e.$scope.initilesData.push({i: t, active: !1, name: n.name}), e.uniquePrefix()
        }, e.$rootScope.setGrounpChoose = function (t, n, i, r, o) {
            for (var a in r)r[a].cur = !1;
            i.cur = !0, e.game._.daxiaodanshuangqing(n, t), e.getResult("", o)
        }, e.$scope.result = function (t, n, i, r) {
            /^.+?baodan$/.test(i) && e.game._.daxiaodanshuangqing(t, "qing"), t[n] = !t[n], e.getResult(n, i), e.$rootScope.showRecord10(!0)
        }, e.$rootScope.getRandom = function () {
            var t = e.getNormalMethodName(e.$rootScope.currentMethodName);
            e.game[t].prototype.getramdom(), e.getResult(1, t)
        }, e.$scope.chooseGame = function (t, n) {
            e.business(t, n), $("#methodBox").css("height", "0px"), e.$timeout(function () {
                e.$ionicScrollDelegate.$getByHandle("mainScroll").scrollTop()
            }, 100)
        }, e.$scope.textareaSubmit = function () {
            var t = e.t.val();
            e.t.prop("disabled", !0), e.$rootScope.beforesubmited = !1, e.getResult(1, e.$rootScope.currentMethodName, t), e.t.val(e.$scope.danshiData.data.join(" "));
            var n = e.$scope.danshiData.data.join(" ").trim();
            n || new e.Tip("请输入符合规范的注单").start()
        }, e.$scope.cancelSubmited = function () {
            e.t = $(".text-areas"), e.t.prop("disabled", !1), e.$rootScope.beforesubmited = !0, e.t.val(e.$scope.textaraData)
        }, e.$scope.helprule = function () {
            e.$ionicPopup.alert({
                title: "温馨提示",
                template: '<p   style="color:#888;font-size:12px;line-height:170%; text-align: left;">1.输入的注单请参照如下规则：单注内各号码保持相连，不同注号码间用分隔符隔开;<br>2.分隔符支持：回车[ ]空格[ ]逗号[,]分号[;]冒号[:]竖线[|];<br>3.文件较大时，提交注单可能需要一定时间，请耐心等待;</p>',
                buttons: [{text: "确定", type: "button-positive"}]
            })
        }, e.$scope.textareaFocus = function () {
            e.$rootScope.isfocus = !0, $("#tips-danshi").hide(), $(".text-areas").attr("rows", "6").css({
                fontSize: "16px!important",
                "user-select": "text"
            }), $(".scroll-content").css({top: "44px", bottom: "0"}), $(".select-result").hide()
        }, e.$scope.textareaBlur = function () {
            var t = $(".text-areas").val().trim();
            t || (e.$rootScope.isfocus = !1), $(".text-areas").attr("rows", "18").css({
                fontSize: "16px!important",
                "user-select": "text"
            }), $(".scroll-content").css({top: "77px", bottom: "0"}), $(".select-result").show()
        }, e.$scope.showtextareaError = function () {
            var t = e.$scope.danshiData, n = t.errorData.join(" "), i = t.repeatData.join(" "), r = "<div>错误项:</div>";
            r += "<p>" + n + "</p>", r += "<div>重复项:</div>", r += "<p>" + i + "</p>", e.$ionicPopup.alert({
                title: "温馨提示",
                template: r,
                buttons: [{
                    text: "确定", type: "button-positive", onTap: function (e) {
                    }
                }]
            })
        }, e.$scope.clearVal = function () {
            e.t = $(".text-areas"), e.$scope.valsss = $(".text-areas").val(), e.t.val().trim() && e.$ionicPopup.alert({
                title: "是否清空所有注单",
                template: '<p class="popup-param">清空注单:{{valsss}}</p>',
                scope: e.$scope,
                buttons: [{text: "取消"}, {
                    text: "确定", type: "button-positive", onTap: function (t) {
                        e.t.val("")
                    }
                }]
            })
        }, e.$scope.showAwardItem = function () {         //奖金返点的显示与隐藏
            for (var i = 0; i < configData.awardGroups.length; i++) {
                if (configData.awardGroups[i].betType == 1) {
                    if (e.$rootScope.currentMethodTitle.length == 7 && /'三一码不定位'$/.test(e.$rootScope.currentMethodTitle)) {   //当前是前中后一码不定位
                        if (configData.awardGroups[i].threeoneRet == 0) {     //前中后三的一码不定位没有奖金返点
                            return 0;
                        } else {
                            return 1;
                        }
                    } else {        //不是前中后一码不定位
                        if (configData.awardGroups[i].directRet == 0) {
                            return 0;
                        } else {
                            return 1;
                        }
                    }
                }
            }
        }
    }, styleInit: function () {
        var e = this;
        e.$scope.options = {
            loop: !1,
            effect: "fade",
            speed: 500
        }, e.$scope.data = {}, e.$scope.$watch("data.slider", function (t, n) {
            e.$scope.slider = e.$scope.data.slider
        }), setTimeout(function () {
            var e = $(".slider");
            e.css("height", e.height())
        }, 500);
        var t = $(".custompluse .pluseitem");
        t.on({
            touchstart: function () {
                t.removeClass("cur"), $(this).addClass("cur")
            }, touchend: function () {
                t.removeClass("cur")
            }
        })
    }, initData: function () {
        var e = this;
        this.getissueInfo(), e.$scope.initilesData = [], e.serverGameConfig = e.$rootScope.serverGameConfig = e.serverGameConfig, e.$rootScope.beforesubmited = !0, e.$rootScope.balance = e.serverGameConfig.balance, e.$rootScope.globelMultipleData = e.globelMultipleData, $.localStorage("yuanjiao") ? e.$rootScope.premoneyUnit = e.$rootScope.moneyUnit = e.defConfig.moneyUnit = $.localStorage("yuanjiao") : (e.$rootScope.premoneyUnit = e.$rootScope.moneyUnit = e.defConfig.moneyUnit, $.localStorage("yuanjiao", e.$rootScope.premoneyUnit)), e.$rootScope.awardMode = e.defConfig.awardMode, e.$rootScope.onePrice = e.defConfig.onePrice, e.$rootScope.multiple = e.defConfig.multiple, e.$rootScope.multipleLimit = e.$scope.multipleLimit = e.defConfig.multipleLimit, e.$rootScope.currentMethodTitle = "", e.$scope.startPosstion = 0, e.$rootScope.gameMethedsCollection = e.$rootScope.gameMethedsCollection || [], e.$rootScope.historyGameMethedsCollection = e.$rootScope.historyGameMethedsCollection || [], e.$scope.range = e.game._.range, e.$rootScope.shopCar = e.getShopCar()
    }, uniquePrefix: function () {
        window.uniquePrefixId || (window.uniquePrefixId = 1);
        var e = ++window.uniquePrefixId;
        return Math.random() * e
    }, getCurrentIssue: function () {
        return $.get(this.serverGameConfig.dynamicConfigUrl)
    }, getissueInfo: function () {
        var e = this;
        e.getCurrentIssue().then(function (t) {
            e.$scope.IssueInfo = t.data, e.$rootScope.IssueInfo = t.data, e.issueTimeCounter(t.data)
        })
    }, issueTimeCounter: function (e) {
        function t() {
            var e = o - r;
            o.setTime(o.getTime() - 1e3), e >= 0 ? (n.$scope.issueMinitus = Math.floor(e / 1e3 / 60 % 60), n.$scope.issueSeconed = Math.floor(e / 1e3 % 60), n.$scope.issueNumber = i.split("-")[1], n.$timeout(t, 1e3)) : (n.getissueInfo(), n.showAlert("当前销售截止,进入下期购买"))
        }

        var n = this, i = e.number, r = new Date(e.nowtime.replace(/-/g, "/")), o = new Date(e.nowstoptime.replace(/-/g, "/"));
        n.$timeout(t, 1e3)
    }, showAlert: function (e) {
        var t = this;
        new t.Tip(e).start()
    }
});
initPick.implement([businesstool]);
var resultTodo = new Class({
    initialize: function (e, t, n, i, r, o, a, s) {
        this.$rootScope = e, this.$scope = t, this.$state = n, this.$ionicPopup = i, this.$ionicScrollDelegate = r, this.$filter = o, this.Tip = a, this.$timeout = s, this.$scope.opminus = !0, this.$scope.totalMoney = 0
    }, init: function () {
        var e = this;
        e.isEmptyballBucket() && e.$state.go("pick"), this.initEvent(), this.intiStyle(), this.initData()
    }, intiStyle: function () {
        var e = this;
        $("#changeContinuesBet").on({
            keyup: function () {
                var t = $(this).val();
                t > 50 && (t = 50, new e.Tip("期数超限").start()), 0 == t && (t = 1), e.$scope.$apply(function () {
                    e.globelMultipleData.continuesBet = t
                })
            }, blur: function () {
                // e.$scope.$apply(function () {
                //     "" != e.globelMultipleData.continuesBet && 0 != e.globelMultipleData.continuesBet || (e.globelMultipleData.continuesBet = 1)
                // })
            }, focus: function (t) {
                $(this).val(""), e.$scope.$apply(function () {
                    e.globelMultipleData.continuesBet = ""
                })
            }
        }), $("#globleMultipleChange").on({
            keyup: function () {
                var t = $(this).val();
                0 == t && (t = 1), e.$scope.$apply(function () {
                    e.globelMultipleData.multiple = t, e.$scope.globleMultipleChange()
                })
            }, blur: function () {
                // e.$scope.$apply(function () {
                //     "" != e.globelMultipleData.multiple && 0 != e.globelMultipleData.multiple || (e.globelMultipleData.multiple = 1), e.$scope.globleMultipleChange()
                // })
            }, focus: function (t) {
                $(this).val(""), e.$scope.$apply(function () {
                    e.globelMultipleData.multiple = ""
                })
            }
        })
    }, initData: function () {
        var e = this;
        e.$rootScope.totalObject = {
            totalMoney: 0,
            totalCount: 0,
            totalM: 0
        }, $.localStorage("volumeSwich") && (e.$rootScope.volume = $.localStorage("volumeSwich"))
    }, initEvent: function () {
        var e = this;
        e.$scope.removeBucketItem = function (t, n) {
            n.stopPropagation(), e.ballBucket.splice(t, 1), e.ballBucketIdentify.splice(t, 1), e.ballBucket.length || (e.$rootScope.totalObject.totalM = 0, e.$rootScope.totalObject.totalCount = 0)
        }, e.$scope.resetGlobalMultil = function () {
            var t = e.ballBucket[0];
            return e.ballBucket.some(function (e, n) {
                var i = e.maxmultiple / e.moneyUnit, r = t.maxmultiple / t.moneyUnit;
                i <= r && (t = e)
            }), e.$rootScope.currentMinMutiple = t
        }, e.$scope.resetFactMultil = function (t) {
            var n = t.maxmultiple / t.moneyUnit;
            t.multiple * e.globelMultipleData.multiple > n && (e.globelMultipleData.multiple = Math.floor(n / t.multiple), new e.Tip("倍投超限").start())
        }, e.$scope.resetObjMultiple = function () {
            var t = e.$scope.resetGlobalMultil();
            if (t) {
                e.$scope.resetFactMultil(t);
                var n = e.$rootScope.currentMinMutiple.maxmultiple / e.$rootScope.currentMinMutiple.moneyUnit;
                e.globelMultipleData.multiple = e.globelMultipleData.multiple >= n ? e.globelMultipleData.multiple = n : e.globelMultipleData.multiple <= 1 ? e.globelMultipleData.multiple = 1 : e.globelMultipleData.multiple;
                for (var i = 0, r = 0; r < e.ballBucket.length; r++) {
                    var o = e.ballBucket[r];
                    o.totalMultiple = o.multiple * e.globelMultipleData.multiple, e.globelMultipleData.continuesBet > 1 && (o.totalMultiple = e.globelMultipleData.multiple), i += o.count * o.onePrice * o.moneyUnit * o.totalMultiple * e.globelMultipleData.continuesBet
                }
                e.$scope.totalMoney = i
            }
        }, e.$scope.minderMutl = function () {
            e.globelMultipleData.multiple <= 1 ? e.globelMultipleData.multiple = 1 : e.globelMultipleData.multiple = e.globelMultipleData.multiple - 1, e.$scope.resetObjMultiple()
        }, e.$scope.changeContinuesBet = function (t) {
            t && e.globelMultipleData.continuesBet++, e.globelMultipleData.continuesBet || (e.globelMultipleData.continuesBet = 1), e.globelMultipleData.continuesBet > 50 && (new e.Tip("期数超限").start(), e.globelMultipleData.continuesBet = 50)
        }, e.$scope.plusContinuesBet = function () {
            e.$scope.changeContinuesBet(!0), e.$scope.resetObjMultiple()
        }, e.$scope.minusContinuesBet = function () {
            e.globelMultipleData.continuesBet--, e.globelMultipleData.continuesBet = Math.max(1, e.globelMultipleData.continuesBet), e.$scope.resetObjMultiple()
        }, e.$scope.globleMultipleChange = function (t) {
            e.$rootScope.currentMinMutiple;
            t && e.globelMultipleData.multiple++, e.$scope.resetObjMultiple()
        }, e.$scope.initBacketList = function (t, n) {
            return t || (e.$rootScope.totalObject.totalM = 0, e.$rootScope.totalObject.totalCount = 0, e.$scope.globleMultipleChange()), n.totalMultiple = n.multiple * e.globelMultipleData.multiple, e.$rootScope.totalObject.totalM += n.count * n.onePrice * n.multiple * n.moneyUnit, e.$rootScope.totalObject.totalCount += n.count, t
        }, e.$scope.globleMultipleChange(), e.$scope.gosubmit = function () {
            e.$ionicPopup.confirm({
                title: "确认投注",
                template: '<p class="popup-param">确定投注吗</p>',
                buttons: [{text: "取消"}, {
                    text: "确定", type: "button-positive", onTap: function (t) {
                        e.totalMoney = e.$scope.totalMoney;
                        var n = e.getSubmitData();
                        if (n.amount > e.serverGameConfig.balance && !window.debug) {
                            var i = new e.Tip("您的余额不足");
                            return void i.start()
                        }
                        e.isEmptyballBucket() ? new e.Tip("请先添加注单").start() : e.$state.go("submit", {totalMoney: e.$scope.totalMoney}, {
                            location: !0,
                            reload: !0,
                            inherit: !0,
                            notify: !0
                        })
                    }
                }]
            })
        }, e.$scope.editLottory = function (t) {
            t.isDanshi || (e.$rootScope.currentMethodName = t.type, e.$rootScope.currentMethodTitle = t.label, e.editBalls(e.getNormalMethodName(e.$rootScope.currentMethodName), t), e.$timeout(function () {
                e.$ionicScrollDelegate.$getByHandle("mainScroll").scrollTop()
            }, 100))
        }, e.$scope.goPick = function () {
            if (e.$rootScope.isDanshi)e.$state.go("pick"), setTimeout(function () {
                e.$rootScope.$apply(function () {
                    e.clearDanshicache(), $(".text-areas").prop("disabled", !1), e.$rootScope.beforesubmited = !0, e.$rootScope.isfocus = !1
                })
            }, 100); else {
                e.$rootScope.iseditor = !1, e.$rootScope.currentMethodName = e.$rootScope.ProcurrentMethodName, e.$rootScope.currentMethodTitle = e.$rootScope.PrecurrentMethodTitle;
                var t = e.$rootScope.currentMethodName;
                e.getResult(1, t), e.cleanupBalls(t), e.$rootScope.shopCar = e.getShopCar(), e.$state.go("pick"), e.$rootScope.moneyUnit = e.$rootScope.premoneyUnit, e.$timeout(function () {
                    e.$ionicScrollDelegate.$getByHandle("mainScroll").scrollTop()
                }, 100)
            }
        }, e.$rootScope.goBack = function () {
            e.$scope.goPick()
        }, e.$scope.showConfirm = function () {
            e.isEmptyballBucket() || e.$ionicPopup.confirm({
                title: "是否清空所有注单",
                template: '<p class="popup-param">确定要清空吗</p>',
                buttons: [{text: "取消"}, {
                    text: "确定", type: "button-positive", onTap: function (t) {
                        e.$rootScope.globelMultipleData.multiple = 1, e.$rootScope.globelMultipleData.continuesBet = 1, e.$scope.totalMoney = 0, e.$rootScope.totalObject.totalM = 0, e.$rootScope.totalObject.totalCount = 0, e.cleanupballBucket();
                        var n = e.$rootScope.currentMethodName;
                        e.getResult(1, n)
                    }
                }]
            })
        }, e.$rootScope.getrandomBalls = function () {
            e.$rootScope.globelMultipleData.continuesBet > 1;
            var t = e.$rootScope.currentMethodName;
            e.cleanupBalls(t), e.game[e.getNormalMethodName(t)].prototype.getramdom(), e.getResult(1, t);
            var n = e.$rootScope.shopCar;
            n.count > 0 && e.isNotModity(t) && e.setRS(n, t)
        }, e.$rootScope.volumeSwich = function () {
            e.$rootScope.volume = !e.$rootScope.volume, $.localStorage("volumeSwich", e.$rootScope.volume)
        }
    }
});
resultTodo.implement([businesstool]);
var submitTodo = new Class({
    initialize: function (e, t, n, i, r, o, a, s, c, l, u, f, d, p, h) {
        this.$window = e, this.$rootScope = t, this.$scope = n, this.$state = i, this.$ionicPopup = r, this.Slot = o, this.Countup = a, this.Winning = s, this.Tip = c, this.$resource = l, this.$timeout = u, this.$filter = f, this.$q = d, this.$ionicScrollDelegate = p, this.$stateParams = h
    }, init: function () {
        this.setData(), this.setEvent()
    }, setData: function () {
        var e = this;
        this.barBtn = $("#barBtn"), this.backtodw = $(".backtodw"), this.isemptyWinning = $(".isemptyWinning-test"), this.timeContainer = [], e.$scope.totalMoney = e.$stateParams.totalMoney, e.$scope.ballBucket = e.ballBucket, e.$rootScope.autoreduceAcount = 0, e.$scope.isAjaxRunning = !1, e.$scope.currentIndex = 1, e.$scope.isNoshow = !1, e.$scope.allwin = e.$scope.allwin || 0, e.$scope.allwinend = e.$scope.allwinend || 0, $.localStorage("volumeSwich") && (e.$rootScope.volume = $.localStorage("volumeSwich")), e.$scope.gameTypeCn = e.serverGameConfig.gameTypeCn
    }, setEvent: function () {
        var e = this;
        e.$rootScope.submit = e.$scope.submit = function (t) {
            e.totalMoney = e.$scope.totalMoney;
            var n = e.getSubmitData();
            for (var i = 0; i < n.balls.length; i++) {       //对所有超级2000使用 awardMode:1 [mantis:#0010037]
                if (n.balls[i].type.indexOf('2000') > -1) {
                    if (n.balls[i].awardMode == 2) {
                        n.balls[i].awardMode = 1;
                    }
                }
            }
			//上海时时乐标题为shssl,balls去掉--; [mantis: #0010045]
			if(configData.gameTypeCn == '上海时时乐'){
				n.gameType = "shssl";
				for(var i = 0; i < n.balls.length; i++){
					if(n.balls[i].type == 'housan.zhixuan.fushi'){		//三星直选复制
						var _ball = n.balls[i].ball.split(',');
						var __ball = [];
						for(var j = 0; j < _ball.length; j++){
							if(_ball[j] == '-'){
								continue;
							}
							__ball.push(_ball[j]);
						}
						n.balls[i].ball = __ball.join(',');
					}else if(n.balls[i].type == 'houer.zhixuan.fushi'){	//后二直选复式
						n.balls[i].ball = n.balls[i].ball.substr(4);
						console.log(n.balls[i].ball);
					}else if(n.balls[i].type == 'qianer.zhixuan.fushi'){  //前二直选复式
						n.balls[i].ball = n.balls[i].ball.substr(0,5);
						console.log(n.balls[i].ball);
					}
					
				}
			}
            if (n.amount > e.serverGameConfig.balance && !window.debug) {
                var i = new Tip("您的余额不足");
                return i.start(), void e.$state.go("drawing")
            }
            e.ballBucket.length && !e.$scope.isAjaxRunning && e.$resource(submitUrl, {}, {
                save: {
                    method: "POST",
                    timeout: 2e4
                }
            }).save(n, function (t) {
                console.log(n);
                1 != t.isSuccess && e.$ionicPopup.alert({title: "温馨提示", template: "网络异常，请稍后再试"}).then(function (t) {
                    e.$scope.allwinend = e.$scope.allwin = 0, e.globelMultipleData.continuesBet = 1, e.$state.go("drawing")
                })
            }, function (t) {
                e.$ionicPopup.alert({title: "温馨提示", template: "网络异常，请稍后再试"}).then(function (t) {
                    e.$scope.allwinend = e.$scope.allwin = 0, e.globelMultipleData.continuesBet = 1, e.$state.go("drawing")
                })
            })
        }, e.$scope.goPick = function (t) {
            t ? (console.log("drawing"), e.$state.go("drawing")) : e.$window.location.reload()
        }, e.$scope.volumeControll = function () {
            e.$rootScope.volume ? (e.Winning.openMusic(), e.Slot.openMusic()) : (e.Slot.stop && e.Slot.stop(), e.Winning.stop && e.Winning.stop(), e.Winning.stopMusic(), e.Slot.stopMusic())
        }, e.$rootScope.volumeSwich = function () {
            e.$rootScope.volume = !e.$rootScope.volume, $.localStorage("volumeSwich", e.$rootScope.volume), e.$scope.volumeControll()
        }, e.$scope.removeBucketItem = function (t, n) {
            n.stopPropagation(), e.ballBucket.splice(t, 1), ballBucketIdentify.splice(t, 1)
        }, e.$scope.submit(0)
    }
});
submitTodo.implement([businesstool]);
var GlobleSetting = new Class({});
angular.module("starter", ["ionic", "ngResource", "starter.controllers", "starter.animation"]).run(["$ionicPlatform", function (e) {
    e.ready(function () {
        window.StatusBar && StatusBar.styleDefault()
    })
}]).config(["$stateProvider", "$urlRouterProvider", function (e, t) {
    e.state("pick", {
        url: "/pick",
        templateUrl: "templates/pick.html",
        controller: "PickCtrl"
    }).state("drawing", {
        url: "/drawing",
        templateUrl: "templates/drawing.html",
        controller: "DrawingCtrl"
    }).state("submit", {
        url: "/submit",
        templateUrl: "templates/submit.html",
        controller: "submitCtrl",
        params: {totalMoney: 100}
    }).state("intro", {
        url: "/intro",
        templateUrl: "templates/intro.html",
        controller: "IntroCtrl"
    }), "#/submit" == location.hash && (location.href = location.origin + location.pathname + location.search + "#/pick"), t.otherwise("pick")
}]), Number.prototype.toFixed = function (e) {
    var t = this + "", n = t.indexOf(".");
    return n > -1 ? +t.substr(0, n + 3) : this
};
var con = angular.module("starter.controllers", ["ionic"]).controller("PickCtrl", ["$rootScope", "$scope", "$state", "Tip", "$filter", "$ionicScrollDelegate", "$timeout", "$ionicPopup", "$resource", "$ionicSlideBoxDelegate", "$sce", function (e, t, n, i, r, o, a, s, c, l, u) {
    $(".loadding").hide();
    var f = {
        moneyUnit: 1,
        moneyUnitData: {.1: "角", 1: "元"},
        onePrice: 2,
        multiple: 1,
        multipleLimit: 88,
        continuesBet: 1,
        awardMode: 1
    }, d = gameFactory(), p = [], h = [], m = f, v = {}, g = configData;
    t.moreRecordUrl = u.trustAsResourceUrl(moreRecordUrl), t.backToPcUrl = u.trustAsResourceUrl(backToPcUrl), e.currentGame = new initPick(e, t, n, i, r, o, a, s, c, l, angular, p, h, d, gameFactory, m, v, g, f, saveBetAwardUrl), e.currentGame.init()
}]).controller("DrawingCtrl", ["$rootScope", "$scope", "$state", "$ionicPopup", "$ionicScrollDelegate", "$filter", "Tip", "$timeout", function (e, t, n, i, r, o, a, s) {
    resultTodo.extend(e.currentGame.getShareOptions());
    var c = new resultTodo(e, t, n, i, r, o, a, s);
    c.init()
}]).controller("submitCtrl", ["$window", "$rootScope", "$scope", "$state", "$ionicPopup", "Slot", "Countup", "Winning", "Tip", "$resource", "$timeout", "$filter", "$q", "$ionicScrollDelegate", "$stateParams", function (e, t, n, i, r, o, a, s, c, l, u, f, d, p, h) {
    submitTodo.extend(t.currentGame.getShareOptions());
    var m = new submitTodo(e, t, n, i, r, o, a, s, c, l, u, f, d, p, h);
    m.init()
}]).controller("allCtrl", ["$rootScope", "$scope", "$state", "Tip", "$filter", "$ionicScrollDelegate", "$timeout", "$ionicPopup", "$resource", "$ionicSlideBoxDelegate", function (e, t, n, i, r, o, a, s, c, l) {
    $.localStorage("volumeSwich") && (e.volume = $.localStorage("volumeSwich")), e.volumeSwich = function () {
        e.volume = !e.volume, $.localStorage("volumeSwich", e.volume)
    }, t.menuShowHander = function (e) {
        $(".ar-popmenu").toggleClass("menuShow"), e.stopPropagation()
    }, t.allClick = function () {
        $("#methodBox").css("height", "0px"), $(".ar-popmenu").addClass("menuShow")
    }, e.historyBox = !0, e.showhisBox = function () {
        e.historyBox ? e.historyBox = !1 : (e.historyBox = !0, $("#historyBox").css("height", "0px"), e.showRecord10(!0))
    }, e.showRecord10 = function (t) {
        t ? e.historyShow = !1 : (e.historyShow = !e.historyShow, e.historyRecord = e.serverGameConfig.records.slice(0, 10), e.showGameBox())
    }, e.showGameBox = function () {
        e.historyShow ? $("#historyBox").css("height", "1200px") : $("#historyBox").css("height", "0px")
    }, e.showRecord = function () {
        location.href = "/showrecord/detail"
    }
}]);
con.controller("IntroCtrl", ["$rootScope", "$scope", "$state", "$sce", function (e, t, n, i) {
    t.introUrl = i.trustAsResourceUrl(introUrl), t.goPick = function () {
        n.go("pick")
    }
}]), con.filter("filterArray", function () {
    return function (e, t, n) {
        var i = function (e) {
            return e.replace(/\.|_2000/g, "")
        }, r = gameFactory()[i(t)];
        r.prototype.checkBallArray = e;
        var o = r.prototype.getData().result, a = o.join("|").replace(/\,/g, "").split("|"), s = {
            "sixing\\w+?fushi": function (e) {
                e.unshift("-")
            }, "qiansan\\w+?fushi": function () {
                a.push("-"), a.push("-")
            }, "zhongsan\\w+?fushi": function () {
                a.push("-"), a.unshift("-")
            }, "housan\\w+?fushi": function () {
                a.unshift("-"), a.unshift("-")
            }, "qianer\\w+?fushi": function () {
                a.push("-"), a.push("-"), a.push("-")
            }, "houer\\w+?fushi": function () {
                a.unshift("-"), a.unshift("-"), a.unshift("-")
            }, "yixing\\w+?fushi": function () {
                a.some(function (e, t, n) {
                    n[t].length || (n[t] = "-")
                })
            }
        }, c = 0;
        for (var l in n.checkBallArray)c++;
        var u = 1 == c;
        for (var l in s) {
            var f = new RegExp(l);
            f.test(i(t)) && s[l](a)
        }
        return u ? n.ballLabel = o.join(",") : n.ballLabel = a.join(","), n.refer = n.type + "=>" + n.ballLabel, n.ballLabel
    }
}), con.filter("split", function () {
    return function (e, t, n) {
        var i = e.split(t);
        return "latest" == n && (n = i.length - 1), i[n]
    }
}), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (e, t, n, i, r) {
        return jQuery.easing[jQuery.easing.def](e, t, n, i, r)
    },
    easeInQuad: function (e, t, n, i, r) {
        return i * (t /= r) * t + n
    },
    easeOutQuad: function (e, t, n, i, r) {
        return -i * (t /= r) * (t - 2) + n
    },
    easeInOutQuad: function (e, t, n, i, r) {
        return (t /= r / 2) < 1 ? i / 2 * t * t + n : -i / 2 * (--t * (t - 2) - 1) + n
    },
    easeInCubic: function (e, t, n, i, r) {
        return i * (t /= r) * t * t + n
    },
    easeOutCubic: function (e, t, n, i, r) {
        return i * ((t = t / r - 1) * t * t + 1) + n
    },
    easeInOutCubic: function (e, t, n, i, r) {
        return (t /= r / 2) < 1 ? i / 2 * t * t * t + n : i / 2 * ((t -= 2) * t * t + 2) + n
    },
    easeInQuart: function (e, t, n, i, r) {
        return i * (t /= r) * t * t * t + n
    },
    easeOutQuart: function (e, t, n, i, r) {
        return -i * ((t = t / r - 1) * t * t * t - 1) + n
    },
    easeInOutQuart: function (e, t, n, i, r) {
        return (t /= r / 2) < 1 ? i / 2 * t * t * t * t + n : -i / 2 * ((t -= 2) * t * t * t - 2) + n
    },
    easeInQuint: function (e, t, n, i, r) {
        return i * (t /= r) * t * t * t * t + n
    },
    easeOutQuint: function (e, t, n, i, r) {
        return i * ((t = t / r - 1) * t * t * t * t + 1) + n
    },
    easeInOutQuint: function (e, t, n, i, r) {
        return (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + n : i / 2 * ((t -= 2) * t * t * t * t + 2) + n
    },
    easeInSine: function (e, t, n, i, r) {
        return -i * Math.cos(t / r * (Math.PI / 2)) + i + n
    },
    easeOutSine: function (e, t, n, i, r) {
        return i * Math.sin(t / r * (Math.PI / 2)) + n
    },
    easeInOutSine: function (e, t, n, i, r) {
        return -i / 2 * (Math.cos(Math.PI * t / r) - 1) + n
    },
    easeInExpo: function (e, t, n, i, r) {
        return 0 == t ? n : i * Math.pow(2, 10 * (t / r - 1)) + n
    },
    easeOutExpo: function (e, t, n, i, r) {
        return t == r ? n + i : i * (-Math.pow(2, -10 * t / r) + 1) + n
    },
    easeInOutExpo: function (e, t, n, i, r) {
        return 0 == t ? n : t == r ? n + i : (t /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + n : i / 2 * (-Math.pow(2, -10 * --t) + 2) + n
    },
    easeInCirc: function (e, t, n, i, r) {
        return -i * (Math.sqrt(1 - (t /= r) * t) - 1) + n
    },
    easeOutCirc: function (e, t, n, i, r) {
        return i * Math.sqrt(1 - (t = t / r - 1) * t) + n
    },
    easeInOutCirc: function (e, t, n, i, r) {
        return (t /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + n : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
    },
    easeInElastic: function (e, t, n, i, r) {
        var o = 1.70158, a = 0, s = i;
        if (0 == t)return n;
        if (1 == (t /= r))return n + i;
        if (a || (a = .3 * r), s < Math.abs(i)) {
            s = i;
            var o = a / 4
        } else var o = a / (2 * Math.PI) * Math.asin(i / s);
        return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / a)) + n
    },
    easeOutElastic: function (e, t, n, i, r) {
        var o = 1.70158, a = 0, s = i;
        if (0 == t)return n;
        if (1 == (t /= r))return n + i;
        if (a || (a = .3 * r), s < Math.abs(i)) {
            s = i;
            var o = a / 4
        } else var o = a / (2 * Math.PI) * Math.asin(i / s);
        return s * Math.pow(2, -10 * t) * Math.sin((t * r - o) * (2 * Math.PI) / a) + i + n
    },
    easeInOutElastic: function (e, t, n, i, r) {
        var o = 1.70158, a = 0, s = i;
        if (0 == t)return n;
        if (2 == (t /= r / 2))return n + i;
        if (a || (a = r * (.3 * 1.5)), s < Math.abs(i)) {
            s = i;
            var o = a / 4
        } else var o = a / (2 * Math.PI) * Math.asin(i / s);
        return t < 1 ? -.5 * (s * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / a)) + n : s * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / a) * .5 + i + n
    },
    easeInBack: function (e, t, n, i, r, o) {
        return void 0 == o && (o = 1.70158), i * (t /= r) * t * ((o + 1) * t - o) + n
    },
    easeOutBack: function (e, t, n, i, r, o) {
        return void 0 == o && (o = 1.70158), i * ((t = t / r - 1) * t * ((o + 1) * t + o) + 1) + n
    },
    easeInOutBack: function (e, t, n, i, r, o) {
        return void 0 == o && (o = 1.70158), (t /= r / 2) < 1 ? i / 2 * (t * t * (((o *= 1.525) + 1) * t - o)) + n : i / 2 * ((t -= 2) * t * (((o *= 1.525) + 1) * t + o) + 2) + n
    },
    easeInBounce: function (e, t, n, i, r) {
        return i - jQuery.easing.easeOutBounce(e, r - t, 0, i, r) + n
    },
    easeOutBounce: function (e, t, n, i, r) {
        return (t /= r) < 1 / 2.75 ? i * (7.5625 * t * t) + n : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
    },
    easeInOutBounce: function (e, t, n, i, r) {
        return t < r / 2 ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, i, r) + n : .5 * jQuery.easing.easeOutBounce(e, 2 * t - r, 0, i, r) + .5 * i + n
    }
}), angular.module("starter.animation", []).factory("Slot", function () {
    function e() {
        this.$dom = {}
    }

    return {}
        /* return e.prototype = {
         init: function (e, t) {
         e && $.isArray(e) && (this.$dom = $(t), this.arr = e, this.$number = this.$dom.find(".number-list li span"), this.$barup = this.$dom.find(".drawbar-up"), this.$bardown = this.$dom.find(".drawbar-down"), this.height = this.$dom.find(".number-list li").height(), this.audioStop = new Howl({urls: [basePath + "img/stop.mp3"]}), this.playMusic = !0)
         }, start: function (e) {
         this.barAnimation(e)
         }, barAnimation: function (e) {
         this.$barup.animate({opacity: "hide"}, 300, function () {
         $(this).animate({opacity: "show"}, 300)
         }), this.$bardown.animate({opacity: "show"}, 300, function () {
         $(this).animate({opacity: "hide"}, 300)
         }), this.numberAnimation(e)
         }, reset: function () {
         }, timeArray: [], numberAnimation: function (e) {
         function t(e, t) {
         n.isNeedQuikly && (e.duration = 200)
         }

         var n = this;
         this.reset(), this.$number.each(function (i, r) {
         n.timeArray.push(setTimeout(function () {
         $(r).stop(!1, !0).animate({marginTop: "-=1500"}, 1).stop(!1, !0).animate({marginTop: -(6480 - 10 * n.height * 2 + n.arr[i] * n.height) + "px"}, {
         duration: 2e3,
         progress: t,
         done: function () {
         n.playMusic && n.audioStop.play(), n.$number.length == i + 1 && e && e(), n.isNeedQuikly = !1
         }
         })
         }, 300 * i))
         })
         }, cleanTimeArray: function () {
         for (; this.timeArray.length;)clearTimeout(this.timeArray.shift())
         }, stop: function () {
         this.audioStop && this.audioStop.stop()
         }, play: function () {
         this.audioStop && this.audioStop.play()
         }, isNeedQuikly: !1, quickAnimation: function (e) {
         var t = this;
         this.isNeedQuikly = !0, this.cleanTimeArray();
         var n = 0;
         this.$number.each(function (i, r) {
         $(r).stop(!1, !0).animate({marginTop: -(6480 - 10 * t.height * 2 + t.arr[i] * t.height) + "px"}, {
         duration: 200,
         done: function () {
         n++, n > t.$number.length - 1 && e && e()
         }
         })
         })
         }, noQuickAnimation: function () {
         this.isNeedQuikly = !1
         }, stopMusic: function () {
         this.playMusic = !1
         }, openMusic: function () {
         this.playMusic = !0
         }
         }*/, new e
}).animation(".repeated-item", function () {
    return {
        enter: function (e, t) {
            return jQuery(e).css({marginTop: -jQuery(e).height()}), jQuery(e).animate({marginTop: "0px"}, "liner", t), function (t) {
                t && jQuery(e).stop()
            }
        }, leave: function (e, t) {
            return e.css("opacity", 1), jQuery(e).animate({marginTop: "500px", opacity: 0}, t), function (t) {
                t && jQuery(e).stop()
            }
        }, addClass: function (e, t, n) {
        }, removeClass: function (e, t, n) {
        }
    }
}).factory("Countup", ["$filter", function (e) {
    function t(t, n, i, r, o) {
        for (var a = 0, s = ["webkit", "moz", "ms", "o"], c = 0; c < s.length && !window.requestAnimationFrame; ++c)window.requestAnimationFrame = window[s[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[s[c] + "CancelAnimationFrame"] || window[s[c] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function (e, t) {
            var n = (new Date).getTime(), i = Math.max(0, 16 - (n - a)), r = window.setTimeout(function () {
                e(n + i)
            }, i);
            return a = n + i, r
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
            clearTimeout(e)
        }), this.isNeedQuikly = !1, this.quickAnimation = function (e) {
            this.isNeedQuikly = !0
        }, this.d = t.get(0), this.startVal = n, this.endVal = i, this.countDown = this.startVal > this.endVal, this.frameVal = this.startVal, this.duration = 500 * r || 1e3, this.decimals = Math.max(0, o || 2), this.dec = Math.pow(10, this.decimals);
        var l = this;
        this.printValue = function (t) {
            var n = e("number")(t, this.decimals);
            this.d.innerHTML = n
        }, this.easeOutExpo = function (e, t, n, i) {
            return n * (-Math.pow(2, -10 * e / i) + 1) * 1024 / 1023 + t
        }, this.count = function (e) {
            l.startTime || (l.startTime = e), l.timestamp = e;
            var t = e - l.startTime;
            l.remaining = l.duration - t, l.countDown ? l.frameVal = l.startVal - l.easeOutExpo(t, 0, l.startVal - l.endVal, l.duration) : l.frameVal = l.easeOutExpo(t, l.startVal, l.endVal - l.startVal, l.duration).toFixed(2), l.countDown ? l.frameVal = l.frameVal < l.endVal ? l.endVal : l.frameVal : l.frameVal = l.frameVal > l.endVal ? l.endVal : l.frameVal, l.frameVal = Math.round(l.frameVal * l.dec) / l.dec, l.printValue(l.frameVal), t < l.duration ? l.rAF = requestAnimationFrame(l.count) : l.callback && l.callback()
        }, this.start = function (e) {
            return l.callback = e, isNaN(l.endVal) || isNaN(l.startVal) || l.startVal === l.endVal ? this.d.innerHTML = i : l.rAF = requestAnimationFrame(l.count), !1
        }, this.reset = function () {
            l.paused = !1, delete l.startTime, l.startVal = n, cancelAnimationFrame(l.rAF), l.printValue(l.startVal)
        }, this.update = function (e) {
            delete l.callback, cancelAnimationFrame(l.rAF), l.paused = !1, delete l.startTime, l.startVal = l.frameVal, l.endVal = Number(e).toFixed(2), l.countDown = l.startVal > l.endVal, l.rAF = requestAnimationFrame(l.count)
        }, l.printValue(l.startVal)
    }

    return t
}]).factory("Winning", function () {
    function e() {
        this.$dom = $("#drawingContent").find(".scroll"), this.$bigWin = this.$dom.find(".big-win"), this.$light = this.$dom.find(".slot-light"), this.audioBigwin = new Howl({
            urls: [basePath + "img/background.mp3", basePath + "img/background.WAV", basePath + "img/background.OGG"],
            loop: !0
        }), this.playMusic = !0, this.award = 1
    }

    return e.prototype = {
        init: function () {
        }, start: function (e, t, n) {
            e && this.bigwinStart(n), t && "number" == typeof t && (this.award = t), this.creatCoin(e, n)
        }, isNeedQuikly: !1, quickAnimation: function (e) {
            this.isNeedQuikly = !0, this.$bigWin.removeClass("win-animation").hide(), this.$light.removeClass("active"), this.audioBigwin.stop(), this.endamin(e)
        }, noQuickAnimation: function () {
            this.isNeedQuikly = !1
        }, endamin: function (e) {
            $(".iconrmb").delay(0).stop(!1, !0), this.mybigwinEnd(), this.$dom.find(".iconrmb").remove(), e && e()
        }, creatCoin: function (e, t) {
            function n(e, t) {
                i.isNeedQuikly && ($(".iconrmb").delay(0), $(".iconrmb").stop(!1, !0), i.mybigwinEnd())
            }

            var i = this, r = 0;
            this.callback = t;
            var o = 2 * this.award + 28;
            this.playMusic && (this.audioBigwin = new Howl({
                urls: [basePath + "img/background.WAV", basePath + "img/background.OGG", basePath + "img/background.mp3"],
                loop: !0
            }), this.audioBigwin.play());
            for (var a = 0; a < o; a++) {
                var s = $('<span class="iconrmb"></span>');
                s.css({
                    left: 100 * Math.random() + "%",
                    "-webkit-transform": "rotate(" + 360 * Math.random() + "deg) scale(" + (.2 * Math.random() + 1) + ")"
                }), $("#drawingContent").find(".scroll").append(s), s.delay(Math.random() * (1e3 * i.award)).animate({top: $("#drawingContent").height()}, {
                    duration: 2e3,
                    progress: n,
                    easing: "easeInQuad",
                    done: function () {
                        r++, $(this).remove(), r >= o && (i.bigwinEnd(), t && t())
                    }
                })
            }
        }, bigwinStart: function (e) {
            this.$bigWin.show().addClass("win-animation"), this.$light.addClass("active")
        }, bigwinEnd: function () {
            this.$bigWin.removeClass("win-animation").hide(), this.$light.removeClass("active"), this.audioBigwin.stop()
        }, mybigwinEnd: function () {
            this.bigwinEnd(), this.$dom.find(".iconrmb").remove()
        }, stop: function () {
            this.audioBigwin && this.audioBigwin.stop()
        }, play: function () {
            this.audioBigwin && this.audioBigwin.play()
        }, stopMusic: function () {
            this.playMusic = !1
        }, openMusic: function () {
            this.playMusic = !0
        }
    }, new e
}).factory("Tip", function () {
    function e(e, t) {
        this.$dom = $("body"), this.word = e || "提示"
    }

    return e.prototype = {
        create: function () {
            var e = $('<div class="tips"></div>');
            e.html(this.word), this.$dom.append(e), e.fadeIn(), setTimeout(function () {
                e.fadeOut(function () {
                })
            }, 2e3)
        }, start: function () {
            this.create()
        }
    }, e
});