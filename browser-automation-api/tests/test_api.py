from unittest import TestCase
from src.api.client import ApiClient
from src.api.models import JobApplication

class TestApiClient(TestCase):
    def setUp(self):
        self.client = ApiClient(base_url="http://localhost:5000")
    
    def test_create_job_application(self):
        application_data = JobApplication(
            first_name="Andry",
            last_name="Rakotonjanabelo",
            email="andry1arthur@gmail.com",
            phone_number="4084806487",
            resume_path="C:/Users/Andry/Documents/Andry_Rakotonjanabelo_Resume.pdf"
        )
        response = self.client.create_job_application(application_data)
        self.assertEqual(response.status_code, 201)
        self.assertIn("application_id", response.json())

    def test_get_job_application(self):
        application_id = "12345"
        response = self.client.get_job_application(application_id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["application_id"], application_id)

    def test_get_job_applications(self):
        response = self.client.get_job_applications()
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

    def test_update_job_application(self):
        application_id = "12345"
        updated_data = {
            "status": "applied"
        }
        response = self.client.update_job_application(application_id, updated_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "applied")

    def test_delete_job_application(self):
        application_id = "12345"
        response = self.client.delete_job_application(application_id)
        self.assertEqual(response.status_code, 204)