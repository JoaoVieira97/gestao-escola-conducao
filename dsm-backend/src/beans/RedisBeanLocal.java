package beans;

public interface RedisBeanLocal {

    void setUserToken(String token, int id);
    void removeUserToken(String token);
    int  getUserIDByToken(String token);
    boolean isTokenValid(String token);
}
