package beans;


import dsm.Lesson;

import javax.ejb.Local;
import java.util.List;

@Local
public interface LessonBeanLocal {

    List<Lesson> getLessons();
}
