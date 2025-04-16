const Pricing = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[white] text-center p-6">
        <h1 className="text-4xl font-bold text-black">Pricing Plans</h1>
        <p className="mt-4 text-lg text-black-300 max-w-2xl">
          Unlock advanced features with <span className="text-[#FFD700] font-semibold">premium plans</span>.  
          Choose the best plan that fits your learning needs!
        </p>
  
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Free Plan */}
          <div className="p-6 bg-[#1F2833] rounded-lg shadow-lg border border-gray-600">
            <h2 className="text-2xl font-semibold text-white">Free Plan</h2>
            <p className="mt-2 text-gray-400">Basic quizzes & performance tracking.</p>
            <p className="text-3xl font-bold mt-4 text-[white]">Free</p>
            <button className="mt-4 px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFC107] transition">
              Get Started
            </button>
          </div>
  
          {/* Standard Plan */}
          <div className="p-6 bg-[#1F2833] rounded-lg shadow-lg border border-gray-600">
            <h2 className="text-2xl font-semibold text-white">Standard Plan</h2>
            <p className="mt-2 text-gray-400">AI-powered quizzes & cognitive load optimization.</p>
            <p className="text-3xl font-bold mt-4 text-[white]">$9.99/month</p>
            <button className="mt-4 px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFC107] transition">
              Subscribe
            </button>
          </div>
  
          {/* Premium Plan */}
          <div className="p-6 bg-[#1F2833] rounded-lg shadow-lg border border-gray-600">
            <h2 className="text-2xl font-semibold text-white">Premium Plan</h2>
            <p className="mt-2 text-gray-400">Full AI analysis, reports & personalized study plans.</p>
            <p className="text-3xl font-bold mt-4 text-[white]">$19.99/month</p>
            <button className="mt-4 px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFC107] transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Pricing;
  