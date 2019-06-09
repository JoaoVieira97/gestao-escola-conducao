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
	
	private int ID;
	
	private dsm.Secretary secretary;
	
	private double value;
	
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
	
	public void setValue(double value) {
		this.value = value;
	}
	
	public double getValue() {
		return value;
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
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
