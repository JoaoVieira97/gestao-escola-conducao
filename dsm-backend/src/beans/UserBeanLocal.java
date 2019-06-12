package beans;

import javax.ejb.Local;

@Local
public interface UserBeanLocal {

    String login(String email, String password);

    String getName();
    String getEmail();
    String getPassword();

}
