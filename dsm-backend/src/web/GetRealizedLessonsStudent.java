package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import dsm.DSMFacade;
import dsm.PracticalLesson;
import dsm.TheoreticalLesson;
import org.orm.PersistentSession;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "GetRealizedLessonsStudent", urlPatterns = {"/api/lessons/student"})
public class GetRealizedLessonsStudent extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String[] url = request.getRequestURI().split("/");
        String target = url[url.length-1];

        response.setContentType("text/html;charset=UTF-8");
        response.sendError(
                HttpServletResponse.SC_NOT_FOUND,
                "The requested page [" + target + "] was not found."
        );
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String studentId = request.getParameter("id");
        int id = Integer.valueOf(studentId);

        PersistentSession session = Utils.getSession(request);

        // get lessons data
        List<PracticalLesson> practicalLessons = DSMFacade.getRealizedPracticalLessonsStudent(session, id);
        List<TheoreticalLesson> theoreticalLessons = DSMFacade.getRealizedTheoreticalLessonsStudent(session, id);

        ObjectMapper mapper = new ObjectMapper();

        //TODO Remove students array from lessons
        String sJSONP = mapper.writeValueAsString(practicalLessons);
        String sJSONT = mapper.writeValueAsString(theoreticalLessons);
        String sJSON = "{\"success\":true,\"practicalLessons\":" + sJSONP + ",\"theoreticalLessons\":" + sJSONT +"}";

        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(sJSON);
    }
}
