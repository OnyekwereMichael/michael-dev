'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 0.85, 0.32, 1] as const;
const STEP = 0.25;    // gap between each step of the sequence (seconds)
const START = 0.25;   // delay before the first element

export default function Contact() {
    const reduce = useReducedMotion();
    const delayFor = (i: number) => START + i * STEP;

    // Parent only flips hidden → visible; each child owns its motion + timing via `custom`
    const containerVariants: Variants = { hidden: {}, visible: {} };

    // Headline words rise out of an invisible mask, one after the other
    const maskedRise: Variants = {
        hidden: { y: reduce ? 0 : '115%' },
        visible: (i: number) => ({
            y: 0,
            transition: { duration: 1.1, delay: delayFor(i), ease: EASE },
        }),
    };

    // Social links pop out with a springy little overshoot
    const pop: Variants = {
        hidden: { opacity: 0, scale: reduce ? 1 : 0.4, y: reduce ? 0 : 12 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                delay: delayFor(i),
                opacity: { duration: 0.35, delay: delayFor(i) },
                type: 'spring',
                stiffness: 320,
                damping: 14,
                mass: 0.8,
            },
        }),
    };

    // Bottom blocks slide up from the bottom
    const fromBottom: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: delayFor(i), ease: EASE },
        }),
    };

    const socials = [
        { name: 'X', url: 'https://x.com/itzmichael_dev?s=11' },
        { name: 'Instagram', url: 'https://www.instagram.com/michael_dev007?xtok=MW9mMTEwMW9pbWxncw%3D%3D&utm_source=qr' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/michael-onyekwere/' },
    ];

    /*
     * Sequence:
     *  0 NEXT · 1 CHAPTER (rise from the bottom, one by one)
     *  2, 2.4, 2.8 social links pop out
     *  4 contact block · 4.6 tagline (slide up from the bottom)
     */
    return (
        <motion.main
            className="main relative w-full h-full min-h-screen p-[60px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="top max-sm:flex-col">
                <h1 className="headline font-serif-2">
                    <div style={{ overflow: 'hidden' }}>
                        <motion.div variants={maskedRise} custom={0} style={{ willChange: 'transform' }}>
                            LET'S
                        </motion.div>
                    </div>
                    <div className="mt-1" style={{ overflow: 'hidden' }}>
                        <motion.div variants={maskedRise} custom={1} style={{ willChange: 'transform' }}>
                            CONNECT
                        </motion.div>
                    </div>
                </h1>

                <div className="xl:contact-socials sm:contact-socials max-sm:none mt-5!">
                    <div className="flex gap-8 ml-auto">
                        {socials.map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                                variants={pop}
                                custom={2 + idx * 0.4}
                            >
                                <span className="text-base font-light tracking-widest hover:opacity-70 transition-opacity duration-300">
                                    {social.name}
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bottom">
                <motion.div variants={fromBottom} custom={4} className="col text-[15px]! max-sm:text-[13px]!">
                    <div>CONTACT TO</div>
                    <div className="mutedd text-2xl! mt-2! text-white! max-sm:text-lg!">Onyekweremichael55@gmail.com</div>
                    <a
                        href="mailto:Onyekweremichael55@gmail.com?subject=Booking%20a%20Call"
                        className="contact-call-btn rounded-md!  max-sm:mb-12!"
                    >
                        Book a Call
                    </a>
                </motion.div>

                {/* <motion.div variants={fromBottom} custom={4.6} className="scroll text-lg! max-sm:mb-12!">
                    LET'S CONNECT <span className="max-sm:hidden">THE DOTS...</span>
                </motion.div> */}
            </div>
        </motion.main>
    );
}