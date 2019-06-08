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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"password", "workingDays", "lessons", "ormid"})
public class Instructor extends dsm.User {
	public Instructor() {
	}
	
	private java.util.Set this_getSet (int key) {
		if (key == ORMConstants.KEY_INSTRUCTOR_WORKINGDAYS) {
			return ORM_workingDays;
		}
		else if (key == ORMConstants.KEY_INSTRUCTOR_LESSONS) {
			return ORM_lessons;
		}
		
		return null;
	}
	
	org.orm.util.ORMAdapter _ormAdapter = new org.orm.util.AbstractORMAdapter() {
		public java.util.Set getSet(int key) {
			return this_getSet(key);
		}
		
	};
	
	private java.util.Set ORM_workingDays = new java.util.HashSet();
	
	private java.util.Set ORM_lessons = new java.util.HashSet();
	
	private void setORM_WorkingDays(java.util.Set value) {
		this.ORM_workingDays = value;
	}
	
	private java.util.Set getORM_WorkingDays() {
		return ORM_workingDays;
	}
	
	public final dsm.WorkingDaySetCollection workingDays = new dsm.WorkingDaySetCollection(this, _ormAdapter, ORMConstants.KEY_INSTRUCTOR_WORKINGDAYS, ORMConstants.KEY_MUL_MANY_TO_MANY);
	
	private void setORM_Lessons(java.util.Set value) {
		this.ORM_lessons = value;
	}
	
	private java.util.Set getORM_Lessons() {
		return ORM_lessons;
	}
	
	public final dsm.LessonSetCollection lessons = new dsm.LessonSetCollection(this, _ormAdapter, ORMConstants.KEY_INSTRUCTOR_LESSONS, ORMConstants.KEY_MUL_ONE_TO_MANY);
	
	public String toString() {
		return super.toString();
	}
	
}
