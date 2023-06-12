package backend.controller;

import backend.dao.ApplicationDAO;
import backend.entity.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(originPatterns = {"*"})
@RestController
public class ApplicationController {

    public static final Logger log = LoggerFactory.getLogger(ApplicationController.class);

    @Autowired
    private ApplicationDAO applicationDAO;

    @PostMapping(value = "/applications/add")
    public Map<String, Object> addApplication(@RequestBody Map<String, Object> applicationJson) {
        log.info("\nReceived a request to add application to list: \n{}", JsonHandler.toJson(applicationJson));

//        try {
        Application application = new Application(applicationJson);
        System.out.println(application);
        applicationDAO.save(application);
//        } catch (Exception e) {
//            log.error("Exception occurred while saving the new application: {}", e.toString());
//        }

        return applicationJson;
    }
}
