import logging
from vendors.part2.main import run_ielts_part2_agent

logger = logging.getLogger(__name__)


def run_part2(question: str, essay_text: str) -> str:
    """Calls your existing Part 2 agent and returns a markdown string."""
    logger.info("Running Part2 agent")
    result = run_ielts_part2_agent(question, essay_text)
    return str(result)