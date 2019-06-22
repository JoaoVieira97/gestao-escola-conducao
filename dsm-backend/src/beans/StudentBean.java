package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Stateless(name = "StudentBean")
public class StudentBean implements StudentBeanLocal {

    /**
     * Get all students order by id.
     * @return
     */
    @Override
    public List<Student> getStudents(PersistentSession session) {

        try {
            return (List<Student>) StudentDAO.queryStudent(session,"id>0", "id");
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
    public List<Register> getStudentRegisters(PersistentSession session, int studentID) {

        try {
            Student student = StudentDAO.getStudentByORMID(session, studentID);
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
    public List<PersonalAnnouncement> getStudentPersonalAnnouncements(PersistentSession session, int studentID) {

        try {

            Student student = StudentDAO.getStudentByORMID(session, studentID);
            if (student != null) {
                List<PersonalAnnouncement> announcements = Arrays.asList(student.announcements.toArray());
                return announcements.stream()
                                    .filter(a -> !a.getViewed())
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
    public boolean setPersonalAnnouncementAsViewed(PersistentSession session, int announcementID){

        try {

            PersonalAnnouncement pa = PersonalAnnouncementDAO.getPersonalAnnouncementByORMID(announcementID);
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
    public List<Exam> getStudentExams(PersistentSession session, int studentID) {

        try {

            Student student =  StudentDAO.getStudentByORMID(session, studentID);
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
    public List<Exam> getStudentNextExams(PersistentSession session, int studentID) {

        List<Exam> exams = this.getStudentExams(session, studentID);
        List<Exam> next_exams = null;

        if(exams!=null) {
             next_exams = exams.stream()
                    .filter(e -> e.getStartTime().after(new Date()))
                    .collect(Collectors.toList());
        }

        return next_exams;
    }
}
