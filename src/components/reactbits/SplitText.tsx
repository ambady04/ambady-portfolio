"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: any;
    splitType?: 'chars' | 'words';
    threshold?: number;
    rootMargin?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    textAlign?: React.CSSProperties['textAlign'];
}

const SplitText: React.FC<SplitTextProps> = ({
    text,
    className = '',
    delay = 50,
    duration = 0.5,
    ease = [0.215, 0.61, 0.355, 1], // easeOutCubic
    splitType = 'chars',
    threshold = 0.1,
    rootMargin = '0px',
    tag = 'p',
    textAlign = 'center'
}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);
    const elements = splitType === 'chars' ? text.split('') : text.split(' ');

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current as Element);
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const Tag = tag as any;

    return (
        <Tag
            ref={ref}
            className={`inline-block overflow-hidden ${className}`}
            style={{ textAlign, whiteSpace: 'normal', wordBreak: 'break-word' }}
        >
            {elements.map((element, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
                    <motion.span
                        initial={{ y: '100%', opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                        transition={{
                            duration: duration,
                            delay: (i * delay) / 1000,
                            ease: ease
                        }}
                        style={{ display: 'inline-block' }}
                    >
                        {element === ' ' ? '\u00A0' : element}
                    </motion.span>
                    {splitType === 'words' && i < elements.length - 1 && <span key={`space-${i}`}>&nbsp;</span>}
                </span>
            ))}
        </Tag>
    );
};

export default SplitText;
