"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Process from "@/components/Process";
import WhyAevum from "@/components/WhyAevum";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const BackgroundCanvas = dynamic(() => import("@/components/BackgroundCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <BackgroundCanvas />
      <Navigation />
      <main>
        <Hero />
        <Capabilities />
        <Services />
        <Cases />
        <Process />
        <WhyAevum />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
