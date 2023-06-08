package backend.database;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnector {

    public DatabaseConnector() {
    }

    private static final Logger log = LoggerFactory.getLogger(DatabaseConnector.class);

    private Connection conn;

    protected Connection getConnection() {
        String url = constructURL();
        try {
            this.conn = DriverManager.getConnection(url, getProps("user"), getProps("password"));
            log.info("Connected to POSTGRES Database --> {}", url);
        } catch (SQLException e) {
            log.error("SQLException occurred while connecting to DB --> {}", e.toString());
        }
        return this.conn;
    }

    private String constructURL() {
        return String.format("jdbc:postgresql://%s:%s/%s", getProps("host"), getProps("port"), getProps("db"));
    }

    private String getProps(String key) {
        try {
            JobExtProperties jobExtProperties = new JobExtProperties();
            return jobExtProperties.getProperties(key);
        } catch (IOException ioException) {
            log.error("Input file not found --> {}", ioException.toString());
        }
        return "";
    }
}
