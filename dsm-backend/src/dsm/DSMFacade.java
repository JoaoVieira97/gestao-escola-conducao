package dsm;

import beans.LessonBeanLocal;
import beans.StudentBeanLocal;
import beans.UserBeanLocal;
import org.orm.PersistentSession;

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
            return (UserBeanLocal) c.lookup("java:global/dsm_backend/UserBean!beans.UserBeanLocal");

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
            return (StudentBeanLocal) c.lookup("java:global/dsm_backend/StudentBean!beans.StudentBeanLocal");

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
            return (LessonBeanLocal) c.lookup("java:global/dsm_backend/LessonBean!beans.LessonBeanLocal");

        } catch (NamingException ne) {
            ne.printStackTrace();
        }
        return null;
    }


    /**
     * Login a user.
     */
    public static boolean login(PersistentSession session, String email, String password) {

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
     * Get the list of all registers of a specific student.
     */
    public static List<Register> getStudentRegisters(int studentId) {

        return studentBean.getStudentRegisters(studentId);
    }
}
