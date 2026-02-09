"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const HeroBackground = () => {
    const [isMounted, setIsMounted] = React.useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);
    const orb3Ref = useRef<HTMLDivElement>(null);
    const orb4Ref = useRef<HTMLDivElement>(null);
    const orb5Ref = useRef<HTMLDivElement>(null);
    const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

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
            animateOrb(orb4Ref, 1);
            animateOrb(orb5Ref, 3);

            // Animate Bubbles (Light Mode Only)
            bubblesRef.current.forEach((bubble, i) => {
                if (!bubble) return;
                gsap.to(bubble, {
                    y: "-100vh",
                    x: `random(-50, 50)`,
                    rotation: "random(-180, 180)",
                    duration: "random(15, 25)",
                    repeat: -1,
                    delay: i * 1.5,
                    ease: "none",
                });
            });

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

            gsap.to([orb1Ref.current, orb2Ref.current, orb3Ref.current, orb4Ref.current, orb5Ref.current], {
                xPercent: xPos,
                yPercent: yPos,
                duration: 2,
                ease: "power2.out",
                stagger: 0.1
            });

            // Parallax for bubbles
            bubblesRef.current.forEach((bubble, i) => {
                if (!bubble) return;
                const factor = (i % 3 + 1) * 20;
                gsap.to(bubble, {
                    xPercent: xPos * (factor / 10),
                    yPercent: yPos * (factor / 10),
                    duration: 1.5,
                    ease: "power1.out"
                });
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            ctx.revert();
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isMounted]);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Theme Aware Background */}
            <div className="absolute inset-0 bg-background" />

            {/* Light Mode subtle gradient - Added depth for light mode */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-background dark:hidden block" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-hex),0.08),transparent_50%)] dark:hidden block" />

            {/* Premium Aceternity Stars Background - Hidden in light mode */}
            <div className="dark:block hidden">
                <StarsBackground
                    starDensity={0.00015}
                    allStarsTwinkle={true}
                    twinkleProbability={0.7}
                    minTwinkleSpeed={0.5}
                    maxTwinkleSpeed={1.5}
                />

                {/* Premium Aceternity Shooting Stars */}
                <ShootingStars
                    minSpeed={15}
                    maxSpeed={15}
                    minDelay={2000}
                    maxDelay={5000}
                    starColor="#E1BBFC"
                    trailColor="#9F27F5"
                />
            </div>

            {/* Floating Bubbles (Light Mode Only) */}
            {isMounted && (
                <div className="absolute inset-0 dark:hidden">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            ref={(el) => { if (el) bubblesRef.current[i] = el; }}
                            className="absolute bg-primary/[0.08] border border-primary/20 rounded-full backdrop-blur-[4px]"
                            style={{
                                width: `${Math.random() * 60 + 20}px`,
                                height: `${Math.random() * 60 + 20}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100 + 100}%`,
                            }}
                        >
                            <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] bg-white/60 rounded-full blur-[1px]" />
                        </div>
                    ))}
                </div>
            )}

            {/* Animated Mesh Blobs */}
            <div
                ref={orb1Ref}
                className="mesh-blob absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/[0.08] dark:bg-primary/20 blur-[120px] rounded-full dark:mix-blend-screen mix-blend-multiply animate-pulse"
            />
            <div
                ref={orb2Ref}
                className="mesh-blob absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-primary/[0.08] dark:bg-primary/20 blur-[120px] rounded-full dark:mix-blend-screen mix-blend-multiply animate-pulse"
            />
            <div
                ref={orb3Ref}
                className="mesh-blob absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-primary/[0.05] dark:bg-primary/10 blur-[100px] rounded-full dark:mix-blend-screen mix-blend-multiply"
            />
            <div
                ref={orb4Ref}
                className="mesh-blob absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-secondary/[0.05] dark:bg-secondary/10 blur-[100px] rounded-full dark:mix-blend-screen mix-blend-multiply"
            />
            <div
                ref={orb5Ref}
                className="mesh-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] bg-primary/[0.06] dark:bg-primary/15 blur-[90px] rounded-full dark:mix-blend-screen mix-blend-multiply"
            />

            {/* Grain Overlay for Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>
    );
};

export default HeroBackground;
