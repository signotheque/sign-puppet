
/*
 * Graphics
 * 
 * wraps the methods of the 2d canvas context for convenience
 */
var Graphics = {

    create: function (context) {
        return new Graphics.instance(context);
    },
    instance: utils.constructor(function (context) {
        this.context = context;
    }, {
            drawLine: function (x, y, x2, y2, w, color) {
                var c = this.context;
                c.strokeStyle = color;
                c.lineWidth = w;
                c.beginPath();
                c.moveTo(x, y);
                c.lineTo(x2 === x && y2 === y ? x2 + 1 : x2, y2);
                c.stroke();
            },
            drawCurve: function (x, y, x2, y2, x3, y3, w, color) {
                var c = this.context;
                c.strokeStyle = color;
                c.lineWidth = w;
                c.beginPath();
                c.moveTo(x, y);
                c.quadraticCurveTo(x2, y2, x3, y3);
                c.stroke();
            },
            drawShape: function (points, w, color, stroke) {
                var i;
                var c = this.context;
                c.strokeStyle = stroke || color;
                c.fillStyle = color;
                c.lineWidth = w;
                c.beginPath();
                c.moveTo(points[0].x, points[0].y);
                for (i = 1; i < points.length; i += 1) {
                    c.lineTo(points[i].x, points[i].y);
                }
                c.closePath();
                c.stroke();
                c.fill();
            },
            drawCurveShape: function (points, w, color, stroke) {
                var i;
                var c = this.context;
                c.strokeStyle = stroke || color;
                c.fillStyle = color;
                c.lineWidth = w;
                c.beginPath();
                c.moveTo(points[0].x, points[0].y);
                for (i = 1; i < points.length - 1; i += 2) {
                    c.quadraticCurveTo(
                        points[i].x, points[i].y,
                        points[i + 1].x, points[i + 1].y
                    );
                }
                c.closePath();
                c.stroke();
                c.fill();
            },
            drawCone: function (x, y, x2, y2, w, w2, dx, dy, color) {
                var c = this.context;
                c.strokeStyle = color;
                c.fillStyle = color;
                c.lineWidth = w;
                c.beginPath();
                c.moveTo(x2, y2);
                c.lineTo(x + dx, y + dy);
                c.lineTo(x - dx, y - dy);
                c.closePath();
                c.stroke();
                c.fill();

                c.beginPath();
                c.lineWidth = w2;
                c.moveTo(x, y);
                c.lineTo(x + 1, y);
                c.stroke();
            }
        })
};
