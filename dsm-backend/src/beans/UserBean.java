package beans;

import dsm.*;
import org.orm.PersistentException;

import javax.ejb.Stateless;

@Stateless(name = "UserBean")
public class UserBean implements UserBeanLocal {

    @Override
    public String login(String email, String password) {

        try {
            User user = UserDAO.loadUserByQuery(
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

    /*
    @Override
    public String getUserType(String email) {

        String type = "student";

        try {
            Student student = StudentDAO.loadStudentByQuery(
                "email='"+email+"'",
                "ID"
            );

            if(student==null) {
                Secretary secretary = SecretaryDAO.loadSecretaryByQuery(
                        "email='"+email+"'",
                        "ID"
                );

                if(secretary==null) {
                     Instructor instructor = InstructorDAO.loadInstructorByQuery(
                            "email='"+email+"'",
                            "ID"
                    );
                }
            }


        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return type;
    }
     */
}
