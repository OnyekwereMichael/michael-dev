'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import jc from '../../assets/jc4.png'
import vendors from '../../assets/vendors.jpeg'
import veriscore from '../../assets/veriscore.png'
import devp from '../../assets/Untitled design (1).png'

export default function Experience() {
    const [hoveredExperience, setHoveredExperience] = useState(0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const experiences = [
        {
            name: 'James Chase',
            logo: jc
        },
        {
            name: 'Veriscore',
            logo: veriscore
        },
        {
            name: 'DevPilot',
            logo: devp
        },
        {
            name: 'Vendors App',
            logo: vendors
        },
    ];

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: [0.22, 0.85, 0.32, 1] as const }
        },
        exit: { opacity: 0, scale: 0.8 }
    };

    return (
        <motion.main
            className="experience-main"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
        >
            <div className="experience-logo-section">
                <motion.h2 variants={itemVariants} className="experience-chapter max-sm:pt-2!">
                    CHAPTER IV
                </motion.h2>

                <motion.div
                    className="experience-logo-container"
                    key={hoveredExperience}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <img
                        src={experiences[hoveredExperience].logo}
                        alt={experiences[hoveredExperience].name}
                        className="experience-logo"
                    />
                </motion.div>
            </div>

            <div className="experience-right">
                <motion.p variants={itemVariants} className="experience-label">
                    SELECTED EXPERIENCES
                </motion.p>

                <motion.div className="experience-list" variants={containerVariants}>
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="experience-item-wrapper"
                            onMouseEnter={() => setHoveredExperience(idx)}
                            onMouseLeave={() => setHoveredExperience(0)}
                        >
                            <motion.h3
                                className={`experience-item ${hoveredExperience === idx ? 'experience-item--active' : 'experience-item--inactive'}`}
                                // animate={{
                                //     opacity: hoveredExperience === idx ? 1 : 0.35,
                                //     x: hoveredExperience === idx ? 10 : 0,
                                // }}
                                transition={{ duration: 0.3 }}
                            >
                                {exp.name}
                            </motion.h3>

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
                </motion.div>
            </div>
        </motion.main>
    );
}