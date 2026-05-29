from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # <-- ADD THIS IMPORT
from pydantic import BaseModel
from app.workflow import migration_app

app = FastAPI(title="Multi-Agent Code Migration Suite")

# --- ADD THIS CORS CONFIGURATION BLOCK ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], # Your Vite Frontend URLs
    allow_credentials=True,
    allow_methods=["*"], # Allows POST, GET, OPTIONS, etc.
    allow_headers=["*"], # Allows all custom headers
)
# ----------------------------------------

class MigrationRequest(BaseModel):
    legacy_code: str

@app.post("/api/migrate")
async def migrate_code(request: MigrationRequest):
    try:
        initial_state = {
            "legacy_code": request.legacy_code,
            "modern_code": "",
            "unit_tests": "",
            "test_feedback": "",
            "iteration_count": 0,
            "status": "pending"
        }
        
        final_state = migration_app.invoke(initial_state)
        
        return {
            "status": final_state["status"],
            "modern_code": final_state["modern_code"],
            "unit_tests": final_state["unit_tests"],
            "feedback": final_state["test_feedback"]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))