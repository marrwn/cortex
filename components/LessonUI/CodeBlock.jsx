const CodeBlock = ({ code, fileName = "script.js" }) => (
  <div className="my-8 border-4 border-black bg-[#1e1e1e] rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden font-mono">
    <div className="bg-[#2d2d2d] px-4 py-2 border-b-4 border-black flex justify-between items-center">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
      </div>
      <span className="text-[10px] text-neutral-400 uppercase italic">
        {fileName}
      </span>
    </div>
    <pre className="p-6 text-sm md:text-base text-white overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

export default CodeBlock;
