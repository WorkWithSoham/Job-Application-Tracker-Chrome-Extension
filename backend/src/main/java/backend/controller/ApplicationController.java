package backend.controller;

import backend.dao.ApplicationDAO;
import backend.entity.Application;
import backend.properties.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(
        origins = {"http://localhost:3000"},
        exposedHeaders = {"authorization", "content-type"},
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.DELETE,
                RequestMethod.PUT,
                RequestMethod.PATCH,
                RequestMethod.OPTIONS
        })
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    public static final Logger log = LoggerFactory.getLogger(ApplicationController.class);

    @Autowired
    private ApplicationDAO applicationDAO;

    @GetMapping(value = "/")
    public ResponseEntity<Object> getApplications() {
        log.info("Request received for application list");
        List<Application> applicationList = applicationDAO.findAll();

        return new Response("msg", "Application list retrieved from DB", HttpStatus.OK, applicationList).send();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getApplications(@PathVariable String id) {
        Application application;

        Integer app_id = Integer.parseInt(id);
        log.info("Request received for application with Id: {}", app_id);
        try {
            application = applicationDAO.findById(app_id).orElseThrow();
        } catch (Exception e) {
            return new Response("msg", e.getMessage(), HttpStatus.NOT_FOUND).send();
        }

        return new Response("msg", "Application details retrieved from DB", HttpStatus.OK, application).send();
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Object> deleteApplication(@PathVariable String id) {
        Integer app_id = Integer.parseInt(id);
        log.info("Received a request to delete application with ID: {}", id);
        try {
            applicationDAO.findById(app_id);
        } catch (Exception e) {
            log.info("Application with ID : {} not found", app_id);
            return new Response("msg", e.getMessage(), HttpStatus.NOT_FOUND).send();
        }
        applicationDAO.deleteById(app_id);

        return new Response("msg", "Application successfully deleted", HttpStatus.OK).send();
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Object> addApplication(@RequestBody Map<String, Object> applicationJson) {
        try {
            Application application = new Application(applicationJson);
            log.info("\nReceived a request to create application: \n{}", application.json());
//            applicationDAO.save(application);
        } catch (Exception e) {
            log.error("Exception occurred while saving the new application: {}", e.toString());
            return new Response("msg", e.getMessage(), HttpStatus.BAD_REQUEST).send();
        }

        return new Response("msg", "Application successfully saved", HttpStatus.OK).send();
    }

}
