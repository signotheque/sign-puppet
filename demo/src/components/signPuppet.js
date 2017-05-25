
/*
 * SignPuppet Class
 * 
 * main class for the humanoid puppet - building, posing and rendering
 */
var SignPuppet = {
    channels: {
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
    getProportions: function (scale) {
        var border, headHeight, bodyHeight, palmWidth,
            headRadius, chinRadius, fingerRadius, palmRadius,
            headDepth, chinDepth, noseDepth;
        var k, i;
        var props = {
            border: border = 5,
            thinBorder: 3,
            headHeight: headHeight = 270,
            foreheadHeight: headHeight + 50,
            eyeHeight: headHeight + 35,
            noseHeight: headHeight + 15,
            noseWidth: 5,
            nostrilWidth: 5,
            cheekWidth: 25,
            cheekHeight: headHeight + 5,
            mouthHeight: headHeight - 5,
            mouthWidth: 30,
            chinHeight: headHeight + 20,
            neckWidth: 60,
            bodyHeight: bodyHeight = 200,
            waistWidth: 90,
            shoulderWidth: 45,
            shoulderHeight: bodyHeight - 5,
            elbowHeight: 80,
            lowerArmLength: 100,
            wristLength: 10,
            palmHeight: 25,
            palmWidth: palmWidth = 25,
            knuckleHeight: 16,
            thumbKnuckles: [0, 15, 30, 45],
            knuckleProportions: [1, 0.8, 0.7],
            fingerProportions: [1, 1.2, 1, 0.7],
            fingerSpread: 15,

            bodyRadius: 60,
            headRadius: headRadius = 115,
            chinRadius: chinRadius = 105,
            mouthScale: 1,
            cheekRadius: 45,
            noseRadius: 13,
            nostrilRadius: 10,
            eyeScale: 1,
            armRadius: 50,
            wristRadius: 35,
            fingerRadius: fingerRadius = 16,
            palmRadius: palmRadius =
            border + 4 * (fingerRadius - border + 1) - palmWidth,
            thumbRadii: [palmRadius, 22, 18, 18],

            shoulderDepth: 100,
            headDepth: headDepth = 15,
            chinDepth: chinDepth = 30,
            cheekDepth: 50,
            noseDepth: noseDepth =
            (headDepth + chinDepth) / 2 + (headRadius / 2 + chinRadius / 2) / 2,
            nostrilDepth: noseDepth - 4,
            eyeSpacing: 40,
            eyeDepth: noseDepth - 15,
            mouthDepth: noseDepth - 10,
            thumbDepth: 5,

            bodyShiftAmount: 50,
            shoulderShrugAmount: 30,
            noseCrinkleAmount: 5,
            jawAmount: 25
        };
        for (k in props) {
            if (props.hasOwnProperty(k)) {
                if (typeof props[k] === 'number') {
                    props[k] *= scale;
                } else if (!k.match(/Proportions$/)) {
                    for (i = 0; i < props[k].length; i += 1) {
                        props[k][i] *= scale;
                    }
                }
            }
        }
        return props;
    },

    build: function (p, model) {
        var b = {
            headPoints: [],
            nosePoints: [],
            bodyPoints: []
        };
        var headPoint = function (x, y, z) {
            var pt = model.addPoint({ x: x, y: y, z: z });
            b.headPoints.push(pt);
            return pt;
        };
        var nosePoint = function (x, y, z, f) {
            var pt = headPoint(x, y, z);
            pt.crinkleFactor = f;
            b.nosePoints.push(pt);
            return pt;
        };
        var bodyPoint = function (x, y, z, f, ff) {
            var pt = model.addPoint({ x: x, y: y, z: z });
            pt.shrugFactor = f;
            pt.shiftFactor = ff;
            b.bodyPoints.push(pt);
            return pt;
        };

        (function (x, y, z) {
            b.leftTarget = bodyPoint(x, y, z);
            b.rightTarget = bodyPoint(-x, y, z);
        }(p.waistWidth / 2 + p.bodyRadius, -p.bodyHeight / 2, 0));

        // torso
        b.torso = (function (torso) {
            return torso(p.waistWidth / 2, -p.bodyHeight, -201);
        }(function (x, y, z) {
            return model.addShape({
                points: [
                    bodyPoint(-x, y, z, 0.25),
                    bodyPoint(-x, 0, z, 0, 0.25),
                    bodyPoint(x, 0, z, 0, 0.25),
                    bodyPoint(x, y, z, 0.25)
                ],
                border: p.border,
                size: p.bodyRadius,
                layer: -5,
                color: 1
            });
        }));

        // neck
        b.neck = (function (neck) {
            var point = function (y, shiftFactor) {
                return bodyPoint(0, y, -200, shiftFactor);
            };
            return neck([
                point(-p.bodyHeight - p.bodyRadius / 2, 0.5),
                point(-p.headHeight, 0)
            ]);
        }(function (pts) {
            return model.addShape({
                points: pts,
                border: p.border,
                size: p.neckWidth,
                layer: -3
            });
        }));

        // head
        b.head = model.addShape({
            points: [
                headPoint(0, -p.chinHeight, -100 + p.chinDepth),
                headPoint(0, -p.foreheadHeight, -100 + p.headDepth)
            ],
            border: p.border,
            size: p.chinRadius,
            size2: p.headRadius,
            layer: -2,
            leftTarget: headPoint(0, -p.noseHeight, 0),
            rightTarget: headPoint(0, -p.noseHeight, 0)
        });

        b.headPivot = bodyPoint(b.neck.points[1].x, b.neck.points[1].y, -100);

        // eyes
        (function (x, y, z) {
            (function (eye) {
                b.leftEye = eye(1);
                b.rightEye = eye(-1);
            }(function (side) {
                var pts = [headPoint(side * x, y, z)];
                var shape = model.addShape(Eye.create(pts, side, p.eyeScale), false);
                shape.layer = -1;
                return shape;
            }));
        }(p.eyeSpacing / 2, -p.eyeHeight, -100 + p.eyeDepth));

        // nose
        b.nose = (function (x, y, z) {
            var n = model.addShape({
                points: [
                    nosePoint(-x, y, z, 0.5),
                    nosePoint(x, y, z, 0.5)
                ],
                size: p.noseRadius,
                border: p.thinBorder,
                layer: -1
            });

            (function (x2, dx, y2, z2) {
                (function (nostril) {
                    b.leftNostril = nostril(1);
                    b.rightNostril = nostril(-1);
                }(function (side) {
                    return model.addShape({
                        points: [
                            nosePoint(side * (x2 + dx), y2, z2),
                            nosePoint(side * (x2 + dx + 1), y2, z2)
                        ],
                        size: p.nostrilRadius,
                        border: p.thinBorder,
                        layer: -1
                    });
                }));
            }(x, p.nostrilWidth, y, -100 + p.nostrilDepth));

            return n;
        }(p.noseWidth / 2, -p.noseHeight, -100 + p.noseDepth));

        // cheeks
        b.cheeks = (function (x, y, z) {
            return model.addShape({
                points: [
                    headPoint(-x, y, z),
                    headPoint(x, y, z)
                ],
                border: p.border,
                size: p.cheekRadius,
                layer: -2,
                smudges: [{
                    points: b.head.points,
                    scale: 50,
                    size: p.chinRadius,
                    size2: p.headRadius
                }]
            });
        }(p.cheekWidth, -p.cheekHeight, -100 + p.cheekDepth));

        // mouth
        b.mouth = (function (x, y, z) {
            var pts = [
                headPoint(-x, y, z),
                headPoint(x, y, z)
            ];
            var shape = model.addShape(Mouth.create(pts, p.mouthScale), false);
            shape.layer = -1;
            return shape;
        }(p.mouthWidth / 2, -p.mouthHeight, -100 + p.mouthDepth));

        b.mouth.color = 2;

        // arm
        (function (arm) {
            b.leftArm = arm(1);
            b.rightArm = arm(-1);
        }(function (side) {
            var s = side > 0;
            var a = {
                handPoints: [],
                armPoints: []
            };
            var armPoint = function (x, y, z) {
                var pt = model.addPoint({ x: x, y: y, z: z });
                a.armPoints.push(pt);
                return pt;
            };
            var handPoint = function (x, y, z, d) {
                var pt = model.addPoint({ x: x, y: y, z: z });
                pt.d = d;
                a.handPoints.push(pt);
                return pt;
            };

            (function (x, y, z) {
                a.handPivot = model.addPoint({ x: x, y: y, z: z });
                a.handMove = model.addPoint({ x: x, y: y, z: z });
                a.handTarget = handPoint(x, y, z);
            }(
                side * (p.waistWidth / 2 + p.bodyRadius + p.lowerArmLength),
                -p.elbowHeight,
                0
                ));

            a.shoulder = (function (shoulder) {
                return shoulder(
                    b.torso.points[s ? 3 : 0],
                    armPoint(
                        side * (p.waistWidth / 2 + p.shoulderWidth),
                        -p.shoulderHeight,
                        -p.shoulderDepth
                    )
                );
            }(function (pt0, pt1) {
                b.bodyPoints.push(pt1);
                var shoulder = model.addShape({
                    points: [
                        pt0,
                        pt1
                    ],
                    border: p.border,
                    size: p.bodyRadius,
                    size2: p.armRadius,
                    layer: -4,
                    color: 1
                });
                (function (smudge) {
                    smudge(b.torso.points[s ? 0 : 3]);
                    smudge(b.torso.points[s ? 2 : 1]);
                }(function (pt) {
                    return shoulder.smudges.push({
                        scale: 4,
                        size: p.bodyRadius,
                        points: [pt0, pt]
                    });
                }));
                return shoulder;
            }));

            a.upper = model.addShape({
                points: [
                    a.shoulder.points[1],
                    armPoint(
                        side * (p.waistWidth / 2 + p.bodyRadius), -p.elbowHeight, 0
                    )
                ],
                border: p.border,
                size: p.armRadius,
                size2: p.armRadius,
                color: 1,
                layer: -3,
                smudges: [{
                    size: p.armRadius,
                    points: [a.shoulder.points[1], a.shoulder.points[0]]
                }]
            });

            a.lower = model.addShape({
                points: [
                    a.upper.points[1],
                    handPoint(
                        a.handPivot.x,
                        a.handPivot.y,
                        a.handPivot.z - p.wristLength
                    )
                ],
                border: p.border,
                size: p.armRadius,
                size2: p.wristRadius,
                color: 1,
                smudges: [{
                    size: p.armRadius,
                    points: [a.upper.points[1], a.upper.points[0]]
                }]
            });
            a.armPoints.push(a.lower.points[1]);

            a.palm = (function (palm) {
                return palm(
                    a.handPivot.x,
                    a.handPivot.y, p.palmWidth / 2,
                    0, p.palmHeight
                );
            }(function (x, y, dy, z, dz) {
                return model.addShape({
                    points: [
                        handPoint(x, y + dy, z),
                        handPoint(x, y - dy, z),
                        handPoint(x, y - dy, z + dz),
                        handPoint(x, y + dy, z + dz)
                    ],
                    border: p.border,
                    size: p.palmRadius
                });
            }));

            (function (fingers) {
                fingers(
                    a.handPivot.x,
                    a.handPivot.y,
                    p.palmHeight + p.palmRadius / 2 - p.fingerRadius / 2,
                    p.knuckleHeight,
                    p.palmWidth / 2 + p.palmRadius / 2 - p.fingerRadius / 2,
                    p.fingerProportions
                );
            }(function (x, y, z, dz, spread, props) {
                (function (finger) {
                    finger('index', x, y - spread, z, props[0]);
                    finger('middle', x, y - spread / 3, z, props[1]);
                    finger('ring', x, y + spread / 3, z, props[2]);
                    finger('pinky', x, y + spread, z, props[3]);
                }(function (name, x, y, z, size) {
                    var points = [];
                    var point = function (i) {
                        var d = i && side * size * dz * p.knuckleProportions[i - 1];
                        var pt = handPoint(x, y, z + i * d, d);
                        points.push(pt);
                        return pt;
                    };

                    a[name] = (function (knuckle) {
                        var k = null;
                        var knuckles = [];
                        knuckles.push(k = knuckle([point(0), point(1)], k));
                        knuckles.push(k = knuckle([k.points[1], point(2)], k));
                        knuckles.push(k = knuckle([k.points[1], point(3)], k));
                        return {
                            knuckles: knuckles,
                            points: points
                        };
                    }(function (pts, previous) {
                        var current = model.addShape({
                            points: pts,
                            border: p.border,
                            size: p.fingerRadius
                        });
                        (function (smudge) {
                            if (previous) {
                                smudge(current, [previous.points[1], previous.points[0]]);
                                smudge(previous, [current.points[0], current.points[1]]);
                            } else {
                                var pt = handPoint(x, y, z - dz);
                                smudge(current, [current.points[0], pt]);
                                a.palm.smudges.push({
                                    points: [pt, current.points[1]],
                                    size: p.fingerRadius,
                                    scale: 5
                                });
                            }
                        }(function (knuckle, points) {
                            knuckle.smudges.push({
                                size: p.fingerRadius,
                                points: points
                            });
                        }));
                        return current;
                    }));
                }));
            }));

            a.thumb = (function (knuckle) {
                var knuckles = [];
                var points = [];
                var point = function (i) {
                    var d = p.thumbKnuckles[i] - p.thumbKnuckles[i - 1];
                    var pt = handPoint(
                        a.handPivot.x - side * p.thumbDepth,
                        a.handPivot.y - p.palmWidth * 0.55,
                        p.thumbKnuckles[0],
                        side * d
                    );
                    points.push(pt);
                    return pt;
                };
                var k = null;
                knuckles.push(k = knuckle(0, [point(0), point(1)], k));
                knuckles.push(k = knuckle(1, [k.points[1], point(2)], k));
                knuckles.push(k = knuckle(2, [k.points[1], point(3)], k));
                return {
                    knuckles: knuckles,
                    points: points
                };
            }(function (i, pts, previous) {
                var current = model.addShape({
                    points: pts,
                    border: p.border,
                    size: p.thumbRadii[i],
                    size2: p.thumbRadii[i + 1]
                });
                (function (smudge) {
                    if (previous) {
                        smudge(current, [previous.points[1], previous.points[0]], -1);
                        smudge(previous, [current.points[0], current.points[1]], 1);
                    } else {
                        smudge(current, [a.palm.points[1], a.palm.points[0]], 0);
                        smudge(current, [a.palm.points[1], a.palm.points[2]], 0);
                        smudge(a.palm, [current.points[0], a.palm.points[1]], 0);
                    }
                }(function (shape, points, di) {
                    shape.smudges.push({
                        points: points,
                        size: p.thumbRadii[i],
                        size2: p.thumbRadii[i + di]
                    });
                }));
                return current;
            }));
            return a;
        }));
        return b;
    },

    create: function () {
        return new SignPuppet.instance();
    },

    instance: utils.constructor(function () {
        this.graphics = Graphics.create(null);
        this.fillColors = ['#ccc', '#888', '#ccc'];
        this.outlineColor = '#555';
    }, {

            getAnimator: function () {
                return this.animator || this.setAnimator(Animator.create(SignPuppet.channels));
            },

            setAnimator: function (animator) {
                this.animator = animator;
                return animator;
            },

            draw: function (canvas, w, h, x, y, channels) {
                var self = this;

                channels = channels || (this.animator ? this.animator.channels : {});

                for (k in SignPuppet.channels) {
                    if (channels[k] === undefined) {
                        channels[k] = SignPuppet.channels[k];
                    }
                }


                w = w || canvas.width;
                h = h || canvas.height;

                var scale = Math.min(w / 600, h / 400);
                if (scale !== this.scale) {
                    this.buildModel(scale);
                }

                var model = this.model;
                model.pose((x || 0) + w / 2, (y || 0) + h, function () {
                    self.pose(channels);
                });

                var context = canvas.getContext('2d');
                context.lineJoin = 'round';
                context.lineCap = 'round';

                self.graphics.context = context;
                model.draw(function (shape) {
                    shape.draw(
                        self.graphics,
                        channels,
                        self.fillColors[shape.color || 0],
                        self.outlineColor,
                        self.outlineColor
                    );
                });
            },

            buildModel: function (scale) {
                this.scale = scale;
                this.model = Model.create();
                this.proportions = SignPuppet.getProportions(scale);
                this.body = SignPuppet.build(this.proportions, this.model);
            },

            pose: function (vars) {
                var p = this.proportions;
                var body = this.body;
                var leftArm = body.leftArm;
                var rightArm = body.rightArm;

                var deg2rad = Math.PI / 180;
                var a = 90 * deg2rad;

                var handFactor = p.palmWidth;

                rightArm.handPivot.x -= vars.rpx * handFactor;
                rightArm.handPivot.y += vars.rpy * handFactor;
                rightArm.handPivot.z += vars.rpz * handFactor;

                leftArm.handPivot.x += vars.lpx * handFactor;
                leftArm.handPivot.y += vars.lpy * handFactor;
                leftArm.handPivot.z += vars.lpz * handFactor;

                rightArm.handTarget.x -= vars.lax * handFactor;
                rightArm.handTarget.y += vars.lay * handFactor;
                rightArm.handTarget.z += vars.laz * handFactor;

                leftArm.handTarget.x += vars.rax * handFactor;
                leftArm.handTarget.y += vars.ray * handFactor;
                leftArm.handTarget.z += vars.raz * handFactor;

                var bodyFactor = p.waistWidth / 2 + p.bodyRadius;
                body.leftTarget.x += vars.lbx * bodyFactor;
                body.leftTarget.y += vars.lby * bodyFactor;
                body.leftTarget.z += vars.lbz * bodyFactor;
                body.leftTarget.shiftFactor = 0.5 - vars.lby / 2;

                body.rightTarget.x -= vars.rbx * bodyFactor;
                body.rightTarget.y += vars.rby * bodyFactor;
                body.rightTarget.z += vars.rbz * bodyFactor;
                body.rightTarget.shiftFactor = 0.5 - vars.rby / 2;

                var headFactor = p.headRadius / 2;
                body.head.leftTarget.x += vars.lhx * headFactor;
                body.head.leftTarget.y += vars.lhy * headFactor;
                body.head.leftTarget.z += vars.lhz * headFactor;

                body.head.rightTarget.x -= vars.rhx * headFactor;
                body.head.rightTarget.y += vars.rhy * headFactor;
                body.head.rightTarget.z += vars.rhz * headFactor;

                body.cheeks.size = p.cheekRadius + vars.mcx * p.cheekRadius / 2;

                Pose.shiftY(
                    body.nosePoints,
                    vars.ny * p.noseCrinkleAmount,
                    'crinkleFactor'
                );

                Pose.rotateXY(
                    body.headPoints, body.headPivot, vars.hrx * a, vars.hry * a
                );
                body.headPoints[0].y += vars.my * p.jawAmount * Math.max(0, -vars.hry);

                var shift = vars.bx * p.bodyShiftAmount;
                var factor = 'shiftFactor';
                Pose.shiftX(body.bodyPoints, shift, factor);
                Pose.shiftX(body.headPoints, shift, factor);

                var shrug = vars.by * p.shoulderShrugAmount;
                factor = 'shrugFactor';
                Pose.shiftY(body.neck.points, shrug, factor);
                Pose.shiftY(rightArm.shoulder.points, shrug, factor);
                Pose.shiftY(leftArm.shoulder.points, shrug, factor);

                Pose.rotateY3(
                    rightArm.index.points,
                    -a - vars.ri0 * a, -vars.ri1 * a, -vars.ri2 * a,
                    -vars.ris * p.fingerSpread
                );
                Pose.rotateY3(
                    rightArm.middle.points,
                    -a - vars.rm0 * a, -vars.rm1 * a, -vars.rm2 * a,
                    -vars.rms * p.fingerSpread / 3
                );
                Pose.rotateY3(
                    rightArm.ring.points,
                    -a - vars.rr0 * a, -vars.rr1 * a, -vars.rr2 * a,
                    vars.rrs * p.fingerSpread / 3
                );
                Pose.rotateY3(
                    rightArm.pinky.points,
                    -a - vars.rp0 * a, -vars.rp1 * a, -vars.rp2 * a,
                    vars.rps * p.fingerSpread
                );
                Pose.rotateThumb(
                    -1,
                    rightArm.thumb.points,
                    -vars.rt0x * a, vars.rt0y * a,
                    -vars.rt1x * a, vars.rt1y * a,
                    -vars.rt2x * a + -vars.rt1x * a
                );

                Pose.rotateZXY(
                    rightArm.handPoints,
                    rightArm.handPivot,
                    -vars.rrz * deg2rad,
                    vars.rrx * deg2rad,
                    -vars.rry * deg2rad
                );

                Pose.rotateY3(
                    leftArm.index.points,
                    a + vars.li0 * a, vars.li1 * a, vars.li2 * a,
                    -vars.lis * p.fingerSpread
                );
                Pose.rotateY3(
                    leftArm.middle.points,
                    a + vars.lm0 * a, vars.lm1 * a, vars.lm2 * a,
                    -vars.lms * p.fingerSpread / 3
                );
                Pose.rotateY3(
                    leftArm.ring.points,
                    a + vars.lr0 * a, vars.lr1 * a, vars.lr2 * a,
                    vars.lrs * p.fingerSpread / 3
                );
                Pose.rotateY3(
                    leftArm.pinky.points,
                    a + vars.lp0 * a, vars.lp1 * a, vars.lp2 * a,
                    vars.lps * p.fingerSpread
                );
                Pose.rotateThumb(
                    1,
                    leftArm.thumb.points,
                    vars.lt0x * a, -vars.lt0y * a,
                    vars.lt1x * a, -vars.lt1y * a,
                    vars.lt2x * a + vars.lt1x * a
                );

                Pose.rotateZXY(
                    leftArm.handPoints,
                    leftArm.handPivot,
                    vars.lrz * deg2rad,
                    vars.lrx * deg2rad,
                    vars.lry * deg2rad
                );

                var rMovePoints = [rightArm.handMove];
                var rnormalize = vars.rb + vars.rh + vars.ra;
                Pose.move(rMovePoints, rightArm.handPivot, { x: 0, y: 0, z: 0 });
                Pose.moveBy(rMovePoints, body.rightTarget, vars.rb / rnormalize);
                Pose.moveBy(rMovePoints, body.head.rightTarget, vars.rh / rnormalize);
                Pose.moveBy(rMovePoints, leftArm.handTarget, vars.ra / rnormalize);


                var lMovePoints = [leftArm.handMove];
                var lnormalize = vars.lb + vars.lh + vars.la;
                Pose.move(lMovePoints, leftArm.handPivot, { x: 0, y: 0, z: 0 });
                Pose.moveBy(lMovePoints, body.leftTarget, vars.lb / lnormalize);
                Pose.moveBy(lMovePoints, body.head.leftTarget, vars.lh / lnormalize);
                Pose.moveBy(lMovePoints, rightArm.handTarget, vars.la / lnormalize);


                var zoomPivot = { x: 0, y: -p.bodyHeight };
                Pose.zoomDistort(rMovePoints, zoomPivot, 0.002);
                Pose.zoomDistort(lMovePoints, zoomPivot, 0.002);

                if (vars.la > vars.ra) {
                    Pose.move(rightArm.handPoints, rightArm.handPivot, rightArm.handMove);
                    Pose.move(leftArm.handPoints, leftArm.handPivot, leftArm.handMove);
                } else {
                    Pose.move(leftArm.handPoints, leftArm.handPivot, leftArm.handMove);
                    Pose.move(rightArm.handPoints, rightArm.handPivot, rightArm.handMove);
                }

                var armLength = p.lowerArmLength;
                Pose.poseElbow(-1, rightArm.armPoints, armLength);
                Pose.poseElbow(1, leftArm.armPoints, armLength);

            }
        })
};

window.aslfont = window.aslfont || {};
window.aslfont.SignPuppet = SignPuppet;

