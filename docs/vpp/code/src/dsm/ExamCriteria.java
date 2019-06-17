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

import org.hibernate.Criteria;
import org.orm.PersistentException;
import org.orm.PersistentSession;
import org.orm.criteria.*;

public class ExamCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final TimestampExpression startTime;
	public final StringExpression description;
	
	public ExamCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		startTime = new TimestampExpression("startTime", this);
		description = new StringExpression("description", this);
	}
	
	public ExamCriteria(PersistentSession session) {
		this(session.createCriteria(Exam.class));
	}
	
	public ExamCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public Exam uniqueExam() {
		return (Exam) super.uniqueResult();
	}
	
	public Exam[] listExam() {
		java.util.List list = super.list();
		return (Exam[]) list.toArray(new Exam[list.size()]);
	}
}

