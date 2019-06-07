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

public class LicenseCarDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final IntegerExpression practicalLessons;
	public final IntegerExpression theoreticalLessons;
	public final StringExpression name;
	
	public LicenseCarDetachedCriteria() {
		super(dsm.LicenseCar.class, dsm.LicenseCarCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		practicalLessons = new IntegerExpression("practicalLessons", this.getDetachedCriteria());
		theoreticalLessons = new IntegerExpression("theoreticalLessons", this.getDetachedCriteria());
		name = new StringExpression("name", this.getDetachedCriteria());
	}
	
	public LicenseCarDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, dsm.LicenseCarCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		practicalLessons = new IntegerExpression("practicalLessons", this.getDetachedCriteria());
		theoreticalLessons = new IntegerExpression("theoreticalLessons", this.getDetachedCriteria());
		name = new StringExpression("name", this.getDetachedCriteria());
	}
	
	public LicenseCar uniqueLicenseCar(PersistentSession session) {
		return (LicenseCar) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public LicenseCar[] listLicenseCar(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (LicenseCar[]) list.toArray(new LicenseCar[list.size()]);
	}
}

