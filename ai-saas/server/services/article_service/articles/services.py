import os
from google import genai
from google.genai.errors import APIError

def generate_article(title, length):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("Gemini API key is not configured.")

    try:
        client = genai.Client(api_key=api_key)
        prompt = f"Write a high-quality article about '{title}'. The article should be approximately {length} words long. Provide only the article content, with no introductory or concluding meta-text."
        
        response = client.models.generate_content(
            model='gemini-3.6-flash',
            contents=prompt
        )
        
        if not response or not response.text:
            raise RuntimeError("Failed to generate article content.")
            
        return response.text
    except APIError as e:
        raise RuntimeError(f"Gemini API error: {str(e)}")
    except Exception as e:
        raise RuntimeError(f"Unexpected error: {str(e)}")
