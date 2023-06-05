package Database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UserDatabaseObject extends DatabaseConnector {

    public UserDatabaseObject() {}

    private final Connection conn = getConnection();
}
