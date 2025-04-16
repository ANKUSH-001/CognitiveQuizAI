import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { generateQuiz, getNextQuestion, submitQuizAnswers } from '../utils/quizApi';
import Loader from './Loader';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { topic } = useParams();
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    if (topic && userId) {
      startQuiz();
    }
  }, [topic, userId]);

  const startQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      await generateQuiz(topic, userId);
      await fetchNextQuestion();
    } catch (error) {
      setError(error.message || 'Failed to start quiz');
      console.error('Error starting quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getNextQuestion(userId);
      
      if (response.message === 'Hurray! Quiz completed') {
        navigate(`/quiz-results/${response.quizId}`);
      } else {
        setCurrentQuestion(response.question);
        setSelectedAnswer(null);
        setProgress((prev) => prev + 8.33); // 100/12 questions = 8.33%
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch next question');
      console.error('Error fetching question:', error);
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
      }
      await fetchNextQuestion();
    } catch (error) {
      setError(error.message || 'Failed to submit answer');
      console.error('Error submitting answer:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Loading quiz..." color="purple" />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={startQuiz}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader text="Preparing your quiz..." color="blue" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 text-right">
          Question {answers.length + 1} of 12
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              disabled={loading}
              className={`
                w-full p-4 text-left rounded-lg transition-all duration-200
                ${selectedAnswer === option
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                } 
                border-2
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || loading}
          className={`
            mt-8 w-full py-3 px-6 rounded-lg text-white font-semibold
            transition-all duration-200
            ${!selectedAnswer || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
            }
          `}
        >
          {loading ? 'Submitting...' : 'Submit Answer'}
        </button>
      </div>

      {/* Quiz Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Topic: {topic}</span>
          <span>Difficulty: {currentQuestion.difficulty}</span>
        </div>
      </div>
    </div>
  );
};

export default Quiz;