from typing import TypedDict, Dict, Any

from langgraph.graph import StateGraph, END
import os

# 1. Define the shared data structure (State)
class MigrationState(TypedDict):
    legacy_code: str
    modern_code: str
    unit_tests: str
    test_feedback: str
    iteration_count: int
    status: str

# 2. Define the Node Functions
def legacy_architect_node(state: MigrationState) -> Dict[str, Any]:
    print("--- [Agent 1] Analyzing Legacy Logic ---")
    # In reality, you'd call your LLM here. Let's simulate its output documentation.
    # blueprint = llm.invoke(f"Analyze this code: {state['legacy_code']}")
    return {"iteration_count": 0}

def modernizer_node(state: MigrationState) -> Dict[str, Any]:
    print(f"--- [Agent 2] Writing/Refactoring Code (Attempt {state['iteration_count'] + 1}) ---")
    
    # Simulating LLM code generation. 
    # If state['test_feedback'] has errors, the LLM uses it to rewrite the code.
    generated_code = "def add_numbers(a: int, b: int) -> int:\n    return a + b" 
    
    # Save code locally into your _sandbox folder
    sandbox_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "_sandbox"))
    with open(os.path.join(sandbox_dir, "migrated_code.py"), "w") as f:
        f.write(generated_code)
        
    return {"modern_code": generated_code, "iteration_count": state['iteration_count'] + 1}

def qa_node(state: MigrationState) -> Dict[str, Any]:
    print("--- [Agent 3] Writing Unit Tests & Running Verification ---")
    
    # Simulating LLM test generation
    generated_tests = """
import pytest
from migrated_code import add_numbers

def test_add_numbers():
    assert add_numbers(2, 3) == 5
"""
    # Save tests locally into your _sandbox folder
    sandbox_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "_sandbox"))
    with open(os.path.join(sandbox_dir, "test_migrated.py"), "w") as f:
        f.write(generated_tests)
        
    # Import and run your local runner function
    from app.runner import run_code_tests
    test_result = run_code_tests()
    
    return {
        "unit_tests": generated_tests, 
        "test_feedback": test_result["feedback"], 
        "status": test_result["status"]
    }

# 3. Define the Conditional Routing Logic
def route_after_testing(state: MigrationState) -> str:
    if state["status"] == "success":
        print("🎉 SUCCESS: Code passed all tests!")
        return "complete"
    elif state["iteration_count"] >= 3:
        print("🛑 HALT: Reached maximum debugging iterations (3).")
        return "complete"
    else:
        print("❌ FAILED: Sending error logs back to Modernizer Agent...")
        return "retry"

# 4. Assemble the Graph
workflow = StateGraph(MigrationState)

# Add our active workers
workflow.add_node("architect", legacy_architect_node)
workflow.add_node("modernizer", modernizer_node)
workflow.add_node("qa_engine", qa_node)

# Connect the paths
workflow.set_entry_point("architect")
workflow.add_edge("architect", "modernizer")
workflow.add_edge("modernizer", "qa_engine")

# Define the dynamic loop based on test output
workflow.add_conditional_edges(
    "qa_engine",
    route_after_testing,
    {
        "retry": "modernizer",   # Loops back to rewrite code
        "complete": END          # Exits the engine
    }
)

# Compile the execution graph
migration_app = workflow.compile()