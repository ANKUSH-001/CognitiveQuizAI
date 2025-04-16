// import { useAuth } from "../context/authContext";
// import { useState,useEffect } from "react";
// import PerformanceChart from "./performanceChart";
// import QuizStats from "./quizStats";
// import AIReview from "./AIReview";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // ✅ Prevent blank screen by showing a loading state
//   if (user === null) {
//     return <div className="text-white text-center mt-10">Loading...</div>;
//   }

//   const [isMobile, setIsMobile] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       if (window.innerWidth < 1024) {
//         setIsMobile(true);
//         setIsSidebarOpen(false); // Hide sidebar on mobile
//       } else {
//         setIsMobile(false);
//         setIsSidebarOpen(true); // Show sidebar on desktop
//       }
//     };

//     checkScreenSize(); // Check on load
//     window.addEventListener("resize", checkScreenSize);
    
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0B0C10] text-white flex">
//       {/* Sidebar (Always open on Desktop, Toggle on Mobile) */}
//       <div
//         className={`fixed lg:relative top-1 left-0 h-full w-[300px] bg-[gray-100] shadow-lg transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 lg:flex`}
//       >
//         {/* Close Button (Only for Mobile) */}
//         {isMobile && (
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             className="absolute top-4 right-4  text-white text-xl"
//           >
//             ✖
//           </button>
//         )}

//         {/* Sidebar Content */}
//         <div className="p-6 mt-10 space-y-6">
//           {/* Quiz Section */}
//           <div 
//         className="p-4 bg-[#0B0C10] rounded-lg shadow-md cursor-pointer hover:bg-[#1F2833] transition duration-200" 
//         onClick={() => navigate("/topicSelection")}
//       >
//         <h2 className="text-lg font-bold text-[#66FCF1]">📝 Take a Quiz</h2>
//         <p className="text-gray-300">Start a new quiz and test your knowledge.</p>
//       </div>

//           {/* Overall Performance */}
//           <div className="p-4 bg-[#0B0C10] rounded-lg shadow-md">
//             <h2 className="text-lg font-bold text-[#66FCF1]">📊 Overall Performance</h2>
//             <p className="text-gray-300">Track your quiz performance over time.</p>
//           </div>

//           {/* AI Review */}
//           <div className="p-4 bg-[#0B0C10] rounded-lg shadow-md">
//             <h2 className="text-lg font-bold text-[#66FCF1]">🤖 AI Review</h2>
//             <p className="text-gray-300">Get AI-based insights on your quiz attempts.</p>
//           </div>

//           {/* Overall AI Review */}
//           <div className="p-4 bg-[#0B0C10] rounded-lg shadow-md">
//             <h2 className="text-lg font-bold text-[#66FCF1]">🔍 Overall AI Review</h2>
//             <p className="text-gray-300">Analyze your strengths and weaknesses.</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content (Dashboard) */}
//       <div className="flex-1 p-6">
//         {/* Toggle Button (Only for Mobile) */}
//         {isMobile && !isSidebarOpen &&(
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="relative top-13 left-0 bg-[#66FCF1] text-black px-3 py-1 bottom-3 rounded-lg font-bold hover:bg-[#45A29E] transition"
//           >
//             ☰
//           </button>
//         )}

        
// <div className="min-h-screen bg-[#0B0C10] text-white p-4">
//   <h1 className="text-2xl font-bold text-[#66FCF1] mb-4 text-center">
//     📊 Your Dashboard
//   </h1>

//   {/* Responsive Grid Layout */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//     {/* Overall Performance Chart */}
//     <div className="bg-[#1F2833] p-4 rounded-lg shadow-lg w-full">
//       <h2 className="text-base font-semibold text-[#66FCF1] mb-2 text-center">
//         Performance Overview
//       </h2>
//       <div className="flex justify-center">
//         <div className="w-full h-40">
//           <PerformanceChart />
//         </div>
//       </div>
//     </div>

//     {/* Quiz Stats: Correct vs. Incorrect */}
//     <div className="bg-[#1F2833] p-4 rounded-lg shadow-lg w-full">
//       <h2 className="text-base font-semibold text-[#66FCF1] mb-2 text-center">
//         Correct vs. Incorrect
//       </h2>
//       <div className="flex justify-center">
//         <div className="w-full h-40">
//           <QuizStats />
//         </div>
//       </div>
//     </div>

//     {/* AI Review */}
//     <div className="bg-[#1F2833] p-4 rounded-lg shadow-lg w-full">
//       <h2 className="text-base font-semibold text-[#66FCF1] mb-2 text-center">
//         AI Review Summary
//       </h2>
//       <div className="flex justify-center">
//         <div className="w-full h-40">
//           <AIReview />
//         </div>
//       </div>
//     </div>
//   </div>
// </div>



//         {/* More content here */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useAuth } from "../context/authContext";
// import { useState, useEffect } from "react";
// import PerformanceChart from "./performanceChart";
// import QuizStats from "./quizStats";
// import AIReview from "./AIReview";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   if (user === null) {
//     return <div className="text-white text-center mt-10">Loading...</div>;
//   }

//   const [isMobile, setIsMobile] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       if (window.innerWidth < 1024) {
//         setIsMobile(true);
//         setIsSidebarOpen(false);
//       } else {
//         setIsMobile(false);
//         setIsSidebarOpen(true);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0B0C10] text-white flex">
//       {/* Sidebar */}
//       <div
//         className={`fixed lg:relative top-1 left-0 h-full w-[300px] bg-gray-900 shadow-lg transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 lg:flex`}
//       >
//         {/* Close Button for Mobile */}
//         {isMobile && (
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             className="absolute top-4 right-4 text-white text-xl"
//           >
//             ✖
//           </button>
//         )}

//         {/* Sidebar Content */}
//         <div className="p-6 mt-10 space-y-6">
//           {/* Take a Quiz */}
//           <div
//             className="p-4 bg-[#0B0C10] rounded-lg shadow-md cursor-pointer hover:bg-[#1F2833] transition duration-200"
//             onClick={() => navigate("/topicSelection")}
//           >
//             <h2 className="text-lg font-bold text-[#66FCF1]">📝 Take a Quiz</h2>
//             <p className="text-gray-300">Start a new quiz and test your knowledge.</p>
//           </div>

//           {/* Performance & AI Sections */}
//           <div className="p-4 bg-[#0B0C10] rounded-lg shadow-md">
//             <h2 className="text-lg font-bold text-[#66FCF1]">📊 Overall Performance</h2>
//             <p className="text-gray-300">Track your quiz performance over time.</p>
//           </div>

//           <div className="p-4 bg-[#0B0C10] rounded-lg shadow-md">
//             <h2 className="text-lg font-bold text-[#66FCF1]">🤖 AI Review</h2>
//             <p className="text-gray-300">Get AI-based insights on your quiz attempts.</p>
//           </div>

//           <div className="p-4 bg-[#0B0C10] rounded-lg shadow-md">
//             <h2 className="text-lg font-bold text-[#66FCF1]">🔍 Overall AI Review</h2>
//             <p className="text-gray-300">Analyze your strengths and weaknesses.</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Dashboard Content */}
//       <div className="flex-1 p-6">
//         {/* Mobile Sidebar Toggle */}
//         {isMobile && !isSidebarOpen && (
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="relative top-13 left-0 bg-[#66FCF1] text-black px-3 py-1 rounded-lg font-bold hover:bg-[#45A29E] transition"
//           >
//             ☰
//           </button>
//         )}

//         {/* Dashboard Content */}
//         <div className="min-h-screen bg-[#0B0C10] text-white p-4">
//           <h1 className="text-2xl font-bold text-[#66FCF1] mb-4 text-center">
//             📊 Your Dashboard
//           </h1>

//           {/* Performance Overview & Quiz Stats (Side by Side) */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Performance Overview */}
//             <div className="bg-[#1F2833] p-4 rounded-lg shadow-lg w-full">
//               <h2 className="text-base font-semibold text-[#66FCF1] mb-2 text-center">
//                 Performance Overview
//               </h2>
//               <div className="w-full h-[250px]">
//                 <PerformanceChart />
//               </div>
//             </div>

//             {/* Quiz Stats */}
//             <div className="bg-[#1F2833] p-4 rounded-lg shadow-lg w-full">
//               <h2 className="text-base font-semibold text-[#66FCF1] mb-2 text-center">
//                 Correct vs. Incorrect
//               </h2>
//               <div className="w-full h-[250px]">
//                 <QuizStats />
//               </div>
//             </div>
//           </div>

//           {/* AI Review (Full Width) */}
//           <div className="bg-[#1F2833] p-4 rounded-lg shadow-lg mt-6 w-full">
//             <h2 className="text-base font-semibold text-[#66FCF1] mb-2 text-center">
//               AI Review Summary
//             </h2>
//             <div className="w-full h-[250px]">
//               <AIReview />
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useAuth } from "../context/authContext";
// import { useState, useEffect } from "react";
// import PerformanceChart from "./performanceChart";
// import QuizStats from "./quizStats";
// import AccuracyChart from "./AccuracyChart";
// import AIReview from "./AIReview";
// import { useNavigate } from "react-router-dom";
// import OverallPerformance from "../performance/overAll";
// import OverallReview from "../review/OverallReview";
// import API from "../Api/api"

// import "../utils/animations.css";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("overview");
//   const [isMobile, setIsMobile] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [performanceData, setPerformanceData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       if (window.innerWidth < 1024) {
//         setIsMobile(true);
//         setIsSidebarOpen(false);
//       } else {
//         setIsMobile(false);
//         setIsSidebarOpen(true);
//       }
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   useEffect(() => {
//     if (!user) {
//       console.log("User not loaded yet.");
//       return;
//     }
  
//     //console.log("Full quiz history:", user.quizHistory);
    

//   useEffect(() => {
//     fetchPerformanceData();
//   }, []);

//   const fetchPerformanceData = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/performance');
//       setPerformanceData(response.data);
//     } catch (error) {
//       console.error('Error fetching performance data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading performance data...</div>;
//   }

//   if (!performanceData) {
//     return <div className="text-center p-6">No performance data available</div>;
//   }

//   console.log(performanceData);

//   const { overallStats, performances } = performanceData;
  
   


//   return (
//     <div className="min-h-screen bg-[#0B0C10] text-white flex ">
//       <div
//         className={`fixed lg:relative top-0 left-0 h-full w-72 bg-gray-900 shadow-xl transform transition-all duration-300 ease-in-out ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 lg:flex z-50`}
//       >
//         {isMobile && (
//           <button
//           onClick={() => setIsSidebarOpen(false)}
//           className="absolute top-4 right-4 text-white text-3xl hover:scale-125 hover:bg-[#45A29E] transition-transform duration-200 ease-in-out px-3 py-1 rounded"
//         >
//           -
//         </button>
//         )}

//         <div className="fixed p-6 mt-10 space-y-6 w-full">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-[#66FCF1]">QuizAI</h1>
//             <p className="text-gray-400 mt-2">Welcome back, {user?.name || "Learner"}!</p>
//           </div>

//           {["overview", "quiz", "performance", "review"].map((section, index) => (
//             <div
//               key={index}
//               className={`p-4 rounded-lg shadow-md cursor-pointer transition duration-200 flex items-center gap-3 text-lg font-semibold ${
//                 activeSection === section ? "bg-[#66FCF1] text-black" : "bg-gray-800 text-[#66FCF1] hover:bg-gray-700"
//               }`}
//               onClick={() => (section === "quiz" ? navigate("/topicSelection") : setActiveSection(section))}
//             >
//               {section === "overview" && "📊 DashBoard"}
//               {section === "quiz" && "📝 Take a Quiz"}
//               {section === "performance" && "📈 Performance"}
//               {section === "review" && "🤖 OverAll AI Review"}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 p-6 overflow-y-auto relative">
//       {activeSection === "overview" && (
//     <div className="fade-in space-y-6">
//       {/* Header Row: Sidebar Toggle + Dashboard Title */}
//       <div className="flex items-center justify-between mb-8">
//         {isMobile && !isSidebarOpen && (
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="z-50 bg-[#66FCF1] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#45A29E] transition"
//           >
//             ☰
//           </button>
//         )}
//         <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#66FCF1] text-center flex-1">
//         {user?.quizHistory?.length > 0 
//           ? "Learning is meditative, Learn more. Take a Quiz!"
//           : "Your Learning Sample Dashboard"}
//         </h1>
//       </div>

//       {/* Description */}
//       <p className="text-gray-300 max-w-2xl mx-auto text-center">
//         {user?.quizHistory?.length > 0 
//           ? "Track your progress, challenge yourself with quizzes, and get personalized AI feedback."
//           : "Welcome to QuizAI! Start your learning journey by taking your first quiz."}
        
//       </p>

//       <p className="text-gray-300 max-w-2xl mx-auto text-center">{
//           user?.quizHistory?.length>0?"Your last 5 quizzes Progress overview ":"You can learn new concepts and track yout process with interactive charts and get insights from AI"
//         }
        
//         </p>

//       {/* Charts */}
//       {/* AI Insights */}
//       <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full md:max-w-[90%] lg:max-w-[80%] mx-auto mt-4">
//         <h2 className="text-xl font-bold text-[#66FCF1] mb-4 ml-5">AI Insights</h2>
//         <AIReview sampleData={topTopics} />
//       </div>
      
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//   <div className="bg-gray-800 p-2 rounded-lg shadow-lg w-full">
//     <h2 className="text-xl font-bold text-[#66FCF1] mb-4 ml-5">Score Overview</h2>
//     <PerformanceChart sampleData={topicScores} />
//   </div>

//   <div className="bg-gray-800 p-2 rounded-lg shadow-lg w-full">
//     <h2 className="text-xl font-bold text-[#66FCF1] mb-4 ml-5">Quiz Statistics</h2>
//     <QuizStats sampleData={!user?.quizHistory} />
//   </div>

//   <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md  sm:col-span-2 lg:col-span-1 mx-auto">
//     <h2 className="text-xl font-bold text-[#66FCF1] mb-4 ml-5">Accuracy Stats</h2>
//     <AccuracyChart sampleData={!user?.quizHistory} />
//   </div>
// </div>


      


      
//     </div>
//   )}
//         {activeSection === "performance" && user?.quizHistory?.length > 0 && <OverallPerformance />}
//         {activeSection === "review" && user?.quizHistory?.length > 0 && <OverallReview />}
//       </div>
//     </div>
//   );
// };

// export default Dashboard; 


import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import ScoreChart from "./ScoreChart";
import QuizStats from "./quizStats";
import AccuracyChart from "./AccuracyChart";
import AIReview from "./AIReview";
import { useNavigate } from "react-router-dom";
import OverallPerformance from "../performance/overAll";
import OverallReview from "../review/OverallReview";
import API from "../Api/api";
import Loader from "../components/Loader"
import "../utils/animations.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsSidebarOpen(false);
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Fetch performance data
  useEffect(() => {
    if (!user) {
      console.log("User not loaded yet.");
      return;
    }
    fetchPerformanceData();
  }, [user]);


  const fetchPerformanceData = async () => {
    setLoading(true);
    try {
      const response = await API.get("/performance");
      if (response?.data) {
        setPerformanceData(response.data);

        
      } else {
        // Set to empty structure if no data is returned
        setPerformanceData({ overallStats: {}, performances: [] });
      }
    } catch (error) {
      //console.error("Error fetching performance data:", error);
      // You can also set empty data here if needed
      setPerformanceData({ overallStats: {}, performances: [] });
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        
      <Loader text="Loading performance data..."/>
    
      </div>
    );
  }

  // console.log(performanceData);

  

  const { overallStats, performances } = performanceData;

  
  const RecentFive = performances
  .sort((a, b) => new Date(b.lastAttempt) - new Date(a.lastAttempt))
  .slice(0, 5);
  console.log("Recent 5 Performances:", RecentFive);

  const RecentScores = RecentFive.map((performance) => ({
    score: performance.totalScore,
    topic: performance.quizId?.topic || "Unknown Topic", // in case quizId is not populated
  }));

  // console.log("RecentScores: ",RecentScores);

  // Assuming performances is an array of performance documents
const quizStat = RecentFive.map((perf) => {
  return {
    correct: perf.correctAnswers,
    incorrect: perf.incorrectAnswers,
    topic: perf.quizId?.topic || "Unknown Topic", // fallback if topic not found
  };
});

// console.log("quizStat: ",quizStat);

const accuracyData = RecentFive.map((perf) => {
  const rawAccuracy = perf.accuracy;
  const roundedAccuracy = Math.ceil(rawAccuracy);
  return {
    accuracy: roundedAccuracy > 100 ? 100 : roundedAccuracy,
    topic: perf.quizId?.topic || "Unknown Topic",
  };
});


const review = (() => {
  if (!performances || performances.length === 0) {
    return {
      message: "Data not available, user has not attempted any quiz, please attempt one.",
      strongestTopics: [],
      weakestTopics: []
    };
  }

  const topicScores = performances.map((item) => ({
    topic: item.quizId?.topic || "Unknown",
    score: item.totalScore || 0
  })).filter(item => item.topic !== "Unknown");

  if (topicScores.length === 0) {
    return {
      message: "Data not available, user has not attempted any quiz, please attempt one.",
      strongestTopics: [],
      weakestTopics: []
    };
  }

  const sorted = [...topicScores].sort((a, b) => b.score - a.score);

  const strongestTopics = sorted.filter(item => item.score > 8).slice(0, 2);
  const weakestTopics = [...sorted]
  .reverse()
  .filter(item => item.score > 0)
  .slice(0, 2);

  return {
    strongestTopics,
    weakestTopics,
    message: null
  };
})();

  

  // console.log("Review:",review);











  // bg-[#0B0C10]

  return (
    <div className="min-h-screen bg-[#0B0C10]  text-white flex">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 h-full w-72 bg-gray-900 shadow-xl transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex z-50`}
      >
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl hover:scale-125 hover:bg-[#45A29E] transition-transform duration-200 ease-in-out px-3 py-1 rounded"
          >
            -
          </button>
        )}

        <div className="fixed p-6 mt-10 space-y-6 w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#66FCF1]">QuizAI</h1>
            <p className="text-gray-400 mt-2">
              Welcome back, {user?.name || "Learner"}!
            </p>
          </div>

          {["overview", "quiz", "performance", "review"].map((section, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md cursor-pointer transition duration-200 flex items-center gap-3 text-lg font-semibold ${
                activeSection === section
                  ? "bg-[#66FCF1] text-black"
                  : "bg-gray-800 text-[#66FCF1] hover:bg-gray-700"
              }`}
              onClick={() =>
                {
                  console.log(`Clicked on: ${section}`);  // Log the section name
                  if (section === "quiz") {
                    navigate("/topicSelection");
                  } else {
                    setActiveSection(section);
                    console.log(`Active section updated: ${section}`); // Log active section change
                  }
                }}
            >
              {section === "overview" && "📊 DashBoard"}
              {section === "quiz" && "📝 Take a Quiz"}
              {section === "performance" && "📈 Performance"}
              {section === "review" && "🤖 OverAll AI Review"}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto relative">
        {activeSection === "overview" && (
          <div className="fade-in space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              {isMobile && !isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="z-50 bg-[#66FCF1] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#45A29E] transition"
                >
                  ☰
                </button>
              )}
              <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#66FCF1] text-center flex-1">
                {user?.quizHistory?.length > 0
                  ? "Learning is meditative, Learn more. Take a Quiz!"
                  : "Your Learning Dashboard"}
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-300 max-w-2xl mx-auto text-center">
              {user?.quizHistory?.length > 0
                ? "Track your progress, challenge yourself with quizzes, and get personalized AI feedback."
                : "Welcome to QuizAI! Start your learning journey by taking your first quiz."}
            </p>

            <p className="text-gray-300 max-w-2xl mx-auto text-center">
              {user?.quizHistory?.length > 0
                ? "Your last 5 quizzes Progress overview"
                : "You can learn new concepts and track your progress with interactive charts and get insights from AI"}
            </p>

            {/* AI Insights */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full md:max-w-[90%] lg:max-w-[80%] mx-auto mt-8">
              <h2 className="text-xl font-bold text-[#66FCF1] mb-4 ml-5">
                AI Insights
              </h2>
              <AIReview  sampleData={review}/>
            </div>


            {/* Charts */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-3">
              <div className="bg-gray-800 p-1 rounded-lg shadow-lg w-full mr-20">
                <h2 className="text-xl font-bold text-[#66FCF1] mb-4 mt-2 ml-5">
                  Score Overview
                </h2>
                <ScoreChart sampleData={RecentScores} />
              </div>

              <div className="bg-gray-800 p-1 rounded-lg shadow-lg w-full">
                <h2 className="text-xl font-bold text-[#66FCF1] mb-4 mt-2 ml-5">
                  Quiz Statistics
                </h2>
                <QuizStats sampleData={quizStat} />
              </div>

              <div className="bg-gray-800 p-1 rounded-lg shadow-lg w-full  ">
                <h2 className="text-xl font-bold text-[#66FCF1] mb-4 mt-2 ml-5">
                  Accuracy Stats
                </h2>
                <AccuracyChart sampleData={accuracyData} />
              </div>
            </div>
          </div>
        )}

        {activeSection === "performance" &&
           <OverallPerformance />}
        {activeSection === "review" &&
          <OverallReview data={overallStats}/>}
      </div>
    </div>
  );
};

export default Dashboard;





