package beans;

public interface RedisBeanLocal {

    void setUserToken(String email, String token);
    void removeUserToken(String token);
    String getUserEmailByToken(String token);
    boolean isTokenValid(String token);
}
