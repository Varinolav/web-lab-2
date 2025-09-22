package ru.varino.servlet;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import ru.varino.point.PointValidator;
import ru.varino.point.PointsBean;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@WebServlet("/server")
public class ControllerServlet extends HttpServlet {
    private final PointValidator pointValidator = new PointValidator();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");
        String action = request.getParameter("action");

        log.info("Received GET request: action={}, x={}, y={}, r={}",
                action, x, y, r);

        try {
            if (ActionType.CLEAR.action().equals(action)) {
                handleClearAction(request, response);
            } else if (ActionType.SUBMIT.action().equals(action)) {
                handleSubmitAction(request, response, x, y, r);
            } else {
                request.getRequestDispatcher("index.jsp").forward(request, response);
            }

        } catch (IllegalArgumentException e) {
            log.warn("Validation error: {}", e.getMessage());
            sendError(response, e.getMessage(), HttpServletResponse.SC_BAD_REQUEST);
        } catch (Exception e) {
            log.error("Unexpected error while processing request", e);
            sendError(response, "Internal server error", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private void handleClearAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        HttpSession session = request.getSession();
        log.info("Clearing points for session {}", session.getId());

        PointsBean bean = (PointsBean) session.getAttribute("pointsBean");
        if (bean != null) {
            bean.clear();
        }

        Map<String, Object> jsonResponse = new HashMap<>();
        jsonResponse.put("statusCode", HttpServletResponse.SC_OK);
        jsonResponse.put("message", "Points cleared");

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(jsonResponse));

        request.getRequestDispatcher("./index.jsp").forward(request, response);
    }

    private void handleSubmitAction(HttpServletRequest request, HttpServletResponse response,
                                    String x, String y, String r) throws ServletException, IOException {
        log.info("Validating parameters: x={}, y={}, r={}", x, y, r);
        pointValidator.validateParameters(x, y, r);
        request.getRequestDispatcher("/check").forward(request, response);
    }

    private void sendError(HttpServletResponse response, String errorMessage, int statusCode) throws IOException {
        log.warn("Sending error response: statusCode={}, message={}", statusCode, errorMessage);
        Map<String, Object> jsonResponse = new HashMap<>();
        jsonResponse.put("statusCode", statusCode);
        jsonResponse.put("error", errorMessage);

        response.setContentType("application/json");
        response.setStatus(statusCode);
        response.getWriter().write(gson.toJson(jsonResponse));
    }
}
