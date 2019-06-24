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

@WebServlet(name = "RegisterGeneralAnnouncement", urlPatterns = {"/api/secretary/register_general_announcement"})
public class RegisterGeneralAnnouncement extends HttpServlet {

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
            String title = (String) JSON.get("title");
            String description = (String) JSON.get("description");

            // register announcement
            boolean registered = DSMFacade.registerGeneralAnnouncement(title, description);
            if(registered) {
                responseNode.put("success", registered);
                response.setStatus(HttpServletResponse.SC_OK);
            }
            else {
                responseNode.put("error", "Error");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        }
        else {
            responseNode.put("error", "Invalid API access token.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(
                mapper.writerWithDefaultPrettyPrinter().writeValueAsString(responseNode)
        );

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String[] url = request.getRequestURI().split("/");
        String target = url[url.length-1];

        response.setContentType("text/html;charset=UTF-8");
        response.sendError(
                HttpServletResponse.SC_NOT_FOUND,
                "The requested page [" + target + "] was not found."
        );

    }
}
