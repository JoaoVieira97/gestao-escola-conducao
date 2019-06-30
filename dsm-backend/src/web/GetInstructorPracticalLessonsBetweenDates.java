package web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import dsm.PracticalLesson;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@WebServlet(name = "GetInstructorPracticalLessonsBetweenDates", urlPatterns = {"/api/lessons/instructor/between_dates"})
public class GetInstructorPracticalLessonsBetweenDates extends HttpServlet {

    private final static Logger log = Logger.getLogger(GetInstructorPracticalLessonsBetweenDates.class.getName());


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // Get user token and validate it
        String accessToken = Utils.getAuthenticationToken(request);
        if(accessToken != null && DSMFacade.isTokenValid(accessToken)) {

            String instructorID = request.getParameter("instructorID");
            int instID = Integer.parseInt(instructorID);

            String startDate = request.getParameter("startDate");
            long startTimestamp = Long.parseLong(startDate);

            String endDate = request.getParameter("endDate");
            long endTimestamp = Long.parseLong(endDate);

            List<PracticalLesson> practicalLessons = DSMFacade.getReservedLessonsInstructor(
                    instID,
                    startTimestamp,
                    endTimestamp
            );
            if(practicalLessons != null) {

                // get views
                Map<String, Long> views = DSMFacade.getUsersViewing();
                responseNode.putPOJO("views", views);
                //JsonNode viewsJSON = mapper.valueToTree(views);
                //responseNode.putArray("views").add(viewsJSON);

                ArrayNode practJSON = mapper.valueToTree(practicalLessons);
                responseNode.putArray("practicalLessons").addAll(practJSON);
                response.setStatus(HttpServletResponse.SC_OK);
            }
            else {
                responseNode.put("error", Utils.ERROR_FETCHING_DATA);
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        }
        else {
            responseNode.put("error", Utils.INVALID_USER_TOKEN);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }



        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(
                mapper.writerWithDefaultPrettyPrinter().writeValueAsString(responseNode)
        );

    }
}
