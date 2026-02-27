const AnalogyCard = ({ title, children, emoji, color = "#B191FF" }) => (
  <div
    className="my-6 p-6 border-4 border-black rounded-[32px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
    style={{ backgroundColor: color }}
  >
    <div className="absolute -top-2 -right-2 text-4xl opacity-20 rotate-12">
      {emoji}
    </div>
    <h4 className="font-pixel text-xl text-black uppercase mb-3 flex items-center gap-2">
      {emoji} {title}
    </h4>
    <div className="font-bold text-black leading-tight">{children}</div>
  </div>
);

export default AnalogyCard;
