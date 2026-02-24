import React, { useEffect, useState, useRef } from 'react';
import './AnimatedStatsGrid.css';

// Custom hook for counting animation
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [hasStarted, end, duration]);

    return { count, ref };
};

const StatCard = ({ end, suffix, label, delay }) => {
    const { count, ref } = useCountUp(end);

    return (
        <div className="stat-card fade-in-up" ref={ref} style={{ animationDelay: `${delay}s` }}>
            <div className="stat-number gradient-text gradient-animated">
                {count}{suffix}
            </div>
            <div className="stat-label">{label}</div>
        </div>
    );
};

const AnimatedStatsGrid = () => {
    return (
        <section className="stats-section container">
            <div className="stats-grid">
                <StatCard end={75} suffix="" label="Communities" delay={0.1} />
                <StatCard end={400} suffix="+" label="Events per year" delay={0.2} />
                <StatCard end={190} suffix="" label="Organisers" delay={0.3} />
                <StatCard end={600} suffix="K+" label="Total Members" delay={0.4} />
            </div>
        </section>
    );
};

export default AnimatedStatsGrid;
