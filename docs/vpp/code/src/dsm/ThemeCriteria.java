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

public class ThemeCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final StringExpression name;
	
	public ThemeCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		name = new StringExpression("name", this);
	}
	
	public ThemeCriteria(PersistentSession session) {
		this(session.createCriteria(Theme.class));
	}
	
	public ThemeCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public Theme uniqueTheme() {
		return (Theme) super.uniqueResult();
	}
	
	public Theme[] listTheme() {
		java.util.List list = super.list();
		return (Theme[]) list.toArray(new Theme[list.size()]);
	}
}

