'use client';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useState } from 'react';
import jc from '../../assets/jc_logo.svg'
import vendors from '../../assets/vendors.jpeg'
import veriscore from '../../assets/Group.svg'
import devp from '../../assets/logo-dark.webp'
import jdc from '../../assets/jdc_logo.png'

const EASE = [0.22, 0.85, 0.32, 1] as const;
const STEP = 0.2;
const START = 0.25; 
const SIDE = 80;     

export default function Experience() {
    const [hoveredExperience, setHoveredExperience] = useState(0);
    const reduce = useReducedMotion();
    const delayFor = (i: number) => START + i * STEP;

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
        { name: 'JDC', logo: jdc, url: 'http://consulting.josonseth.com/' },
        { name: 'James Chase', logo: jc, url: 'https://james-chase.com/' },
        { name: 'Veriscore', logo: veriscore, url: 'https://veriscore.app/' },
        // { name: 'DevPilot', logo: devp, url: 'https://devpilot.io/' },
        // { name: 'Vendors App', logo: vendors, url: '#' },
    ];

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
    const CTA_INDEX = LIST_START + experiences.length;

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
                <motion.div 
                    variants={fromBottom} 
                    custom={1} 
                    className="experience-logo-container"
                    style={{
                        backgroundColor: experiences[hoveredExperience].name === 'DevPilot' ? '#000000' : undefined,
                        transition: 'background-color 0.3s ease'
                    }}
                >
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
                        <motion.a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={idx}
                            variants={fromSide}
                            custom={LIST_START + idx}
                            className="experience-item-wrapper"
                            style={{ textDecoration: 'none' }}
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
                        </motion.a>
                    ))}
                </div>

                {/* Last · CTA — from the bottom */}
                <motion.div variants={fromBottom} custom={CTA_INDEX} className="work-detail-cta" style={{ marginTop: '50px' }}>
                    <motion.button
                        className="work-detail-link"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-exp'))}
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        See All Experience 
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