package jobAgent.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConnectionTester implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        try {
            System.out.println("Testing database connection...");
            String result = jdbcTemplate.queryForObject("SELECT 'Database connection successful!'", String.class);
            System.out.println(result);

            String tableQuery = "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'userDb' AND table_name = 'users'";
            int tableCount = jdbcTemplate.queryForObject(tableQuery, Integer.class);
            System.out.println("User table exists: " + (tableCount > 0));

        } catch (Exception e) {
            System.err.println("Database connection failed: " + e.getMessage());
        }
    }
}