import { Square } from "lucide-react";
import BlurText from "../BlurText";
import SpotlightCard from "../SpotlightCard";
import { Bot } from "lucide-react";
import { MonitorCheck } from "lucide-react";
import { RectangleGogglesIcon } from "lucide-react";
import { RectangleGoggles } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="w-full bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* 1. Blur Text in the middle */}
        <BlurText
          text="Elevate your skills with high-performance learning"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-white text-4xl md:text-6xl font-pixel text-center mb-20 leading-tight justify-center"
        />

        {/* 2. Spotlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <SpotlightCard className="flex flex-col gap-4">
            <MonitorCheck className="size-18 text-white" />
            <h3 className="font-pixel text-2xl text-white">
              Interactive Lessons
            </h3>
            <p className="text-neutral-400 font-sans">
              Learn and code in same time
            </p>
          </SpotlightCard>

          <SpotlightCard className="flex flex-col gap-4">
            <Bot className="size-18 text-white" />
            <h3 className="font-pixel text-2xl text-white">
              AI-Powered Feedback
            </h3>
            <p className="text-neutral-400 font-sans">
              An AI-Powered Feedback system to help you
            </p>
          </SpotlightCard>

          <SpotlightCard className="flex flex-col gap-4">
            <RectangleGoggles className="size-18 text-white" />
            <h3 className="font-pixel text-2xl text-white">Real Examples</h3>
            <p className="text-neutral-400 font-sans">
              No more outdated lessons, we use examples that being used right
              now
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
