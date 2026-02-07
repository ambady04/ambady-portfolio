"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                        delay: index * 0.1,
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
            className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5"
        >
            <div className="mb-16">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-primary"></span> Career Path
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                    Professional <span className="text-primary">Journey.</span>
                </h3>
            </div>

            <div className="flex flex-col gap-6">
                {portfolioData.experience.map((exp, index) => (
                    <div
                        key={index}
                        ref={(el) => { if (el) cardsRef.current[index] = el; }}
                        className="group relative grid md:grid-cols-12 gap-8 p-8 bg-card border border-white/5 rounded-3xl hover:border-primary/30 transition-all duration-500"
                    >
                        <div className="md:col-span-3">
                            <p className="text-sm font-bold text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block">
                                {exp.period}
                            </p>
                        </div>
                        <div className="md:col-span-9">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                        {exp.role}
                                    </h4>
                                    <p className="text-muted-foreground flex items-center gap-2">
                                        {exp.company} • {exp.location}
                                    </p>
                                </div>
                                <Briefcase className="text-white/20 hidden md:block" size={32} />
                            </div>
                            <ul className="space-y-3">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="text-muted-foreground flex gap-3 text-base">
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
