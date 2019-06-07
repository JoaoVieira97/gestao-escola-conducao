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

public class SchoolInfo {
	public SchoolInfo() {
	}
	
	private int ID;
	
	private java.sql.Time maxTimeToCancel;
	
	private java.sql.Time startTime;
	
	private java.sql.Time endTime;
	
	private void setID(int value) {
		this.ID = value;
	}
	
	public int getID() {
		return ID;
	}
	
	public int getORMID() {
		return getID();
	}
	
	public void setMaxTimeToCancel(java.sql.Time value) {
		this.maxTimeToCancel = value;
	}
	
	public java.sql.Time getMaxTimeToCancel() {
		return maxTimeToCancel;
	}
	
	public void setStartTime(java.sql.Time value) {
		this.startTime = value;
	}
	
	public java.sql.Time getStartTime() {
		return startTime;
	}
	
	public void setEndTime(java.sql.Time value) {
		this.endTime = value;
	}
	
	public java.sql.Time getEndTime() {
		return endTime;
	}
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
