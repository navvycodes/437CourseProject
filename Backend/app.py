from flask import Flask, jsonify
import jira
import weather
import github
import network
import restaurants
import phone
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
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
        data = jira.jira_phone_inuse()
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


if __name__ == '__main__':
    app.run(debug=True)
