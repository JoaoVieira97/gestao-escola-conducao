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

import java.util.List;
import org.hibernate.criterion.DetachedCriteria;
import org.orm.PersistentSession;
import org.orm.criteria.*;

public class RegisterDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final IntegerExpression instructorId;
	public final AssociationExpression instructor;
	public final IntegerExpression categoryId;
	public final AssociationExpression category;
	public final DateExpression initialDate;
	public final CollectionExpression payments;
	
	public RegisterDetachedCriteria() {
		super(dsm.Register.class, dsm.RegisterCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		instructorId = new IntegerExpression("instructor.", this.getDetachedCriteria());
		instructor = new AssociationExpression("instructor", this.getDetachedCriteria());
		categoryId = new IntegerExpression("category.ID", this.getDetachedCriteria());
		category = new AssociationExpression("category", this.getDetachedCriteria());
		initialDate = new DateExpression("initialDate", this.getDetachedCriteria());
		payments = new CollectionExpression("ORM_Payments", this.getDetachedCriteria());
	}
	
	public RegisterDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, dsm.RegisterCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		instructorId = new IntegerExpression("instructor.", this.getDetachedCriteria());
		instructor = new AssociationExpression("instructor", this.getDetachedCriteria());
		categoryId = new IntegerExpression("category.ID", this.getDetachedCriteria());
		category = new AssociationExpression("category", this.getDetachedCriteria());
		initialDate = new DateExpression("initialDate", this.getDetachedCriteria());
		payments = new CollectionExpression("ORM_Payments", this.getDetachedCriteria());
	}
	
	public InstructorDetachedCriteria createInstructorCriteria() {
		return new InstructorDetachedCriteria(createCriteria("instructor"));
	}
	
	public CategoryDetachedCriteria createCategoryCriteria() {
		return new CategoryDetachedCriteria(createCriteria("category"));
	}
	
	public PaymentDetachedCriteria createPaymentsCriteria() {
		return new PaymentDetachedCriteria(createCriteria("ORM_Payments"));
	}
	
	public Register uniqueRegister(PersistentSession session) {
		return (Register) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Register[] listRegister(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Register[]) list.toArray(new Register[list.size()]);
	}
}

