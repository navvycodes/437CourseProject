import requests
from requests.auth import HTTPBasicAuth
import os
from dotenv import load_dotenv
load_dotenv()

API_TOKEN = os.getenv("JIRA_2")
JIRA_URL = os.getenv("JIRA_URL")
JIRA_EMAIL = os.getenv("JIRA_EMAIL")
if not API_TOKEN:
    raise RuntimeError("NO JIRA_API_TOKEN ENV")
if not JIRA_URL:
    raise RuntimeError("NO JIRA_URL ENV")
if not JIRA_EMAIL:
    raise RuntimeError("NO JIRA_EMAIL ENV")


def jira_request():
    url = f"{JIRA_URL}rest/api/3/search/jql"
    auth = HTTPBasicAuth(JIRA_EMAIL, API_TOKEN)
    headers = {
        "Accept": "application/json"
    }

    query = {
        "jql": "assignee = currentUser() AND status != Done AND status != Released AND status != Cancelled ORDER BY priority DESC, created ASC",
        "maxResults": 20,
        "fields": "key,summary,status,created,priority"
    }
    
    response = requests.request(
        "GET",
        url,
        headers=headers,
        params=query,
        auth=auth
    )
    if response.status_code != 200:
        raise RuntimeError(f"JIRA API error {response.status_code}: {response.text}")
    return response.json()