'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimationControls, useReducedMotion, type Variants } from 'framer-motion';
import curi from '../assets/Untitled design.png';
import vendorsapp from '../assets/vendors.jpeg';
import veriscore from '../assets/veriscore.png';
import ProjectDetail, { type Project } from './ProjectDetail';

const EASE = [0.22, 0.85, 0.32, 1] as const;
const TITLE = 'ALL WORK';
const KEY_STEP = 0.08;                          // gap between piano-key letters
const cardDelay = (i: number) => 0.9 + i * 0.14; // when each card starts
const SPINNER_MS = 1400;

const projects: Project[] = [
    {
        number: '01', category: 'E-LEARNING', year: '2026', title: 'Curi', image: curi,
        overview: 'A digital learning experience designed to make the education process simpler, clearer, and more accessible for everyone.',
        client: 'Curi Education', preview: '#', scope: 'Frontend Developer', nextProject: 'Vendors app',
    },
    {
        number: '02', category: 'E-COMMERCE', year: '2026', title: 'Vendors app', image: vendorsapp,
        overview: 'A platform connecting vendors with buyers, enhancing the e-commerce experience with streamlined inventory management.',
        client: 'Vendors Inc.', preview: '#', scope: 'Frontend Developer', nextProject: 'Veriscore',
    },
    {
        number: '03', category: 'FINTECH', year: '2026', title: 'Veriscore', image: veriscore,
        overview: 'A financial scoring tool designed to give clear insights into credit and lending potentials.',
        client: 'Veriscore Finance', preview: '#', scope: 'Frontend Developer', nextProject: 'Betahaus',
    },
    {
        number: '04', category: 'REAL ESTATE', year: '2026', title: 'Betahaus',
        image: 'https://images.unsplash.com/photo-1549887534-7051a7b95e72?w=800&h=600&fit=crop',
        overview: 'A real estate platform for finding and managing co-working spaces and office rentals easily.',
        client: 'Betahaus Ltd', preview: '#', scope: 'Web Developer', nextProject: 'Evo Money',
    },
];

/* Image with a graceful fallback: if a picture fails to load, show a styled monogram tile instead of a broken icon */
function ProjectImage({ src, title }: { src: string; title: string }) {
    const [failed, setFailed] = useState(false);
    if (failed) {
        return (
            <div className="wm-fallback" role="img" aria-label={title}>
                <span className="font-serif-2">{title.charAt(0)}</span>
            </div>
        );
    }
    return <img src={src} alt={title} className="wm-img" onError={() => setFailed(true)} draggable={false} />;
}

export default function WorksModal({ onClose }: { onClose?: () => void }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [pendingProject, setPendingProject] = useState<Project | null>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const reduce = useReducedMotion();
    const keys = useAnimationControls();

    useEffect(() => () => clearTimeout(timer.current), []);

    const openProject = (p: Project) => {
        if (pendingProject) return;
        setPendingProject(p);
        timer.current = setTimeout(() => {
            setSelectedProject(p);
            setPendingProject(null);
        }, SPINNER_MS);
    };

    // Heading plays in as soon as the screen opens
    useEffect(() => { keys.start('enter'); }, [keys]);

    // Escape closes + lock background scroll
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !selectedProject && onClose?.();
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose, selectedProject]);

    /* ---------- variants ---------- */
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

    const fromRight: Variants = {
        hidden: { opacity: 0, x: reduce ? 0 : 40 },
        visible: (d: number) => ({ opacity: 1, x: 0, transition: { duration: 0.9, delay: d, ease: EASE } }),
    };

    const fromBottom: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        visible: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: d, ease: EASE } }),
    };

    // Card = just a switch; every part inside owns its motion
    const cardSwitch: Variants = { hidden: {}, visible: {} };

    // Thin top rule draws itself left → right
    const drawRule: Variants = {
        hidden: { scaleX: reduce ? 1 : 0, opacity: reduce ? 0 : 1 },
        visible: (d: number) => ({ scaleX: 1, opacity: 1, transition: { duration: 1, delay: d, ease: EASE } }),
    };

    // Image: a curtain wipes down to reveal it while it settles from slightly zoomed-in
    const reveal: Variants = {
        hidden: { clipPath: reduce ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)', opacity: reduce ? 0 : 1 },
        visible: (d: number) => ({ clipPath: 'inset(0 0 0% 0)', opacity: 1, transition: { duration: 1.1, delay: d, ease: EASE } }),
    };
    const settle: Variants = {
        hidden: { scale: reduce ? 1 : 1.3 },
        visible: (d: number) => ({ scale: 1, transition: { duration: 1.5, delay: d, ease: EASE } }),
    };

    // Text lines rise out of a mask. `custom` = absolute delay (s)
    const line: Variants = {
        hidden: { y: reduce ? 0 : '120%', opacity: reduce ? 0 : 1 },
        visible: (d: number) => ({ y: 0, opacity: 1, transition: { duration: 0.8, delay: d, ease: EASE } }),
    };

    const mask = { display: 'block', overflow: 'hidden' } as const;
    const chars = TITLE.split('');

    return (
        <>
            <motion.div
                className="wm-screen"
                role="dialog"
                aria-modal="true"
                aria-label="All work"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4, ease: EASE } }}
                transition={{ duration: 0.4 }}
            >
                <motion.div
                    className="wm-fade"
                    animate={{ opacity: pendingProject ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="wm-container">
                        {/* ---------- Header ---------- */}
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
                                <motion.span
                                    className="wm-count font-serif-2"
                                    variants={fromRight} initial="hidden" animate="visible" custom={1.1}
                                >
                                    ({projects.length})
                                </motion.span>
                                {onClose && (
                                    <motion.button
                                        className="wm-close"
                                        onClick={onClose}
                                        aria-label="Close all work"
                                        variants={fromRight} initial="hidden" animate="visible" custom={1.25}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                        </svg>
                                    </motion.button>
                                )}
                            </div>
                        </header>

                        {/* ---------- Project grid ---------- */}
                        <div className="wm-grid">
                            {projects.map((p, i) => {
                                const d = cardDelay(i);
                                return (
                                    <motion.article
                                        key={p.number}
                                        className="wm-card"
                                        variants={cardSwitch}
                                        initial="hidden"
                                        animate="visible"
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Open ${p.title}`}
                                        onClick={() => openProject(p)}
                                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openProject(p))}
                                    >
                                        <div className="wm-card-inner">
                                            {/* rule + number / category */}
                                            <motion.span className="wm-rule" variants={drawRule} custom={d} />
                                            <div className="wm-row">
                                                <span style={mask}>
                                                    <motion.span className="wm-number font-serif-2" style={{ display: 'block' }} variants={line} custom={d + 0.2}>
                                                        {p.number}
                                                    </motion.span>
                                                </span>
                                                <span style={mask}>
                                                    <motion.span className="wm-category" style={{ display: 'block' }} variants={line} custom={d + 0.28}>
                                                        {p.category} — {p.year}
                                                    </motion.span>
                                                </span>
                                            </div>

                                            {/* image */}
                                            <motion.div className="wm-media" variants={reveal} custom={d + 0.15}>
                                                <motion.div className="wm-media-scale" variants={settle} custom={d + 0.15}>
                                                    <ProjectImage src={p.image as string} title={p.title} />
                                                </motion.div>
                                                <span className="wm-view">View project <span className='text-sm!' aria-hidden="true">↗</span></span>
                                            </motion.div>

                                            {/* title */}
                                            <span style={mask} className="wm-name-mask">
                                                <motion.span className="wm-name font-serif-2" style={{ display: 'block' }} variants={line} custom={d + 0.7}>
                                                    {p.title}
                                                    <span className="wm-arrow" aria-hidden="true">↗</span>
                                                </motion.span>
                                            </span>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>

                        {/* ---------- Footer ---------- */}
                        <motion.footer
                            className="wm-footer "
                            variants={fromBottom} initial="hidden" animate="visible" custom={1.9}
                        >
                            <span className='max-sm:mb-5!'>SELECTED WORK — 2026</span>
                            <span className="wm-footer-hint">Select a project to explore</span>
                        </motion.footer>
                    </div>
                </motion.div>

                {/* Spinner while the project opens */}
                <motion.div
                    className="wm-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: pendingProject ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: pendingProject ? 0.3 : 0 }}
                    style={{ pointerEvents: pendingProject ? 'auto' : 'none' }}
                    role="status"
                >
                    <span className="wm-spinner" />
                    <span className="wm-loader-text">{pendingProject ? pendingProject.title.toUpperCase() : ''}</span>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </>
    );
}