package beans;

import dsm.Lesson;
import dsm.PracticalLesson;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Logger;

@Startup
@Singleton(name = "RedisBean")
public class RedisBean implements RedisBeanLocal {


    private static final String hostname = "127.0.0.1";
    private static final int port = 6379;
    private static final String password = "dsm2019EA";
    private static final int ttl = 31556926;

    private static final Logger log = Logger.getLogger(RedisBean.class.getName());

    // Pool of connections to Redis
    private JedisPool jedisPool = new JedisPool(hostname, port);

    /**
     * Set user token with specific time to live.
     * @param token Generated token
     * @param id User id
     */
    @Override
    public void setUserToken(String token, int id) {

        // Opens and close it-self
        try (Jedis jedis = this.jedisPool.getResource()) {

            jedis.setex(token, ttl, String.valueOf(id));
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
     * @return User id
     */
    @Override
    public int getUserIDByToken(String token) {

        // Opens and close it-self
        try (Jedis jedis = this.jedisPool.getResource()) {

            if (jedis.exists(token)) {
                return Integer.parseInt(jedis.get(token));
            }

            return -1;
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

    /**
     * Get the number of users that are viewing lessons.
     * @return
     */
    @Override
    public Map<String, Long> getUsersViewing() {

        // Opens and close it-self
        try (Jedis jedis = this.jedisPool.getResource()) {

            Map<String, Long> views = new HashMap<>();

            Set<String> names = jedis.keys("date*");
            for (String key : names) {

                String value = jedis.get(key);
                if (value != null) {

                    long numberOfUserViewing = Long.parseLong(value);

                    String auxKey = key.replace("date ", "");
                    String auxKey2 = auxKey.substring(1);

                    views.put(auxKey2, numberOfUserViewing);
                }
            }

            return views;
        }
        catch (Exception e) {
            e.printStackTrace();
            return new HashMap<>();
        }
    }

    /**
     * Increment users viewing counter for current day.
     * @param instructorID
     * @param datetime
     * @return
     */
    @Override
    public boolean addUsersViewing(String instructorID, String datetime) {

        // Opens and close it-self
        try (Jedis jedis = this.jedisPool.getResource()) {

            String key = "date " + instructorID + datetime;

            // redis increment (all values are long)
            jedis.incr(key);
            return true;
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Decrement users viewing counter for current day.
     * @param instructorID
     * @param datetime
     * @return
     */
    @Override
    public boolean removeUsersViewing(String instructorID, String datetime) {

        // Opens and close it-self
        try (Jedis jedis = this.jedisPool.getResource()) {

            String key = "date " + instructorID + datetime;

            // redis decrement (all values are long)
            long value = jedis.decr(key);
            if (value == 0) {
                jedis.del(key);
            }
            return true;
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
