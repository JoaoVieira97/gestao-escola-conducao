package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import dsm.Lesson;
import org.orm.PersistentSession;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "GetStudentNextPracticalLessons", urlPatterns = {"/api/student/next_practical_lessons"})
public class GetStudentNextPracticalLessons extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // check access token
        if(Utils.accessTokenValidation(request)) {

            PersistentSession session = Utils.getSession(request);

            String studentId = request.getParameter("id");
            int id = Integer.valueOf(studentId);

            // get next practical lessons
            List<Lesson> lessons = DSMFacade.getStudentNextPracticalLessons(session, id);

            if(lessons != null) {
                ArrayNode lessonsJSON = mapper.valueToTree(lessons);
                responseNode.putArray("lessons").addAll(lessonsJSON);
                response.setStatus(HttpServletResponse.SC_OK);
            }
            else{
                responseNode.put("error", "Wrong id");
                //response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.setStatus(HttpServletResponse.SC_OK);
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
