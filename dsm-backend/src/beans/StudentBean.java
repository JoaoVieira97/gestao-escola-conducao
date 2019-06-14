package beans;

import dsm.Register;
import dsm.Student;
import dsm.StudentDAO;
import org.orm.PersistentException;
import org.orm.PersistentSession;
import utils.Utils;

import javax.ejb.Stateless;
import java.util.Arrays;
import java.util.List;

@Stateless(name = "StudentBean")
public class StudentBean implements StudentBeanLocal {

    private final static PersistentSession session = Utils.getSession();

    @Override
    public List<Student> getStudents() {

        try {
            return (List<Student>) StudentDAO.queryStudent(session,"id>0", "id");
        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Register> getStudentRegisters(int studentID) {

        try {

            Student student = StudentDAO.getStudentByORMID(session, studentID);
            return Arrays.asList(student.registers.toArray());

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

}
