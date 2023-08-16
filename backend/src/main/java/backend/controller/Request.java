package backend.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;


@NoArgsConstructor
public class Request<T> {

    private T entity;
    private String token;

    @JsonCreator
    public Request(@JsonProperty("entity") T entity, @JsonProperty("token") String token) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        this.entity = entity;
        this.token = token;
    }

    public T getEntity() {
        return entity;
    }

    public String getToken() {
        return token;
    }
}
