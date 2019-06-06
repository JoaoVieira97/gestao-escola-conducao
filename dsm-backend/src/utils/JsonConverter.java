package utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import dsm.Lesson;
import dsm.Student;

import java.util.List;

public class JsonConverter {

    public static String convertStudentsToString(List<Student> studentList) {

        Gson gson = new GsonBuilder().create();
        JsonArray jArray = gson.toJsonTree(studentList).getAsJsonArray();

        JsonObject jsonObject = new JsonObject();
        jsonObject.add("students", jArray);

        return jsonObject.toString();
    }

    public static String convertLessonsToString(List<Lesson> studentList) {

        Gson gson = new GsonBuilder().create();
        JsonArray jArray = gson.toJsonTree(studentList).getAsJsonArray();

        JsonObject jsonObject = new JsonObject();
        jsonObject.add("lessons", jArray);

        return jsonObject.toString();
    }
}
