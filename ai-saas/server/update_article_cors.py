import os

settings_path = "services/article_service/article_service/settings.py"
with open(settings_path, "r") as f:
    content = f.read()

if "'corsheaders'," not in content:
    content = content.replace(
        "'rest_framework',",
        "'corsheaders',\n    'rest_framework',"
    )

if "'corsheaders.middleware.CorsMiddleware'," not in content:
    content = content.replace(
        "'django.middleware.common.CommonMiddleware',",
        "'corsheaders.middleware.CorsMiddleware',\n    'django.middleware.common.CommonMiddleware',"
    )

if "CORS_ALLOWED_ORIGINS" not in content:
    content += "\nCORS_ALLOWED_ORIGINS = ['http://localhost:5173']\n"

with open(settings_path, "w") as f:
    f.write(content)

print("Updated article_service settings.py")
