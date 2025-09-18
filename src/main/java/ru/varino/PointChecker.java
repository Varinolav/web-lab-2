package ru.varino;

import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;

@RequiredArgsConstructor
public class PointChecker {
    private final Point point;

    public boolean isHit() {
        return firstQuarter() || thirdQuarter() || fourthQuarter();
    }

    private boolean firstQuarter() {
        if (point.getX().compareTo(BigDecimal.ZERO) >= 0 && point.getY().compareTo(BigDecimal.ZERO) >= 0) {
            return point.getX().pow(2).add(point.getY().pow(2)).compareTo(point.getR().pow(2)) <= 0;
        }
        return false;
    }

    private boolean thirdQuarter() {
        if (point.getX().compareTo(BigDecimal.ZERO) <= 0 && point.getY().compareTo(BigDecimal.ZERO) <= 0) {
            return point.getX().add(point.getY()).abs().compareTo(point.getR().divide(BigDecimal.valueOf(2), RoundingMode.HALF_UP).abs()) <= 0;
        }
        return false;
    }

    private boolean fourthQuarter() {
        if (point.getX().compareTo(BigDecimal.ZERO) >= 0 && point.getY().compareTo(BigDecimal.ZERO) <= 0) {
            return point.getX().compareTo(point.getR()) <= 0 && point.getY().compareTo(point.getR().negate()) >= 0;
        }
        return false;
    }
}