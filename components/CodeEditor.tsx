import { lazy, Suspense } from "react";

const MonacoEditor = lazy(() => import("monaco-editor"));

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function EditorLoading() {
  return (
    <div className="flex h-[400px] items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-green-400" />
        <span className="text-sm text-zinc-500">Loading editor...</span>
      </div>
    </div>
  );
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800">
      {/* Editor top bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-3 text-xs font-mono text-zinc-500">script.js</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-glow" />
          <span className="text-xs text-zinc-600">Ready</span>
        </div>
      </div>

      {/* Monaco Editor */}
      <Suspense fallback={<EditorLoading />}>
        <MonacoEditor
          height="400px"
          language="javascript"
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val ?? "")}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            wordWrap: "on",
            tabSize: 2,
            renderWhitespace: "none",
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            contextmenu: false,
            folding: true,
            lineDecorationsWidth: 8,
          }}
        />
      </Suspense>
    </div>
  );
}
