package jobAgent.demo.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    private String location;
    private String type;
    private String salary;
    private String image;

    @Column(name = "application_date")
    private LocalDateTime applicationDate;

    @Version
    private Long version;

    public JobApplication() {
    }

    // Existing getters
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getLocation() { return location; }
    public String getType() { return type; }
    public String getSalary() { return salary; }
    public String getImage() { return image; }
    public LocalDateTime getApplicationDate() { return applicationDate; }
    public Long getVersion() { return version; }

    // Existing setters
    public void setId(Long id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public void setTitle(String title) { this.title = title; }
    public void setCompany(String company) { this.company = company; }
    public void setLocation(String location) { this.location = location; }
    public void setType(String type) { this.type = type; }
    public void setSalary(String salary) { this.salary = salary; }
    public void setImage(String image) { this.image = image; }
    public void setApplicationDate(LocalDateTime applicationDate) { this.applicationDate = applicationDate; }
    public void setVersion(Long version) { this.version = version; }
}