'use client';
import { motion } from 'framer-motion';

export default function CareerJourney() {
    const careerData = [
        {
            period: '2023 — NOW',
            title: 'Senior Software Developer',
            company: 'Trusting Social',
        },
        {
            period: '2021 — 2023',
            title: 'Full Stack Developer',
            company: 'Autonomous',
        },
        {
            period: '2020 — 2022',
            title: 'Mobile Developer',
            company: 'VEN Agency',
        },
        {
            period: '2019 — 2020',
            title: 'Junior Developer',
            company: 'Glass Egg',
        },
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
    };

    return (
        <motion.div
            className="career-journey-main"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Left Section - Title */}
            <div className="career-journey-left ">
                <div className="career-journey-left-content">
                    <motion.div variants={itemVariants} className="career-journey-accent max-sm:hidden!">
                        ―
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="career-journey-title ">
                        CAREER<br className='max-sm:hidden!' /> JOURNEY
                    </motion.h1>

                    <motion.div variants={itemVariants} className="career-journey-subtitle">
                        A professional timeline
                    </motion.div>
                </div>
            </div>

            {/* Right Section - Timeline & Description */}
            <div className="career-journey-right">
                <motion.p variants={itemVariants} className="career-journey-description">
                    {/* A timeline of the roles, collaborations, and milestones that have shaped how I think, design, and solve problems as a software developer. */}
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    className="career-timeline"
                >
                    {careerData.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="career-entry"
                        >
                            <div className="career-period">{item.period}</div>
                            <div className="career-title">{item.title}</div>
                            <div className="career-company">{item.company}</div>
                            {idx < careerData.length - 1 && (
                                <div className="career-divider" />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}