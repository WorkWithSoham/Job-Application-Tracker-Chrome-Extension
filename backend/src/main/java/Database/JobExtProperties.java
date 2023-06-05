package Database;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class JobExtProperties {

    String FilePath = "/Users/sohamsantoshtembe/Soham/Devs/Projects/job-ext/backend/src/main/java/Database/dbConnection.properties";

    Properties props = new Properties();
    FileInputStream inputStream = new FileInputStream(FilePath);

    public JobExtProperties() throws IOException {
        props.load(inputStream);
    }

    public String getProperties(String key) {
        return props.getProperty(key);
    }

}
