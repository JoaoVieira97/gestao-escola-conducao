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

public class Register {
	public Register() {
	}
	
	private void this_setOwner(Object owner, int key) {
		if (key == ORMConstants.KEY_REGISTER_INSTRUCTOR) {
			this.instructor = (dsm.Instructor) owner;
		}
		
		else if (key == ORMConstants.KEY_REGISTER_LICENSE) {
			this.license = (dsm.LicenseCar) owner;
		}
	}
	
	org.orm.util.ORMAdapter _ormAdapter = new org.orm.util.AbstractORMAdapter() {
		public void setOwner(Object owner, int key) {
			this_setOwner(owner, key);
		}
		
	};
	
	private int ID;
	
	private dsm.LicenseCar license;
	
	private dsm.Instructor instructor;
	
	private java.util.Date initialDate;
	
	private void setID(int value) {
		this.ID = value;
	}
	
	public int getID() {
		return ID;
	}
	
	public int getORMID() {
		return getID();
	}
	
	public void setInitialDate(java.util.Date value) {
		this.initialDate = value;
	}
	
	public java.util.Date getInitialDate() {
		return initialDate;
	}
	
	public void setInstructor(dsm.Instructor value) {
		this.instructor = value;
	}
	
	public dsm.Instructor getInstructor() {
		return instructor;
	}
	
	public void setLicense(dsm.LicenseCar value) {
		this.license = value;
	}
	
	public dsm.LicenseCar getLicense() {
		return license;
	}
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
