package backend.entity;

import backend.controller.JsonHandler;
import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.util.Date;
import java.util.Map;

@Entity
@Table(name = "application", schema = "jobext")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    public String json() {
        return JsonHandler.toJson(this);
    }

    public int getApp_id() {
        return app_id;
    }

    public void setApp_id(int app_id) {
        this.app_id = app_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getJd() {
        return jd;
    }

    public void setJd(String jd) {
        this.jd = jd;
    }

    public Date getApp_date() {
        return app_date;
    }

    public void setApp_date(Date app_date) {
        this.app_date = app_date;
    }
}
