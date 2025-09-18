package ru.varino;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        Point point = new Point(x, y, r);

//        request.setAttribute("x", x);
//        request.setAttribute("y", y);
//        request.setAttribute("r", r);
//        request.setAttribute("hit", point.getIsHit());
//        request.setAttribute("now", point.getTime());
//        request.getRequestDispatcher("./index.jsp").forward(request, response);
        var gson = new Gson();
        Map<String, Object> json = new HashMap<>();
        json.put("x", x);
        json.put("y", y);
        json.put("r", r);
        json.put("result", point.getIsHit());
        json.put("now", point.getTime());
        var msg = gson.toJson(json);
        response.setContentType("application/json");
        response.getWriter().write(msg);
    }
}
