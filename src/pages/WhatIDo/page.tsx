'use client';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 0.85, 0.32, 1] as const;
const RISE = 40;       // how far each element travels up from below (px)
const DURATION = 0.9;  // length of each rise (seconds)

export default function WhatIDo() {
    const reduce = useReducedMotion();

    // Parent only flips hidden → visible; each child sets its own delay via `custom`
    const containerVariants: Variants = { hidden: {}, visible: {} };

    // Every element rises from below: opacity + translate only, no scale, no spring
    const riseUp: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : RISE },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: reduce ? 0.3 : DURATION, delay, ease: EASE },
        }),
    };

    // Chapter heading rises out of a mask, same smooth motion
    const maskedRise: Variants = {
        hidden: { y: reduce ? 0 : '110%' },
        visible: (delay: number) => ({
            y: 0,
            transition: { duration: 1, delay, ease: EASE },
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
     * Timeline (seconds). Everything rises from below, one step after another:
     *  0.25  CHAPTER III
     *  0.50  HOW I WORK  ·  0.50 SKILLS & TECH
     *  0.70 / 0.90 / 1.10 / 1.30  process steps 1–4 (left, one by one)
     *  0.70 / 1.00 / 1.30         skill categories (right, one by one)
     *  each category's tags rise one by one just after their category
     */
    const STEP = 0.2;
    const CHAPTER_AT = 0.25;
    const LABEL_AT = 0.5;
    const STEPS_AT = 0.7;
    const CATEGORY_AT = 0.7;

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
                        custom={CHAPTER_AT}
                        style={{ willChange: 'transform' }}
                    >
                        CHAPTER III
                    </motion.h2>
                </div>

                <div className="whatido-process max-sm:hidden!">
                    <motion.p
                        variants={riseUp}
                        custom={LABEL_AT}
                        className="whatido-section-label"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        HOW I WORK
                    </motion.p>

                    <div className="process-steps">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={step.id}
                                variants={riseUp}
                                custom={STEPS_AT + i * STEP}
                                className="process-step"
                                style={{ willChange: 'transform, opacity' }}
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
                    <motion.p
                        variants={riseUp}
                        custom={LABEL_AT}
                        className="whatido-section-label"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        SKILLS & TECH
                    </motion.p>

                    <div className="skills-categories">
                        {skillsCategories.map((category, c) => {
                            const categoryAt = CATEGORY_AT + c * 0.3;
                            return (
                                <motion.div
                                    key={category.label}
                                    variants={riseUp}
                                    custom={categoryAt}
                                    className="skill-category"
                                    style={{ willChange: 'transform, opacity' }}
                                >
                                    <h4 className="skill-category-title">{category.label}</h4>
                                    <div className="skill-tags">
                                        {category.items.map((item, idx) => (
                                            <motion.span
                                                key={item}
                                                className="skill-tag"
                                                variants={riseUp}
                                                custom={categoryAt + 0.2 + idx * 0.08}
                                                style={{ willChange: 'transform, opacity' }}
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