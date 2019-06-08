package beans;

import dsm.Register;
import dsm.Student;

import javax.ejb.Local;
import java.util.List;

@Local
public interface StudentBeanLocal {

    List<Student> getStudents();
    List<Register> getStudentRegisters(int studentID);
}
