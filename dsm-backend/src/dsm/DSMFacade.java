package dsm;

import beans.*;
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
    private static SecretaryBeanLocal secretaryBean = lookupSecretaryBeanLocal();
    private static InstructorBeanLocal instructorBean = lookupInstructorBeanLocal();
    private static RedisBeanLocal redisBean = lookupRedisBeanLocal();

    /**
     * Get and access to StudentBean features.
     *
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
     *
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
     *
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
     * Get and access to SecretaryBean features.
     *
     * @return SecretaryBeanLocal
     */
    private static SecretaryBeanLocal lookupSecretaryBeanLocal() {
        try {

            Context c = new InitialContext();
            return (SecretaryBeanLocal) c.lookup("java:global/dsm_backend_war_exploded/SecretaryBean!beans.SecretaryBeanLocal");

        } catch (NamingException ne) {
            ne.printStackTrace();
        }
        return null;
    }

    /**
     * Get and access to InstructorBean features.
     *
     * @return SecretaryBeanLocal
     */
    private static InstructorBeanLocal lookupInstructorBeanLocal() {
        try {

            Context c = new InitialContext();
            return (InstructorBeanLocal) c.lookup("java:global/dsm_backend_war_exploded/InstructorBean!beans.InstructorBeanLocal");

        } catch (NamingException ne) {
            ne.printStackTrace();
        }
        return null;
    }

    /**
     * Get and access to LessonBean features.
     *
     * @return LessonBeanLocal
     */
    private static RedisBeanLocal lookupRedisBeanLocal() {
        try {

            Context c = new InitialContext();
            return (RedisBeanLocal) c.lookup("java:global/dsm_backend_war_exploded/RedisBean!beans.RedisBeanLocal");

        } catch (NamingException ne) {
            ne.printStackTrace();
        }
        return null;
    }



    //
    // REDIS CODE
    // ------------------------------------------------------------
    public static void setUserToken(String token, int id) {

        redisBean.setUserToken(token, id);
    }

    public static void removeUserToken(String token) {

        redisBean.removeUserToken(token);
    }

    public static int getUserIDByToken(String token) {

        return redisBean.getUserIDByToken(token);
    }

    public static boolean isTokenValid(String token) {

        return redisBean.isTokenValid(token);
    }
    // ------------------------------------------------------------


    //
    // USER BEAN
    // ------------------------------------------------------------
    /**
     * Authentication an user.
     */
    public static User login(String email, String password) {

        return userBean.login(email, password);
    }

    /**
     * Get Name of an user.
     */
    public static String getName(int userId) {

        return userBean.getName(userId);
    }

    /**
     * Get Email of an user.
     */
    public static String getEmail(int userId) {

        return userBean.getEmail(userId);
    }

    /**
     * Get School info.
     */
    public static SchoolInfo getSchoolInformation(int schoolId) {

        return userBean.getSchoolInformation(schoolId);
    }

    /**
     * Get the list of general announcements
     */
    public static List<Announcement> getAnnouncements() {

        return userBean.getAnnouncements();
    }

    /**
     * Get the list of most recent general announcements
     */
    public static List<Announcement> getRecentAnnouncements() {

        return userBean.getRecentAnnouncements();
    }

    // ------------------------------------------------------------


    //
    // STUDENT BEAN
    // ------------------------------------------------------------
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

        //return lessonBean.getLessons();
        return new ArrayList<>();
    }

    /**
     * Get the list of personal announcements of a specific student.
     */
    public static List<PersonalAnnouncement> getStudentPersonalAnnouncements(int studentId) {

        return studentBean.getStudentPersonalAnnouncements(studentId);
    }

    /**
     * Set specific student personalAnnouncement as viewed
     */
    public static boolean viewedPersonalAnnouncement(int announcementID) {

        return studentBean.setPersonalAnnouncementAsViewed(announcementID);
    }

    /**
     * Get the list of exams of a specific student.
     */
    public static List<Exam> getStudentExams(int studentId) {

        return studentBean.getStudentExams(studentId);
    }

    /**
     * Get the list of next exams of a specific student.
     */
    public static List<Exam> getStudentNextExams(int studentId) {

        return studentBean.getStudentNextExams(studentId);
    }

    /**
     * Get the list of all registers of a specific student.
     */
    public static List<Register> getStudentRegisters(int studentId) {

        return studentBean.getStudentRegisters(studentId);
    }

    // ------------------------------------------------------------



    //
    // LESSON BEAN
    // ------------------------------------------------------------

    /**
     * Get the list of next practical lessons of a specific student.
     */
    public static List<Lesson> getStudentNextPracticalLessons(int studentId) {

        return lessonBean.getStudentNextPracticalLessons(studentId);
    }

    /**
     * Get the list of next theoretical lessons of a specific student.
     */
    public static List<TheoreticalLesson> getStudentNextTheoreticalLessons(int studentId) {

        return lessonBean.getStudentNextTheoreticalLessons(studentId);
    }

    /**
     * Get the list of realized themes of a specific student.
     */
    public static List<TheoreticalLesson> getRealizedThemes(int studentId, int categoryID) {

        return lessonBean.getRealizedThemes(studentId, categoryID);
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

    /**
     * Cancel a lesson
     */
    public static boolean cancelLesson(int lessonId) {

        return lessonBean.cancelLessonStudent(lessonId);
    }

    /**
     * Get marked lessons from an instructor and by a category.
     */
    public static  List<PracticalLesson> getReservedLessonsInstructor(int instructorID, int categoryID) {

        return lessonBean.getReservedLessonsInstructor(instructorID, categoryID);
    }

    // ------------------------------------------------------------



    //
    // SECRETARY BEAN
    // ------------------------------------------------------------

    /**
     * Register general announcement
     */
    public static boolean registerGeneralAnnouncement(String title, String description) {

        return secretaryBean.registerGeneralAnnouncement(title, description);
    }

    /**
     * Register new student
     */
    public static boolean registerStudent(String name, String email, String password, String address, String birth, String nif, String cc, int categoryID, int instructorID) {

        return secretaryBean.registerStudent(name, email, password, address, birth, nif, cc, categoryID, instructorID);
    }

    /**
     * Register new student exam
     */
    public static boolean registerStudentExam(int studentID, String description, String startTime) {

        return secretaryBean.registerStudentExam(studentID, description, startTime);
    }

    /**
     * Register new student payment
     */
    public static boolean registerStudentPayment(int registerID, String description, String value, int secretaryID) {

        return secretaryBean.registerStudentPayment(registerID, description, value, secretaryID);
    }

    /**
     * get all categories
     */
    public static List<Category> getCategories(){

        return secretaryBean.getCategories();
    }

    /**
     * get all instructors
     */
    public static List<Instructor> getInstructors(){

        return secretaryBean.getInstructors();
    }

    /**
     * register student in category
     */
    public static boolean registerStudentInCategory(int studentID, int categoryID, int instructorID){

        return secretaryBean.registerStudentInCategory(studentID, categoryID, instructorID);
    }

    /**
     * update student data
     */
    public static boolean updateStudent(int studentID, String name, String email, String address, String birth, String nif, String cc){

        return secretaryBean.updateStudent(studentID, name, email, address, birth, nif, cc);
    }

    // ------------------------------------------------------------



    //
    // INSTRUCTOR BEAN
    // ------------------------------------------------------------

    public static  List<WorkingDay> getWorkingDays(int instructorID){

        return instructorBean.getWorkingDays(instructorID);
    }

}
