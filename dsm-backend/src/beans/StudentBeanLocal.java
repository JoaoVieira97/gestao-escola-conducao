package beans;

import dsm.*;
import org.orm.PersistentSession;

import javax.ejb.Local;
import java.util.List;

@Local
public interface StudentBeanLocal {

    List<Student> getStudents();
    List<Register> getStudentRegisters(int studentID);
    List<PersonalAnnouncement> getStudentPersonalAnnouncements(int studentID);
    boolean setPersonalAnnouncementAsViewed(int announcementID, int studentID);
    List<Exam> getStudentExams(int studentID);
    List<Exam> getStudentNextExams(int studentID);

}
