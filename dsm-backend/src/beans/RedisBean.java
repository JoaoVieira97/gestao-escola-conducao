package beans;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import java.util.logging.Logger;

@Startup
@Singleton(name = "RedisBean")
public class RedisBean implements RedisBeanLocal {

    private static final String hostname = "127.0.0.1";
    private static final int port = 6379;
    private static final int ttl = 31556926;

    private static final Logger log = Logger.getLogger(RedisBean.class.getName());

    // Pool of connections to Redis
    private JedisPool jedisPool = new JedisPool(hostname, port);


    /**
     * Set user token with specific time to live.
     * @param token Generated token
     * @param email User email
     */
    @Override
    public void setUserToken(String token, String email) {

        // Opens and close it-self
        try (Jedis jedis = this.jedisPool.getResource()) {
            jedis.setex(token, ttl, email);
            log.info("Set " + token + " to " + email);
        }
    }

    /**
     * Remove user token.
     * @param token Generated token
     */
    @Override
    public void removeUserToken(String token) {

        // Opens and close it-self
        try (Jedis jedis = this.jedisPool.getResource()) {
            jedis.del(token);
            log.info("Remove token " + token);
        }
    }

    /**
     * Get the user email by a given token.
     * @param token User token
     * @return User email
     */
    @Override
    public String getUserEmailByToken(String token) {

        // Opens and close it-self
        try (Jedis jedis = this.jedisPool.getResource()) {
            if (jedis.exists(token)) {
                return jedis.get(token);
            }
            return null;
        }
    }

    /**
     * Check if token is valid.
     * @param token User token
     * @return
     */
    @Override
    public boolean isTokenValid(String token) {

        // Opens and close it-self
        try (Jedis jedis = this.jedisPool.getResource()) {
            return jedis.exists(token);
        }
    }
}
