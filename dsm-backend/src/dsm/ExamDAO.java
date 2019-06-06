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

public class ExamDAO {
	public static Exam loadExamByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadExamByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam getExamByORMID(int ID) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getExamByORMID(session, ID);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam loadExamByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadExamByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam getExamByORMID(int ID, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return getExamByORMID(session, ID, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam loadExamByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (Exam) session.load(Exam.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam getExamByORMID(PersistentSession session, int ID) throws PersistentException {
		try {
			return (Exam) session.get(Exam.class, new Integer(ID));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam loadExamByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (Exam) session.load(Exam.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam getExamByORMID(PersistentSession session, int ID, LockMode lockMode) throws PersistentException {
		try {
			return (Exam) session.get(Exam.class, new Integer(ID), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryExam(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryExam(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryExam(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return queryExam(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam[] listExamByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listExamByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam[] listExamByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return listExamByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryExam(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Exam as Exam");
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
	
	public static List queryExam(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Exam as Exam");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("Exam", lockMode);
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam[] listExamByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		try {
			List list = queryExam(session, condition, orderBy);
			return (Exam[]) list.toArray(new Exam[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam[] listExamByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			List list = queryExam(session, condition, orderBy, lockMode);
			return (Exam[]) list.toArray(new Exam[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam loadExamByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadExamByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam loadExamByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return loadExamByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam loadExamByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		Exam[] exams = listExamByQuery(session, condition, orderBy);
		if (exams != null && exams.length > 0)
			return exams[0];
		else
			return null;
	}
	
	public static Exam loadExamByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		Exam[] exams = listExamByQuery(session, condition, orderBy, lockMode);
		if (exams != null && exams.length > 0)
			return exams[0];
		else
			return null;
	}
	
	public static java.util.Iterator iterateExamByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateExamByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateExamByQuery(String condition, String orderBy, LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = DSMPersistentManager.instance().getSession();
			return iterateExamByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateExamByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Exam as Exam");
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
	
	public static java.util.Iterator iterateExamByQuery(PersistentSession session, String condition, String orderBy, LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From dsm.Exam as Exam");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("Exam", lockMode);
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam createExam() {
		return new Exam();
	}
	
	public static boolean save(Exam exam) throws PersistentException {
		try {
			DSMPersistentManager.instance().saveObject(exam);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean delete(Exam exam) throws PersistentException {
		try {
			DSMPersistentManager.instance().deleteObject(exam);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean refresh(Exam exam) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().refresh(exam);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean evict(Exam exam) throws PersistentException {
		try {
			DSMPersistentManager.instance().getSession().evict(exam);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Exam loadExamByCriteria(ExamCriteria examCriteria) {
		Exam[] exams = listExamByCriteria(examCriteria);
		if(exams == null || exams.length == 0) {
			return null;
		}
		return exams[0];
	}
	
	public static Exam[] listExamByCriteria(ExamCriteria examCriteria) {
		return examCriteria.listExam();
	}
}
