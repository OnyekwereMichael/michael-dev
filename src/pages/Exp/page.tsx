'use client';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useState } from 'react';
import jc from '../../assets/jc4.png'
import vendors from '../../assets/vendors.jpeg'
import veriscore from '../../assets/veriscore.png'
import devp from '../../assets/Untitled design (1).png'

const EASE = [0.22, 0.85, 0.32, 1] as const;
const STEP = 0.2;     // gap between each element in the sequence (seconds)
const START = 0.25;   // delay before the first element
const SIDE = 80;      // slide-in distance in px. Positive = from the right, negative = from the left.

export default function Experience() {
    const [hoveredExperience, setHoveredExperience] = useState(0);
    const reduce = useReducedMotion();
    const delayFor = (i: number) => START + i * STEP;

    // Parent only flips hidden → visible; each child owns its direction + timing via `custom`
    const containerVariants: Variants = { hidden: {}, visible: {} };

    // "CHAPTER IV" rises out of an invisible mask
    const maskedRise: Variants = {
        hidden: { y: reduce ? 0 : '110%' },
        visible: (i: number) => ({
            y: 0,
            transition: { duration: 1.1, delay: delayFor(i), ease: EASE },
        }),
    };

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

    const experiences = [
        { name: 'James Chase', logo: jc },
        { name: 'Veriscore', logo: veriscore },
        { name: 'DevPilot', logo: devp },
        { name: 'Vendors App', logo: vendors },
    ];

    // Used only when the logo swaps on hover (unchanged behaviour)
    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: EASE },
        },
        exit: { opacity: 0, scale: 0.8 },
    };

    // Sequence: 0 chapter · 1 logo · 2 label · 3… each experience (one by one)
    const LIST_START = 3;

    return (
        <motion.main
            className="experience-main"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="experience-logo-section">
                {/* 1 · Chapter IV — rises from the bottom */}
                <div style={{ overflow: 'hidden' }}>
                    <motion.h2
                        className="experience-chapter max-sm:pt-2!"
                        variants={maskedRise}
                        custom={0}
                        style={{ willChange: 'transform' }}
                    >
                        CHAPTER IV
                    </motion.h2>
                </div>

                {/* 2 · Logo — rises from the bottom.
                    Outer element = entrance. Inner keyed element = the hover swap, so the two never fight. */}
                <motion.div variants={fromBottom} custom={1} className="experience-logo-container">
                    <motion.div
                        key={hoveredExperience}
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <img
                            src={experiences[hoveredExperience].logo}
                            alt={experiences[hoveredExperience].name}
                            className="experience-logo"
                        />
                    </motion.div>
                </motion.div>
            </div>

            <div className="experience-right">
                {/* 3 · Label — slides in from the side */}
                <motion.p variants={fromSide} custom={2} className="experience-label">
                    SELECTED EXPERIENCES
                </motion.p>

                {/* 4+ · Experience links — slide in from the side, one by one */}
                <div className="experience-list">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            variants={fromSide}
                            custom={LIST_START + idx}
                            className="experience-item-wrapper"
                            onMouseEnter={() => setHoveredExperience(idx)}
                            onMouseLeave={() => setHoveredExperience(0)}
                        >
                            <h3
                                className={`experience-item ${hoveredExperience === idx ? 'experience-item--active' : 'experience-item--inactive'}`}
                            >
                                {exp.name}
                            </h3>

                            {hoveredExperience === idx && (
                                <motion.div
                                    className="experience-item-arrow"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    ↗
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.main>
    );
}