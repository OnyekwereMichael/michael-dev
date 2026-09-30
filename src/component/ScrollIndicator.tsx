'use client';
import { motion } from 'framer-motion';

export default function ScrollIndicator({ currentSlide, totalSlides, isDarkTheme = true }: { currentSlide: number; totalSlides: number; isDarkTheme?: boolean }) {
    const progress = ((currentSlide + 1) / totalSlides) * 100;

    const dotVariants = {
        inactive: { opacity: 0.4, scale: 0.8 },
        active: { opacity: 1, scale: 1 }
    };

    return (
        <motion.div
            className={`scroll-indicator-new ${isDarkTheme ? 'scroll-indicator-new--dark' : 'scroll-indicator-new--light'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
        >
            {/* Top Progress Bar */}
            <div className="progress-bar-container">
                <motion.div
                    className="progress-bar-fill"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            </div>

            {/* Slide Counter & Info */}
            <div className="scroll-info-group">
                <div className="scroll-counter-new">
                    <span className="scroll-current-new">{String(currentSlide + 1).padStart(2, '0')}</span>
                    <span className="scroll-divider-new">/</span>
                    <span className="scroll-total-new">{String(totalSlides).padStart(2, '0')}</span>
                </div>

                {/* Slide Dots */}
                <div className="scroll-dots-new">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <motion.div
                            key={idx}
                            className="scroll-dot-new"
                            variants={dotVariants}
                            animate={currentSlide === idx ? "active" : "inactive"}
                            transition={{ duration: 0.3 }}
                            title={`Slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}