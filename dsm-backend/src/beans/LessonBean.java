package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.Arrays;
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

            Student student = StudentDAO.getStudentByORMID( studentId);
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

        if(lessons!=null)
            res = lessons.stream()
                    .filter(l -> l.getState().equals("realized"))
                    .collect(Collectors.toList());

        return res;
    }

    /**
     * Get realized practical lessons.
     * @param studentId
     * @return
     */
    @Override
    public List<PracticalLesson> getRealizedPracticalLessonsStudent(int studentId) {

        List<Lesson> lessons = this.getRealizedLessonsStudent(studentId);
        List<PracticalLesson> practicalLessons = new ArrayList<>();

        if(lessons!=null){
            practicalLessons = lessons.stream()
                                        .filter(l -> l instanceof PracticalLesson &&
                                                    ((PracticalLesson) l).getIsStudentPresent())
                                        .map(l -> (PracticalLesson) l)
                                        .collect(Collectors.toList());
        }

        return practicalLessons;
    }

    /**
     * Get realized theoretical lessons.
     * @param studentId
     * @return
     */
    @Override
    public List<TheoreticalLesson> getRealizedTheoreticalLessonsStudent(int studentId) {

        List<Lesson> lessons = this.getRealizedLessonsStudent(studentId);
        List<TheoreticalLesson> theoreticalLessons = new ArrayList<>();

        if(lessons!=null){
            theoreticalLessons = lessons.stream()
                    .filter(l -> l instanceof TheoreticalLesson)
                    .map(l -> (TheoreticalLesson) l)
                    .collect(Collectors.toList());
        }

        return theoreticalLessons;
    }

    /**
     * Get realized themes and date of theoretical lessons of a specific category
     * @param studentId
     * @return
     */
    @Override
    public List<TheoreticalLesson> getRealizedThemes(int studentId, int categoryID) {

        List<TheoreticalLesson> lessons = this.getRealizedTheoreticalLessonsStudent(studentId);
        List<TheoreticalLesson> res = new ArrayList<>();

        for(TheoreticalLesson l : lessons)
            for(Category category : Arrays.asList(l.categories.toArray()))
                if(category.getID() == categoryID){
                    res.add(l);
                }

        return res;
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

    /**
     * Get future theoretical lessons.
     * @param studentID
     * @return
     */
    @Override
    public List<TheoreticalLesson> getStudentNextTheoreticalLessons(int studentID) {

        List<TheoreticalLesson> theoreticalLessons = new ArrayList<>();
        List<Lesson> lessons = this.getLessonsStudent(studentID);

        if (lessons!= null){
            theoreticalLessons = lessons.stream()
                    .filter(l -> l instanceof TheoreticalLesson && l.getState().equals("opened"))
                    .map(l -> (TheoreticalLesson) l)
                    .collect(Collectors.toList());
        }

        return theoreticalLessons;
    }
}
