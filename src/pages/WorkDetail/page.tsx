'use client';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useState } from 'react';
import vendorsapp from '../../assets/vendors.jpeg'
import curi from '../../assets/WhatsApp Image 2026-10-06 at 10.35.14.jpeg'

const EASE = [0.22, 0.85, 0.32, 1] as const;
const STEP = 0.2;     // gap between each element in the sequence (seconds)
const START = 0.25;   // delay before the first element
const SIDE = 80;      // slide-in distance in px. Positive = from the right, negative = from the left.

export default function WorkDetail() {
    const [hoveredProject, setHoveredProject] = useState(0);
    const reduce = useReducedMotion();
    const delayFor = (i: number) => START + i * STEP;

    // Parent only flips hidden → visible; every child owns its direction + timing via `custom`
    const containerVariants: Variants = { hidden: {}, visible: {} };

    const fromBottom: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 50 },
        visible: (i: number) => ({
            opacity: 1, y: 0,
            transition: { duration: 1, delay: delayFor(i), ease: EASE },
        }),
    };

    const fromSide: Variants = {
        hidden: { opacity: 0, x: reduce ? 0 : SIDE },
        visible: (i: number) => ({
            opacity: 1, x: 0,
            transition: { duration: 0.9, delay: delayFor(i), ease: EASE },
        }),
    };

    // "CHAPTER II" rises out of an invisible mask
    const maskedRise: Variants = {
        hidden: { y: reduce ? 0 : '110%' },
        visible: (i: number) => ({
            y: 0,
            transition: { duration: 1.1, delay: delayFor(i), ease: EASE },
        }),
    };

    const projects = [
        { id: 1, title: 'Curi', image: curi },
        { id: 2, title: 'Vendors app', image: vendorsapp },
        { id: 3, title: 'Slider', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&h=500&fit=crop' },
        // { id: 4, title: 'Betahaus', image: 'https://images.unsplash.com/photo-1549887534-7051a7b95e72?w=500&h=500&fit=crop' },
    ];

    const currentImage = projects[hoveredProject].image;

    // Sequence: 0 chapter · 1 image · 2 label · 3… each project (one by one) · last CTA
    const PROJECT_START = 3;
    const CTA_INDEX = PROJECT_START + projects.length;

    return (
        <motion.main
            className="work-detail-main"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Left Section */}
            <div className="work-detail-left">
                {/* 1 · Chapter II — rises from the bottom */}
                <div style={{ overflow: 'hidden' }}>
                    <motion.h2
                        className="work-detail-chapter font-serif-2"
                        variants={maskedRise}
                        custom={0}
                        style={{ willChange: 'transform' }}
                    >
                        CHAPTER II
                    </motion.h2>
                </div>

                {/* 2 · Image — from the bottom */}
                <motion.div variants={fromBottom} custom={1} className="work-detail-image">
                    <div className="work-detail-placeholder">
                        <motion.img
                            key={hoveredProject}
                            src={currentImage}
                            alt={projects[hoveredProject].title}
                            className="work-detail-img"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Right Section */}
            <div className="work-detail-right">
                {/* 3 · Label — slides in from the side */}
                <motion.div variants={fromSide} custom={2} className="work-detail-label max-sm:mt-4!">
                    RELATED WORK
                </motion.div>


                <div className="work-detail-projects">
                    {projects.map((project, index) => {
                        const isActive = index === hoveredProject;
                        return (

                            <motion.div
                                key={project.id}
                                className="work-detail-project-item"
                                variants={fromSide}
                                custom={PROJECT_START + index}
                            >
                                <motion.div
                                    onMouseEnter={() => setHoveredProject(index)}
                                    onMouseLeave={() => setHoveredProject(0)}
                                    whileHover={{ x: 8 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    <div className="work-detail-project-header">
                                        <motion.p
                                            className="work-detail-project-title"
                                            animate={{
                                                opacity: isActive ? 1 : 0.4,
                                                color: isActive ? '#2e2b28' : '#b0a8a0'
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {project.title}
                                        </motion.p>
                                        <motion.span
                                            className="work-detail-project-arrow"
                                            animate={{
                                                opacity: isActive ? 1 : 0.2,
                                                x: isActive ? 4 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            ↗
                                        </motion.span>
                                    </div>
                                    {index < projects.length - 1 && (
                                        <motion.div
                                            className="work-detail-divider"
                                            animate={{ backgroundColor: isActive ? '#d97706' : '#d0d0d0' }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Last · CTA — from the bottom */}
                <motion.div variants={fromBottom} custom={CTA_INDEX} className="work-detail-cta">
                    <motion.button
                        className="work-detail-link"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-works'))}
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        View All Work
                        <motion.span
                            className="work-detail-arrow max-sm:hidden!"
                            whileHover={{ x: 3 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            →
                        </motion.span>
                        <motion.span
                            className="work-detail-arrow hidden! max-sm:block!"
                            whileHover={{ x: 3 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            ↗
                        </motion.span>
                    </motion.button>
                </motion.div>
            </div>
        </motion.main>
    );
}