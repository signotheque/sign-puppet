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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///<reference path="./components/signpuppet/signPuppet.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var miscUtils_1 = __webpack_require__(7);
var SignPuppetApp = (function () {
    function SignPuppetApp() {
    }
    Object.defineProperty(SignPuppetApp.prototype, "channels", {
        get: function () {
            return this.mChannels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignPuppetApp.prototype, "animator", {
        get: function () {
            return this.mPuppet.getAnimator();
        },
        enumerable: true,
        configurable: true
    });
    SignPuppetApp.prototype.create = function () {
        var _this = this;
        var canvas = document.getElementById('the_canvas');
        this.mPuppet = SignPuppet.create();
        var animator = this.mPuppet.getAnimator();
        // animated items
        this.mChannels = SignPuppet.channels;
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
                animator.tween();
                _this.mPuppet.draw(canvas, canvas.width, canvas.height, 0, 0);
                then = now - (delta % interval);
            }
        };
        loop(render);
        //load pose
        // function applyPose(pose: { [key: string]: number }) {
        //     for (var k in pose) {
        //         if (pose.hasOwnProperty(k)) {
        //             // send also value to input widgets
        //             let lInput = <HTMLInputElement>document.getElementById(k);
        //             if (lInput) {
        //                 lInput.value = pose[k].toString();
        //             }
        //             channels[k] = pose[k];
        //         }
        //     }
        // }
        document.addEventListener('DOMContentLoaded', function () {
            // DOM ready, run it!
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
            var setChannelValue = function (pElement) {
                var v = parseFloat(pElement.value);
                if (!isNaN(v)) {
                    var cChannelId = pElement.getAttribute("id");
                    _this.mChannels[cChannelId] = v;
                }
            };
            // setup pose customisation ui
            var lInputs = document.getElementsByTagName('input');
            var _loop_2 = function (i) {
                var lInput = lInputs[i];
                //event
                lInput.addEventListener('change', function () {
                    setChannelValue(lInput);
                    animator.setTarget(_this.channels);
                }, false);
                //initial
                setChannelValue(lInput);
            };
            for (var i = 0; i < lInputs.length; i++) {
                _loop_2(i);
            }
            // apply pose links
            // function requestApplyPose(pElement: HTMLElement, pResetPose: boolean) {
            //     pElement.addEventListener("click", function (e) {
            //         e.preventDefault();
            //         if (pResetPose) {
            //             applyPose(SignPuppet.channels);
            //             applyPose({ rt0x: -1, rt1x: -1, lt0x: -1, lt1x: -1 });
            //         }
            //         applyPose(poses[stripSharpFromHref(pElement.getAttribute('href'))]);
            //         animator.setTarget(channels);
            //     }, false);
            // }
            // function requestApplyPoses(pElements: NodeListOf<Element>, pResetPose: boolean) {
            //     for (let i = 0; i < pElements.length; i++) {
            //         let lElement = pElements[i];
            //         requestApplyPose(<HTMLElement>lElement, pResetPose);
            //     };
            // }
            // //body pose links
            // let lBodyPoseButtons = document.querySelectorAll("#poses a");
            // requestApplyPoses(lBodyPoseButtons, true);
            // //other pose links
            // let lHandPoseButtons = document.querySelectorAll("#hand_poses a");
            // requestApplyPoses(lHandPoseButtons, false);
            // let lFacePoseButtons = document.querySelectorAll("#face_poses a");
            // requestApplyPoses(lFacePoseButtons, false);
        }, false);
    };
    return SignPuppetApp;
}());
exports.SignPuppetApp = SignPuppetApp;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.render = function () {
        return React.createElement("h1", null,
            "Hello from ",
            this.props.compiler,
            " and ",
            this.props.framework,
            "!");
    };
    return Hello;
}(React.Component));
exports.Hello = Hello;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var miscUtils_1 = __webpack_require__(7);
var poses_1 = __webpack_require__(6);
var PoseButtons = (function (_super) {
    __extends(PoseButtons, _super);
    function PoseButtons() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //load pose
        _this.applyPose = function (pPose, pChannels) {
            for (var k in pPose) {
                if (pPose.hasOwnProperty(k)) {
                    // send also value to input widgets
                    var lInput = document.getElementById(k);
                    if (lInput) {
                        lInput.value = pPose[k].toString();
                    }
                    pChannels[k] = pPose[k];
                }
            }
        };
        // apply pose links
        _this.requestApplyPose = function (pElement, pApp, pResetPose) {
            pElement.addEventListener("click", function (e) {
                e.preventDefault();
                if (pResetPose) {
                    _this.applyPose(SignPuppet.channels, pApp.channels);
                    _this.applyPose({ rt0x: -1, rt1x: -1, lt0x: -1, lt1x: -1 }, pApp.channels);
                }
                _this.applyPose(poses_1.poses[miscUtils_1.stripSharpFromHref(pElement.getAttribute('href'))], pApp.channels);
                _this.props.app.animator.setTarget(_this.props.app.channels);
            }, false);
        };
        _this.requestApplyPoses = function (pElements, pApp, pResetPose) {
            for (var i = 0; i < pElements.length; i++) {
                var lElement = pElements[i];
                _this.requestApplyPose(lElement, pApp, pResetPose);
            }
            ;
        };
        return _this;
    }
    PoseButtons.prototype.componentDidMount = function () {
        //body pose links
        var lBodyPoseButtons = document.querySelectorAll("#" + this.props.id + " a");
        this.requestApplyPoses(lBodyPoseButtons, this.props.app, this.props.resetPoses);
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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(4);
var hello_1 = __webpack_require__(2);
var poseButtons_1 = __webpack_require__(3);
var app_1 = __webpack_require__(1);
var lSignPuppetApp = new app_1.SignPuppetApp();
lSignPuppetApp.create();
var lBodyPoses = [
    { href: "forward", label: "Forward" },
    { href: "out", label: "Out" },
    { href: "down", label: "Down" },
    { href: "in_pose", label: "In" },
    { href: "default_pose", label: "Default" },
];
var lHandPoses = [
    { href: "s", label: "Fist" },
    { href: "5", label: "Five" },
    { href: "A", label: "Thumb" },
    { href: "1", label: "Point" },
    { href: "B", label: "Palm" },
];
var lFacePoses = [
    { href: "wide", label: "Up extreme" },
    { href: "narrow", label: "Down extreme" },
    { href: "teeth", label: "Teeth" },
    { href: "tongue", label: "Tongue" },
    { href: "default_face", label: "Default" },
];
ReactDOM.render(React.createElement("div", null,
    React.createElement(hello_1.Hello, { compiler: "TypeScript", framework: "React" }),
    React.createElement("h3", null, "Sample Poses"),
    React.createElement("dl", { className: 'clearfix' },
        React.createElement(poseButtons_1.PoseButtons, { app: lSignPuppetApp, category: "Body:", id: "poses", resetPoses: true, poses: lBodyPoses }),
        React.createElement(poseButtons_1.PoseButtons, { app: lSignPuppetApp, category: "Hand:", id: "hand_poses", resetPoses: false, poses: lHandPoses }),
        React.createElement(poseButtons_1.PoseButtons, { app: lSignPuppetApp, category: "Face:", id: "face_poses", resetPoses: false, poses: lFacePoses }))), document.getElementById("example"));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.poses = {
    default_pose: {},
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.stripSharpFromHref = function (pString) {
    return pString.substr(1);
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map