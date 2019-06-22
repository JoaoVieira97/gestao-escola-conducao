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

@WebServlet(name = "SetPersonalAnnouncementAsViewed", urlPatterns = {"/api/student/viewed_personal_announcement"})
public class SetPersonalAnnouncementAsViewed extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // check access token
        if(Utils.accessTokenValidation(request)) {

            String announcementId = request.getParameter("id");
            int id = Integer.valueOf(announcementId);

            // mark announcement as viewed
            boolean viewed = DSMFacade.viewedPersonalAnnouncement(id);
            if(viewed) {
                responseNode.put("success", viewed);
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

    }
}
