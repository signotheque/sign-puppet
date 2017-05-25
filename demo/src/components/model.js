
/*
 * Model Class
 *
 * manages a set of shapes and the points that define them
 */
var Model = {
    nextShapeId: 0,
    capsule_mixin: {
        draw: function (g, channels, color, outline) {
            Capsule.draw(this, g, color, outline);
        }
    },
    create: function () {
        return new Model.instance();
    },
    instance: utils.constructor(function () {
        this.shapes = [];
        this.points = [];
    }, {
            addShape: function (s, asCapsule) {
                asCapsule = asCapsule !== false;
                s.id = Model.nextShapeId += 1;
                if (asCapsule) {
                    s.smudges = s.smudges || [];
                    s.draw = Model.capsule_mixin.draw;
                }
                this.shapes.push(s);
                return s;
            },
            addPoint: function (p) {
                p.orig_x = p.x;
                p.orig_y = p.y;
                p.orig_z = p.z;
                this.points.push(p);
                return p;
            },
            pose: function (x, y, poseModel) {
                var i, p;
                for (i = 0; i < this.points.length; i += 1) {
                    p = this.points[i];
                    p.x = p.orig_x;
                    p.y = p.orig_y;
                    p.z = p.orig_z;
                }

                poseModel();

                for (i = 0; i < this.points.length; i += 1) {
                    p = this.points[i];
                    p.x += x;
                    p.y += y;
                }
            },
            draw: function (drawShape) {
                var i;
                for (i = 0; i < this.shapes.length; i += 1) {
                    var s = this.shapes[i];
                    Capsule.calculateCenter(s);
                }

                this.shapes.sort(function (a, b) {
                    if ((a.layer || 0) !== (b.layer || 0)) {
                        return (a.layer || 0) - (b.layer || 0);
                    }
                    if (a.center.z === b.center.z) {
                        return a.id - b.id;
                    }
                    return a.center.z - b.center.z;
                });

                for (i = 0; i < this.shapes.length; i += 1) {
                    drawShape(this.shapes[i]);
                }
            }
        })
};

