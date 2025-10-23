import os
from pathlib import Path
from dotenv import load_dotenv


ENV_PATH = Path(".env")
ENV_VAR_NAME = "OPENAI_API_KEY" # change if your agents expect a different name


# Load once on import
load_dotenv(dotenv_path=ENV_PATH, override=False)




def env_path() -> Path:
return ENV_PATH




def get_api_key() -> str | None:
return os.getenv(ENV_VAR_NAME)




def ensure_env_file() -> None:
if not ENV_PATH.exists():
ENV_PATH.write_text("")




def set_api_key(value: str, var_name: str = ENV_VAR_NAME) -> None:
"""Idempotently set/replace the API key in .env and process env."""
value = (value or "").strip()
ensure_env_file()
lines = ENV_PATH.read_text().splitlines()
out_lines = []
found = False
for line in lines:
if line.strip().startswith(f"{var_name}="):
out_lines.append(f"{var_name}={value}")
found = True
else:
out_lines.append(line)
if not found:
out_lines.append(f"{var_name}={value}")
ENV_PATH.write_text("\n".join(out_lines) + "\n")
# also set in current process so it takes effect immediately
os.environ[var_name] = value