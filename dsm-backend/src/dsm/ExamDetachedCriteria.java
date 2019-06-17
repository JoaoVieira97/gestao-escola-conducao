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

public class ExamDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final TimestampExpression startTime;
	public final StringExpression description;
	
	public ExamDetachedCriteria() {
		super(dsm.Exam.class, dsm.ExamCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		startTime = new TimestampExpression("startTime", this.getDetachedCriteria());
		description = new StringExpression("description", this.getDetachedCriteria());
	}
	
	public ExamDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, dsm.ExamCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		startTime = new TimestampExpression("startTime", this.getDetachedCriteria());
		description = new StringExpression("description", this.getDetachedCriteria());
	}
	
	public Exam uniqueExam(PersistentSession session) {
		return (Exam) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Exam[] listExam(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Exam[]) list.toArray(new Exam[list.size()]);
	}
}

