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

public class LicenseCarCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final IntegerExpression practicalLessons;
	public final IntegerExpression theoreticalLessons;
	public final StringExpression name;
	
	public LicenseCarCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		practicalLessons = new IntegerExpression("practicalLessons", this);
		theoreticalLessons = new IntegerExpression("theoreticalLessons", this);
		name = new StringExpression("name", this);
	}
	
	public LicenseCarCriteria(PersistentSession session) {
		this(session.createCriteria(LicenseCar.class));
	}
	
	public LicenseCarCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public LicenseCar uniqueLicenseCar() {
		return (LicenseCar) super.uniqueResult();
	}
	
	public LicenseCar[] listLicenseCar() {
		java.util.List list = super.list();
		return (LicenseCar[]) list.toArray(new LicenseCar[list.size()]);
	}
}

