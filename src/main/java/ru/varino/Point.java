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
        this.time = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss").format(LocalDateTime.now(ZoneId.of("Europe/Moscow")));
        this.isHit = new PointHitChecker(this).isHit();
    }
}
