from browser_automation.agents.job_agent import JobAgent
import unittest

class TestJobAgent(unittest.TestCase):

    def setUp(self):
        self.agent = JobAgent()

    def test_agent_initialization(self):
        self.assertIsNotNone(self.agent)

    def test_agent_task(self):
        expected_task = (
            "Go to jobright.ai, sign in using google, whenever prompted by website to "
            "check if human, wait a few seconds and press the checkbox, "
            "Sort jobs by top matched instead of recommended by pressing the 'recommended' drop down button, "
            "apply to the first job you see using userinfo. Go through the whole application process " 
            "upload a resume when you see a file upload button "
            "Once you have applied to the job, go back to jobright.ai tab and press 'Yes, I applied' button"
        )
        self.assertEqual(self.agent.task, expected_task)

    def test_upload_file(self):
        result = self.agent.upload_file("path/to/test_resume.pdf")
        self.assertIn("successfully", result)

if __name__ == '__main__':
    unittest.main()