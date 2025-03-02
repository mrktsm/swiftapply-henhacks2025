# Project Overview

This project is a browser automation tool designed to streamline job application processes using a browser agent. It includes a backend server for handling API requests and a structured codebase for managing browser interactions, agent functionalities, and API communications.

## Project Structure

```
browser-automation-api
├── src
│   ├── browser_automation
│   │   ├── __init__.py
│   │   ├── agents
│   │   │   ├── __init__.py
│   │   │   ├── job_agent.py
│   │   │   └── base_agent.py
│   │   ├── browser
│   │   │   ├── __init__.py
│   │   │   ├── browser.py
│   │   │   └── config.py
│   │   ├── actions
│   │   │   ├── __init__.py
│   │   │   └── file_actions.py
│   │   └── utils
│   │       ├── __init__.py
│   │       └── helpers.py
│   ├── api
│   │   ├── __init__.py
│   │   ├── client.py
│   │   └── models.py
│   └── server
│       ├── __init__.py
│       ├── app.py
│       ├── routes.py
│       └── services.py
├── scripts
│   └── run_job_agent.py
├── config
│   ├── __init__.py
│   └── settings.py
├── tests
│   ├── __init__.py
│   ├── test_agents.py
│   └── test_api.py
├── .env
├── requirements.txt
├── setup.py
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd browser-automation-api
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Usage

To run the job agent, execute the following script:
```
python scripts/run_job_agent.py
```

## API

The backend server provides an API for interacting with the browser automation functionalities. You can find the API endpoints defined in `src/server/routes.py`.

## Testing

To run the tests, use:
```
pytest tests/
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.