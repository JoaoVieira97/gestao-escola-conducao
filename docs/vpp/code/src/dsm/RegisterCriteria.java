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

public class RegisterCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final IntegerExpression instructorId;
	public final AssociationExpression instructor;
	public final IntegerExpression categoryId;
	public final AssociationExpression category;
	public final DateExpression initialDate;
	public final CollectionExpression payments;
	
	public RegisterCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		instructorId = new IntegerExpression("instructor.", this);
		instructor = new AssociationExpression("instructor", this);
		categoryId = new IntegerExpression("category.ID", this);
		category = new AssociationExpression("category", this);
		initialDate = new DateExpression("initialDate", this);
		payments = new CollectionExpression("ORM_Payments", this);
	}
	
	public RegisterCriteria(PersistentSession session) {
		this(session.createCriteria(Register.class));
	}
	
	public RegisterCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public InstructorCriteria createInstructorCriteria() {
		return new InstructorCriteria(createCriteria("instructor"));
	}
	
	public CategoryCriteria createCategoryCriteria() {
		return new CategoryCriteria(createCriteria("category"));
	}
	
	public PaymentCriteria createPaymentsCriteria() {
		return new PaymentCriteria(createCriteria("ORM_Payments"));
	}
	
	public Register uniqueRegister() {
		return (Register) super.uniqueResult();
	}
	
	public Register[] listRegister() {
		java.util.List list = super.list();
		return (Register[]) list.toArray(new Register[list.size()]);
	}
}

