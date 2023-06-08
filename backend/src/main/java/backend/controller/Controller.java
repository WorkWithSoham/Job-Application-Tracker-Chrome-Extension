package backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
public class Controller {

    public static final Logger log = LoggerFactory.getLogger(Controller.class);

    @PostMapping(value = "/api", consumes = {})
    public Map<String, Object> getString(@RequestBody Map<String, Object> payload) {

        return payload;
    }
}
