package backend.entity;

import backend.dao.UserDAO;
import jakarta.persistence.*;

@Entity
@Table(name = "user", schema = "jobext")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int user_id;
    @Column(name = "first_name")
    private String first_name;
    @Column(name = "last_name")
    private String last_name;
    @Column(name = "email")
    private String email;

    public User() {}

    public User(String first_name, String last_name, String email) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }

}
