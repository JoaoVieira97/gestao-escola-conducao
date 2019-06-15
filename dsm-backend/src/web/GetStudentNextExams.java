package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import dsm.DSMFacade;
import dsm.Exam;
import dsm.Lesson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

@WebServlet(name = "GetStudentNextExams", urlPatterns = {"/api/student/next_exams"})
public class GetStudentNextExams extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String studentId = request.getParameter("id");
        int id = Integer.valueOf(studentId);

        // get next practical lessons
        List<Exam> exams = DSMFacade.getStudentNextExams(id);
        ObjectMapper mapper = new ObjectMapper();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        mapper.setDateFormat(df);
        String sJSON = mapper.writeValueAsString(exams);
        if (exams != null)
            sJSON = "{\"success\":true,\"exams\":" + sJSON + "}";
        else
            sJSON = "{\"success\":false,\"exams\":" + sJSON + "}";
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(sJSON);

    }
}
