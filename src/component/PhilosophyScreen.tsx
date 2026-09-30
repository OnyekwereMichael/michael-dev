'use client';
import { motion } from 'framer-motion';

export default function PhilosophyScreen() {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    return (
        <motion.div
            className="philosophy-screen-main"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Left Section - Developer Philosophy */}
            <div className="philosophy-left">
                <div className="philosophy-left-content">
                    <motion.p variants={itemVariants} className="philosophy-main-text">
                        I build digital experiences focused on clarity, performance, and intuitive interaction — creating software that feels refined, responsive, and purposeful.
                    </motion.p>

                    <motion.div variants={itemVariants} className="philosophy-details">
                        <p className="philosophy-detail-item">
                            Good code should be clean, efficient, and maintainable. Every line of logic shapes how users experience and interact with the product.
                        </p>
                        <p className="philosophy-detail-item">
                            Across applications, platforms, and systems, consistency and thoughtful architecture remain central to my approach.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Section - Quote */}
            <div className="philosophy-right">
                <div className="philosophy-right-wrapper">
                    <motion.div variants={itemVariants} className="philosophy-label">
                        PHILOSOPHY
                    </motion.div>

                    <motion.div variants={itemVariants} className="philosophy-quote-wrapper">
                        <p className="philosophy-quote uppercase! max-sm:leading-9!">
                            "Build for impact. Code for growth. Create for passion."
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}