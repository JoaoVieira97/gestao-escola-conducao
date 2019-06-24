package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Stateless;
import java.sql.Timestamp;
import java.util.logging.Logger;

@Stateless(name = "SecretaryBean")
public class SecretaryBean implements SecretaryBeanLocal{

    private final static Logger log = Logger.getLogger(LessonBean.class.getName());

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
     * Register general announcement
     * @param title
     * @param description
     * @return
     */
    @Override
    public boolean registerGeneralAnnouncement(String title, String description){

        try {

            session = getSession();

            Announcement a = new Announcement();

            a.setTitle(title);
            a.setDescription(description);
            a.setTimestamp(new Timestamp(System.currentTimeMillis()));

            AnnouncementDAO.save(a);
            return true;

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return false;
    }

}
