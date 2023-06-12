package backend.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.swagger.v3.core.util.Json;

import java.util.Map;

public class JsonHandler {

    public static Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

    public static <T, G> String prettyPrintJson(Map<T, G> valueToPrettyPrint) {
        return gson.toJson(valueToPrettyPrint);
    }
}
