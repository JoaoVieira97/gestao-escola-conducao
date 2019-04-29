package Utils;

import redis.clients.jedis.JedisPool;

public class RedisConnection {

    private static JedisPool jedisPool;

    private static final String hostname = "127.0.0.1";
    private static final int port = 6379;

    /**
     * Returns a pool of Jedis connections.
     * @return JedisPool
     */
    static JedisPool getJedisPool() {

        if(jedisPool == null)
            jedisPool = new JedisPool(hostname, port);

        return jedisPool;
    }
}
