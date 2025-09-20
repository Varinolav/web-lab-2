package ru.varino;

import lombok.Getter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PointsBean implements Serializable {
    private final List<Point> points = new ArrayList<>();

    public void add(Point p) {
        points.add(p);
    }

    public List<Point> getPoints() {
        return Collections.unmodifiableList(points);
    }

    public void clear() {
        points.clear();
    }
}
