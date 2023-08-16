package backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Response implements Serializable {

    private final Map<String, Object> responseMap = new HashMap<>();
    private final Map<String, Object> data = new HashMap<>();
    private final Map<String, Object> error = new HashMap<>();
    private HttpStatus status;

    public Response() {
        this.status = HttpStatus.OK;
    }

    public <T> Response(String key, String message, HttpStatus status) {
        this.status = status;
        this.responseMap.put(key, message);
    }

    public void setSuccess(String message) {
        this.data.put("msg", message);
        this.responseMap.put("data", data);
    }

    public <T> void setEntity(T data) {
        this.data.put("entity", data);
        this.responseMap.put("data", data);
    }

    public void setToken(String token) {
        this.data.put("token", token);
        this.responseMap.put("data", data);
    }

    public void setError(String error) {
        this.responseMap.put("message", error);
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public ResponseEntity<Object> send() {
        return new ResponseEntity<>(responseMap, status);
    }
}
