import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PopupModal from "../Modal/Popup";
import QuizPerformance from "../performance/quizPerformance";

const Congratulations = () => {
  const { state } = useLocation();
  const summary = state?.result;
  const navigate = useNavigate();

  // Modal state
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handlePerformance = () => {
    setLoading(true);
    setShowPerformanceModal(true);

    // Fake loading timeout to simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust time if needed
  };

  const closeModal = () => {
    setShowPerformanceModal(false);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[800px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-green-800 border-transparent mr-4"></div>
        {/* <p className="text-center text-gray-800 text-xl">Fetching Quiz Performance</p> */}
      </div>
    );
  }
  

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">🎉 Congratulations!</h1>
      <p className="text-lg mb-2">You've completed the quiz.</p>

      {summary ? (
        <div className="mt-4 text-left inline-block">
          <p><strong>Total Questions:</strong> {Number(summary.incorrectAnswers) + Number(summary.correctAnswers)}</p>
          <p><strong>Incorrect:</strong> {summary.incorrectAnswers}</p>
          <p><strong>Correct:</strong> {summary.correctAnswers}</p>
          <p><strong>Score:</strong> {summary.score}</p>
          <p><strong>Accuracy:</strong> {summary.accuracy}</p>

          {summary.weakTopics && summary.weakTopics.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-red-600">Weak Topics:</p>
              <ul className="list-disc list-inside text-gray-700">
                {summary.weakTopics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDashboard}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handlePerformance}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Deep Performance Overview
            </button>
          </div>

          {/* Popup Modal */}
          <PopupModal isOpen={showPerformanceModal} onClose={closeModal} isLoading={loading}>
            <QuizPerformance quizId={summary.quizId} />
          </PopupModal>
        </div>
      ) : (
        <p className="text-red-500 mt-4">Result data not available.</p>
      )}
    </div>
  );
};

export default Congratulations;
