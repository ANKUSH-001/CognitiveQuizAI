import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAIReview } from '../utils/quizApi';

const AIReview = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { quizId } = useParams();

  useEffect(() => {
    fetchAIReview();
  }, [quizId]);

  const fetchAIReview = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAIReview(quizId);
      setReview(response);
    } catch (error) {
      setError(error.message || 'Failed to fetch AI review');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        <p>{error}</p>
        <button
          onClick={fetchAIReview}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">No review available</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white">AI Review Analysis</h2>
          <p className="text-blue-100 mt-2">Quiz Topic: {review.quiz?.topic || 'N/A'}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">Score</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {review.performance?.totalScore || 0}/{review.performance?.totalQuestions || 0}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900">Accuracy</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {review.performance?.accuracy?.toFixed(1) || 0}%
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900">Difficulty</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {review.quiz?.difficulty || 'N/A'}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Feedback</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{review.feedback}</p>
            </div>
          </div>

          {review.performance?.weakTopics?.length > 0 && (
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">Areas for Improvement</h3>
              <div className="flex flex-wrap gap-2">
                {review.performance.weakTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t">
          <button
            onClick={fetchAIReview}
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Generate New Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIReview;