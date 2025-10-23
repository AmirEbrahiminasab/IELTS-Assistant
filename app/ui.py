from __future__ import annotations
import gradio as gr
from core.config import get_api_key, set_api_key, ENV_VAR_NAME
from core.pipeline import analyze_part1, analyze_part2
from core.logging_config import configure_logging
import logging


configure_logging()
logger = logging.getLogger(__name__)




def _check_api_key_or_raise():
    if not get_api_key():
    raise RuntimeError(
    f"No API key found. Go to the Settings tab and set {ENV_VAR_NAME}."
    )




def on_save_key(key: str):
    set_api_key(key)
    return gr.update(value="**Saved!** Your API key is now configured.")




def on_analyze_part1(image_path, essay):
    _check_api_key_or_raise()
    if not image_path:
        raise ValueError("Please upload the Task 1 image/chart/graph.")
    if not essay or len(essay.strip()) < 30:
        raise ValueError("Please paste your full Task 1 response (at least 30 chars).")
    
    logger.info("UI: analyze_part1 invoked")
    return analyze_part1(image_path, essay)




def on_analyze_part2(question, essay):
    _check_api_key_or_raise()
    if not question or len(question.strip()) < 10:
        raise ValueError("Please paste the Task 2 question.")
    if not essay or len(essay.strip()) < 30:
        raise ValueError("Please paste your full Task 2 essay (at least 30 chars).")
    
    logger.info("UI: analyze_part2 invoked")
    return analyze_part2(question, essay)




with gr.Blocks(title="IELTS Writing Assistant", fill_height=True) as demo:
    gr.Markdown("""
    # IELTS Writing Assistant
    Local-first app using your existing agents. Your key never leaves your machine on local runs.
    """)


with gr.Tab("Task 1"):
    with gr.Row():
        image = gr.Image(type="filepath", label="Task 1 Image/Chart/Graph")
        essay1 = gr.Textbox(label="Your Task 1 Essay", lines=18, placeholder="Paste your full Task 1 response here…")
    with gr.Row():
        btn1 = gr.Button("Analyze", variant="primary")
        clear1 = gr.Button("Clear")
        demo.launch()