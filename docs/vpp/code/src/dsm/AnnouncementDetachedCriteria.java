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

public class AnnouncementDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final StringExpression title;
	public final StringExpression description;
	public final DateExpression timestamp;
	
	public AnnouncementDetachedCriteria() {
		super(dsm.Announcement.class, dsm.AnnouncementCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		title = new StringExpression("title", this.getDetachedCriteria());
		description = new StringExpression("description", this.getDetachedCriteria());
		timestamp = new DateExpression("timestamp", this.getDetachedCriteria());
	}
	
	public AnnouncementDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, dsm.AnnouncementCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		title = new StringExpression("title", this.getDetachedCriteria());
		description = new StringExpression("description", this.getDetachedCriteria());
		timestamp = new DateExpression("timestamp", this.getDetachedCriteria());
	}
	
	public Announcement uniqueAnnouncement(PersistentSession session) {
		return (Announcement) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Announcement[] listAnnouncement(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Announcement[]) list.toArray(new Announcement[list.size()]);
	}
}

