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

public class StudentDetachedCriteria extends AbstractORMDetachedCriteria {
	public final IntegerExpression ID;
	public final StringExpression firstName;
	public final StringExpression lastName;
	public final StringExpression email;
	public final StringExpression password;
	public final LongExpression nif;
	public final StringExpression cc;
	public final StringExpression address;
	public final CollectionExpression announcements;
	public final CollectionExpression registers;
	public final CollectionExpression exams;
	public final CollectionExpression payments;
	public final CollectionExpression practicalLessons;
	public final CollectionExpression theoreticalLessons;
	
	public StudentDetachedCriteria() {
		super(Student.class, StudentCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		firstName = new StringExpression("firstName", this.getDetachedCriteria());
		lastName = new StringExpression("lastName", this.getDetachedCriteria());
		email = new StringExpression("email", this.getDetachedCriteria());
		password = new StringExpression("password", this.getDetachedCriteria());
		nif = new LongExpression("nif", this.getDetachedCriteria());
		cc = new StringExpression("cc", this.getDetachedCriteria());
		address = new StringExpression("address", this.getDetachedCriteria());
		announcements = new CollectionExpression("ORM_Announcements", this.getDetachedCriteria());
		registers = new CollectionExpression("ORM_Registers", this.getDetachedCriteria());
		exams = new CollectionExpression("ORM_Exams", this.getDetachedCriteria());
		payments = new CollectionExpression("ORM_Payments", this.getDetachedCriteria());
		practicalLessons = new CollectionExpression("ORM_PracticalLessons", this.getDetachedCriteria());
		theoreticalLessons = new CollectionExpression("ORM_TheoreticalLessons", this.getDetachedCriteria());
	}
	
	public StudentDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, StudentCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		firstName = new StringExpression("firstName", this.getDetachedCriteria());
		lastName = new StringExpression("lastName", this.getDetachedCriteria());
		email = new StringExpression("email", this.getDetachedCriteria());
		password = new StringExpression("password", this.getDetachedCriteria());
		nif = new LongExpression("nif", this.getDetachedCriteria());
		cc = new StringExpression("cc", this.getDetachedCriteria());
		address = new StringExpression("address", this.getDetachedCriteria());
		announcements = new CollectionExpression("ORM_Announcements", this.getDetachedCriteria());
		registers = new CollectionExpression("ORM_Registers", this.getDetachedCriteria());
		exams = new CollectionExpression("ORM_Exams", this.getDetachedCriteria());
		payments = new CollectionExpression("ORM_Payments", this.getDetachedCriteria());
		practicalLessons = new CollectionExpression("ORM_PracticalLessons", this.getDetachedCriteria());
		theoreticalLessons = new CollectionExpression("ORM_TheoreticalLessons", this.getDetachedCriteria());
	}
	
	public PersonalAnnouncementDetachedCriteria createAnnouncementsCriteria() {
		return new PersonalAnnouncementDetachedCriteria(createCriteria("ORM_Announcements"));
	}
	
	public RegisterDetachedCriteria createRegistersCriteria() {
		return new RegisterDetachedCriteria(createCriteria("ORM_Registers"));
	}
	
	public ExamDetachedCriteria createExamsCriteria() {
		return new ExamDetachedCriteria(createCriteria("ORM_Exams"));
	}
	
	public PaymentDetachedCriteria createPaymentsCriteria() {
		return new PaymentDetachedCriteria(createCriteria("ORM_Payments"));
	}
	
	public PracticalLessonDetachedCriteria createPracticalLessonsCriteria() {
		return new PracticalLessonDetachedCriteria(createCriteria("ORM_PracticalLessons"));
	}
	
	public TheoreticalLessonDetachedCriteria createTheoreticalLessonsCriteria() {
		return new TheoreticalLessonDetachedCriteria(createCriteria("ORM_TheoreticalLessons"));
	}
	
	public Student uniqueStudent(PersistentSession session) {
		return (Student) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Student[] listStudent(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Student[]) list.toArray(new Student[list.size()]);
	}
}

