import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import API from '../utils/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const QuizPerformance = () => {
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const { quizId } = useParams();

  useEffect(() => {
    fetchQuizPerformance();
  }, [quizId]);

  const fetchQuizPerformance = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/performance/${quizId}`);
      setPerformance(response.data.quizPerformance);
    } catch (error) {
      console.error('Error fetching quiz performance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading quiz performance...</div>;
  }

  if (!performance) {
    return <div className="text-center p-6">No performance data available for this quiz</div>;
  }

  // Prepare data for accuracy chart
  const accuracyData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [{
      data: [performance.correctAnswers, performance.incorrectAnswers],
      backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
      borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
      borderWidth: 1
    }]
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Quiz Performance Details</h1>

      {/* Quiz Info */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Quiz Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Category</p>
            <p className="font-medium">{performance.quizDetails.category}</p>
          </div>
          <div>
            <p className="text-gray-600">Topic</p>
            <p className="font-medium">{performance.quizDetails.topic}</p>
          </div>
          <div>
            <p className="text-gray-600">Difficulty</p>
            <p className="font-medium">{performance.quizDetails.difficulty}</p>
          </div>
          <div>
            <p className="text-gray-600">Date Taken</p>
            <p className="font-medium">{new Date(performance.lastAttempt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Score and Accuracy */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Score & Accuracy</h3>
          <div className="w-64 h-64 mx-auto">
            <Doughnut 
              data={accuracyData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }} 
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg">Accuracy: <span className="font-bold text-green-600">{performance.accuracy.toFixed(1)}%</span></p>
            <p className="text-lg">Score: <span className="font-bold text-blue-600">{performance.score}</span></p>
          </div>
        </div>

        {/* Response Time and Weak Topics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Additional Metrics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Average Response Time</p>
              <p className="text-2xl font-bold text-purple-600">{performance.avgResponseTime.toFixed(2)}s</p>
            </div>
            <div>
              <p className="text-gray-600">Weak Topics</p>
              {performance.weakTopics.length > 0 ? (
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {performance.weakTopics.map((topic, index) => (
                    <li key={index} className="text-gray-700">{topic}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-600 font-medium">No weak topics identified</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPerformance;