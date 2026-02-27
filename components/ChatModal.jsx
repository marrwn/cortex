"use client";
import { useState, useEffect, useMemo } from "react";
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
  Menu,
  X,
} from "lucide-react";
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

  const normalizedPath = pathname.replace(/\/$/, "");
  const currentIndex = pages.findIndex(
    (p) => p.href.replace(/\/$/, "") === normalizedPath,
  );
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  if (!mounted) return null;

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] w-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* MOBILE HEADER - Gone when menu is open */}
      {!isMobileMenuOpen && (
        <header className="md:hidden flex items-center justify-between p-4 border-b-4 border-foreground bg-card z-[50] shrink-0">
          <Link href="/">
            <Image
              src={theme === "dark" ? "/cortex2.svg" : "/cortex.svg"}
              alt="Cortex"
              width={80}
              height={24}
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 border-2 border-foreground rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            style={{ backgroundColor: "oklch(0.627 0.265 303.9)" }}
          >
            <Menu size={20} color="black" strokeWidth={3} />
          </button>
        </header>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-[100] bg-card border-r-4 border-foreground flex flex-col h-full transition-all duration-300
          ${isMobileMenuOpen ? "translate-x-0 w-[85%] sm:w-80" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-20" : "md:w-80"}
        `}
      >
        {/* Logo Area */}
        <div className="flex h-20 items-center justify-center border-b-2 border-foreground/10 shrink-0 px-2">
          <Link href="/">
            <Image
              src={theme === "dark" ? "/cortex2.svg" : "/cortex.svg"}
              alt="Cortex"
              width={isCollapsed ? 30 : 130}
              height={30}
            />
          </Link>
        </div>

        {/* CONTENT TABS - Only render if NOT collapsed */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto p-4 pt-8 space-y-4 scrollbar-hide">
            {syllabusData.map((item, i) => (
              <SyllabusItem key={i} item={item} />
            ))}
          </div>
        )}

        {/* FOOTER BUTTONS - Theme on top of Collapse when vertical */}
        <div
          className={`
          p-4 border-t-4 border-foreground bg-card flex gap-3 shrink-0
          ${isCollapsed ? "flex-col" : "flex-row"} items-center
        `}
        >
          {/* Theme Button (Top/Left) */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full h-12 border-2 border-foreground rounded-xl flex items-center justify-center bg-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Collapse Button (Bottom/Right) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex w-full h-12 border-2 border-foreground rounded-xl items-center justify-center bg-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>

          {/* Mobile Close */}
          {isMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden w-full h-12 border-2 border-foreground rounded-xl flex items-center justify-center bg-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT - Only this part scrolls */}
      <main className="flex-1 overflow-y-auto bg-background h-full">
        <div className="max-w-4xl mx-auto w-full px-5 py-8 md:px-12 md:py-16">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            {children}
          </article>

          <footer className="mt-20 pt-8 border-t-4 border-foreground flex flex-col sm:flex-row justify-between gap-6 pb-28">
            {prevPage && (
              <Link
                href={prevPage.href}
                className="group flex-1 p-5 border-2 border-foreground rounded-2xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
              >
                <span className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2 mb-1">
                  <ArrowLeft size={12} /> Previous
                </span>
                <div className="font-pixel text-lg leading-tight uppercase">
                  {prevPage.title}
                </div>
              </Link>
            )}
            {nextPage && (
              <Link
                href={nextPage.href}
                className="group flex-1 p-5 border-2 border-foreground rounded-2xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-right hover:translate-y-[-2px] transition-all"
              >
                <span className="text-[10px] font-black uppercase text-muted-foreground flex items-center justify-end gap-2 mb-1">
                  Next <ArrowRight size={12} />
                </span>
                <div className="font-pixel text-lg leading-tight uppercase">
                  {nextPage.title}
                </div>
              </Link>
            )}
          </footer>
        </div>
      </main>

      {/* CHAT OVERRIDE */}
      <div className="fixed inset-0 pointer-events-none z-[200]">
        <div className="pointer-events-auto h-full w-full">
          <ChatWidget />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
