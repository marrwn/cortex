"use client";
import Image from "next/image";
import BubbleMenu from "@/components/BubbleMenu";
import { GridScan } from "@/components/GridScan";
import Beams from "@/components/Beams";
import Hero from "@/components/Sections/Hero";
import Features from "@/components/Sections/Features";
import Roast from "@/components/Sections/Roast";
import Link from "next/link";

const items = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#90ee90", textColor: "#ffffff" },
  },
  {
    label: "about",
    href: "#",
    ariaLabel: "About",
    rotation: 2,
    hoverStyles: { bgColor: "#87ceeb", textColor: "#ffffff" },
  },
  {
    label: "Learn",
    href: "#",
    ariaLabel: "Projects",
    rotation: 12,
    hoverStyles: { bgColor: "#ff7a5c", textColor: "#ffffff" },
  },
  {
    label: "Github",
    href: "#",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#a388ee", textColor: "#ffffff" },
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
              <Link href="/">
                <Image src="next.svg" width={50} height={50} alt="Cortex" />
              </Link>
            </span>
          }
          items={items}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={true}
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
