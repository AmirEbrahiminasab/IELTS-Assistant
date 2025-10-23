from __future__ import annotations
import re

_ANSI_RE = re.compile(r"\x1B\[[0-?]*[ -/]*[@-~]")

def _strip_ansi(s: str) -> str:
    return _ANSI_RE.sub("", s)

def _normalize_agent_text_to_md(s: str) -> str:
    s = _strip_ansi(s)

    s = re.sub(r"(?im)\s*-{3,}\s*([^-\n][^\n]{0,80}?)\s*-{3,}\s*", r"\n## \1\n\n", s)
    s = re.sub(r"(?m)^(\d+\.\s+[^:\n]+:)", r"**\1**", s)
    s = re.sub(r"\n{3,}", "\n\n", s)

    return s.strip()

def format_success(title: str, body_md_or_text: str) -> str:
    body = _normalize_agent_text_to_md(body_md_or_text)
    return f"# {title}\n\n{body}"

def format_error(err: Exception | str) -> str:
    msg = str(err)
    return (
        "## ❌ Error\n\n"
        f"{msg}\n\n"
        "> Tip: Check your API key in Settings, and verify your inputs."
    )
