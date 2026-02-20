"use client";

import React, { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ThemeToggle } from "./ThemeToggle";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
    ];

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: href, autoKill: true },
            ease: "power4.inOut",
        });
        setIsOpen(false);
    };

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4",
                    scrolled ? "translate-y-0" : "translate-y-0"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between bg-[var(--glass-bg)] backdrop-blur-lg border border-[var(--glass-border)] px-4 md:px-6 py-3 rounded-2xl">
                    <a
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/';
                        }}
                        className="text-xl md:text-2xl font-black tracking-tighter text-foreground"
                    >
                        Ambady<span className="text-primary italic">.</span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href)}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <a
                                href="#contact"
                                onClick={(e) => handleScrollTo(e, "#contact")}
                                className="px-5 py-2 bg-primary text-primary-foreground font-bold rounded-full text-sm hover:scale-105 transition-all transform active:scale-95"
                            >
                                Hire Me
                            </a>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex items-center space-x-4 md:hidden">
                        <ThemeToggle />
                        {!isOpen && (
                            <button
                                className="text-foreground"
                                onClick={() => setIsOpen(true)}
                            >
                                <Menu size={28} />
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 md:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Content */}
            <div
                className={cn(
                    "fixed top-4 left-4 right-4 bottom-4 z-[70] md:hidden flex flex-col items-center justify-center space-y-8 transition-all duration-500 rounded-3xl overflow-hidden",
                    "bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--glass-border)] shadow-2xl",
                    isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95 pointer-events-none"
                )}
            >
                {/* Close Button Inside Menu */}
                <button
                    className="absolute top-6 right-6 p-2 rounded-full bg-foreground/5 text-foreground hover:bg-foreground/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center space-y-6 w-full px-8">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScrollTo(e, link.href)}
                            className={cn(
                                "text-3xl font-bold tracking-tight text-foreground hover:text-primary transition-all duration-300 transform",
                                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            )}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div
                        className={cn(
                            "w-full pt-4 transition-all duration-500 delay-300 transform",
                            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        )}
                    >
                        <a
                            href="#contact"
                            onClick={(e) => handleScrollTo(e, "#contact")}
                            className="flex items-center justify-center w-full py-4 bg-primary text-primary-foreground font-black text-xl rounded-2xl shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Hire Me
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
