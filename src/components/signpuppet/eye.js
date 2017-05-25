
/*
 * Eye Class
 * 
 * renders a cartoon eye based on parameters
 */
var Eye = {
    create: function (points, side, scale) {
        return new Eye.instance(points, side, scale);
    },
    instance: utils.constructor(function (points, side, scale) {
        this.points = points;
        this.side = side;
        this.scale = scale;
    }, {
            draw: function (g, vars, color, outline, pupilColor) {
                var s = this.scale;
                var side = this.side;
                var x0 = this.points[0].x;

                var y0 = this.points[0].y;

                var eyeSize = 15 * s * vars.ez;
                var upperLidHeight = Math.max(0, 0.85 * vars.e0y);
                var lowerLidHeight = Math.max(0, 0.95 * vars.e1y);
                g.drawLine(x0, y0, x0 + 1, y0, eyeSize + 3 * s, outline);
                g.drawLine(x0, y0, x0 + 1, y0, eyeSize, '#fff');

                //pupil
                var pupilx = x0 + 2 * s * vars.hry + 3 * s * vars.ex;
                var pupily = y0 - 3 * s * vars.ey;
                g.drawLine(
                    pupilx, pupily,
                    pupilx + 1, pupily,
                    9 * s,
                    pupilColor
                );

                //lid
                g.drawLine(
                    x0 - side * eyeSize / 3, y0 - upperLidHeight * eyeSize - 3 * s * vars.ey,
                    x0 + side * eyeSize / 3, y0 - upperLidHeight * eyeSize - 3 * s * vars.ey,
                    eyeSize + 3 * s,
                    color
                );

                g.drawLine(
                    x0 - side * eyeSize / 3, y0 + lowerLidHeight * eyeSize - 3 * s * vars.ey,
                    x0 + side * eyeSize / 3, y0 + lowerLidHeight * eyeSize - 3 * s * vars.ey,
                    eyeSize + 3 * s,
                    color
                );

                var opened = vars.e0y + vars.e1y;
                if (opened < 3 / 5) {
                    g.drawLine(
                        x0 - side * eyeSize / 2, y0,
                        x0 + side * eyeSize / 2, y0,
                        3 * s,
                        outline
                    );
                    if (vars.e1y < 0) {
                        g.drawCurve(
                            x0 - side * eyeSize / 2, y0 + 3 * s,
                            x0, y0,
                            x0 + side * eyeSize / 2, y0 + 3 * s,
                            3 * s,
                            outline
                        );
                    }
                }

                //brow
                var x1 = x0 + 15 * s * side;
                var x2 = x0;
                var x3 = x0 - 10 * s * side;
                var y1 = y0 - 16 * s;
                var y2 = y0 - 19 * s;
                var y3 = y0 - 18 * s;
                var up = Math.max(0, vars.eby);
                var down = -Math.min(0, vars.eby);

                y1 -= 9 * s * (vars.eby - up * vars.ebx);
                y2 -= 8 * s * (vars.eby - vars.ebx)
                    + 5 * s * vars.ebx * up;
                y3 -= 10 * s * vars.eby + 5.5 * s * down;
                x2 -= side * up * vars.ebx * 5 * s;
                x2 -= side * down * 15 * s;
                x1 -= side * down * 8 * s;

                g.drawCurve(x1, y1, x2, y2, x3, y3, 3 * s, outline);

            }
        })
};
