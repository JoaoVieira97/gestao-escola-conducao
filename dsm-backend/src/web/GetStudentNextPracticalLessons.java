package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import dsm.DSMFacade;
import dsm.Lesson;
import dsm.PersonalAnnouncement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

@WebServlet(name = "GetStudentNextPracticalLessons", urlPatterns = {"/api/student/next_practical_lessons"})
public class GetStudentNextPracticalLessons extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String studentId = request.getParameter("id");
        int id = Integer.valueOf(studentId);

        // get next practical lessons
        List<Lesson> lessons = DSMFacade.getStudentNextPracticalLessons(id);
        ObjectMapper mapper = new ObjectMapper();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        mapper.setDateFormat(df);
        String sJSON = mapper.writeValueAsString(lessons);
        if (lessons != null)
            sJSON = "{\"success\":true,\"lessons\":" + sJSON + "}";
        else
            sJSON = "{\"success\":false,\"lessons\":" + sJSON + "}";
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(sJSON);
    }
}
