import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

export default function Counter({ onComplete }: { onComplete: () => void }) {
    const [displayNumber, setDisplayNumber] = useState('2023');
    const [nextNumber, setNextNumber] = useState('2023');
    const [showSubtext, setShowSubtext] = useState(false);
    const [isRolling, setIsRolling] = useState(true);

    console.log('Next number', nextNumber);

    const currentYear = new Date().getFullYear();
    const targetYear = currentYear;
    const subtext = 'A journey through years of building';

    useEffect(() => {
        if (!isRolling) return;

        const startYear = 2023;
        const duration = 3800; // Total animation duration
        const frameRate = 60; // frames per second
        const totalFrames = (duration / 1000) * frameRate;

        let frameCount = 0;

        const animate = () => {
            const progress = frameCount / totalFrames;

            if (progress < 1) {
                // Easing function for smooth animation
                const easeProgress = 1 - Math.pow(1 - progress, 3);

                // Calculate current number with easing
                const currentNum = Math.floor(
                    startYear + (targetYear - startYear) * easeProgress
                );

                setDisplayNumber(String(currentNum));
                setNextNumber(String(currentNum + 1));

                frameCount++;
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                setDisplayNumber(String(targetYear));
                setNextNumber(String(targetYear + 1));
                setIsRolling(false);

                // Show subtext when counting is done
                setTimeout(() => {
                    setShowSubtext(true);
                }, 200);

                // Complete after showing subtext
                setTimeout(() => {
                    onComplete();
                }, 3200);
            }
        };

        requestAnimationFrame(animate);
    }, [targetYear, onComplete, isRolling]);

    // ========== TEXT ANIMATION VARIANTS ==========
    const charVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 15,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.35,
                ease: [0.22, 0.85, 0.32, 1],
            },
        },
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.15,
            },
        },
    };

    // ========== CONTINUOUS ROLLING DIGIT ANIMATION ==========
    const rollingDigitVariants: Variants = {
        enter: {
            y: 80,
            opacity: 0,
        },
        center: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 20,
                mass: 1,
            },
        },
        exit: {
            y: -80,
            opacity: 0,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 20,
                mass: 1,
            },
        },
    };

    return (
        <motion.div
            className="counter-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.22, 0.85, 0.32, 1],
                },
            }}
        >
            <div className="counter-main">
                <motion.div
                    className="counter-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.1,
                        ease: [0.22, 0.85, 0.32, 1],
                    }}
                    exit={{
                        opacity: 0,
                        y: -80,
                        transition: {
                            duration: 0.8,
                            ease: [0.22, 0.85, 0.32, 1],
                        },
                    }}
                >
                    <div className="counter-number font-serif-2">
                        <div className="rolling-container">
                            <AnimatePresence>
                                <motion.div
                                    key={displayNumber}
                                    className="rolling-number"
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={rollingDigitVariants}
                                >
                                    <span className="number-text">{displayNumber}</span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <motion.div
                        className="counter-subtext"
                        variants={containerVariants}
                        initial="hidden"
                        animate={showSubtext ? 'visible' : 'hidden'}
                    >
                        {subtext.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                variants={charVariants}
                                className="counter-char"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="counter-progress"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                        duration: 3.8,
                        ease: [0.22, 0.85, 0.32, 1],
                    }}
                >
                    <div className="counter-progress-bar"></div>
                </motion.div>
            </div>
        </motion.div>
    );
}