import { useState } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  "Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks",
  "Software Engineering", "Machine Learning", "Cyber Security", "AI", "Cloud Computing",
  "Blockchain", "Python Programming", "Java", "C++", "Mathematics"
];

const TopicSelection = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const startQuiz = () => {
    const topic = customTopic || selectedTopic;
    if (!topic) return alert("Please select or enter a topic!");
    navigate(`/quiz-session?topic=${encodeURIComponent(topic)}`);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex flex-col items-center`}>
      {/* Navbar */}
      
        <h1 className="text-2xl font-bold mt-5">📚 Quiz </h1>
        
      

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center w-full p-6">
        <h2 className="text-xl font-bold mb-6">Choose a Quiz Topic of your choice or enter your own topic!!</h2>

        {/* Topic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-2xl">
          {topics.map((topic, index) => (
            <button
              key={index}
              className={`px-4 py-3 rounded-lg text-lg font-medium shadow-md border border-gray-300 dark:border-gray-700 
                          transition-all duration-300 transform hover:scale-105 
                          ${selectedTopic === topic 
                              ? "bg-blue-600 text-white shadow-lg" 
                              : "bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              onClick={() => { setSelectedTopic(topic); setCustomTopic(""); }}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Custom Topic Input */}
        <div className="flex flex-col items-center mt-6 w-full max-w-md">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                      dark:bg-gray-800 dark:text-white dark:border-gray-700"
            placeholder="Or enter a custom topic"
            value={customTopic}
            onChange={(e) => { setCustomTopic(e.target.value); setSelectedTopic(""); }}
          />
        </div>

        {/* Start Quiz Button */}
        <button
          className={`mt-6 px-6 py-2 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform 
                      ${selectedTopic || customTopic 
                          ? "bg-green-500 text-white hover:bg-green-600 hover:scale-105" 
                          : "bg-gray-400 cursor-not-allowed"}`}
          onClick={startQuiz}
          disabled={!selectedTopic && !customTopic}
        >
          Start Quiz 🚀
        </button>
      </div>
    </div>
  );
};

export default TopicSelection;
