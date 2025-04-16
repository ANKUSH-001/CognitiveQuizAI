const AIReview = ({ sampleData }) => {
  const { message, strongestTopics, weakestTopics } = sampleData;

  if (message) {
    return (
      <div className="text-center">
        <p className="text-lg text-gray-300">📊 AI has analyzed your quiz attempts.</p>
        <p className="mt-2 text-red-400 text-base">{message}</p>
      </div>
    );
  }

  const strongest =
    strongestTopics.length > 0
      ? strongestTopics.map((item) => item.topic).join(" & ")
      : "";

  const weakest = weakestTopics.length > 0
    ? weakestTopics.map((item) => item.topic).join(" & ")
    : "Keep practicing across different topics to strengthen your skills.";

  return (
    <div className="text-center">
      <p className="text-lg text-gray-300">📊 AI has analyzed your quiz attempts.</p>
      {strongest && (
        <p className="mt-2 text-[#66FCF1] text-xl font-semibold">
          Your strongest subject{strongestTopics.length > 1 ? "s" : ""}: {strongest} 
        </p>
      )}
      <p className="mt-1 text-gray-300">
        You've made great progress! For areas like {weakest}, just a little more practice will make all the difference. You're on the right track! 🚀
      </p>
    </div>
  );
};

export default AIReview;
