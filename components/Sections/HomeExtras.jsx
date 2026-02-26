"use client";
import { motion } from "framer-motion";
import { Github, Send, AlertTriangle } from "lucide-react";

const HomeExtras = () => {
  return (
    <div className="w-full bg-[#FFFDF2] pb-24">
      {/* 1. THE MANIFESTO MARQUEE (No Fake Stats) */}
      <div className="py-6 bg-[#F7DF1E] border-y-4 border-black overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-10 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-pixel text-2xl text-black uppercase">
              • Under Construction • Sec 1 Egypt Logic • Open Source • Built in
              3 Days • No Ads • Coming Soon •
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-24">
        {/* 2. THE "WHY CORTEX?" SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
            whileInView={{ rotate: -2, scale: 1, opacity: 1 }}
            className="bg-white border-4 border-black p-8 rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center gap-3 mb-4 text-[#ff5f56]">
              <AlertTriangle size={32} />
              <h3 className="font-pixel text-2xl uppercase">Developer Note</h3>
            </div>
            <p className="font-bold text-black text-lg mb-4">
              "We're tired of seeing students struggle with outdated PDFs."
            </p>
            <p className="text-black leading-relaxed">
              Cortex isn't a corporation. It's a sprint by three developers to
              prove that Egyptian education can be high-tech, high-contrast, and
              completely free. We are currently in the{" "}
              <strong>pre-launch phase</strong>, hand-coding every module.
            </p>
          </motion.div>

          <div className="space-y-6">
            <h2 className="font-pixel text-4xl text-black uppercase leading-none">
              The Mission <br />{" "}
              <span className="text-[#B191FF]">is Simple.</span>
            </h2>
            <ul className="space-y-4 text-black font-bold">
              {["No Gatekeeping", "No Paywalls", "Pure Code"].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 font-pixel text-xl uppercase"
                >
                  <div className="w-4 h-4 bg-black rotate-45" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. EARLY ACCESS / GITHUB SYNC */}
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          whileInView={{ filter: "blur(0px)", opacity: 1 }}
          className="border-4 border-black bg-[#87ceeb] p-12 rounded-[40px] text-center shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]"
        >
          <h3 className="font-pixel text-4xl md:text-5xl text-black uppercase mb-6">
            Want to see the progress?
          </h3>
          <p className="font-bold text-black/70 mb-10 max-w-xl mx-auto uppercase">
            We are pushing updates every single day. Follow the source or join
            the sync.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
            <button className="flex items-center justify-center gap-3 bg-white border-4 border-black px-8 py-4 font-pixel text-xl uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <Github size={24} /> Follow GitHub
            </button>
            <button className="flex items-center justify-center gap-3 bg-[#F7DF1E] border-4 border-black px-8 py-4 font-pixel text-xl uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <Send size={24} /> Get Notified
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeExtras;
