import subprocess
import os

def run_code_tests():
    # Target our local workspace folder
    sandbox_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "_sandbox"))
    
    try:
        # Run pytest inside the local _sandbox folder
        # timeout=10 prevents infinite loops from freezing your computer
        result = subprocess.run(
            ["pytest", "test_migrated.py"],
            cwd=sandbox_dir,
            capture_output=True,
            text=True,
            timeout=10 
        )
        
        if result.returncode == 0:
            return {"status": "success", "feedback": "All tests passed successfully!"}
        else:
            # Tests failed. Combine standard output and error text for the agent
            error_log = result.stdout + "\n" + result.stderr
            return {"status": "failed", "feedback": error_log}
            
    except subprocess.TimeoutExpired:
        return {"status": "failed", "feedback": "ERROR: Execution timed out (Potential Infinite Loop detected)."}
    except Exception as e:
        return {"status": "failed", "feedback": f"Execution Error: {str(e)}"}