import { BookOpen } from "lucide-react";

export const ConceptCard = ({ title, description, category }) => (
  <div className="group relative bg-white border-2 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
    <div className="absolute -top-3 left-4 bg-[#a370f7] border-2 border-foreground px-2 py-1 text-[10px] font-black uppercase tracking-widest">
      {category}
    </div>
    <div className="flex text-black items-start justify-between mb-4">
      <h3 className="text-xl font-black uppercase leading-tight">{title}</h3>
      <BookOpen size={24} />
    </div>
    <p className="text-sm text-black font-medium leading-relaxed opacity-80">
      {description}
    </p>
  </div>
);
