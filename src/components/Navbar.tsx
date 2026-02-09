"use client";

import React, { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

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
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4",
                scrolled ? "translate-y-0" : "translate-y-0"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/50 backdrop-blur-lg border border-white/10 px-4 md:px-6 py-3 rounded-2xl">
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/';
                    }}
                    className="text-xl md:text-2xl font-black tracking-tighter text-white"
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
                    <a
                        href="#contact"
                        onClick={(e) => handleScrollTo(e, "#contact")}
                        className="px-5 py-2 bg-primary text-black font-bold rounded-full text-sm hover:bg-white transition-all transform hover:scale-105 active:scale-95"
                    >
                        Hire Me
                    </a>
                </div>

                {/* Mobile Toggle */}
                {!isOpen && (
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu size={28} />
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 bg-black z-50 md:hidden flex flex-col items-center justify-center space-y-8 transition-all duration-500",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                )}
            >
                <button
                    className="absolute top-8 right-8 text-white hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={32} />
                </button>

                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        className="text-3xl font-bold text-white hover:text-primary transition-colors"
                    >
                        {link.name}
                    </a>
                ))}
                <a
                    href="#contact"
                    onClick={(e) => handleScrollTo(e, "#contact")}
                    className="px-8 py-3 bg-primary text-black font-bold rounded-full text-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95"
                >
                    Hire Me
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
