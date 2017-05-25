
/*
 * Capsule Class
 * 
 * renders to 2d simple shapes built from thick lines in 3d
 */
var Capsule = {
    drawCapsule: function (g, x, y, x2, y2, w, w2, t, color, outline) {
        if (w === w2) {
            g.drawLine(x, y, x2, y2, w, outline);
            g.drawLine(x, y, x2, y2, w - t * 2, color);
            return;
        }
        if (w > w2) {
            return this.drawCapsule(g, x2, y2, x, y, w2, w, t, color, outline);
        }
        var w3 = w - t * 2;
        var w4 = w2 - t * 2;
        var d = (w2 - w) / 2;
        var d2 = (w4 - w3) / 2;
        var dx = x2 - x;
        var dy = y2 - y;
        var a = Math.atan2(dy, dx) + Math.PI / 2;
        dx = Math.cos(a);
        dy = Math.sin(a);

        g.drawCone(x, y, x2, y2, w, w2, dx * d, dy * d, outline);
        g.drawCone(x, y, x2, y2, w3, w4, dx * d2, dy * d2, color);
    },
    drawPoints: function (g, points, w, t, w2, color, outline) {
        if (points.length === 2) {
            this.drawCapsule(
                g,
                points[0].x, points[0].y,
                points[1].x, points[1].y,
                w2 === undefined ? w : w2, w,
                t,
                color,
                outline
            );
            return;
        }
        g.drawShape(points, w, outline);
        g.drawShape(points, w - t * 2, color);
    },
    drawSmudge: function (g, x, y, x2, y2, w, w2, t, color) {
        var dx = x2 - x;
        var dy = y2 - y;
        var a = Math.atan2(dy, dx);
        t = Math.min(t, Math.sqrt(dx * dx + dy * dy));
        dx = Math.cos(a) * t;
        dy = Math.sin(a) * t;

        if (w === w2) {
            g.drawLine(x, y, x + dx, y + dy, w, color);
            return;
        }

        x2 = x + dx;
        y2 = y + dy;

        var d = (w2 - w) / 2;
        dx = x2 - x;
        dy = y2 - y;
        a = Math.atan2(dy, dx) + Math.PI / 2;
        dx = Math.cos(a);
        dy = Math.sin(a);
        if (w2 > w) {
            g.drawCone(x, y, x2, y2, w, w2, dx * d, dy * d, color);
        } else {
            g.drawCone(x2, y2, x, y, w2, w, dx * d, dy * d, color);
        }
    },
    draw: function (shape, g, color, outline) {
        var i;
        this.drawPoints(
            g,
            shape.points,
            shape.size,
            shape.border,
            shape.size2,
            color,
            outline
        );
        for (i = 0; i < shape.smudges.length; i += 1) {
            var smudge = shape.smudges[i];
            var w = smudge.size - shape.border * 2;
            this.drawSmudge(
                g,
                smudge.points[0].x, smudge.points[0].y,
                smudge.points[1].x, smudge.points[1].y,
                smudge.size2 ? smudge.size2 - shape.border * 2 : w,
                w,
                (smudge.scale || 2) * shape.border,
                color
            );
        }
    },
    calculateCenter: function (shape) {
        var i;
        var center = { x: 0, y: 0, z: 0 };
        for (i = 0; i < shape.points.length; i += 1) {
            var point = shape.points[i];
            center.x += point.x;
            center.y += point.y;
            center.z += point.z;
        }
        center.x /= shape.points.length;
        center.y /= shape.points.length;
        center.z /= shape.points.length;
        shape.center = center;
    }
};
