"use client";
import { useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import BubbleMenu from "@/components/BubbleMenu";
import Link from "next/link";
import Image from "next/image";

const items = [
  {
    label: "Home",
    href: "/",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#90ee90", textColor: "#ffffff" },
  },
  {
    label: "About",
    href: "/about",
    ariaLabel: "About",
    rotation: 2,
    hoverStyles: { bgColor: "#87ceeb", textColor: "#ffffff" },
  },
  {
    label: "Courses",
    href: "/courses",
    ariaLabel: "Courses",
    rotation: 12,
    hoverStyles: { bgColor: "#ff7a5c", textColor: "#ffffff" },
  },
  {
    label: "Github",
    href: "https://github.com/marrwn/cortex",
    ariaLabel: "Github",
    rotation: -8,
    hoverStyles: { bgColor: "#a388ee", textColor: "#ffffff" },
  },
];

const lessons = [
  {
    title: "JavaScript",
    path: "/js", // The destination URL
    color: "bg-[#F7DF1E]",
    btnColor: "#F7DF1E",
    img: "/javascript.jpg",
    status: "available",
    description:
      "Master the language of the web. Learn ES6+, Async/Await, and DOM manipulation.",
  },
  {
    title: "HTML",
    path: "/courses/html",
    color: "bg-[#E34F26]",
    btnColor: "#E34F26",
    img: "/html.png",
    status: "soon",
    description: "Build the skeleton of the web.",
  },
  {
    title: "Typescript",
    path: "/courses/typescript",
    color: "bg-[#3776AB]",
    btnColor: "#3178C6",
    img: "/typescript.jpg",
    status: "soon",
    description:
      "Perfect for Sec 1 Egyptian Students. Learn automation and logic.",
  },
];

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <div className="min-h-screen bg-[#FFFDF2] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <BubbleMenu
          logo={
            <span style={{ fontWeight: 700 }}>
              <Link href="/">
                <Image src="cortex.svg" width={150} height={150} alt="Cortex" />
              </Link>
            </span>
          }
          items={items}
          useFixedPosition={true}
        />

        {/* 1. THE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {lessons.map((lesson, idx) => (
            <SpotlightCard
              key={idx}
              className="flex flex-col p-0 !p-0 overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-[320px] rounded-[40px] transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="w-full aspect-square border-b-4 border-black overflow-hidden relative">
                <img
                  src={lesson.img}
                  alt={lesson.title}
                  className={`w-full h-full object-cover ${lesson.status === "available" ? "" : "grayscale opacity-60"}`}
                />
              </div>

              <div className="flex flex-col p-6 space-y-5 bg-white flex-grow">
                <h3 className="font-pixel text-2xl text-black uppercase leading-none">
                  {lesson.title}
                </h3>
                {lesson.status === "available" ? (
                  <button
                    onClick={() => setSelectedLesson(lesson)}
                    style={{ backgroundColor: lesson.btnColor }}
                    className="w-full border-4 border-black py-3 font-pixel text-sm uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl transition-all active:translate-x-1 active:translate-y-1 active:shadow-none brightness-100 hover:brightness-110 cursor-pointer"
                  >
                    Start Learning
                  </button>
                ) : (
                  <div className="w-full border-4 border-black bg-neutral-100 py-3 text-center font-pixel text-xs uppercase text-neutral-400 rounded-2xl">
                    Coming Soon
                  </div>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* 2. THE POP-UP */}
      {selectedLesson && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative flex flex-col md:flex-row w-full max-w-[800px] bg-white border-4 border-black rounded-[40px] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="w-full md:w-1/2 aspect-video md:aspect-auto border-b-4 md:border-b-0 md:border-r-4 border-black overflow-hidden">
              <img
                src={selectedLesson.img}
                className="w-full h-full object-cover"
                alt="Course Banner"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center space-y-6">
              <button
                onClick={() => setSelectedLesson(null)}
                className="absolute top-4 right-6 text-2xl font-bold hover:scale-110 transition-transform cursor-pointer"
              >
                ✕
              </button>

              <div>
                <p className="font-pixel text-xs text-neutral-500 uppercase mb-2">
                  Module 01
                </p>
                <h2 className="font-pixel text-4xl text-black uppercase leading-none mb-4">
                  {selectedLesson.title}
                </h2>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {selectedLesson.description}
                </p>
              </div>

              {/* REDIRECT BUTTON */}
              <Link href={selectedLesson.path} className="w-full">
                <button
                  style={{ backgroundColor: selectedLesson.btnColor }}
                  className="cursor-pointer w-full border-4 border-black py-4 font-pixel text-lg uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl transition-all active:translate-x-1 active:translate-y-1 active:shadow-none brightness-100 hover:brightness-110"
                >
                  Enter Classroom
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
