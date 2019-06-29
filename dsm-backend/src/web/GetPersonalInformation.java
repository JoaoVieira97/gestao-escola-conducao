package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import dsm.Exam;
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

        request.setCharacterEncoding("UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // Get user token and validate it
        String accessToken = Utils.getAuthenticationToken(request);
        if(accessToken != null && DSMFacade.isTokenValid(accessToken)) {

            int id;
            String studentID = request.getParameter("studentID");
            if (studentID != null){
                id = Integer.parseInt(studentID);
            } else{
                id = DSMFacade.getUserIDByToken(accessToken);
            }
            if(id != -1) {

                // TODO: buscar apenas uma vez os dois primeiros dados pelos menos
                // TODO: retornar uma objeto User!!!
                String name = DSMFacade.getName(id);
                String email = DSMFacade.getEmail(id);

                List<Exam> exams = DSMFacade.getStudentExams(id);
                ArrayNode examsJSON = mapper.valueToTree(exams);

                responseNode.put("name", name);
                responseNode.put("email", email);
                responseNode.putArray("exams").addAll(examsJSON);
                response.setStatus(HttpServletResponse.SC_OK);
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
