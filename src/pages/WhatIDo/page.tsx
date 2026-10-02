'use client';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 0.85, 0.32, 1] as const;
const STEP = 0.2;    // gap between sequence steps (seconds)
const START = 0.25;  // delay before the first element
const SIDE = 60;     // slide distance in px

export default function WhatIDo() {
    const reduce = useReducedMotion();
    const delayFor = (i: number) => START + i * STEP;

    // Parent only flips hidden → visible; each child owns its direction and timing via `custom`
    const containerVariants: Variants = { hidden: {}, visible: {} };

    // CHAPTER III rises out of an invisible mask
    const maskedRise: Variants = {
        hidden: { y: reduce ? 0 : '110%' },
        visible: (i: number) => ({
            y: 0,
            transition: { duration: 1.1, delay: delayFor(i), ease: EASE },
        }),
    };

    const fromLeft: Variants = {
        hidden: { opacity: 0, x: reduce ? 0 : -SIDE },
        visible: (i: number) => ({
            opacity: 1, x: 0,
            transition: { duration: 0.9, delay: delayFor(i), ease: EASE },
        }),
    };

    const fromRight: Variants = {
        hidden: { opacity: 0, x: reduce ? 0 : SIDE },
        visible: (i: number) => ({
            opacity: 1, x: 0,
            transition: { duration: 0.9, delay: delayFor(i), ease: EASE },
        }),
    };

    // Skill tags pop in one by one after their category lands. `custom` here is an absolute delay in seconds.
    const tagVariants: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 14, scale: reduce ? 1 : 0.92 },
        visible: (delay: number) => ({
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.6, delay, ease: EASE },
        }),
    };

    const processSteps = [
        { id: 1, title: 'Discovery', description: 'Understanding your vision and goals' },
        { id: 2, title: 'Design', description: 'Crafting beautiful, intuitive interfaces' },
        { id: 3, title: 'Development', description: 'Building robust, scalable solutions' },
        { id: 4, title: 'Launch', description: 'Delivering excellence and support' },
    ];

    const skillsCategories = [
        { label: 'Languages', items: ['React Native', 'Nextjs', 'Python', 'JavaScript', 'TypeScript'] },
        { label: 'Tools', items: ['Antigravity', 'Github', 'Vercel', 'Expo Go', 'VS Code'] },
        { label: 'Services', items: ['Web Apps', 'Mobile Apps', 'AI Agents & Automation'] },
    ];

    /*
     * Sequence (left and right columns alternate, so the page builds in a zig-zag):
     *  0 chapter (rises) · 1 "How I work" (left) · 1.5 "Skills" (right)
     *  2–5 process steps (left, one by one) · 2.5 / 3.5 / 4.5 skill categories (right) → their tags pop in
     */
    return (
        <motion.main
            className="whatido-main"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Left Section - Process */}
            <div className="whatido-left max-sm:pt-6!">
                <div style={{ overflow: 'hidden' }}>
                    <motion.h2
                        className="whatido-chapter max-sm:py-0!"
                        variants={maskedRise}
                        custom={0}
                        style={{ willChange: 'transform' }}
                    >
                        CHAPTER III
                    </motion.h2>
                </div>

                <div className="whatido-process max-sm:hidden!">
                    <motion.p variants={fromLeft} custom={1} className="whatido-section-label">
                        HOW I WORK
                    </motion.p>
                    <div className="process-steps">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={step.id}
                                variants={fromLeft}
                                custom={2 + i}
                                className="process-step"
                            >
                                <div className="process-step-number">{step.id}</div>
                                <div className="process-step-content">
                                    <h3 className="process-step-title">{step.title}</h3>
                                    <p className="process-step-description">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section - Skills */}
            <div className="whatido-right">
                <div className="whatido-skills">
                    <motion.p variants={fromRight} custom={1.5} className="whatido-section-label">
                        SKILLS & TECH
                    </motion.p>
                    <div className="skills-categories">
                        {skillsCategories.map((category, c) => {
                            const slot = 2.5 + c;
                            return (
                                <motion.div
                                    key={category.label}
                                    variants={fromRight}
                                    custom={slot}
                                    className="skill-category"
                                >
                                    <h4 className="skill-category-title">{category.label}</h4>
                                    <div className="skill-tags">
                                        {category.items.map((item, idx) => (
                                            <motion.span
                                                key={idx}
                                                className="skill-tag"
                                                variants={tagVariants}
                                                custom={delayFor(slot) + 0.35 + idx * 0.07}
                                            >
                                                {item}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.main>
    );
}