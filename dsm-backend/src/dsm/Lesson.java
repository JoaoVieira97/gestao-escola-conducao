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
	
	private int ID;
	
	private java.util.Date startTime;
	
	private int duration;
	
	private String state;
	
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
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
