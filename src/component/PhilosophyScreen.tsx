'use client';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 0.85, 0.32, 1] as const;
const STEP = 0.25;    // gap between sequence steps (seconds)
const START = 0.25;   // delay before the first element
const SIDE = 60;      // slide-in distance in px for the side label
const WORD_STEP = 0.075; // gap between each word of the quote

const QUOTE = '"Build for impact. Code for growth. Create for passion."';

export default function PhilosophyScreen() {
    const reduce = useReducedMotion();
    const delayFor = (i: number) => START + i * STEP;

    // Parent only flips hidden → visible; each child owns its motion + timing via `custom`
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

    // Each quote word rises out of its own invisible mask. `custom` = absolute delay in seconds.
    const wordRise: Variants = {
        hidden: { y: reduce ? 0 : '115%', opacity: reduce ? 0 : 1 },
        visible: (delay: number) => ({
            y: 0,
            opacity: 1,
            transition: { duration: 0.9, delay, ease: EASE },
        }),
    };

    const words = QUOTE.split(' ');
    const quoteStart = delayFor(2);

    /*
     * Sequence (left and right alternate):
     *  0 main statement (rises) · 1 PHILOSOPHY label (from the side)
     *  2 → quote plays in word by word · 3 first detail · 4 second detail (rise)
     */
    return (
        <motion.div
            className="philosophy-screen-main"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Left Section - Developer Philosophy */}
            <div className="philosophy-left">
                <div className="philosophy-left-content">
                    <motion.p variants={fromBottom} custom={0} className="philosophy-main-text">
                        I build digital experiences focused on clarity, performance, and intuitive interaction — creating software that feels refined, responsive, and purposeful.
                    </motion.p>

                    <div className="philosophy-details">
                        <motion.p variants={fromBottom} custom={3} className="philosophy-detail-item">
                            Good code should be clean, efficient, and maintainable. Every line of logic shapes how users experience and interact with the product.
                        </motion.p>
                        <motion.p variants={fromBottom} custom={4} className="philosophy-detail-item">
                            Across applications, platforms, and systems, consistency and thoughtful architecture remain central to my approach.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Right Section - Quote */}
            <div className="philosophy-right">
                <div className="philosophy-right-wrapper">
                    <motion.div variants={fromSide} custom={1} className="philosophy-label">
                        PHILOSOPHY
                    </motion.div>

                    <div className="philosophy-quote-wrapper">
                        <p className="philosophy-quote uppercase! max-sm:leading-9!" aria-label={QUOTE}>
                            {words.map((word, i) => (
                                <span key={i} aria-hidden="true">
                                    {/* mask: clips the word until it has risen into place */}
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            overflow: 'hidden',
                                            verticalAlign: 'top',
                                            paddingBottom: '0.12em',
                                            marginBottom: '-0.12em',
                                        }}
                                    >
                                        <motion.span
                                            variants={wordRise}
                                            custom={quoteStart + i * WORD_STEP}
                                            style={{ display: 'inline-block', willChange: 'transform' }}
                                        >
                                            {word}
                                        </motion.span>
                                    </span>
                                    {i < words.length - 1 ? ' ' : ''}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}