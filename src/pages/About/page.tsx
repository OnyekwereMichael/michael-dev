'use client';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import myself from '../../assets/WhatsApp Image 2026-09-23 at 11.58.00.jpeg'

const EASE = [0.22, 0.85, 0.32, 1] as const;
const STEP = 0.28;   // gap between each element in the sequence (seconds)
const START = 0.25;  // delay before the first element

export default function About() {
    const reduce = useReducedMotion();
    const delayFor = (i: number) => START + i * STEP;

    // The parent only switches "hidden" → "visible"; each child decides its own direction and timing.
    const containerVariants: Variants = { hidden: {}, visible: {} };

    // Slides up from the bottom
    const fromBottom: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: delayFor(i), ease: EASE },
        }),
    };

    // Slides in from the left (short travel so it never sweeps across the left column)
    const fromLeft: Variants = {
        hidden: { opacity: 0, x: reduce ? 0 : -60 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { duration: 1, delay: delayFor(i), ease: EASE },
        }),
    };

    // "CHAPTER I": rises out of an invisible mask for a clean editorial reveal
    const maskedRise: Variants = {
        hidden: { y: reduce ? 0 : '110%' },
        visible: (i: number) => ({
            y: 0,
            transition: { duration: 1.1, delay: delayFor(i), ease: EASE },
        }),
    };

    return (
        <motion.main
            className="about-main bg-[#faf9f6]!"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="about-left">
                {/* 1 · Chapter I — from the bottom */}
                <div style={{ overflow: 'hidden' }}>
                    <motion.h2
                        className="about-chapter font-serif-2 text-[#2e2b28]!"
                        variants={maskedRise}
                        custom={0}
                        style={{ willChange: 'transform' }}
                    >
                        CHAPTER I
                    </motion.h2>
                </div>

                {/* 6 · Interests — from the bottom, last */}
                <motion.div variants={fromBottom} custom={5} className="about-interests text-[#2e2b28]!">
                    <p className="interests-text text-[#2e2b28]!">
                        Beyond building: <a href="#football" className='text-[#2e2b28]!'>football</a>, <a href="#watches" className='text-[#2e2b28]!'>Table Tennis</a>,{' '}
                        <a href="#aquariums" className='text-[#2e2b28]!'>movies</a>, and <a href="#martial" className='text-[#2e2b28]!'>drawing</a>.
                    </p>
                </motion.div>
            </div>

            <div className="about-right">
                {/* 2 · Quick intro label — from the left */}
                <motion.div variants={fromLeft} custom={1} className="about-label text-[#2e2b28]!">
                    QUICK INTRO
                </motion.div>

                {/* 3 · "Hi, I'm Michael…" — from the left */}
                <motion.div variants={fromLeft} custom={2} className="about-bio text-[#2e2b28]!">
                    <p className='text-[#2e2b28]!'>
                        Hi, I'm <span className="highlight">Michael</span>, a software developer with a thoughtful
                        approach to building clear, intuitive web & mobile apps, alongside AI agents that solve real problems.
                    </p>
                    <span className="work-for-tag  text-[#2e2b28]! ">WEB · MOBILE · AI AGENTS</span>
                </motion.div>

                <div className="about-portrait-section">
                    {/* 4 · More about me — from the bottom */}
                    <motion.div variants={fromBottom} custom={3} className="about-cta">
                        <button
                            className="more-link text-[#2e2b28]!"
                            onClick={() => window.dispatchEvent(new CustomEvent('open-about'))}
                        >
                            More about me <span className="arrow text-[#2e2b28]!">→</span>
                        </button>
                    </motion.div>

                    {/* 5 · Portrait — from the bottom */}
                    <motion.div variants={fromBottom} custom={4} className="about-portrait">
                        <div className="portrait-placeholder">
                            <img
                                src={myself}
                                alt="Michael Portrait"
                                className="portrait-img"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.main>
    );
}