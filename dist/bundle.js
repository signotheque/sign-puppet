/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React, miscUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CustomizeInput = (function () {
        function CustomizeInput(pID, pValue) {
            if (pID != undefined && pValue != undefined) {
                this.id = pID;
                this.value = pValue;
                this.name = this.id;
                this.label = this.id;
                this.separator = false;
            }
            else {
                //build separator
                this.id = null;
                this.value = null;
                this.separator = true;
            }
        }
        return CustomizeInput;
    }());
    exports.CustomizeInput = CustomizeInput;
    var CustomizeTab = (function (_super) {
        __extends(CustomizeTab, _super);
        function CustomizeTab() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CustomizeTab.prototype.componentDidMount = function () {
            // toggle pose customisation
            var lPoseCustomToggleButtons = document.querySelectorAll('#customize a');
            var _loop_1 = function (i) {
                var lPoseCustomToggleButton = lPoseCustomToggleButtons[i];
                lPoseCustomToggleButton.addEventListener("click", function (pEvent) {
                    var lFieldSets = document.querySelectorAll('fieldset');
                    for (var j = 0; j < lFieldSets.length; j++) {
                        var lFieldSet = lFieldSets[j];
                        lFieldSet.style.display = "none";
                        var lFieldSetId = lFieldSet.getAttribute("id");
                        // strip the #
                        if (lFieldSetId === miscUtils_1.stripSharpFromHref(lPoseCustomToggleButton.getAttribute("href"))) {
                            lFieldSet.style.display = "block";
                        }
                    }
                    pEvent.preventDefault();
                }, false);
            };
            for (var i = 0; i < lPoseCustomToggleButtons.length; i++) {
                _loop_1(i);
            }
            var setChannelValue = function (pElement, pChannels) {
                var v = parseFloat(pElement.value);
                if (!isNaN(v)) {
                    var cChannelId = pElement.getAttribute("id");
                    pChannels[cChannelId] = v;
                }
            };
            // setup pose customization ui
            var lInputs = document.getElementsByTagName('input');
            var _loop_2 = function (i) {
                var lInput = lInputs[i];
                //event
                lInput.addEventListener('change', function () {
                    setChannelValue(lInput, SignPuppet.channels);
                    document.dispatchEvent(new Event("updateAnimation"));
                }, false);
                //initial
                setChannelValue(lInput, SignPuppet.channels);
            };
            for (var i = 0; i < lInputs.length; i++) {
                _loop_2(i);
            }
        };
        CustomizeTab.prototype.render = function () {
            var cInputs = [];
            var lSepRank = -1;
            this.props.inputs.map(function (lInput) {
                if (lInput.separator) {
                    cInputs.push(React.createElement("br", { key: lSepRank.toString() }));
                    lSepRank--;
                }
                else {
                    cInputs.push(React.createElement("label", { key: lInput.id },
                        lInput.label,
                        " ",
                        React.createElement("input", { id: lInput.id, name: lInput.name, defaultValue: lInput.value.toString() })));
                }
            });
            return React.createElement("fieldset", { id: this.props.id }, cInputs);
        };
        return CustomizeTab;
    }(React.Component));
    exports.CustomizeTab = CustomizeTab;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stripSharpFromHref = function (pString) {
        return pString.substr(1);
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;///<reference path="./components/signpuppet/signPuppet.d.ts"/>
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignPuppetApp = (function () {
        function SignPuppetApp() {
        }
        Object.defineProperty(SignPuppetApp.prototype, "animator", {
            get: function () {
                return this.mPuppet.getAnimator();
            },
            enumerable: true,
            configurable: true
        });
        SignPuppetApp.prototype.create = function () {
            this.mPuppet = SignPuppet.create();
            // animated items
            // this.mChannels = SignPuppet.channels;
        };
        SignPuppetApp.prototype.bind = function (pCanvasID) {
            var _this = this;
            var canvas = document.getElementById(pCanvasID);
            if (!canvas) {
                console.error("no canvas found!");
                return;
            }
            this.mPuppet.getAnimator().setTarget(SignPuppet.channels);
            document.addEventListener("updateAnimation", function (pEvent) {
                _this.mPuppet.getAnimator().setTarget(SignPuppet.channels);
            }, false);
            // animation
            var animFrame = function (cb) {
                return window.requestAnimationFrame(cb) ||
                    setTimeout(cb, 10);
            };
            function loop(cb) {
                animFrame(cb);
            }
            ;
            var fps = 15;
            var now = 0;
            var then = Date.now();
            var interval = 1000 / fps;
            var delta = 0;
            var render = function () {
                loop(render);
                now = Date.now();
                delta = now - then;
                if (delta > interval) {
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                    _this.mPuppet.getAnimator().tween();
                    _this.mPuppet.draw(canvas, canvas.width, canvas.height, 0, 0);
                    then = now - (delta % interval);
                }
            };
            loop(render);
        };
        return SignPuppetApp;
    }());
    exports.SignPuppetApp = SignPuppetApp;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    var CustomizeButtons = (function (_super) {
        __extends(CustomizeButtons, _super);
        function CustomizeButtons() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CustomizeButtons.prototype.render = function () {
            return React.createElement("ul", { id: "customize", className: "inline" }, this.props.buttons.map(function (item) { return React.createElement("li", { key: item.id },
                React.createElement("a", { href: "#" + item.id }, item.label)); }));
        };
        return CustomizeButtons;
    }(React.Component));
    exports.CustomizeButtons = CustomizeButtons;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(2), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React, miscUtils_1, poses_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PoseButtons = (function (_super) {
        __extends(PoseButtons, _super);
        function PoseButtons() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //load pose
            _this.applyPose = function (pPose) {
                for (var k in pPose) {
                    if (pPose.hasOwnProperty(k)) {
                        // send also value to input widgets
                        var lInput = document.getElementById(k);
                        if (lInput) {
                            lInput.value = pPose[k].toString();
                        }
                        SignPuppet.channels[k] = pPose[k];
                    }
                }
            };
            // apply pose links
            _this.requestApplyPose = function (pElement, pResetPose) {
                pElement.addEventListener("click", function (e) {
                    e.preventDefault();
                    if (pResetPose) {
                        _this.applyPose(SignPuppet.channels);
                        _this.applyPose({ rt0x: -1, rt1x: -1, lt0x: -1, lt1x: -1 });
                    }
                    _this.applyPose(poses_1.poses[miscUtils_1.stripSharpFromHref(pElement.getAttribute('href'))]);
                    document.dispatchEvent(new Event("updateAnimation"));
                }, false);
            };
            _this.requestApplyPoses = function (pElements, pResetPose) {
                for (var i = 0; i < pElements.length; i++) {
                    var lElement = pElements[i];
                    _this.requestApplyPose(lElement, pResetPose);
                }
                ;
            };
            return _this;
        }
        PoseButtons.prototype.componentDidMount = function () {
            // pose links
            var lPoseButtons = document.querySelectorAll("#" + this.props.id + " a");
            this.requestApplyPoses(lPoseButtons, this.props.resetPoses);
        };
        PoseButtons.prototype.render = function () {
            return (React.createElement("div", null,
                React.createElement("dt", null, this.props.category),
                React.createElement("dd", null,
                    React.createElement("ul", { id: this.props.id, className: "inline" }, this.props.poses.map(function (lPose) { return React.createElement("li", { key: lPose.label },
                        React.createElement("a", { href: "#" + lPose.href }, lPose.label)); })))));
        };
        return PoseButtons;
    }(React.Component));
    exports.PoseButtons = PoseButtons;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, customizeTab_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomPoseUtils = {
        buildHandCustomPositions: function (pSide) {
            var lResult = {};
            var lTranslations = ["h", "b", "a"];
            var lTranslationParams = ["x", "y", "z", ""];
            lTranslations.map(function (item) { return lTranslationParams.map(function (param) {
                var lKey = pSide + item + param;
                lResult[lKey] = new customizeTab_1.CustomizeInput(lKey, 0);
            }); });
            lResult[pSide + "bz"].value = 1;
            lResult[pSide + "b"].value = 1;
            var lRotations = ["p", "r"];
            var lRotationParams = ["x", "y", "z"];
            lRotations.map(function (item) { return lRotationParams.map(function (param) {
                var lKey = pSide + item + param;
                lResult[lKey] = new customizeTab_1.CustomizeInput(lKey, 0);
            }); });
            lResult[pSide + "rz"].value = -90;
            lResult[pSide + "rx"].value = 90;
            return lResult;
        },
        buildHandCustomFingers: function (pSide) {
            var lResult = {};
            var lAllDigitsButThumb = ["i", "m", "r", "p"];
            var lAllDigitsButThumbParams = ["0", "1", "2", "s"];
            lAllDigitsButThumb.map(function (item) { return lAllDigitsButThumbParams.map(function (param) {
                var lKey = pSide + item + param;
                lResult[lKey] = new customizeTab_1.CustomizeInput(lKey, 0);
            }); });
            var lThumb = ["t"];
            var lThumbParams = ["0x", "0y", "1x", "1y", "2x"];
            lThumb.map(function (item) { return lThumbParams.map(function (param) {
                var lKey = pSide + item + param;
                lResult[lKey] = new customizeTab_1.CustomizeInput(lKey, 0);
            }); });
            lResult[pSide + "t0x"].value = -1;
            lResult[pSide + "t1x"].value = -1;
            return lResult;
        },
        buildHeadAndBodyCustom: function CustomizeInputMap() {
            var lResult = {};
            var lEntries = ["hrx", "hry", "bx", "by",
                "eby", "ebx", "e0y", "e1y",
                "ex", "ey", "ez",
                "ny",
                "mx", "my",
                "mly", "mlz", "mty", "mtz", "mcx",
                "teeth"];
            lEntries.map(function (item) { return lResult[item] = new customizeTab_1.CustomizeInput(item, 0); });
            lResult["e0y"].value = 1;
            lResult["e1y"].value = 1;
            lResult["ez"].value = 1;
            return lResult;
        }
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(8), __webpack_require__(6), __webpack_require__(4), __webpack_require__(1), __webpack_require__(7), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React, ReactDOM, poseButtons_1, customizeButtons_1, customizeTab_1, customPoseUtils_1, app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lSignPuppetApp = new app_1.SignPuppetApp();
    lSignPuppetApp.create();
    lSignPuppetApp.bind("the_canvas");
    var lPoses = {
        body: [
            { href: "forward", label: "Forward" },
            { href: "out", label: "Out" },
            { href: "down", label: "Down" },
            { href: "in_pose", label: "In" },
            { href: "default_pose", label: "Default" }
        ],
        hand: [
            { href: "s", label: "Fist" },
            { href: "5", label: "Five" },
            { href: "A", label: "Thumb" },
            { href: "1", label: "Point" },
            { href: "B", label: "Palm" }
        ],
        face: [
            { href: "wide", label: "Up extreme" },
            { href: "narrow", label: "Down extreme" },
            { href: "teeth", label: "Teeth" },
            { href: "tongue", label: "Tongue" },
            { href: "default_face", label: "Default" }
        ]
    };
    var lCustomPoses = {};
    lCustomPoses = {
        rightHandPosition: {
            id: "right_hand_position",
            label: "Right hand position",
            inputs: customPoseUtils_1.CustomPoseUtils.buildHandCustomPositions("r"),
            sepranks: [4, 4, 4, 3, 3]
        },
        rightHandPose: {
            id: "right_hand_pose",
            label: "Right hand fingers",
            inputs: customPoseUtils_1.CustomPoseUtils.buildHandCustomFingers("r"),
            sepranks: [4, 4, 4, 4, 5]
        },
        leftHandPosition: {
            id: "left_hand_position",
            label: "Left hand position",
            inputs: customPoseUtils_1.CustomPoseUtils.buildHandCustomPositions("l"),
            sepranks: [4, 4, 4, 3, 3]
        },
        leftHandPose: {
            id: "left_hand_pose",
            label: "Left hand fingers",
            inputs: customPoseUtils_1.CustomPoseUtils.buildHandCustomFingers("l"),
            sepranks: [4, 4, 4, 4, 5]
        },
        headAndBody: {
            id: "head_and_body",
            label: "Head and body",
            inputs: customPoseUtils_1.CustomPoseUtils.buildHeadAndBodyCustom(),
            sepranks: [4, 4, 3, 1, 2, 5, 1]
        }
    };
    var lCustomButtons = [];
    var lCustomTabs = [];
    var _loop_1 = function (lCustomPoseKey) {
        var v = lCustomPoses[lCustomPoseKey];
        lCustomButtons.push({ id: v.id, label: v.label });
        var lInputArray = [];
        var lAccum = -1;
        var lSepRankAccum = v.sepranks.map(function (item) { lAccum = lAccum + item; return lAccum; });
        var i = 0;
        for (var lInputKey in v.inputs) {
            lInputArray.push(v.inputs[lInputKey]);
            if (lSepRankAccum.indexOf(i) !== -1) {
                lInputArray.push(new customizeTab_1.CustomizeInput());
            }
            i++;
        }
        lCustomTabs.push(React.createElement(customizeTab_1.CustomizeTab, { key: v.id, id: v.id, inputs: lInputArray }));
    };
    for (var lCustomPoseKey in lCustomPoses) {
        _loop_1(lCustomPoseKey);
    }
    ReactDOM.render(React.createElement("div", null,
        React.createElement("h3", null, "Sample Poses"),
        React.createElement("dl", { className: 'clearfix' },
            React.createElement(poseButtons_1.PoseButtons, { category: "Body:", id: "poses", resetPoses: true, poses: lPoses.body }),
            React.createElement(poseButtons_1.PoseButtons, { category: "Hand:", id: "hand_poses", resetPoses: false, poses: lPoses.hand }),
            React.createElement(poseButtons_1.PoseButtons, { category: "Face:", id: "face_poses", resetPoses: false, poses: lPoses.face })),
        React.createElement("h3", null, "Customize pose:"),
        React.createElement("ul", { id: "customize", className: "inline" },
            React.createElement(customizeButtons_1.CustomizeButtons, { buttons: lCustomButtons })),
        React.createElement("div", null, lCustomTabs)), document.getElementById("example"));
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.poses = {
        default_pose: {
            hrx: 0, hry: 0, bx: 0, by: 0,
            eby: 0, ebx: 0, e0y: 1, e1y: 1,
            ex: 0, ey: 0, ez: 1,
            ny: 0,
            mx: 0, my: 0,
            mly: 0, mlz: 0, mty: 0, mtz: 0, mcx: 0,
            teeth: 0,
            rhx: 0, rhy: 0, rhz: 0, rh: 0,
            rbx: 0, rby: 1, rbz: 0, rb: 1,
            rax: 0, ray: 0, raz: 0, ra: 0,
            rpx: 0, rpy: 0, rpz: 0,
            rrz: 0, rrx: -90, rry: 0,
            ri0: 0, ri1: 0, ri2: 0, ris: 0,
            rm0: 0, rm1: 0, rm2: 0, rms: 0,
            rr0: 0, rr1: 0, rr2: 0, rrs: 0,
            rp0: 0, rp1: 0, rp2: 0, rps: 0,
            rt0x: 0, rt0y: 0, rt1x: 0, rt1y: 0, rt2x: 0,
            lhx: 0, lhy: 0, lhz: 0, lh: 0,
            lbx: 0, lby: 1, lbz: 0, lb: 1,
            lax: 0, lay: 0, laz: 0, la: 0,
            lpx: 0, lpy: 0, lpz: 0,
            lrz: 0, lrx: -90, lry: 0,
            li0: 0, li1: 0, li2: 0, lis: 0,
            lm0: 0, lm1: 0, lm2: 0, lms: 0,
            lr0: 0, lr1: 0, lr2: 0, lrs: 0,
            lp0: 0, lp1: 0, lp2: 0, lps: 0,
            lt0x: 0, lt0y: 0, lt1x: 0, lt1y: 0, lt2x: 0
        },
        forward: {
            rby: 0,
            rbz: 1,
            rrz: -90,
            rrx: 90,
            lby: 0,
            lbz: 1,
            lrz: -90,
            lrx: 90,
            e0y: 1,
            e1y: 1,
            ez: 1
        },
        out: {
            rby: -1,
            rbx: 1,
            rrz: -35,
            rrx: 90,
            lby: -1,
            lbx: 1,
            lrz: -35,
            lrx: 90,
            by: -.75,
            bx: -.75
        },
        down: {
            rby: 0,
            rbx: .5,
            rbz: 1,
            rrz: -80,
            rrx: -15,
            lby: 0,
            lbx: .5,
            lbz: 1,
            lrz: -80,
            lrx: -15,
            by: .5
        },
        in_pose: {
            rby: -.75,
            rbx: -.65,
            rbz: -1,
            rrz: 80,
            rrx: 90,
            lby: -.75,
            lbx: -.65,
            lbz: -1,
            lrz: 80,
            lrx: 90,
            bx: .75
        },
        s: {
            ri0: 1, ri1: .9, ri2: .75, ris: -.1,
            rm0: 1, rm1: .9, rm2: .75, rms: -.1,
            rr0: 1, rr1: .9, rr2: .75, rrs: -.1,
            rp0: 1, rp1: .9, rp2: .75, rps: -.1,
            rt0x: -.75, rt0y: .5, rt1x: .5, rt1y: .5, rt2x: .25
        },
        5: {
            ri0: 0, ri1: 0, ri2: 0, ris: 1,
            rm0: 0, rm1: 0, rm2: 0, rms: 1,
            rr0: 0, rr1: 0, rr2: 0, rrs: 1,
            rp0: 0, rp1: 0, rp2: 0, rps: 1,
            rt0x: -1, rt0y: 0, rt1x: -1, rt1y: 0, rt2x: 0
        },
        A: {
            ri0: 1, ri1: 1, ri2: 0, ris: 0,
            rm0: 1, rm1: 1, rm2: 0, rms: 0,
            rr0: 1, rr1: 1, rr2: 0, rrs: 0,
            rp0: 1, rp1: 1, rp2: 0, rps: 0,
            rt0x: -1, rt0y: 0, rt1x: -1, rt1y: 0, rt2x: 0
        },
        1: {
            ri0: 0, ri1: 0, ri2: 0, ris: 0,
            rm0: 1, rm1: 1, rm2: 0.5, rms: 0,
            rr0: 1, rr1: 1, rr2: 0.5, rrs: 0,
            rp0: 1, rp1: 1, rp2: 0.5, rps: 0,
            rt0x: -.75, rt0y: .5, rt1x: .75, rt1y: .5, rt2x: .25
        },
        B: {
            ri0: 0, ri1: 0, ri2: 0, ris: 0,
            rm0: 0, rm1: 0, rm2: 0, rms: 0,
            rr0: 0, rr1: 0, rr2: 0, rrs: 0,
            rp0: 0, rp1: 0, rp2: 0, rps: 0,
            rt0x: -1, rt0y: 0, rt1x: -1, rt1y: 0, rt2x: 0
        },
        default_face: {
            hrx: 0, hry: 0,
            eby: 0, ebx: 0, e0y: 1, e1y: 1,
            ey: 0, ex: 0,
            ny: 0,
            mx: 0, my: 0, mly: 0, mcx: 0,
            mtz: 0,
            teeth: 0
        },
        wide: {
            hrx: .2, hry: -.2,
            eby: 1, ebx: .5, e0y: 1.5, e1y: 1,
            ey: 1, ex: 1,
            ny: 0,
            mx: 0, my: 1, mly: .5, mcx: 0,
            mtz: 0,
            teeth: 0
        },
        narrow: {
            hrx: -.2, hry: .2,
            eby: -.5, ebx: 1, e0y: .85, e1y: .75,
            ey: 0, ex: -1,
            ny: -1,
            mx: -.5, my: 0, mly: -.5, mcx: .5,
            mtz: 0,
            teeth: 0
        },
        teeth: {
            hrx: 0, hry: 0,
            eby: 1, ebx: 1, e0y: 1, e1y: .5,
            ey: 0, ex: 0,
            ny: 0,
            mx: 0, my: 1, mly: -.5, mcx: 0,
            mtz: 0,
            teeth: 1
        },
        tongue: {
            hrx: 0, hry: 0,
            eby: .5, ebx: 0, e0y: .65, e1y: 1,
            ey: 0, ex: 0,
            ny: 0,
            mx: -.25, my: .75, mly: 0, mcx: 0,
            mtz: 1, mty: .25,
            teeth: 0
        },
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map