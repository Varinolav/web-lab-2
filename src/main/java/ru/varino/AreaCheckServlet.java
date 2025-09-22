package ru.varino;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        log.info("Received /check request: x={}, y={}, r={}",
                x, y, r);

        Point point = new Point(x, y, r);

        HttpSession session = request.getSession();
        PointsBean bean = (PointsBean) session.getAttribute("pointsBean");
        if (bean == null) {
            bean = new PointsBean();
            session.setAttribute("pointsBean", bean);
        }
        bean.add(point);
        log.info("Point added to bean. Total points now: {}", bean.getPoints().size());

        Gson gson = new Gson();
        Map<String, Object> json = new HashMap<>();
        json.put("statusCode", HttpServletResponse.SC_OK);
        json.put("x", x);
        json.put("y", y);
        json.put("r", r);
        json.put("result", point.getIsHit());
        json.put("now", point.getTime());

        String msg = gson.toJson(json);
        response.setContentType("application/json");
        response.getWriter().write(msg);
    }
}
