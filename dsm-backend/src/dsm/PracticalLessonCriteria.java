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

public class PracticalLessonCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final DateExpression startTime;
	public final IntegerExpression duration;
	public final StringExpression state;
	public final IntegerExpression instructorId;
	public final AssociationExpression instructor;
	public final BooleanExpression isStudentPresent;
	public final CollectionExpression students;
	
	public PracticalLessonCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		startTime = new DateExpression("startTime", this);
		duration = new IntegerExpression("duration", this);
		state = new StringExpression("state", this);
		instructorId = new IntegerExpression("instructor.ID", this);
		instructor = new AssociationExpression("instructor", this);
		isStudentPresent = new BooleanExpression("isStudentPresent", this);
		students = new CollectionExpression("ORM_Students", this);
	}
	
	public PracticalLessonCriteria(PersistentSession session) {
		this(session.createCriteria(PracticalLesson.class));
	}
	
	public PracticalLessonCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public InstructorCriteria createInstructorCriteria() {
		return new InstructorCriteria(createCriteria("instructor"));
	}
	
	public StudentCriteria createStudentsCriteria() {
		return new StudentCriteria(createCriteria("ORM_Students"));
	}
	
	public PracticalLesson uniquePracticalLesson() {
		return (PracticalLesson) super.uniqueResult();
	}
	
	public PracticalLesson[] listPracticalLesson() {
		java.util.List list = super.list();
		return (PracticalLesson[]) list.toArray(new PracticalLesson[list.size()]);
	}
}

