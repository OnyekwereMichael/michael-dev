'use client';
import { motion } from 'framer-motion';
import myself from '../../assets/WhatsApp Image 2026-09-23 at 11.58.00.jpeg'

export default function About() {
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

    return (
        <motion.main
            className="about-main bg-[#faf9f6]!"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
        >
            <div className="about-left">
                <motion.div variants={itemVariants}>
                    <h2 className="about-chapter font-serif-2 text-[#2e2b28]!">CHAPTER I</h2>
                </motion.div>

                <motion.div variants={itemVariants} className="about-interests text-[#2e2b28]!">
                    <p className="interests-text text-[#2e2b28]!">
                        Beyond design: <a href="#football" className='text-[#2e2b28]!'>football</a>, <a href="#watches" className='text-[#2e2b28]!'>watches</a>,{' '}
                        <a href="#aquariums" className='text-[#2e2b28]!'>aquariums</a>, and <a href="#martial" className='text-[#2e2b28]!'>martial arts</a>.
                    </p>
                </motion.div>
            </div>


            <div className="about-right">
                <motion.div variants={itemVariants} className="about-label text-[#2e2b28]!">
                    QUICK INTRO
                </motion.div>

                {/* Main Bio Text */}
                <motion.div variants={itemVariants} className="about-bio text-[#2e2b28]!">
                    <p className='text-[#2e2b28]!'>
                        Hi, I'm <span className="highlight ">Michael</span> — a Software developer with
                        thoughtful approach to building clear, intuitive, and user-focused digital experiences
                        that solve real problems.
                    </p>
                    <span className="work-for-tag  text-[#2e2b28]! ">PASSIONATE ABOUT CRAFT</span>
                </motion.div>

                {/* Portrait & CTA */}
                <div className="about-portrait-section">
                    <motion.div variants={itemVariants} className="about-cta">
                        <a href="#more" className="more-link text-[#2e2b28]! ">
                            More about me <span className="arrow text-[#2e2b28]!">→</span>
                        </a>
                    </motion.div>
                    <motion.div variants={itemVariants} className="about-portrait">
                        <div className="portrait-placeholder">

                            <img
                                src={myself}
                                alt="Michael Portrait"
                                className="portrait-img"
                            />
                        </div>
                    </motion.div>


                </div>
            </div>
        </motion.main>
    );
}