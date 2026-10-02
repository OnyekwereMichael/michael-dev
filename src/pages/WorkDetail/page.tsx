'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import vendorsapp from '../../assets/vendors.jpeg'
import curi from '../../assets/Untitled design.png'


export default function WorkDetail() {
    const [hoveredProject, setHoveredProject] = useState(0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const projects = [
        {
            id: 1,
            title: 'Curi',
            image: curi
        },
        {
            id: 2,
            title: 'Vendors app',
            image: vendorsapp
        },
        {
            id: 3,
            title: 'Slider',
            image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&h=500&fit=crop'
        },
        // {
        //     id: 4,
        //     title: 'Betahaus',
        //     image: 'https://images.unsplash.com/photo-1549887534-7051a7b95e72?w=500&h=500&fit=crop'
        // },
    ];

    const currentImage = projects[hoveredProject].image;

    return (
        <motion.main
            className="work-detail-main"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
        >
            {/* Left Section */}
            <div className="work-detail-left">
                <motion.div variants={itemVariants}>
                    <h2 className="work-detail-chapter font-serif-2">CHAPTER II</h2>
                </motion.div>

                <motion.div variants={itemVariants} className="work-detail-image">
                    <div className="work-detail-placeholder">
                        <motion.img
                            key={hoveredProject}
                            src={currentImage}
                            alt={projects[hoveredProject].title}
                            className="work-detail-img"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Right Section */}
            <div className="work-detail-right">
                {/* Header Label */}
                <motion.div variants={itemVariants} className="work-detail-label max-sm:mt-4!">
                    RELATED WORK
                </motion.div>

                {/* Projects List */}
                <motion.div variants={itemVariants} className="work-detail-projects">
                    {projects.map((project, index) => {
                        const isActive = index === hoveredProject;

                        return (
                            <motion.div
                                key={project.id}
                                className="work-detail-project-item"
                                onMouseEnter={() => setHoveredProject(index)}
                                onMouseLeave={() => setHoveredProject(0)}
                                whileHover={{ x: 8 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <div className="work-detail-project-header">
                                    <motion.p
                                        className="work-detail-project-title"
                                        animate={{
                                            opacity: isActive ? 1 : 0.4,
                                            color: isActive ? '#2e2b28' : '#b0a8a0'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {project.title}
                                    </motion.p>
                                    <motion.span
                                        className="work-detail-project-arrow"
                                        animate={{
                                            opacity: isActive ? 1 : 0.2,
                                            x: isActive ? 4 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        ↗
                                    </motion.span>
                                </div>
                                {index < projects.length - 1 && (
                                    <motion.div
                                        className="work-detail-divider"
                                        animate={{
                                            backgroundColor: isActive ? '#d97706' : '#d0d0d0'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>



                {/* CTA */}
                <motion.div variants={itemVariants} className="work-detail-cta">
                    <motion.a
                        href="#all-work"
                        className="work-detail-link"
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        View All Work
                        <motion.span
                            className="work-detail-arrow"
                            whileHover={{ x: 3 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            →
                        </motion.span>
                    </motion.a>
                </motion.div>
            </div>
        </motion.main>
    );
}