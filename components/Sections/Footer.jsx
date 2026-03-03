"use client";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Youtube, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FFFDF2] border-t-4 border-black pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* 1. BRAND & MANIFESTO */}
          <div className="md:col-span-1 space-y-6">
            <Link
              href="/"
              className="inline-block hover:rotate-3 transition-transform"
            >
              <Image
                src="/cortex.svg"
                width={150}
                height={150}
                alt="Cortex Logo"
                className="invert-0"
              />
            </Link>
            <p className="font-bold text-black text-sm leading-tight uppercase">
              The high-contrast, zero-fluff learning engine for the next
              generation of builders.
              <span className="block mt-2 text-[#B191FF]">
                Built with passion in Cairo.
              </span>
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/marrwn/cortex"
                className="p-2 border-2 border-black  bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <Github size={20} />
              </Link>
            </div>
          </div>

          {/* 2. NAVIGATION */}
          <div className="space-y-4">
            <h4 className="font-pixel text-xl uppercase text-black underline decoration-2">
              Sitemap
            </h4>
            <ul className="space-y-2 font-bold uppercase text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#B191FF] flex items-center gap-1 text-black"
                >
                  Home <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-[#90ee90] flex items-center gap-1 text-black"
                >
                  Classroom <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#F7DF1E] flex items-center gap-1 text-black"
                >
                  Our Story <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/marrwn/cortex"
                  className="hover:text-[#ff7a5c] flex items-center gap-1 text-black"
                >
                  Contribute <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. CURRICULUM (Specific Focus) */}
          <div className="space-y-4">
            <h4 className="font-pixel text-xl uppercase text-black underline decoration-2">
              Curriculum
            </h4>
            <ul className="space-y-2 font-mono text-xs uppercase text-neutral-500">
              <li>{">"} JavaScript Core</li>
              <li>{">"} Python (Sec 1 Egypt)</li>
              <li>{">"} C++ Systems</li>
              <li>{">"} Rust Ownership</li>
              <li>{">"} AI Fundamentals</li>
            </ul>
          </div>

          {/* 4. NEWSLETTER / CONTACT */}
          <div className="space-y-4">
            <h4 className="font-pixel text-xl uppercase text-black underline decoration-2">
              Join the Sync
            </h4>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="YOUR_EMAIL@CORTEX.EDU"
                className="w-full border-4 border-black p-3 font-mono text-xs focus:outline-none bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
              <button className="bg-[#90ee90] border-4 border-black p-3 font-pixel text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t-4 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4 text-[10px] font-pixel text-neutral-400 uppercase">
            <span>© {currentYear} Cortex Edu</span>
            <span>// Built in 72 Hours</span>
            <span>// No Rights Reserved</span>
            <span>// Open Source forever</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#90ee90] animate-pulse" />
            <span className="font-mono text-[10px] uppercase text-black font-bold">
              Systems: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
