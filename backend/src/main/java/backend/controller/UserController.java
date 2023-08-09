package backend.controller;

import backend.authentication.PasswordAuth;
import backend.dao.UserDAO;
import backend.entity.Application;
import backend.entity.User;
import backend.utils.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(
        originPatterns = {"*"},
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.DELETE,
                RequestMethod.PUT,
                RequestMethod.PATCH
        })
@RestController
@RequestMapping("/api/users")
public class UserController {

    public static final Logger log = LoggerFactory.getLogger(ApplicationController.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDAO userDAO;

    @PostMapping(value = "/create")
    // userJson = {email: String, password: String, username: String, full_name: String}
    public ResponseEntity<Object> createUsers(@RequestBody Map<String, Object> userJson) {
        try {
            User user = new User(userJson);
            String hashedPass = PasswordAuth.hashPassword(user.getPassword());
            user.setPassword(hashedPass);
            log.info("New user signed up with name: {}", user);
//            userDAO.save(user);
            String token = jwtUtil.generateToken(user.getEmail());
            Map<String, Object> data = new HashMap<>();
            data.put("user", user.getAsMap());
            data.put("token", token);

            Response response = new Response();
            response.setSuccess("User successfully created");
            response.setData(data);
            response.setStatus(HttpStatus.CREATED);

            return response.send();

        } catch (Exception e) {
            log.error("Exception occurred while creating an user: {}", e.getMessage());
            return new Response("msg", e.getMessage(), HttpStatus.BAD_REQUEST).send();
        }
    }

    @PostMapping(value = "/login")
    // userDetails = {email: String, password: String, token?: String}
    public ResponseEntity<Object> loginUser(@RequestBody Map<String, Object> userDetails) {
        Response response = new Response();
        User user = userDAO.findByEmail(userDetails.get("email").toString());
        if (PasswordAuth.checkPassword(userDetails.get("password").toString(), user.getPassword())) {
            response.setSuccess("User successfully signed in!");

            String token = userDetails.getOrDefault("token", "").toString();

            if (token.isEmpty() || jwtUtil.isTokenExpired(token)) {
                Map<String, String> tokenMap = new HashMap<>();
                token = jwtUtil.generateToken(user.getEmail());
                tokenMap.put("token", token);
                response.setData(tokenMap);
            }

            return response.send();
        }

        log.error("User details do not match");
        return new Response("msg", "User details do not match", HttpStatus.CONFLICT).send();
    }

}
