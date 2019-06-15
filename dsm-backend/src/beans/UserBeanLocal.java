package beans;

import dsm.Announcement;

import javax.ejb.Local;
import java.util.List;

@Local
public interface UserBeanLocal {

    String login(String email, String password);

    String getName();
    String getEmail();
    String getPassword();
    List<Announcement> getAnnouncements();

}
