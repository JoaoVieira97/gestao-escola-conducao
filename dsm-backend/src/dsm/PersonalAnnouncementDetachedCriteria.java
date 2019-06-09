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

public class PersonalAnnouncementDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final StringExpression title;
	public final StringExpression description;
	public final DateExpression timestamp;
	public final BooleanExpression viewed;
	
	public PersonalAnnouncementDetachedCriteria() {
		super(PersonalAnnouncement.class, PersonalAnnouncementCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		title = new StringExpression("title", this.getDetachedCriteria());
		description = new StringExpression("description", this.getDetachedCriteria());
		timestamp = new DateExpression("timestamp", this.getDetachedCriteria());
		viewed = new BooleanExpression("viewed", this.getDetachedCriteria());
	}
	
	public PersonalAnnouncementDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, PersonalAnnouncementCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		title = new StringExpression("title", this.getDetachedCriteria());
		description = new StringExpression("description", this.getDetachedCriteria());
		timestamp = new DateExpression("timestamp", this.getDetachedCriteria());
		viewed = new BooleanExpression("viewed", this.getDetachedCriteria());
	}
	
	public PersonalAnnouncement uniquePersonalAnnouncement(PersistentSession session) {
		return (PersonalAnnouncement) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public PersonalAnnouncement[] listPersonalAnnouncement(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (PersonalAnnouncement[]) list.toArray(new PersonalAnnouncement[list.size()]);
	}
}

