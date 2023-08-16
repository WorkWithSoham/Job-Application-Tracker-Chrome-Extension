package backend.controller;

import backend.dao.ApplicationDAO;
import backend.entity.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

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
        Response response = new Response();
        log.info("Request received for application list");
        List<Application> applicationList = applicationDAO.findAll();
        response.setEntity(applicationList);
        response.setStatus(HttpStatus.OK);
        response.setSuccess("Application list sent");

        return response.send();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getApplications(@PathVariable String id) {
        Response response = new Response();
        Application application;

        Integer app_id = Integer.parseInt(id);
        log.info("Request received for application with Id: {}", app_id);
        try {
            application = applicationDAO.findById(app_id).orElseThrow();
        } catch (Exception e) {
            response.setError(e.getMessage());
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response.send();
        }

        response.setEntity(application);
        response.setStatus(HttpStatus.OK);
        response.setSuccess("Application list sent");

        return response.send();
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Object> deleteApplication(@PathVariable String id) {
        Response response = new Response();
        Integer app_id = Integer.parseInt(id);
        log.info("Received a request to delete application with ID: {}", id);
        try {
            applicationDAO.findById(app_id);
        } catch (Exception e) {
            log.info("Application with ID : {} not found", app_id);
            response.setError(e.getMessage());
            response.setStatus(HttpStatus.NOT_FOUND);
            return response.send();
        }
        applicationDAO.deleteById(app_id);

        response.setStatus(HttpStatus.OK);
        response.setSuccess("Application list sent");

        return response.send();
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Object> addApplication(@RequestBody Request<Application> applicationJson) {
        Response response = new Response();
        try {
            Application application = applicationJson.getEntity();
            application = applicationDAO.save(application);
            log.info("\nReceived a request to create application: \n{}", application.json());
        } catch (Exception e) {
            log.error("Exception occurred while saving the new application: {}", e.toString());
            response.setError(e.getMessage());
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response.send();
        }

        response.setStatus(HttpStatus.OK);
        response.setSuccess("Application list sent");

        return response.send();
    }

}
