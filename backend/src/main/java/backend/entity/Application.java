package backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "application", schema = "jobext")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int app_id;
    @Column(name = "user_id")
    private int user_id;
    @Column(name = "company")
    private String company;
    @Column(name = "loc")
    private String location;
    @Column(name = "status")
    private String status;
    @Column(name = "pos")
    private String position;
    @Column(name = "jd")
    private String jd;
    @Column(name = "app_date")
    private Date app_date;

    public Application() {
    }

    public Application(String company, String location, String status, String position, String jd) {
        this.company = company;
        this.location = location;
        this.status = status;
        this.position = position;
        this.jd = jd;
    }

    @Override
    public String toString() {
        return "Application {" +
                "\n\tapp_id = " + app_id +
                ", \n\tuser_id = " + user_id +
                ", \n\tcompany = '" + company + '\'' +
                ", \n\tlocation = '" + location + '\'' +
                ", \n\tstatus = '" + status + '\'' +
                ", \n\tposition = '" + position + '\'' +
                ", \n\tjd = '" + jd + '\'' +
                ", \n\tapp_date = " + app_date +
                "\n}";
    }
}
