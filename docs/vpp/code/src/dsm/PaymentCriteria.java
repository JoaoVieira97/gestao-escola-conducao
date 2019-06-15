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
	public final IntegerExpression secretaryId;
	public final AssociationExpression secretary;
	public final DoubleExpression value;
	public final DateExpression timestamp;
	public final StringExpression description;
	
	public PaymentCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		secretaryId = new IntegerExpression("secretary.", this);
		secretary = new AssociationExpression("secretary", this);
		value = new DoubleExpression("value", this);
		timestamp = new DateExpression("timestamp", this);
		description = new StringExpression("description", this);
	}
	
	public PaymentCriteria(PersistentSession session) {
		this(session.createCriteria(Payment.class));
	}
	
	public PaymentCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
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

