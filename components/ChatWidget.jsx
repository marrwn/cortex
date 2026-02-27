"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Sparkles,
  Loader2,
  PanelRight,
  MessageCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDocked, setIsDocked] = useState(false); // New Docking State
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am **Cortex AI**. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value);

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              { ...last, content: assistantContent },
            ];
          }
          return prev;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: "err",
          role: "assistant",
          content: "Error connecting to Cortex.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[999] p-4 bg-[#a370f7] border-2 border-foreground rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
        >
          <MessageCircle size={24} color="black" />
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed z-[1000] transition-all duration-300 ease-in-out flex items-center justify-center p-4
          ${isDocked ? "inset-y-0 right-0 w-full md:w-[400px] p-0" : "inset-0"}`}
        >
          {/* Only show overlay if NOT docked */}
          {!isDocked && (
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
          )}

          <div
            className={`relative w-full flex flex-col bg-background border-l-2 md:border-2 border-foreground shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all
            ${isDocked ? "h-screen border-y-0 border-r-0 shadow-none" : "max-w-3xl h-[85vh] rounded-2xl"}`}
          >
            {/* Header */}
            <div className="bg-[#a370f7] p-4 border-b-2 border-foreground flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest text-black">
                <img
                  src="/cortexai.png"
                  alt="Cortex"
                  className="w-6 h-6 object-contain"
                />{" "}
                Cortex AI
              </div>
              <div className="flex items-center gap-3">
                {/* Dock Button - Hidden on Mobile */}
                <button
                  onClick={() => setIsDocked(!isDocked)}
                  className="hidden md:block p-1 hover:bg-black/10 rounded transition-colors"
                  title={isDocked ? "Undock" : "Dock to side"}
                >
                  <PanelRight
                    size={20}
                    className={isDocked ? "rotate-180" : ""}
                  />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-black/10 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-8 bg-background scrollbar-hide"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse text-right" : "flex-row"}`}
                >
                  {/* Avatar Section */}
                  <div
                    className={`w-10 h-10 rounded-lg border-2 border-foreground flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white`}
                  >
                    {m.role === "user" ? (
                      <div className="bg-[#a370f7] w-full h-full flex items-center justify-center text-black font-black">
                        U
                      </div>
                    ) : (
                      <img
                        src="/cortexai.png"
                        alt="AI"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Content Section */}
                  <div
                    className={`flex-1 space-y-1 ${m.role === "user" ? "max-w-[80%]" : "max-w-[90%]"}`}
                  >
                    <div className="text-[10px] font-black uppercase opacity-40">
                      {m.role === "user" ? "You" : "Cortex"}
                    </div>
                    <div
                      className={`prose prose-sm dark:prose-invert max-w-none font-medium text-foreground
                      ${m.role === "user" ? "ml-auto" : ""}`}
                    >
                      <ReactMarkdown
                        components={{
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            const match = /language-(\w+)/.exec(
                              className || "",
                            );
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={atomDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg border-2 border-foreground my-4 text-left"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code
                                className="bg-muted px-1 rounded border border-foreground/20"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-[#a370f7]">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">
                    Calculating...
                  </span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-4 md:p-6 border-t-2 border-foreground bg-card"
            >
              <div className="flex gap-2 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Cortex..."
                  className="flex-1 px-4 py-3 border-2 border-foreground rounded-xl bg-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-4 bg-[#a370f7] border-2 border-foreground rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none disabled:opacity-50"
                >
                  <Send size={18} color="black" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
