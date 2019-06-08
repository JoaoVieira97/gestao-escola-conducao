package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import dsm.Student;
import dsm.DSMFacade;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.util.List;
import java.text.SimpleDateFormat;

@WebServlet(name = "GetStudents", urlPatterns = {"/api/students"})
public class GetStudents extends javax.servlet.http.HttpServlet {

    @Override
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response)
            throws javax.servlet.ServletException, IOException {

        String[] url = request.getRequestURI().split("/");
        String target = url[url.length-1];

        response.setContentType("text/html;charset=UTF-8");
        response.sendError(
                HttpServletResponse.SC_NOT_FOUND,
                "The requested page [" + target + "] was not found."
        );
    }

    @Override
    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response)
            throws javax.servlet.ServletException, IOException {

        List<Student> students = DSMFacade.getStudents();
        ObjectMapper mapper = new ObjectMapper();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        mapper.setDateFormat(df);
        String sJSON = mapper.writeValueAsString(students);
        sJSON = "{\"success\":true,\"students\":" + sJSON + "}";
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(sJSON);

    }
}
