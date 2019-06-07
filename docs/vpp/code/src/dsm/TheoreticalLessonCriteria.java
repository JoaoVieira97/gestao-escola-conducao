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

public class TheoreticalLessonCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final DateExpression startTime;
	public final IntegerExpression duration;
	public final StringExpression state;
	public final CollectionExpression students;
	public final CollectionExpression licenses;
	public final CollectionExpression themes;
	
	public TheoreticalLessonCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		startTime = new DateExpression("startTime", this);
		duration = new IntegerExpression("duration", this);
		state = new StringExpression("state", this);
		students = new CollectionExpression("ORM_Students", this);
		licenses = new CollectionExpression("ORM_Licenses", this);
		themes = new CollectionExpression("ORM_Themes", this);
	}
	
	public TheoreticalLessonCriteria(PersistentSession session) {
		this(session.createCriteria(TheoreticalLesson.class));
	}
	
	public TheoreticalLessonCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public ThemeCriteria createThemesCriteria() {
		return new ThemeCriteria(createCriteria("ORM_Themes"));
	}
	
	public StudentCriteria createStudentsCriteria() {
		return new StudentCriteria(createCriteria("ORM_Students"));
	}
	
	public LicenseCarCriteria createLicensesCriteria() {
		return new LicenseCarCriteria(createCriteria("ORM_Licenses"));
	}
	
	public TheoreticalLesson uniqueTheoreticalLesson() {
		return (TheoreticalLesson) super.uniqueResult();
	}
	
	public TheoreticalLesson[] listTheoreticalLesson() {
		java.util.List list = super.list();
		return (TheoreticalLesson[]) list.toArray(new TheoreticalLesson[list.size()]);
	}
}

