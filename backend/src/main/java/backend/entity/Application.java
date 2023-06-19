package backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.util.Date;
import java.util.Map;

@Entity
@Table(name = "application", schema = "jobext")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "app_id", unique = true)
    private int app_id;
    @Column(name = "user_id")
    private int user_id;
    @Column(name = "company")
    private String company;
    @Column(name = "loc")
    private String location;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;
    @Column(name = "pos")
    private String position;
    @Column(name = "jd")
    private String jd;
    @Column(name = "app_date")
    private Date app_date;

    public Application() {
    }

    public <T> Application(Map<String, T> application) {
        this.user_id = (int) application.get("user_id");
        this.company = (String) application.get("company");
        this.location = (Boolean) application.get("remote") ? "Remote" : (String) application.get("location");
        this.status = Status.valueOf(application.get("status").toString());
        this.position = (String) application.get("position");
        this.jd = (String) application.get("jd");
        this.app_date = new Date();
    }

    public Application(String company, String location, Status status, String position, String jd) {
        this.company = company;
        this.location = location;
        this.status = status;
        this.position = position;
        this.jd = jd;
        this.app_date = new Date();
    }

    @Override
    public String toString() {
        return "Application {" +
                "\n\tapp_id = " + app_id +
                ", \n\tuser_id = " + user_id +
                ", \n\tcompany = '" + company + '\'' +
                ", \n\tlocation = '" + location + '\'' +
                ", \n\tStatus = '" + status + '\'' +
                ", \n\tposition = '" + position + '\'' +
                ", \n\tjd = '" + jd + '\'' +
                ", \n\tapp_date = " + app_date +
                "\n}";
    }
}
