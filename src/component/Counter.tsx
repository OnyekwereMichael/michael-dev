import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const START_YEAR = 2023;
const STEP_MS = 1000;            // one year every 1 second
const ROLL_S = 0.6;              // each roll finishes well before the next tick
const EASE = [0.33, 1, 0.68, 1] as const;

export default function Counter({ onComplete }: { onComplete: () => void }) {
    const [displayNumber, setDisplayNumber] = useState(String(START_YEAR));
    const [showSubtext, setShowSubtext] = useState(false);

    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    const targetYear = new Date().getFullYear();
    const steps = Math.max(targetYear - START_YEAR, 0);
    const totalMs = steps * STEP_MS;           // the whole counting run
    const subtext = 'A journey through years of building';

    // One schedule: every year is a fixed offset from the same start time
    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        for (let i = 1; i <= steps; i++) {
            timers.push(
                setTimeout(() => setDisplayNumber(String(START_YEAR + i)), i * STEP_MS)
            );
        }

        // Subtext and exit are placed on the same timeline, after the last year
        timers.push(setTimeout(() => setShowSubtext(true), totalMs + 400));
        timers.push(setTimeout(() => onCompleteRef.current(), totalMs + 2400));

        return () => timers.forEach(clearTimeout);
    }, [steps, totalMs]);

    const rollVariants = {
        enter: { y: '100%' },
        center: { y: '0%', transition: { duration: ROLL_S, ease: EASE } },
        exit: { y: '-100%', transition: { duration: ROLL_S, ease: EASE } },
    };

    return (
        <motion.div
            className="counter-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: EASE } }}
        >
            <div className="counter-main">
                <motion.div
                    className="counter-content"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                    exit={{ opacity: 0, y: -24, transition: { duration: 1, ease: EASE } }}
                >
                    <div className="counter-number font-serif-2">
                        <div
                            className="rolling-container"
                            style={{ position: 'relative', overflow: 'hidden' }}
                        >
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={displayNumber}
                                    className="rolling-number"
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={rollVariants}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        willChange: 'transform',
                                    }}
                                >
                                    <span className="number-text">{displayNumber}</span>
                                </motion.div>
                            </AnimatePresence>
                            <span className="number-text" style={{ visibility: 'hidden' }}>
                                {displayNumber}
                            </span>
                        </div>
                    </div>

                    <motion.p
                        className="counter-subtext max-sm:text-sm!"
                        initial={{ opacity: 0, y: 12 }}
                        animate={showSubtext ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        transition={{ duration: 1, ease: EASE }}
                        style={{ willChange: 'transform, opacity' }}
                    >
                        {subtext}
                    </motion.p>
                </motion.div>

                {/* Progress bar runs for exactly the same length as the year count */}
                <motion.div
                    className="counter-progress"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: totalMs / 1000, ease: 'linear' }}
                >
                    <div className="counter-progress-bar"></div>
                </motion.div>
            </div>
        </motion.div>
    );
}