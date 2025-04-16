import { useState, useEffect } from 'react';
import { getOverallReview } from '../Api/quizApi';

const OverallReview = ({data}) => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noData,setNoData]=useState(true);


  console.log("Ai review: ",data);
  useEffect(() => {
    fetchOverallReview();
  }, []);

  const fetchOverallReview = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOverallReview();
      console.log(response);
      setReview(response);
    } catch (error) {
      if (error.response) {
        console.log("Error: ", error);
        // If the error is from the backend, display the message
        setError(error.response.data.message || 'Failed to fetch overall review');
      } else {
        setError(error.message || 'Failed to fetch overall review');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-100">Fetching overall performance AI Review...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white text-center px-4">
        <p className="text-2xl font-bold mb-2">{error}</p>
        <p className="text-lg font-medium text-gray-300">
          You seem to be a new user, please give a quiz and try again later.
        </p>
      </div>
    );
  }
  

  if (!review) {
    return (
      <div className="text-center p-6">
        <p className="text-2xl font-semibold text-gray-700">No quiz data found.</p>
        <p className="text-gray-500 mt-2">Start attempting quizzes to see your performance review here.</p>
      </div>
    );
  }
  

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
          <h2 className="text-2xl font-bold text-white">Overall Performance Review</h2>
          <p className="text-purple-100 mt-2">Your Learning Journey Analysis</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900">Total Quizzes</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {data.totalQuizzes || 0}
              </p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-pink-900">Average Accuracy</h3>
              <p className="text-3xl font-bold text-pink-600 mt-2">
                {data.avgAccuracy?.toFixed(1) || 0}%
              </p>
            </div>
            
          </div>

          {review.weakTopics?.length > 0 && (
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">Areas Needing Focus</h3>
              <div className="flex flex-wrap gap-2">
                {review.weakTopics.map((topic, index) => (
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

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Learning Insights</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{review.feedback}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={fetchOverallReview}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
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
              Update Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallReview;