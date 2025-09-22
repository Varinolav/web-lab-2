package ru.varino.point;

import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.List;

@RequiredArgsConstructor
public class PointHitChecker {
    private final Point point;
    private final MathContext MC = new MathContext(20, RoundingMode.HALF_UP);

    public boolean isHit() {
        return isInsideEllipse() && !isInsideAnyCutCircle();
    }


    private boolean isInsideEllipse() {
        BigDecimal x = point.getX();
        BigDecimal y = point.getY();
        BigDecimal r = point.getR();

        // (x^2 / R^2) + (y^2 / (R/2)^2) <= 1
        BigDecimal x1 = x.pow(2, MC).divide(r.pow(2, MC), MC);
        BigDecimal ry = r.divide(BigDecimal.valueOf(2), MC);
        BigDecimal y1 = y.pow(2, MC).divide(ry.pow(2, MC), MC);

        return x1.add(y1, MC).compareTo(BigDecimal.ONE) <= 0;
    }

    private boolean isInsideAnyCutCircle() {
        BigDecimal r = point.getR();
        BigDecimal x = point.getX();
        BigDecimal y = point.getY();

        List<CutCircle> cuts = List.of(
                new CutCircle(0.35, 0.45, 0.20),
                new CutCircle(-0.35, 0.45, 0.20),
                new CutCircle(0.00, 0.50, 0.10),

                new CutCircle(0.15, -0.48, 0.15),
                new CutCircle(-0.15, -0.48, 0.15),
                new CutCircle(0.35, -0.45, 0.18),
                new CutCircle(-0.35, -0.45, 0.18)
        );

        for (CutCircle c : cuts) {
            if (isInsideCircle(x, y,
                    r.multiply(c.kx(), MC),
                    r.multiply(c.ky(), MC),
                    r.multiply(c.kr(), MC))) {
                return true;
            }
        }
        return false;
    }

    private boolean isInsideCircle(BigDecimal x, BigDecimal y,
                                   BigDecimal x0, BigDecimal y0, BigDecimal radius) {
        // (x - x0)^2 + (y - y0)^2 < r^2
        BigDecimal x1 = x.subtract(x0, MC).pow(2, MC);
        BigDecimal y1 = y.subtract(y0, MC).pow(2, MC);
        BigDecimal sumXY = x1.add(y1, MC);
        BigDecimal r2 = radius.pow(2, MC);
        return sumXY.compareTo(r2) < 0;
    }

    private record CutCircle(BigDecimal kx, BigDecimal ky, BigDecimal kr) {
        CutCircle(double kx, double ky, double kr) {
            this(BigDecimal.valueOf(kx), BigDecimal.valueOf(ky), BigDecimal.valueOf(kr));
        }
    }
}
