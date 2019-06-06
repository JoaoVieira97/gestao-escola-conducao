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

public class PracticalLesson extends Lesson {
	public PracticalLesson() {
	}
	
	private java.util.Set this_getSet (int key) {
		if (key == ORMConstants.KEY_PRACTICALLESSON_STUDENTS) {
			return ORM_students;
		}
		
		return null;
	}
	
	private void this_setOwner(Object owner, int key) {
		if (key == ORMConstants.KEY_PRACTICALLESSON_INSTRUCTOR) {
			this.instructor = (Instructor) owner;
		}
	}
	
	org.orm.util.ORMAdapter _ormAdapter = new org.orm.util.AbstractORMAdapter() {
		public java.util.Set getSet(int key) {
			return this_getSet(key);
		}
		
		public void setOwner(Object owner, int key) {
			this_setOwner(owner, key);
		}
		
	};
	
	private Instructor instructor;
	
	private boolean isStudentPresent;
	
	private java.util.Set ORM_students = new java.util.HashSet();
	
	public void setIsStudentPresent(boolean value) {
		this.isStudentPresent = value;
	}
	
	public boolean getIsStudentPresent() {
		return isStudentPresent;
	}
	
	private void setORM_Students(java.util.Set value) {
		this.ORM_students = value;
	}
	
	private java.util.Set getORM_Students() {
		return ORM_students;
	}
	
	public final dsm.StudentSetCollection students = new dsm.StudentSetCollection(this, _ormAdapter, ORMConstants.KEY_PRACTICALLESSON_STUDENTS, ORMConstants.KEY_STUDENT_PRACTICALLESSONS, ORMConstants.KEY_MUL_MANY_TO_MANY);
	
	public void setInstructor(Instructor value) {
		if (instructor != null) {
			instructor.practicalLessons.remove(this);
		}
		if (value != null) {
			value.practicalLessons.add(this);
		}
	}
	
	public Instructor getInstructor() {
		return instructor;
	}
	
	/**
	 * This method is for internal use only.
	 */
	public void setORM_Instructor(Instructor value) {
		this.instructor = value;
	}
	
	private Instructor getORM_Instructor() {
		return instructor;
	}
	
	public String toString() {
		return super.toString();
	}
	
}
