"use client";

import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";
import CountryCodeSelect from "../ui/CountryCodeSelect";

const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".contact-item",
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 95%",
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
            className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto border-t border-foreground/5 overflow-hidden"
        >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full max-w-5xl mx-auto">
                <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span> Connection
                    </h2>
                    <h3 className="text-[clamp(1.5rem,8vw,4.5rem)] font-bold tracking-tighter text-foreground mb-8 leading-[1.1] break-all sm:break-words">
                        Let's build <br />
                        <span className="text-primary italic font-serif">something</span>{" "}
                        extraordinary.
                    </h3>

                    <div className="space-y-6">
                        <div className="contact-item flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 group w-full overflow-hidden">
                            <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary transition-all flex-shrink-0">
                                <Mail className="text-primary" size={18} />
                            </div>
                            <div className="w-full overflow-hidden">
                                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Email Me</p>
                                <a href={`mailto:${portfolioData.email}`} className="text-base sm:text-xl font-bold text-foreground hover:text-primary transition-colors block truncate w-full">
                                    {portfolioData.email}
                                </a>
                            </div>
                        </div>

                        <div className="contact-item flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 group w-full overflow-hidden">
                            <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary transition-all flex-shrink-0">
                                <Phone className="text-primary" size={18} />
                            </div>
                            <div className="w-full overflow-hidden">
                                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Call Me</p>
                                <a href={`tel:${portfolioData.phone}`} className="text-base sm:text-xl font-bold text-foreground hover:text-primary transition-colors block truncate w-full">
                                    {portfolioData.phone}
                                </a>
                            </div>
                        </div>

                        <div className="contact-item flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 group w-full overflow-hidden">
                            <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary transition-all flex-shrink-0">
                                <MapPin className="text-primary" size={18} />
                            </div>
                            <div className="w-full overflow-hidden">
                                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Location</p>
                                <p className="text-base sm:text-xl font-bold text-foreground block truncate w-full">
                                    {portfolioData.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 hidden sm:block"></div>
                    <div className="relative bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] p-4 sm:p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] overflow-hidden">

                        <div className="absolute top-6 right-2 p-10 opacity-20 pointer-events-none hidden md:block">
                            <Send size={120} className="text-primary -rotate-12 translate-x-10 -translate-y-10" />
                        </div>

                        <h4 className="text-3xl font-bold text-foreground mb-2">Send Message</h4>
                        <p className="text-muted-foreground mb-8 text-sm">I'm always open to discussing product design work or partnership opportunities.</p>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setStatus("sending");
                                const form = e.currentTarget;

                                const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
                                const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
                                const autoReplyId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID || 'template_3bmk2ob';
                                const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

                                if (!serviceId || !templateId || !publicKey) {
                                    console.error('Email service is not configured');
                                    setStatus("error");
                                    // Optionally provide a more specific error state or message here
                                    setTimeout(() => setStatus("idle"), 5000);
                                    return;
                                }

                                try {
                                    // Send Notification to you
                                    await emailjs.sendForm(
                                        serviceId,
                                        templateId,
                                        form,
                                        publicKey
                                    );

                                    // Send Auto-reply to sender
                                    await emailjs.sendForm(
                                        serviceId,
                                        autoReplyId,
                                        form,
                                        publicKey
                                    );

                                    setStatus("success");
                                    form.reset();

                                    // Reset status after 5 seconds
                                    setTimeout(() => setStatus("idle"), 5000);
                                } catch (error) {
                                    console.error('EmailJS Error:', error);
                                    setStatus("error");
                                    setTimeout(() => setStatus("idle"), 5000);
                                }
                            }}
                            className="space-y-4 md:space-y-6 relative z-10 w-full max-w-full overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold ml-4">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-foreground/5 border border-foreground/10 px-4 sm:px-6 py-4 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-foreground/10 transition-all text-foreground placeholder:text-foreground/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold ml-4">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full bg-foreground/5 border border-foreground/10 px-4 sm:px-6 py-4 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-foreground/10 transition-all text-foreground placeholder:text-foreground/20"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold ml-4">Phone</label>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <CountryCodeSelect
                                        name="countryCode"
                                        defaultValue="+91"
                                    />
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        placeholder="123 456 7890"
                                        className="flex-1 bg-foreground/5 border border-foreground/10 px-4 sm:px-6 py-4 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-foreground/10 transition-all text-foreground placeholder:text-foreground/20 min-w-0"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold ml-4">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-foreground/5 border border-foreground/10 px-4 sm:px-6 py-4 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-foreground/10 transition-all text-foreground resize-none placeholder:text-foreground/20"
                                ></textarea>
                            </div>
                            <div className="space-y-4">
                                <button
                                    disabled={status === "sending" || status === "success"}
                                    className={`w-full py-4 sm:py-5 text-sm sm:text-base font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg 
                                        ${status === "success"
                                            ? "bg-green-500 text-white shadow-green-500/25"
                                            : "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-primary/25"
                                        }
                                        disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                    {status === "sending" ? (
                                        "Sending..."
                                    ) : status === "success" ? (
                                        <>Sent Successfully <CheckCircle2 size={20} /></>
                                    ) : (
                                        <>Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" /></>
                                    )}
                                </button>

                                {status === "success" && (
                                    <p className="text-green-500 text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-300">
                                        Thanks for reaching out! I'll get back to you soon.
                                    </p>
                                )}

                                {status === "error" && (
                                    <p className="text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-300">
                                        Something went wrong. Please try again.
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
