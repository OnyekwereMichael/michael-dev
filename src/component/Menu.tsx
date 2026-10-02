import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import AboutDetail from './Aboutdetail';
import WorksModal from './WorkModal';
import ContactForm from './ContactForm';


type Action = 'about' | 'works' | 'contact';
interface MenuItem {
    number: string;
    label: string;
    href?: string;
    action?: Action;
}

const menuItems: MenuItem[] = [
    { number: '01', label: 'HOME', href: '#home' },
    { number: '02', label: 'ABOUT', action: 'about' },
    { number: '03', label: 'WORKS', action: 'works' },
    { number: '04', label: 'CONTACT', action: 'contact' },
];

const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Behance', href: 'https://behance.net' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
];

const EASE = [0.22, 0.85, 0.32, 1] as const;
const SPINNER_MS = 1400; // how long the spinner shows before the chosen screen opens

/*
 * One set of state names ("closed" → "open" → "leaving" / "exit") is shared by every part of
 * the menu, so each child automatically follows its parent and the stagger does the rest.
 *  - open    : links rise in one by one, top → bottom
 *  - leaving : (a link was clicked) links fade away one by one, bottom → top, spinner appears
 *  - exit    : (Close pressed) links drop down one by one, CONTACT first, HOME last
 */
const overlayVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
    leaving: { opacity: 1 },
    exit: (fast: boolean) => ({
        opacity: 0,
        pointerEvents: 'none',
        transition: { duration: fast ? 0.45 : 0.5, delay: fast ? 0 : 0.65, ease: EASE },
    }),
};

const navVariants: Variants = {
    closed: {},
    open: { transition: { staggerChildren: 0.11, delayChildren: 0.35 } },
    leaving: { transition: { staggerChildren: 0.07, staggerDirection: -1 } },
    exit: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
};

const itemVariants: Variants = {
    closed: { opacity: 0, y: 56 },
    open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
    leaving: { opacity: 0, y: -16, transition: { duration: 0.4, ease: EASE } },
    exit: { opacity: 0, y: 72, transition: { duration: 0.5, ease: [0.55, 0, 0.8, 0.35] } },
};

const fadeVariants: Variants = {
    closed: { opacity: 0, y: 12 },
    open: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.9, ease: EASE } },
    leaving: { opacity: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
};

const loaderVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 0 },
    leaving: { opacity: 1, transition: { duration: 0.4, delay: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [pending, setPending] = useState<MenuItem | null>(null); // link clicked, spinner showing
    const [fastExit, setFastExit] = useState(false);
    const [showAboutDetail, setShowAboutDetail] = useState(false);
    const [showWorksModal, setShowWorksModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    const closeMenu = useCallback(() => {
        if (pending) return;
        clearTimeout(timer.current);
        setFastExit(false);
        setIsOpen(false);
    }, [pending]);

    // Escape to close + lock page scroll while open
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu();
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [isOpen, closeMenu]);

    const handleItem = (item: MenuItem) => {
        if (pending) return;

        // Home: just drop the menu away, then scroll to the section
        if (!item.action) {
            closeMenu();
            timer.current = setTimeout(() => {
                const el = item.href ? document.querySelector(item.href) : null;
                el ? el.scrollIntoView({ behavior: 'smooth' }) : item.href && (window.location.hash = item.href);
            }, 900);
            return;
        }

        // Others: links fade away → spinner → open the screen
        setPending(item);
        timer.current = setTimeout(() => {
            if (item.action === 'about') setShowAboutDetail(true);
            if (item.action === 'works') setShowWorksModal(true);
            if (item.action === 'contact') setShowContactModal(true);
            setFastExit(true);
            setIsOpen(false);
            setPending(null);
        }, SPINNER_MS);
    };

    return (
        <>
            <button className="menu-btn" onClick={() => setIsOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={isOpen}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <AnimatePresence custom={fastExit}>
                {isOpen && (
                    <motion.div
                        key="menu"
                        className="mn-overlay"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Main menu"
                        aria-busy={!!pending}
                        custom={fastExit}
                        variants={overlayVariants}
                        initial="closed"
                        animate={pending ? 'leaving' : 'open'}
                        exit="exit"
                    >
                        <div className="mn-shell">
                            <motion.div className="mn-head" variants={fadeVariants}>
                                <button className="mn-close" onClick={closeMenu}>CLOSE</button>
                            </motion.div>

                            <motion.ul className="mn-nav" variants={navVariants}>
                                {menuItems.map((item) => (
                                    <motion.li key={item.number} variants={itemVariants}>
                                        <button
                                            className="mn-link"
                                            onClick={() => handleItem(item)}
                                            disabled={!!pending}
                                        >
                                            <span className="mn-num">{item.number}</span>
                                            <span className="mn-label">{item.label}</span>
                                        </button>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div className="mn-foot" variants={fadeVariants}>
                                {socialLinks.map((link) => (
                                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="mn-social">
                                        {link.label}
                                    </a>
                                ))}
                            </motion.div>
                        </div>

                        {/* Spinner in the centre while the chosen screen loads */}
                        <motion.div className="mn-loader" variants={loaderVariants} role="status">
                            <span className="mn-spinner" />
                            <span className="mn-loader-text">{pending ? pending.label : ''}</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showAboutDetail && <AboutDetail onClose={() => setShowAboutDetail(false)} />}
            </AnimatePresence>
            <AnimatePresence>
                {showWorksModal && <WorksModal onClose={() => setShowWorksModal(false)} />}
            </AnimatePresence>
            <AnimatePresence>
                {showContactModal && <ContactForm onClose={() => setShowContactModal(false)} />}
            </AnimatePresence>
        </>
    );
}