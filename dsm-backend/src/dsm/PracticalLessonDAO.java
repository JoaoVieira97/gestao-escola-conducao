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

public class PracticalLessonDAO {
	public static PracticalLesson loadPracticalLessonByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadPracticalLessonByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson getPracticalLessonByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getPracticalLessonByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson loadPracticalLessonByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadPracticalLessonByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson getPracticalLessonByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getPracticalLessonByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson loadPracticalLessonByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (PracticalLesson) session.load(PracticalLesson.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson getPracticalLessonByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (PracticalLesson) session.get(PracticalLesson.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson loadPracticalLessonByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (PracticalLesson) session.load(PracticalLesson.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson getPracticalLessonByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (PracticalLesson) session.get(PracticalLesson.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryPracticalLesson(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryPracticalLesson(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryPracticalLesson(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryPracticalLesson(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson[] listPracticalLessonByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listPracticalLessonByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson[] listPracticalLessonByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listPracticalLessonByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryPracticalLesson(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.PracticalLesson as PracticalLesson");
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
	
	public static List queryPracticalLesson(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.PracticalLesson as PracticalLesson");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("PracticalLesson", lockMode);
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson[] listPracticalLessonByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		try {
			List list = queryPracticalLesson(session, condition, orderBy);
			return (PracticalLesson[]) list.toArray(new PracticalLesson[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson[] listPracticalLessonByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			List list = queryPracticalLesson(session, condition, orderBy, lockMode);
			return (PracticalLesson[]) list.toArray(new PracticalLesson[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson loadPracticalLessonByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadPracticalLessonByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson loadPracticalLessonByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadPracticalLessonByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson loadPracticalLessonByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		PracticalLesson[] practicalLessons = listPracticalLessonByQuery(session, condition, orderBy);
		if (practicalLessons != null && practicalLessons.length > 0)
			return practicalLessons[0];
		else
			return null;
	}
	
	public static PracticalLesson loadPracticalLessonByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		PracticalLesson[] practicalLessons = listPracticalLessonByQuery(session, condition, orderBy, lockMode);
		if (practicalLessons != null && practicalLessons.length > 0)
			return practicalLessons[0];
		else
			return null;
	}
	
	public static java.util.Iterator iteratePracticalLessonByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iteratePracticalLessonByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iteratePracticalLessonByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iteratePracticalLessonByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iteratePracticalLessonByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.PracticalLesson as PracticalLesson");
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
	
	public static java.util.Iterator iteratePracticalLessonByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.PracticalLesson as PracticalLesson");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("PracticalLesson", lockMode);
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson createPracticalLesson() {
		return new PracticalLesson();
	}
	
	public static boolean save(PracticalLesson practicalLesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().saveObject(practicalLesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean delete(PracticalLesson practicalLesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().deleteObject(practicalLesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean deleteAndDissociate(PracticalLesson practicalLesson)throws PersistentException {
		try {
			if (practicalLesson.getInstructor() != null) {
				practicalLesson.getInstructor().practicalLessons.remove(practicalLesson);
			}
			
			Student[] lStudentss = practicalLesson.students.toArray();
			for(int i = 0; i < lStudentss.length; i++) {
				lStudentss[i].practicalLessons.remove(practicalLesson);
			}
			return delete(practicalLesson);
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean deleteAndDissociate(PracticalLesson practicalLesson, PersistentSession session)throws PersistentException {
		try {
			if (practicalLesson.getInstructor() != null) {
				practicalLesson.getInstructor().practicalLessons.remove(practicalLesson);
			}
			
			Student[] lStudentss = practicalLesson.students.toArray();
			for(int i = 0; i < lStudentss.length; i++) {
				lStudentss[i].practicalLessons.remove(practicalLesson);
			}
			try {
				session.delete(practicalLesson);
				return true;
			} catch (Exception e) {
				return false;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean refresh(PracticalLesson practicalLesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().refresh(practicalLesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean evict(PracticalLesson practicalLesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().evict(practicalLesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static PracticalLesson loadPracticalLessonByCriteria(PracticalLessonCriteria practicalLessonCriteria) {
		PracticalLesson[] practicalLessons = listPracticalLessonByCriteria(practicalLessonCriteria);
		if(practicalLessons == null || practicalLessons.length == 0) {
			return null;
		}
		return practicalLessons[0];
	}
	
	public static PracticalLesson[] listPracticalLessonByCriteria(PracticalLessonCriteria practicalLessonCriteria) {
		return practicalLessonCriteria.listPracticalLesson();
	}
}
