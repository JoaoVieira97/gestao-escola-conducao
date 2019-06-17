/**
 * "Visual Paradigm: DO NOT MODIFY THIS FILE!"
 * 
 * This is an automatic generated file. It will be regenerated every time 
 * you generate persistence class.
 * 
 * Modifying its content may cause the program not work, or your work may lost.
 */

/**
 * Licensee: João Vieira(Universidade do Minho)
 * License Type: Academic
 */
package dsm;

public class Register {
	public Register() {
	}
	
	private java.util.Set this_getSet (int key) {
		if (key == ORMConstants.KEY_REGISTER_PAYMENTS) {
			return ORM_payments;
		}
		
		return null;
	}
	
	private void this_setOwner(Object owner, int key) {
		if (key == ORMConstants.KEY_REGISTER_CATEGORY) {
			this.category = (dsm.Category) owner;
		}
		
		else if (key == ORMConstants.KEY_REGISTER_INSTRUCTOR) {
			this.instructor = (dsm.Instructor) owner;
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
	
	private int ID;
	
	private dsm.Instructor instructor;
	
	private dsm.Category category;
	
	private java.util.Date initialDate;
	
	private java.util.Set ORM_payments = new java.util.HashSet();
	
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
	
	public void setCategory(dsm.Category value) {
		this.category = value;
	}
	
	public dsm.Category getCategory() {
		return category;
	}
	
	private void setORM_Payments(java.util.Set value) {
		this.ORM_payments = value;
	}
	
	private java.util.Set getORM_Payments() {
		return ORM_payments;
	}
	
	public final dsm.PaymentSetCollection payments = new dsm.PaymentSetCollection(this, _ormAdapter, ORMConstants.KEY_REGISTER_PAYMENTS, ORMConstants.KEY_MUL_ONE_TO_MANY);
	
	public void setInstructor(dsm.Instructor value) {
		this.instructor = value;
	}
	
	public dsm.Instructor getInstructor() {
		return instructor;
	}
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
