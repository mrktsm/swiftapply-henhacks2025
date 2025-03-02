package jobAgent.demo.Controller;

import jobAgent.demo.Model.JobApplication;
import jobAgent.demo.Service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @GetMapping("/{email}")
    public ResponseEntity<List<JobApplication>> getUserApplications(@PathVariable String email) {
        List<JobApplication> applications = jobApplicationService.getUserApplications(email);
        return ResponseEntity.ok(applications);
    }

    @PostMapping("/{email}/apply")
    public ResponseEntity<?> applyForJob(
            @PathVariable String email,
            @RequestBody JobApplication jobApplication) {

            JobApplication savedApplication = jobApplicationService.saveApplication(jobApplication);
            return ResponseEntity.ok(savedApplication);

    }
}