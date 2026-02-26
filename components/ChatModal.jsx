"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { X, Send } from "lucide-react";

export default function ChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input.trim() };
    const currentHistory = [...messages, userMsg];

    setMessages(currentHistory);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentHistory }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, data]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "**Cortex Error:** Check connection or API status.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      {/* Main Container - Brutalist DNA */}
      <div className="w-full max-w-3xl h-[85vh] bg-card border-[4px] border-foreground rounded-[32px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative">
        {/* Header - Forced Purple Background */}
        <div
          className="px-6 py-4 border-b-[4px] border-foreground flex justify-between items-center"
          style={{ backgroundColor: "oklch(0.627 0.265 303.9)" }}
        >
          <div className="flex items-center gap-3">
            <span className="font-black uppercase tracking-tighter text-black italic text-xl">
              Cortex Intelligence
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:rotate-90 transition-transform bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <X size={20} className="text-black" strokeWidth={3} />
          </button>
        </div>

        {/* Chat Body */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-background p-6 space-y-8 scrollbar-hide"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 grayscale">
              <div className="w-16 h-16 border-4 border-foreground bg-primary mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
              <p className="font-black uppercase text-sm tracking-[0.2em]">
                System Idle
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* AI PFP - Block Style */}
              {m.role === "assistant" && (
                <div
                  className="w-10 h-10 flex-shrink-0 border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white"
                  style={{ backgroundColor: "oklch(0.627 0.265 303.9)" }}
                >
                  {/* Swap out with your actual image path */}
                  <img
                    src="/cortexai.png"
                    alt="AI"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] p-4 border-[3px] border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl ${
                  m.role === "user"
                    ? "text-black font-bold"
                    : "bg-muted text-foreground"
                }`}
                style={
                  m.role === "user"
                    ? { backgroundColor: "oklch(0.627 0.265 303.9)" }
                    : {}
                }
              >
                <article className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-code:bg-black/20 prose-code:p-1 prose-code:rounded prose-pre:bg-black prose-pre:border-2 prose-pre:border-foreground">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </article>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs font-black uppercase text-foreground animate-pulse">
              <div
                className="w-3 h-3 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: "oklch(0.627 0.265 303.9)" }}
              />
              Cortex is thinking...
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-6 bg-card border-t-[4px] border-foreground">
          <div className="relative flex items-center max-w-2xl mx-auto">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Query the Cortex..."
              className="w-full p-4 pr-16 bg-background border-[3px] border-foreground rounded-xl font-bold text-sm outline-none focus:ring-4 ring-foreground/10 transition-all placeholder:text-foreground/30"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 p-2 border-[3px] border-foreground rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-30"
              style={{ backgroundColor: "oklch(0.627 0.265 303.9)" }}
            >
              <Send size={20} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
