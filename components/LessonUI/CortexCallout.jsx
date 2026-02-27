export const CortexCallout = ({ children }) => (
  <div className="flex gap-4 bg-[#f378a5]/10 border-2 border-foreground p-4 rounded-xl my-6">
    <div className="w-10 h-10 rounded-lg border-2 border-foreground flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-[#f378a5] text-white font-black">
      :3
    </div>
    <div className="flex-1">
      <span className="text-[10px] font-black uppercase text-[#f378a5] tracking-widest block mb-1">
        Cortex Insight
      </span>
      <div className="text-sm font-bold italic leading-snug">"{children}"</div>
    </div>
  </div>
);
