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

public class SchoolInfoCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final TimeExpression maxTimeToCancel;
	public final TimeExpression startTime;
	public final TimeExpression endTime;
	
	public SchoolInfoCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		maxTimeToCancel = new TimeExpression("maxTimeToCancel", this);
		startTime = new TimeExpression("startTime", this);
		endTime = new TimeExpression("endTime", this);
	}
	
	public SchoolInfoCriteria(PersistentSession session) {
		this(session.createCriteria(SchoolInfo.class));
	}
	
	public SchoolInfoCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public SchoolInfo uniqueSchoolInfo() {
		return (SchoolInfo) super.uniqueResult();
	}
	
	public SchoolInfo[] listSchoolInfo() {
		java.util.List list = super.list();
		return (SchoolInfo[]) list.toArray(new SchoolInfo[list.size()]);
	}
}

