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
	public final StringExpression name;
	public final StringExpression email;
	public final StringExpression password;
	public final StringExpression role;
	public final LongExpression nif;
	public final StringExpression cc;
	public final StringExpression address;
	public final DateExpression birth;
	public final CollectionExpression lessons;
	public final CollectionExpression registers;
	public final CollectionExpression announcements;
	public final CollectionExpression exams;
	
	public StudentCriteria(Criteria criteria) {
		super(criteria);
		ID = new IntegerExpression("ID", this);
		name = new StringExpression("name", this);
		email = new StringExpression("email", this);
		password = new StringExpression("password", this);
		role = new StringExpression("role", this);
		nif = new LongExpression("nif", this);
		cc = new StringExpression("cc", this);
		address = new StringExpression("address", this);
		birth = new DateExpression("birth", this);
		lessons = new CollectionExpression("ORM_Lessons", this);
		registers = new CollectionExpression("ORM_Registers", this);
		announcements = new CollectionExpression("ORM_Announcements", this);
		exams = new CollectionExpression("ORM_Exams", this);
	}
	
	public StudentCriteria(PersistentSession session) {
		this(session.createCriteria(Student.class));
	}
	
	public StudentCriteria() throws PersistentException {
		this(DSMPersistentManager.instance().getSession());
	}
	
	public LessonCriteria createLessonsCriteria() {
		return new LessonCriteria(createCriteria("ORM_Lessons"));
	}
	
	public RegisterCriteria createRegistersCriteria() {
		return new RegisterCriteria(createCriteria("ORM_Registers"));
	}
	
	public PersonalAnnouncementCriteria createAnnouncementsCriteria() {
		return new PersonalAnnouncementCriteria(createCriteria("ORM_Announcements"));
	}
	
	public ExamCriteria createExamsCriteria() {
		return new ExamCriteria(createCriteria("ORM_Exams"));
	}
	
	public Student uniqueStudent() {
		return (Student) super.uniqueResult();
	}
	
	public Student[] listStudent() {
		java.util.List list = super.list();
		return (Student[]) list.toArray(new Student[list.size()]);
	}
}

