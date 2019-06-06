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

public class Instructor extends User {
	public Instructor() {
	}
	
	private java.util.Set this_getSet (int key) {
		if (key == ORMConstants.KEY_INSTRUCTOR_PRACTICALLESSONS) {
			return ORM_practicalLessons;
		}
		else if (key == ORMConstants.KEY_INSTRUCTOR_WORKINGDAYS) {
			return ORM_workingDays;
		}
		else if (key == ORMConstants.KEY_INSTRUCTOR_THEORETICALLESSONS) {
			return ORM_theoreticalLessons;
		}
		
		return null;
	}
	
	org.orm.util.ORMAdapter _ormAdapter = new org.orm.util.AbstractORMAdapter() {
		public java.util.Set getSet(int key) {
			return this_getSet(key);
		}
		
	};
	
	private java.util.Set ORM_practicalLessons = new java.util.HashSet();
	
	private java.util.Set ORM_workingDays = new java.util.HashSet();
	
	private java.util.Set ORM_theoreticalLessons = new java.util.HashSet();
	
	private void setORM_PracticalLessons(java.util.Set value) {
		this.ORM_practicalLessons = value;
	}
	
	private java.util.Set getORM_PracticalLessons() {
		return ORM_practicalLessons;
	}
	
	public final dsm.PracticalLessonSetCollection practicalLessons = new dsm.PracticalLessonSetCollection(this, _ormAdapter, ORMConstants.KEY_INSTRUCTOR_PRACTICALLESSONS, ORMConstants.KEY_PRACTICALLESSON_INSTRUCTOR, ORMConstants.KEY_MUL_ONE_TO_MANY);
	
	private void setORM_WorkingDays(java.util.Set value) {
		this.ORM_workingDays = value;
	}
	
	private java.util.Set getORM_WorkingDays() {
		return ORM_workingDays;
	}
	
	public final dsm.WorkingDaySetCollection workingDays = new dsm.WorkingDaySetCollection(this, _ormAdapter, ORMConstants.KEY_INSTRUCTOR_WORKINGDAYS, ORMConstants.KEY_MUL_ONE_TO_MANY);
	
	private void setORM_TheoreticalLessons(java.util.Set value) {
		this.ORM_theoreticalLessons = value;
	}
	
	private java.util.Set getORM_TheoreticalLessons() {
		return ORM_theoreticalLessons;
	}
	
	public final dsm.TheoreticalLessonSetCollection theoreticalLessons = new dsm.TheoreticalLessonSetCollection(this, _ormAdapter, ORMConstants.KEY_INSTRUCTOR_THEORETICALLESSONS, ORMConstants.KEY_THEORETICALLESSON_INSTRUCTOR, ORMConstants.KEY_MUL_ONE_TO_MANY);
	
	public String toString() {
		return super.toString();
	}
	
}
