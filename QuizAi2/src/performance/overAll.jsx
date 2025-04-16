import React, { useState, useEffect } from 'react';
import { Line, Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import API from '../utils/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const OverallPerformance = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      const response = await API.get('/performance');
      setPerformanceData(response.data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading performance data...</div>;
  }

  if (!performanceData) {
    return <div className="text-center p-6">No performance data available</div>;
  }

  const { overallStats, performances } = performanceData;

  // Prepare data for accuracy trend chart
  const accuracyData = {
    labels: performances.map((_, index) => `Quiz ${index + 1}`),
    datasets: [{
      label: 'Accuracy %',
      data: performances.map(p => p.accuracy),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  // Prepare data for response time chart
  const responseTimeData = {
    labels: performances.map((_, index) => `Quiz ${index + 1}`),
    datasets: [{
      label: 'Avg Response Time (s)',
      data: performances.map(p => p.avgResponseTime),
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
    }]
  };

  // Prepare data for weak topics radar chart
  const weakTopicsCount = overallStats.weakTopics.reduce((acc, topic) => {
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});

  const radarData = {
    labels: Object.keys(weakTopicsCount),
    datasets: [{
      label: 'Weak Topics Frequency',
      data: Object.values(weakTopicsCount),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Overall Performance Dashboard</h1>
      
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Quizzes</h3>
          <p className="text-2xl text-blue-600">{overallStats.totalQuizzes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Average Accuracy</h3>
          <p className="text-2xl text-green-600">{overallStats.avgAccuracy.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Correct</h3>
          <p className="text-2xl text-purple-600">{overallStats.totalCorrect}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Avg Response Time</h3>
          <p className="text-2xl text-orange-600">{overallStats.avgResponseTime.toFixed(2)}s</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Accuracy Trend</h3>
          <Line data={accuracyData} options={{ responsive: true }} />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Response Time Analysis</h3>
          <Bar data={responseTimeData} options={{ responsive: true }} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow col-span-2">
          <h3 className="text-lg font-semibold mb-4">Weak Topics Analysis</h3>
          <div className="h-[400px]">
            <Radar data={radarData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Recent Quizzes Table */}
      <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-lg font-semibold p-4 border-b">Recent Quizzes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performances.map((perf, index) => (
                <tr key={perf.quizId}>
                  <td className="px-6 py-4 whitespace-nowrap">Quiz {index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{perf.totalScore}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{perf.accuracy.toFixed(1)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">{perf.avgResponseTime.toFixed(2)}s</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(perf.lastAttempt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverallPerformance;