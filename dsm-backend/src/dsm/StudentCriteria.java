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

import org.hibernate.Criteria;
import org.orm.PersistentException;
import org.orm.PersistentSession;
import org.orm.criteria.*;

public class StudentCriteria extends AbstractORMCriteria {
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
	
	public StudentCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		firstName = new StringExpression("firstName", this);
		lastName = new StringExpression("lastName", this);
		email = new StringExpression("email", this);
		password = new StringExpression("password", this);
		nif = new LongExpression("nif", this);
		cc = new StringExpression("cc", this);
		address = new StringExpression("address", this);
		announcements = new CollectionExpression("ORM_Announcements", this);
		registers = new CollectionExpression("ORM_Registers", this);
		exams = new CollectionExpression("ORM_Exams", this);
		payments = new CollectionExpression("ORM_Payments", this);
		practicalLessons = new CollectionExpression("ORM_PracticalLessons", this);
		theoreticalLessons = new CollectionExpression("ORM_TheoreticalLessons", this);
	}
	
	public StudentCriteria(PersistentSession session) {
		this(session.createCriteria(Student.class));
	}
	
	public StudentCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public PersonalAnnouncementCriteria createAnnouncementsCriteria() {
		return new PersonalAnnouncementCriteria(createCriteria("ORM_Announcements"));
	}
	
	public RegisterCriteria createRegistersCriteria() {
		return new RegisterCriteria(createCriteria("ORM_Registers"));
	}
	
	public ExamCriteria createExamsCriteria() {
		return new ExamCriteria(createCriteria("ORM_Exams"));
	}
	
	public PaymentCriteria createPaymentsCriteria() {
		return new PaymentCriteria(createCriteria("ORM_Payments"));
	}
	
	public PracticalLessonCriteria createPracticalLessonsCriteria() {
		return new PracticalLessonCriteria(createCriteria("ORM_PracticalLessons"));
	}
	
	public TheoreticalLessonCriteria createTheoreticalLessonsCriteria() {
		return new TheoreticalLessonCriteria(createCriteria("ORM_TheoreticalLessons"));
	}
	
	public Student uniqueStudent() {
		return (Student) super.uniqueResult();
	}
	
	public Student[] listStudent() {
		java.util.List list = super.list();
		return (Student[]) list.toArray(new Student[list.size()]);
	}
}

