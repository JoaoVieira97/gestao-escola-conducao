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
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.logging.Logger;

@WebServlet(name = "NewStudentLesson", urlPatterns = {"/api/lesson/student/new"})
public class NewStudentLesson extends HttpServlet {

    private final static Logger log = Logger.getLogger(NewStudentLesson.class.getName());

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
            int id;
            String studentID = (String) JSON.get("studentID");
            if (studentID != null){
                // not coming from student
                id = Integer.parseInt(studentID);
            } else{
                // coming from student
                id = DSMFacade.getUserIDByToken(accessToken);
            }
            int categoryID = (Integer) JSON.get("categoryID");
            int instructorID = (Integer) JSON.get("instructorID");
            String startDate = (String) JSON.get("startDate");

            try {

                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
                Date parsedDate = dateFormat.parse(startDate);
                Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());

                boolean created = DSMFacade.createNewLesson(id, instructorID, categoryID, timestamp);
                if(created) {

                    responseNode.put("success", true);
                    response.setStatus(HttpServletResponse.SC_OK);
                }
                else {
                    responseNode.put("error", Utils.ERROR_FETCHING_DATA);
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                }

            } catch(Exception e) {

                responseNode.put("error", Utils.ERROR_FETCHING_DATA);
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write(
                        mapper.writerWithDefaultPrettyPrinter().writeValueAsString(responseNode)
                );
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
