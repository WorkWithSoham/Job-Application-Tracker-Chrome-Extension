package backend.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.Map;

public class JsonHandler {

    public static Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

    public static <T, G> String toJson(Map<T, G> value) {
        return gson.toJson(value);
    }
}
