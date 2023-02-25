#!/bin/bash
set -e

echo "starting server"
gunicorn --logger-class=report_cruncher.config.logger.GunicornLogger  report_cruncher.wsgi:app --bind 0.0.0.0:8000 --workers=1
