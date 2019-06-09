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

import org.hibernate.Criteria;
import org.orm.PersistentException;
import org.orm.PersistentSession;
import org.orm.criteria.*;

public class LessonCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final DateExpression startTime;
	public final IntegerExpression duration;
	public final StringExpression state;
	public final CollectionExpression students;
	public final CollectionExpression categories;
	
	public LessonCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		startTime = new DateExpression("startTime", this);
		duration = new IntegerExpression("duration", this);
		state = new StringExpression("state", this);
		students = new CollectionExpression("ORM_Students", this);
		categories = new CollectionExpression("ORM_Categories", this);
	}
	
	public LessonCriteria(PersistentSession session) {
		this(session.createCriteria(Lesson.class));
	}
	
	public LessonCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public StudentCriteria createStudentsCriteria() {
		return new StudentCriteria(createCriteria("ORM_Students"));
	}
	
	public CategoryCriteria createCategoriesCriteria() {
		return new CategoryCriteria(createCriteria("ORM_Categories"));
	}
	
	public Lesson uniqueLesson() {
		return (Lesson) super.uniqueResult();
	}
	
	public Lesson[] listLesson() {
		java.util.List list = super.list();
		return (Lesson[]) list.toArray(new Lesson[list.size()]);
	}
}

