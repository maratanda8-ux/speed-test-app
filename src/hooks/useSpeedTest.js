import { useState, useCallback } from 'react';
import { speedTestInstance } from '../utils/speedTest';

export const useSpeedTest = () => {
    const [status, setStatus] = useState('idle'); // idle, downloading, uploading, complete, error
    const [downloadSpeed, setDownloadSpeed] = useState(0);
    const [uploadSpeed, setUploadSpeed] = useState(0);
    const [speedHistory, setSpeedHistory] = useState([]);
    const [error, setError] = useState(null);
    const [ipInfo, setIpInfo] = useState(null);

    const startTest = useCallback(async () => {
        if (status === 'downloading' || status === 'uploading') return;

        setStatus('downloading');
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setSpeedHistory([]);
        setError(null);
        setIpInfo(null);

        try {
            // Fetch IP info in background
            speedTestInstance.getNetworkInfo().then(info => {
                if (info) setIpInfo(info);
            });

            // Download Test
            await speedTestInstance.runDownloadTest((speed) => {
                setDownloadSpeed(speed);
                setSpeedHistory(prev => [...prev, { speed }]);
            });

            setStatus('uploading');
            setSpeedHistory([]);

            // Upload Test
            await speedTestInstance.runUploadTest((speed) => {
                setUploadSpeed(speed);
                setSpeedHistory(prev => [...prev, { speed }]);
            });

            setStatus('complete');
        } catch (err) {
            console.error(err);
            setError('Test failed. Please check your connection.');
            setStatus('error');
        }

    }, [status]);

    const cancelTest = useCallback(() => {
        speedTestInstance.cancel();
        setStatus('idle');
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setSpeedHistory([]);
    }, []);

    return {
        status,
        downloadSpeed,
        uploadSpeed,
        speedHistory,
        error,
        ipInfo,
        startTest,
        cancelTest
    };
};
