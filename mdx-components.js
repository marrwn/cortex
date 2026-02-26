import { Terminal } from "lucide-react";

export function useMDXComponents(components) {
  return {
    // Custom Wrapper for those Yellow Info Boxes
    div: ({ children, className, ...props }) => {
      if (className?.includes("info-box")) {
        return (
          <div className="my-8 p-6 bg-[#F7DF1E] border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex gap-4 items-start text-black">
            <span className="text-2xl">📦</span>
            <div className="font-bold">{children}</div>
          </div>
        );
      }
      return (
        <div className={className} {...props}>
          {children}
        </div>
      );
    },

    // Styled Code Blocks (The Terminal Look)
    pre: ({ children }) => (
      <div className="relative my-6 group">
        <div className="absolute top-3 left-4 flex gap-1.5 z-10">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <pre className="bg-[#1A1A1A] text-[#E0E0E0] p-8 pt-12 rounded-3xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] overflow-x-auto font-mono text-sm">
          {children}
        </pre>
      </div>
    ),
    ...components,
  };
}
