"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Folder,
  FileText,
  ChevronDown,
  ChevronRight,
  Code2,
  Terminal,
  Cpu,
} from "lucide-react";

export default function SyllabusItem({ item, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;

  const getIcon = () => {
    if (hasChildren)
      return (
        <Folder
          size={18}
          className={isActive ? "text-primary" : "text-muted-foreground"}
        />
      );
    if (item.title.includes("JS")) return <Code2 size={18} />;
    if (item.title.includes("TS")) return <Cpu size={18} />;
    return <FileText size={18} />;
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex items-center rounded-lg transition-all mb-0.5 ${isActive ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted text-muted-foreground hover:text-foreground"} ${depth > 0 ? "ml-4" : ""}`}
      >
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="pl-2 hover:text-primary"
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        <Link
          href={item.href || "#"}
          className="flex items-center gap-3 flex-1 p-2.5 text-xs uppercase tracking-widest"
        >
          {getIcon()}
          <span className="truncate">{item.title}</span>
        </Link>
      </div>
      {hasChildren && isOpen && (
        <div className="flex flex-col mt-0.5">
          {item.children.map((child, i) => (
            <SyllabusItem key={i} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
