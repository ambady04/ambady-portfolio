"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { gsap } from "gsap";
import { ArrowDownRight } from "lucide-react";

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const title1Ref = useRef<HTMLSpanElement>(null);
    const title2Ref = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(
                [title1Ref.current, title2Ref.current],
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, delay: 0.5 }
            )
                .fromTo(
                    subtitleRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    "-=0.5"
                )
                .fromTo(
                    btnRef.current,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8 },
                    "-=0.5"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] -z-10 animate-pulse" />

            <div className="text-center max-w-4xl">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
                    <span ref={title1Ref} className="block text-white">
                        MAKING DIGITAL
                    </span>
                    <span ref={title2Ref} className="block text-primary">
                        EXCELLENCE.
                    </span>
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    {portfolioData.summary.substring(0, 150)}...
                </p>

                <div ref={btnRef} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#projects"
                        className="group flex items-center justify-center px-8 py-4 bg-primary text-black font-bold rounded-full text-lg hover:bg-white transition-all overflow-hidden relative"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View My Work <ArrowDownRight size={20} />
                        </span>
                    </a>
                    <a
                        href="#contact"
                        className="flex items-center justify-center px-8 py-4 border border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all"
                    >
                        Get In Touch
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
