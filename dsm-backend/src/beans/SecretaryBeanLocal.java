package beans;

import javax.ejb.Local;

@Local
public interface SecretaryBeanLocal {

    boolean registerGeneralAnnouncement(String title, String description);
}
