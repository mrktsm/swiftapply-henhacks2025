from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any, Optional
from src.browser_automation.agents.job_agent import JobAgent
from src.api.models import User, JobApplication

# Create router (equivalent to Flask's Blueprint)
router = APIRouter()

# Define request model with Pydantic
class JobApplicationRequest(BaseModel):
    user_info: Dict[str, Any]  # This will be passed as sensitive_data
    resume_path: str
    job_id: Optional[str] = None

# Define response models
class JobApplicationResponse(BaseModel):
    message: str
    result: Any

class StatusResponse(BaseModel):
    status: str

@router.post("/apply", response_model=JobApplicationResponse)
async def apply_for_job(request: JobApplicationRequest, background_tasks: BackgroundTasks):
    resume_path = request.resume_path
    sensitive_data = request.user_info  # Pass user_info as sensitive_data
    
    try:
        job_agent = JobAgent(sensitive_data=sensitive_data, resume_path=resume_path)
        result = await job_agent.run()  # Since your run method is async
        return {"message": "Job application submitted successfully.", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status", response_model=StatusResponse)
async def check_status():
    # Placeholder for checking the status of the job application process
    return {"status": "Job application process is running."}