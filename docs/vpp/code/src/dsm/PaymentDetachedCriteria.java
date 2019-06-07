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

public class PaymentDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final IntegerExpression secretaryId;
	public final AssociationExpression secretary;
	public final IntegerExpression licenseId;
	public final AssociationExpression license;
	public final DoubleExpression value;
	public final DateExpression timestamp;
	
	public PaymentDetachedCriteria() {
		super(dsm.Payment.class, dsm.PaymentCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		secretaryId = new IntegerExpression("secretary.", this.getDetachedCriteria());
		secretary = new AssociationExpression("secretary", this.getDetachedCriteria());
		licenseId = new IntegerExpression("license.ID", this.getDetachedCriteria());
		license = new AssociationExpression("license", this.getDetachedCriteria());
		value = new DoubleExpression("value", this.getDetachedCriteria());
		timestamp = new DateExpression("timestamp", this.getDetachedCriteria());
	}
	
	public PaymentDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, dsm.PaymentCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		secretaryId = new IntegerExpression("secretary.", this.getDetachedCriteria());
		secretary = new AssociationExpression("secretary", this.getDetachedCriteria());
		licenseId = new IntegerExpression("license.ID", this.getDetachedCriteria());
		license = new AssociationExpression("license", this.getDetachedCriteria());
		value = new DoubleExpression("value", this.getDetachedCriteria());
		timestamp = new DateExpression("timestamp", this.getDetachedCriteria());
	}
	
	public SecretaryDetachedCriteria createSecretaryCriteria() {
		return new SecretaryDetachedCriteria(createCriteria("secretary"));
	}
	
	public LicenseCarDetachedCriteria createLicenseCriteria() {
		return new LicenseCarDetachedCriteria(createCriteria("license"));
	}
	
	public Payment uniquePayment(PersistentSession session) {
		return (Payment) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Payment[] listPayment(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Payment[]) list.toArray(new Payment[list.size()]);
	}
}

