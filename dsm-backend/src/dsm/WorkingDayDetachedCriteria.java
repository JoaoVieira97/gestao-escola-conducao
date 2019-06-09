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

public class WorkingDayDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final StringExpression name;
	
	public WorkingDayDetachedCriteria() {
		super(WorkingDay.class, WorkingDayCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		name = new StringExpression("name", this.getDetachedCriteria());
	}
	
	public WorkingDayDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, WorkingDayCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		name = new StringExpression("name", this.getDetachedCriteria());
	}
	
	public WorkingDay uniqueWorkingDay(PersistentSession session) {
		return (WorkingDay) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public WorkingDay[] listWorkingDay(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (WorkingDay[]) list.toArray(new WorkingDay[list.size()]);
	}
}

