from typing import Optional
from PIL import Image
from pathlib import Path
import tempfile
import shutil
import logging

# Import your existing function
from vendors.part1.main import run_ielts_part1_agent

logger = logging.getLogger(__name__)


def run_part1(image_path: str | Path, essay_text: str) -> str:
    """Calls your existing Part 1 agent and returns a markdown string."""
    # Ensure it's a real file path on disk (Gradio can pass us a path already)
    image_path = Path(image_path)
    if not image_path.exists():
        raise FileNotFoundError(f"Image not found: {image_path}")

    logger.info("Running Part1 agent")
    # If your agent requires a path, we pass it; if it accepts PIL image, adjust accordingly
    result = run_ielts_part1_agent(str(image_path), essay_text)
    # Expecting a string from your code; if it's not, convert appropriately
    return str(result)