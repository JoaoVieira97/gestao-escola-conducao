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

import org.orm.*;
import org.hibernate.Query;
import org.hibernate.LockMode;
import java.util.List;

public class PersonalAnnouncementDAO {
	public static PersonalAnnouncement loadPersonalAnnouncementByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadPersonalAnnouncementByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement getPersonalAnnouncementByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getPersonalAnnouncementByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement loadPersonalAnnouncementByORMID(int ID, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadPersonalAnnouncementByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement getPersonalAnnouncementByORMID(int ID, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getPersonalAnnouncementByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement loadPersonalAnnouncementByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (PersonalAnnouncement) session.load(dsm.PersonalAnnouncement.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement getPersonalAnnouncementByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (PersonalAnnouncement) session.get(dsm.PersonalAnnouncement.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement loadPersonalAnnouncementByORMID(PersistentSession session, int ID, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			return (PersonalAnnouncement) session.load(dsm.PersonalAnnouncement.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement getPersonalAnnouncementByORMID(PersistentSession session, int ID, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			return (PersonalAnnouncement) session.get(dsm.PersonalAnnouncement.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryPersonalAnnouncement(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryPersonalAnnouncement(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryPersonalAnnouncement(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryPersonalAnnouncement(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement[] listPersonalAnnouncementByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listPersonalAnnouncementByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement[] listPersonalAnnouncementByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listPersonalAnnouncementByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryPersonalAnnouncement(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.PersonalAnnouncement as PersonalAnnouncement");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryPersonalAnnouncement(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.PersonalAnnouncement as PersonalAnnouncement");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("PersonalAnnouncement", lockMode);
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement[] listPersonalAnnouncementByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		try {
			List list = queryPersonalAnnouncement(session, condition, orderBy);
			return (PersonalAnnouncement[]) list.toArray(new PersonalAnnouncement[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement[] listPersonalAnnouncementByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			List list = queryPersonalAnnouncement(session, condition, orderBy, lockMode);
			return (PersonalAnnouncement[]) list.toArray(new PersonalAnnouncement[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement loadPersonalAnnouncementByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadPersonalAnnouncementByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement loadPersonalAnnouncementByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadPersonalAnnouncementByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement loadPersonalAnnouncementByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		PersonalAnnouncement[] personalAnnouncements = listPersonalAnnouncementByQuery(session, condition, orderBy);
		if (personalAnnouncements != null && personalAnnouncements.length > 0)
			return personalAnnouncements[0];
		else
			return null;
	}
	
	public static PersonalAnnouncement loadPersonalAnnouncementByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		PersonalAnnouncement[] personalAnnouncements = listPersonalAnnouncementByQuery(session, condition, orderBy, lockMode);
		if (personalAnnouncements != null && personalAnnouncements.length > 0)
			return personalAnnouncements[0];
		else
			return null;
	}
	
	public static java.util.Iterator iteratePersonalAnnouncementByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iteratePersonalAnnouncementByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iteratePersonalAnnouncementByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iteratePersonalAnnouncementByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iteratePersonalAnnouncementByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.PersonalAnnouncement as PersonalAnnouncement");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iteratePersonalAnnouncementByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.PersonalAnnouncement as PersonalAnnouncement");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("PersonalAnnouncement", lockMode);
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement createPersonalAnnouncement() {
		return new dsm.PersonalAnnouncement();
	}
	
	public static boolean save(dsm.PersonalAnnouncement personalAnnouncement) throws PersistentException {
		try {
			DSMPersistentManager.instance().saveObject(personalAnnouncement);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean delete(dsm.PersonalAnnouncement personalAnnouncement) throws PersistentException {
		try {
			DSMPersistentManager.instance().deleteObject(personalAnnouncement);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean refresh(dsm.PersonalAnnouncement personalAnnouncement) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().refresh(personalAnnouncement);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean evict(dsm.PersonalAnnouncement personalAnnouncement) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().evict(personalAnnouncement);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PersonalAnnouncement loadPersonalAnnouncementByCriteria(PersonalAnnouncementCriteria personalAnnouncementCriteria) {
		PersonalAnnouncement[] personalAnnouncements = listPersonalAnnouncementByCriteria(personalAnnouncementCriteria);
		if(personalAnnouncements == null || personalAnnouncements.length == 0) {
			return null;
		}
		return personalAnnouncements[0];
	}
	
	public static PersonalAnnouncement[] listPersonalAnnouncementByCriteria(PersonalAnnouncementCriteria personalAnnouncementCriteria) {
		return personalAnnouncementCriteria.listPersonalAnnouncement();
	}
}
