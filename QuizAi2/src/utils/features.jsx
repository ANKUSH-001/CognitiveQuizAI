import "../utils/animations.css";

const Features = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 text-center p-6 fade-in">
        <h1 className="text-4xl font-bold text-[#0B0C10]">Key Features of Cognitive Quiz</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          An <span className="text-[#0B0C10] font-semibold">AI-driven quiz platform</span>  
          that dynamically adapts to your learning needs, ensuring efficient cognitive performance and personalized feedback.
        </p>
  
        <div className="grid md:grid-cols-3 gap-8 mt-8 slide-up">
          {/* Feature 1 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-[#0B0C10] card-hover">
            <h2 className="text-2xl font-semibold text-[#0B0C10]">🎯 Adaptive Learning</h2>
            <p className="mt-2 text-gray-700">
              Questions adjust in real-time based on performance, ensuring a personalized challenge level.
            </p>
          </div>
  
          {/* Feature 2 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-[#0B0C10] card-hover">
            <h2 className="text-2xl font-semibold text-[#0B0C10]">📊 Performance Insights</h2>
            <p className="mt-2 text-gray-700">
              Track correct/incorrect answers, weak topics, and performance trends over time.
            </p>
          </div>
  
          {/* Feature 3 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-[#0B0C10] card-hover">
            <h2 className="text-2xl font-semibold text-[#0B0C10]">🧠 Cognitive Load Optimization</h2>
            <p className="mt-2 text-gray-700">
              AI detects mental fatigue and modifies quiz difficulty for better retention.
            </p>
          </div>
  
          {/* Feature 4 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-[#0B0C10] card-hover">
            <h2 className="text-2xl font-semibold text-[#0B0C10]">📌 Topic Customization</h2>
            <p className="mt-2 text-gray-700">
              Select from 15+ predefined subjects or create your own quiz topics.
            </p>
          </div>
  
          {/* Feature 5 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-[#0B0C10] card-hover">
            <h2 className="text-2xl font-semibold text-[#0B0C10]">🔄 Instant Feedback</h2>
            <p className="mt-2 text-gray-700">
              Get real-time feedback after each question to improve faster.
            </p>
          </div>
  
          {/* Feature 6 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-[#0B0C10] card-hover">
            <h2 className="text-2xl font-semibold text-[#0B0C10]">🏆 Gamified Learning</h2>
            <p className="mt-2 text-gray-700">
              Earn badges, points, and unlock new levels based on your performance.
            </p>
          </div>
        </div>
  
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#0B0C10]">🚀 Why Cognitive Quiz?</h2>
          <p className="mt-2 text-gray-700 max-w-lg">
            Cognitive Quiz enhances learning efficiency through AI-driven insights, ensuring  
            students grasp concepts faster and better.
          </p>
        </div>
      </div>
    );
  };
  
  export default Features;
  