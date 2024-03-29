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

public class SecretaryDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final StringExpression name;
	public final StringExpression email;
	public final StringExpression password;
	public final StringExpression role;
	
	public SecretaryDetachedCriteria() {
		super(dsm.Secretary.class, dsm.SecretaryCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		name = new StringExpression("name", this.getDetachedCriteria());
		email = new StringExpression("email", this.getDetachedCriteria());
		password = new StringExpression("password", this.getDetachedCriteria());
		role = new StringExpression("role", this.getDetachedCriteria());
	}
	
	public SecretaryDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, dsm.SecretaryCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		name = new StringExpression("name", this.getDetachedCriteria());
		email = new StringExpression("email", this.getDetachedCriteria());
		password = new StringExpression("password", this.getDetachedCriteria());
		role = new StringExpression("role", this.getDetachedCriteria());
	}
	
	public Secretary uniqueSecretary(PersistentSession session) {
		return (Secretary) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Secretary[] listSecretary(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Secretary[]) list.toArray(new Secretary[list.size()]);
	}
}

