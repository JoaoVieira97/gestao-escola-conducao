package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@WebServlet(name = "Authentication", urlPatterns = {"/api/authentication"})
public class Authentication extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {


        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // check access token
        if(Utils.accessTokenValidation(request)) {

            // get post data
            // ------------------------------------------------------------
            String data;
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                sb.append(line);
            }
            data = sb.toString();

            Map<String, Object> JSON = mapper.readValue(data, Map.class);
            String email = (String) JSON.get("email");
            String password = (String) JSON.get("password");


            // login and response
            // ------------------------------------------------------------
            String userType = DSMFacade.login(email, Utils.hash(password));
            if(userType != null) {

                // TODO: fix userToken and generate one for each user
                responseNode.put("success", true);
                responseNode.put("userType", userType);
                responseNode.put("userToken", "CCSvi6C1pG6m6QK5y4daChr3epgLZvHs");
            }
            else {
                responseNode.put("success", false);
                responseNode.put("error", "Wrong credentials");
            }
        }
        else {
            responseNode.put("success", false);
            responseNode.put("error", "Wrong access token");
        }

        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(
                mapper.writerWithDefaultPrettyPrinter().writeValueAsString(responseNode)
        );
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String[] url = request.getRequestURI().split("/");
        String target = url[url.length-1];

        response.setContentType("text/html;charset=UTF-8");
        response.sendError(
                HttpServletResponse.SC_NOT_FOUND,
                "The requested page [" + target + "] was not found."
        );
    }
}