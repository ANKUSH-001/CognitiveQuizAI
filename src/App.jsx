import { BrowserRouter as Router, Route, Routes,Navigate,useLocation  } from "react-router-dom";
import Home from "./utils/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./Dashboard/dashboard";
import Navbar from "./pages/navbar";
import Pricing from "./utils/pricing";
import About from "./utils/aboutUs";
import Features from "./utils/features";
import Logout from "./pages/logout"

import TopicSelection from "./quiz/topicSelection";
import QuizSession from "./quiz/quizSession";
import QuizCompletion from "./quiz/quizCompletion";
import QuizPerformance from "./performance/quizPerformance";
import QuizAIReview from "./review/QuizReview";
import { useAuth } from "./context/authContext";




const ProtectedRoute = ({ children }) => {
  const { user,loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!user) {
    // Redirect to login if user is not authenticated
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (

    
   
   <>
   <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/signup" element={<Signup />} />
       
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/topicSelection"  element={<ProtectedRoute><TopicSelection /></ProtectedRoute>} />
        <Route path="/quizSession"  element={<ProtectedRoute><QuizSession /></ProtectedRoute>} />
        <Route path="/quizCompletion" element={<ProtectedRoute><QuizCompletion /></ProtectedRoute>} />
        <Route path="/quizPerformance/:quizId" element={<ProtectedRoute><QuizPerformance /></ProtectedRoute>} />
        <Route path="/quizAIreview/:quizId" element={<ProtectedRoute><QuizAIReview /></ProtectedRoute>} />

      </Routes>
   </>
      
   
  );
}

export default App;
