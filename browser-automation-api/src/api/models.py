from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: str
    race: str
    disability: Optional[str] = None
    veteran: Optional[str] = None
    require_sponsorship: Optional[str] = None
    country_of_residence: str
    gender: str
    address: str
    city: str
    state: str
    zip_code: str
    linkedin_link: Optional[str] = None

class JobApplication(BaseModel):
    user: User
    resume_path: str
    job_id: str
    application_status: Optional[str] = "Pending"