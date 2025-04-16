import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchQuestions, submitAnswers } from "../Api/quizApi";
import Loader from "../components/Loader";

const QuizSession = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const data = await fetchQuestions(user.id); // fetch first batch
        if (data.questions.length === 0) {
          navigate("/perfo");
        } else {
          setQuestions(data.questions);
          setUserAnswers(Array(data.questions.length).fill(""));
        }
      } catch (err) {
        console.error("Error loading questions:", err);
      }
      setLoading(false);
    };

    loadQuestions();
  }, []);

  const handleSelect = (index, selectedOption) => {
    const updated = [...userAnswers];
    updated[index] = selectedOption;
    setUserAnswers(updated);
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      // Submit current answers
      const AnswersPayload={
        userId: user.id,
        answers: userAnswers
      }
      console.log("data sent: ")
      console.log(JSON.stringify(AnswersPayload, null, 2)); // Pretty print

     const response=await submitAnswers(AnswersPayload);
     if(response?.message==="Quiz completed successfully"){
      navigate("/quizCompletion", {
        state: {
          result: response.result,
        },
      });
      return;
     }


      const data = await fetchQuestions(user.id);
      setQuestions(data.questions);
      setUserAnswers(Array(data.questions.length).fill(""));
      
    } catch (err) {
      console.error("Error submitting or fetching next batch:", err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <Loader
          size="large"
          color="green"
          text={
            <div className="text-center">
            <span>Submitting Answers</span>
            <br />
            <span>Fetching next questions for you...</span>
          </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-4 flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-6xl p-6 bg-white rounded-xl shadow-md">
    <h2 className="text-2xl font-bold text-center mb-6 ">Quiz on {topic}</h2>
    <p className="text-center text-gray-600 mb-6">
      There will be total 12 Questions, each in batches of 4 questions
    </p>

    {questions.map((q, index) => (
      <div
        key={q.id || index}
        className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
      >
        <p className="font-semibold text-lg mb-2">
        {index + 1}. {q.question}
        </p>
        <div className="space-y-2">
          {q.options.map((option) => (
            <label
              key={`${q.id}-${option}`}
              className="block text-gray-700 cursor-pointer"
            >
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={userAnswers[index] === option}
                onChange={() => handleSelect(index, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    ))}

    <div className="flex justify-center mt-8">
      <button
        className="bg-green-600 hover:bg-green-800 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-md transition"
        onClick={handleNext}
      >
        Submit
      </button>
    </div>
  </div>
</div>

  );
};

export default QuizSession;
