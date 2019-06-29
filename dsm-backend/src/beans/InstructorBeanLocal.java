package beans;


import dsm.Lesson;
import dsm.PracticalLesson;
import dsm.TheoreticalLesson;
import dsm.WorkingDay;

import javax.ejb.Local;
import java.util.List;

@Local
public interface InstructorBeanLocal {


    List<WorkingDay> getWorkingDays(int instructorID);
}
