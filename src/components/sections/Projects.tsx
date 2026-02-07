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
    const projectCards = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            projectCards.current.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { scale: 0.9, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                        delay: index * 0.2,
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5"
        >
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
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
                        className="text-4xl md:text-5xl font-bold tracking-tighter text-white"
                        delay={50}
                        duration={0.6}
                    />
                </div>
                <p className="max-w-md text-muted-foreground">
                    A collection of enterprise-grade systems and platforms I've architected and implemented.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {portfolioData.projects.map((project, index) => (
                    <div
                        key={index}
                        ref={(el) => { if (el) projectCards.current[index] = el; }}
                        className="group relative p-8 bg-card border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-700"
                    >
                        {/* Background Gradient */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-all duration-700" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                                    <Layers size={24} />
                                </div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground border border-white/10 px-4 py-1 rounded-full">
                                    {project.period}
                                </p>
                            </div>

                            <h4 className="text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
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
