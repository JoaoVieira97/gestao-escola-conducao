package utils;

import dsm.DSMPersistentManager;
import org.orm.PersistentException;
import org.orm.PersistentSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.MessageDigest;

import java.util.UUID;

public class Utils {

    private final static String API_TOKEN = "qnHuUp4iXL6dmzymkcOa6iGLYAwsnURP";

    /**
     * Request access token validation.
     */
    public static boolean accessTokenValidation(HttpServletRequest request) {

        String accessToken = request.getHeader("Authorization");
        return accessToken.equals(API_TOKEN);
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
     * Generate a random user token.
     * @return random token
     */
    public static String generateRandomToken() {

        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * Get a new session if needed.
     * @param session
     * @return PersistentSession
     */
    public static PersistentSession getSession(PersistentSession session) {
        if (session == null) {
            try {
                session = DSMPersistentManager.instance().getSession();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return session;
    }

    /**
     * Get a new session if needed.
     * @return PersistentSession
     */
    public static PersistentSession getSession() {

        try {
            return DSMPersistentManager.instance().getSession();
        } catch (PersistentException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Get a new session if needed.
     * @param request
     * @return PersistentSession
     */
    public static PersistentSession getSession(HttpServletRequest request) {

        HttpSession httpSession = request.getSession();
        PersistentSession session = null;

        try {
            Object hsession = httpSession.getAttribute("hsession");

            if(hsession!=null) {

                System.out.println("Reusing persistent session");
                session = (PersistentSession) hsession;

            } else {

                System.out.println("Creating new persistent session");
                session = DSMPersistentManager.instance().getSession();
                request.getSession().setAttribute("hsession", session);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return session;
    }
}
