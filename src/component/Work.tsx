'use client';
import { motion } from 'framer-motion';

export default function Works() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6 },
        },
    };

    return (
        <motion.main
            className="works-main"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1 className="works-heading font-serif-2">THE WORK</h1>
            </motion.div>
        </motion.main>
    );
}