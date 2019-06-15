package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import dsm.DSMFacade;
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

@WebServlet(name = "GetStudentPersonalAnnouncements", urlPatterns = {"/api/student/personal_announcements"})
public class GetStudentPersonalAnnouncements extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String studentId = request.getParameter("id");
        int id = Integer.valueOf(studentId);

        // get lessons data
        List<PersonalAnnouncement> announcements = DSMFacade.getStudentPersonalAnnouncements(id);
        ObjectMapper mapper = new ObjectMapper();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        mapper.setDateFormat(df);
        String sJSON = mapper.writeValueAsString(announcements);
        if (announcements != null)
            sJSON = "{\"success\":true,\"announcements\":" + sJSON + "}";
        else
            sJSON = "{\"success\":false,\"announcements\":" + sJSON + "}";
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(sJSON);
    }
}
