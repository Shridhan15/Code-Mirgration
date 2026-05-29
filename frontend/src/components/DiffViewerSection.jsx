import React from "react";
import ReactDiffViewer from 'react-diff-viewer-continued';
import { Download, Code2 } from "lucide-react";

export default function DiffViewerSection({
  oldCode,
  newCode,
  onExport,
  hasData,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code2 size={18} className="text-indigo-400" />
          <h2 className="text-sm font-semibold text-white">
            Migration Diff Workspace
          </h2>
        </div>
        {hasData && (
          <button
            onClick={onExport}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition shadow-md shadow-indigo-900/20"
          >
            <Download size={14} />
            <span>Export Clean Repository</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto bg-slate-950 p-4 min-h-[400px]">
        {hasData ? (
          <div className="rounded-lg overflow-hidden border border-slate-800 text-xs">
            <ReactDiffViewer
              oldValue={oldCode}
              newValue={newCode}
              splitView={true}
              leftTitle="Legacy Input Source"
              rightTitle="Modern Standard (Python 3.11/12 Target)"
              useDarkTheme={true}
              styles={{
                variables: {
                  dark: {
                    diffViewerBackground: "#020617",
                    gutterBackground: "#0f172a",
                    gutterColor: "#64748b",
                    codeFoldBackground: "#0f172a",
                  },
                },
              }}
            />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
              <Code2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300">
                Workspace Vacant
              </p>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Upload your outdated legacy module via the controls on the left
                to activate the AI compilation nodes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
