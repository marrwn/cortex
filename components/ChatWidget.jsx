"use client";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import ChatModal from "./ChatModal";

export default function ChatTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        // We removed bg-primary and added the inline style for the purple
        className="fixed bottom-8 right-8 p-5 border-4 border-foreground rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:scale-95 transition-all z-[90]"
        style={{ backgroundColor: "oklch(0.627 0.265 303.9)" }}
      >
        <MessageSquare size={32} className="text-black" strokeWidth={2.5} />
      </button>

      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
