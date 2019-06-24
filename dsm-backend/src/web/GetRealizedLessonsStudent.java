package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import dsm.PracticalLesson;
import dsm.Register;
import dsm.TheoreticalLesson;
import org.orm.PersistentSession;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "GetRealizedLessonsStudent", urlPatterns = {"/api/lessons/student"})
public class GetRealizedLessonsStudent extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String[] url = request.getRequestURI().split("/");
        String target = url[url.length-1];

        response.setContentType("text/html;charset=UTF-8");
        response.sendError(
                HttpServletResponse.SC_NOT_FOUND,
                "The requested page [" + target + "] was not found."
        );
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // check access token
        if(Utils.accessTokenValidation(request)) {

            String studentId = request.getParameter("id");
            int id = Integer.valueOf(studentId);

            // get lessons data
            List<PracticalLesson> practicalLessons = DSMFacade.getRealizedPracticalLessonsStudent(id);
            List<TheoreticalLesson> theoreticalLessons = DSMFacade.getRealizedTheoreticalLessonsStudent(id);

            if(practicalLessons!= null && theoreticalLessons!= null) {
                ArrayNode practJSON = mapper.valueToTree(practicalLessons);
                responseNode.putArray("practicalLessons").addAll(practJSON);

                ArrayNode theoJSON = mapper.valueToTree(theoreticalLessons);
                responseNode.putArray("theoreticalLessons").addAll(theoJSON);

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
