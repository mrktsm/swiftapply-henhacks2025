package jobAgent.demo.Service;

import jobAgent.demo.Model.User;
import jobAgent.demo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User saveUser(User user) {
        // ... existing validation code ...
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public User findByfullName(String fullName) {
        return userRepository.findByFullName(fullName)
                .orElseThrow(() -> new RuntimeException("User not found with full name: " + fullName));
    }
}