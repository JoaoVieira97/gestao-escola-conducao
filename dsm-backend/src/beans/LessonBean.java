package beans;

import dsm.*;
import org.orm.PersistentException;

import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Stateless(name = "LessonBean")
public class LessonBean implements LessonBeanLocal{


    @Override
    public List<Lesson> getLessons() {
        return new ArrayList<>();
    }

    @Override
    public List<Lesson> getLessonsStudent(int studentId) {

        try {

            Student student = StudentDAO.getStudentByORMID(studentId);
            return Arrays.asList(student.lessons.toArray());

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Lesson> getRealizedLessonsStudent(int studentId) {

        List<Lesson> lessons = this.getLessonsStudent(studentId);
        List<Lesson> res = new ArrayList<>();

        for(Lesson lesson : lessons)
            if(lesson.getState().equals("realizada")) res.add(lesson);

        return lessons;
    }

    @Override
    public List<PracticalLesson> getRealizedPracticalLessonsStudent(int studentId) {

        try {

            List<Lesson> lessons = this.getRealizedLessonsStudent(studentId);

            List<PracticalLesson> practicalLessons = new ArrayList<>();

            for (Lesson lesson : lessons) {
                PracticalLesson practicalLesson = PracticalLessonDAO.getPracticalLessonByORMID(lesson.getID());
                if(practicalLesson!=null && practicalLesson.getIsStudentPresent()) practicalLessons.add(practicalLesson);
                /*
                List<PracticalLesson> practLessons = (List<PracticalLesson>) PracticalLessonDAO.queryPracticalLesson
                        ("LessonID =" + lesson.getID() + "AND IsStudentPresent=1", null);

                if(practLessons!= null) practicalLessons.add(practLessons.get(0));*/
            }

           return practicalLessons;

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<TheoreticalLesson> getRealizedTheoreticalLessonsStudent(int studentId) {

        try {

            List<Lesson> lessons = this.getRealizedLessonsStudent(studentId);

            List<TheoreticalLesson> theoreticalLessons = new ArrayList<>();

            for (Lesson lesson : lessons) {
                TheoreticalLesson theoreticalLesson = TheoreticalLessonDAO.getTheoreticalLessonByORMID(lesson.getID());
                if(theoreticalLesson!=null) theoreticalLessons.add(theoreticalLesson);
                /*
                List<TheoreticalLesson> theoreLessons = (List<TheoreticalLesson>) TheoreticalLessonDAO.queryTheoreticalLesson
                        ("LessonID =" + lesson.getID(), null);

                if(theoreLessons!= null) theoreticalLessons.add(theoreLessons.get(0));*/
            }

            return theoreticalLessons;

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }
}
