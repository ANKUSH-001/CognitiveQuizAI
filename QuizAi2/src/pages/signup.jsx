import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/api";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0C10] text-white px-6 sm:px-12">
      <div className="w-full max-w-md bg-[#1F2833] p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#66FCF1]">🚀 Join Cognitive Quiz</h1>
        <p className="mt-2 text-center text-gray-300 text-sm sm:text-base">
          "Sharpen your mind with AI-driven quizzes. Challenge yourself, track progress, and excel!"
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="p-3 bg-[#0B0C10] border border-gray-600 rounded text-white focus:border-[#66FCF1] transition"
            value={user.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 bg-[#0B0C10] border border-gray-600 rounded text-white focus:border-[#66FCF1] transition"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 bg-[#0B0C10] border border-gray-600 rounded text-white focus:border-[#66FCF1] transition"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button className="w-full bg-[#66FCF1] text-black py-3 rounded font-semibold hover:bg-[#45A29E] transition">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm sm:text-base">
          Already have an account?{" "}
          <a href="/login" className="text-[#66FCF1] hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
