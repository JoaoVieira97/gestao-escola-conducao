package beans;

import dsm.*;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.ejb.Local;
import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

@Local(InstructorBeanLocal.class)
@Stateless(name = "InstructorBean")
public class InstructorBean implements InstructorBeanLocal{

    /**
     * ORM Persistent Session
     */
    private static PersistentSession session;

    /**
     * Logger for System Output
     */
    private final static Logger log = Logger.getLogger(InstructorBean.class.getName());

    /**
     * Get persistent session if needed
     * @return PersistentSession
     */
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
     * Get user lessons.
     * @param instructorID
     * @return
     */
    @Override
    public List<WorkingDay> getWorkingDays(int instructorID) {

        try {

            Instructor instructor = InstructorDAO.getInstructorByORMID(instructorID);
            if(instructor != null)
                return Arrays.asList(instructor.workingDays.toArray());

        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }
}