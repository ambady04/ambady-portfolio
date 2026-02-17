"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Database, Terminal, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal cards one by one
            gsap.fromTo(
                ".skill-card",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 95%",
                    },
                }
            );

            // Floating animation for icons
            gsap.to(".skill-icon", {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                stagger: {
                    each: 0.5,
                    from: "random"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const cards = document.getElementsByClassName("skill-card");
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
            (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
        }
    };

    const categories = [
        { title: "Languages", skills: portfolioData.skills.languages, icon: <Code2 /> },
        { title: "Frameworks", skills: portfolioData.skills.frameworks, icon: <Terminal /> },
        { title: "Databases", skills: portfolioData.skills.databases, icon: <Database /> },
        { title: "DevOps & Tools", skills: portfolioData.skills.tools, icon: <Wrench /> },
    ];

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-16 md:py-24 px-6 max-w-7xl mx-auto border-t border-foreground/5"
            onMouseMove={handleMouseMove}
        >
            <div className="mb-16">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-primary"></span> Capabilities
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                    Technical <span className="text-primary italic font-serif">Ecosystem.</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref={containerRef}>
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        className="skill-card relative p-6 md:p-8 rounded-3xl md:rounded-[2.2rem] bg-foreground/[0.03] border border-foreground/10 overflow-hidden group hover:border-primary/50 transition-colors duration-500"
                    >
                        {/* Spotlight Effect overlay */}
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
                            style={{
                                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-hex), 0.3), transparent 40%)`
                            }}
                        />

                        <div className="relative z-10 flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="skill-icon w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(var(--primary-hex),0.2)]">
                                    {cat.icon}
                                </div>
                                <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{cat.title}</h4>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-xl text-[10px] font-mono tracking-wider text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Background subtle grid pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`, backgroundSize: '24px 24px' }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
