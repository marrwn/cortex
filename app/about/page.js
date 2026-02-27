"use client";
import BubbleMenu from "@/components/BubbleMenu";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Sections/Footer";

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF2] py-20 px-4 flex flex-col items-center">
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

      <div className="max-w-5xl w-full space-y-16 mt-10">
        {/* --- HEADER --- */}
        <header className="text-center space-y-4">
          <h1 className="font-pixel text-6xl md:text-8xl text-black tracking-tighter [text-shadow:6px_6px_0px_#B191FF]">
            Cortex Code
          </h1>
          <p className="font-mono text-black bg-[#F7DF1E] border-4 border-black inline-block px-6 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
            EST. 2026 // CAIRO, EGYPT
          </p>
        </header>

        {/* --- THE CORE TEAM (3 Developers) --- */}
        <section className="space-y-10">
          <h3 className="font-pixel text-4xl text-black uppercase text-center md:text-left tracking-tighter">
            The Core Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marrwn",
                role: "FullStak - AI Developer",
                bio: "Full-stack specialist focusing on Egyptian EdTech infrastructure and system design.",
                color: "#B191FF",
              },
              {
                name: "Joe",
                role: "Developer",
                bio: "Expert in translating Sec 1 Ministry curriculum into actionable, interactive code modules.",
                color: "#90ee90",
              },
              {
                name: "Mohamed",
                role: "Content Lead",
                bio: "Our Designer in poster, stories, etc",
                color: "#F7DF1E",
              },
            ].map((dev, i) => (
              <div
                key={i}
                className="flex flex-col border-4 border-black bg-white rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden group hover:-translate-y-2 transition-all"
              >
                <div
                  className="h-48 border-b-4 border-black relative overflow-hidden"
                  style={{ backgroundColor: dev.color }}
                >
                  <div className="absolute inset-0 flex items-center justify-center font-pixel text-6xl opacity-20 group-hover:scale-110 transition-transform">
                    {dev.name.split("_")[1]}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-pixel text-xl text-black uppercase">
                    {dev.name}
                  </h4>
                  <p className="font-mono text-[10px] bg-black text-white inline-block px-2 py-1 rounded-md">
                    {dev.role}
                  </p>
                  <p className="text-sm text-neutral-600 leading-tight">
                    {dev.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- OUR MISSION (Split Look) --- */}
        <div className="flex flex-col md:flex-row border-4 border-black bg-white rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="w-full md:w-1/2 bg-[#B191FF] border-b-4 md:border-b-0 md:border-r-4 border-black p-12 flex flex-col justify-center items-center">
            <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-2">
              <h2 className="font-pixel text-5xl text-black"> OUR MISSION</h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center space-y-6 bg-[#FFFDF2]">
            <p className="text-xl text-black font-bold">
              Cutting through the noise of modern EdTech.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              We provide Egyptian students and global developers with a raw,
              high-performance learning environment. No distractions, no
              corporate fluff—just pure documentation and results for those who
              actually want to build.
            </p>
          </div>
        </div>

        {/* --- INFO CARDS (Who & Price) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-4 border-black bg-[#90ee90] p-8 rounded-[40px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-pixel text-2xl mb-4 uppercase underline decoration-4">
              Who is it for?
            </h3>
            <p className="font-bold text-black mb-4 uppercase">
              Passion Developers & Sec 1 Students.
            </p>
            <p className="text-sm leading-relaxed text-black/80">
              Cortex is specifically engineered to bridge the gap between the
              Egyptian Ministry of Education computer science curriculum and the
              high-level skills required in the tech industry today.
            </p>
          </div>

          <div className="border-4 border-black bg-[#F7DF1E] p-8 rounded-[40px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-pixel text-2xl mb-4 uppercase">Is it free?</h3>
            <div className="bg-black text-white inline-block px-4 py-1 font-pixel text-3xl mb-4">
              YES. 100%.
            </div>
            <p className="text-sm leading-relaxed text-black/70 font-medium">
              Education should never be a luxury. All of our courses are
              completely free, open-source, and accessible to anyone with an
              internet connection. No ads, no data mining.
            </p>
          </div>
        </div>
        {/* --- THE FLEX / REALITY CHECK --- */}
        <section className="relative w-full">
          <div className="border-4 border-black bg-[#ff5f56] p-8 md:p-12 rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center space-y-4 overflow-hidden relative">
            {/* Decorative background "sticker" */}
            <div className="absolute -top-4 -right-4 bg-white border-4 border-black px-4 py-2 rotate-12 font-pixel text-black text-xs hidden md:block">
              CRITICAL_FLEX_DETECTION
            </div>

            <h3 className="font-pixel text-3xl md:text-5xl text-white uppercase [text-shadow:3px_3px_0px_#000]">
              Can you imagine?
            </h3>

            <p className="font-pixel text-xl md:text-2xl text-black leading-tight max-w-2xl mx-auto">
              Three 16-17 year olds built this entire ecosystem from{" "}
              <span className="underline decoration-white decoration-4 italic">
                zero to hero
              </span>{" "}
              in just <span className="bg-white px-2">72 hours.</span>
            </p>

            <div className="pt-4 space-y-4 max-w-3xl mx-auto">
              <p className="font-mono text-sm text-white/90 leading-relaxed">
                While most people were sleeping, we were fighting CSS margins,
                debugging Next.js routes, and drinking enough caffeine to power
                a small village in Giza. We didn't just build a website; we
                built a statement.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-black/20 p-2 rounded-lg font-mono text-[10px] text-white">
                  0% SLEEP
                </div>
                <div className="bg-black/20 p-2 rounded-lg font-mono text-[10px] text-white">
                  100% PASSION
                </div>
                <div className="bg-black/20 p-2 rounded-lg font-mono text-[10px] text-white">
                  427 COMMITS
                </div>
                <div className="bg-black/20 p-2 rounded-lg font-mono text-[10px] text-white">
                  ∞ BUGS FIXED
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PROJECT TIMELINE --- */}
        <section className="border-4 border-black bg-white rounded-[40px] p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-pixel text-3xl mb-10 uppercase">
            Project Timeline
          </h3>
          <div className="space-y-8 relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-1 bg-black" />
            {[
              {
                date: "FEB 23 2026 ",
                task: "Project Planning ",
              },
              {
                date: "FEB 24 2026",
                task: "Website & Design Development",
              },
              {
                date: "FEB 25 2026",
                task: "Egyptian Sec 1 Curriculum Integration phase.",
              },
              {
                date: "FEB 26 2026",
                task: "Cortex Launch, First Stable Release",
              },
            ].map((event, i) => (
              <div key={i} className="flex gap-8 items-start relative z-10">
                <div className="w-6 h-6 rounded-full border-4 border-black bg-[#F7DF1E] flex-shrink-0" />
                <div>
                  <p className="font-pixel text-sm text-[#B191FF]">
                    {event.date}
                  </p>
                  <p className="font-bold text-black text-lg">{event.task}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- GITHUB CONTRIBUTION --- */}
        <div className="border-4 border-black bg-white p-10 rounded-[40px] shadow-[10px_10px_0px_0px_rgba(163,136,238,1)] text-center space-y-6">
          <h3 className="font-pixel text-3xl text-black uppercase">
            Contribution
          </h3>
          <p className="text-neutral-600 max-w-lg mx-auto italic">
            "Cortex is an open-source initiative. Found a bug or want to
            translate a course? Our doors are open."
          </p>
          <a href="https://github.com" className="inline-block">
            <button className="border-4 border-black bg-[#a388ee] px-10 py-4 font-pixel text-lg uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl transition-all active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-[#8e6cf3]">
              OPEN GITHUB
            </button>
          </a>
        </div>

        {/* --- FOOTER --- */}
        <Footer />
      </div>
    </div>
  );
}
