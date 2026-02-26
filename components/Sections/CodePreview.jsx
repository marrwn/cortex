"use client";
import { motion } from "framer-motion";

const CodePreview = () => {
  return (
    <section className="w-full bg-[#FFFDF2] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-4xl font-bold md:text-5xl text-black uppercase mb-4">
            Built for builders
          </h2>
          <p className="font-mono text-neutral-600 uppercase text-sm">
            Experience the raw power of the Cortex IDE
          </p>
        </div>

        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          whileInView={{ filter: "blur(0px)", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="border-4 border-black bg-[#1e1e1e] rounded-[40px] shadow-[15px_15px_0px_0px_rgba(177,145,255,1)] overflow-hidden"
        >
          {/* Editor Header */}
          <div className="bg-[#2d2d2d] p-4 border-b-4 border-black flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-xs text-neutral-500 italic">
              cortex_lesson_01.js
            </span>
          </div>

          {/* Code Content */}
          <div className="p-8 md:p-12 font-mono text-sm md:text-lg leading-relaxed overflow-x-auto">
            <p className="text-[#90ee90]">{"// cortex/education/egypt-sec1"}</p>
            <p className="text-[#87ceeb]">
              const <span className="text-white">student</span> = {"{"}
            </p>
            <p className="pl-6 text-white">
              grade: <span className="text-[#F7DF1E]">"Secondary 1"</span>,
            </p>
            <p className="pl-6 text-white">
              location: <span className="text-[#F7DF1E]">"Cairo, EG"</span>,
            </p>
            <p className="pl-6 text-white">
              mission:{" "}
              <span className="text-[#ff7396]">"Mastering Python"</span>
            </p>
            <p className="text-[#87ceeb]">{"};"}</p>
            <br />
            <p className="text-white">
              function <span className="text-[#b6ace4]">startLearning()</span>{" "}
              {"{"}
            </p>
            <p className="pl-6 text-[#90ee90]">
              console.log("Welcome to the future.");
            </p>
            <p className="text-white">{"}"}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodePreview;
