package beans;


import dsm.Lesson;
import dsm.PracticalLesson;
import dsm.TheoreticalLesson;
import org.orm.PersistentSession;

import javax.ejb.Local;
import java.util.List;

@Local
public interface LessonBeanLocal {

    List<Lesson> getLessonsStudent(PersistentSession session, int studentId);
    List<Lesson> getRealizedLessonsStudent(PersistentSession session, int studentId);
    List<PracticalLesson> getRealizedPracticalLessonsStudent(PersistentSession session, int studentId);
    List<TheoreticalLesson> getRealizedTheoreticalLessonsStudent(PersistentSession session, int studentId);
    List<Lesson> getStudentNextPracticalLessons(PersistentSession session, int studentID);
}
