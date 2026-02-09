import React from "react";
import { portfolioData } from "@/data/portfolio";

const Footer = () => {
    return (
        <footer className="py-12 px-6 border-t border-foreground/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-muted-foreground text-sm">
                    © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
                </p>
                <div className="flex gap-8">
                    <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
                    <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
