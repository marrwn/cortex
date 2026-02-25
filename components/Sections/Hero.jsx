import Squares from "../Squares";
import { Button } from "../ui/button";
import RotatingText from "../RotatingText";
import Link from "next/link";
import DotGrid from "../DotGrid";

export default function Hero() {
  return (
    /* 'relative' allows absolute children to stay inside this section.
       'h-screen' ensures the section has a height for the Canvas to fill.
    */
    <section className="relative w-full h-screen overflow-hidden bg-[#FFFDF2]">
      {/* 1. THE REACTIVE BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none"></div>
      {/* Background here */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#feffea"
          activeColor="#E3a018"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      {/* 2. THE CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-black text-7xl font-bold text-center">
          Learn Javascript
        </h1>
        <RotatingText
          texts={["Effectively", "Better", "Right"]}
          mainClassName="px-2 sm:px-2 md:px-3 bg-[#fed170] mt-4 text-black text-7xl font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
        {/* Button Container */}
        <div className="flex flex-col sm:flex-row gap-8 mt-10 justify-center items-center">
          {/* Start Learning - Extra Large White Button */}
          <Button
            variant="secondary"
            size="lg"
            className="
                    text-3xl py-8 px-10
                  bg-[#fed170] text-black
                  rounded-2xl border-4 border-black
                  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                  hover:translate-x-[2px] hover:translate-y-[2px]
                  hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                  active:translate-x-[8px] active:translate-y-[8px]
                  active:shadow-none
                  transition-all "
          >
            <Link href="/learn"> Start Learning</Link>
          </Button>

          {/* View Lessons - Extra Large Outline Button */}
          <Button
            variant="outline"
            size="lg"
            className="
                    text-3xl py-8 px-10
                  bg-[#daf5f0] text-black
                  rounded-2xl border-4 border-black
                  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                  hover:translate-x-[2px] hover:translate-y-[2px]
                  hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                  active:translate-x-[8px] active:translate-y-[8px]
                  active:shadow-none
                  transition-all cursor-pointer"
          >
            View Lessons
          </Button>
        </div>
      </div>
    </section>
  );
}
