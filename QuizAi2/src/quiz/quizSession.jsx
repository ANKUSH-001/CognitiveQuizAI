import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { generateQuiz, getNextQuestion, submitQuizAnswers } from "../utils/quizApi";

const QuizSession = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (topic && userId && !quizStarted) {
      startQuiz();
    }
  }, [topic, userId]);

  const startQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      await generateQuiz(topic, userId);
      setQuizStarted(true);
      await fetchNextQuestion();
    } catch (error) {
      setError(error.message || 'Failed to start quiz');
      console.error("Error starting quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getNextQuestion(userId);
      if (response.message === "Hurray! Quiz completed") {
        navigate(`/quiz-results/${response.quizId}`);
      } else {
        setCurrentQuestion(response.question);
        setSelectedAnswer(null);
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch next question');
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    try {
      setLoading(true);
      setError(null);
      const newAnswer = {
        questionIndex: answers.length,
        isCorrect: selectedAnswer === currentQuestion.answer
      };
      setAnswers([...answers, newAnswer]);

      if (answers.length + 1 >= 4) {
        await submitQuizAnswers(userId, [...answers, newAnswer]);
        await fetchNextQuestion();
      } else {
        await fetchNextQuestion();
      }
    } catch (error) {
      setError(error.message || 'Failed to submit answer');
      console.error("Error submitting answer:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={startQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Starting quiz...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Quiz on {topic}</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg mb-6">{currentQuestion.question}</p>
        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              disabled={loading}
              className={`w-full p-4 text-left rounded-lg transition-colors ${selectedAnswer === option
                ? 'bg-blue-100 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                } border-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || loading}
          className={`mt-6 w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
            !selectedAnswer
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuizSession;
