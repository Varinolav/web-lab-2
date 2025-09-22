package ru.varino.servlet;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class AccessFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String path = request.getRequestURI();

        boolean isRoot   = path.equals("/") || path.equals("/index.jsp");
        boolean isServer = path.equals("/server");
        boolean isStatic = path.matches("^/.*\\.(?:css|js|ico|png|jpg|jpeg|svg|html|jsp)$");
        if (isRoot || isServer || isStatic) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        response.sendError(HttpServletResponse.SC_NOT_FOUND);
    }
}
