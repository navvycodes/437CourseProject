# weather_service.py
import os
import requests
from dotenv import load_dotenv
load_dotenv()

BASE_URL = "https://api.weatherapi.com/v1"
API_KEY = os.getenv("WEATHER_TOKEN")
if not API_KEY:
    raise RuntimeError("NO WEATHER_TOKEN ENV")

LOCATION = "Chicago"


def get_current_weather():
    url = f"{BASE_URL}/current.json"
    params = {
        "key": API_KEY,
        "q": LOCATION,
    }
    resp = requests.get(url, params=params, timeout=10)
    data = resp.json()
    return data


def get_forecast():
    url = f"{BASE_URL}/forecast.json"
    params = {
        "key": API_KEY,
        "q": LOCATION,
        "days": 7,
    }
    resp = requests.get(url, params=params, timeout=10)
    if (resp.status_code != 200):
        raise RuntimeError(f"Weather API error {resp.status_code}: {resp.text}")
    data = resp.json()
    return data

