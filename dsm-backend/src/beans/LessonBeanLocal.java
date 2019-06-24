package beans;


import dsm.Lesson;
import dsm.PracticalLesson;
import dsm.Theme;
import dsm.TheoreticalLesson;
import org.orm.PersistentSession;

import javax.ejb.Local;
import java.util.List;

@Local
public interface LessonBeanLocal {

    List<Lesson> getLessonsStudent(int studentId);
    List<Lesson> getRealizedLessonsStudent(int studentId);
    List<PracticalLesson> getRealizedPracticalLessonsStudent(int studentId);
    List<TheoreticalLesson> getRealizedTheoreticalLessonsStudent(int studentId);

    List<TheoreticalLesson> getRealizedThemes(int studentId, int categoryID);

    List<Lesson> getStudentNextPracticalLessons(int studentID);

    List<TheoreticalLesson> getStudentNextTheoreticalLessons(int studentID);
}
