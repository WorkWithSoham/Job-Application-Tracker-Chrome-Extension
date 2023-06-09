package backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.SQLException;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) throws SQLException {
        SpringApplication.run(BackendApplication.class, args);
    }

}
