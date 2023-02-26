# Report Cruncher Service

## Running in docker container
```bash
docker-compose up -d
```
## Setting up in local delopement environment
### On Mac
```bash
brew install poetry
```
### On Windows (WSL Ubuntu 22.04)
(poetry 1.1.7 onward) 
Add the following line to the end of the ~/.bashrc:
```bash
export PATH="$HOME/.local/bin:$PATH"
```
```bash
curl -sSL https://install.python-poetry.org | python3 -
source ~/.bashrc
```
## Installing required library
```bash
pip3 install gunicorn
pip3 install structlog
```
## Running in local
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

