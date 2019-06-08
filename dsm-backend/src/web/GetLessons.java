package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import dsm.DSMFacade;
import dsm.Lesson;
import dsm.Student;
import utils.JsonConverter;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

@WebServlet(name = "GetLessons", urlPatterns = {"/api/lessons"})
public class GetLessons extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String[] url = request.getRequestURI().split("/");
        String target = url[url.length-1];

        response.setContentType("text/html;charset=UTF-8");
        response.sendError(
                HttpServletResponse.SC_NOT_FOUND,
                "The requested page [" + target + "] was not found."
        );
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // get lessons data
        List<Lesson> lessons = DSMFacade.getLessons();
        ObjectMapper mapper = new ObjectMapper();
        String sJSON = mapper.writeValueAsString(lessons);
        sJSON = "{\"success\":true,\"lessons\":" + sJSON + "}";
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(sJSON);

    }
}
