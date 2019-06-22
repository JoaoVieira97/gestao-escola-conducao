package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Stateless;
import java.util.List;
import java.util.stream.Collectors;

@Stateless(name = "UserBean")
public class UserBean implements UserBeanLocal {

    /**
     * User authentication.
     * @param email
     * @param password
     * @return
     */
    @Override
    public String login(PersistentSession session, String email, String password) {

        try {

            User user = UserDAO.loadUserByQuery(session,
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

    /**
     * Get user name by is user id.
     * @param userId
     * @return
     */
    @Override
    public String getName(PersistentSession session, int userId) {

        try {

            User user = UserDAO.getUserByORMID(session, userId);
            if (user != null) return user.getName();

        } catch (PersistentException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Get user email by is user id.
     * @param userId
     * @return
     */
    @Override
    public String getEmail(PersistentSession session, int userId) {

        try {

            User user = UserDAO.getUserByORMID(session, userId);
            if (user != null) return user.getEmail();

        } catch (PersistentException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Get school announcements.
     * @return
     */
    @Override
    public List<Announcement> getAnnouncements(PersistentSession session){

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
