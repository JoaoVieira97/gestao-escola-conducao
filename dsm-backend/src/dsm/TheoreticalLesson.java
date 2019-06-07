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

public class TheoreticalLesson extends dsm.Lesson {
	public TheoreticalLesson() {
	}
	
	private java.util.Set this_getSet (int key) {
		if (key == ORMConstants.KEY_THEORETICALLESSON_THEMES) {
			return ORM_themes;
		}
		
		return null;
	}
	
	org.orm.util.ORMAdapter _ormAdapter = new org.orm.util.AbstractORMAdapter() {
		public java.util.Set getSet(int key) {
			return this_getSet(key);
		}
		
	};
	
	private java.util.Set ORM_themes = new java.util.HashSet();
	
	private void setORM_Themes(java.util.Set value) {
		this.ORM_themes = value;
	}
	
	private java.util.Set getORM_Themes() {
		return ORM_themes;
	}
	
	public final dsm.ThemeSetCollection themes = new dsm.ThemeSetCollection(this, _ormAdapter, ORMConstants.KEY_THEORETICALLESSON_THEMES, ORMConstants.KEY_MUL_MANY_TO_MANY);
	
	public String toString() {
		return super.toString();
	}
	
}
