package backend.controller;

import backend.dao.ApplicationDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(originPatterns = {"*"})
@RestController
public class Controller {

    public static final Logger log = LoggerFactory.getLogger(Controller.class);

    @Autowired
    private ApplicationDAO applicationDAO;

    @PostMapping(value = "/applications/add", consumes = {})
    public Map<String, Object> getString(@RequestBody Map<String, Object> payload) {
        log.info("\nReceived a request to add application to list: \n{}", JsonHandler.prettyPrintJson(payload));

        return payload;
    }
}
