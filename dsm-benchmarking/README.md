# DRIVING SCHOOLS MANAGEMENT - Application Benchmarking

## Locust Installation

```bash
mkdir ~/.virtualenvs

# install a new virtual environment
virtualenv -p python3 ~/.virtualenvs/dsm-benchmarking

# activate venv
source ~/.virtualenvs/dsm-benchmarking/bin/activate

# install locustio, a Locust Python Library
python3 -m pip install locustio
```

## How to use

```bash
# go to benchmarking folder
cd dsm-benchmarking

# run Locust
# if file is locustfile.py
locust

# if not
locust -f file.py
```
