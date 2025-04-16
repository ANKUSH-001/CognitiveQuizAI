import React, { useState, useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import API from '../utils/api';
import Loader from './Loader';

const Performance = ({ userId }) => {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPerformanceData();
  }, [userId]);

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(`/performance/${userId}`);
      setPerformanceData(response.data.overallStats);
    } catch (err) {
      setError('Failed to fetch performance data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Loading performance data..." />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!performanceData) return <div className="text-gray-500 text-center p-4">No performance data available</div>;

  const accuracyData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [{
      data: [performanceData.totalCorrect, performanceData.totalIncorrect],
      backgroundColor: ['rgba(72, 187, 120, 0.8)', 'rgba(247, 82, 82, 0.8)'],
      borderColor: ['rgb(72, 187, 120)', 'rgb(247, 82, 82)'],
      borderWidth: 1
    }]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Performance Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Quiz Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Quizzes:</span>
              <span className="font-semibold text-blue-600">{performanceData.totalQuizzes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Score:</span>
              <span className="font-semibold text-green-600">
                {(performanceData.totalScore / performanceData.totalQuizzes).toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Response Time:</span>
              <span className="font-semibold text-purple-600">
                {performanceData.avgResponseTime.toFixed(2)}s
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Accuracy Overview</h3>
          <div className="w-48 h-48 mx-auto">
            <Doughnut
              data={accuracyData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {performanceData.weakTopics.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Areas for Improvement</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {performanceData.weakTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-50 rounded-lg p-3 text-sm text-gray-700"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance;