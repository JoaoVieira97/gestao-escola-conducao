package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import dsm.Exam;
import org.orm.PersistentSession;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "GetStudentNextExams", urlPatterns = {"/api/student/next_exams"})
public class GetStudentNextExams extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // Get user token and validate it
        String accessToken = Utils.getAuthenticationToken(request);
        if(accessToken != null && DSMFacade.isTokenValid(accessToken)) {

            int id = DSMFacade.getUserIDByToken(accessToken);
            if(id != -1) {

                List<Exam> exams = DSMFacade.getStudentNextExams(id);
                if(exams!= null) {

                    ArrayNode examsJSON = mapper.valueToTree(exams);
                    responseNode.putArray("exams").addAll(examsJSON);
                    response.setStatus(HttpServletResponse.SC_OK);
                }
                else{
                    responseNode.put("error", Utils.ERROR_FETCHING_DATA);
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                }
            }
            else {
                responseNode.put("error", Utils.INVALID_USER_TOKEN);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
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
