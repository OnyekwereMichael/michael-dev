'use client';
import { motion } from 'framer-motion';

export default function WhatIDo() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const processSteps = [
        { id: 1, title: 'Discovery', description: 'Understanding your vision and goals' },
        { id: 2, title: 'Design', description: 'Crafting beautiful, intuitive interfaces' },
        { id: 3, title: 'Development', description: 'Building robust, scalable solutions' },
        { id: 4, title: 'Launch', description: 'Delivering excellence and support' },
    ];

    const skillsCategories = [
        {
            label: 'Languages',
            items: ['React Native', 'Swift', 'Kotlin', 'JavaScript', 'TypeScript']
        },
        {
            label: 'Tools',
            items: ['Figma', 'Framer', 'Xcode', 'Android Studio', 'VS Code']
        },
        {
            label: 'Services',
            items: ['UI/UX Design', 'Mobile Apps', 'Web Apps', 'Product Strategy']
        },
    ];

    return (
        <motion.main
            className="whatido-main"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
        >
            {/* Left Section - Process */}
            <div className="whatido-left">
                <motion.div variants={itemVariants}>
                    <h2 className="whatido-chapter">CHAPTER III</h2>
                </motion.div>

                <motion.div variants={itemVariants} className="whatido-process max-sm:hidden!">
                    <p className="whatido-section-label">HOW I WORK</p>
                    <div className="process-steps">
                        {processSteps.map((step) => (
                            <motion.div
                                key={step.id}
                                variants={itemVariants}
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
                </motion.div>
            </div>

            <div className="whatido-right">
                <motion.div variants={itemVariants} className="whatido-skills">
                    <p className="whatido-section-label">SKILLS & TECH</p>
                    <div className="skills-categories">
                        {skillsCategories.map((category) => (
                            <motion.div
                                key={category.label}
                                variants={itemVariants}
                                className="skill-category"
                            >
                                <h4 className="skill-category-title">{category.label}</h4>
                                <div className="skill-tags">
                                    {category.items.map((item, idx) => (
                                        <span key={idx} className="skill-tag">{item}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.main>
    );
}