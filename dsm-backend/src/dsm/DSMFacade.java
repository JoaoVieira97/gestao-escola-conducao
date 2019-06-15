package dsm;

import beans.LessonBeanLocal;
import beans.StudentBeanLocal;
import beans.UserBeanLocal;
import org.orm.PersistentSession;
import utils.Utils;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import java.util.List;

public class DSMFacade {

    private static UserBeanLocal userBean = lookupUserBeanLocal();
    private static StudentBeanLocal studentBean = lookupStudentBeanLocal();
    private static LessonBeanLocal lessonBean = lookupLessonBeanLocal();

    /**
     * Get and access to StudentBean features.
     * @return LessonBeanLocal
     */
    private static UserBeanLocal lookupUserBeanLocal() {

        try {

            Context c = new InitialContext();
            return (UserBeanLocal) c.lookup("java:global/dsm_backend_war_exploded/UserBean!beans.UserBeanLocal");

        } catch (NamingException ne) {
            ne.printStackTrace();
        }
        return null;
    }

    /**
     * Get and access to StudentBean features.
     * @return LessonBeanLocal
     */
    private static StudentBeanLocal lookupStudentBeanLocal() {

        try {

            Context c = new InitialContext();
            return (StudentBeanLocal) c.lookup("java:global/dsm_backend_war_exploded/StudentBean!beans.StudentBeanLocal");

        } catch (NamingException ne) {
            ne.printStackTrace();
        }
        return null;
    }

    /**
     * Get and access to LessonBean features.
     * @return LessonBeanLocal
     */
    private static LessonBeanLocal lookupLessonBeanLocal() {
        try {

            Context c = new InitialContext();
            return (LessonBeanLocal) c.lookup("java:global/dsm_backend_war_exploded/LessonBean!beans.LessonBeanLocal");

        } catch (NamingException ne) {
            ne.printStackTrace();
        }
        return null;
    }


    /**
     * Authentication a user.
     */
    public static String login(String email, String password) {

        return userBean.login(email, password);
    }

    /**
     * Get the list of all students.
     */
    public static List<Student> getStudents() {

        return studentBean.getStudents();
    }

    /**
     * Get the list of all lessons.
     */
    public static List<Lesson> getLessons() {

        return lessonBean.getLessons();
    }

    /**
     * Get the list of personal announcements of a specific student.
     */
    public static List<PersonalAnnouncement> getStudentPersonalAnnouncements(int studentId){

        return studentBean.getStudentPersonalAnnouncements(studentId);
    }

    /**
     * Get the list of next practical lessons of a specific student.
     */
    public static List<Lesson> getStudentNextPracticalLessons(int studentId){

        return studentBean.getStudentNextPracticalLessons(studentId);
    }

    /**
     * Get the list of next exams of a specific student.
     */
    public static List<Exam> getStudentNextExams(int studentId){

        return studentBean.getStudentNextExams(studentId);
    }

    /**
     * Get the list of general announcements
     */
    public static List<Announcement> getAnnouncements(){

        return userBean.getAnnouncements();
    }

    /**
     * Get the list of all registers of a specific student.
     */
    public static List<Register> getStudentRegisters(int studentId) {

        return studentBean.getStudentRegisters(studentId);
    }

    /**
     * Get the list of all realized lessons of a specific student.
     */
    public static List<Lesson> getRealizedLessonsStudent(int studentId) {

        return lessonBean.getRealizedLessonsStudent(studentId);
    }

    /**
     * Get the list of all realized lessons of a specific student.
     */
    public static List<PracticalLesson> getRealizedPracticalLessonsStudent(int studentId) {

        return lessonBean.getRealizedPracticalLessonsStudent(studentId);
    }

    /**
     * Get the list of all realized lessons of a specific student.
     */
    public static List<TheoreticalLesson> getRealizedTheoreticalLessonsStudent(int studentId) {

        return lessonBean.getRealizedTheoreticalLessonsStudent(studentId);
    }

}
