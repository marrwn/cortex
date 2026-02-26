"use client";
import Image from "next/image";
import BubbleMenu from "@/components/BubbleMenu";
import { GridScan } from "@/components/GridScan";
import Beams from "@/components/Beams";
import Hero from "@/components/Sections/Hero";
import Features from "@/components/Sections/Features";
import Roast from "@/components/Sections/Roast";
import Link from "next/link";
import CodePreview from "@/components/Sections/CodePreview";
import HomeExtras from "@/components/Sections/HomeExtras";
import Footer from "@/components/Sections/Footer";
import ChatWidget from "@/components/ChatWidget";

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
    href: "https://github/marrwn/cortex",
    ariaLabel: "Github",
    rotation: -8,
    hoverStyles: { bgColor: "#a388ee", textColor: "#ffffff" },
  },
];
export default function Home() {
  return (
    <div>
      <div>
        <BubbleMenu
          logo={
            <span style={{ fontWeight: 700 }}>
              <Link href="/">
                <Image src="cortex.svg" width={150} height={150} alt="Cortex" />
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
      <CodePreview />
      <HomeExtras />
      <Footer />
      <ChatWidget />
    </div>
  );
}
