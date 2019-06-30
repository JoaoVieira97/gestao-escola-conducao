package beans;


import dsm.*;

import javax.ejb.Local;
import java.util.List;

@Local
public interface InstructorBeanLocal {


    List<WorkingDay> getWorkingDays(int instructorID);

    List<Student> getInstructorStudents(int instructorID);
}
