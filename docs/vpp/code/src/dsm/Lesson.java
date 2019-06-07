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

public abstract class Lesson {
	public Lesson() {
	}
	
	private java.util.Set this_getSet (int key) {
		if (key == ORMConstants.KEY_LESSON_STUDENTS) {
			return ORM_students;
		}
		else if (key == ORMConstants.KEY_LESSON_LICENSES) {
			return ORM_licenses;
		}
		
		return null;
	}
	
	org.orm.util.ORMAdapter _ormAdapter = new org.orm.util.AbstractORMAdapter() {
		public java.util.Set getSet(int key) {
			return this_getSet(key);
		}
		
	};
	
	private int ID;
	
	private java.util.Date startTime;
	
	private int duration;
	
	private String state;
	
	private java.util.Set ORM_students = new java.util.HashSet();
	
	private java.util.Set ORM_licenses = new java.util.HashSet();
	
	private void setID(int value) {
		this.ID = value;
	}
	
	public int getID() {
		return ID;
	}
	
	public int getORMID() {
		return getID();
	}
	
	public void setStartTime(java.util.Date value) {
		this.startTime = value;
	}
	
	public java.util.Date getStartTime() {
		return startTime;
	}
	
	public void setDuration(int value) {
		this.duration = value;
	}
	
	public int getDuration() {
		return duration;
	}
	
	public void setState(String value) {
		this.state = value;
	}
	
	public String getState() {
		return state;
	}
	
	private void setORM_Students(java.util.Set value) {
		this.ORM_students = value;
	}
	
	private java.util.Set getORM_Students() {
		return ORM_students;
	}
	
	public final dsm.StudentSetCollection students = new dsm.StudentSetCollection(this, _ormAdapter, ORMConstants.KEY_LESSON_STUDENTS, ORMConstants.KEY_STUDENT_LESSONS, ORMConstants.KEY_MUL_MANY_TO_MANY);
	
	private void setORM_Licenses(java.util.Set value) {
		this.ORM_licenses = value;
	}
	
	private java.util.Set getORM_Licenses() {
		return ORM_licenses;
	}
	
	public final dsm.LicenseCarSetCollection licenses = new dsm.LicenseCarSetCollection(this, _ormAdapter, ORMConstants.KEY_LESSON_LICENSES, ORMConstants.KEY_MUL_MANY_TO_MANY);
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
