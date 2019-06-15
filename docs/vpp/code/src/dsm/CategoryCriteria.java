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

public class CategoryCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final StringExpression name;
	public final IntegerExpression practicalLessons;
	public final IntegerExpression theoreticalLessons;
	public final FloatExpression price;
	
	public CategoryCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		name = new StringExpression("name", this);
		practicalLessons = new IntegerExpression("practicalLessons", this);
		theoreticalLessons = new IntegerExpression("theoreticalLessons", this);
		price = new FloatExpression("price", this);
	}
	
	public CategoryCriteria(PersistentSession session) {
		this(session.createCriteria(Category.class));
	}
	
	public CategoryCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public Category uniqueCategory() {
		return (Category) super.uniqueResult();
	}
	
	public Category[] listCategory() {
		java.util.List list = super.list();
		return (Category[]) list.toArray(new Category[list.size()]);
	}
}

