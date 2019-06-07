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

public class SecretaryCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final StringExpression firstName;
	public final StringExpression lastName;
	public final StringExpression email;
	public final StringExpression password;
	public final StringExpression role;
	
	public SecretaryCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		firstName = new StringExpression("firstName", this);
		lastName = new StringExpression("lastName", this);
		email = new StringExpression("email", this);
		password = new StringExpression("password", this);
		role = new StringExpression("role", this);
	}
	
	public SecretaryCriteria(PersistentSession session) {
		this(session.createCriteria(Secretary.class));
	}
	
	public SecretaryCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public Secretary uniqueSecretary() {
		return (Secretary) super.uniqueResult();
	}
	
	public Secretary[] listSecretary() {
		java.util.List list = super.list();
		return (Secretary[]) list.toArray(new Secretary[list.size()]);
	}
}

