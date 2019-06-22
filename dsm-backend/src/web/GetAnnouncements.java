package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.Announcement;
import dsm.DSMFacade;
import org.orm.PersistentSession;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

// http://localhost:8080/dsm_backend_war_exploded/api/user/announcements?filter=all    -> get all general announcements
// http://localhost:8080/dsm_backend_war_exploded/api/user/announcements?filter=recent -> get only recent general announcements
@WebServlet(name = "GetAnnouncements", urlPatterns = {"/api/user/announcements"})
public class GetAnnouncements extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        if(Utils.accessTokenValidation(request)) {

            String filter = request.getParameter("filter");

            List<Announcement> announcements = null;

            if (filter != null && filter.equals("all")){

                // get all announcements
                announcements = DSMFacade.getAnnouncements();
            } else if (filter != null && filter.equals("recent")) {

                // get recent announcements
                announcements = DSMFacade.getRecentAnnouncements();
            }

            if(announcements!= null) {
                ArrayNode announcementsJSON = mapper.valueToTree(announcements);
                responseNode.putArray("announcements").addAll(announcementsJSON);
                response.setStatus(HttpServletResponse.SC_OK);
            }

            else{
                responseNode.put("error", "Can't retrieve announcements");
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
}
