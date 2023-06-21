package backend.controller;

import backend.dao.ApplicationDAO;
import backend.entity.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(originPatterns = {"*"})
@RestController
public class ApplicationController {

    public static final Logger log = LoggerFactory.getLogger(ApplicationController.class);

    @Autowired
    private ApplicationDAO applicationDAO;

    @GetMapping(value = "/applications")
    public String getApplications() {
        log.info("Request received for application list");
        List<Application> applicationList = applicationDAO.findAll();
        return JsonHandler.toJson(applicationList);
    }

    @PostMapping(value = "/applications/add")
    public String addApplication(@RequestBody Map<String, Object> applicationJson) {
        log.info("\nReceived a request to create application: \n{}", JsonHandler.toJson(applicationJson));
        try {
            Application application = new Application(applicationJson);
            applicationDAO.save(application);
        } catch (Exception e) {
            log.error("Exception occurred while saving the new application: {}", e.toString());
        }
        return "Application saved successfully";
    }

    @PostMapping(value = "/applications/delete")
    public String deleteApplication(@RequestBody Map<String, Object> requestJson) {
        Integer app_id = Integer.parseInt(requestJson.get("app_id").toString());
        log.info("Received a request to delete application with ID: {}", app_id);
        try {
            applicationDAO.findById(app_id);
        } catch (Exception e) {
            log.info("Application with ID : {} not found", app_id);
            return "Application not found";
        }
        applicationDAO.deleteById(app_id);
        return "Application successfully deleted";
    }

}
