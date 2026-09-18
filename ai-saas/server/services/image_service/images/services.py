import os
import requests
import base64

def generate_image(prompt):
    api_key = os.environ.get("CLIPDROP_API_KEY")
    if not api_key:
        raise ValueError("Clipdrop API key is not configured.")

    url = "https://clipdrop-api.co/text-to-image/v1"
    headers = {
        "x-api-key": api_key,
    }
    files = {
        "prompt": (None, prompt, "text/plain")
    }

    try:
        response = requests.post(url, headers=headers, files=files, timeout=30)
        
        if response.status_code == 401 or response.status_code == 403:
            raise ValueError("Invalid Clipdrop API key or unauthorized.")
        elif response.status_code != 200:
            raise RuntimeError("Clipdrop API returned an error.")
            
        image_bytes = response.content
        base64_encoded = base64.b64encode(image_bytes).decode('utf-8')
        return f"data:image/jpeg;base64,{base64_encoded}"
        
    except requests.exceptions.RequestException as e:
        raise RuntimeError("Failed to connect to the image generation service.")
