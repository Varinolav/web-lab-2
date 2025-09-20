package ru.varino;

import com.google.gson.Gson;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@WebServlet("/server")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PointService pointService = new PointService(request, response);

        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        String action = request.getParameter("action");

        try {
            pointService.validate(x, y, r);
        } catch (Exception e) {
            sendError(response, e.getMessage());
            return;
        }

        if (ActionType.CLEAR.action().equals(action)) {
            pointService.clear();
        } else if (ActionType.SUBMIT.action().equals(action)) {
            pointService.submit();
        }

    }

    private void sendError(HttpServletResponse response, String errorMessage) throws IOException {
        Gson gson = new Gson();
        Map<String, Object> jsonResponse = new HashMap<>();
        jsonResponse.put("error", errorMessage);
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(jsonResponse));
        response.setStatus(422);
    }
}
