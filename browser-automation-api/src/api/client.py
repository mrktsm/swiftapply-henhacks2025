from requests import Session

class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = Session()

    def get(self, endpoint, params=None):
        response = self.session.get(f"{self.base_url}/{endpoint}", params=params)
        response.raise_for_status()
        return response.json()

    def post(self, endpoint, json=None):
        response = self.session.post(f"{self.base_url}/{endpoint}", json=json)
        response.raise_for_status()
        return response.json()

    def put(self, endpoint, json=None):
        response = self.session.put(f"{self.base_url}/{endpoint}", json=json)
        response.raise_for_status()
        return response.json()

    def delete(self, endpoint):
        response = self.session.delete(f"{self.base_url}/{endpoint}")
        response.raise_for_status()
        return response.json()