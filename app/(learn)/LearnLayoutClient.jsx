"use client";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sun, Moon, Menu, X } from "lucide-react";
import SyllabusItem from "@/components/SyllabusItem.jsx";
import ChatWidget from "@/components/ChatWidget";

export default function LearnLayoutClient({ children, syllabusData = [] }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  const pages = useMemo(() => {
    const flat = [];
    const flatten = (items) => {
      if (!Array.isArray(items)) return;
      items.forEach((item) => {
        if (item?.href) flat.push({ title: item.title, href: item.href });
        if (item?.children) flatten(item.children);
      });
    };
    flatten(syllabusData);
    return flat;
  }, [syllabusData]);

  if (!mounted) return null;

  const currentIndex = pages.findIndex(
    (p) => p.href.replace(/\/$/, "") === pathname.replace(/\/$/, ""),
  );
  const prevPage = pages[currentIndex - 1];
  const nextPage = pages[currentIndex + 1];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FFFDF2] dark:bg-[#121212] text-foreground transition-colors duration-300 font-sans">
      {/* 1. MOBILE HEADER */}
      {!isMobileMenuOpen && (
        <header className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between p-4 border-b-4 border-foreground bg-[#FFFDF2] dark:bg-[#121212] z-[50]">
          <Link href="/">
            <Image
              src={theme === "dark" ? "/cortex2.svg" : "/cortex.svg"}
              alt="Logo"
              width={120}
              height={32}
              className="h-auto"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 border-2 border-foreground rounded-lg bg-[#a370f7] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <Menu
              size={24}
              color={theme === "dark" ? "white" : "black"}
              strokeWidth={3}
            />
          </button>
        </header>
      )}

      {/* 2. SIDEBAR */}
      <aside
        className={`
        fixed md:relative inset-y-0 left-0 z-[100] bg-[#FFFDF2] dark:bg-[#121212] border-r-4 border-foreground flex flex-col h-full transition-all duration-300
        ${isMobileMenuOpen ? "translate-x-0 w-[85%] sm:w-80" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "md:w-20" : "md:w-80"}
      `}
      >
        <div className="flex h-24 items-center justify-center border-b-2 border-foreground/10 shrink-0 overflow-hidden">
          <Link href="/">
            <Image
              src={theme === "dark" ? "/cortex2.svg" : "/cortex.svg"}
              alt="Logo"
              width={isCollapsed ? 40 : 160}
              height={40}
              className="transition-all min-w-[40px]"
            />
          </Link>
        </div>

        {(isMobileMenuOpen || !isCollapsed) && (
          <nav className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
            {syllabusData.map((item, i) => (
              <SyllabusItem key={i} item={item} />
            ))}
          </nav>
        )}

        {/* 🔹 BUTTON STACK LOGIC 🔹 */}
        <div
          className={`p-4 border-t-4 border-foreground bg-[#FFFDF2] dark:bg-[#121212] flex shrink-0 items-center gap-3
          ${isCollapsed || isMobileMenuOpen ? "flex-col" : "flex-row"} transition-all`}
        >
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full h-12 border-2 border-foreground rounded-xl flex items-center justify-center bg-white dark:bg-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none transition-all"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} />
            )}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex w-full h-12 border-2 border-foreground rounded-xl items-center justify-center bg-white dark:bg-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none transition-all"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>

          {isMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden w-full h-12 border-2 border-foreground rounded-xl flex items-center justify-center bg-white dark:bg-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </aside>

      {/* 3. MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-[#FFFDF2] dark:bg-[#121212] pt-20 md:pt-0">
        <div className="max-w-4xl mx-auto w-full px-5 py-8 md:px-12 md:py-16">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            {children}
          </article>

          {/* PREV/NEXT FOOTER */}
          <footer className="mt-20 pt-8 border-t-4 border-foreground flex flex-col sm:flex-row justify-between gap-6 pb-28">
            {prevPage && (
              <Link
                href={prevPage.href}
                className="flex-1 p-6 border-2 border-foreground rounded-2xl bg-white dark:bg-zinc-800 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.1)]"
              >
                <div className="text-[11px] font-black uppercase mb-1 opacity-60">
                  ←{" "}
                </div>
                <div className="font-bold text-xl uppercase">
                  {prevPage.title}
                </div>
              </Link>
            )}
            {nextPage && (
              <Link
                href={nextPage.href}
                className="flex-1 p-6 border-2 border-foreground rounded-2xl bg-white dark:bg-zinc-800 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.1)] text-right"
              >
                <div className="text-[11px] font-black uppercase mb-1 opacity-60">
                  {" "}
                  →
                </div>
                <div className="font-bold text-xl uppercase">
                  {nextPage.title}
                </div>
              </Link>
            )}
          </footer>
        </div>
      </main>

      {/* 4. CHAT LAYER */}
      <div className="fixed inset-0 pointer-events-none z-[200]">
        <div className="pointer-events-auto">
          <ChatWidget />
        </div>
      </div>
    </div>
  );
}
