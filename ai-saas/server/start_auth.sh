#!/bin/bash
cd services/auth_service
gunicorn auth_service.wsgi:application --bind 0.0.0.0:${PORT:-8000}
