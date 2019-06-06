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

public class Payment {
	public Payment() {
	}
	
	private void this_setOwner(Object owner, int key) {
		if (key == ORMConstants.KEY_PAYMENT_SECRETARY) {
			this.secretary = (dsm.Secretary) owner;
		}
		
		else if (key == ORMConstants.KEY_PAYMENT_LICENSECAR) {
			this.licenseCar = (dsm.LicenseCar) owner;
		}
	}
	
	org.orm.util.ORMAdapter _ormAdapter = new org.orm.util.AbstractORMAdapter() {
		public void setOwner(Object owner, int key) {
			this_setOwner(owner, key);
		}
		
	};
	
	private int ID;
	
	private dsm.LicenseCar licenseCar;
	
	private dsm.Secretary secretary;
	
	private java.util.Date timestamp;
	
	private void setID(int value) {
		this.ID = value;
	}
	
	public int getID() {
		return ID;
	}
	
	public int getORMID() {
		return getID();
	}
	
	public void setTimestamp(java.util.Date value) {
		this.timestamp = value;
	}
	
	public java.util.Date getTimestamp() {
		return timestamp;
	}
	
	public void setSecretary(dsm.Secretary value) {
		this.secretary = value;
	}
	
	public dsm.Secretary getSecretary() {
		return secretary;
	}
	
	public void setLicenseCar(dsm.LicenseCar value) {
		this.licenseCar = value;
	}
	
	public dsm.LicenseCar getLicenseCar() {
		return licenseCar;
	}
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
