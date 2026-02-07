"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { gsap } from "gsap";

const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".contact-item",
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5"
        >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span> Connection
                    </h2>
                    <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
                        Let's build <br />
                        <span className="text-primary italic font-serif">something</span>{" "}
                        extraordinary.
                    </h3>

                    <div className="space-y-6">
                        <div className="contact-item flex items-center gap-6 group">
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary transition-all">
                                <Mail className="text-primary" size={24} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email Me</p>
                                <a href={`mailto:${portfolioData.email}`} className="text-xl font-bold text-white hover:text-primary transition-colors">
                                    {portfolioData.email}
                                </a>
                            </div>
                        </div>

                        <div className="contact-item flex items-center gap-6 group">
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary transition-all">
                                <Phone className="text-primary" size={24} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Call Me</p>
                                <a href={`tel:${portfolioData.phone}`} className="text-xl font-bold text-white hover:text-primary transition-colors">
                                    {portfolioData.phone}
                                </a>
                            </div>
                        </div>

                        <div className="contact-item flex items-center gap-6 group">
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary transition-all">
                                <MapPin className="text-primary" size={24} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                                <p className="text-xl font-bold text-white">
                                    {portfolioData.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-white/10 p-10 rounded-[3rem] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />
                    <h4 className="text-2xl font-bold text-white mb-8">Send Message</h4>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all text-white"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all text-white"
                            />
                        </div>
                        <textarea
                            rows={4}
                            placeholder="Your Message..."
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all text-white resize-none"
                        ></textarea>
                        <button className="w-full py-5 bg-primary hover:bg-white text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group">
                            Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
