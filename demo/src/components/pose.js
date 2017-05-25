
/*
 * Pose Class
 * 
 * methods for rotating and moving sets of 3d points
 */

var Pose = {
    poseElbow: function (side, points, armLength) {
        var pt0 = points[0];
        var pt1 = points[1];
        var pt2 = points[2];

        var dx = pt2.x - pt0.x;
        var dy = pt2.y - pt0.y;
        var dz = pt2.z - pt0.z;

        var dxz = Math.sqrt(dx * dx + dz * dz);
        var ay = Math.atan2(dz, dx);

        var d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        var a = Math.atan2(dy, dxz);

        pt1.x = pt0.x;
        pt1.y = pt0.y + Math.sqrt(Math.max(0, armLength * armLength - d / 2 * d / 2));
        pt1.z = pt0.z + d / 2;

        Pose.rotateZXY([pt1], pt0, -side * Math.PI / 3, -a, -Math.PI / 2 + ay);
    },
    rotateThumb: function (side, points, ang0x, ang0y, ang1x, ang1y, ang2x) {
        var cos = Math.cos;
        var sin = Math.sin;

        var p0 = points[0];
        var p1 = points[1];
        var p2 = points[2];
        var p3 = points[3];

        p1.x = p0.x + side * p1.d * sin(ang0y);
        p1.y = p0.y + p1.d * cos(ang0y) * sin(ang0x);
        p1.z = p0.z + side * p1.d * cos(ang0y) * cos(ang0x);

        p2.x = p1.x + side * p2.d * sin(ang1y);
        p2.y = p1.y + p2.d * cos(ang1y) * sin(ang1x);
        p2.z = p1.z + side * p2.d * cos(ang1y) * cos(ang1x);

        p3.x = p2.x + side * p3.d * cos(ang2x) * sin(ang1y);
        p3.y = p2.y + p3.d * sin(ang2x);
        p3.z = p2.z + side * p3.d * cos(ang2x) * cos(ang1y);

    },
    rotateY3: function (points, ang0, ang1, ang2, yshift) {
        var cos = Math.cos;
        var sin = Math.sin;

        ang1 += ang0;
        ang2 += ang1;

        var p0 = points[0];
        var p1 = points[1];
        var p2 = points[2];
        var p3 = points[3];

        p1.x = p0.x + p1.d * cos(ang0);
        p1.z = p0.z + p1.d * sin(ang0);

        p2.x = p1.x + p2.d * cos(ang1);
        p2.z = p1.z + p2.d * sin(ang1);

        p3.x = p2.x + p3.d * cos(ang2);
        p3.z = p2.z + p3.d * sin(ang2);

        p3.y += yshift;
        p2.y += yshift * 2 / 3;
        p1.y += yshift / 3;

    },
    rotateXY: function (points, pivot, angx, angy) {
        var i;
        var sqrt = Math.sqrt;
        var atan2 = Math.atan2;
        var cos = Math.cos;
        var sin = Math.sin;

        var a, d, p;
        for (i = 0; i < points.length; i += 1) {
            p = points[i];
            p.x -= pivot.x;
            p.y -= pivot.y;
            p.z -= pivot.z;

            d = sqrt(p.y * p.y + p.z * p.z);
            a = atan2(p.z, p.y);
            p.y = d * cos(a + angx);
            p.z = d * sin(a + angx);

            d = sqrt(p.x * p.x + p.z * p.z);
            a = atan2(p.z, p.x);
            p.x = d * cos(a + angy);
            p.z = d * sin(a + angy);

            p.x += pivot.x;
            p.y += pivot.y;
            p.z += pivot.z;
        }
    },
    rotateZXY: function (points, pivot, angz, angx, angy) {
        var i;
        var sqrt = Math.sqrt;
        var atan2 = Math.atan2;
        var cos = Math.cos;
        var sin = Math.sin;

        var a, d, p;
        for (i = 0; i < points.length; i += 1) {
            p = points[i];
            p.x -= pivot.x;
            p.y -= pivot.y;
            p.z -= pivot.z;

            d = sqrt(p.x * p.x + p.y * p.y);
            a = atan2(p.y, p.x);
            p.x = d * cos(a + angz);
            p.y = d * sin(a + angz);

            d = sqrt(p.y * p.y + p.z * p.z);
            a = atan2(p.z, p.y);
            p.y = d * cos(a + angx);
            p.z = d * sin(a + angx);

            d = sqrt(p.x * p.x + p.z * p.z);
            a = atan2(p.z, p.x);
            p.x = d * cos(a + angy);
            p.z = d * sin(a + angy);

            p.x += pivot.x;
            p.y += pivot.y;
            p.z += pivot.z;
        }
    },
    move: function (points, pivot, target) {
        var i;
        var dx = target.x - pivot.x;
        var dy = target.y - pivot.y;
        var dz = target.z - pivot.z;

        var p;
        for (i = 0; i < points.length; i += 1) {
            p = points[i];
            p.x += dx;
            p.y += dy;
            p.z += dz;
        }
    },
    moveBy: function (points, amounts, factor) {
        var i;
        var dx = amounts.x * factor;
        var dy = amounts.y * factor;
        var dz = amounts.z * factor;

        var p;
        for (i = 0; i < points.length; i += 1) {
            p = points[i];
            p.x += dx;
            p.y += dy;
            p.z += dz;
        }
    },
    shiftX: function (points, amount, factor) {
        var i;
        for (i = 0; i < points.length; i += 1) {
            points[i].x += amount * utils.defaultTo(points[i][factor], 1);
        }
    },
    shiftY: function (points, amount, factor) {
        var i;
        for (i = 0; i < points.length; i += 1) {
            points[i].y += amount * (points[i][factor] || 1);
        }
    },
    zoomDistort: function (points, pivot, factor) {
        var i;
        for (i = 0; i < points.length; i += 1) {
            var zoom = 1 + points[i].z * factor;
            points[i].x = pivot.x + (points[i].x - pivot.x) * zoom;
            points[i].y = pivot.y + (points[i].y - pivot.y) * zoom;
        }
    }
};
