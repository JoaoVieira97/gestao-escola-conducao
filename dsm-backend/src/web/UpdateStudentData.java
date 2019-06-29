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

@WebServlet(name = "UpdateStudentData", urlPatterns = {"/api/secretary/update_student"})
public class UpdateStudentData extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // Get user token and validate it
        String accessToken = Utils.getAuthenticationToken(request);
        if(accessToken != null && DSMFacade.isTokenValid(accessToken)) {

            // get post data
            // ------------------------------------------------------------
            Map<String, Object> JSON = Utils.getPostData(mapper, request);

            // parsing data
            // ------------------------------------------------------------
            int studentID = (Integer) JSON.get("studentID");
            String name = (String) JSON.get("name");
            String email = (String) JSON.get("email");
            String address = (String) JSON.get("address");
            String cc = (String) JSON.get("cc");
            String nif = (String) JSON.get("nif");
            String birth = (String) JSON.get("birth");

            // register student
            boolean updated = DSMFacade.updateStudent(studentID, name, email, address, birth, nif, cc);
            if(updated) {

                responseNode.put("success", updated);
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

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
