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

public class WorkingDayDAO {
	public static WorkingDay loadWorkingDayByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadWorkingDayByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay getWorkingDayByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getWorkingDayByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay loadWorkingDayByORMID(int ID, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadWorkingDayByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay getWorkingDayByORMID(int ID, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getWorkingDayByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay loadWorkingDayByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (WorkingDay) session.load(dsm.WorkingDay.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay getWorkingDayByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (WorkingDay) session.get(dsm.WorkingDay.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay loadWorkingDayByORMID(PersistentSession session, int ID, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			return (WorkingDay) session.load(dsm.WorkingDay.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay getWorkingDayByORMID(PersistentSession session, int ID, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			return (WorkingDay) session.get(dsm.WorkingDay.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryWorkingDay(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryWorkingDay(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryWorkingDay(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryWorkingDay(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay[] listWorkingDayByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listWorkingDayByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay[] listWorkingDayByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listWorkingDayByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryWorkingDay(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.WorkingDay as WorkingDay");
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
	
	public static List queryWorkingDay(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.WorkingDay as WorkingDay");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("WorkingDay", lockMode);
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay[] listWorkingDayByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		try {
			List list = queryWorkingDay(session, condition, orderBy);
			return (WorkingDay[]) list.toArray(new WorkingDay[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay[] listWorkingDayByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			List list = queryWorkingDay(session, condition, orderBy, lockMode);
			return (WorkingDay[]) list.toArray(new WorkingDay[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay loadWorkingDayByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadWorkingDayByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay loadWorkingDayByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadWorkingDayByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay loadWorkingDayByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		WorkingDay[] workingDays = listWorkingDayByQuery(session, condition, orderBy);
		if (workingDays != null && workingDays.length > 0)
			return workingDays[0];
		else
			return null;
	}
	
	public static WorkingDay loadWorkingDayByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		WorkingDay[] workingDays = listWorkingDayByQuery(session, condition, orderBy, lockMode);
		if (workingDays != null && workingDays.length > 0)
			return workingDays[0];
		else
			return null;
	}
	
	public static java.util.Iterator iterateWorkingDayByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateWorkingDayByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateWorkingDayByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateWorkingDayByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateWorkingDayByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.WorkingDay as WorkingDay");
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
	
	public static java.util.Iterator iterateWorkingDayByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.WorkingDay as WorkingDay");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("WorkingDay", lockMode);
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay createWorkingDay() {
		return new dsm.WorkingDay();
	}
	
	public static boolean save(dsm.WorkingDay workingDay) throws PersistentException {
		try {
			DSMPersistentManager.instance().saveObject(workingDay);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean delete(dsm.WorkingDay workingDay) throws PersistentException {
		try {
			DSMPersistentManager.instance().deleteObject(workingDay);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean refresh(dsm.WorkingDay workingDay) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().refresh(workingDay);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean evict(dsm.WorkingDay workingDay) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().evict(workingDay);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static WorkingDay loadWorkingDayByCriteria(WorkingDayCriteria workingDayCriteria) {
		WorkingDay[] workingDays = listWorkingDayByCriteria(workingDayCriteria);
		if(workingDays == null || workingDays.length == 0) {
			return null;
		}
		return workingDays[0];
	}
	
	public static WorkingDay[] listWorkingDayByCriteria(WorkingDayCriteria workingDayCriteria) {
		return workingDayCriteria.listWorkingDay();
	}
}
