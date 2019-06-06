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
	
	private int maxTimeToCancel;
	
	private int startTime;
	
	private int endTime;
	
	private void setID(int value) {
		this.ID = value;
	}
	
	public int getID() {
		return ID;
	}
	
	public int getORMID() {
		return getID();
	}
	
	public void setMaxTimeToCancel(int value) {
		this.maxTimeToCancel = value;
	}
	
	public int getMaxTimeToCancel() {
		return maxTimeToCancel;
	}
	
	public void setStartTime(int value) {
		this.startTime = value;
	}
	
	public int getStartTime() {
		return startTime;
	}
	
	public void setEndTime(int value) {
		this.endTime = value;
	}
	
	public int getEndTime() {
		return endTime;
	}
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
