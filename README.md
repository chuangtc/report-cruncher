# Report Cruncher Service
<https://chuangtc.com/openai-hackathon-2023/>

## Running in docker container
```bash
docker-compose up -d
```
## Setting up in local delopement environment
### On Mac
```bash
brew install poetry
```
### On Windows (WSL2 Ubuntu 22.04)
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
## Running in local for backend
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

## Runing in local for client

### Getting Started
```bash
cd report-cruncher-client
yarn install
yarn start
```

## Running data fine-tune GPT-3 model
### Proposed ECTSum dataset

|Dataset     | # Docs. | Coverage|Density|Compression | # Tokens Doc.| # Tokens Summary|
|------------|---------|---------|-------|------------|---------|----------|
|Arxiv/PubMed|346,187  | 0.87    |3.94   |  31.17     | 5179.22 |257.44    |
|BillSum     |23,455   |   _     |4.12   |  13.64     | 1813.0  |207.7     |
|BigPatent   |1,341,362| 0.86    |2.38   |  36.84     | 3629.04 |116.67    |
|GovReport   |19,466   |   _     |19.01  |  19.01     | 9409.4  |553.4     |
|BookSum     |12,293   | 0.78    |1.69   |  15.97     | 5101.88 |505.32    |
|------------|---------|---------|-------|------------|---------|----------|
|ECTSum      |2,425    | 0.85    |2.43   | 103.67     | 2916.44 | 49.23    |


### Codes
Codes and instructions for our proposed model <b> <i> ECT-BPS </b> </i> can be found under `ECTSum-GPT3/codes/ECT-BPS` <br />
Codes and instructions for our baseline models can be found under `ECTSum-GPT3/codes/baselines`

### Data Preparation for ECT-BPS
#### Preparing the data for training the <i> Extractive Module </i>

#### Set up Python 3.9 on Mac M1
```bash
brew install pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

Open another terminal tab

```bash
cd <project_folder>
pyenv install 3.9.16
pyenv local 3.9.16
pyenv which python
pip install torch torchvision torchaudio
```

##### Install libraries on Mac and Windows(WSL2 Ubuntu 22.04)
```bash
pip install sentence-transformers
pip install num2words
pip install word2number
```

### Prepare the data
```bash
cd ECTSum-GPT3
python prepare_data_gpt3_bert.py
```

### Data Location
The data is saved at `data-bert/`. <br/>
Processed data should be at this location.
