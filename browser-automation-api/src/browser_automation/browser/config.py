class BrowserConfig:
    def __init__(self, chrome_instance_path: str):
        self.chrome_instance_path = chrome_instance_path

    def get_chrome_instance_path(self) -> str:
        return self.chrome_instance_path

    def set_chrome_instance_path(self, path: str):
        self.chrome_instance_path = path

    def to_dict(self) -> dict:
        return {
            "chrome_instance_path": self.chrome_instance_path
        }