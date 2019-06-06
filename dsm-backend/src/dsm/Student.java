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

public class Student extends User {
	public Student() {
	}
	
	private java.util.Set this_getSet (int key) {
		if (key == ORMConstants.KEY_STUDENT_ANNOUNCEMENTS) {
			return ORM_announcements;
		}
		else if (key == ORMConstants.KEY_STUDENT_REGISTERS) {
			return ORM_registers;
		}
		else if (key == ORMConstants.KEY_STUDENT_EXAMS) {
			return ORM_exams;
		}
		else if (key == ORMConstants.KEY_STUDENT_PAYMENTS) {
			return ORM_payments;
		}
		else if (key == ORMConstants.KEY_STUDENT_PRACTICALLESSONS) {
			return ORM_practicalLessons;
		}
		else if (key == ORMConstants.KEY_STUDENT_THEORETICALLESSONS) {
			return ORM_theoreticalLessons;
		}
		
		return null;
	}
	
	org.orm.util.ORMAdapter _ormAdapter = new org.orm.util.AbstractORMAdapter() {
		public java.util.Set getSet(int key) {
			return this_getSet(key);
		}
		
	};
	
	private long nif;
	
	private String cc;
	
	private String address;
	
	private java.util.Set ORM_announcements = new java.util.HashSet();
	
	private java.util.Set ORM_registers = new java.util.HashSet();
	
	private java.util.Set ORM_exams = new java.util.HashSet();
	
	private java.util.Set ORM_payments = new java.util.HashSet();
	
	private java.util.Set ORM_practicalLessons = new java.util.HashSet();
	
	private java.util.Set ORM_theoreticalLessons = new java.util.HashSet();
	
	public void setNif(long value) {
		this.nif = value;
	}
	
	public long getNif() {
		return nif;
	}
	
	public void setCc(String value) {
		this.cc = value;
	}
	
	public String getCc() {
		return cc;
	}
	
	public void setAddress(String value) {
		this.address = value;
	}
	
	public String getAddress() {
		return address;
	}
	
	private void setORM_Announcements(java.util.Set value) {
		this.ORM_announcements = value;
	}
	
	private java.util.Set getORM_Announcements() {
		return ORM_announcements;
	}
	
	public final dsm.PersonalAnnouncementSetCollection announcements = new dsm.PersonalAnnouncementSetCollection(this, _ormAdapter, ORMConstants.KEY_STUDENT_ANNOUNCEMENTS, ORMConstants.KEY_MUL_ONE_TO_MANY);
	
	private void setORM_Registers(java.util.Set value) {
		this.ORM_registers = value;
	}
	
	private java.util.Set getORM_Registers() {
		return ORM_registers;
	}
	
	public final dsm.RegisterSetCollection registers = new dsm.RegisterSetCollection(this, _ormAdapter, ORMConstants.KEY_STUDENT_REGISTERS, ORMConstants.KEY_MUL_ONE_TO_MANY);
	
	private void setORM_Exams(java.util.Set value) {
		this.ORM_exams = value;
	}
	
	private java.util.Set getORM_Exams() {
		return ORM_exams;
	}
	
	public final dsm.ExamSetCollection exams = new dsm.ExamSetCollection(this, _ormAdapter, ORMConstants.KEY_STUDENT_EXAMS, ORMConstants.KEY_MUL_ONE_TO_MANY);
	
	private void setORM_Payments(java.util.Set value) {
		this.ORM_payments = value;
	}
	
	private java.util.Set getORM_Payments() {
		return ORM_payments;
	}
	
	public final dsm.PaymentSetCollection payments = new dsm.PaymentSetCollection(this, _ormAdapter, ORMConstants.KEY_STUDENT_PAYMENTS, ORMConstants.KEY_MUL_ONE_TO_MANY);
	
	private void setORM_PracticalLessons(java.util.Set value) {
		this.ORM_practicalLessons = value;
	}
	
	private java.util.Set getORM_PracticalLessons() {
		return ORM_practicalLessons;
	}
	
	public final dsm.PracticalLessonSetCollection practicalLessons = new dsm.PracticalLessonSetCollection(this, _ormAdapter, ORMConstants.KEY_STUDENT_PRACTICALLESSONS, ORMConstants.KEY_PRACTICALLESSON_STUDENTS, ORMConstants.KEY_MUL_MANY_TO_MANY);
	
	private void setORM_TheoreticalLessons(java.util.Set value) {
		this.ORM_theoreticalLessons = value;
	}
	
	private java.util.Set getORM_TheoreticalLessons() {
		return ORM_theoreticalLessons;
	}
	
	public final dsm.TheoreticalLessonSetCollection theoreticalLessons = new dsm.TheoreticalLessonSetCollection(this, _ormAdapter, ORMConstants.KEY_STUDENT_THEORETICALLESSONS, ORMConstants.KEY_THEORETICALLESSON_STUDENTS, ORMConstants.KEY_MUL_MANY_TO_MANY);
	
	public String toString() {
		return super.toString();
	}
	
}
