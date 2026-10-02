'use client';
import { useEffect } from 'react';
import { motion, useAnimationControls, useReducedMotion, type Variants } from 'framer-motion';
import curi from '../assets/Untitled design (1).png';
import vendorsapp from '../assets/vendors.jpeg';
import veriscore from '../assets/veriscore.png';

const EASE = [0.22, 0.85, 0.32, 1] as const;
const TITLE = 'ALL WORK';
const KEY_STEP = 0.08;                    // gap between each piano-key letter
const cardDelay = (i: number) => 1.0 + i * 0.16;

const projects = [
    { number: '01', category: 'E-LEARNING', year: '2026', title: 'Curi', image: curi },
    { number: '02', category: 'E-COMMERCE', year: '2026', title: 'Vendors app', image: vendorsapp },
    { number: '03', category: 'FINTECH', year: '2026', title: 'Veriscore', image: veriscore },
    {
        number: '04', category: 'REAL ESTATE', year: '2026', title: 'Betahaus',
        image: 'https://images.unsplash.com/photo-1549887534-7051a7b95e72?w=800&h=600&fit=crop',
    },
];

export default function WorksModal({ onClose }: { onClose?: () => void }) {
    const reduce = useReducedMotion();
    const keys = useAnimationControls();

    // Play the heading in as soon as the screen opens
    useEffect(() => { keys.start('enter'); }, [keys]);

    // Escape closes + lock background scroll
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose?.();
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose]);

    /* ---------- variants ---------- */
    const screen: Variants = { hidden: {}, visible: {} };

    // Heading: letters hop up like piano keys
    const letter: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 48 },
        enter: (i: number) => ({
            opacity: 1,
            y: reduce ? 0 : [48, -24, 0],
            transition: {
                duration: reduce ? 0.4 : 0.8,
                delay: 0.2 + i * KEY_STEP,
                times: [0, 0.55, 1],
                ease: ['easeOut', 'easeInOut'],
                opacity: { duration: 0.25, delay: 0.2 + i * KEY_STEP },
            },
        }),
        wave: (i: number) => ({
            y: reduce ? 0 : [0, -24, 0],
            transition: { duration: 0.55, delay: i * KEY_STEP, times: [0, 0.45, 1], ease: ['easeOut', 'easeInOut'] },
        }),
    };

    // Count + close button slide in from the right / fade
    const fromRight: Variants = {
        hidden: { opacity: 0, x: reduce ? 0 : 40 },
        visible: (d: number) => ({ opacity: 1, x: 0, transition: { duration: 0.9, delay: d, ease: EASE } }),
    };

    // Each card: rises from the bottom
    const card: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 40 },
        visible: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: d, ease: EASE } }),
    };

    // Image: a curtain wipes down to reveal it, while it settles from slightly zoomed-in
    const reveal: Variants = {
        hidden: { clipPath: reduce ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' },
        visible: (d: number) => ({ clipPath: 'inset(0 0 0% 0)', transition: { duration: 1, delay: d + 0.1, ease: EASE } }),
    };
    const settle: Variants = {
        hidden: { scale: reduce ? 1 : 1.25 },
        visible: (d: number) => ({ scale: 1, transition: { duration: 1.4, delay: d + 0.1, ease: EASE } }),
    };

    // Text lines rise out of a mask. `custom` = absolute delay (s)
    const line: Variants = {
        hidden: { y: reduce ? 0 : '115%', opacity: reduce ? 0 : 1 },
        visible: (d: number) => ({ y: 0, opacity: 1, transition: { duration: 0.8, delay: d, ease: EASE } }),
    };

    const mask = { overflow: 'hidden', display: 'block' } as const;
    const chars = TITLE.split('');

    return (
        <motion.div
            className="wm-screen"
            role="dialog"
            aria-modal="true"
            aria-label="All work"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.4, ease: EASE } }}
            variants={screen}
        >
            <div className="wm-container">
                {/* Header */}
                <header className="wm-header">
                    <h1
                        className="wm-title font-serif-2"
                        aria-label={TITLE}
                        onMouseEnter={() => keys.start('wave')}
                    >
                        {chars.map((c, i) =>
                            c === ' ' ? (
                                <span key={i} className="wm-space" aria-hidden="true" />
                            ) : (
                                <motion.span
                                    key={i}
                                    aria-hidden="true"
                                    custom={i}
                                    variants={letter}
                                    initial="hidden"
                                    animate={keys}
                                    style={{ display: 'inline-block', willChange: 'transform' }}
                                >
                                    {c}
                                </motion.span>
                            )
                        )}
                    </h1>

                    <div className="wm-header-right">
                        <motion.span className="wm-count font-serif-2" variants={fromRight} custom={1.2}>
                            ({projects.length})
                        </motion.span>
                        {onClose && (
                            <motion.button
                                className="wm-close"
                                onClick={onClose}
                                aria-label="Close all work"
                                variants={fromRight}
                                custom={1.35}
                            >
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                    <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            </motion.button>
                        )}
                    </div>
                </header>

                {/* Project grid */}
                <div className="wm-grid">
                    {projects.map((p, i) => {
                        const d = cardDelay(i);
                        return (
                            <motion.article
                                key={p.number}
                                className="wm-card"
                                variants={card}
                                custom={d}
                                tabIndex={0}
                            >
                                <div className="wm-card-inner">
                                    <motion.div className="wm-media" variants={reveal} custom={d}>
                                        <motion.div className="wm-media-scale" variants={settle} custom={d}>
                                            <img src={p.image as string} alt={p.title} className="wm-img" />
                                        </motion.div>
                                    </motion.div>

                                    <div className="wm-meta">
                                        <span style={mask}>
                                            <motion.span className="wm-number font-serif-2" style={{ display: 'block' }} variants={line} custom={d + 0.55}>
                                                {p.number}
                                            </motion.span>
                                        </span>
                                        <span style={mask}>
                                            <motion.span className="wm-category" style={{ display: 'block' }} variants={line} custom={d + 0.63}>
                                                {p.category} — {p.year}
                                            </motion.span>
                                        </span>
                                        <span style={mask}>
                                            <motion.span className="wm-name font-serif-2" style={{ display: 'block' }} variants={line} custom={d + 0.71}>
                                                {p.title}<span className="wm-arrow" aria-hidden="true">↗</span>
                                            </motion.span>
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}