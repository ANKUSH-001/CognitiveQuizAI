import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import PerformanceChart from "./performanceChart";
import QuizStats from "./quizStats";
import AIReview from "./AIReview";
import { useNavigate } from "react-router-dom";
import Performance from "../components/Performance";
import OverallPerformance from "../performance/overAll";
import QuizPerformance from "../performance/quizPerformance";
import OverallReview from "../review/OverallReview";
import QuizReview from "../review/QuizReview";
import Quiz from "../components/quiz";
import "../styles/animations.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  if (user === null) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-1 left-0 h-full w-[300px] bg-[#1F2833] shadow-lg transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex z-50`}
      >
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ✖
          </button>
        )}

        <div className="p-6 mt-10 space-y-6 w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#66FCF1] mb-2">QuizAI</h1>
            <p className="text-gray-400">Welcome back, {user.name || "Learner"}!</p>
          </div>

          <div 
            className={`p-4 rounded-lg shadow-md cursor-pointer hover:bg-[#2B3B4E] transition duration-200 ${activeSection === "overview" ? "bg-[#2B3B4E]" : "bg-[#1F2833]"}`}
            onClick={() => setActiveSection("overview")}
          >
            <h2 className="text-lg font-bold text-[#66FCF1]">📊 Overview</h2>
            <p className="text-gray-300">Your learning journey at a glance</p>
          </div>

          <div 
            className={`p-4 rounded-lg shadow-md cursor-pointer hover:bg-[#2B3B4E] transition duration-200 ${activeSection === "quiz" ? "bg-[#2B3B4E]" : "bg-[#1F2833]"}`}
            onClick={() => navigate("/topicSelection")}
          >
            <h2 className="text-lg font-bold text-[#66FCF1]">📝 Take a Quiz</h2>
            <p className="text-gray-300">Challenge yourself with new questions</p>
          </div>

          <div 
            className={`p-4 rounded-lg shadow-md cursor-pointer hover:bg-[#2B3B4E] transition duration-200 ${activeSection === "performance" ? "bg-[#2B3B4E]" : "bg-[#1F2833]"}`}
            onClick={() => setActiveSection("performance")}
          >
            <h2 className="text-lg font-bold text-[#66FCF1]">📈 Performance</h2>
            <p className="text-gray-300">Track your progress over time</p>
          </div>

          <div 
            className={`p-4 rounded-lg shadow-md cursor-pointer hover:bg-[#2B3B4E] transition duration-200 ${activeSection === "review" ? "bg-[#2B3B4E]" : "bg-[#1F2833]"}`}
            onClick={() => setActiveSection("review")}
          >
            <h2 className="text-lg font-bold text-[#66FCF1]">🤖 AI Review</h2>
            <p className="text-gray-300">Get personalized AI feedback</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Mobile Toggle Button */}
        {isMobile && !isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 z-50 bg-[#66FCF1] text-black px-3 py-1 rounded-lg font-bold hover:bg-[#45A29E] transition"
          >
            ☰
          </button>
        )}

        {/* Dynamic Content Based on Active Section */}
        {activeSection === "overview" && (
          <div className="space-y-6 fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#66FCF1] mb-4">Your Learning Dashboard</h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {user.quizHistory?.length > 0 
                  ? "Track your progress, challenge yourself with quizzes, and get personalized AI feedback to enhance your learning journey."
                  : "Welcome to QuizAI! Start your learning journey by taking your first quiz and track your progress here."}
              </p>
            </div>

            {user.quizHistory?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#1F2833] p-6 rounded-lg shadow-lg card-hover">
                  <h2 className="text-xl font-bold text-[#66FCF1] mb-4">Performance Overview</h2>
                  <PerformanceChart />
                </div>

                <div className="bg-[#1F2833] p-6 rounded-lg shadow-lg card-hover">
                  <h2 className="text-xl font-bold text-[#66FCF1] mb-4">Quiz Statistics</h2>
                  <QuizStats />
                </div>

                <div className="bg-[#1F2833] p-6 rounded-lg shadow-lg card-hover">
                  <h2 className="text-xl font-bold text-[#66FCF1] mb-4">AI Insights</h2>
                  <AIReview />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#1F2833] p-6 rounded-lg shadow-lg card-hover">
                  <h2 className="text-xl font-bold text-[#66FCF1] mb-4">Start Your Journey</h2>
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-gray-300 mb-4">Take your first quiz to start tracking your performance</p>
                    <button 
                      onClick={() => navigate('/topicSelection')}
                      className="bg-[#66FCF1] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#45A29E] transition"
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>

                <div className="bg-[#1F2833] p-6 rounded-lg shadow-lg card-hover">
                  <h2 className="text-xl font-bold text-[#66FCF1] mb-4">Track Progress</h2>
                  <div className="text-center">
                    <div className="text-6xl mb-4">📈</div>
                    <p className="text-gray-300 mb-4">Monitor your learning journey with detailed statistics</p>
                    <div className="text-sm text-gray-400 italic">Complete your first quiz to unlock statistics</div>
                  </div>
                </div>

                <div className="bg-[#1F2833] p-6 rounded-lg shadow-lg card-hover">
                  <h2 className="text-xl font-bold text-[#66FCF1] mb-4">AI-Powered Insights</h2>
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <p className="text-gray-300 mb-4">Get personalized feedback and recommendations</p>
                    <div className="text-sm text-gray-400 italic">Complete your first quiz to unlock AI insights</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === "performance" && (
          <div className="fade-in">
            {user.quizHistory?.length > 0 ? (
              <OverallPerformance />
            ) : (
              <div className="text-center p-8">
                <div className="text-6xl mb-6">📊</div>
                <h2 className="text-2xl font-bold text-[#66FCF1] mb-4">No Performance Data Yet</h2>
                <p className="text-gray-300 mb-6">Take your first quiz to start tracking your performance</p>
                <button 
                  onClick={() => navigate('/topicSelection')}
                  className="bg-[#66FCF1] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#45A29E] transition"
                >
                  Start Your First Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {activeSection === "review" && (
          <div className="space-y-6 fade-in">
            {user.quizHistory?.length > 0 ? (
              <OverallReview />
            ) : (
              <div className="text-center p-8">
                <div className="text-6xl mb-6">🎓</div>
                <h2 className="text-2xl font-bold text-[#66FCF1] mb-4">No Reviews Available</h2>
                <p className="text-gray-300 mb-6">Complete your first quiz to get personalized AI feedback</p>
                <button 
                  onClick={() => navigate('/topicSelection')}
                  className="bg-[#66FCF1] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#45A29E] transition"
                >
                  Take Your First Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
