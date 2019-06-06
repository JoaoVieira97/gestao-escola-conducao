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

public class PaymentCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final IntegerExpression licenseCarId;
	public final AssociationExpression licenseCar;
	public final IntegerExpression secretaryId;
	public final AssociationExpression secretary;
	public final DateExpression timestamp;
	
	public PaymentCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		licenseCarId = new IntegerExpression("licenseCar.ID", this);
		licenseCar = new AssociationExpression("licenseCar", this);
		secretaryId = new IntegerExpression("secretary.ID", this);
		secretary = new AssociationExpression("secretary", this);
		timestamp = new DateExpression("timestamp", this);
	}
	
	public PaymentCriteria(PersistentSession session) {
		this(session.createCriteria(Payment.class));
	}
	
	public PaymentCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public LicenseCarCriteria createLicenseCarCriteria() {
		return new LicenseCarCriteria(createCriteria("licenseCar"));
	}
	
	public SecretaryCriteria createSecretaryCriteria() {
		return new SecretaryCriteria(createCriteria("secretary"));
	}
	
	public Payment uniquePayment() {
		return (Payment) super.uniqueResult();
	}
	
	public Payment[] listPayment() {
		java.util.List list = super.list();
		return (Payment[]) list.toArray(new Payment[list.size()]);
	}
}

