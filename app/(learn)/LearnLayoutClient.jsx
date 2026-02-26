"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import SyllabusItem from "@/components/SyllabusItem.jsx";
import ChatWidget from "@/components/ChatWidget";

export default function LearnLayoutClient({ children, syllabusData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // --- NAVIGATION LOGIC ---
  const getFlatPages = (items) => {
    let flat = [];
    items.forEach((item) => {
      // Every folder or MDX file we found in the engine is a valid page
      if (item.href) {
        flat.push({ title: item.title, href: item.href });
      }
      if (item.children && item.children.length > 0) {
        flat = [...flat, ...getFlatPages(item.children)];
      }
    });
    return flat;
  };

  const pages = getFlatPages(syllabusData);
  const normalizedPath = pathname.replace(/\/$/, "");
  const currentIndex = pages.findIndex(
    (p) => p.href.replace(/\/$/, "") === normalizedPath,
  );

  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* SIDEBAR */}
      <aside
        className={`relative flex flex-col border-r border-border bg-card transition-all duration-500 ${isCollapsed ? "w-20" : "w-72"}`}
      >
        {/* LOGO: Swaps based on theme, Clickable to Home */}
        <Link
          href="/"
          className="h-32 flex items-center justify-center p-4 hover:scale-95 transition-transform"
        >
          <Image
            src={theme === "dark" ? "/cortex2.svg" : "/cortex.svg"}
            alt="Cortex"
            width={isCollapsed ? 45 : 180}
            height={60}
            priority
          />
        </Link>

        {/* NAVIGATION */}
        <div
          className={`flex-1 overflow-y-auto px-4 py-4 ${isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"}`}
        >
          {syllabusData.map((item, i) => (
            <SyllabusItem key={i} item={item} />
          ))}
        </div>

        {/* BOTTOM UTILS - SIDE BY SIDE */}
        <div
          className={`p-6 border-t border-border flex items-center justify-center gap-4 ${isCollapsed ? "flex-col" : "flex-row"}`}
        >
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-xl hover:bg-muted text-muted-foreground transition-all"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-3 rounded-xl hover:bg-muted text-muted-foreground transition-all"
          >
            {isCollapsed ? (
              <ChevronRight size={24} />
            ) : (
              <ChevronLeft size={24} />
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto flex flex-col">
        <div className="max-w-4xl mx-auto w-full p-8 lg:p-16 flex-1 flex flex-col">
          <article className="prose prose-neutral dark:prose-invert max-w-none flex-1">
            {children}
          </article>

          {/* NEXT/PREV NAVIGATION BUTTONS */}
          <footer className="mt-20 pt-10 border-t border-border flex justify-between items-center pb-20">
            {prevPage ? (
              <Link
                href={prevPage.href}
                className="group flex flex-col items-start gap-1 p-5 rounded-2xl hover:bg-muted transition-all border border-transparent hover:border-border"
              >
                <span className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                  <ArrowLeft size={14} /> Previous
                </span>
                <span className="text-xl font-pixel uppercase">
                  {prevPage.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPage ? (
              <Link
                href={nextPage.href}
                className="group flex flex-col items-end gap-1 p-5 rounded-2xl hover:bg-muted transition-all border border-transparent hover:border-border text-right"
              >
                <span className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                  Next <ArrowRight size={14} />
                </span>
                <span className="text-xl font-pixel uppercase">
                  {nextPage.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </footer>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
