# IELTS Writing Assistant


A local-first UI for your IELTS agents.


## Quickstart


```bash
# 1) Clone repo (with your vendors)
# git clone --recurse-submodules <repo>
# or add your part1/part2 under vendors/


python -m venv .venv
source .venv/bin/activate # Windows: .venv\\Scripts\\activate


# dependencies
pip install -e . # if using pyproject.toml
# or: pip install -r requirements.txt


# configure key
cp .env.sample .env
# edit .env (OPENAI_API_KEY=...)


# run the app
python app/ui.py