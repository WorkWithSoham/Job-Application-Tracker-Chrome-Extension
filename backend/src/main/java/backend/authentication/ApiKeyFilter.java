package backend.authentication;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import jakarta.servlet.*;
import jakarta.servlet.FilterConfig;
import java.io.IOException;



@Component
public class ApiKeyFilter implements Filter {

    private static final String EXPECTED_API_KEY = "12345";

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String apiKey = request.getHeader("Authorization");

        if (apiKey != null && apiKey.equals(EXPECTED_API_KEY)) {
            chain.doFilter(request, response); // Allow the request to proceed
        } else {
            response.getWriter().write("Unauthorized");
            response.setContentType("text/plain");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void destroy() {
        // Cleanup logic, if needed
    }
}

