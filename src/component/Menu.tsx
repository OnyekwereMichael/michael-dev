import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutDetail from './Aboutdetail';
import WorksModal from './WorkModal';


export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [showAboutDetail, setShowAboutDetail] = useState(false);
    const [showWorksModal, setShowWorksModal] = useState(false);

    const menuItems = [
        { number: '01', label: 'HOME', href: '#home' },
        { number: '02', label: 'ABOUT', action: 'about' },
        { number: '03', label: 'WORKS', action: 'works' },
        { number: '04', label: 'CONTACT', href: '#contact' },
    ];

    const socialLinks = [
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'Behance', href: 'https://behance.net' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
    ];

    // Overlay animation
    const overlayVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 },
    };

    // Menu drawer slide animation
    const drawerVariants = {
        closed: { x: '-100%' },
        open: { x: 0 },
    };

    // Menu items fade in from bottom
    const itemVariants = {
        closed: { opacity: 0, y: 30 },
        open: { opacity: 1, y: 0 },
    };

    // Container for staggered children
    const containerVariants = {
        closed: {},
        open: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.5,
            },
        },
    };

    // Social links fade in from top
    const socialVariants = {
        closed: { opacity: 0, y: -30 },
        open: { opacity: 1, y: 0 },
    };

    const handleMenuClick = (item: any) => {
        if (item.action === 'about') {
            setShowAboutDetail(true);
            setIsOpen(false);
        } else if (item.action === 'works') {
            setShowWorksModal(true);
            setIsOpen(false);
        } else if (item.href) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Menu Button */}
            <button
                className="menu-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Menu Overlay & Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed top-0 left-0 right-0 bottom-0 bg-[#262220] z-50"
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ duration: 0.7, ease: [0.22, 0.85, 0.32, 1] }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className="h-screen flex flex-col justify-between pl-[120px] pr-12 py-10"
                            style={{ paddingLeft: 'clamp(120px, 12vw, 200px)' }}
                            variants={drawerVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.8, ease: [0.22, 0.85, 0.32, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <motion.button
                                className="absolute top-10 right-12 font-serif-2 text-[14px] tracking-widest text-[#f3eee8] bg-none border-none cursor-pointer font-light hover:opacity-60 transition-opacity"
                                onClick={() => setIsOpen(false)}
                                variants={socialVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                transition={{ duration: 0.8, ease: [0.22, 0.85, 0.32, 1], delay: 0.1 }}
                            >
                                CLOSE
                            </motion.button>

                            {/* Menu Items */}
                            <motion.nav
                                className="flex flex-col gap-6"
                                variants={containerVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                {menuItems.map((item) => (
                                    <motion.div
                                        key={item.number}
                                        onClick={() => handleMenuClick(item)}
                                        className={item.action ? 'cursor-pointer' : ''}
                                        variants={itemVariants}
                                        transition={{ duration: 0.6, ease: [0.22, 0.85, 0.32, 1] }}
                                    >
                                        {item.action ? (
                                            <div className="font-serif-2 flex items-center gap-6 text-[#f3eee8] transition-all duration-300 hover:translate-x-2">
                                                <span className="font-serif-2 text-[clamp(4rem,12vw,7rem)] font-light text-[#f3eee8] leading-tight tracking-[-0.02em]">
                                                    {item.number}
                                                </span>
                                                <span className="font-serif-2 text-[clamp(2.5rem,8vw,5rem)] font-light text-[rgba(243,238,232,0.62)] leading-tight tracking-[-0.01em] hover:text-[#f3eee8] transition-colors">
                                                    {item.label}
                                                </span>
                                            </div>
                                        ) : (
                                            <a
                                                href={item.href}
                                                className="font-serif-2 flex items-center gap-6 text-[#f3eee8] no-underline transition-all duration-300 hover:translate-x-2"
                                            >
                                                <span className="font-serif-2 text-[clamp(4rem,12vw,7rem)] font-light text-[#f3eee8] leading-tight tracking-[-0.02em]">
                                                    {item.number}
                                                </span>
                                                <span className="font-serif-2 text-[clamp(2.5rem,8vw,5rem)] font-light text-[rgba(243,238,232,0.62)] leading-tight tracking-[-0.01em] hover:text-[#f3eee8] transition-colors">
                                                    {item.label}
                                                </span>
                                            </a>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.nav>

                            {/* Social Links */}
                            <motion.div
                                className="flex gap-8 justify-end"
                                variants={containerVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[13px] text-[#f3eee8] no-underline transition-all duration-300 font-sans font-normal tracking-[0.05em] hover:opacity-60 hover:-translate-y-0.5"
                                        variants={itemVariants}
                                        transition={{ duration: 0.6, ease: [0.22, 0.85, 0.32, 1] }}
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* About Detail Modal */}
            <AnimatePresence>
                {showAboutDetail && (
                    <AboutDetail onClose={() => setShowAboutDetail(false)} />
                )}
            </AnimatePresence>

            {/* Works Modal */}
            <AnimatePresence>
                {showWorksModal && (
                    <WorksModal onClose={() => setShowWorksModal(false)} />
                )}
            </AnimatePresence>
        </>
    );
}