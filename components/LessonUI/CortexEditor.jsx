"use client";
import { Sandpack, SandpackListener } from "@codesandbox/sandpack-react";
import { useCode } from "@/context/CodeContext";

export const CortexEditor = ({ code }) => {
  const { setActiveCode } = useCode();

  return (
    <div className="my-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl">
      <Sandpack
        template="react"
        theme="dark"
        files={{ "/App.js": code }}
        options={{ showConsole: true }}
      />
      {/* This invisible component listens to code changes */}
      <SandpackListener onChange={(newCode) => setActiveCode(newCode)} />

      <div className="bg-card p-2 border-t-2 border-foreground flex justify-end">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("ask-cortex"))}
          className="text-[10px] font-black uppercase px-3 py-1 bg-[#f378a5] border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
        >
          Ask Cortex about this code :3
        </button>
      </div>
    </div>
  );
};
