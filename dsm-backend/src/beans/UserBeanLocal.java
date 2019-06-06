package beans;

import javax.ejb.Local;

@Local
public interface UserBeanLocal {

    boolean login(String email, String password);

    String getName();
    String getEmail();
    String getPassword();
}
