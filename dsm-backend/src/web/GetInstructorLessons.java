package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import dsm.PracticalLesson;
import dsm.TheoreticalLesson;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.plaf.TableHeaderUI;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@WebServlet(name = "GetInstructorLessons", urlPatterns = {"/api/lessons/instructor/all_lessons"})
public class GetInstructorLessons extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // Get user token and validate it
        String accessToken = Utils.getAuthenticationToken(request);
        if(accessToken != null && DSMFacade.isTokenValid(accessToken)) {

            //state = reserved or opened
            String lessonState = request.getParameter("state");

            //type = practical or theoretical
            String lessonType = request.getParameter("type");

            int instructorID = DSMFacade.getUserIDByToken(accessToken);

            List<PracticalLesson> practicalLessons = null;
            List<TheoreticalLesson> theoreticalLessons = null;

            if(lessonState.equals("reserved")) {

                if(lessonType.equals("practical")) practicalLessons = DSMFacade.getNextPracticalLessonsInstructor(instructorID);

                else theoreticalLessons = DSMFacade.getNextTheoreticalLessonsInstructor(instructorID);
            }
            else {
                if(lessonType.equals("practical")) practicalLessons = DSMFacade.getOpenedPracticalLessonsInstructor(instructorID);

                else theoreticalLessons = DSMFacade.getOpenedTheoreticalLessonsInstructor(instructorID);
            }

            if(practicalLessons != null || theoreticalLessons!=null) {

                if(practicalLessons !=null) {
                    ArrayNode practJSON = mapper.valueToTree(practicalLessons);
                    responseNode.putArray("practicalLessons").addAll(practJSON);
                    response.setStatus(HttpServletResponse.SC_OK);
                }
                else {
                    ArrayNode theoJSON =   mapper.valueToTree(theoreticalLessons);
                    responseNode.putArray("theoreticalLessons").addAll(theoJSON);
                    response.setStatus(HttpServletResponse.SC_OK);
                }

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
