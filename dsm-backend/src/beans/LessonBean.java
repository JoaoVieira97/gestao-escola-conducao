package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Stateless(name = "LessonBean")
public class LessonBean implements LessonBeanLocal{

    /**
     * Get user lessons.
     * @param studentId
     * @return
     */
    @Override
    public List<Lesson> getLessonsStudent(PersistentSession session, int studentId) {

        try {

            Student student = StudentDAO.getStudentByORMID(session, studentId);
            if(student != null) // return Arrays.asList(student.lessons.toArray());
                return new ArrayList<Lesson>(student.lessons.getCollection());

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Get realized lessons
     * @param studentId
     * @return
     */
    @Override
    public List<Lesson> getRealizedLessonsStudent(PersistentSession session, int studentId) {

        List<Lesson> lessons = this.getLessonsStudent(session, studentId);
        List<Lesson> res = new ArrayList<>();

        for(Lesson lesson : lessons)
            if(lesson.getState().equals("realized")) res.add(lesson);

        return lessons;
    }

    /**
     * Get realized practical lessons.
     * @param studentId
     * @return
     */
    @Override
    public List<PracticalLesson> getRealizedPracticalLessonsStudent(PersistentSession session, int studentId) {

        try {

            List<Lesson> lessons = this.getRealizedLessonsStudent(session, studentId);
            List<PracticalLesson> practicalLessons = new ArrayList<>();

            for (Lesson lesson : lessons) {
                PracticalLesson practicalLesson = PracticalLessonDAO.getPracticalLessonByORMID(session, lesson.getID());
                if(practicalLesson!=null && practicalLesson.getIsStudentPresent()) practicalLessons.add(practicalLesson);
            }

           return practicalLessons;

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Get realized theoretical lessons.
     * @param studentId
     * @return
     */
    @Override
    public List<TheoreticalLesson> getRealizedTheoreticalLessonsStudent(PersistentSession session, int studentId) {

        try {

            List<Lesson> lessons = this.getRealizedLessonsStudent(session, studentId);
            List<TheoreticalLesson> theoreticalLessons = new ArrayList<>();

            for (Lesson lesson : lessons) {
                TheoreticalLesson theoreticalLesson = TheoreticalLessonDAO.getTheoreticalLessonByORMID(session, lesson.getID());
                if(theoreticalLesson!=null) theoreticalLessons.add(theoreticalLesson);
            }

            return theoreticalLessons;

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Get future practical lessons.
     * @param studentID
     * @return
     */
    @Override
    public List<Lesson> getStudentNextPracticalLessons(PersistentSession session, int studentID) {

        List<Lesson> pratical_lessons = null;
        List<Lesson> lessons = this.getLessonsStudent(session, studentID);

        if (lessons!= null){
            pratical_lessons = lessons.stream()
                    .filter(l -> l instanceof PracticalLesson && l.getState().equals("reserved"))
                    .collect(Collectors.toList());
        }

        return pratical_lessons;
    }
}
