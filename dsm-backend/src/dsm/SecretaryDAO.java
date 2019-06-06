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

import org.orm.*;
import org.hibernate.Query;
import org.hibernate.LockMode;
import java.util.List;

public class SecretaryDAO {
	public static Secretary loadSecretaryByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadSecretaryByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary getSecretaryByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getSecretaryByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary loadSecretaryByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadSecretaryByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary getSecretaryByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getSecretaryByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary loadSecretaryByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (Secretary) session.load(Secretary.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary getSecretaryByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (Secretary) session.get(Secretary.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary loadSecretaryByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (Secretary) session.load(Secretary.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary getSecretaryByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (Secretary) session.get(Secretary.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List querySecretary(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return querySecretary(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List querySecretary(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return querySecretary(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary[] listSecretaryByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listSecretaryByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary[] listSecretaryByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listSecretaryByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List querySecretary(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Secretary as Secretary");
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
	
	public static List querySecretary(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Secretary as Secretary");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("Secretary", lockMode);
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary[] listSecretaryByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		try {
			List list = querySecretary(session, condition, orderBy);
			return (Secretary[]) list.toArray(new Secretary[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary[] listSecretaryByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			List list = querySecretary(session, condition, orderBy, lockMode);
			return (Secretary[]) list.toArray(new Secretary[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary loadSecretaryByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadSecretaryByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary loadSecretaryByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadSecretaryByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary loadSecretaryByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		Secretary[] secretarys = listSecretaryByQuery(session, condition, orderBy);
		if (secretarys != null && secretarys.length > 0)
			return secretarys[0];
		else
			return null;
	}
	
	public static Secretary loadSecretaryByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		Secretary[] secretarys = listSecretaryByQuery(session, condition, orderBy, lockMode);
		if (secretarys != null && secretarys.length > 0)
			return secretarys[0];
		else
			return null;
	}
	
	public static java.util.Iterator iterateSecretaryByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateSecretaryByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateSecretaryByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateSecretaryByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateSecretaryByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Secretary as Secretary");
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
	
	public static java.util.Iterator iterateSecretaryByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Secretary as Secretary");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("Secretary", lockMode);
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary createSecretary() {
		return new Secretary();
	}
	
	public static boolean save(Secretary secretary) throws PersistentException {
		try {
			DSMPersistentManager.instance().saveObject(secretary);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean delete(Secretary secretary) throws PersistentException {
		try {
			DSMPersistentManager.instance().deleteObject(secretary);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean refresh(Secretary secretary) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().refresh(secretary);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean evict(Secretary secretary) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().evict(secretary);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Secretary loadSecretaryByCriteria(SecretaryCriteria secretaryCriteria) {
		Secretary[] secretarys = listSecretaryByCriteria(secretaryCriteria);
		if(secretarys == null || secretarys.length == 0) {
			return null;
		}
		return secretarys[0];
	}
	
	public static Secretary[] listSecretaryByCriteria(SecretaryCriteria secretaryCriteria) {
		return secretaryCriteria.listSecretary();
	}
}
