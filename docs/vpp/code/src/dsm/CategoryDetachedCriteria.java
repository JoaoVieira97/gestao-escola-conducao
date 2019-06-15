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

public class CategoryDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final StringExpression name;
	public final IntegerExpression practicalLessons;
	public final IntegerExpression theoreticalLessons;
	public final FloatExpression price;
	
	public CategoryDetachedCriteria() {
		super(dsm.Category.class, dsm.CategoryCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		name = new StringExpression("name", this.getDetachedCriteria());
		practicalLessons = new IntegerExpression("practicalLessons", this.getDetachedCriteria());
		theoreticalLessons = new IntegerExpression("theoreticalLessons", this.getDetachedCriteria());
		price = new FloatExpression("price", this.getDetachedCriteria());
	}
	
	public CategoryDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, dsm.CategoryCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		name = new StringExpression("name", this.getDetachedCriteria());
		practicalLessons = new IntegerExpression("practicalLessons", this.getDetachedCriteria());
		theoreticalLessons = new IntegerExpression("theoreticalLessons", this.getDetachedCriteria());
		price = new FloatExpression("price", this.getDetachedCriteria());
	}
	
	public Category uniqueCategory(PersistentSession session) {
		return (Category) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Category[] listCategory(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Category[]) list.toArray(new Category[list.size()]);
	}
}

