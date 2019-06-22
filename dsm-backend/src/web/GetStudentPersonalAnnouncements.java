package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import dsm.PersonalAnnouncement;
import org.orm.PersistentSession;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

@WebServlet(name = "GetStudentPersonalAnnouncements", urlPatterns = {"/api/student/personal_announcements"})
public class GetStudentPersonalAnnouncements extends HttpServlet {

    private final static Logger log = Logger.getLogger(GetStudentPersonalAnnouncements.class.getName());


    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        //log.info(request.getSession().toString());

        // check access token
        if(Utils.accessTokenValidation(request)) {

            String studentId = request.getParameter("id");
            int id = Integer.valueOf(studentId);

            // get personal announcements
            List<PersonalAnnouncement> announcements = DSMFacade.getStudentPersonalAnnouncements(id);

            if(announcements!= null) {
                ArrayNode announcementsJSON = mapper.valueToTree(announcements);
                responseNode.putArray("announcements").addAll(announcementsJSON);
                response.setStatus(HttpServletResponse.SC_OK);
            }
            else{
                responseNode.put("error", "Wrong id");
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
