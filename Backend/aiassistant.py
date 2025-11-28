
import os
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

OPEN_AI_KEY = os.getenv("OPENAI_API_KEY") 
if not OPEN_AI_KEY:
    raise RuntimeError("NO OPENAI_API_KEY ENV")

client = OpenAI(
    api_key=OPEN_AI_KEY,
)

def generate_chatgpt_response(prompt):
    response = client.responses.create(
        model="gpt-4o",
        instructions="You are a helpful assistant. You do not mention that you are an AI model. You provide concise and relevant answers. You only generate text responses. No other content generation. If something doesn't make sense, respond with 'I don't know'.",
        input=prompt,
    )
    return response.output_text
    

