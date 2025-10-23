# part1/main.py
import base64
import io
import sys
import os

# --- Assuming these are your existing, correct imports from your project ---
from .nodes import task_response, coherence_and_cohesion, lexical_resource, grammatical_range_and_accuracy, aggregator
from .state import State
from .workflow import workflow_fn
from .display_report import display_report_fn


def encode_image(image_path: str) -> str:
    """Encodes an image file to a base64 string."""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


def run_ielts_part1_agent(image_path: str, student_essay: str) -> str:
    """
    Runs the IELTS Part 1 agent with an image and text, returning the report as a string.
    """
    # 1. Encode the image provided by the user
    base64_image = encode_image(image_path)
    image_url = f"data:image/jpeg;base64,{base64_image}"  # Use jpeg as a common format

    # 2. Set up the initial state for the agentic workflow
    initial_state = {
        "image_url": image_url,
        "student_essay": student_essay
    }

    # 3. Initialize the LangGraph workflow
    final_workflow = workflow_fn(State, task_response, lexical_resource, grammatical_range_and_accuracy,
                                 coherence_and_cohesion, aggregator)

    # 4. Invoke the agent
    print("Invoking Part 1 agent workflow...")
    final_state = final_workflow.invoke(initial_state)
    print("Workflow complete.")

    # 5. Capture the printed output of your display_report_fn
    # This redirects the console output to a string variable
    old_stdout = sys.stdout
    sys.stdout = captured_output = io.StringIO()

    display_report_fn(final_state)

    sys.stdout = old_stdout  # Restore the standard output
    report_string = captured_output.getvalue()  # Get the report from the string buffer

    # 6. Return the captured report as a string
    return report_string


# This part is for your own direct testing of this script
if __name__ == "__main__":
    # To test this, you need a dummy image file named "task_image.png"
    # in the same directory.
    if not os.path.exists("task_image.png"):
        print("Creating a dummy 'task_image.png' for testing.")
        try:
            from PIL import Image, ImageDraw

            img = Image.new('RGB', (300, 150), color=(73, 109, 137))
            d = ImageDraw.Draw(img)
            d.text((10, 10), "Test Image for Part 1", fill=(255, 255, 0))
            img.save('task_image.png')
        except ImportError:
            print("Please install Pillow (`pip install Pillow`) to create a test image.")
            sys.exit(1)

    test_image_path = "task_image.png"
    test_essay = """The provided image shows a simple graph. From 1990 to 2010, the data increased significantly. This indicates a positive trend over the two decades shown in the chart."""

    print("--- Running standalone test for Part 1 ---")
    result = run_ielts_part1_agent(test_image_path, test_essay)
    print("\n--- Agent Result ---")
    print(result)

