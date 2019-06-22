package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Stateless;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Stateless(name = "UserBean")
public class UserBean implements UserBeanLocal {

    private final static Logger log = Logger.getLogger(UserBean.class.getName());

    private static PersistentSession session = null;

    private PersistentSession getSession() {
        if (session == null) {
            try {
                log.info("Creating new persistent session!");
                session = DSMPersistentManager.instance().getSession();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        else
            log.info("Reusing persistent session!");

        return session;
    }

    /**
     * User authentication.
     * @param email
     * @param password
     * @return
     */
    @Override
    public String login(String email, String password) {

        try {

            session = getSession();

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
    public String getName(int userId) {

        try {

            session = getSession();

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
    public String getEmail(int userId) {

        try {

            session = getSession();

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
    public List<Announcement> getAnnouncements(){

        try {

            session = getSession();

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
