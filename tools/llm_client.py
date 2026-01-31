import requests
import json
import sys

# Configuration
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "codellama"

def query_ollama(prompt, system_prompt=None):
    """
    Sends a prompt to the local Ollama instance.
    """
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False
    }
    
    if system_prompt:
        payload["system"] = system_prompt

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        return response.json().get("response", "")
    except requests.exceptions.RequestException as e:
        return f"Error connecting to Ollama: {str(e)}"

if __name__ == "__main__":
    # Test Handshake
    print("Testing connection to Ollama...")
    res = query_ollama("Say 'Ollama is Ready' if you can hear me.")
    print(res)
