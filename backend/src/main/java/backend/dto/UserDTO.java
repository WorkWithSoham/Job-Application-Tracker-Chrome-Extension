package backend.dto;

import backend.database.DatabaseConnector;

import java.sql.Connection;

public class UserDTO extends DatabaseConnector {

    public UserDTO() {}

    private final Connection conn = getConnection();
}
