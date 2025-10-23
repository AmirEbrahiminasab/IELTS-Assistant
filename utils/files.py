from pathlib import Path
import tempfile
from contextlib import contextmanager


@contextmanager
def temp_copy(path: str | Path):
src = Path(path)
if not src.exists():
raise FileNotFoundError(src)
with tempfile.TemporaryDirectory() as td:
dst = Path(td) / src.name
dst.write_bytes(src.read_bytes())
yield dst