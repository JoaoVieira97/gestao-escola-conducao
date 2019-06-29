package beans;

import dsm.Category;
import dsm.Instructor;

import javax.ejb.Local;
import java.util.List;

@Local
public interface SecretaryBeanLocal {

    boolean registerGeneralAnnouncement(String title, String description);
    boolean registerStudent(String name, String email, String password, String address, String birth, String nif, String cc, int categoryID, int instructorID);
    boolean registerStudentExam(int studentID, String description, String startTime);
    boolean registerStudentPayment(int registerID, String description, String value, int secretaryID);
    List<Category> getCategories();
    List<Instructor> getInstructors();
    boolean registerStudentInCategory(int studentID, int categoryID, int instructorID);
    boolean updateStudent(int studentID, String name, String email, String address, String birth, String nif, String cc);

}
