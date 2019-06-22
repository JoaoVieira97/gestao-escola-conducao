package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Stateless(name = "LessonBean")
public class LessonBean implements LessonBeanLocal{

    private final static Logger log = Logger.getLogger(LessonBean.class.getName());

    private static PersistentSession session = null;

    private PersistentSession getSession() {
        if (session == null) {
            try {
                log.info("Creating new persistent session!");
                session = DSMPersistentManager.instance().getSession();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        else
            log.info("Reusing persistent session!");

        return session;
    }

    /**
     * Get user lessons.
     * @param studentId
     * @return
     */
    @Override
    public List<Lesson> getLessonsStudent(int studentId) {

        try {

            session = getSession();

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
    public List<Lesson> getRealizedLessonsStudent(int studentId) {

        List<Lesson> lessons = this.getLessonsStudent(studentId);
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
    public List<PracticalLesson> getRealizedPracticalLessonsStudent(int studentId) {

        try {

            List<Lesson> lessons = this.getRealizedLessonsStudent(studentId);
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
    public List<TheoreticalLesson> getRealizedTheoreticalLessonsStudent(int studentId) {

        try {

            List<Lesson> lessons = this.getRealizedLessonsStudent(studentId);
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
    public List<Lesson> getStudentNextPracticalLessons(int studentID) {

        List<Lesson> pratical_lessons = null;
        List<Lesson> lessons = this.getLessonsStudent(studentID);

        if (lessons!= null){
            pratical_lessons = lessons.stream()
                    .filter(l -> l instanceof PracticalLesson && l.getState().equals("reserved"))
                    .collect(Collectors.toList());
        }

        return pratical_lessons;
    }
}
