const Review = require("../models/review");
const Quiz = require("../models/quiz");
const Performance = require("../models/performance");
const axios = require("axios");
require("dotenv").config();



exports.getAIReview = async (req, res) => {
  try {
    const { quizId } = req.params;

    if (!quizId) {
      return res.status(400).json({ message: "Quiz ID is required." });
    }

    // ✅ Fetch quiz details
    const quiz = await Quiz.findById(quizId).select("topic difficulty questions createdAt");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    // ✅ Fetch performance details
    const performance = await Performance.findOne({ quizId });
    if (!performance) {
      return res.status(404).json({ message: "Performance data not found for this quiz." });
    }

    // ✅ Format weak topics
    const weakTopics = performance.weakTopics.length > 0 ? performance.weakTopics.join(", ") : "None";
    const avgResponseTime = performance.avgResponseTime ? performance.avgResponseTime.toFixed(2) : "N/A";

    // ✅ AI Review Prompt

    // Average response time: ${avgResponseTime} seconds.
    const prompt = `I completed a quiz on (${quiz.topic}).
    Difficulty: ${quiz.difficulty}.
    Score: ${performance.score}/${performance.totalQuestions}.
    Accuracy: ${performance.accuracy.toFixed(2)}%.
    Weak topics: ${weakTopics}.
    
    Please analyze my performance and suggest ways/tips to improve. give suggestions in short and brief,also give recommendations and remove special signs such as '**' or '#',only provide text and numbers nothing else`;

    // ✅ Get AI-generated feedback
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    const feedback = response.data.choices[0].message.content;

    // ✅ Store review in database
    const newReview = new Review({
      userId: performance.userId,
      quizId,
      score: performance.totalScore,
      totalQuestions: performance.correctAnswers + performance.incorrectAnswers,
      feedback
    });

    await newReview.save();

    // ✅ Return all details in a single response
    res.status(200).json({
      message: "Quiz review retrieved successfully",
      quiz,
      performance,
      feedback
    });

  } catch (error) {
    console.error("Error fetching quiz review:", error.response?.data || error.message);
    res.status(500).json({ message: "Error fetching quiz review", error: error.message || error });
  }
    
  
};


exports.getOverallReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const performances = await Performance.find({ userId });
    console.log("fecthing review");
    if (!performances|| performances.length === 0) {
      return res.status(404).json({ message: "No review data found." });
    }

    const overallStats = performances.reduce((acc, perf) => {
      acc.totalQuizzes += perf.quizzesTaken || 1;
      acc.totalScore += perf.totalScore || 0;
      acc.totalCorrect += perf.correctAnswers || 0;
      acc.totalIncorrect += perf.incorrectAnswers || 0;
      acc.avgAccuracy += perf.accuracy || 0;
      acc.avgResponseTime += perf.avgResponseTime || 0;
      acc.weakTopics = [...new Set([...acc.weakTopics, ...perf.weakTopics])];
      return acc;
    }, { totalQuizzes: 0, totalScore: 0, totalCorrect: 0, totalIncorrect: 0, avgAccuracy: 0, avgResponseTime: 0, weakTopics: [] });

    overallStats.avgAccuracy = performances.length > 0 ? overallStats.avgAccuracy / performances.length : 0;
    overallStats.avgResponseTime = performances.length > 0 ? overallStats.avgResponseTime / performances.length : 0;

    //My average response time per question is ${8} seconds.

    // My average response time per question is ${overallStats.avgResponseTime.toFixed(2)} seconds.\n

    // Construct AI prompt with more performance details
    const prompt = `I have attempted ${overallStats.totalQuizzes} quizzes.\n
    My overall accuracy is ${overallStats.avgAccuracy.toFixed(2)}%.\n
    My weak topics are: ${overallStats.weakTopics.join(", ")}.\n
    
    Please analyze my performance, highlight areas of improvement, and suggest ways to enhance my learning, also give recommendations and remove special signs such as '**' or '#',please remove ### or ** before giving me the final feedback,remove ** from topic headers too,only provide text and numbers nothing else`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 800
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
      }
    );

    res.status(200).json({ feedback: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching overall review:", error.response?.data || error.message);
    res.status(500).json({ message: "Error fetching overall review", error: error.message || error });
  }
};

exports.getQuizReview = async (req, res) => {
  try {
    const { quizId } = req.params;
    const review = await Review.findOne({ quizId, userId: req.user.id });

    if (!review) {
      return res.status(404).json({ message: "Review not found for this quiz." });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz review", error });
  }
};



