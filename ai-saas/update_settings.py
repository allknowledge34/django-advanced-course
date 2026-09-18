import os

for svc in ["auth_service", "article_service", "image_service"]:
    path = f"server/services/{svc}/{svc}/settings.py"
    if not os.path.exists(path): continue
    
    with open(path, "r") as f:
        content = f.read()
        
    content = content.replace("DEBUG = True", "DEBUG = os.environ.get('DEBUG', 'True') == 'True'")
    content = content.replace("ALLOWED_HOSTS = ['*']", "ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '*').split(',')")
    
    # We might need CSRF_TRUSTED_ORIGINS? No, no frontend forms are using CSRF (it's JWT).
    
    if "CORS_ALLOWED_ORIGINS" in content:
        # replace the static one with env driven
        import re
        content = re.sub(r"CORS_ALLOWED_ORIGINS\s*=\s*\[.*?\]", "CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', 'http://localhost:5173').split(',')", content)
    else:
        content += "\nCORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', 'http://localhost:5173').split(',')"
        
    with open(path, "w") as f:
        f.write(content)

print("Updated settings.")
