// No need for useParams now
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import API from '../Api/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const QuizPerformance = ({ quizId }) => {
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (quizId) fetchQuizPerformance();
  }, [quizId]);

  const fetchQuizPerformance = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/performance/${quizId}`);
      setPerformance(response.data.quizPerformance);
      console.log(response.data.quizPerformance);
    } catch (error) {
      console.error('Error fetching quiz performance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[800px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800 mr-4"></div>
        <p className="text-center text-gray-800 text-xl">Fecthing Quiz Performance</p>
      </div>
    );
  }

  if (!performance) {
    return null;
  }

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
    <div className="max-w-4xl mx-auto p-5 min-h-[800px]">
      <div className="bg-white p-4 rounded-xl shadow-lg overflow-hidden">
        <h1 className="text-3xl text-black font-bold mb-8">Quiz Performance Details</h1>
    
        {/* Quiz Info */}
        <div className="bg-gray-900 p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quiz Information</h2>
          <div className="grid grid-cols-2 gap-4 text-white">
            <div>
              <p className="text-gray-200">Score</p>
              <p className="font-medium">{performance.score}</p>
            </div>
            <div>
              <p className="text-gray-200">Topic</p>
              <p className="font-medium">{performance.quizDetails.topic}</p>
            </div>
            <div>
              <p className="text-gray-200">Difficulty</p>
              <p className="font-medium">{performance.quizDetails.difficulty}</p>
            </div>
            <div>
              <p className="text-gray-200">Date Taken</p>
              <p className="font-medium">
                {new Date(performance.lastAttempt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
    
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Score & Accuracy</h3>
            <div className="w-64 h-64 mx-auto">
              <Doughnut
                data={accuracyData}
                options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg text-gray-900">
                Accuracy:{' '}
                <span className="font-bold text-green-600">
                  {performance.accuracy.toFixed(1)}%
                </span>
              </p>
            </div>
          </div>
    
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Additional Metrics</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Average Response Time</p>
                <p className="text-2xl font-bold text-purple-600">
                  {performance.avgResponseTime.toFixed(2)}s
                </p>
              </div>
              <div>
                <p className="text-gray-600">Weak Topics</p>
                {performance.weakTopics.length > 0 ? (
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {performance.weakTopics.map((topic, index) => (
                      <li key={index} className="text-gray-700">
                        {topic}
                      </li>
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
      {/* Quiz History */}
<div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-inner">
  <h3 className="text-xl font-semibold mb-6 text-cyan-900 text-center">Quiz History</h3>
  <div className="space-y-6">
    {performance.quizDetails.questions.map((q, index) => {
      const isCorrect = q.selectedAnswer === q.answer;

      return (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="font-semibold text-gray-800 mb-2">
            Q{index + 1}. {q.question}
          </p>
          <p className="mb-3 text-sm text-gray-600">
            Subtopic: <span className="text-indigo-600 font-medium">{q.subTopic}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {q.options.map((option, optIndex) => {
              const isSelected = q.selectedAnswer === option;
              const isAnswer = q.answer === option;

              let optionStyle = "p-2 rounded border transition-all";

              if (isAnswer) {
                optionStyle += " border-green-600 bg-green-50 text-green-800 font-semibold";
              }

              if (isSelected && !isCorrect) {
                optionStyle += " border-red-600 bg-red-50 text-red-800 font-semibold";
              }

              if (!isAnswer && !isSelected) {
                optionStyle += " border-gray-300 text-gray-700";
              }

              return (
                <div key={optIndex} className={optionStyle}>
                  {option}
                </div>
              );
            })}
          </div>
          <div className="text-sm">
            <p className='text-red-600 font-medium'>
              Your Answer:{' '}
              <span className={isCorrect ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                {q.selectedAnswer}
              </span>
            </p>
            {!isCorrect && (
              <p className='text-green-600 font-medium'>
                Correct Answer:{' '}
                <span className="text-green-700 font-semibold">{q.answer}</span>
              </p>
            )}
          </div>
        </div>
      );
    })}
  </div>
</div>

    </div>
  );
  
};

export default QuizPerformance;
