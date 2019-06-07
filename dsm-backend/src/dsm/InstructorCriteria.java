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

public class InstructorCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final StringExpression firstName;
	public final StringExpression lastName;
	public final StringExpression email;
	public final StringExpression password;
	public final StringExpression role;
	public final CollectionExpression workingDays;
	public final CollectionExpression lessons;
	
	public InstructorCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		firstName = new StringExpression("firstName", this);
		lastName = new StringExpression("lastName", this);
		email = new StringExpression("email", this);
		password = new StringExpression("password", this);
		role = new StringExpression("role", this);
		workingDays = new CollectionExpression("ORM_WorkingDays", this);
		lessons = new CollectionExpression("ORM_Lessons", this);
	}
	
	public InstructorCriteria(PersistentSession session) {
		this(session.createCriteria(Instructor.class));
	}
	
	public InstructorCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public WorkingDayCriteria createWorkingDaysCriteria() {
		return new WorkingDayCriteria(createCriteria("ORM_WorkingDays"));
	}
	
	public LessonCriteria createLessonsCriteria() {
		return new LessonCriteria(createCriteria("ORM_Lessons"));
	}
	
	public Instructor uniqueInstructor() {
		return (Instructor) super.uniqueResult();
	}
	
	public Instructor[] listInstructor() {
		java.util.List list = super.list();
		return (Instructor[]) list.toArray(new Instructor[list.size()]);
	}
}

