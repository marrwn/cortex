"use client";

import { useState } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { AlertCircle, Loader2, Code2, Play } from "lucide-react";
import ReactMarkdown from "react-markdown";

/**
 * INTERNAL COMPONENT: CortexFeedback
 * Handles the communication with your Zhipu AI backend
 */
const CortexFeedback = ({ template }) => {
  const { sandpack } = useSandpack();
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const analyzeCode = async () => {
    setIsLoading(true);
    setFeedback("");

    // Logic to find the primary file based on template
    const mainFile = template === "react" ? "/App.js" : "/index.js";
    const code = sandpack.files[mainFile]?.code || "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `I am using a ${template} environment. Here is my code:\n\n\`\`\`javascript\n${code}\n\`\`\`\n\nExplain if there are errors or how to optimize this. Keep it concise. :3`,
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
      setFeedback("Cortex Link Offline. Verify your API configuration. :3");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t-4 border-foreground bg-[#fff] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border-2 border-foreground flex items-center justify-center bg-[#f378a5] text-white text-lg font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            :3
          </div>
          <div>
            <span className="text-[12px] font-black uppercase tracking-widest block leading-none">
              Cortex Intelligence
            </span>
            <span className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">
              Status: Monitoring {template}
            </span>
          </div>
        </div>

        <button
          onClick={analyzeCode}
          disabled={isLoading}
          className="group flex items-center gap-2 px-6 py-3 bg-[#a370f7] border-2 border-foreground text-xs font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <AlertCircle size={16} />
          )}
          Analyze Code
        </button>
      </div>

      {feedback && (
        <div className="p-5 bg-[#f3f4f6] border-2 border-foreground rounded-2xl text-sm font-medium leading-relaxed prose prose-sm max-w-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-in fade-in slide-in-from-bottom-2">
          <ReactMarkdown>{feedback}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

/**
 * EXPORTED COMPONENT: CortexLesson
 * The main component to use in your MDX files
 */
export const CortexLesson = ({ code, template = "vanilla" }) => {
  const fileName = template === "react" ? "/App.js" : "/index.js";

  const files = {
    [fileName]: code,
  };

  if (template === "vanilla") {
    files["/index.html"] =
      `<div id="app"></div>\n<script src="index.js"></script>`;
  }

  return (
    <div className="my-12 border-4 border-foreground shadow-[16px_16px_0px_0px_rgba(163,112,247,0.3)] rounded-3xl overflow-hidden bg-background">
      {/* Header Bar */}
      <div className="bg-foreground text-background p-3 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Code2 size={18} className="text-[#a370f7]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Cortex Interactive Workspace
          </span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/20" />
        </div>
      </div>

      <SandpackProvider
        template={template}
        theme="dark"
        files={files}
        options={{
          editorHeight: 600,
          editorWidthPercentage: 65,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Code Editor Side */}
          <div className="border-b-4 lg:border-b-0 lg:border-r-4 border-foreground">
            <SandpackCodeEditor
              showTabs={false}
              height={600}
              showLineNumbers
              closableTabs={false}
            />
          </div>

          {/* Preview Side */}
          <div className="bg-white flex flex-col relative">
            <div className="absolute top-4 right-4 z-10 opacity-30 pointer-events-none">
              <Play size={40} />
            </div>
            <SandpackPreview
              height={600}
              showNavigator={false}
              showConsoleButton
            />
          </div>
        </div>

        {/* AI Feedback Panel */}
        <CortexFeedback template={template} />
      </SandpackProvider>
    </div>
  );
};
