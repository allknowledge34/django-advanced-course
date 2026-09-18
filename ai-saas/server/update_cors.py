import os

settings_path = "services/auth_service/auth_service/settings.py"
with open(settings_path, "r") as f:
    content = f.read()

# Add corsheaders to INSTALLED_APPS
if "'corsheaders'," not in content:
    content = content.replace(
        "'rest_framework',",
        "'corsheaders',\n    'rest_framework',"
    )

# Add CorsMiddleware to MIDDLEWARE, before CommonMiddleware
if "'corsheaders.middleware.CorsMiddleware'," not in content:
    content = content.replace(
        "'django.middleware.common.CommonMiddleware',",
        "'corsheaders.middleware.CorsMiddleware',\n    'django.middleware.common.CommonMiddleware',"
    )

# Add CORS_ALLOWED_ORIGINS
if "CORS_ALLOWED_ORIGINS" not in content:
    content += "\nCORS_ALLOWED_ORIGINS = ['http://localhost:5173']\n"

with open(settings_path, "w") as f:
    f.write(content)

print("Updated settings.py")
