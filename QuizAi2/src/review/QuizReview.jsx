import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizReview } from '../utils/quizApi';

const QuizReview = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { quizId } = useParams();

  useEffect(() => {
    fetchQuizReview();
  }, [quizId]);

  const fetchQuizReview = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getQuizReview(quizId);
      setReview(response);
    } catch (error) {
      setError(error.message || 'Failed to fetch quiz review');
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
          onClick={fetchQuizReview}
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
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
          <h2 className="text-2xl font-bold text-white">Quiz Review</h2>
          <p className="text-green-100 mt-2">Score: {review.score}/{review.totalQuestions}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900">Performance</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {((review.score / review.totalQuestions) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">Date Taken</h3>
              <p className="text-lg text-blue-600 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {review.feedback && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Feedback</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{review.feedback}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizReview;