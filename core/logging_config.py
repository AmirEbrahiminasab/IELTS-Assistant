import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path


LOG_PATH = Path("logs")
LOG_PATH.mkdir(exist_ok=True)




def configure_logging(level: int = logging.INFO) -> None:
logger = logging.getLogger()
logger.setLevel(level)


fmt = logging.Formatter(
fmt="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
datefmt="%Y-%m-%d %H:%M:%S",
)


ch = logging.StreamHandler()
ch.setFormatter(fmt)
logger.addHandler(ch)


fh = RotatingFileHandler(LOG_PATH / "app.log", maxBytes=1_000_000, backupCount=3)
fh.setFormatter(fmt)
logger.addHandler(fh)