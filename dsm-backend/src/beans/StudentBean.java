package beans;

import dsm.Register;
import dsm.Student;
import dsm.StudentDAO;
import org.orm.PersistentException;

import javax.ejb.Stateless;
import java.util.Arrays;
import java.util.List;

@Stateless(name = "StudentBean")
public class StudentBean implements StudentBeanLocal {

    @Override
    public List<Student> getStudents() {

        try {

            return (List<Student>) StudentDAO.queryStudent("id>0", "id");

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Register> getStudentRegisters(int studentID) {

        try {

            Student student = StudentDAO.getStudentByORMID(studentID);
            return Arrays.asList(student.registers.toArray());

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

}
