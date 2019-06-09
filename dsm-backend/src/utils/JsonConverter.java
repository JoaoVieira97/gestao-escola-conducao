package utils;


public class JsonConverter {

    /*
    private static  Gson gsonBuilder() {
        return new GsonBuilder()
                .excludeFieldsWithoutExposeAnnotation()
                .serializeNulls()
                //.setPrettyPrinting()
                .create();
    }

    public static String convertStudentsToString(List<Student> studentList) {

        Gson gson = gsonBuilder();
        JsonObject result = new JsonObject();

        if(studentList != null) {
            result.addProperty("success", true);
            result.add("students", gson.toJsonTree(studentList).getAsJsonArray());
        }
        else {
            result.addProperty("success", false);
        }

        return result.toString();
    }

    public static String convertRegistersToString(List<Register> registerList) {

        Gson gson = gsonBuilder();
        JsonObject result = new JsonObject();

        if(registerList != null) {
            result.addProperty("success", true);
            result.add("studentRegister", gson.toJsonTree(registerList).getAsJsonArray());
        }
        else {
            result.addProperty("success", false);
        }

        return result.toString();
    }

    public static String convertLessonsToString(List<Lesson> lessonsList) {

        Gson gson = gsonBuilder();
        JsonObject result = new JsonObject();

        if(lessonsList != null) {

            result.addProperty("success", true);
            result.add("lessons", gson.toJsonTree(lessonsList).getAsJsonArray());
        }
        else {
            result.addProperty("success", false);
        }

        return result.toString();
    }
     */
}
