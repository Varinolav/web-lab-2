package ru.varino;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import java.io.IOException;

@RequiredArgsConstructor
public class PointService {
    private final HttpServletRequest request;
    private final HttpServletResponse response;


    public void validate(String x, String y, String r) {
        Point point;
        try {
            point = new Point(x, y, r);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid point");
        }

        if (x == null || y == null || r == null || x.isEmpty() || y.isEmpty() || r.isEmpty()) {
            throw new IllegalArgumentException("Invalid data");
        }
        if (!point.isValid()) {
            throw new IllegalArgumentException("Invalid point");
        }
    }

    public void clear() {

    }

    public void submit() throws IOException {
        response.sendRedirect("./checkArea?" + request.getQueryString());
    }

}
