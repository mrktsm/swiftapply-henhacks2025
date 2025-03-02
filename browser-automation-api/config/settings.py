from pathlib import Path
import os

class Settings:
    def __init__(self):
        self.load_env_variables()

    def load_env_variables(self):
        env_file = Path(__file__).resolve().parent.parent / '.env'
        if env_file.exists():
            with open(env_file) as f:
                for line in f:
                    if line.strip() and not line.startswith('#'):
                        key, value = line.strip().split('=', 1)
                        os.environ[key] = value

    @property
    def api_base_url(self):
        return os.getenv('API_BASE_URL', 'http://localhost:5000')

    @property
    def browser_path(self):
        return os.getenv('BROWSER_PATH', 'C:/Program Files/Google/Chrome/Application/chrome.exe')

    @property
    def resume_path(self):
        return os.getenv('RESUME_PATH', 'C:/Users/Andry/Documents/Andry_Rakotonjanabelo_Resume.pdf')

settings = Settings()