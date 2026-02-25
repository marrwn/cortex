import Squares from "../Squares";
import { Button } from "../ui/button";
import RotatingText from "../RotatingText";
import Link from "next/link";

export default function Hero() {
  return (
    /* 'relative' allows absolute children to stay inside this section.
       'h-screen' ensures the section has a height for the Canvas to fill.
    */
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* 1. THE REACTIVE BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Squares
          speed={0.5}
          squareSize={60}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#fff"
          hoverFillColor="#222"
          direction="diagonal"
          borderColor="#3d3846"
          hoverColor="#222222"
          size={40}
        />
      </div>

      {/* 2. THE CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-white text-7xl font-bold text-center">
          Learn Javascript
        </h1>
        <RotatingText
          texts={["Effectively", "Better", "Right"]}
          mainClassName="px-2 sm:px-2 md:px-3 bg-transparent text-white text-7xl font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
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
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-2xl">
          {/* Start Learning - Extra Large White Button */}
          <Button
            size="sm"
            className="bg-white text-black hover:bg-gray-200 text-xl font-bold py-8 px-12 rounded-2xl shadow-2xl transition-transform hover:scale-105 cursor-pointer"
          >
            <Link href="/learn"> Start Learning</Link>
          </Button>

          {/* View Lessons - Extra Large Outline Button */}
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 text-white text-xl font-bold py-8 px-12 rounded-2xl backdrop-blur-sm transition-transform hover:scale-105 cursor-pointer"
          >
            View Lessons
          </Button>
        </div>
      </div>
    </section>
  );
}
