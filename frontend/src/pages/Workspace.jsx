import React, { useState } from "react";
import Header from "../components/Header";
import LogTerminal from "../components/LogTerminal";
import DiffViewerSection from "../components/DiffViewerSection";
import { UploadCloud, Play } from "lucide-react";

export default function Workspace() {
  const [legacyCode, setLegacyCode] = useState("");
  const [modernCode, setModernCode] = useState("");
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | processing | success | failed

  const handleMigration = async () => {
    if (!legacyCode.trim()) return;

    setStatus("processing");
    setLogs([
      "Initial Connection Established.",
      "[Agent 1: Legacy Architect] Structural compilation initialized...",
      "[Agent 1] Completed structural overview. Abstract syntax dictionary generated.",
      "[Agent 2: Modernizer] Rewriting legacy tokens into clean target blocks...",
    ]);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/migrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ legacy_code: legacyCode }),
      });

      if (!response.ok)
        throw new Error("Backend internal compilation loop break.");
      const data = await response.json();

      setLogs((prev) => [
        ...prev,
        "[Agent 2] Modernization syntax write operation complete.",
        "[Agent 3: QA Automation] Launching validation processes inside local environment...",
        `[Agent 3] Sandbox test execution log output:\n${data.feedback}`,
      ]);

      setModernCode(data.modern_code);
      setStatus(data.status === "success" ? "success" : "failed");
    } catch (error) {
      setLogs((prev) => [
        ...prev,
        `[System Error]: Critical crash: ${error.message}`,
      ]);
      setStatus("failed");
    }
  };

  const handleExport = () => {
    const blob = new Blob([modernCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modernized_code.py";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] w-full mx-auto">
        {/* Left Interactive Control Dashboard */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col flex-1 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <UploadCloud size={16} className="text-indigo-400" />
              <label className="text-sm font-semibold text-slate-200">
                Input Source Repository File
              </label>
            </div>

            <textarea
              value={legacyCode}
              onChange={(e) => setLegacyCode(e.target.value)}
              placeholder="Paste legacy modules or raw target statements here (e.g., Python 2, old functional script paradigms)..."
              className="flex-1 min-h-[200px] bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500 resize-none transition"
            />

            <button
              onClick={handleMigration}
              disabled={status === "processing"}
              className="w-full mt-4 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-medium text-sm py-3 rounded-lg transition shadow-lg shadow-indigo-950/50"
            >
              <Play size={14} />
              <span>
                {status === "processing"
                  ? "Processing Code Pipeline..."
                  : "Execute Modernization Swarm"}
              </span>
            </button>
          </div>

          <div className="lg:h-[350px]">
            <LogTerminal logs={logs} status={status} />
          </div>
        </div>

        {/* Right Output Workspace Panel */}
        <div className="lg:col-span-8 h-full">
          <DiffViewerSection
            oldCode={legacyCode}
            newCode={modernCode}
            onExport={handleExport}
            hasData={!!modernCode}
          />
        </div>
      </main>
    </div>
  );
}
