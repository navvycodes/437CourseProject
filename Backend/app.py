import jira
import weather
import github
import network
import restaurants
import phone
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
import aiassistant
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app)


@app.route('/git-my-open-prs')
def git_my_open_prs():
    try:
        prs = github.get_my_open_prs()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(prs)


@app.route('/git-my-requested-prs')
def git_my_requested_prs():
    try:
        prs = github.get_my_requested_prs()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(prs)

@app.route('/network-speed')
def network_speed():
    try:
        data = network.get_network_speed()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(data)

@app.route('/weather/current')
def weather_current():
    try :
        data = weather.get_current_weather()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(data)

@app.route('/weather/forecast')
def weather_forecast():
    try:
        data = weather.get_forecast()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(data)

@app.route('/restaurants/nearby')
def restaurants_nearby():
    try:
        data = restaurants.get_nearby_restaurants()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(data)

@app.route('/jira/issues')
def jira_issues():
    try:
        data = jira.jira_request()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(data)

@app.route('/phone/inuse')
def phone_inuse():
    try:
        data = phone.phone_in_use()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(data)

@app.route('/phone/set-inuse') 
def phone_set_inuse():
    try:
        status = True  
        phone.set_phone_in_use(status)
        data = {"message": "Phone status set to in use."}
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(data)

@app.route('/phone/set-not-inuse') 
def phone_set_not_inuse():
    try:
        status = False  
        phone.set_phone_in_use(status)
        data = {"message": "Phone status set to not in use."}
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(data)

@app.route('/chatgpt', methods=['POST'])
def chatgpt():
    try:
        data = request.get_json()
        user_message = data.get("user_message", "")
        if not user_message or user_message.strip() == "":
            return jsonify({"error": "No message provided"}), 400

        # Remove special characters (keep letters, numbers, spaces, and basic punctuation)
        cleaned_message = re.sub(r"[^a-zA-Z0-9\s.,?!']", "", user_message)
        # Limit string length (e.g., 200 characters)
        cleaned_message = cleaned_message[:200]
        response = aiassistant.generate_chatgpt_response(cleaned_message)
        data = {"response": response}
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
