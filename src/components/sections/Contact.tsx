"use client";

import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";

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

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] overflow-hidden">

                        <div className="absolute top-6 right-2 p-10 opacity-20 pointer-events-none">
                            <Send size={120} className="text-primary -rotate-12 translate-x-10 -translate-y-10" />
                        </div>

                        <h4 className="text-3xl font-bold text-white mb-2">Send Message</h4>
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
                                    setStatus("idle");
                                    console.error('Email service is not configured');
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
                            className="space-y-6 relative z-10"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold ml-4">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold ml-4">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold ml-4">Phone</label>
                                <div className="flex gap-4">
                                    <select
                                        name="countryCode"
                                        className="bg-white/5 border border-white/10 px-4 py-4 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white w-[140px] appearance-none cursor-pointer"
                                        defaultValue="+91"
                                    >
                                        <option value="+1">🇺🇸 +1</option>
                                        <option value="+44">🇬🇧 +44</option>
                                        <option value="+91">🇮🇳 +91</option>
                                        <option value="+971">🇦🇪 +971</option>
                                        <option value="+61">🇦🇺 +61</option>
                                        <option value="+49">🇩🇪 +49</option>
                                        <option value="+33">🇫🇷 +33</option>
                                        <option value="+81">🇯🇵 +81</option>
                                        <option value="+86">🇨🇳 +86</option>
                                    </select>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        placeholder="123 456 7890"
                                        className="flex-1 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
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
                                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white resize-none placeholder:text-white/20"
                                ></textarea>
                            </div>
                            <div className="space-y-4">
                                <button
                                    disabled={status === "sending" || status === "success"}
                                    className={`w-full py-5 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg 
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
