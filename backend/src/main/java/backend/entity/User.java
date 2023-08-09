package backend.entity;


import jakarta.persistence.*;

import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "user", schema = "jobext")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    @Column(name = "full_name")
    private String full_name;
    @Column(name = "username")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;

    public User() {
    }

    public User(String full_name, String username, String email, String password) {
        this.full_name = full_name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public <T> User(Map<String, T> user) {
        this.full_name = (String) user.get("full_name");
        this.username = (String) user.get("username");
        this.email = (String) user.get("email");
        this.password = (String) user.get("password");
    }

    public Map<String, Object> getAsMap() {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("full_name", this.full_name);
        userMap.put("username", this.username);
        userMap.put("email", this.email);
        userMap.put("password", this.password);

        return userMap;
    }


    public int getUser_id() {
        return user_id;
    }

    public String getFull_name() {
        return full_name;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String toString() {
        return "\nUser {" +
                "\n\tuser_id = " + user_id +
                ", \n\tfull_name = '" + full_name + '\'' +
                ", \n\tusername = '" + username + '\'' +
                ", \n\temail = " + email +
                "\n}";
    }
}
