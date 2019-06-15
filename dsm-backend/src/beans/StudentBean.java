package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;
import utils.Utils;

import javax.ejb.Stateless;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Stateless(name = "StudentBean")
public class StudentBean implements StudentBeanLocal {

    private final static PersistentSession session = Utils.getSession();

    @Override
    public List<Student> getStudents() {

        try {
            return (List<Student>) StudentDAO.queryStudent(session,"id>0", "id");
        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Register> getStudentRegisters(int studentID) {

        try {

            Student student = StudentDAO.getStudentByORMID(session, studentID);
            return Arrays.asList(student.registers.toArray());

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<PersonalAnnouncement> getStudentPersonalAnnouncements(int studentID) {

        try {

            Student student = (Student) StudentDAO.getStudentByORMID(session, studentID);
            if (student != null) {
                return Arrays.asList(student.announcements.toArray());
            }

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;

    }

    @Override
    public List<Lesson> getStudentNextPracticalLessons(int studentID) {

        try {

            Student student = (Student) StudentDAO.getStudentByORMID(session, studentID);
            if (student != null) {
                List<Lesson> lessons = Arrays.asList(student.lessons.toArray());
                List<Lesson> pratical_lessons = lessons.stream()
                                                       .filter(l -> l instanceof PracticalLesson && l.getStartTime().after(new Date()))
                                                       .collect(Collectors.toList());

                return pratical_lessons;

            }

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

}
