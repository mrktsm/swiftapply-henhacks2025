package jobAgent.demo.Service;

import jobAgent.demo.Model.JobApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class JobApplicationService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String INSERT_QUERY =
        "INSERT INTO job_applications (email, title, company, location, type, salary, image, application_date, version) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)";

    private static final String SELECT_BY_EMAIL =
        "SELECT * FROM job_applications WHERE email = ?";

    private final RowMapper<JobApplication> rowMapper = (rs, rowNum) -> {
        JobApplication app = new JobApplication();
        app.setId(rs.getLong("id"));
        app.setEmail(rs.getString("email"));
        app.setTitle(rs.getString("title"));
        app.setCompany(rs.getString("company"));
        app.setLocation(rs.getString("location"));
        app.setType(rs.getString("type"));
        app.setSalary(rs.getString("salary"));
        app.setImage(rs.getString("image"));
        app.setApplicationDate(rs.getTimestamp("application_date").toLocalDateTime());
        app.setVersion(rs.getLong("version"));
        return app;
    };

    public List<JobApplication> getUserApplications(String email) {
        return jdbcTemplate.query(SELECT_BY_EMAIL, rowMapper, email);
    }

    public JobApplication saveApplication(JobApplication jobApplication) {
        jdbcTemplate.update(INSERT_QUERY,
            jobApplication.getEmail(),
            jobApplication.getTitle(),
            jobApplication.getCompany(),
            jobApplication.getLocation(),
            jobApplication.getType(),
            jobApplication.getSalary(),
            jobApplication.getImage(),
            jobApplication.getApplicationDate()
        );
        return jobApplication;
    }
}