# ECTSum: A New Benchmark Dataset For Bullet Point Summarization of Long Earnings Call Transcripts

Long Paper Accepted at the <b> EMNLP 2022 Main Conference! </b> <br /> 
<li> ArXiv Preprint: https://arxiv.org/pdf/2210.12467.pdf </li>
<li> Poster: https://rajdeep345.github.io/files/pdf/research/ECTSum_EMNLP2022_Poster.pdf </li>
<li> Pre-recorded Video: https://drive.google.com/file/d/1DW2i2ApgiE6V7ViiayX5zdJSRXdAEbsy/view </li>

## Dataset
The <b> <i> ECTSum </b> </i> dataset can be found under the `data` folder.

## Proposed ECTSum dataset
|Dataset |# Docs.|Coverage|Density|Compression || # Tokens |
|        |       |        |       |  Ratio     |Doc. | Summary |
|-----|--------|
|Apple|3       |
|Egg  |12      |

Dataset # Docs. Coverage Density Compression # Tokens
Ratio Doc. Summary
Arxiv/PubMed 346,187 0.87 3.94 31.17 5179.22 257.44
BillSum 23,455 - 4.12 13.64 1813.0 207.7
BigPatent 1,341,362 0.86 2.38 36.84 3629.04 116.67
GovReport 19,466 - 7.60 19.01 9409.4 553.4
BookSum Chapters 12,293 0.78 1.69 15.97 5101.88 505.32
ECTSum 2,425 0.85 2.43 103.67 2916.44 49.23

## Codes
Codes and instructions for our proposed model <b> <i> ECT-BPS </b> </i> can be found under `codes/ECT-BPS` <br />
Codes and instructions for our baseline models can be found under `codes/baselines`

## Data Preparation for ECT-BPS
### Preparing the data for training the <i> Extractive Module </i>

### Set up Python 3.9, Pytorch on Mac M1
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

### Set up Pytorch on Windows
```bash
pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cpu
```


### Install libraries on Mac and Windows
```bash
pip install sentence-transformers
pip install num2words
pip install word2number
```



#### Prepare the data
`python prepare_data_gpt3.py`

#### Data Location
The data is saved at `out-data/`. </br>
Processed data should be at this location.

## Updates
<li> 1st November 2022 - ECTSum Dataset released </li>
<li> 30th November 2022 - Codes and Instructions released for training the Extractive Module of ECT-BPS
<li> 28th Feburary 2023 - Dataset for GPT-3 created</li>