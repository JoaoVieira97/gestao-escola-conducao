package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Local;
import javax.ejb.Stateless;
import java.util.Comparator;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Local(UserBeanLocal.class)
@Stateless(name = "UserBean")
public class UserBean implements UserBeanLocal {

    /**
     * ORM Persistent Session
     */
    private PersistentSession session;

    /**
     * Logger for System Output
     */
    private final static Logger log = Logger.getLogger(UserBean.class.getName());

    /**
     * Get persistent session if needed
     * @return PersistentSession
     */
    private PersistentSession getSession() {
        if (this.session == null) {
            try {
                log.info("Creating new persistent session!");
                this.session = DSMPersistentManager.instance().getSession();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        else
            log.info("Reusing persistent session!");

        return this.session;
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

            PersistentSession session = this.getSession();

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

            PersistentSession session = this.getSession();

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

            PersistentSession session = this.getSession();

            User user = UserDAO.getUserByORMID(session, userId);
            if (user != null) return user.getEmail();

        } catch (PersistentException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Get school information (maxTimeToCancel, ...) by his school id.
     * @param schoolId
     * @return
     */
    @Override
    public SchoolInfo getSchoolInformation(int schoolId) {

        try {

            PersistentSession session = this.getSession();

            SchoolInfo schoolInfo = SchoolInfoDAO.getSchoolInfoByORMID(session, schoolId);
            if (schoolInfo != null) return schoolInfo;

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

            PersistentSession session = this.getSession();

            List<Announcement> all_announcements = (List<Announcement>) AnnouncementDAO.queryAnnouncement(session, "id>0", "timestamp desc");
            List<Announcement> general_announcements =
                    all_announcements.stream()
                                     .filter(a -> !(a instanceof PersonalAnnouncement))
                                     .sorted(Comparator.comparing(Announcement::getTimestamp).reversed())
                                     .collect(Collectors.toList());

            return general_announcements;
        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Get most recent school announcements.
     * @return
     */
    @Override
    public List<Announcement> getRecentAnnouncements(){

        try {

            PersistentSession session = this.getSession();

            List<Announcement> all_announcements = (List<Announcement>) AnnouncementDAO.queryAnnouncement(session, "id>0", "timestamp desc");
            List<Announcement> recent_general_announcements =
                    all_announcements.stream()
                            .filter(a -> !(a instanceof PersonalAnnouncement))
                            .limit(5)
                            .sorted(Comparator.comparing(Announcement::getTimestamp).reversed())
                            .collect(Collectors.toList());

            return recent_general_announcements;
        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }
}
