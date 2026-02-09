"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
    const assemblyRef = useRef<SVGSVGElement>(null);
    const innerRef = useRef<SVGRectElement>(null);
    const outerRef = useRef<SVGRectElement>(null);
    const prismRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        const assembly = assemblyRef.current;
        const inner = innerRef.current;
        const outer = outerRef.current;
        const prism = prismRef.current;
        if (!assembly || !inner || !outer || !prism) return;

        // PRECISION BASELINE: Guaranteed centered coordinate system
        gsap.set([prism, inner, outer], { x: 0, y: 0, transformOrigin: "50% 50%" });
        gsap.set(assembly, { xPercent: -50, yPercent: -50, overflow: "visible" });

        const setAssemblyX = gsap.quickSetter(assembly, "x", "px");
        const setAssemblyY = gsap.quickSetter(assembly, "y", "px");
        const setAssemblyRot = gsap.quickSetter(assembly, "rotate", "deg");
        const setAssemblyScaleX = gsap.quickSetter(assembly, "scaleX");
        const setAssemblyScaleY = gsap.quickSetter(assembly, "scaleY");

        const setInnerRot = gsap.quickSetter(inner, "rotate", "deg");
        const setOuterRot = gsap.quickSetter(outer, "rotate", "deg");

        let mouse = { x: 0, y: 0 };
        let pos = { x: 0, y: 0 };
        let time = 0;

        const updatePosition = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onTick = () => {
            const vx = (mouse.x - pos.x) * 0.18;
            const vy = (mouse.y - pos.y) * 0.18;

            pos.x += vx;
            pos.y += vy;

            setAssemblyX(pos.x);
            setAssemblyY(pos.y);

            const speed = Math.sqrt(vx * vx + vy * vy);
            const angle = Math.atan2(vy, vx) * (180 / Math.PI);
            setAssemblyRot(angle);

            // Subtle stretching for that high-end feel
            const stretch = Math.min(speed / 40, 1.3);
            setAssemblyScaleX(1 + stretch);
            setAssemblyScaleY(1 - stretch * 0.4);

            time += 0.8;
            setInnerRot(time);
            setOuterRot(-time * 0.6);

            requestAnimationFrame(onTick);
        };

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
                const isDark = document.documentElement.classList.contains('dark');
                const hoverColor = isDark ? "#ffffff" : "#000000";

                // FIXED: Direct Theme-aware Hover (Explicit colors + full opacity)
                gsap.to([inner, outer], {
                    stroke: hoverColor,
                    strokeOpacity: 1,
                    strokeWidth: 2,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(prism, {
                    fill: hoverColor,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        };

        const handleHoverEnd = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
                gsap.to(inner, {
                    stroke: "var(--foreground)",
                    strokeOpacity: 0.4,
                    strokeWidth: 1,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
                gsap.to(outer, {
                    stroke: "var(--primary)",
                    strokeOpacity: 0.4,
                    strokeWidth: 1,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
                gsap.to(prism, {
                    fill: "var(--primary)",
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
            }
        };

        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mouseover", handleHoverStart);
        window.addEventListener("mouseout", handleHoverEnd);
        const animId = requestAnimationFrame(onTick);

        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mouseover", handleHoverStart);
            window.removeEventListener("mouseout", handleHoverEnd);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
        >
            <svg
                ref={assemblyRef}
                width="200"
                height="200"
                viewBox="-100 -100 200 200"
                className="absolute top-0 left-0"
            >
                <circle
                    ref={prismRef}
                    r="2"
                    fill="var(--primary)"
                    cx="0"
                    cy="0"
                />
                <rect
                    ref={innerRef}
                    x="-12"
                    y="-12"
                    width="24"
                    height="24"
                    rx="6"
                    fill="none"
                    stroke="var(--foreground)"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                />
                <rect
                    ref={outerRef}
                    x="-17"
                    y="-17"
                    width="34"
                    height="34"
                    rx="10"
                    fill="none"
                    stroke="var(--primary)"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                />
            </svg>
        </div>
    );
};

export default CustomCursor;
