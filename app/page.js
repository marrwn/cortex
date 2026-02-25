"use client";
import Image from "next/image";
import BubbleMenu from "@/components/BubbleMenu";
import { GridScan } from "@/components/GridScan";
import Beams from "@/components/Beams";
import Hero from "@/components/Sections/Hero";
import Features from "@/components/Sections/Features";
import Roast from "@/components/Sections/Roast";

const items = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#000000", textColor: "#ffffff" },
  },
  {
    label: "about",
    href: "#",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#000000", textColor: "#ffffff" },
  },
  {
    label: "Learn",
    href: "#",
    ariaLabel: "Projects",
    rotation: 8,
    hoverStyles: { bgColor: "#000000", textColor: "#ffffff" },
  },
  {
    label: "Github",
    href: "#",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#000000", textColor: "#ffffff" },
  },
];
const logo = <Image src="vercel.svg" />;
export default function Home() {
  return (
    <div>
      <div>
        <BubbleMenu
          logo={
            <span style={{ fontWeight: 700 }}>
              <Image src="next.svg" width={50} height={50} alt="Cortex" />
            </span>
          }
          items={items}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={false}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      </div>
      <Hero />
      <Features />
      <Roast />
    </div>
  );
}
