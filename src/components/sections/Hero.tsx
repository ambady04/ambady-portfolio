"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowDownRight } from "lucide-react";
import StarBorder from "../reactbits/StarBorder";
import GradualBlur from "../reactbits/GradualBlur";
import DecryptedText from "../reactbits/DecryptedText";
import BlurText from "../reactbits/BlurText";
import ShinyText from "../reactbits/ShinyText";
import HeroBackground from "./HeroBackground";

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // Entrance animation for the whole content block
            tl.fromTo(
                ".hero-content",
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.0, stagger: 0.15 }
            );

            // Staggered entrance for the shiny text specifically if needed
            // But let's let the container handle it for now.

            // Subtle parallax for background elements
            gsap.to(".bg-element", {
                y: (i, target) => -target.dataset.depth * 50,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    scrub: true,
                }
            });

            // Floating animation for the badge
            gsap.to(".status-badge", {
                y: -5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: href, autoKill: true },
            ease: "power4.inOut",
        });
    };

    return (
        <section
            ref={heroRef}
            className="relative min-h-[80vh] md:min-h-screen flex flex-col items-center px-6 pt-28 md:pt-40 overflow-hidden"
        >
            <HeroBackground />

            <div className="relative z-10 text-center w-full max-w-5xl hero-content px-4">
                {/* Status Badge */}
                <div className="status-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 mb-6 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-foreground/70">Available for projects</span>
                </div>

                <h1 className="flex flex-col items-center select-none mb-10 w-full overflow-hidden">
                    <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.6em] text-foreground/50 mb-3 font-bold">
                        <BlurText
                            text="BUILDING THE"
                            delay={50}
                            animateBy="letters"
                            direction="top"
                            className="inline-block"
                        />
                    </span>
                    <span className="text-[clamp(1.2rem,6vw,6.5rem)] font-black tracking-tighter leading-none uppercase py-2 w-full break-all md:break-words text-center">
                        <ShinyText
                            text="EXTRAORDINARY"
                            color="var(--foreground)"
                            shineColor="var(--primary)"
                            speed={3}
                            className="inline-block px-1"
                        />
                    </span>
                    <span className="mt-4 text-primary italic font-serif lowercase tracking-normal text-lg md:text-4xl">
                        shaping next-gen reality.
                    </span>
                </h1>

                <p className="text-[13px] sm:text-base md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-medium break-words px-4">
                    Full-Stack Developer Specializing in Building <span className="text-foreground font-bold">Scalable Enterprise Systems</span> and <span className="text-foreground italic font-bold">High-Performance</span> Web Applications with Next.js and Python.
                </p>

                <div ref={btnRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <a
                        href="#projects"
                        onClick={(e) => handleScrollTo(e, "#projects")}
                        className="group flex items-center justify-center px-10 py-5 bg-foreground text-background font-bold rounded-2xl text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-xl shadow-foreground/5"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Projects <ArrowDownRight size={22} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                        </span>
                    </a>

                    <StarBorder
                        as="a"
                        href="#contact"
                        onClick={(e: any) => handleScrollTo(e, "#contact")}
                        color="var(--primary)"
                        speed="4s"
                        className="cursor-none text-lg font-bold px-10 py-5"
                    >
                        Let's Talk
                    </StarBorder>
                </div>
            </div>

            <GradualBlur
                position="bottom"
                height="10rem"
                strength={3}
                divCount={8}
                exponential={true}
                className="pointer-events-none"
                zIndex={0}
            />
        </section>
    );
};

export default Hero;
