package beans;

import java.util.Map;

public interface RedisBeanLocal {

    void setUserToken(String token, int id);
    void removeUserToken(String token);
    int  getUserIDByToken(String token);
    boolean isTokenValid(String token);

    Map<String, Long> getUsersViewing();
    boolean addUsersViewing(String instructorID, String datetime);
    boolean removeUsersViewing(String instructorID, String datetime);
}
