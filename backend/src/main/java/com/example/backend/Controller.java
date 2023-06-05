package com.example.backend;

import org.springframework.web.bind.annotation.*;


@RestController
public class Controller {

    @PostMapping("/api/test")
    public String getString(@RequestBody String string) {
        System.out.println(string);
        return "Hello World! " + string;
    }

}
