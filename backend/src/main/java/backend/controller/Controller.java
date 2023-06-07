package backend.controller;

import org.springframework.web.bind.annotation.*;


@RestController
public class Controller {

    @PostMapping("/api")
    public String getString(@RequestBody String string) {
        System.out.println(string);
        return "Hello World! " + string;
    }

}
