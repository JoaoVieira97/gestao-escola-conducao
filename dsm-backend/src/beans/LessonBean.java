package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Local;
import javax.ejb.Stateless;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Local(LessonBeanLocal.class)
@Stateless(name = "LessonBean")
public class LessonBean implements LessonBeanLocal{

    /**
     * ORM Persistent Session
     */
    private static PersistentSession session;

    /**
     * Logger for System Output
     */
    private final static Logger log = Logger.getLogger(LessonBean.class.getName());

    /**
     * Get persistent session if needed
     * @return PersistentSession
     */
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

            Student student = StudentDAO.getStudentByORMID(studentId);
            if(student != null)
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
                    .sorted(Comparator.comparing(Lesson::getStartTime))
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

    /**
     * Get future theoretical lessons.
     * @param lessonId
     * @return
     */
    @Override
    public boolean cancelLessonStudent(int lessonId) {

        try {
            Lesson lesson = LessonDAO.getLessonByORMID(lessonId);

            if(lesson!=null){

                List<Student> students = Arrays.asList(lesson.students.toArray());

                for(Student student : students) {
                    student.lessons.remove(lesson);
                    //StudentDAO.save(student);

                }
                //LessonDAO.save(lesson);
                PracticalLesson practicalLesson = (PracticalLesson) lesson;

                return PracticalLessonDAO.delete(practicalLesson);
            }

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return false;
    }

    /**
     * Get marked lessons from an instructor and by a category.
     * @param instructorID
     * @return
     */
    @Override
    public List<PracticalLesson> getReservedLessonsInstructor(int instructorID, long startTimestamp, long endTimestamp) {

        try {
            List<Lesson> lessons = LessonDAO.queryLesson(
                    "InstructorUserID = " + instructorID
                            + " AND StartTime >= '" + (new Timestamp(startTimestamp)).toString()
                            + "' AND StartTime <= '" + (new Timestamp(endTimestamp)).toString() + "'",
                    "StartTime"
            );

            List<PracticalLesson> res = new ArrayList<>();
            if(lessons != null)
                res = lessons.stream()
                        .filter(l -> l instanceof PracticalLesson)
                        .map(l -> (PracticalLesson) l)
                        .collect(Collectors.toList());

            return res;


        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return  null;
    }

    @Override
    public boolean createNewLesson(int studentID, int instructorID, int categoryID, Timestamp timestamp) {

        try {
            Student student = StudentDAO.getStudentByORMID(studentID);
            Instructor instructor = InstructorDAO.getInstructorByORMID(instructorID);
            Category category = CategoryDAO.getCategoryByORMID(categoryID);

            PracticalLesson lesson = new PracticalLesson();
            lesson.categories.add(category);
            lesson.students.add(student);
            lesson.setDuration(60); // by default 1h
            lesson.setStartTime(timestamp);
            lesson.setState("reserved");
            lesson.setIsStudentPresent(false); // by default false

            instructor.lessons.add(lesson);

            boolean success = PracticalLessonDAO.save(lesson);
            if(success) {
                InstructorDAO.save(instructor);
                return true;
            }

        } catch (PersistentException e) {
            e.printStackTrace();
            return false;
        }

        return false;
    }

    @Override
    public List<PracticalLesson> getNextPracticalLessonsInstructor(int instructorID){

        try {

            List<Lesson> lessons = LessonDAO
                                                .queryLesson("InstructorUserID = " + instructorID +
                                                                        "AND State='reserved'",
                                                            "StartTime");

            List<PracticalLesson> practicalLessons = new ArrayList<>();

            if(lessons !=null) {
                 practicalLessons = lessons.stream().filter(l -> l instanceof PracticalLesson)
                        .map(l -> (PracticalLesson) l).collect(Collectors.toList());
            }
            return practicalLessons;

        } catch (PersistentException e) {
            e.printStackTrace();
        }
        return null;

    }

    @Override
    public List<PracticalLesson> getOpenedPracticalLessonsInstructor(int instructorID){

        try {

            List<Lesson> lessons = LessonDAO
                    .queryLesson("InstructorUserID = " + instructorID +
                                    "AND State='opened'",
                            "StartTime");

            List<PracticalLesson> practicalLessons = new ArrayList<>();

            if(lessons !=null) {
                practicalLessons = lessons.stream().filter(l -> l instanceof PracticalLesson)
                        .map(l -> (PracticalLesson) l).collect(Collectors.toList());
            }
            return practicalLessons;

        } catch (PersistentException e) {
            e.printStackTrace();
        }
        return null;

    }

    @Override
    public List<TheoreticalLesson> getNextTheoreticalLessonsInstructor(int instructorID){

        try {

            List<Lesson> lessons = LessonDAO
                    .queryLesson("InstructorUserID = " + instructorID +
                                    "AND State='reserved'",
                            "StartTime");

            List<TheoreticalLesson> theoreticalLessons = new ArrayList<>();

            if(lessons !=null) {
                theoreticalLessons = lessons.stream().filter(l -> l instanceof TheoreticalLesson)
                        .map(l -> (TheoreticalLesson) l).collect(Collectors.toList());
            }
            return theoreticalLessons;

        } catch (PersistentException e) {
            e.printStackTrace();
        }
        return null;

    }

    @Override
    public List<TheoreticalLesson> getOpenedTheoreticalLessonsInstructor(int instructorID){

        try {

            List<Lesson> lessons = LessonDAO
                    .queryLesson("InstructorUserID = " + instructorID +
                                    "AND State='opened'",
                            "StartTime");

            List<TheoreticalLesson> theoreticalLessons = new ArrayList<>();

            if(lessons !=null) {
                theoreticalLessons = lessons.stream().filter(l -> l instanceof TheoreticalLesson)
                        .map(l -> (TheoreticalLesson) l).collect(Collectors.toList());
            }
            return theoreticalLessons;

        } catch (PersistentException e) {
            e.printStackTrace();
        }
        return null;

    }
}
