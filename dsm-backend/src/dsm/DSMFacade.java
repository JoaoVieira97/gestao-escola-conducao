package dsm;

import beans.LessonBeanLocal;
import beans.StudentBeanLocal;
import beans.UserBeanLocal;
import org.orm.PersistentSession;
import utils.Utils;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import java.util.ArrayList;
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
    public static String login(PersistentSession session, String email, String password) {

        return userBean.login(session, email, password);
    }


    /**
     * Get Name of a user.
     */
    public static String getName(PersistentSession session, int userId) {

        return userBean.getName(session, userId);
    }

    /**
     * Get Email of a user.
     */
    public static String getEmail(PersistentSession session, int userId) {

        return userBean.getEmail(session, userId);
    }

    /**
     * Get the list of all students.
     */
    public static List<Student> getStudents(PersistentSession session) {

        return studentBean.getStudents(session);
    }

    /**
     * Get the list of all lessons.
     */
    public static List<Lesson> getLessons(PersistentSession session) {

        //return lessonBean.getLessons();
        return new ArrayList<>();
    }

    /**
     * Get the list of personal announcements of a specific student.
     */
    public static List<PersonalAnnouncement> getStudentPersonalAnnouncements(PersistentSession session, int studentId){

        return studentBean.getStudentPersonalAnnouncements(session, studentId);
    }

    /**
     * Set specific student personalAnnouncement as viewed
     */
    public static boolean viewedPersonalAnnouncement(PersistentSession session, int announcementID){

        return studentBean.setPersonalAnnouncementAsViewed(session, announcementID);
    }

    /**
     * Get the list of next practical lessons of a specific student.
     */
    public static List<Lesson> getStudentNextPracticalLessons(PersistentSession session, int studentId){

        return lessonBean.getStudentNextPracticalLessons(session, studentId);
    }

    /**
     * Get the list of exams of a specific student.
     */
    public static List<Exam> getStudentExams(PersistentSession session, int studentId){

        return studentBean.getStudentExams(session, studentId);
    }

    /**
     * Get the list of next exams of a specific student.
     */
    public static List<Exam> getStudentNextExams(PersistentSession session, int studentId){

        return studentBean.getStudentNextExams(session, studentId);
    }

    /**
     * Get the list of general announcements
     */
    public static List<Announcement> getAnnouncements(PersistentSession session){

        return userBean.getAnnouncements(session);
    }

    /**
     * Get the list of all registers of a specific student.
     */
    public static List<Register> getStudentRegisters(PersistentSession session, int studentId) {

        return studentBean.getStudentRegisters(session, studentId);
    }

    /**
     * Get the list of all realized lessons of a specific student.
     */
    public static List<Lesson> getRealizedLessonsStudent(PersistentSession session, int studentId) {

        return lessonBean.getRealizedLessonsStudent(session, studentId);
    }

    /**
     * Get the list of all realized lessons of a specific student.
     */
    public static List<PracticalLesson> getRealizedPracticalLessonsStudent(PersistentSession session, int studentId) {

        return lessonBean.getRealizedPracticalLessonsStudent(session, studentId);
    }

    /**
     * Get the list of all realized lessons of a specific student.
     */
    public static List<TheoreticalLesson> getRealizedTheoreticalLessonsStudent(PersistentSession session, int studentId) {

        return lessonBean.getRealizedTheoreticalLessonsStudent(session, studentId);
    }
}
