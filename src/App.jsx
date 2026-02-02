import React from 'react';
import './App.css';
import Gauge from './components/Gauge';
import LineChart from './components/LineChart';
import { useSpeedTest } from './hooks/useSpeedTest';

function App() {
  const { status, downloadSpeed, uploadSpeed, speedHistory, error, ipInfo, startTest } = useSpeedTest();


  let gaugeValue = 0;
  let gaugeLabel = 'Ready';

  if (status === 'downloading') {
    gaugeValue = downloadSpeed;
    gaugeLabel = 'Downloading...';
  } else if (status === 'uploading') {
    gaugeValue = uploadSpeed;
    gaugeLabel = 'Uploading...';
  } else if (status === 'complete') {
    gaugeValue = downloadSpeed;
    gaugeLabel = 'Test Complete';
  } else if (status === 'error') {
    gaugeLabel = 'Error';
  }

  return (
    <div className="app-container">
      <h1>SPEEDCHECK BABA</h1>

      <div className="dashboard">
        <Gauge
          value={gaugeValue}
          label={gaugeLabel}
          status={status}
        />

        {(status === 'downloading' || status === 'uploading') && (
          <div className="chart-container">
            <LineChart data={speedHistory} status={status} />
          </div>
        )}

        {status === 'idle' || status === 'complete' || status === 'error' ? (
          <button className="start-btn" onClick={startTest}>
            {status === 'idle' ? 'Start Test' : 'Test Again'}
          </button>
        ) : (
          <div style={{ height: '60px' }}></div>
        )}

        {status === 'complete' && (
          <div className="results-grid">
            <div className="result-card">
              <div className="result-label">Download</div>
              <div className="result-value">{downloadSpeed.toFixed(1)}</div>
              <div className="result-unit">Mbps</div>
            </div>
            <div className="result-card">
              <div className="result-label">Upload</div>
              <div className="result-value">{uploadSpeed.toFixed(1)}</div>
              <div className="result-unit">Mbps</div>
            </div>
          </div>
        )}

        {status === 'complete' && ipInfo && (
          <div className="network-info">
            <div className="network-details">
              <div className="network-item">
                <div className="network-label">Provider</div>
                <div className="network-value">{ipInfo.org || ipInfo.asn}</div>
              </div>
            </div>
          </div>
        )}

        {error && <div style={{ color: '#ff0055', marginTop: '1rem' }}>{error}</div>}
      </div>

      <div className="footer">
        Created by Aditya <a href='https://www.github.com/maratanda8-ux' target='_blank'>(maratanda8-ux)</a>😤
      </div>
    </div>
  );
}

export default App;
