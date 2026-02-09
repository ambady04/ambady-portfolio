"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);
    const orb3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating animation for orbs
            const animateOrb = (ref: React.RefObject<HTMLDivElement | null>, delay: number) => {
                if (!ref.current) return;
                gsap.to(ref.current, {
                    x: "random(-100, 100)",
                    y: "random(-100, 100)",
                    duration: "random(10, 20)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: delay
                });
            };

            animateOrb(orb1Ref, 0);
            animateOrb(orb2Ref, 2);
            animateOrb(orb3Ref, 4);

            // Subtle rotation for the whole container to keep the mesh "alive"
            gsap.to(".mesh-blob", {
                rotate: 360,
                duration: 40,
                repeat: -1,
                ease: "none"
            });
        }, containerRef);

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 40;

            gsap.to([orb1Ref.current, orb2Ref.current, orb3Ref.current], {
                xPercent: xPos,
                yPercent: yPos,
                duration: 2,
                ease: "power2.out",
                stagger: 0.1
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            ctx.revert();
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Base Dark Background */}
            <div className="absolute inset-0 bg-black" />

            {/* Animated Mesh Blobs */}
            <div
                ref={orb1Ref}
                className="mesh-blob absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] opacity-60"
            />
            <div
                ref={orb2Ref}
                className="mesh-blob absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/20 rounded-full blur-[150px] opacity-40"
            />
            <div
                ref={orb3Ref}
                className="mesh-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[#BA63F8]/10 rounded-full blur-[100px] opacity-30"
            />

            {/* Particle / Star Field */}
            <div className="absolute inset-0 opacity-40">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full animate-pulse shadow-[0_0_2px_1px_rgba(255,255,255,0.3)]"
                        style={{
                            width: `${Math.random() * 2}px`,
                            height: `${Math.random() * 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `2s`
                        }}
                    />
                ))}
            </div>

            {/* Grain Overlay for Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>
    );
};

export default HeroBackground;
