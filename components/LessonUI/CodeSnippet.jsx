import { Code2, Copy } from "lucide-react";

export const CodeSnippet = ({ code, language = "JS" }) => (
  <div className="border-2 border-foreground rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] my-6">
    <div className="bg-foreground text-background px-4 py-2 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Code2 size={14} />
        <span className="text-[10px] font-black uppercase tracking-widest">
          {language} Output
        </span>
      </div>
      <button className="hover:text-[#a370f7] transition-colors">
        <Copy size={14} />
      </button>
    </div>
    <pre className="p-4 bg-muted font-mono text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);
