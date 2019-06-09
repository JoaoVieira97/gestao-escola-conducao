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

public class TheoreticalLessonDAO {
	public static TheoreticalLesson loadTheoreticalLessonByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadTheoreticalLessonByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson getTheoreticalLessonByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getTheoreticalLessonByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson loadTheoreticalLessonByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadTheoreticalLessonByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson getTheoreticalLessonByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getTheoreticalLessonByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson loadTheoreticalLessonByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (TheoreticalLesson) session.load(TheoreticalLesson.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson getTheoreticalLessonByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (TheoreticalLesson) session.get(TheoreticalLesson.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson loadTheoreticalLessonByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (TheoreticalLesson) session.load(TheoreticalLesson.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson getTheoreticalLessonByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (TheoreticalLesson) session.get(TheoreticalLesson.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryTheoreticalLesson(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryTheoreticalLesson(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryTheoreticalLesson(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryTheoreticalLesson(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson[] listTheoreticalLessonByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listTheoreticalLessonByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson[] listTheoreticalLessonByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listTheoreticalLessonByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryTheoreticalLesson(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.TheoreticalLesson as TheoreticalLesson");
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
	
	public static List queryTheoreticalLesson(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.TheoreticalLesson as TheoreticalLesson");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("TheoreticalLesson", lockMode);
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson[] listTheoreticalLessonByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		try {
			List list = queryTheoreticalLesson(session, condition, orderBy);
			return (TheoreticalLesson[]) list.toArray(new TheoreticalLesson[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson[] listTheoreticalLessonByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			List list = queryTheoreticalLesson(session, condition, orderBy, lockMode);
			return (TheoreticalLesson[]) list.toArray(new TheoreticalLesson[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson loadTheoreticalLessonByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadTheoreticalLessonByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson loadTheoreticalLessonByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadTheoreticalLessonByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson loadTheoreticalLessonByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		TheoreticalLesson[] theoreticalLessons = listTheoreticalLessonByQuery(session, condition, orderBy);
		if (theoreticalLessons != null && theoreticalLessons.length > 0)
			return theoreticalLessons[0];
		else
			return null;
	}
	
	public static TheoreticalLesson loadTheoreticalLessonByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		TheoreticalLesson[] theoreticalLessons = listTheoreticalLessonByQuery(session, condition, orderBy, lockMode);
		if (theoreticalLessons != null && theoreticalLessons.length > 0)
			return theoreticalLessons[0];
		else
			return null;
	}
	
	public static java.util.Iterator iterateTheoreticalLessonByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateTheoreticalLessonByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateTheoreticalLessonByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateTheoreticalLessonByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateTheoreticalLessonByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.TheoreticalLesson as TheoreticalLesson");
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
	
	public static java.util.Iterator iterateTheoreticalLessonByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.TheoreticalLesson as TheoreticalLesson");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("TheoreticalLesson", lockMode);
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson createTheoreticalLesson() {
		return new TheoreticalLesson();
	}
	
	public static boolean save(TheoreticalLesson theoreticalLesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().saveObject(theoreticalLesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean delete(TheoreticalLesson theoreticalLesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().deleteObject(theoreticalLesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean deleteAndDissociate(TheoreticalLesson theoreticalLesson)throws PersistentException {
		try {
			Student[] lStudentss = theoreticalLesson.students.toArray();
			for(int i = 0; i < lStudentss.length; i++) {
				lStudentss[i].lessons.remove(theoreticalLesson);
			}
			return delete(theoreticalLesson);
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean deleteAndDissociate(TheoreticalLesson theoreticalLesson, PersistentSession session)throws PersistentException {
		try {
			Student[] lStudentss = theoreticalLesson.students.toArray();
			for(int i = 0; i < lStudentss.length; i++) {
				lStudentss[i].lessons.remove(theoreticalLesson);
			}
			try {
				session.delete(theoreticalLesson);
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
	
	public static boolean refresh(TheoreticalLesson theoreticalLesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().refresh(theoreticalLesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean evict(TheoreticalLesson theoreticalLesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().evict(theoreticalLesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static TheoreticalLesson loadTheoreticalLessonByCriteria(TheoreticalLessonCriteria theoreticalLessonCriteria) {
		TheoreticalLesson[] theoreticalLessons = listTheoreticalLessonByCriteria(theoreticalLessonCriteria);
		if(theoreticalLessons == null || theoreticalLessons.length == 0) {
			return null;
		}
		return theoreticalLessons[0];
	}
	
	public static TheoreticalLesson[] listTheoreticalLessonByCriteria(TheoreticalLessonCriteria theoreticalLessonCriteria) {
		return theoreticalLessonCriteria.listTheoreticalLesson();
	}
}
