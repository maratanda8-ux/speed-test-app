import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = ({ data, status }) => {
    const chartData = {
        labels: data.map((_, index) => index), // Simple index-based labels for now, or use timestamps
        datasets: [
            {
                label: status === 'downloading' ? 'Download Speed' : 'Upload Speed',
                data: data.map(point => point.speed),
                borderColor: status === 'downloading' ? '#00e5ff' : '#aa00ff', // Cyan for download, Purple for upload
                backgroundColor: status === 'downloading' ? 'rgba(0, 229, 255, 0.2)' : 'rgba(170, 0, 255, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius: 0, // Hide points for smooth look
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false, // Hides axis, labels, and grid
                beginAtZero: true,
            },
        },
        animation: {
            duration: 0 // Disable animation for real-time performance
        }
    };

    return <div style={{ height: '200px', width: '100%' }}>
        <Line data={chartData} options={options} />
    </div>;
};

export default LineChart;
