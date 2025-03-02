package jobAgent.demo;


import jobAgent.demo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Find user by email
    boolean existsByEmail(String email);

    // Find user by their OAuth ID
    Optional<User> findById(String id);

    // Find user by email
    Optional<User> findByEmail(String email);

    // Find user by full name
    Optional<User> findByFullName(String fullName);
}
