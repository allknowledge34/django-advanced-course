#!/bin/sh
cd services/image_service
gunicorn image_service.wsgi:application --bind 0.0.0.0:${PORT:-8000}