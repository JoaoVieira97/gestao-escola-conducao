package beans;


import dsm.Lesson;
import dsm.PracticalLesson;
import dsm.Theme;
import dsm.TheoreticalLesson;
import org.orm.PersistentSession;

import javax.ejb.Local;
import java.sql.Timestamp;
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
    boolean cancelLessonStudent(int lessonId);
    List<PracticalLesson> getReservedLessonsInstructor(int instructorID, long startTimestamp, long endTimeStamp);
    boolean createNewLesson(int studentID, int instructorID, int categoryID, Timestamp timestamp);

    List<PracticalLesson> getNextPracticalLessonsInstructor(int instructorID);

    List<PracticalLesson> getOpenedPracticalLessonsInstructor(int instructorID);

    List<TheoreticalLesson> getNextTheoreticalLessonsInstructor(int instructorID);

    List<TheoreticalLesson> getOpenedTheoreticalLessonsInstructor(int instructorID);

    List<Theme> getAllThemes();
}
