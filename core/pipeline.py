import logging
from pathlib import Path
from adapters.external.part1_runner import run_part1
from adapters.external.part2_runner import run_part2
from core.formatting import format_success

logger = logging.getLogger(__name__)


def analyze_part1(image_path: str | Path, essay_text: str) -> str:
    logger.info("Pipeline: analyze_part1")
    result_md = run_part1(image_path, essay_text)
    # If your runner returns plain text, you can wrap it nicely:
    return format_success("IELTS Writing Task 1 — Feedback", result_md)


def analyze_part2(question: str, essay_text: str) -> str:
    logger.info("Pipeline: analyze_part2")
    result_md = run_part2(question, essay_text)
    return format_success("IELTS Writing Task 2 — Feedback", result_md)