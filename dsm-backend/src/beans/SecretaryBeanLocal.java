package beans;

import javax.ejb.Local;

@Local
public interface SecretaryBeanLocal {

    boolean registerGeneralAnnouncement(String title, String description);
    boolean registerStudent(String name, String email, String password, String address, String birth, String nif, String cc);
}
