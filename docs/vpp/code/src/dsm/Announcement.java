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

public class Announcement {
	public Announcement() {
	}
	
	private int ID;
	
	private String title;
	
	private String description;
	
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
	
	public void setTitle(String value) {
		this.title = value;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setDescription(String value) {
		this.description = value;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setTimestamp(java.util.Date value) {
		this.timestamp = value;
	}
	
	public java.util.Date getTimestamp() {
		return timestamp;
	}
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
