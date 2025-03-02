from abc import ABC, abstractmethod

class BaseAgent(ABC):
    def __init__(self, controller, browser, llm, sensitive_data):
        self.controller = controller
        self.browser = browser
        self.llm = llm
        self.sensitive_data = sensitive_data

    @abstractmethod
    def run(self):
        pass

    def get_sensitive_data(self):
        return self.sensitive_data

    def set_sensitive_data(self, data):
        self.sensitive_data = data

    # Additional common methods for agents can be added here.