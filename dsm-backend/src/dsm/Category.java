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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"ormid"})
public class Category {
	public Category() {
	}
	
	private int ID;
	
	private String name;
	
	private int practicalLessons;
	
	private int theoreticalLessons;
	
	private float price;
	
	private void setID(int value) {
		this.ID = value;
	}
	
	public int getID() {
		return ID;
	}
	
	public int getORMID() {
		return getID();
	}
	
	public void setName(String value) {
		this.name = value;
	}
	
	public String getName() {
		return name;
	}
	
	public void setPracticalLessons(int value) {
		this.practicalLessons = value;
	}
	
	public int getPracticalLessons() {
		return practicalLessons;
	}
	
	public void setTheoreticalLessons(int value) {
		this.theoreticalLessons = value;
	}
	
	public int getTheoreticalLessons() {
		return theoreticalLessons;
	}
	
	public void setPrice(float value) {
		this.price = value;
	}
	
	public float getPrice() {
		return price;
	}
	
	public String toString() {
		return String.valueOf(getID());
	}
	
}
