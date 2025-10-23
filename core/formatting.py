def format_success(title: str, body_md: str) -> str:
return f"# {title}\n\n" + body_md.strip()




def format_error(err: Exception | str) -> str:
msg = str(err)
return (
"## ❌ Error\n\n"
f"{msg}\n\n"
"> Tip: Check your API key in Settings, and verify your inputs."
)