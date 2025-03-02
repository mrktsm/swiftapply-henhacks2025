from langchain_openai import ChatOpenAI
from browser_use import Agent, Browser, BrowserConfig, Controller, ActionResult
import asyncio
import os
from dotenv import load_dotenv

class Browser:
    def __init__(self, config: BrowserConfig):
        self.config = config
        self.controller = Controller()
        self.agent = None

    def initialize_agent(self, task: str, sensitive_data: dict):
        self.agent = Agent(
            task=task,
            controller=self.controller,
            llm=ChatOpenAI(model="gpt-4o"),
            browser=self,
            sensitive_data=sensitive_data
        )

    async def run_agent(self):
        if self.agent is None:
            raise Exception("Agent not initialized. Call initialize_agent first.")
        result = await self.agent.run()
        return result

    def upload_file(self, file_path: str):
        if not os.path.exists(file_path):
            return f"Error: File {file_path} does not exist."
        
        try:
            file_input = self.agent.page.query_selector('input[type="file"]')
            if not file_input:
                return "Error: No file input found on the current page."
            
            file_input.set_input_files(file_path)
            return f"File {file_path} uploaded successfully."
        except Exception as e:
            return f"Error uploading file: {str(e)}"