"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShinyText from "../reactbits/ShinyText";
import SplitText from "../reactbits/SplitText";
import GradientText from "../reactbits/GradientText";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 95%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="pt-8 pb-16 md:py-24 px-6 max-w-7xl mx-auto border-t border-foreground/5"
        >
            <div className="grid lg:grid-cols-12 gap-12 md:gap-20 items-center w-full max-w-5xl mx-auto px-4">
                <div className="md:col-span-5 flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span>
                        <ShinyText
                            text="About Me"
                            className="text-sm font-bold uppercase tracking-[0.3em] text-primary"
                            color="var(--primary)"
                            speed={3}
                        />
                    </div>

                    <div className="relative group rounded-[2rem] overflow-hidden border border-foreground/10 w-full aspect-[4/5] bg-foreground/5 shadow-2xl shadow-foreground/5">
                        {/* Dark Mode Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 hidden dark:block" />

                        {/* Light Mode Overlay (Subtle tint on hover) */}
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 dark:hidden" />

                        <img
                            src={portfolioData.image}
                            alt={portfolioData.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-foreground font-bold text-xl drop-shadow-[0_2px_4px_rgba(var(--background),0.8)] dark:drop-shadow-none">{portfolioData.name}</p>
                            <p className="text-primary text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-bold">Full Stack Developer</p>
                        </div>
                    </div>
                </div>

                <div ref={textRef} className="md:col-span-7 flex flex-col gap-6 w-full max-w-full">
                    <div className="text-xl sm:text-2xl md:text-5xl font-bold tracking-tighter text-foreground leading-tight break-words">
                        <SplitText
                            text="Crafting Solutions,"
                            className="block"
                            delay={50}
                        />
                        <span className="text-primary italic font-serif">Building Impact.</span>
                    </div>
                    <p className="text-[13px] sm:text-base text-muted-foreground leading-relaxed tracking-tight text-left break-words">
                        {portfolioData.summary}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <p className="text-4xl font-bold text-foreground tracking-tighter">4+</p>
                            <p className="text-sm text-primary uppercase tracking-widest mt-1">
                                Years Experience
                            </p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-foreground tracking-tighter">
                                10+
                            </p>
                            <p className="text-sm text-primary uppercase tracking-widest mt-1">
                                Projects Delivered
                            </p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-foreground tracking-tighter">
                                100%
                            </p>
                            <p className="text-sm text-primary uppercase tracking-widest mt-1">
                                Commitment
                            </p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-foreground tracking-tighter">
                                Global
                            </p>
                            <p className="text-sm text-primary uppercase tracking-widest mt-1">
                                Client Reach
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
