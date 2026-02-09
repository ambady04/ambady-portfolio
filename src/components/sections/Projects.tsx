"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Layers } from "lucide-react";
import SplitText from "../reactbits/SplitText";
import ShinyText from "../reactbits/ShinyText";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const projectCards = useRef<HTMLDivElement[]>([]);

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

            projectCards.current.forEach((card, index) => {
                // Card Entrance - Scale + Rotation
                gsap.fromTo(
                    card,
                    { scale: 0.8, opacity: 0, rotationY: 15 },
                    {
                        scale: 1,
                        opacity: 1,
                        rotationY: 0,
                        duration: 0.9,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                        },
                        delay: index * 0.15,
                    }
                );

                // Internal Stagger
                const items = card.querySelectorAll(".proj-content > *");
                gsap.fromTo(
                    items,
                    { y: 30, opacity: 0 },
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
                        delay: (index * 0.15) + 0.4
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const cards = projectCards.current;
        for (const card of cards) {
            if (!card) continue;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    };

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="py-16 md:py-24 px-6 max-w-7xl mx-auto border-t border-white/5"
            onMouseMove={handleMouseMove}
        >
            <div ref={headerRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 w-full max-w-5xl mx-auto px-4">
                <div>
                    <div className="mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span>
                        <ShinyText
                            text="Selected Works"
                            className="text-sm font-bold uppercase tracking-[0.3em] text-primary"
                            color="#BA63F8"
                        />
                    </div>
                    <SplitText
                        text="Engineering Impact."
                        className="text-3xl md:text-5xl font-bold tracking-tighter text-white"
                        delay={50}
                        duration={0.6}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {portfolioData.projects.map((project, index) => (
                    <div
                        key={index}
                        ref={(el) => { if (el) projectCards.current[index] = el; }}
                        className="group relative p-4 md:p-8 bg-card border border-white/5 rounded-3xl md:rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-700"
                    >
                        {/* Spotlight Effect overlay */}
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
                            style={{
                                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(186, 99, 248, 0.1), transparent 40%)`
                            }}
                        />

                        {/* Background Gradient */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-all duration-700" />

                        <div className="relative z-10 proj-content">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <Layers size={24} />
                                </div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground border border-white/10 px-4 py-1 rounded-full">
                                    {project.period}
                                </p>
                            </div>

                            <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors break-words">
                                {project.title}
                            </h4>

                            <ul className="space-y-3 mb-8">
                                {project.description.slice(0, 3).map((item, i) => (
                                    <li key={i} className="text-muted-foreground text-sm flex gap-3 line-clamp-2">
                                        <span className="text-primary font-bold opacity-50">•</span>
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

export default Projects;
