from typing import Any

def upload_file(file_path: str) -> str:
    if not os.path.exists(file_path):
        return f"Error: File {file_path} does not exist."
    
    try:
        file_input = jobAgent.page.query_selector('input[type="file"]')
        if not file_input:
            return "Error: No file input found on the current page."
        
        file_input.set_input_files(file_path)
        return f"File {file_path} uploaded successfully."
    except Exception as e:
        return f"Error uploading file: {str(e)}" 

def download_file(url: str, destination: str) -> str:
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        with open(destination, 'wb') as file:
            file.write(response.content)
        
        return f"File downloaded successfully to {destination}."
    except Exception as e:
        return f"Error downloading file: {str(e)}" 

def delete_file(file_path: str) -> str:
    try:
        os.remove(file_path)
        return f"File {file_path} deleted successfully."
    except FileNotFoundError:
        return f"Error: File {file_path} not found."
    except Exception as e:
        return f"Error deleting file: {str(e)}" 