package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;
import utils.Utils;

import javax.ejb.Stateless;
import java.util.List;
import java.util.stream.Collectors;

@Stateless(name = "UserBean")
public class UserBean implements UserBeanLocal {

    private final static PersistentSession session = Utils.getSession();

    @Override
    public String login(String email, String password) {

        try {
            User user = UserDAO.loadUserByQuery(
                    session,
                "email='"+email+"' AND password='"+password+"'",
                "ID"
            );

            if (user != null)
                return user.getRole();

        } catch (PersistentException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public String getName() {
        return null;
    }

    @Override
    public String getEmail() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public List<Announcement> getAnnouncements(){

        try {
            List<Announcement> all_announcements = (List<Announcement>) AnnouncementDAO.queryAnnouncement(session, "id>0", "timestamp desc");
            List<Announcement> general_announcements =
                    all_announcements.stream()
                                     .filter(a -> !(a instanceof PersonalAnnouncement))
                                     .collect(Collectors.toList());

            return general_announcements;
        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

}
