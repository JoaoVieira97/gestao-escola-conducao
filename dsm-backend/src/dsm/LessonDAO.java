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

public class LessonDAO {
	public static Lesson loadLessonByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadLessonByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson getLessonByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getLessonByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson loadLessonByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadLessonByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson getLessonByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getLessonByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson loadLessonByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (Lesson) session.load(Lesson.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson getLessonByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (Lesson) session.get(Lesson.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson loadLessonByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (Lesson) session.load(Lesson.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson getLessonByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (Lesson) session.get(Lesson.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryLesson(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryLesson(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryLesson(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryLesson(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson[] listLessonByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listLessonByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson[] listLessonByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listLessonByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryLesson(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Lesson as Lesson");
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
	
	public static List queryLesson(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Lesson as Lesson");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("Lesson", lockMode);
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson[] listLessonByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		try {
			List list = queryLesson(session, condition, orderBy);
			return (Lesson[]) list.toArray(new Lesson[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson[] listLessonByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			List list = queryLesson(session, condition, orderBy, lockMode);
			return (Lesson[]) list.toArray(new Lesson[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson loadLessonByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadLessonByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson loadLessonByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadLessonByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson loadLessonByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		Lesson[] lessons = listLessonByQuery(session, condition, orderBy);
		if (lessons != null && lessons.length > 0)
			return lessons[0];
		else
			return null;
	}
	
	public static Lesson loadLessonByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		Lesson[] lessons = listLessonByQuery(session, condition, orderBy, lockMode);
		if (lessons != null && lessons.length > 0)
			return lessons[0];
		else
			return null;
	}
	
	public static java.util.Iterator iterateLessonByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateLessonByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateLessonByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateLessonByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateLessonByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Lesson as Lesson");
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
	
	public static java.util.Iterator iterateLessonByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Lesson as Lesson");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("Lesson", lockMode);
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean save(Lesson lesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().saveObject(lesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean delete(Lesson lesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().deleteObject(lesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean deleteAndDissociate(Lesson lesson)throws PersistentException {
		if (lesson instanceof dsm.PracticalLesson) {
			return dsm.PracticalLessonDAO.deleteAndDissociate((dsm.PracticalLesson) lesson);
		}
		
		if (lesson instanceof dsm.TheoreticalLesson) {
			return dsm.TheoreticalLessonDAO.deleteAndDissociate((dsm.TheoreticalLesson) lesson);
		}
		
		try {
			dsm.Student[] lStudentss = lesson.students.toArray();
			for(int i = 0; i < lStudentss.length; i++) {
				lStudentss[i].lessons.remove(lesson);
			}
			return delete(lesson);
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean deleteAndDissociate(Lesson lesson, PersistentSession session)throws PersistentException {
		if (lesson instanceof dsm.PracticalLesson) {
			return dsm.PracticalLessonDAO.deleteAndDissociate((dsm.PracticalLesson) lesson, session);
		}
		
		if (lesson instanceof dsm.TheoreticalLesson) {
			return dsm.TheoreticalLessonDAO.deleteAndDissociate((dsm.TheoreticalLesson) lesson, session);
		}
		
		try {
			dsm.Student[] lStudentss = lesson.students.toArray();
			for(int i = 0; i < lStudentss.length; i++) {
				lStudentss[i].lessons.remove(lesson);
			}
			try {
				session.delete(lesson);
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
	
	public static boolean refresh(Lesson lesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().refresh(lesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean evict(Lesson lesson) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().evict(lesson);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Lesson loadLessonByCriteria(LessonCriteria lessonCriteria) {
		Lesson[] lessons = listLessonByCriteria(lessonCriteria);
		if(lessons == null || lessons.length == 0) {
			return null;
		}
		return lessons[0];
	}
	
	public static Lesson[] listLessonByCriteria(LessonCriteria lessonCriteria) {
		return lessonCriteria.listLesson();
	}
}
