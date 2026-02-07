"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ClickSpark from "@/components/reactbits/ClickSpark";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Force scroll to top on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ClickSpark sparkColor="#BA63F8" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <main className="bg-black text-white selection:bg-primary selection:text-black min-h-screen">
          <CustomCursor />
          <Navbar />
          <Hero />
          <div className="relative z-10 bg-black">
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </div>
        </main>
      </ClickSpark>
    </>
  );
}
