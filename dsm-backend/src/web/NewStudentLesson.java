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
            int categoryID = -1;
            String startDate = null;
            int studentID;
            int instructorID;

            //coming from all
            if(JSON.get("categoryID") != null) {
                if(JSON.get("categoryID") instanceof Integer)
                    categoryID = (Integer) JSON.get("categoryID");
                else
                    categoryID = Integer.parseInt((String) JSON.get("categoryID"));
            }
            if(JSON.get("startDate") != null) {
                startDate = (String) JSON.get("startDate");
            }

            // coming from instructor or secretary
            if(JSON.get("studentID") != null) {
                if(JSON.get("studentID") instanceof Integer)
                    studentID = (Integer) JSON.get("studentID");
                else
                    studentID = Integer.parseInt((String) JSON.get("studentID"));
            }
            // coming from student
            else {
                studentID = DSMFacade.getUserIDByToken(accessToken);
            }

            // coming from student or secretary
            if(JSON.get("instructorID") != null) {
                if(JSON.get("instructorID") instanceof Integer)
                    instructorID = (Integer) JSON.get("instructorID");
                else
                    instructorID = Integer.parseInt((String) JSON.get("studentID"));
            }
            // coming from instructor
            else {
                instructorID = DSMFacade.getUserIDByToken(accessToken);
            }

            if(categoryID != -1 && startDate != null && studentID != -1 && instructorID != -1) {

                try {

                    SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
                    Date parsedDate = dateFormat.parse(startDate);
                    Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());

                    boolean created = DSMFacade.createNewLesson(studentID, instructorID, categoryID, timestamp);
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
