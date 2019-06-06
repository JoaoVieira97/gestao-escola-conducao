package utils;

import redis.clients.jedis.Jedis;

public class RedisUtil {

    /**
     * Set user token with specific time to live.
     * @param email User email
     * @param token Generated token
     * @param ttl The time to live of the key in seconds
     */
    public static void setUserToken(String email, String token, int ttl) {

        // Opens and close it-self
        try (Jedis jedis = RedisConnection.getJedisPool().getResource()) {
            jedis.setex(email, ttl, token);
        }
    }

    /**
     * Remove user token.
     * @param email User email
     */
    public static void removeUserToken(String email) {

        // Opens and close it-self
        try (Jedis jedis = RedisConnection.getJedisPool().getResource()) {

            if (jedis.exists(email))
                jedis.del(email);
        }
    }

    /**
     * Get user token.
     * @param email User email
     * @return The user token
     */
    public static String getUserToken(String email) {

        // Opens and close it-self
        try (Jedis jedis = RedisConnection.getJedisPool().getResource()) {
            return jedis.get(email);
        }
    }
}
