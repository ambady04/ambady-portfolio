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
                { y: 0, opacity: 1, duration: 1.5, stagger: 0.2 }
            );

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
            className="relative min-h-screen flex flex-col items-center px-6 pt-20 overflow-hidden"
        >
            {/* Background Orbs for creative depth */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] bg-element pointer-events-none" data-depth="0.2" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] bg-element pointer-events-none" data-depth="0.5" />

            <div className="relative z-10 text-center max-w-5xl hero-content">
                {/* Status Badge */}
                <div className="status-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/70">Available for projects</span>
                </div>

                <h1 className="text-6xl md:text-[clamp(4.5rem,11vw,9rem)] font-black tracking-tighter mb-8 leading-[0.8] uppercase flex flex-col items-center">
                    <span className="block text-white overflow-hidden">
                        <BlurText
                            text="CRAFTING"
                            delay={100}
                            animateBy="letters"
                            direction="top"
                            className="inline-block"
                        />
                    </span>
                    <span className="block text-primary italic font-serif mt-2 lowercase tracking-normal md:text-[clamp(4rem,10vw,8rem)]">
                        digital excellence.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                    Full-Stack Developer Specializing in Building <span className="text-white">Scalable Enterprise Systems</span> and <span className="text-white italic">High-Performance</span> Web Applications with Next.js and Python.
                </p>

                <div ref={btnRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <a
                        href="#projects"
                        onClick={(e) => handleScrollTo(e, "#projects")}
                        className="group flex items-center justify-center px-10 py-5 bg-white text-black font-bold rounded-2xl text-lg hover:bg-primary transition-all duration-500 shadow-xl shadow-white/5"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Projects <ArrowDownRight size={22} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                        </span>
                    </a>

                    <StarBorder
                        as="a"
                        href="#contact"
                        onClick={(e: any) => handleScrollTo(e, "#contact")}
                        color="#BA63F8"
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
