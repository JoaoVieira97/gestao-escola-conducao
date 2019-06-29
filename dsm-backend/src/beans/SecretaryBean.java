package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.persistence.criteria.CriteriaBuilder;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;
import utils.Utils;

@Local(SecretaryBeanLocal.class)
@Stateless(name = "SecretaryBean")
public class SecretaryBean implements SecretaryBeanLocal{

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
     * Register general announcement
     * @param title
     * @param description
     * @return
     */
    @Override
    public boolean registerGeneralAnnouncement(String title, String description){

        try {

            Announcement a = new Announcement();

            a.setTitle(title);
            a.setDescription(description);
            a.setTimestamp(new Timestamp(System.currentTimeMillis()));

            AnnouncementDAO.save(a);
            return true;

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return false;
    }

    /**
     * Register student
     * @param name
     * @param email
     * @param password
     * @param address
     * @param birth
     * @param nif
     * @þaram cc
     * @return
     */
    @Override
    public boolean registerStudent(String name, String email, String password, String address, String birth, String nif, String cc, int categoryID, int instructorID){

        try {

            long aux_nif = Long.parseLong(nif);
            java.util.Date aux_birth = new SimpleDateFormat("yyyy-MM-dd").parse(birth);

            Student s = new Student();

            s.setName(name);
            s.setEmail(email);
            s.setPassword(Utils.hash(password));
            s.setAddress(address);
            s.setBirth(aux_birth);
            s.setNif(aux_nif);
            s.setCc(cc);
            s.setRole("ROLE_STUDENT");

            Category category = CategoryDAO.getCategoryByORMID(categoryID);
            Instructor instructor = InstructorDAO.getInstructorByORMID(instructorID);

            Register register = new Register();
            register.setCategory(category);
            register.setInstructor(instructor);
            register.setInitialDate(new Date());

            s.registers.add(register);

            StudentDAO.save(s);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    /**
     * Register student exame
     * @param studentID
     * @param description
     * @param startTime
     * @return
     */
    @Override
    public boolean registerStudentExam(int studentID, String description, String startTime){
        try {
            Student student =  StudentDAO.getStudentByORMID(studentID);
            if (student != null){

                Exam e = new Exam();

                e.setDescription(description);
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm");
                Date parsedDate = dateFormat.parse(startTime);
                Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
                e.setStartTime(timestamp);

                student.exams.add(e);

                PersonalAnnouncement pa = new PersonalAnnouncement();

                pa.setTitle("Exame marcado");
                SimpleDateFormat output = new SimpleDateFormat("dd/MM/yyyy HH:mm");
                if (description.contains("teórico")){
                    pa.setDescription("O seu exame teórico foi marcado para " + output.format(parsedDate) + ".");
                } else {
                    pa.setDescription("O seu exame prático foi marcado para " + output.format(parsedDate) + ".");
                }
                pa.setViewed(false);
                pa.setTimestamp(new Timestamp(System.currentTimeMillis()));
                student.announcements.add(pa);

                StudentDAO.save(student);

                return true;

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    /**
     * Register student payment
     * @param registerID
     * @param description
     * @param value
     * @param secretaryID
     * @return
     */
    @Override
    public boolean registerStudentPayment(int registerID, String description, String value, int secretaryID){

        try {

            Register register = RegisterDAO.getRegisterByORMID(registerID);
            Secretary secretary = SecretaryDAO.getSecretaryByORMID(secretaryID);

            Payment payment = new Payment();
            payment.setDescription(description);
            float aux_value = Float.parseFloat(value);
            payment.setValue(aux_value);
            payment.setSecretary(secretary);
            payment.setTimestamp(new Timestamp(System.currentTimeMillis()));

            register.payments.add(payment);

            RegisterDAO.save(register);

            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    /**
     * Get all categories
     * @return
     */
    @Override
    public List<Category> getCategories() {

        try {
            return (List<Category>) CategoryDAO.queryCategory("id>0", "id");
        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Get all instructors
     * @return
     */
    @Override
    public List<Instructor> getInstructors() {

        try {
            return (List<Instructor>) InstructorDAO.queryInstructor("id>0", "id");
        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Register student in category
     * @param studentID
     * @param categoryID
     * @param instructorID
     * @return
     */
    @Override
    public boolean registerStudentInCategory(int studentID, int categoryID, int instructorID) {
        try {
            Student student = StudentDAO.getStudentByORMID(studentID);
            Category category = CategoryDAO.getCategoryByORMID(categoryID);
            Instructor instructor = InstructorDAO.getInstructorByORMID(instructorID);

            Register register = new Register();
            register.setCategory(category);
            register.setInstructor(instructor);
            register.setInitialDate(new Date());

            student.registers.add(register);

            StudentDAO.save(student);

            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    /**
     * Register student
     * @param studentID
     * @param name
     * @param email
     * @param password
     * @param address
     * @param birth
     * @param nif
     * @þaram cc
     * @return
     */
    @Override
    public boolean updateStudent(int studentID, String name, String email, String password, String address, String birth, String nif, String cc){

        try {

            long aux_nif = Long.parseLong(nif);
            java.util.Date aux_birth = new SimpleDateFormat("yyyy-MM-dd").parse(birth);

            Student s = StudentDAO.getStudentByORMID(studentID);

            s.setName(name);
            s.setEmail(email);
            if (!password.equals("")) s.setPassword(Utils.hash(password));
            s.setAddress(address);
            s.setBirth(aux_birth);
            s.setNif(aux_nif);
            s.setCc(cc);

            StudentDAO.save(s);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

}
