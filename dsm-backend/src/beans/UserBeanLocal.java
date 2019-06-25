package beans;

import dsm.Announcement;
import dsm.SchoolInfo;
import org.orm.PersistentSession;

import javax.ejb.Local;
import java.util.List;

@Local
public interface UserBeanLocal {

    String login(String email, String password);
    String getName(int userId);
    String getEmail(int userId);

    SchoolInfo getSchoolInformation(int schoolId);

    List<Announcement> getAnnouncements();
    List<Announcement> getRecentAnnouncements();

}
