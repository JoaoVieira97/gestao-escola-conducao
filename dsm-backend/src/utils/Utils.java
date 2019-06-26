package utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.MessageDigest;

import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

public class Utils {

    public final static String INVALID_API_TOKEN = "Invalid API token";
    public final static String INVALID_USER_TOKEN = "Invalid USER token";
    public final static String ERROR_FETCHING_DATA = "Cannot fetch data";


    private final static String API_TOKEN = "qnHuUp4iXL6dmzymkcOa6iGLYAwsnURP";
    private final static Logger log = Logger.getLogger(Utils.class.getName());

    /**
     * Generate a random user token.
     * @return random token
     */
    public static String generateRandomToken() {

        String token = UUID.randomUUID().toString().replace("-", "");
        log.warning("DSM - GENERATED a new TOKEN: " + token);

        return token;
    }

    /**
     * Request access token validation.
     */
    public static boolean accessTokenValidation(HttpServletRequest request) {

        String accessToken = request.getHeader("Authorization");
        log.warning("DSM - AUTHENTICATION with API TOKEN: " + accessToken);

        if (accessToken != null) {
            return accessToken.equals(API_TOKEN);
        }

        return false;
    }

    /**
     * Get request access token.
     */
    public static String getAuthenticationToken(HttpServletRequest request) {

        String accessToken = request.getHeader("Authorization");
        log.warning("DSM - REQUEST with USER TOKEN: " + accessToken);

        return accessToken;
    }

    /**
     * Hash the given password.
     */
    public static String hash(String original) {

        String res = original;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(original.getBytes("UTF-8")); // Change this to "UTF-16" if needed
            byte[] digest = md.digest();
            res = String.format("%064x", new java.math.BigInteger(1, digest));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return res;
    }


    /**
     * Read POST data from request.
     */
    public static Map<String, Object> getPostData(ObjectMapper mapper, HttpServletRequest request) throws IOException {

        String data;
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = request.getReader().readLine()) != null) {
            sb.append(line);
        }
        data = sb.toString();

        return mapper.readValue(data, Map.class);
    }
}
