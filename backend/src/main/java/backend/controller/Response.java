package backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Response implements Serializable {

    private final Map<String, Object> responseMap = new HashMap<>();
    private HttpStatus status;

    public Response() {
        this.status = HttpStatus.OK;
    }

    public <T> Response(String key, String message, HttpStatus status, T data) {
        this.status = status;
        this.responseMap.put("data", data);
        this.responseMap.put(key, message);
    }

    public <T> Response(String key, String message, HttpStatus status) {
        this.status = status;
        this.responseMap.put(key, message);
    }

    public void setSuccess(String message) {
        this.responseMap.put("message", message);
    }

    public void setError(String error) {
        this.responseMap.put("message", error);
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public <T> void setData(T data) {
        this.responseMap.put("data", data);
    }

    public ResponseEntity<Object> send() {
        return new ResponseEntity<>(responseMap, status);
    }
}
