package backend.Database;

import java.sql.Connection;

public class UserDatabaseObject extends DatabaseConnector {

    public UserDatabaseObject() {}

    private final Connection conn = getConnection();
}
