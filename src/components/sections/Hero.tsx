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
    const btnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(
                btnRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, delay: 1.5 }
            );
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
            className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden"
        >
            <div className="relative z-10 text-center max-w-5xl">
                <h1 className="text-6xl md:text-[clamp(4rem,10vw,8rem)] font-black tracking-tighter mb-8 leading-[0.85] uppercase">
                    <BlurText
                        text="MAKING DIGITAL"
                        delay={100}
                        animateBy="letters"
                        direction="top"
                        className="block text-white"
                    />
                    <BlurText
                        text="EXCELLENCE."
                        delay={100}
                        animateBy="letters"
                        direction="top"
                        className="block text-primary"
                    />
                </h1>

                <BlurText
                    text={portfolioData.summary.substring(0, 150) + "..."}
                    delay={50}
                    animateBy="words"
                    direction="bottom"
                    className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed justify-center"
                />

                <div ref={btnRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <a
                        href="#projects"
                        onClick={(e) => handleScrollTo(e, "#projects")}
                        className="group flex items-center justify-center px-8 py-4 bg-primary text-black font-bold rounded-full text-lg hover:bg-white transition-all overflow-hidden relative"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View My Work <ArrowDownRight size={20} />
                        </span>
                    </a>

                    <StarBorder
                        as="a"
                        href="#contact"
                        onClick={(e: any) => handleScrollTo(e, "#contact")}
                        color="#BA63F8"
                        speed="6s"
                        className="cursor-none"
                    >
                        Get In Touch
                    </StarBorder>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce z-10">
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
            </div>

            {/* Bottom Gradual Blur for section transition */}
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
