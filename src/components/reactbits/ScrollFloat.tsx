"use client";

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollFloatProps {
    children: string;
    containerClassName?: string;
    textClassName?: string;
    stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
    children,
    containerClassName = '',
    textClassName = '',
    stagger = 0.03
}) => {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scrollY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        mass: 0.1
    });

    const chars = useMemo(() => children.split(''), [children]);

    return (
        <h2 ref={containerRef} className={`my-5 overflow-hidden ${containerClassName}`}>
            <span className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>
                {chars.map((char, i) => {
                    const start = i * stagger;
                    const end = start + 0.5; // Increased range for smoother transition

                    // Custom transform for the "float" effect
                    const y = useTransform(scrollY, [start, end], [50, 0]); // Reduced movement range
                    const opacity = useTransform(scrollY, [start, end], [0, 1]);
                    const scale = useTransform(scrollY, [start, end], [1.5, 1]);

                    return (
                        <motion.span
                            key={i}
                            style={{
                                display: 'inline-block',
                                y,
                                opacity,
                                scale,
                                transformOrigin: '50% 100%',
                                whiteSpace: char === ' ' ? 'pre' : 'normal'
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    );
                })}
            </span>
        </h2>
    );

};

export default ScrollFloat;
