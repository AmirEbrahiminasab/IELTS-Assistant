from langgraph.graph import StateGraph, START, END
from typing_extensions import Literal
from langchain_core.messages import HumanMessage, SystemMessage
import io
import sys

from .nodes import task_response, coherence_and_cohesion, lexical_resource, grammatical_range_and_accuracy, aggregator
from .state import State
from .workflow import workflow_fn
from .display_report import display_report_fn


def run_ielts_part2_agent(original_question: str, student_essay: str) -> str:
    """
    Runs the IELTS Part 2 agent and captures the output report as a string.
    """
    initial_state = {
        "original_question": original_question,
        "student_essay": student_essay
    }

    # Initialize the LangGraph workflow
    final_workflow = workflow_fn(State, task_response, lexical_resource, grammatical_range_and_accuracy,
                                 coherence_and_cohesion, aggregator)

    # Invoke the agent with the initial state
    final_state = final_workflow.invoke(initial_state)

    # --- Capture the printed output of display_report_fn ---
    old_stdout = sys.stdout
    sys.stdout = captured_output = io.StringIO()

    display_report_fn(final_state)  # This function now prints into our captured_output

    sys.stdout = old_stdout  # Restore standard output
    report_string = captured_output.getvalue()  # Get the string from the buffer

    return report_string


# This part is for your own direct testing of the script
if __name__ == "__main__":
    test_question = "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?"
    test_essay = "Community service is a noble act. I believe it should be mandatory for all high school students..."

    print("--- Running test for Part 2 ---")
    result = run_ielts_part2_agent(test_question, test_essay)
    print("\n--- Agent Result ---")
    print(result)
