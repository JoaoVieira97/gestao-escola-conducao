package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import dsm.Exam;
import dsm.Register;
import org.orm.PersistentSession;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

@WebServlet(name = "GetStudentRegister", urlPatterns = {"/api/student/registers"})
public class GetStudentRegister extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

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

                List<Register> registers = DSMFacade.getStudentRegisters(id);
                if(registers!= null) {

                    ArrayNode registersJSON = mapper.valueToTree(registers);
                    responseNode.putArray("registers").addAll(registersJSON);
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
