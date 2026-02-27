"use client";
import { useState, useMemo } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Eye,
  Terminal,
  RotateCcw,
  Columns,
  Sparkles,
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const CortexInternalAI = ({
  template,
  mainFile,
}: {
  template: string;
  mainFile: string;
}) => {
  const { sandpack } = useSandpack();
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const askCortex = async () => {
    setIsLoading(true);
    setFeedback("");
    const code = sandpack.files[mainFile]?.code || "";
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Analyze this ${template} code: \n\n${code}`,
            },
          ],
        }),
      });
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
        setFeedback(result);
      }
    } catch (err) {
      setFeedback("Link failed! :3");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t-4 border-foreground bg-[#FFFDF2] dark:bg-[#121212] p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border-2 border-foreground flex items-center justify-center bg-[#f378a5] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            :3
          </div>
          <span className="text-xs font-black uppercase tracking-widest">
            Cortex AI Feedback
          </span>
        </div>
        <button
          onClick={askCortex}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-[#a370f7] border-2 border-foreground text-xs font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 text-white"
        >
          {isLoading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Sparkles size={14} />
          )}
          Analyze Code
        </button>
      </div>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white dark:bg-zinc-900 border-2 border-foreground rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] prose dark:prose-invert max-w-none"
        >
          <ReactMarkdown>{feedback}</ReactMarkdown>
        </motion.div>
      )}
    </div>
  );
};

export function Playground({ config }: { config: any }) {
  const [showConsole, setShowConsole] = useState(false);
  const [viewMode, setViewMode] = useState<"split" | "editor" | "preview">(
    "split",
  );
  const [key, setKey] = useState(0);

  // MANUALLY SET BIGGER HEIGHT
  const EDITOR_HEIGHT = 700;

  const sandpackTheme = {
    colors: {
      surface1: "#161b22",
      surface2: "#21262d",
      base: "#e6edf3",
      clickable: "#8b949e",
      accent: "#a370f7",
    },
    font: { size: "14px", mono: '"JetBrains Mono", monospace' },
  };

  return (
    <div
      key={key}
      className="my-12 rounded-[2rem] overflow-hidden border-4 border-foreground bg-[#FFFDF2] dark:bg-[#121212] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.05)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 bg-[#FFFDF2] dark:bg-[#121212] border-b-4 border-foreground">
        <div className="flex items-center gap-4">
          <span className="text-3xl">{config.icon}</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">
              Environment
            </span>
            <span className="text-base font-black uppercase tracking-tight">
              {config.description}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white dark:bg-zinc-900 border-2 border-foreground rounded-xl p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setViewMode("editor")}
              className={`p-2 rounded-lg transition-all ${viewMode === "editor" ? "bg-[#a370f7] text-white" : "hover:bg-gray-100"}`}
            >
              <Code2 size={20} />
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`p-2 rounded-lg transition-all ${viewMode === "split" ? "bg-[#a370f7] text-white" : "hover:bg-gray-100"}`}
            >
              <Columns size={20} />
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`p-2 rounded-lg transition-all ${viewMode === "preview" ? "bg-[#a370f7] text-white" : "hover:bg-gray-100"}`}
            >
              <Eye size={20} />
            </button>
          </div>
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`p-3 border-2 border-foreground rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all ${showConsole ? "bg-[#f378a5] text-white" : "bg-white dark:bg-zinc-800"}`}
          >
            <Terminal size={20} />
          </button>
          <button
            onClick={() => setKey((k) => k + 1)}
            className="p-3 border-2 border-foreground rounded-xl bg-[#27c93f] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#22af37]"
          >
            <RotateCcw size={20} color="white" />
          </button>
        </div>
      </div>

      <SandpackProvider
        template={config.template}
        files={config.files}
        theme={sandpackTheme}
        options={{ activeFile: config.mainFile }}
      >
        <div
          className={`grid ${viewMode === "split" ? "lg:grid-cols-2" : "grid-cols-1"}`}
        >
          {viewMode !== "preview" && (
            <div
              className={
                viewMode === "split" ? "border-r-4 border-foreground" : ""
              }
            >
              <SandpackCodeEditor showLineNumbers height={EDITOR_HEIGHT} />
            </div>
          )}
          {viewMode !== "editor" && (
            <div className="bg-white">
              <SandpackPreview height={EDITOR_HEIGHT} showNavigator={false} />
            </div>
          )}
        </div>

        <AnimatePresence>
          {showConsole && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 250 }}
              exit={{ height: 0 }}
              className="border-t-4 border-foreground overflow-hidden"
            >
              <SandpackConsole height={250} />
            </motion.div>
          )}
        </AnimatePresence>

        <CortexInternalAI
          template={config.template}
          mainFile={config.mainFile}
        />
      </SandpackProvider>
    </div>
  );
}
