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
                // FIXED: Zero-Tolerance Stable Hover (Color Only)
                // We keep geometry exactly the same to prevent any alignment "drift"
                gsap.to([inner, outer], {
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(prism, {
                    fill: "#ffffff",
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        };

        const handleHoverEnd = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
                gsap.to(inner, {
                    stroke: "rgba(255, 255, 255, 0.4)",
                    strokeWidth: 1,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
                gsap.to(outer, {
                    stroke: "rgba(255, 255, 255, 0.2)",
                    strokeWidth: 0.5,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
                gsap.to(prism, {
                    fill: "#BA63F8",
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
            style={{ mixBlendMode: "difference" }}
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
                    r="3"
                    fill="#BA63F8"
                    cx="0"
                    cy="0"
                />
                <rect
                    ref={innerRef}
                    x="-15"
                    y="-15"
                    width="30"
                    height="30"
                    rx="8"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="1"
                />
                <rect
                    ref={outerRef}
                    x="-22"
                    y="-22"
                    width="44"
                    height="44"
                    rx="12"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="0.5"
                />
            </svg>
        </div>
    );
};

export default CustomCursor;
