import requests
import os 

TOKEN = os.getenv("GITHUB_TOKEN")
if not TOKEN:
    raise RuntimeError("NO GITHUB_TOKEN ENV")

API_URL = "https://api.github.com" 
USERNAME = "Pranav-Raman-SR" 


def get_my_open_prs():
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/vnd.github+json",
    }
    query = f"is:pr is:open author:{USERNAME}"
    response = requests.get(f"{API_URL}/search/issues", headers=headers, params={"q": query})
    if (response.status_code != 200):
        print(f"GitHub API error: {response.status_code} - {response.text}")
        raise RuntimeError(f"GitHub API error: {response.status_code} - {response.text}")
    return response.json()

def get_my_requested_prs(): 
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/vnd.github+json",
    }
    query = f"is:pr is:open review-requested:{USERNAME}"
    response = requests.get(f"{API_URL}/search/issues", headers=headers, params={"q": query})
    if (response.status_code != 200):
        print(f"GitHub API error: {response.status_code} - {response.text}")
        raise RuntimeError(f"GitHub API error: {response.status_code} - {response.text}")
    return response.json()