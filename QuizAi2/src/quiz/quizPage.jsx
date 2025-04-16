import React, { useState, useEffect } from "react";
import { fetchNextQuestion, submitAnswers } from "../api";
import TopicSelection from "./topicSelection";

const QuizPage = ({ userId }) => {
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (topic) {
      loadNextBatch();
    }
  }, [topic]);

  const loadNextBatch = async () => {
    try {
      const response = await fetchNextQuestion(userId, topic);
      if (response.data.questions.length === 0) {
        setQuizCompleted(true);
      } else {
        setQuestions(response.data.questions);
        setSelectedAnswers({});
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedOption,
    });
  };

  const handleSubmit = async () => {
    const answerPayload = questions.map((q) => ({
      questionId: q._id,
      selectedAnswer: selectedAnswers[q._id] || null,
      isCorrect: selectedAnswers[q._id] === q.answer, // ✅ Check correctness here
    }));

    await submitAnswers(userId, answerPayload);

    if (currentBatch === 2) {
      setQuizCompleted(true);
    } else {
      setCurrentBatch(currentBatch + 1);
      loadNextBatch();
    }
  };

  if (!topic) {
    return <TopicSelection setTopic={setTopic} />;
  }

  if (quizCompleted) {
    return (
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold">🎉 Congratulations! Quiz Completed 🎉</h1>
        <button onClick={() => setTopic(null)} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          Take Another Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Quiz on {topic}</h2>
      {questions.map((q, index) => (
        <div key={q._id} className="my-4 p-4 border rounded">
          <p className="font-semibold">{index + 1}. {q.question}</p>
          {q.options.map((option) => (
            <button
              key={option}
              className={`block w-full p-2 mt-2 rounded border ${selectedAnswers[q._id] === option ? "bg-blue-500 text-white" : "bg-gray-100"}`}
              onClick={() => handleAnswerSelect(q._id, option)}
            >
              {option}
            </button>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-green-500 text-white px-6 py-2 mt-4 rounded">
        Submit Answers
      </button>
    </div>
  );
};

export default QuizPage;
