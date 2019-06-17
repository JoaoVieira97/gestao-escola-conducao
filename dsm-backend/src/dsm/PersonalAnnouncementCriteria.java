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

public class PersonalAnnouncementCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final StringExpression title;
	public final StringExpression description;
	public final TimestampExpression timestamp;
	public final BooleanExpression viewed;
	
	public PersonalAnnouncementCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		title = new StringExpression("title", this);
		description = new StringExpression("description", this);
		timestamp = new TimestampExpression("timestamp", this);
		viewed = new BooleanExpression("viewed", this);
	}
	
	public PersonalAnnouncementCriteria(PersistentSession session) {
		this(session.createCriteria(PersonalAnnouncement.class));
	}
	
	public PersonalAnnouncementCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public PersonalAnnouncement uniquePersonalAnnouncement() {
		return (PersonalAnnouncement) super.uniqueResult();
	}
	
	public PersonalAnnouncement[] listPersonalAnnouncement() {
		java.util.List list = super.list();
		return (PersonalAnnouncement[]) list.toArray(new PersonalAnnouncement[list.size()]);
	}
}

