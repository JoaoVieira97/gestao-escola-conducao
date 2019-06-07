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
	public final StringExpression role;
	public final LongExpression nif;
	public final StringExpression cc;
	public final StringExpression address;
	public final DateExpression birth;
	public final CollectionExpression payments;
	public final CollectionExpression exams;
	public final CollectionExpression announcements;
	public final CollectionExpression lessons;
	public final CollectionExpression registers;
	
	public StudentDetachedCriteria() {
		super(dsm.Student.class, dsm.StudentCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		firstName = new StringExpression("firstName", this.getDetachedCriteria());
		lastName = new StringExpression("lastName", this.getDetachedCriteria());
		email = new StringExpression("email", this.getDetachedCriteria());
		password = new StringExpression("password", this.getDetachedCriteria());
		role = new StringExpression("role", this.getDetachedCriteria());
		nif = new LongExpression("nif", this.getDetachedCriteria());
		cc = new StringExpression("cc", this.getDetachedCriteria());
		address = new StringExpression("address", this.getDetachedCriteria());
		birth = new DateExpression("birth", this.getDetachedCriteria());
		payments = new CollectionExpression("ORM_Payments", this.getDetachedCriteria());
		exams = new CollectionExpression("ORM_Exams", this.getDetachedCriteria());
		announcements = new CollectionExpression("ORM_Announcements", this.getDetachedCriteria());
		lessons = new CollectionExpression("ORM_Lessons", this.getDetachedCriteria());
		registers = new CollectionExpression("ORM_Registers", this.getDetachedCriteria());
	}
	
	public StudentDetachedCriteria(DetachedCriteria aDetachedCriteria) {
		super(aDetachedCriteria, dsm.StudentCriteria.class);
		ID = new IntegerExpression("ID", this.getDetachedCriteria());
		firstName = new StringExpression("firstName", this.getDetachedCriteria());
		lastName = new StringExpression("lastName", this.getDetachedCriteria());
		email = new StringExpression("email", this.getDetachedCriteria());
		password = new StringExpression("password", this.getDetachedCriteria());
		role = new StringExpression("role", this.getDetachedCriteria());
		nif = new LongExpression("nif", this.getDetachedCriteria());
		cc = new StringExpression("cc", this.getDetachedCriteria());
		address = new StringExpression("address", this.getDetachedCriteria());
		birth = new DateExpression("birth", this.getDetachedCriteria());
		payments = new CollectionExpression("ORM_Payments", this.getDetachedCriteria());
		exams = new CollectionExpression("ORM_Exams", this.getDetachedCriteria());
		announcements = new CollectionExpression("ORM_Announcements", this.getDetachedCriteria());
		lessons = new CollectionExpression("ORM_Lessons", this.getDetachedCriteria());
		registers = new CollectionExpression("ORM_Registers", this.getDetachedCriteria());
	}
	
	public PaymentDetachedCriteria createPaymentsCriteria() {
		return new PaymentDetachedCriteria(createCriteria("ORM_Payments"));
	}
	
	public ExamDetachedCriteria createExamsCriteria() {
		return new ExamDetachedCriteria(createCriteria("ORM_Exams"));
	}
	
	public PersonalAnnouncementDetachedCriteria createAnnouncementsCriteria() {
		return new PersonalAnnouncementDetachedCriteria(createCriteria("ORM_Announcements"));
	}
	
	public LessonDetachedCriteria createLessonsCriteria() {
		return new LessonDetachedCriteria(createCriteria("ORM_Lessons"));
	}
	
	public RegisterDetachedCriteria createRegistersCriteria() {
		return new RegisterDetachedCriteria(createCriteria("ORM_Registers"));
	}
	
	public Student uniqueStudent(PersistentSession session) {
		return (Student) super.createExecutableCriteria(session).uniqueResult();
	}
	
	public Student[] listStudent(PersistentSession session) {
		List list = super.createExecutableCriteria(session).list();
		return (Student[]) list.toArray(new Student[list.size()]);
	}
}

