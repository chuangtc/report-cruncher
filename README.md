### Report Cruncher Service


# Running in docker container

```bash
docker-compose up -d

```

# Running in local

```bash
cp .env.example .env

# Install dependencies
poetry install

# Starting with gunicorn
gunicorn --logger-class=report_cruncher.config.logger.GunicornLogger  report_cruncher.wsgi:app


# Clean pycache
export PYTHONPYCACHEPREFIX="$HOME/.cache/cpython/"
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf

```
