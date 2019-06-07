package web;

import dsm.Student;
import dsm.DSMFacade;
import utils.JsonConverter;

import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

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

        response.setContentType("application/json;charset=UTF-8");

        // get students data
        List<Student> students = DSMFacade.getStudents();
        String jsonString = JsonConverter.convertStudentsToString(students);

        // return result
        ServletOutputStream out = response.getOutputStream();
        out.print(jsonString);
    }
}
