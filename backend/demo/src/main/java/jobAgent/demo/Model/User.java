package jobAgent.demo.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String country;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "portfolio_url")
    private String portfolioUrl;

    @Column(name = "resume_path")
    private String resumePath;

    @Column(name = "university_name")
    private String universityName;

    @Column
    private String degree;

    @Column(name = "graduation_date")
    private LocalDate graduationDate;

    @Column
    private Double gpa;

    @Column(name = "relevant_coursework")
    private String relevantCoursework;

    @Column(name = "work_authorization")
    private Boolean workAuthorization;

    @Column(name = "needs_sponsorship")
    private Boolean needsSponsorship;

    @Column(name = "preferred_location")
    private String preferredLocation;

    @Column(name = "start_date")
    private LocalDate startDate;
}