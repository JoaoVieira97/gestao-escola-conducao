package web;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "CORSFilter", asyncSupported = true, urlPatterns = { "/*" })
public class CORSFilter implements Filter {

    public void init(FilterConfig config) throws ServletException {
    }

    public void destroy() {
    }

    private void addCorsHeader(HttpServletResponse response){

        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST"); //OPTIONS, PUT, DELETE, HEAD
        response.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); //X-PINGOTHER, Origin, X-Requested-With, Accept
        response.addHeader("Access-Control-Max-Age", "1728000");
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {

        HttpServletRequest request = (HttpServletRequest) req;

        HttpServletResponse response = ((HttpServletResponse)resp);
        addCorsHeader(response);

        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
            return;
        }

        chain.doFilter(req, response);
    }
}
