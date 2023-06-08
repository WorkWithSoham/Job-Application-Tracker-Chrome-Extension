package backend.entity;

import backend.dto.UserDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int user_id;
    @Column(name = "first_name")
    private String first_name;
    @Column(name = "last_name")
    private String last_name;

    @Transient
    private final UserDTO db = new UserDTO();

    public User() {}

    public User(String first_name, String last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
    }

    public int getUserId() {
        return user_id;
    }

    public UserDTO db() {
        return this.db;
    }

}
