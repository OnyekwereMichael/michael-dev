import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const START_YEAR = 2023;
const STEP_MS = 1000;
export default function Counter({ onComplete }: { onComplete: () => void }) {
    const [displayNumber, setDisplayNumber] = useState(String(START_YEAR));
    const [showSubtext, setShowSubtext] = useState(false);

    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    const targetYear = new Date().getFullYear();
    const steps = Math.max(targetYear - START_YEAR, 0);
    const subtext = 'A journey through years of building';

    useEffect(() => {
        let year = START_YEAR;
        const timers: ReturnType<typeof setTimeout>[] = [];

        const interval = setInterval(() => {
            year += 1;
            setDisplayNumber(String(year));

            if (year >= targetYear) {
                clearInterval(interval);
                timers.push(setTimeout(() => setShowSubtext(true), 200));
                timers.push(setTimeout(() => onCompleteRef.current(), 3200));
            }
        }, STEP_MS);

        return () => {
            clearInterval(interval);
            timers.forEach(clearTimeout);
        };
    }, [targetYear]);

    // ========== TEXT ANIMATION VARIANTS ==========
    const charVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.35, ease: [0.22, 0.85, 0.32, 1] },
        },
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.15 },
        },
    };

    // ========== ROLLING DIGIT ANIMATION (same timing for every year) ==========
    const rollTransition = { duration: 0.4, ease: [0.22, 0.85, 0.32, 1] as const };

    const rollingDigitVariants: Variants = {
        enter: { y: 80, opacity: 0 },
        center: { y: 0, opacity: 1, transition: rollTransition },
        exit: { y: -80, opacity: 0, transition: rollTransition },
    };

    return (
        <motion.div
            className="counter-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: [0.22, 0.85, 0.32, 1] },
            }}
        >
            <div className="counter-main">
                <motion.div
                    className="counter-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.85, 0.32, 1] }}
                    exit={{
                        opacity: 0,
                        y: -80,
                        transition: { duration: 0.8, ease: [0.22, 0.85, 0.32, 1] },
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
                        className="counter-subtext max-sm:text-sm!"
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
                    transition={{ duration: (steps * STEP_MS) / 1000, ease: 'linear' }}
                >
                    <div className="counter-progress-bar"></div>
                </motion.div>
            </div>
        </motion.div>
    );
}