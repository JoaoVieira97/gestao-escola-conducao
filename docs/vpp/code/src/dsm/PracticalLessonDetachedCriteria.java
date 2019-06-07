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

public class PracticalLessonDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final DateExpression startTime;
	public final IntegerExpression duration;
	public final StringExpression state;
	public final CollectionExpression students;
	public final CollectionExpression licenses;
	public final BooleanExpression isStudentPresent;
	
	public PracticalLessonDetachedCriteria() {
		super(dsm.PracticalLesson.class, dsm.PracticalLessonCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		startTime = new DateExpression("startTime", this.getDetachedCriteria());
		duration = new IntegerExpression("duration", this.getDetachedCriteria());
		state = new StringExpression("state", this.getDetachedCriteria());
		students = new CollectionExpression("ORM_Students", this.getDetachedCriteria());
		licenses = new CollectionExpression("ORM_Licenses", this.getDetachedCriteria());
		isStudentPresent = new BooleanExpression("isStudentPresent", this.getDetachedCriteria());
	}
	
	public PracticalLessonDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, dsm.PracticalLessonCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		startTime = new DateExpression("startTime", this.getDetachedCriteria());
		duration = new IntegerExpression("duration", this.getDetachedCriteria());
		state = new StringExpression("state", this.getDetachedCriteria());
		students = new CollectionExpression("ORM_Students", this.getDetachedCriteria());
		licenses = new CollectionExpression("ORM_Licenses", this.getDetachedCriteria());
		isStudentPresent = new BooleanExpression("isStudentPresent", this.getDetachedCriteria());
	}
	
	public StudentDetachedCriteria createStudentsCriteria() {
		return new StudentDetachedCriteria(createCriteria("ORM_Students"));
	}
	
	public LicenseCarDetachedCriteria createLicensesCriteria() {
		return new LicenseCarDetachedCriteria(createCriteria("ORM_Licenses"));
	}
	
	public PracticalLesson uniquePracticalLesson(PersistentSession session) {
		return (PracticalLesson) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public PracticalLesson[] listPracticalLesson(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (PracticalLesson[]) list.toArray(new PracticalLesson[list.size()]);
	}
}

