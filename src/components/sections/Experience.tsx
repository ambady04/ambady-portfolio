"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";
import ShinyText from "../reactbits/ShinyText";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Header
            gsap.fromTo(
                headerRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 95%",
                    }
                }
            );

            cardsRef.current.forEach((card, index) => {
                // Card Entrance
                gsap.fromTo(
                    card,
                    { y: 60, opacity: 0, rotationX: -10 },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        duration: 0.8,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                        },
                        delay: index * 0.1,
                    }
                );

                // Internal Content Staggering
                const content = card.querySelectorAll(".exp-content > *");
                gsap.fromTo(
                    content,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                        },
                        delay: (index * 0.1) + 0.3
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="py-16 md:py-24 px-6 max-w-7xl mx-auto border-t border-foreground/5"
        >
            <div ref={headerRef} className="mb-16 w-full max-w-5xl mx-auto px-4">
                <div className="mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-primary"></span>
                    <ShinyText
                        text="Career Path"
                        className="text-sm font-bold uppercase tracking-[0.3em] text-primary"
                        color="var(--primary)"
                    />
                </div>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
                    Professional <span className="text-primary">Journey.</span>
                </h3>
            </div>

            <div className="flex flex-col gap-6">
                {portfolioData.experience.map((exp, index) => (
                    <div
                        key={index}
                        ref={(el) => { if (el) cardsRef.current[index] = el; }}
                        className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 p-4 md:p-8 bg-card border border-foreground/5 rounded-3xl hover:border-primary/30 transition-all duration-500"
                    >
                        <div className="md:col-span-3">
                            <p className="text-sm font-bold text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block">
                                {exp.period}
                            </p>
                        </div>
                        <div className="md:col-span-9 exp-content">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h4 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {exp.role}
                                    </h4>
                                    <p className="text-muted-foreground flex items-center gap-2">
                                        {exp.company} • {exp.location}
                                    </p>
                                </div>
                                <Briefcase className="text-foreground/20 hidden md:block group-hover:scale-110 group-hover:text-primary transition-all duration-500" size={32} />
                            </div>
                            <ul className="space-y-3">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="text-muted-foreground flex gap-3 text-sm md:text-base break-words">
                                        <span className="text-primary font-bold">/</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
