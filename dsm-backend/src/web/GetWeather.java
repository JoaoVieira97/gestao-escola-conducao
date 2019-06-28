package web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dsm.DSMFacade;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Scanner;

@WebServlet(name = "GetWeather", urlPatterns = {"/api/weather"})
public class GetWeather extends HttpServlet {


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseNode = mapper.createObjectNode();

        // Get user token and validate it
        String accessToken = Utils.getAuthenticationToken(request);
        if(accessToken != null && DSMFacade.isTokenValid(accessToken)) {

            OkHttpClient client = new OkHttpClient();

            Request req = new Request.Builder()
                    .url("http://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030300.json")
                    .get()
                    .build();
            Response resp = client.newCall(req).execute();

            Scanner sc = new Scanner(resp.body().byteStream());
            String jsonData = null;
            while(sc.hasNextLine()) {
                jsonData = sc.nextLine();
            }

            if(jsonData != null) {
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write(jsonData);

                return;
            }

            responseNode.put("success", false);
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else {
            responseNode.put("error", Utils.INVALID_USER_TOKEN);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }


        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(
                mapper.writerWithDefaultPrettyPrinter().writeValueAsString(responseNode)
        );
    }
}
