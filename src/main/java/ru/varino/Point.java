package ru.varino;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Data
public class Point {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;

    private String time;
    private Boolean isHit;

    public Point(String x, String y, String r) {
        this.x = new BigDecimal(x);
        this.y = new BigDecimal(y);
        this.r = new BigDecimal(r);
        this.time = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss").format(LocalDateTime.now().atZone(ZoneId.of("Europe/Moscow")));
        this.isHit = new PointChecker(this).isHit();
    }

    public boolean isValid() {
        boolean xValid = x.compareTo(BigDecimal.valueOf(-2)) >= 0 && x.compareTo(BigDecimal.valueOf(2)) <= 0;
        boolean yValid = y.compareTo(BigDecimal.valueOf(-5)) >= 0 && y.compareTo(BigDecimal.valueOf(5)) <= 0;
        boolean RValid = r.compareTo(BigDecimal.ZERO) >= 0 && r.compareTo(BigDecimal.valueOf(3)) <= 0;
        return xValid && yValid && RValid;
    }
}
