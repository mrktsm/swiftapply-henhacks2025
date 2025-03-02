from flask import Blueprint, request, jsonify
from browser_automation.api.client import ApiClient

services_bp = Blueprint('services', __name__)

@services_bp.route('/apply_job', methods=['POST'])
def apply_job():
    data = request.json
    if not data or 'job_id' not in data:
        return jsonify({'error': 'Invalid input'}), 400
    
    job_id = data['job_id']
    # Here you would call the job agent to apply for the job
    # For example:
    # result = job_agent.apply(job_id)
    
    # Simulating a response for demonstration purposes
    result = {"status": "success", "message": f"Applied for job {job_id}"}
    
    return jsonify(result), 200

@services_bp.route('/status', methods=['GET'])
def status():
    return jsonify({'status': 'Service is running'}), 200