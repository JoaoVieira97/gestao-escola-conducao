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

@WebServlet(name = "GetPersonalInformation", urlPatterns = {"/api/student/information"})
public class GetPersonalInformation extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // check access token
        if(Utils.accessTokenValidation(request)) {

            String studentId = request.getParameter("id");
            int id = Integer.valueOf(studentId);

            // get user data
            String name = DSMFacade.getName(id);
            String email = DSMFacade.getEmail(id);
            List<Exam> exams = DSMFacade.getStudentExams(id);

            //ArrayNode examsJSON = mapper.valueToTree(exams);

            if(name!= null) {
                responseNode.put("name",name);
                responseNode.put("email",email);
                ArrayNode examsJSON = mapper.valueToTree(exams);
                responseNode.putArray("exams").addAll(examsJSON);
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
