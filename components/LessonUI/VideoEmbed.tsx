"use client";
import React from "react";

interface VideoProps {
  id: string; // The YouTube Video ID (e.g., 'dQw4w9WgXcQ')
  title?: string;
}

export default function VideoEmbed({ id, title = "Lesson Video" }: VideoProps) {
  return (
    <div className="my-12 group">
      {/* Container with Neubrutalist Shadow */}
      <div className="relative border-4 border-foreground bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] transition-transform hover:-translate-y-1">

        {/* Decorative Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b-4 border-foreground bg-[#f378a5]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white border-2 border-foreground" />
            <div className="w-3 h-3 rounded-full bg-white border-2 border-foreground opacity-50" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-white">
            {title}
          </span>
          <div className="text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
        </div>

        {/* The Embed */}
        <div className="relative w-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Subtle Caption */}
      <p className="mt-4 ml-4 text-xs font-bold uppercase opacity-40 italic">
        Tip: Watch in 1080p for clear code visualization :3
      </p>
    </div>
  );
}
