package backend.controller;

import backend.authentication.PasswordAuth;
import backend.dao.UserDAO;
import backend.entity.User;
import backend.utils.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    public static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDAO userDAO;

    @PostMapping(value = "/create")
    // userJson = {email: String, password: String, username: String, full_name: String}
    public ResponseEntity<Object> createUsers(@RequestBody Request<User> userJson) {
        Response response = new Response();
        try {
            User user = userJson.getEntity();
            String hashedPass = PasswordAuth.hashPassword(user.getPassword());
            user.setPassword(hashedPass);
            log.info("New user signed up with name: {}", user);
            userDAO.save(user);
            String token = jwtUtil.generateToken(user.getEmail());

            response.setSuccess("User successfully created");
            response.setEntity(user);
            response.setStatus(HttpStatus.CREATED);
            response.setToken(token);

            return response.send();

        } catch (Exception e) {
            log.error("Exception occurred while creating an user: {}", e.getMessage());
            return new Response("msg", e.getMessage(), HttpStatus.BAD_REQUEST).send();
        }
    }

    @PostMapping(value = "/login")
    // userDetails = {email: String, password: String, token?: String}
    public ResponseEntity<Object> loginUser(@RequestBody Request<User> userJson) throws JsonProcessingException {
        Response response = new Response();
        try {
            User user = userDAO.findByEmail(userJson.getEntity().getEmail());
            System.out.println(PasswordAuth.checkPassword(userJson.getEntity().getPassword(), user.getPassword()));
            if (PasswordAuth.checkPassword(userJson.getEntity().getPassword(), user.getPassword())) {
                response.setSuccess("User successfully signed in!");

                String token = userJson.getToken();
                System.out.println("Token: " + token);
                if (token.isEmpty() || jwtUtil.isTokenExpired(token)) {
                    token = jwtUtil.generateToken(user.getEmail());
                    response.setToken(token);
                }
                return response.send();
            }
        } catch (Exception e) {
            log.error("User details do not match");
        }
        return new Response("msg", "User details do not match", HttpStatus.CONFLICT).send();
    }
}
