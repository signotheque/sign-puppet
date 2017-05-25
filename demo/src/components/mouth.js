
/*
 * Mouth Class
 * 
 * renders a cartoon mouth based on parameters
 */
var Mouth = {
    create: function (points, scale) {
        return new Mouth.instance(points, scale);
    },
    instance: utils.constructor(function (points, scale) {
        this.points = points;
        this.scale = scale;
    }, {
            draw: function (g, vars, color, outline) {
                var s = this.scale;

                var height = (this.points[0].y + this.points[1].y) / 2;
                var center = (this.points[0].x + this.points[1].x) / 2;
                var width = Math.abs(this.points[0].x - this.points[1].x);
                var wide = vars.mx * width / 2 * s;

                if (vars.mlz > 0.25) {
                    wide = -6 * s;
                    height -= 4 * s;
                }

                var x1 = center - Math.max(1, width / 2 + wide);
                var x2 = center + Math.max(1, width / 2 + wide);

                if (vars.mlz > 0.25) {
                    g.drawCurve(x1, height - 4 * s, center, height - 8 * s, x2, height - 4 * s, 3 * s, outline);
                    g.drawCurve(x1, height + 6 * s, center, height + 10 * s, x2, height + 6 * s, 3 * s, outline);
                }

                if (vars.mlz < -0.25 || vars.mlz > 0.25) {
                    g.drawLine(x1, height, x2, height, 3 * s, outline);
                    g.drawLine(x1, height - 2 * s, x1, height + 2 * s, 3 * s, outline);
                    g.drawLine(x2, height - 2 * s, x2, height + 2 * s, 3 * s, outline);
                    return;
                }

                var lineWidth = 5 * s + 2 * s * Math.abs(vars.mx) / 25 * s;

                var open = x2 - x1 > 2 * s ? vars.my : 0;
                var mood = x2 - x1 > 2 * s ? vars.mly : 0;

                //mouth shapes
                var shift = -5 * s * open - 5 * s * open * (1 - Math.abs(mood));
                height += shift;
                var size = 5 + Math.abs(shift * 2);
                var y1 = size * Math.min(0, open - vars.mly);
                var y0 = size * (mood - 1) / 2 * Math.max(open, Math.abs(mood));
                var y2 = size * (y1 / size - open);

                var fill = vars.teeth ? '#fff' : outline;
                g.drawCurveShape([
                    { x: x1, y: height - y0 },
                    { x: center, y: height - y1 },
                    { x: x2, y: height - y0 },
                    { x: center, y: height - y2 },
                    { x: x1, y: height - y0 }
                ], lineWidth, fill, outline);

                if (vars.teeth) {
                    g.drawLine(x1, height - y0, x2, height - y0, 2 * s, outline);
                }

                if (vars.mtz > 0.25) {
                    var y = vars.mty > 0
                        ? height - y0 - (y2 - y0) * vars.mty
                        : height - y0 + (y1 - y0) * vars.mty;
                    g.drawLine((x1 + center) / 2, y, (x2 + center) / 2, y, 8 * s, outline);
                    g.drawLine((x1 + center) / 2, y, (x2 + center) / 2, y, 3 * s, color);
                }

            }
        })
};
