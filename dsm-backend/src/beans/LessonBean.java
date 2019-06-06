package beans;

import dsm.Lesson;

import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.List;

@Stateless(name = "LessonBean")
public class LessonBean implements LessonBeanLocal{


    @Override
    public List<Lesson> getLessons() {
        return new ArrayList<>();
    }
}
