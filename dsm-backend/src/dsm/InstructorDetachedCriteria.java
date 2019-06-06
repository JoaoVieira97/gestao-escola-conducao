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

public class InstructorDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final StringExpression firstName;
	public final StringExpression lastName;
	public final StringExpression email;
	public final StringExpression password;
	public final CollectionExpression practicalLessons;
	public final CollectionExpression workingDays;
	public final CollectionExpression theoreticalLessons;
	
	public InstructorDetachedCriteria() {
		super(Instructor.class, InstructorCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		firstName = new StringExpression("firstName", this.getDetachedCriteria());
		lastName = new StringExpression("lastName", this.getDetachedCriteria());
		email = new StringExpression("email", this.getDetachedCriteria());
		password = new StringExpression("password", this.getDetachedCriteria());
		practicalLessons = new CollectionExpression("ORM_PracticalLessons", this.getDetachedCriteria());
		workingDays = new CollectionExpression("ORM_WorkingDays", this.getDetachedCriteria());
		theoreticalLessons = new CollectionExpression("ORM_TheoreticalLessons", this.getDetachedCriteria());
	}
	
	public InstructorDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, InstructorCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		firstName = new StringExpression("firstName", this.getDetachedCriteria());
		lastName = new StringExpression("lastName", this.getDetachedCriteria());
		email = new StringExpression("email", this.getDetachedCriteria());
		password = new StringExpression("password", this.getDetachedCriteria());
		practicalLessons = new CollectionExpression("ORM_PracticalLessons", this.getDetachedCriteria());
		workingDays = new CollectionExpression("ORM_WorkingDays", this.getDetachedCriteria());
		theoreticalLessons = new CollectionExpression("ORM_TheoreticalLessons", this.getDetachedCriteria());
	}
	
	public PracticalLessonDetachedCriteria createPracticalLessonsCriteria() {
		return new PracticalLessonDetachedCriteria(createCriteria("ORM_PracticalLessons"));
	}
	
	public WorkingDayDetachedCriteria createWorkingDaysCriteria() {
		return new WorkingDayDetachedCriteria(createCriteria("ORM_WorkingDays"));
	}
	
	public TheoreticalLessonDetachedCriteria createTheoreticalLessonsCriteria() {
		return new TheoreticalLessonDetachedCriteria(createCriteria("ORM_TheoreticalLessons"));
	}
	
	public Instructor uniqueInstructor(PersistentSession session) {
		return (Instructor) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Instructor[] listInstructor(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Instructor[]) list.toArray(new Instructor[list.size()]);
	}
}

