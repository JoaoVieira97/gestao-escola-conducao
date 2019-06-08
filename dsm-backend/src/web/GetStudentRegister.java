package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import dsm.DSMFacade;
import dsm.Register;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

@WebServlet(name = "GetStudentRegister", urlPatterns = {"/api/student/registers"})
public class GetStudentRegister extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String studentId = request.getParameter("id");
        int id = Integer.valueOf(studentId);

        // get lessons data
        List<Register> registers = DSMFacade.getStudentRegisters(id);
        ObjectMapper mapper = new ObjectMapper();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        mapper.setDateFormat(df);
        String sJSON = mapper.writeValueAsString(registers);
        sJSON = "{\"success\":true,\"registers\":" + sJSON + "}";
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(sJSON);

    }
}
