// 'use client';
// import { motion } from 'framer-motion';

// export default function Contact() {
// const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//         opacity: 1,
//         transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//     },
// };

// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// const socials = [
//     { name: 'Instagram', url: 'https://instagram.com' },
//     { name: 'Behance', url: 'https://behance.net' },
//     { name: 'LinkedIn', url: 'https://linkedin.com' },
// ];

//     return (
//         <motion.main
//             className="contact-main"
//             initial="hidden"
//             whileInView="visible"
//             variants={containerVariants}
//         >
//             {/* Top Right - Social Links */}
//             <motion.div className="contact-socials" variants={itemVariants}>
//                 {socials.map((social, idx) => (
//                     <motion.a
//                         key={idx}
//                         href={social.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="contact-social-link"
//                         variants={itemVariants}
//                         whileHover={{ opacity: 0.7 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         {social.name}
//                     </motion.a>
//                 ))}
//             </motion.div>

//             {/* Center - Main Heading */}
//             <motion.div className="contact-center" variants={itemVariants}>
//                 <h1 className="contact-heading">NEXT<br />CHAPTER</h1>
//             </motion.div>

//             {/* Left Bottom - Contact Info */}
//             <div className="contact-info">
//                 <motion.p variants={itemVariants} className="contact-label">
//                     CONTACT TO
//                 </motion.p>
//                 <motion.a
//                     variants={itemVariants}
//                     href="mailto:onyekweremichael55@gmail.com"
//                     className="contact-email"
//                 >
//                     onyekweremichael55@gmail.com
//                 </motion.a>
//             </div>

//             {/* Right Bottom - Tagline */}
//             <motion.p variants={itemVariants} className="contact-tagline">
//                 LET'S CRAFT SOMETHING THOUGHTFUL TOGETHER
//             </motion.p>
//         </motion.main>
//     );
// }


'use client';

import { motion } from 'framer-motion';


export default function Contact() {

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const socials = [
        { name: 'X', url: 'https://behance.net' },
        { name: 'Instagram', url: 'https://instagram.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com' },
    ];


    return (
        <main className="main relative w-full h-full min-h-screen p-[60px]">
            <div className="top max-sm:flex-col">
                <h1 className="headline font-serif-2">
                    <div>NEXT</div>
                    <div className='mt-1'>CHAPTER</div>
                </h1>

                <motion.div className="xl:contact-socials sm:contact-socials max-sm:none  mt-5!" variants={itemVariants}>
                    <div className="flex gap-8 ml-auto mt-6! max-sm:mt-0!">
                        {socials.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base font-light tracking-widest hover:opacity-70 transition-opacity duration-300"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div >

            <div className="bottom">
                <div className="col text-[15px]! max-sm:text-[13px]!">
                    <div className=''>CONTACT TO</div>
                    <div className="mutedd text-2xl! mt-2! text-white! max-sm:text-lg!">Onyekweremichael55@gmail.com</div>
                </div>

                {/* <div className="col">
                    <div>Open for</div>
                    <div>Collaborations</div>
                </div> */}

                <div className="scroll text-lg! ">LET'S WORK TOGETHER</div>
            </div>
        </main >
    );
}