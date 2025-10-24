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

APP_CSS = """
#out1 h2, #out2 h2 { border-bottom: 1px solid #eaecef; padding-bottom: 2px; }
#out1 blockquote, #out2 blockquote {
  border-left: 3px solid #ddd; padding: .5rem 1rem; color: #555; background: #fafafa;
}
#out1, #out2 { max-width: 900px; }

#mahak-center { display: flex; justify-content: center; }
"""

with gr.Blocks(title="IELTS Writing Assistant", fill_height=True, css=APP_CSS) as demo:
    gr.Markdown("# IELTS Writing Assistant.")
    gr.Markdown("---") 
    gr.Markdown(
            """
**How to use (and privacy):**  
Go to the **Settings** tab → paste your **Google API key** from **Google AI Studio** → click **Save Key**.  
The key is stored **locally** on your machine (in `.env`) and is **not shared** with anyone else (including me).

**Task 1:** upload the image/chart and paste your full response.  
**Task 2:** paste the question and your full response.  

**About the grade:** expect about **±0.5 band** error. Please treat the **written feedback and tips** as more important than the numeric grade.
            """,
            line_breaks=True
        )

    with gr.Tab("Task 1"):
        with gr.Row():
            image = gr.Image(type="filepath", label="Task 1 Image/Chart/Graph")
            essay1 = gr.Textbox(label="Your Task 1 Essay", lines=18, placeholder="Paste your full Task 1 response here…")
        with gr.Row():
            btn1 = gr.Button("Analyze", variant="primary")
            clear1 = gr.Button("Clear")
        out1 = gr.Markdown(label="Feedback", elem_id="out1", line_breaks=True)

    with gr.Tab("Task 2"):
        question = gr.Textbox(label="Task 2 Question", lines=4, placeholder="Paste the question here…")
        essay2 = gr.Textbox(label="Your Task 2 Essay", lines=18, placeholder="Paste your full Task 2 response here…")
        with gr.Row():
            btn2 = gr.Button("Analyze", variant="primary")
            clear2 = gr.Button("Clear")
        out2 = gr.Markdown(label="Feedback", elem_id="out2", line_breaks=True)

    with gr.Tab("Settings"):
        gr.Markdown(f"Set your API key. This will be saved to `.env` as `{ENV_VAR_NAME}`.")
        key_box = gr.Textbox(label=f"{ENV_VAR_NAME}", type="password", placeholder="AIza-… (your Google API key)")
        save_btn = gr.Button("Save Key", variant="secondary")
        status = gr.Markdown("\n")

    # wire up events
    clear1.click(lambda: (None, "", ""), inputs=None, outputs=[image, essay1, out1])
    clear2.click(lambda: ("", ""), inputs=None, outputs=[question, out2])
    save_btn.click(on_save_key, inputs=[key_box], outputs=[status])

    btn1.click(
        fn=lambda: (gr.update(value="⏳ Analyzing Task 1…"), gr.update(interactive=False)),
        inputs=None,
        outputs=[out1, btn1],
        queue=False,
    ).then(
        fn=on_analyze_part1,
        inputs=[image, essay1],
        outputs=[out1],
    ).then(
        fn=lambda: gr.update(interactive=True),
        inputs=None,
        outputs=[btn1],
    )

    btn2.click(
        fn=lambda: (gr.update(value="⏳ Analyzing Task 2…"), gr.update(interactive=False)),
        inputs=None,
        outputs=[out2, btn2],
        queue=False,
    ).then(
        fn=on_analyze_part2,
        inputs=[question, essay2],
        outputs=[out2],
    ).then(
        fn=lambda: gr.update(interactive=True),
        inputs=None,
        outputs=[btn2],
    )

    gr.HTML("""
<a href="https://mahak-charity.org/online-payment/" target="_blank" rel="noopener noreferrer">
  <img
    src="https://mahak-charity.org/wp-content/themes/kalhors-mahak/images/logo.svg"
    alt="Donate to Mahak Charity"
    height="40"
  />
</a>
""", elem_id="mahak-center")





if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=7860)
