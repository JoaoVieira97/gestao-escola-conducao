/**
 * "Visual Paradigm: DO NOT MODIFY THIS FILE!"
 * 
 * This is an automatic generated file. It will be regenerated every time 
 * you generate persistence class.
 * 
 * Modifying its content may cause the program not work, or your work may lost.
 */

/**
 * Licensee: Hugo Oliveira(Universidade do Minho)
 * License Type: Academic
 */
package dsm;

import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.orm.PersistentSession;
import org.orm.criteria.*;

public class LessonDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final DateExpression startTime;
	public final IntegerExpression duration;
	public final StringExpression state;
	public final CollectionExpression students;
	public final CollectionExpression categories;
	
	public LessonDetachedCriteria() {
		super(Lesson.class, LessonCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		startTime = new DateExpression("startTime", this.getDetachedCriteria());
		duration = new IntegerExpression("duration", this.getDetachedCriteria());
		state = new StringExpression("state", this.getDetachedCriteria());
		students = new CollectionExpression("ORM_Students", this.getDetachedCriteria());
		categories = new CollectionExpression("ORM_Categories", this.getDetachedCriteria());
	}
	
	public LessonDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, LessonCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		startTime = new DateExpression("startTime", this.getDetachedCriteria());
		duration = new IntegerExpression("duration", this.getDetachedCriteria());
		state = new StringExpression("state", this.getDetachedCriteria());
		students = new CollectionExpression("ORM_Students", this.getDetachedCriteria());
		categories = new CollectionExpression("ORM_Categories", this.getDetachedCriteria());
	}
	
	public StudentDetachedCriteria createStudentsCriteria() {
		return new StudentDetachedCriteria(createCriteria("ORM_Students"));
	}
	
	public CategoryDetachedCriteria createCategoriesCriteria() {
		return new CategoryDetachedCriteria(createCriteria("ORM_Categories"));
	}
	
	public Lesson uniqueLesson(PersistentSession session) {
		return (Lesson) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Lesson[] listLesson(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Lesson[]) list.toArray(new Lesson[list.size()]);
	}
}

