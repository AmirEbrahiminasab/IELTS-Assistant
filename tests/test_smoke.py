from core.config import set_api_key, get_api_key


def test_env_setter(tmp_path, monkeypatch):
monkeypatch.chdir(tmp_path)
from importlib import reload
import core.config as cfg
reload(cfg)
assert cfg.get_api_key() is None
cfg.set_api_key("abc")
assert cfg.get_api_key() == "abc"