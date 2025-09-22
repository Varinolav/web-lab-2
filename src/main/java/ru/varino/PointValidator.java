package ru.varino;

import java.math.BigDecimal;

public class PointValidator {

    public void validateParameters(String x, String y, String r) {
        if (x == null || y == null || r == null ||
                x.trim().isEmpty() || y.trim().isEmpty() || r.trim().isEmpty()) {
            throw new IllegalArgumentException("Invalid parameters");
        }

        try {
            BigDecimal xVal = new BigDecimal(x.trim());
            BigDecimal yVal = new BigDecimal(y.trim());
            BigDecimal rVal = new BigDecimal(r.trim());

            validateRange(xVal, yVal, rVal);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid number format in parameters");
        }
    }

    private void validateRange(BigDecimal x, BigDecimal y, BigDecimal r) {
        if (x.compareTo(BigDecimal.valueOf(-2)) < 0 || x.compareTo(BigDecimal.valueOf(2)) > 0) {
            throw new IllegalArgumentException("X must be between -2 and 2");
        }

        if (y.compareTo(BigDecimal.valueOf(-5)) < 0 || y.compareTo(BigDecimal.valueOf(5)) > 0) {
            throw new IllegalArgumentException("Y must be between -5 and 5");
        }

        if (r.compareTo(BigDecimal.ZERO) <= 0 || r.compareTo(BigDecimal.valueOf(3)) > 0) {
            throw new IllegalArgumentException("R must be between 0 (exclusive) and 3 (inclusive)");
        }
    }
}