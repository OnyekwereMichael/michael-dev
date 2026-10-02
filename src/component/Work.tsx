'use client';
import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView, useReducedMotion, type Variants } from 'framer-motion';

const TEXT = 'THE WORK';
const STAGGER = 0.09; // time between each "key press"

export default function Works() {
    const ref = useRef<HTMLHeadingElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.4 });
    const controls = useAnimationControls();
    const reduce = useReducedMotion();

    // Letters hidden until the screen is in view, then they play in like piano keys
    useEffect(() => {
        if (inView) controls.start('enter');
    }, [inView, controls]);

    const letterVariants: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 48 },

        // First entrance: each letter springs up past its spot, then drops down and settles
        enter: (i: number) => ({
            opacity: 1,
            y: reduce ? 0 : [48, -26, 0],
            transition: {
                duration: reduce ? 0.4 : 0.8,
                delay: 0.25 + i * STAGGER,
                times: [0, 0.55, 1],
                ease: ['easeOut', 'easeInOut'],
                opacity: { duration: 0.25, delay: 0.25 + i * STAGGER },
            },
        }),

        // Replay: letters already visible just hop up and down, key by key
        wave: (i: number) => ({
            y: reduce ? 0 : [0, -26, 0],
            transition: {
                duration: 0.55,
                delay: i * STAGGER,
                times: [0, 0.45, 1],
                ease: ['easeOut', 'easeInOut'],
            },
        }),
    };

    // Split into words → letters (keeps words from breaking mid-word on small screens)
    let index = 0;
    const words = TEXT.split(' ');

    return (
        <motion.main
            className="works-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h1
                ref={ref}
                className="works-heading font-serif-2"
                aria-label={TEXT}
                onMouseEnter={() => inView && controls.start('wave')}   // hover to play the keys again
            >
                {words.map((word, w) => (
                    <span key={w} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                        {word.split('').map((char) => {
                            const i = index++;
                            return (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate={controls}
                                    style={{ display: 'inline-block', willChange: 'transform' }}
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                        {w < words.length - 1 && <span style={{ display: 'inline-block', width: '0.3em' }} />}
                    </span>
                ))}
            </h1>
        </motion.main>
    );
}