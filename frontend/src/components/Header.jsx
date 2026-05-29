import React from "react";
import { Terminal, Cpu, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <Terminal size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            RefactorSwarm
          </h1>
          <p className="text-xs text-slate-400">
            Multi-Agent Code Migration Suite
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-xs text-slate-300">
        <div className="flex items-center space-x-1 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          <Cpu size={14} className="text-emerald-400 animate-pulse" />
          <span>Agents: Active</span>
        </div>
        <div className="flex items-center space-x-1 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          <ShieldCheck size={14} className="text-indigo-400" />
          <span>Local Sandbox Enabled</span>
        </div>
      </div>
    </header>
  );
}
