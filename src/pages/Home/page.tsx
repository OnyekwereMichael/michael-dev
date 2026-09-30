import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from '../../component/Hero';
import About from '../About/page';
import Sidebar from '../../component/Sidebar';
import Counter from '../../component/Counter';
import Works from '../../component/Work';
import WorkDetail from '../WorkDetail/page';
import WhatIDo from '../WhatIDo/page';
import Experience from '../Exp/page';
import Contact from '../Contact/page';
import ScrollIndicator from '../../component/ScrollIndicator';


export default function Home() {
    const [showMain, setShowMain] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const slides = [
        { id: 'hero', component: Hero },
        { id: 'about', component: About },
        { id: 'works', component: Works },
        { id: 'work-detail', component: WorkDetail },
        // { id: 'howiwork', component: HowIWork },
        { id: 'whatido', component: WhatIDo },
        // { id: 'experience-note', component: ExperienceNote },
        { id: 'experience', component: Experience },
        { id: 'contact', component: Contact },
    ];

    // Handle scroll wheel for horizontal carousel
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!showMain) return;

            e.preventDefault();

            const deltaY = e.deltaY;
            const deltaX = e.deltaX;
            const threshold = 40;
            if (Math.abs(deltaY) < threshold && Math.abs(deltaX) < threshold) {
                return;
            }

            if (isScrolling) return;
            setIsScrolling(true);

            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                if (deltaY > 0 && currentSlide < slides.length - 1) {
                    setCurrentSlide(currentSlide + 1);
                } else if (deltaY < 0 && currentSlide > 0) {
                    setCurrentSlide(currentSlide - 1);
                }
            } else {
                if (deltaX > 0 && currentSlide < slides.length - 1) {
                    setCurrentSlide(currentSlide + 1);
                } else if (deltaX < 0 && currentSlide > 0) {
                    setCurrentSlide(currentSlide - 1);
                }
            }

            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 800);
        };

        if (showMain) {
            window.addEventListener('wheel', handleWheel, { passive: false });
            return () => window.removeEventListener('wheel', handleWheel);
        }
    }, [currentSlide, showMain, isScrolling, slides.length]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!showMain) return;

            if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && currentSlide < slides.length - 1) {
                setCurrentSlide(currentSlide + 1);
            } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && currentSlide > 0) {
                setCurrentSlide(currentSlide - 1);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentSlide, showMain, slides.length]);

    return (
        <div className="page">
            <Sidebar />

            {!showMain && (
                <div className="main-content">
                    <Counter onComplete={() => setShowMain(true)} />
                </div>
            )}

            {showMain && (
                <div className="carousel-container">
                    <motion.div
                        className="carousel-track"
                        animate={{ x: `${-currentSlide * 100}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 0.85, 0.32, 1] }}
                    >
                        {slides.map((slide) => (
                            <motion.div
                                key={slide.id}
                                className="carousel-slide"
                            >
                                <slide.component />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Custom Scroll Indicator - Auto-adapts to theme */}
                    <ScrollIndicator
                        currentSlide={currentSlide}
                        totalSlides={slides.length}
                        isDarkTheme={![1, 2, 3, 5].includes(currentSlide)} // Light: About, Works, WorkDetail, Experience
                    />
                </div>
            )}
        </div>
    );
}