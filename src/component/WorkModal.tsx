import { motion } from 'framer-motion';
import curi from '../assets/Untitled design.png'
import vendorsapp from '../assets/vendors.jpeg'
import veriscore from '../assets/veriscore.png'
import Sidebar from './Sidebar';

export default function WorksModal({ onClose }: { onClose: () => void }) {
    const works = [
        {
            id: 1,
            number: '01',
            title: 'Curi',
            category: 'E-Learning',
            year: '2026',
            image: curi,
        },
        {
            id: 2,
            number: '02',
            title: 'Vendors app',
            category: 'E-COMMERCE',
            year: '2026',
            image: vendorsapp,
        },
        {
            id: 3,
            number: '03',
            title: 'Veriscore',
            category: 'FINTECH',
            year: '2026',
            image: veriscore,
        },
        {
            id: 4,
            number: '04',
            title: 'Betahaus',
            category: 'REAL ESTATE',
            year: '2026',
            image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=400&fit=crop',
        },

        // {
        //     id: 5,
        //     number: '05',
        //     title: 'Autonomous',
        //     category: 'FULL STACK',
        //     year: '2024',
        //     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop',
        // },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 0.85, 0.32, 1] as const },
        },
    };

    const headerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 0.85, 0.32, 1] as const },
        },
    };

    return (
        <section className='main'>
            <div className=''>
                <Sidebar />
            </div>

            <motion.div
                className="works-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={onClose}
            >
                <motion.div
                    className="works-modal-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, ease: [0.22, 0.85, 0.32, 1] as const }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <motion.button
                        className="works-modal-close  my-3!"
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ✕
                    </motion.button>

                    {/* Header */}
                    <motion.div
                        className="works-modal-header"
                        variants={headerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="works-modal-title">ALL WORK</h1>
                        <span className="works-modal-count">({works.length})</span>
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div
                        className="works-modal-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {works.map((work) => (
                            <motion.div
                                key={work.id}
                                className="works-modal-card"
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                {/* Project Image */}
                                <div className="works-modal-image-container">
                                    <motion.img
                                        src={work.image}
                                        alt={work.title}
                                        className="works-modal-image"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5, ease: [0.22, 0.85, 0.32, 1] }}
                                    />
                                </div>

                                {/* Project Info */}
                                <div className="works-modal-info">
                                    <div className="works-modal-number">{work.number}</div>
                                    <div className="works-modal-meta">
                                        <span className="works-modal-category">
                                            {work.category} — {work.year}
                                        </span>
                                    </div>
                                    <h3 className="works-modal-project-title">{work.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}