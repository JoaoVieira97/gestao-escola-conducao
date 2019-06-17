/**
 * Licensee: João Vieira(Universidade do Minho)
 * License Type: Academic
 */
package ormsamples;

import org.orm.*;
public class DropDSMDatabaseSchema {
	public static void main(String[] args) {
		try {
			System.out.println("Are you sure to drop table(s)? (Y/N)");
			java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));
			if (reader.readLine().trim().toUpperCase().equals("Y")) {
				ORMDatabaseInitiator.dropSchema(dsm.DSMPersistentManager.instance());
				dsm.DSMPersistentManager.instance().disposePersistentManager();
			}
			
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}
