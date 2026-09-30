import { motion, type Variants } from 'framer-motion';


interface NavigationButtonsProps {
    onPrevious: () => void;
    onNext: () => void;
    currentSlide: number;
    totalSlides: number;
    isDarkTheme: boolean;
}

export default function NavigationButtons({
    onPrevious,
    onNext,
    currentSlide,
    totalSlides,
    isDarkTheme,
}: NavigationButtonsProps) {
    // Animate buttons popping in
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const buttonVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: 0.5,
            y: 20,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
            },
        },
        hover: {
            scale: 1.15,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        },
        tap: {
            scale: 0.92,
        },
    };

    const arrowVariants = {
        hover: {
            x: -4,
            transition: { duration: 0.3 },
        },
    };

    const arrowRightVariants = {
        hover: {
            x: 4,
            transition: { duration: 0.3 },
        },
    };

    return (
        <motion.div
            className={`navigation-buttons  ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.button
                className="nav-button nav-prev"
                onClick={onPrevious}
                disabled={currentSlide === 0}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Previous slide"
            >
                <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={arrowVariants}
                >
                    <polyline points="15 18 9 12 15 6"></polyline>
                </motion.svg>
            </motion.button>

            {/* Slide Counter */}
            <motion.div
                className="nav-counter"
                variants={buttonVariants}
            >
                <span className="slide-number">
                    {String(currentSlide + 1).padStart(2, '0')}
                </span>
                <span className="slide-divider">/</span>
                <span className="slide-total">
                    {String(totalSlides).padStart(2, '0')}
                </span>
            </motion.div>

            {/* Next Button */}
            <motion.button
                className="nav-button nav-next"
                onClick={onNext}
                disabled={currentSlide === totalSlides - 1}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Next slide"
            >
                <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={arrowRightVariants}
                >
                    <polyline points="9 18 15 12 9 6"></polyline>
                </motion.svg>
            </motion.button>
        </motion.div>
    );
}