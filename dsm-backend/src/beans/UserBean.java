package beans;

import javax.ejb.Stateless;

@Stateless(name = "UserBean")
public class UserBean implements UserBeanLocal {


    @Override
    public boolean login(String email, String password) {
        return false;
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
}
