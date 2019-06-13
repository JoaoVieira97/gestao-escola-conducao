package beans;


import dsm.Lesson;
import dsm.PracticalLesson;
import dsm.TheoreticalLesson;

import javax.ejb.Local;
import java.util.List;

@Local
public interface LessonBeanLocal {

    List<Lesson> getLessons();

    List<Lesson> getLessonsStudent(int studentId);

    List<Lesson> getRealizedLessonsStudent(int studentId);

    List<PracticalLesson> getRealizedPracticalLessonsStudent(int studentId);

    List<TheoreticalLesson> getRealizedTheoreticalLessonsStudent(int studentId);
}
