package web;

import dsm.DSMFacade;
import dsm.Lesson;
import dsm.Register;
import utils.JsonConverter;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

        response.setContentType("application/json;charset=UTF-8");

        String studentId = request.getParameter("id");
        int id = Integer.valueOf(studentId);

        // get lessons data
        List<Register> registers = DSMFacade.getStudentRegisters(id);
        String jsonString = JsonConverter.convertRegistersToString(registers);

        // return result
        ServletOutputStream out = response.getOutputStream();
        out.print(jsonString);
    }
}
