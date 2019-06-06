package beans;

import dsm.Student;

import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.List;

@Stateless(name = "StudentBean")
public class StudentBean implements StudentBeanLocal {

    @Override
    public List<Student> getStudents() {
        return new ArrayList<>();
    }
}
