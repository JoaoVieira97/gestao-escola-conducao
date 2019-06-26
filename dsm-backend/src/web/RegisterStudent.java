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
import java.text.SimpleDateFormat;
import java.util.Map;

@WebServlet(name = "RegisterStudent", urlPatterns = {"/api/secretary/register_student"})
public class RegisterStudent extends HttpServlet {

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
            String name = (String) JSON.get("name");
            String email = (String) JSON.get("email");
            String password = (String) JSON.get("password");
            String address = (String) JSON.get("address");
            String cc = (String) JSON.get("cc");
            String nif = (String) JSON.get("nif");
            String birth = (String) JSON.get("birth");

            // register student
            boolean registered = DSMFacade.registerStudent(name, email, password, address, birth, nif, cc);
            if(registered) {

                responseNode.put("success", registered);
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
