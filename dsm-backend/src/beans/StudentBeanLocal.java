package beans;

import dsm.*;
import org.orm.PersistentSession;

import javax.ejb.Local;
import java.util.List;

@Local
public interface StudentBeanLocal {

    List<Student> getStudents(PersistentSession session);
    List<Register> getStudentRegisters(PersistentSession session, int studentID);
    List<PersonalAnnouncement> getStudentPersonalAnnouncements(PersistentSession session, int studentID);
    boolean setPersonalAnnouncementAsViewed(PersistentSession session, int announcementID);
    List<Exam> getStudentExams(PersistentSession session, int studentID);
    List<Exam> getStudentNextExams(PersistentSession session, int studentID);

}
