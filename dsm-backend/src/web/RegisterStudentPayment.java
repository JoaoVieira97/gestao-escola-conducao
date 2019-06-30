package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@WebServlet(name = "RegisterStudentPayment", urlPatterns = {"/api/secretary/register_student_payment"})
public class RegisterStudentPayment extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // Get user token and validate it
        String accessToken = Utils.getAuthenticationToken(request);
        if(accessToken != null && DSMFacade.isTokenValid(accessToken)) {

            int secretaryID = DSMFacade.getUserIDByToken(accessToken);
            if(secretaryID != -1) {

                // get post data
                // ------------------------------------------------------------
                Map<String, Object> JSON = Utils.getPostData(mapper, request);

                // parsing data
                // ------------------------------------------------------------
                int studentID = (Integer) JSON.get("studentID");
                int registerID = (Integer) JSON.get("registerID");
                String description = (String) JSON.get("description");
                String value = (String) JSON.get("value");

                boolean registered = DSMFacade.registerStudentPayment(studentID, registerID, description, value, secretaryID);
                if (registered) {
                    responseNode.put("success", registered);
                    response.setStatus(HttpServletResponse.SC_OK);
                } else {
                    responseNode.put("error", Utils.ERROR_FETCHING_DATA);
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                }

            } else {
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

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
