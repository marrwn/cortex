"use client";
import { motion } from "framer-motion";
import {
  MonitorCheck,
  Bot,
  RectangleGoggles,
  Zap,
  Globe,
  Github,
} from "lucide-react";
import BlurText from "../BlurText";
import SpotlightCard from "../SpotlightCard";

const FeaturesSection = () => {
  // Define the blur-in animation variant
  const blurFadeVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const featureList = [
    {
      title: "Interactive Lessons",
      desc: "Learn and code at the same time. No more passive watching.",
      icon: MonitorCheck,
      color: "bg-[#ff7396]",
    },
    {
      title: "AI-Powered Feedback",
      desc: "Stuck on a bug? Our integrated AI guides you to the solution.",
      icon: Bot,
      color: "bg-[#b6ace4]",
    },
    {
      title: "Real Examples",
      desc: "No more 'Hello World.' We use production-grade examples.",
      icon: RectangleGoggles,
      color: "bg-[#abcf82]",
    },
    {
      title: "Localized for Egypt",
      desc: "Directly aligned with the Sec 1 Computer Science curriculum.",
      icon: Globe,
      color: "bg-[#F7DF1E]",
    },
    {
      title: "Open Source",
      desc: "Built by the community, for the community. Free forever.",
      icon: Github,
      color: "bg-[#a388ee]",
    },
    {
      title: "Zero Fluff",
      desc: "We value your time. Pure high-octane engineering knowledge.",
      icon: Zap,
      color: "bg-[#ff5f56]",
    },
  ];

  return (
    <section className="w-full bg-[#FFFDF2] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <BlurText
          text="Elevate your skills with high-performance learning"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-black font-bold text-4xl md:text-6xl font-pixel text-center mb-20 leading-tight"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {featureList.map((feature, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={blurFadeVariants}
              // This adds a slight delay to each card for a "staggered" reveal
              transition={{ delay: idx * 0.1 }}
            >
              <SpotlightCard
                className="flex flex-col h-full gap-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[32px]"
                bgColor={feature.color}
              >
                <feature.icon className="size-16 text-black" />
                <h3 className="font-pixel text-2xl text-black font-bold uppercase">
                  {feature.title}
                </h3>
                <p className="text-black font-sans font-bold leading-tight">
                  {feature.desc}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
