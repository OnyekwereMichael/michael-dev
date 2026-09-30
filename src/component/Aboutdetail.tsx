'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Me from '../assets/WhatsApp Image 2026-09-23 at 11.58.00.jpeg';
import PhilosophyScreen from './PhilosophyScreen';
import CareerJourney from './CareerJourney';


export default function AboutDetail({ onClose }: { onClose: () => void }) {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const screens = ['about', 'philosophy', 'career'];

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

    // Handle scroll wheel navigation
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling) return;

            const delta = e.deltaY;
            if (Math.abs(delta) < 40) return;

            if (delta > 0 && currentScreen < screens.length - 1) {
                setCurrentScreen(currentScreen + 1);
                setIsScrolling(true);
                setTimeout(() => setIsScrolling(false), 800);
            } else if (delta < 0 && currentScreen > 0) {
                setCurrentScreen(currentScreen - 1);
                setIsScrolling(true);
                setTimeout(() => setIsScrolling(false), 800);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [currentScreen, isScrolling, screens.length]);

    // Handle arrow key navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling) return;

            if ((e.key === 'ArrowDown' || e.key === ' ') && currentScreen < screens.length - 1) {
                setCurrentScreen(currentScreen + 1);
                setIsScrolling(true);
                setTimeout(() => setIsScrolling(false), 800);
            } else if (e.key === 'ArrowUp' && currentScreen > 0) {
                setCurrentScreen(currentScreen - 1);
                setIsScrolling(true);
                setTimeout(() => setIsScrolling(false), 800);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentScreen, isScrolling, screens.length]);

    return (
        <>
            {/* Close Button */}
            <motion.button
                className="about-detail-close"
                data-screen={screens[currentScreen]}
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
            >
                ✕
            </motion.button>

            {/* Carousel Container */}
            <div className="about-detail-carousel-container">
                <motion.div
                    className="about-detail-carousel-track"
                    animate={{ x: `${-currentScreen * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 0.85, 0.32, 1] }}
                >
                    <motion.div
                        className="about-detail-carousel-slide"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <div className="about-detail-main">
                            {/* IMAGE - TOP */}
                            <div className="about-detail-left">
                                <motion.div
                                    variants={itemVariants}
                                    className="about-detail-portrait-container"
                                >
                                    <img
                                        src={Me}
                                        alt="Portrait"
                                        className="about-detail-portrait"
                                    />
                                </motion.div>
                            </div>

                            {/* CONTENT - BOTTOM, ALL VISIBLE */}
                            <div className="about-detail-right">
                                <motion.h1
                                    variants={itemVariants}
                                    className="about-detail-name max-sm:hidden!"
                                >
                                    MICHAEL<br />ONYEKWERE
                                </motion.h1>

                                <motion.div
                                    variants={itemVariants}
                                    className="about-detail-label max-sm:relative max-sm:top-3!"
                                >
                                    ABOUT ME
                                </motion.div>

                                <motion.p
                                    variants={itemVariants}
                                    className="about-detail-bio leading-8! max-sm:leading-7! max-sm:relative max-sm:top-3!"
                                >
                                    Hi, I'm <span>Michael</span> — a Software developer based in Lagos, Nigeria, with 5+ years of experience in mobile app development, web applications, and digital product design. I craft clear and enduring digital experiences with thoughtful approach to building intuitive interfaces that solve real problems.
                                </motion.p>

                                <motion.div
                                    variants={itemVariants}
                                    className="about-detail-interests max-sm:hidden!"
                                >
                                    <h3 className="about-detail-section-title">Interests</h3>
                                    <p className="about-detail-interests-text ">
                                        Beyond design: Football, Watches, Aquariums, and Martial arts. I believe creativity thrives when we engage with diverse passions.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="about-detail-cta-group max-sm:relative max-sm:top-3!"
                                >
                                    <a href="mailto:onyekweremichael55@gmail.com" className="about-detail-cta">
                                        Get in touch →
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Screen 2: Philosophy */}
                    <motion.div
                        className="about-detail-carousel-slide"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <PhilosophyScreen />
                    </motion.div>

                    {/* Screen 3: Career */}
                    <motion.div
                        className="about-detail-carousel-slide"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <CareerJourney />
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}