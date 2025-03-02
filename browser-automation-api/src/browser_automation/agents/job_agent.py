from langchain_openai import ChatOpenAI
from browser_use import Agent, Browser, BrowserConfig, Controller, ActionResult
import os
import asyncio
from dotenv import load_dotenv

load_dotenv()

class JobAgent:
    def __init__(self, sensitive_data, resume_path):
        self.sensitive_data = sensitive_data
        self.resume_path = resume_path
        self.agent = None

    async def run(self):
        try:
            # Configure browser to use CDP endpoint
            config = BrowserConfig(
                chrome_instance_path="C:\Program Files\Google\Chrome\Application\chrome.exe"
            )
            
            controller = Controller()
            browser = Browser(config=config)
            
            self.agent = Agent(  # Save reference to agent
                task=(
                    "Go to jobright.ai, sign in using google, whenever prompted by website to "
                    "check if human, wait a few seconds and press the checkbox, "
                    "Sort jobs by top matched instead of recommended by pressing the 'recommended' drop down button on "
                    "on the top right of the page. Once the dropdown opens, press 'Top Matched' "
                    "apply to the first job you see using userinfo. Go through the whole application process " 
                    "upload a resume when you see a file upload button. "
                    "Once you have applied to the job, go back to jobright.ai tab and press 'Yes, I applied' button"        
                ),
                controller=controller,
                llm=ChatOpenAI(model="gpt-4o"),
                browser=browser,
                sensitive_data=self.sensitive_data
            )
            
            # Run the agent
            result = await self.agent.run()
            return {"status": "success", "result": result}
            
        except Exception as e:
            print(f"Error in JobAgent: {e}")
            return {"status": "error", "details": str(e)}

    async def upload_file(self):
        """Make this async and fix the reference to self.agent"""
        if not os.path.exists(self.resume_path):
            return f"Error: File {self.resume_path} does not exist."
        
        try:
            if not self.agent:
                return "Error: Agent not initialized. Call run() first."
                
            file_input = self.agent.page.query_selector('input[type="file"]')
            if not file_input:
                return "Error: No file input found on the current page."
            
            file_input.set_input_files(self.resume_path)
            return f"File {self.resume_path} uploaded successfully."
        except Exception as e:
            return f"Error uploading file: {str(e)}"