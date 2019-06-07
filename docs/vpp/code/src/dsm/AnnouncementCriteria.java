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

public class AnnouncementCriteria extends AbstractORMCriteria {
	public final IntegerExpression ID;
	public final StringExpression title;
	public final StringExpression description;
	public final DateExpression timestamp;
	
	public AnnouncementCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		title = new StringExpression("title", this);
		description = new StringExpression("description", this);
		timestamp = new DateExpression("timestamp", this);
	}
	
	public AnnouncementCriteria(PersistentSession session) {
		this(session.createCriteria(Announcement.class));
	}
	
	public AnnouncementCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public Announcement uniqueAnnouncement() {
		return (Announcement) super.uniqueResult();
	}
	
	public Announcement[] listAnnouncement() {
		java.util.List list = super.list();
		return (Announcement[]) list.toArray(new Announcement[list.size()]);
	}
}

