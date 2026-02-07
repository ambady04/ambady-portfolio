"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Database, Terminal, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                gridRef.current?.children || [],
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 90%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

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
            className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5"
        >
            <div className="mb-16">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-primary"></span> Capabilities
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                    Technical <span className="text-primary">Ecosystem.</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((cat, idx) => (
                    <div key={idx} className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 text-primary">
                            <div className="p-2 bg-primary/10 rounded-lg">{cat.icon}</div>
                            <h4 className="font-bold text-lg text-white">{cat.title}</h4>
                        </div>
                        <div ref={gridRef} className="flex flex-wrap gap-2">
                            {cat.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-muted-foreground hover:border-primary/50 hover:text-white transition-all cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
