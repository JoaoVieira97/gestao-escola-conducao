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

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"ormid"})
public class Exam {
	public Exam() {
	}
	
	private int ID;

	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy HH:mm")
	private java.sql.Timestamp startTime;
	
	private String description;
	
	private void setID(int value) {
		this.ID = value;
	}
	
	public int getID() {
		return ID;
	}
	
	public int getORMID() {
		return getID();
	}
	
	public void setStartTime(java.sql.Timestamp value) {
		this.startTime = value;
	}
	
	public java.sql.Timestamp getStartTime() {
		return startTime;
	}
	
	public void setDescription(String value) {
		this.description = value;
	}
	
	public String getDescription() {
		return description;
	}
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
