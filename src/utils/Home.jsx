import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-200 text-center px-6">
      <h1 className="text-5xl font-extrabold text-[#0B0C10] drop-shadow-md">🚀 Welcome to Cognitive Quiz</h1>

      <p className="mt-4 text-lg sm:text-xl text-gray-800 max-w-2xl loading-relaxed">
        An AI-powered adaptive learning platform that enhances your cognitive skills.  
        Choose from various subjects or create your own custom quiz!
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
      <Link
  to="/signup"
  className="px-6 py-3 bg-[#FF6B6B] text-white text-lg rounded-lg shadow-lg hover:bg-[#E63946] transition"
>
  Get Started
</Link>

<Link
  to="/pricing"
  className="px-6 py-3 border-2 border-[#1E90FF] text-[#0B0C10] text-lg rounded-lg shadow-lg hover:bg-[#1E90FF] hover:text-black transition"
>
  View Pricing
</Link>

      </div>

      {/* <div className="mt-12 flex justify-center">
        <img
          src="/assets/quiz-illustration.svg"
          alt="Cognitive Quiz Illustration"
          className="w-full max-w-lg sm:max-w-xl drop-shadow-lg"
        />
      </div> */}
    </div>
  );
};

export default Home;
