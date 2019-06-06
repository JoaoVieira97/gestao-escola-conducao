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

public class RegisterCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final IntegerExpression licenseId;
	public final AssociationExpression license;
	public final IntegerExpression instructorId;
	public final AssociationExpression instructor;
	public final DateExpression initialDate;
	
	public RegisterCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		licenseId = new IntegerExpression("license.ID", this);
		license = new AssociationExpression("license", this);
		instructorId = new IntegerExpression("instructor.ID", this);
		instructor = new AssociationExpression("instructor", this);
		initialDate = new DateExpression("initialDate", this);
	}
	
	public RegisterCriteria(PersistentSession session) {
		this(session.createCriteria(Register.class));
	}
	
	public RegisterCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public LicenseCarCriteria createLicenseCriteria() {
		return new LicenseCarCriteria(createCriteria("license"));
	}
	
	public InstructorCriteria createInstructorCriteria() {
		return new InstructorCriteria(createCriteria("instructor"));
	}
	
	public Register uniqueRegister() {
		return (Register) super.uniqueResult();
	}
	
	public Register[] listRegister() {
		java.util.List list = super.list();
		return (Register[]) list.toArray(new Register[list.size()]);
	}
}

