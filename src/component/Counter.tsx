import { useEffect, useState } from 'react';

export default function Counter({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(2023);
    const [showSubtext, setShowSubtext] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const currentYear = new Date().getFullYear();
    const targetYear = currentYear;

    useEffect(() => {
        // Start counting immediately
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= targetYear) {
                    clearInterval(interval);
                    // Show subtext when done counting
                    setTimeout(() => {
                        setShowSubtext(true);
                    }, 300);
                    // Complete after showing subtext
                    setTimeout(() => {
                        setIsComplete(true);
                        onComplete();
                    }, 2500);
                    return prev;
                }
                return prev + 1;
            });
        }, 150); // Slow, nice pace

        return () => clearInterval(interval);
    }, [targetYear, onComplete]);

    if (isComplete) {
        return null;
    }

    return (
        <div className="counter-screen">
            <div className="counter-main">
                <div className="counter-content">
                    <div className="counter-number font-serif-2">
                        {count}
                    </div>

                    <div className={`counter-subtext ${showSubtext ? 'fade-in' : ''}`}>
                        A journey through years of design
                    </div>
                </div>

                <div className="counter-progress">
                    <div
                        className="counter-progress-bar"
                        style={{ width: `${((count - 2023) / (targetYear - 2023)) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}