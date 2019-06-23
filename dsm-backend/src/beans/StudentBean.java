package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Stateless;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Stateless(name = "StudentBean")
public class StudentBean implements StudentBeanLocal {

    private final static Logger log = Logger.getLogger(StudentBean.class.getName());

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
     * Get all students order by id.
     * @return
     */
    @Override
    public List<Student> getStudents() {

        try {

            session = getSession();

            return (List<Student>) StudentDAO.queryStudent("id>0", "id");
        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Get student registers.
     * @param studentID
     * @return
     */
    @Override
    public List<Register> getStudentRegisters(int studentID) {

        try {

            session = getSession();

            Student student = StudentDAO.getStudentByORMID( studentID);
            //return Arrays.asList(student.registers.toArray());
            return new ArrayList<Register>(student.registers.getCollection());

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Get student personal announcements.
     * @param studentID
     * @return
     */
    @Override
    public List<PersonalAnnouncement> getStudentPersonalAnnouncements(int studentID) {

        try {

            session = getSession();

            Student student = StudentDAO.getStudentByORMID( studentID);
            if (student != null) {
                List<PersonalAnnouncement> announcements = Arrays.asList(student.announcements.toArray());
                return announcements.stream()
                                    .filter(a -> !a.getViewed())
                                    .sorted(Comparator.comparing(Announcement::getTimestamp).reversed())
                                    .collect(Collectors.toList());
            }

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;

    }

    /**
     * Set personal announcement as viewed.
     * @param announcementID
     * @return
     */
    @Override
    public boolean setPersonalAnnouncementAsViewed(int announcementID){

        try {

            session = getSession();

            PersonalAnnouncement pa = PersonalAnnouncementDAO.getPersonalAnnouncementByORMID( announcementID);
            if (pa != null){
                pa.setViewed(true);

                PersonalAnnouncementDAO.save(pa);
                return true;
            }
        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return false;
    }

    /**
     * Get student exams.
     * @param studentID
     * @return
     */
    @Override
    public List<Exam> getStudentExams(int studentID) {

        try {

            session = getSession();

            Student student =  StudentDAO.getStudentByORMID( studentID);
            if (student != null) //return Arrays.asList(student.exams.toArray());
                return new ArrayList<>(student.exams.getCollection());

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Get student exams after today.
     * @param studentID
     * @return
     */
    @Override
    public List<Exam> getStudentNextExams(int studentID) {

        List<Exam> exams = this.getStudentExams(studentID);
        List<Exam> next_exams = null;

        if(exams!=null) {
             next_exams = exams.stream()
                    .filter(e -> e.getStartTime().after(new Date()))
                    .collect(Collectors.toList());
        }

        return next_exams;
    }
}
