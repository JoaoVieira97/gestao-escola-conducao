package beans;

import dsm.Student;

import javax.ejb.Local;
import java.util.List;

@Local
public interface StudentBeanLocal {

    List<Student> getStudents();
}
