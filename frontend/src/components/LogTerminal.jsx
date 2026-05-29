import React from "react";
import {
  TerminalSquare,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function LogTerminal({ logs, status }) {
  return (
    <div className="bg-black border border-slate-800 rounded-xl overflow-hidden h-full flex flex-col font-mono shadow-2xl">
      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <TerminalSquare size={14} className="text-indigo-400" />
          <span>Swarm Execution Stream</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto text-xs space-y-3 min-h-[180px] max-h-[300px] lg:max-h-none">
        {logs.map((log, index) => (
          <div
            key={index}
            className="flex items-start space-x-2 text-slate-300"
          >
            <span className="text-indigo-500 select-none">&gt;</span>
            <p className="leading-relaxed whitespace-pre-wrap">{log}</p>
          </div>
        ))}

        {status === "processing" && (
          <div className="flex items-center space-x-2 text-indigo-400 animate-pulse text-xs">
            <Loader2 size={12} className="animate-spin" />
            <span>Agent swarm refactoring & running tests...</span>
          </div>
        )}
        {status === "success" && (
          <div className="flex items-center space-x-2 text-emerald-400 text-xs bg-emerald-950/30 p-2 rounded border border-emerald-900/50">
            <CheckCircle2 size={14} />
            <span>
              Success: Migration loop complete. Code successfully verified!
            </span>
          </div>
        )}
        {status === "failed" && (
          <div className="flex items-center space-x-2 text-amber-400 text-xs bg-amber-950/30 p-2 rounded border border-amber-900/50">
            <AlertTriangle size={14} />
            <span>
              Halt: Iteration threshold reached or pipeline failed. Check
              terminal variables.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
