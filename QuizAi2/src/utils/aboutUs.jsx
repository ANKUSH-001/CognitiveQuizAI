
import "../utils/animations.css";

const About = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 text-center p-6 fade-in">
        <h1 className="text-5xl font-extrabold text-[#0B0C10] drop-shadow-md slide-up">About Cognitive Quiz</h1>
        <p className="mt-4 text-lg text-black-300 max-w-2xl">
          We aim to revolutionize learning with <span className="text-[#FFD700] font-semibold">AI-driven quizzes</span>  
          that enhance memory retention, improve performance, and reduce cognitive overload.  
          Our platform ensures that every quiz is <span className="text-[#FFD700] font-semibold">personalized, adaptive, and engaging</span> for students.
        </p>
  
        <div className="mt-8 card-hover bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-[#141414]">Why Choose Us?</h2>
          <ul className="mt-4 text-lg text-black-400 space-y-2">
            <li>✅ <span className="text-[#FFD700]">AI-powered personalized</span> quiz generation</li>
            <li>✅ Smart <span className="text-[#FFD700]">cognitive load optimization</span></li>
            <li>✅ <span className="text-[#FFD700]">Interactive performance tracking</span> & reports</li>
            <li>✅ Gamified learning with <span className="text-[#FFD700]">rewards & badges</span></li>
          </ul>
        </div>
  
        <div className="mt-8 card-hover bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-p[]#141414">Our Mission</h2>
          <p className="mt-2 text-black-300 max-w-lg">
            Our mission is to make <span className="text-[#FFD700] font-semibold">learning more efficient</span>  
            by reducing cognitive fatigue and boosting memory retention through AI-driven quizzes.
          </p>
        </div>
      </div>
    );
  };
  
  export default About;
  