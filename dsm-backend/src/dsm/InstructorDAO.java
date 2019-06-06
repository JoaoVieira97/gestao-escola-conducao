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

public class InstructorDAO {
	public static Instructor loadInstructorByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadInstructorByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor getInstructorByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getInstructorByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor loadInstructorByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadInstructorByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor getInstructorByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getInstructorByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor loadInstructorByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (Instructor) session.load(Instructor.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor getInstructorByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (Instructor) session.get(Instructor.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor loadInstructorByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (Instructor) session.load(Instructor.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor getInstructorByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (Instructor) session.get(Instructor.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryInstructor(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryInstructor(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryInstructor(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryInstructor(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor[] listInstructorByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listInstructorByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor[] listInstructorByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listInstructorByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryInstructor(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Instructor as Instructor");
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
	
	public static List queryInstructor(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Instructor as Instructor");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("Instructor", lockMode);
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor[] listInstructorByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		try {
			List list = queryInstructor(session, condition, orderBy);
			return (Instructor[]) list.toArray(new Instructor[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor[] listInstructorByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			List list = queryInstructor(session, condition, orderBy, lockMode);
			return (Instructor[]) list.toArray(new Instructor[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor loadInstructorByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadInstructorByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor loadInstructorByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadInstructorByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor loadInstructorByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		Instructor[] instructors = listInstructorByQuery(session, condition, orderBy);
		if (instructors != null && instructors.length > 0)
			return instructors[0];
		else
			return null;
	}
	
	public static Instructor loadInstructorByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		Instructor[] instructors = listInstructorByQuery(session, condition, orderBy, lockMode);
		if (instructors != null && instructors.length > 0)
			return instructors[0];
		else
			return null;
	}
	
	public static java.util.Iterator iterateInstructorByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateInstructorByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateInstructorByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateInstructorByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateInstructorByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Instructor as Instructor");
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
	
	public static java.util.Iterator iterateInstructorByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Instructor as Instructor");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("Instructor", lockMode);
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor createInstructor() {
		return new Instructor();
	}
	
	public static boolean save(Instructor instructor) throws PersistentException {
		try {
			DSMPersistentManager.instance().saveObject(instructor);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean delete(Instructor instructor) throws PersistentException {
		try {
			DSMPersistentManager.instance().deleteObject(instructor);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean deleteAndDissociate(Instructor instructor)throws PersistentException {
		try {
			dsm.PracticalLesson[] lPracticalLessonss = instructor.practicalLessons.toArray();
			for(int i = 0; i < lPracticalLessonss.length; i++) {
				lPracticalLessonss[i].setInstructor(null);
			}
			dsm.TheoreticalLesson[] lTheoreticalLessonss = instructor.theoreticalLessons.toArray();
			for(int i = 0; i < lTheoreticalLessonss.length; i++) {
				lTheoreticalLessonss[i].setInstructor(null);
			}
			return delete(instructor);
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean deleteAndDissociate(Instructor instructor, PersistentSession session)throws PersistentException {
		try {
			dsm.PracticalLesson[] lPracticalLessonss = instructor.practicalLessons.toArray();
			for(int i = 0; i < lPracticalLessonss.length; i++) {
				lPracticalLessonss[i].setInstructor(null);
			}
			dsm.TheoreticalLesson[] lTheoreticalLessonss = instructor.theoreticalLessons.toArray();
			for(int i = 0; i < lTheoreticalLessonss.length; i++) {
				lTheoreticalLessonss[i].setInstructor(null);
			}
			try {
				session.delete(instructor);
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
	
	public static boolean refresh(Instructor instructor) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().refresh(instructor);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean evict(Instructor instructor) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().evict(instructor);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Instructor loadInstructorByCriteria(InstructorCriteria instructorCriteria) {
		Instructor[] instructors = listInstructorByCriteria(instructorCriteria);
		if(instructors == null || instructors.length == 0) {
			return null;
		}
		return instructors[0];
	}
	
	public static Instructor[] listInstructorByCriteria(InstructorCriteria instructorCriteria) {
		return instructorCriteria.listInstructor();
	}
}
