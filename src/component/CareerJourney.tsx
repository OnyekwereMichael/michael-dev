'use client';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 0.85, 0.32, 1] as const;
const STEP = 0.25;    // gap between each step of the sequence (seconds)
const START = 0.25;   // delay before the first element

export default function CareerJourney() {
    const reduce = useReducedMotion();
    const delayFor = (i: number) => START + i * STEP;

    const careerData = [
        { period: '2026 — NOW', title: 'Frontend Engineer', company: 'Veriscore' },
        { period: '2026', title: 'Frontend Engineer', company: 'James Chase' },
        { period: '2025 — 2026', title: 'Mobile Developer', company: 'MCP' },
        { period: '2024 — 2025', title: 'Frontend Engineer', company: 'Kaino Tech' },
    ];

    // Parent only flips hidden → visible; each child owns its motion + timing via `custom`
    const containerVariants: Variants = { hidden: {}, visible: {} };

    // Title words rise out of an invisible mask
    const maskedRise: Variants = {
        hidden: { y: reduce ? 0 : '115%' },
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

    // Divider lines draw themselves in left → right once their entry has landed. `custom` = absolute delay (s).
    const drawLine: Variants = {
        hidden: { scaleX: reduce ? 1 : 0, opacity: reduce ? 0 : 1 },
        visible: (delay: number) => ({
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.9, delay, ease: EASE },
        }),
    };

    // Shared word-mask styling (clips the word until it has risen into place)
    const mask: React.CSSProperties = {
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'top',
        paddingBottom: '0.12em',
        marginBottom: '-0.12em',
    };

    /*
     * Sequence (left and right alternate, so the page builds in a zig-zag):
     *  Left : 0 accent · 1 CAREER · 2 JOURNEY · 3 subtitle
     *  Right: 1.5 · 2.5 · 3.5 · 4.5  → each timeline entry rises in, then its divider draws
     */
    return (
        <motion.div
            className="career-journey-main"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Left Section - Title */}
            <div className="career-journey-left">
                <div className="career-journey-left-content">
                    <motion.div variants={fromBottom} custom={0} className="career-journey-accent max-sm:hidden!">

                    </motion.div>

                    <h1 className="career-journey-title" aria-label="Career Journey">
                        <span style={mask} aria-hidden="true">
                            <motion.span variants={maskedRise} custom={1} style={{ display: 'inline-block', willChange: 'transform' }}>
                                CAREER
                            </motion.span>
                        </span>{' '}
                        <br className="max-sm:hidden!" />
                        <span style={mask} aria-hidden="true">
                            <motion.span variants={maskedRise} custom={2} style={{ display: 'inline-block', willChange: 'transform' }}>
                                JOURNEY
                            </motion.span>
                        </span>
                    </h1>

                    <motion.div variants={fromBottom} custom={3} className="career-journey-subtitle">
                        A professional timeline
                    </motion.div>
                </div>
            </div>

            {/* Right Section - Timeline & Description */}
            <div className="career-journey-right">
                <p className="career-journey-description">
                    {/* A timeline of the roles, collaborations, and milestones that have shaped how I think, design, and solve problems as a software developer. */}
                </p>

                <div className="career-timeline">
                    {careerData.map((item, idx) => {
                        const slot = 1.5 + idx;
                        return (
                            <motion.div
                                key={idx}
                                variants={fromBottom}
                                custom={slot}
                                className="career-entry"
                            >
                                <div className="career-period">{item.period}</div>
                                <div className="career-title">{item.title}</div>
                                <div className="career-company">{item.company}</div>
                                {idx < careerData.length - 1 && (
                                    <motion.div
                                        className="career-divider"
                                        variants={drawLine}
                                        custom={delayFor(slot) + 0.5}
                                        style={{ transformOrigin: 'left center' }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}