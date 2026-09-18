#!/bin/sh
cd services/article_service
exec gunicorn article_service.wsgi:application --bind 0.0.0.0:${PORT:-8000}