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

public class SchoolInfoDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final TimeExpression maxTimeToCancel;
	public final TimeExpression startTime;
	public final TimeExpression endTime;
	
	public SchoolInfoDetachedCriteria() {
		super(SchoolInfo.class, SchoolInfoCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		maxTimeToCancel = new TimeExpression("maxTimeToCancel", this.getDetachedCriteria());
		startTime = new TimeExpression("startTime", this.getDetachedCriteria());
		endTime = new TimeExpression("endTime", this.getDetachedCriteria());
	}
	
	public SchoolInfoDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, SchoolInfoCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		maxTimeToCancel = new TimeExpression("maxTimeToCancel", this.getDetachedCriteria());
		startTime = new TimeExpression("startTime", this.getDetachedCriteria());
		endTime = new TimeExpression("endTime", this.getDetachedCriteria());
	}
	
	public SchoolInfo uniqueSchoolInfo(PersistentSession session) {
		return (SchoolInfo) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public SchoolInfo[] listSchoolInfo(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (SchoolInfo[]) list.toArray(new SchoolInfo[list.size()]);
	}
}

