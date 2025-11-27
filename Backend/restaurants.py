import os
import requests
from dotenv import load_dotenv
import datetime
load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise RuntimeError("NO GOOGLE_API_KEY ENV")

GOOGLE_PLACES_API_URL = "https://places.googleapis.com/v1/places:searchNearby"
FIELD_MASK = (
    "places.displayName,"
    "places.location,"
    "places.primaryType,"
    "places.businessStatus,"
    "places.rating,"
    "places.userRatingCount,"
    "places.iconMaskBaseUri,"
    "places.shortFormattedAddress"
)

import datetime

# cite: https://www.kaggle.com/datasets/hugodarwood/restaurant-ratings-and-wait-times
def estimate_wait_time(rating, user_rating_count):
    now = datetime.datetime.now()
    hour = now.hour
    if 6 <= hour < 11:
        base = 10
    elif 11 <= hour < 15: 
        base = 30
    elif 15 <= hour < 17: 
        base = 12
    elif 17 <= hour < 20:  
        base = 40
    elif 20 <= hour < 22:  
        base = 20
    else:                 
        base = 5
    rating_popularity = max(0, (rating - 3.0)) ** 1.5
    rating_bonus = rating_popularity * 8  # 0–20 minutes
    review_bonus = (user_rating_count ** 0.5) * 1.2  # typical: 10–25 min
    estimate = base + rating_bonus + review_bonus
    estimate = max(0, min(estimate, 150)) / 1.5 
    return estimate


#41.8789° N, 87.6359° W
def get_nearby_restaurants():
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": FIELD_MASK
    }
    payload = {
        "includedTypes": ["restaurant"],
        "maxResultCount": 20,
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": 41.8789,
                    "longitude": -87.6359
                },
                "radius": 500.0
            }
        }
    }
    response = requests.post(GOOGLE_PLACES_API_URL, headers=headers, json=payload)
    if response.status_code != 200:
        raise RuntimeError(f"Google Places API error {response.status_code}: {response.text}")
    data = response.json()
    for place in data.get("places", []):
        rating = place.get("rating", 0)
        user_rating_count = place.get("userRatingCount", 0)
        place["estimated_wait_time_minutes"] = estimate_wait_time(rating, user_rating_count)
    return data
