package beans;

import dsm.Announcement;
import org.orm.PersistentSession;

import javax.ejb.Local;
import java.util.List;

@Local
public interface UserBeanLocal {

    String login(PersistentSession session, String email, String password);
    String getName(PersistentSession session, int userId);
    String getEmail(PersistentSession session, int userId);
    List<Announcement> getAnnouncements(PersistentSession session);

}
