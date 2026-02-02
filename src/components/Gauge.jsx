import React from 'react';
import './Gauge.css';

const Gauge = ({ value, label, status }) => {
    // Value is expected to be 0 to 100+ (Mbps).
    // We'll map it to a 0-1 range for the gauge, considering a max speed for the visual scale.
    // Let's say max visual speed is 100 Mbps (or 1000 with a logarithmic scale).
    // For simplicity, let's use linear 0-200.

    const maxVal = 200;
    const clampedValue = Math.min(Math.max(value, 0), maxVal);
    const percentage = clampedValue / maxVal;

    // SVG Math for 240 degree arc
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const arcLength = circumference * (240 / 360);
    const dashOffset = arcLength - (percentage * arcLength);

    return (
        <div className="gauge-container">
            <div className="gauge-wrapper">
                <svg className="gauge-svg" viewBox="0 0 200 200">
                    {/* Defs for Gradients */}
                    <defs>
                        <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00f2ff" />
                            <stop offset="100%" stopColor="#ff0055" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background Track */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${arcLength} ${circumference}`}
                        transform="rotate(150 100 100)"
                    />

                    {/* Progress Arc */}
                    <circle
                        className="gauge-progress"
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="url(#gauge-gradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${arcLength} ${circumference}`}
                        strokeDashoffset={dashOffset}
                        transform="rotate(150 100 100)"
                        filter="url(#glow)"
                    />
                </svg>

                {/* Center Text */}
                <div className="gauge-display">
                    <div className="gauge-value">{value.toFixed(2)}</div>
                    <div className="gauge-unit">Mbps</div>
                    <div className="gauge-label">{label}</div>
                    {status !== 'idle' && status !== 'complete' && (
                        <div className="gauge-status-indicator pulse"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Gauge;
