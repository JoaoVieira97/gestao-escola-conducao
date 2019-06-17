/**
 * "Visual Paradigm: DO NOT MODIFY THIS FILE!"
 * 
 * This is an automatic generated file. It will be regenerated every time 
 * you generate persistence class.
 * 
 * Modifying its content may cause the program not work, or your work may lost.
 */

/**
 * Licensee: João Vieira(Universidade do Minho)
 * License Type: Academic
 */
package dsm;

import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.orm.PersistentSession;
import org.orm.criteria.*;

public class InstructorDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final StringExpression name;
	public final StringExpression email;
	public final StringExpression password;
	public final StringExpression role;
	public final CollectionExpression workingDays;
	public final CollectionExpression lessons;
	
	public InstructorDetachedCriteria() {
		super(dsm.Instructor.class, dsm.InstructorCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		name = new StringExpression("name", this.getDetachedCriteria());
		email = new StringExpression("email", this.getDetachedCriteria());
		password = new StringExpression("password", this.getDetachedCriteria());
		role = new StringExpression("role", this.getDetachedCriteria());
		workingDays = new CollectionExpression("ORM_WorkingDays", this.getDetachedCriteria());
		lessons = new CollectionExpression("ORM_Lessons", this.getDetachedCriteria());
	}
	
	public InstructorDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, dsm.InstructorCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		name = new StringExpression("name", this.getDetachedCriteria());
		email = new StringExpression("email", this.getDetachedCriteria());
		password = new StringExpression("password", this.getDetachedCriteria());
		role = new StringExpression("role", this.getDetachedCriteria());
		workingDays = new CollectionExpression("ORM_WorkingDays", this.getDetachedCriteria());
		lessons = new CollectionExpression("ORM_Lessons", this.getDetachedCriteria());
	}
	
	public WorkingDayDetachedCriteria createWorkingDaysCriteria() {
		return new WorkingDayDetachedCriteria(createCriteria("ORM_WorkingDays"));
	}
	
	public LessonDetachedCriteria createLessonsCriteria() {
		return new LessonDetachedCriteria(createCriteria("ORM_Lessons"));
	}
	
	public Instructor uniqueInstructor(PersistentSession session) {
		return (Instructor) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Instructor[] listInstructor(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Instructor[]) list.toArray(new Instructor[list.size()]);
	}
}

