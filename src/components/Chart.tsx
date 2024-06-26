import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import './Chart.css';

interface DataPoint {
  timestamp: string;
  value1: number;
  value2: number;
  value3: number;
}

const Chart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<string>('daily');

  useEffect(() => {
    axios.get('/data.json').then((response) => {
      setData(response.data);
    });
  }, []);

  const handleZoom = (level: string) => {
    setTimeframe(level);
  };

  const handleExport = () => {
    const chartElement = document.getElementById('chart');
    if (chartElement) {
      html2canvas(chartElement).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, 'chart.png');
          }
        });
      });
    }
  };

  const filteredData = data.filter((point) => {
    const date = new Date(point.timestamp);
    if (timeframe === 'daily') return true;
    if (timeframe === 'weekly') return date.getDay() === 0;
    if (timeframe === 'monthly') return date.getDate() === 1;
    return true;
  });

  return (
    <div className="chart-container">
      <header className="header">
        <h1> Data Visualization Dashboard 🎛️</h1>
        <p>Interactive and Dynamic Data Charts for Better Insights 🎯</p>
      </header>
      <div id="chart">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fff" />
            <XAxis dataKey="timestamp" tick={{ fill: '#fff' }} />
            <YAxis tick={{ fill: '#fff' }} />
            <Tooltip contentStyle={{ backgroundColor: '#736c72', borderColor: '#736c72', color: '#fff', borderRadius: '10px', fontWeight: 'bolder', }} itemStyle={{ color: '#fff' }} />
            <Line type="monotone" dataKey="value1" stroke="#8884d8" strokeWidth={4} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="value2" stroke="#82ca9d" strokeWidth={4} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="value3" stroke="#ffc658" strokeWidth={4} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="button-container">
        <button onClick={() => handleZoom('daily')} className="animated-button">📅 Daily</button>
        <button onClick={() => handleZoom('weekly')} className="animated-button">🗓 Weekly</button>
        <button onClick={() => handleZoom('monthly')} className="animated-button">📆 Monthly</button>
        <button onClick={handleExport} className="animated-button">💾 Export as PNG</button>
      </div>
    </div>
  );
};

export default Chart;
