package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import dsm.PracticalLesson;
import dsm.Register;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "GetReservedLessonsInstructor", urlPatterns = {"/api/lessons/reserved_lessons"})
public class GetReservedLessonsInstructor extends HttpServlet {
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

            String categoryID = request.getParameter("categoryID");
            int catID = Integer.parseInt(categoryID);

            System.out.println(instID + " " + catID);

            List<PracticalLesson> practicalLessons = DSMFacade.getReservedLessonsInstructor(instID,catID);
            if(practicalLessons!= null) {

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