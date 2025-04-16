// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const topics = [
//   "Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks",
//   "Software Engineering", "Machine Learning", "Cyber Security", "AI", "Cloud Computing",
//   "Blockchain", "Python Programming", "Java", "C++", "Mathematics"
// ];

// const TopicSelection = () => {
//   const [selectedTopic, setSelectedTopic] = useState("");
//   const [customTopic, setCustomTopic] = useState("");
//   const [darkMode, setDarkMode] = useState(true);
//   const navigate = useNavigate();

//   const startQuiz = () => {
//     const topic = customTopic || selectedTopic;
//     if (!topic) return alert("Please select or enter a topic!");
//     navigate(`/quizSession?topic=${encodeURIComponent(topic)}`);
//   };

//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex flex-col items-center`}>
//       {/* Navbar */}
//       <div className="flex mt-5">
//       <button className="absolute left-2 text-sm bg-green-600 px-4 py-2 rounded hover:bg-green-700"
//       onClick={()=>navigate("/dashboard")}
//       >
//         Back to DashBoard
        
//       </button>
//       <h1 className="text-2xl font-bold mx-auto">📚 Quiz</h1>
//       </div>

        
      

//       {/* Content Section */}
//       <div className="flex flex-col items-center justify-center w-full p-6">
//         <h2 className="text-xl font-bold mb-6">Choose a Quiz Topic of your choice or enter your own topic!!</h2>

//         {/* Topic Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-2xl">
//           {topics.map((topic, index) => (
//             <button
//               key={index}
//               className={`px-4 py-3 rounded-lg text-lg font-medium shadow-md border border-gray-300 dark:border-gray-700 
//                           transition-all duration-300 transform hover:scale-105 
//                           ${selectedTopic === topic 
//                               ? "bg-blue-600 text-white shadow-lg" 
//                               : "bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
//               onClick={() => { setSelectedTopic(topic); setCustomTopic(""); }}
//             >
//               {topic}
//             </button>
//           ))}
//         </div>

//         {/* Custom Topic Input */}
//         <div className="flex flex-col items-center mt-6 w-full max-w-md">
//           <input
//             type="text"
//             className="w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 
//                       dark:bg-gray-800 dark:text-white dark:border-gray-700"
//             placeholder="Or enter a custom topic"
//             value={customTopic}
//             onChange={(e) => { setCustomTopic(e.target.value); setSelectedTopic(""); }}
//           />
//         </div>

//         {/* Start Quiz Button */}
//         <button
//           className={`mt-6 px-6 py-2 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform 
//                       ${selectedTopic || customTopic 
//                           ? "bg-green-500 text-white hover:bg-green-600 hover:scale-105" 
//                           : "bg-gray-400 cursor-not-allowed"}`}
//           onClick={startQuiz}
//           disabled={!selectedTopic && !customTopic}
//         >
//           Start Quiz 🚀
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopicSelection;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuiz } from "../Api/quizApi"; // adjust path if needed
import { useAuth } from "../context/authContext"; // assuming you have this or adjust userId fetching
import Loader from "../components/Loader";
const topics = [
  "Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks",
  "Software Engineering", "Machine Learning", "Cyber Security", "AI", "Cloud Computing",
  "Blockchain", "Python Programming", "Java", "C++", "Mathematics"
];

const TopicSelection = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); // assumes context provides user object
  const userId = user?.id; // update this based on your auth structure
  console.log(user);
  console.log(userId);
  const startQuiz = async () => {
    const topic = customTopic || selectedTopic;
    if (!topic) return alert("Please select or enter a topic!");
    if (!userId) return alert("User not logged in!");

    try {
      setLoading(true);
      await generateQuiz(topic, userId); // 💥 calling backend to generate quiz
      navigate(`/quizSession?topic=${encodeURIComponent(topic)}`);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to start quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} ${loading ? "justify-center" : ""} ${loading ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex flex-col items-center`}>
      {loading ? (
        <Loader size="large" color="green" text="Generating quiz for you..." />
      ) : (
        <>
        <div className="flex mt-5">
        <button className="absolute left-2 text-sm bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold mx-auto">📚 Quiz</h1>
      </div>

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
          disabled={!selectedTopic && !customTopic || loading}
        >
          {loading ? "Generating Quiz..." : "Start Quiz 🚀"}
        </button>
        </div>
        </>
      )}
      </div>

    
  );
};

export default TopicSelection;

