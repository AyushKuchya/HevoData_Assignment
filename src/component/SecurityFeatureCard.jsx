import { useState, useEffect, useRef } from "react"

export default function SecurityFeatureCard({
    feature,
    isActive,
    isRevealed = true,
    onClick,
    onAnimationComplete,
}) {
    const [progress, setProgress] = useState(0)
    const progressIntervalRef = useRef(null)
    const animationStartedRef = useRef(false)

    useEffect(() => {
        if (isActive && !animationStartedRef.current) {
            animationStartedRef.current = true;
            setProgress(0)

            progressIntervalRef.current = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(progressIntervalRef.current)
                        onAnimationComplete()
                        return 0
                    }
                    return prevProgress + 1
                })
            }, 50)
        } else if (!isActive) {
            animationStartedRef.current = false;
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
            }
            setProgress(0)
        }

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
            }
        }
    }, [isActive, onAnimationComplete])

    const radius = 18
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    if (!isRevealed) {
        return <div className="card-placeholder"></div>;
    }

    return (
        <div
            className={`feature-card ${isActive ? 'active' : ''} animate-fade-in`}
            onClick={onClick}
        >
            <div className="feature-icon-container">
                <div className="feature-icon">{feature.icon}</div>
                {isActive && (
                    <svg className="progress-circle" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="2" />
                        <circle
                            cx="20"
                            cy="20"
                            r={radius}
                            fill="none"
                            stroke="#7C3AED"
                            strokeWidth="2"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </svg>
                )}
            </div>
            <div className="flex-grow">
                <h3 className={`feature-title ${isActive ? 'active' : ''}`}>{feature.title}</h3>
            </div>
        </div>
    )
}
