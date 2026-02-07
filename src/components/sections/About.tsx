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
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
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
            className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5"
        >
            <div className="grid md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4">
                    <div className="mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span>
                        <ShinyText
                            text="About Me"
                            className="text-sm font-bold uppercase tracking-[0.3em] text-primary"
                            color="#BA63F8"
                            speed={3}
                        />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
                        <SplitText
                            text="Passive Passion,"
                            className="block"
                            textAlign="left"
                            delay={40}
                        />
                        <GradientText
                            className="text-primary mt-2"
                            showBorder={false}
                            colors={["#BA63F8", "#9F27F5", "#E1BBFC"]}
                        >
                            Active Excellence.
                        </GradientText>
                    </div>
                </div>
                <div ref={textRef} className="md:col-span-8 flex flex-col gap-8">
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        {portfolioData.summary}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <p className="text-3xl font-bold text-white tracking-tighter">4+</p>
                            <p className="text-sm text-primary uppercase tracking-widest">
                                Years Exp.
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white tracking-tighter">
                                10+
                            </p>
                            <p className="text-sm text-primary uppercase tracking-widest">
                                Projects
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white tracking-tighter">
                                100%
                            </p>
                            <p className="text-sm text-primary uppercase tracking-widest">
                                Dedicated
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white tracking-tighter">
                                Global
                            </p>
                            <p className="text-sm text-primary uppercase tracking-widest">
                                Reach
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
