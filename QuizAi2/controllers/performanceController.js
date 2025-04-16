const Performance = require("../models/performance");
const Quiz = require("../models/quiz");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.updatePerformance = async (req, res) => {
  try {
    const { userId, quizId, score, totalQuestions, correctAnswers, incorrectAnswers, weakTopics, responseTimes } = req.body;

    if (!userId || !quizId || score === undefined || !totalQuestions || !correctAnswers || !incorrectAnswers || !responseTimes || !Array.isArray(responseTimes)) {
      return res.status(400).json({ message: "Missing required fields or invalid data format." });
    }

    console.log(`Updating performance for user: ${userId} for quiz: ${quizId}`);

    const accuracy = (correctAnswers / totalQuestions) * 100;
    const avgResponseTime = responseTimes.length > 0 
      ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) 
      : 0;
      let performance = await Performance.findOne({ userId, quizId });

      if (!performance) {
        performance = new Performance({ 
          userId, 
          quizId, 
          quizzesTaken: 1, // ✅ Ensure quizzesTaken starts at 1 for each quiz
          totalScore: score, 
          correctAnswers,
          incorrectAnswers,
          accuracy, 
          weakTopics, 
          avgResponseTime, 
          lastAttempt: new Date()
        });
      } else {
        performance.quizzesTaken += 1; // ✅ Increment quizzesTaken
        performance.totalScore += score;
        performance.correctAnswers += correctAnswers;
        performance.incorrectAnswers += incorrectAnswers;
        performance.accuracy = (performance.correctAnswers / (performance.quizzesTaken * totalQuestions)) * 100;
        performance.weakTopics = [...new Set([...performance.weakTopics, ...weakTopics])];
        performance.avgResponseTime = (performance.avgResponseTime * (performance.quizzesTaken - 1) + avgResponseTime) / performance.quizzesTaken; // ✅ Correct avgResponseTime calculation
        performance.lastAttempt = new Date();
      }

    await performance.save();

    // Update user's quiz history with the new score
    const user = await User.findById(userId);
    if (user) {
      const quizHistoryEntry = user.quizHistory.find(entry => entry.quiz.toString() === quizId);
      if (quizHistoryEntry) {
        quizHistoryEntry.score = score;
        quizHistoryEntry.completedAt = new Date();
        await user.save();
      }
    }
    res.status(200).json({ message: "Performance updated successfully", performance });
  } catch (error) {
    console.error("Error updating performance:", error);
    res.status(500).json({ message: "Error updating performance", error: error.message || error });
  }
};




exports.getUserPerformance = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    console.log(`Fetching overall performance for user: ${userId}`);

    const performances = await Performance.find({ userId }).populate("quizId", "category topic difficulty questions createdAt");

    if (!performances||performances.length===0) {
      console.log("no performance data");
      return res.status(404).json({ message: "No performance data found"});
    }

    const overallStats = performances.reduce((acc, perf) => {
      acc.totalQuizzes += perf.quizzesTaken || 1; // ✅ Ensure quizzesTaken is at least 1
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

    res.status(200).json({ 
      message: "Overall performance retrieved successfully", 
      overallStats, 
      performances 
    });
  } catch (error) {
    console.error("Error fetching overall performance:", error);
    res.status(500).json({ message: "Error fetching overall performance", error: error.message || error });
  }
};





exports.getQuizPerformance = async (req, res) => {
  try {
    let { quizId } = req.params;

    if (!quizId) {
      return res.status(400).json({ message: "Quiz ID is required" });
    }

    console.log(`Fetching performance for quiz: ${quizId}`);

    // ✅ Convert quizId to ObjectId
    quizId = new mongoose.Types.ObjectId(quizId);

    // ✅ Find the quiz directly from the Quiz schema
    const quizDetails = await Quiz.findOne({ _id: quizId }).select("category topic difficulty questions createdAt");

    if (!quizDetails) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    // ✅ Fetch performance data associated with the user who attempted this quiz
    const performance = await Performance.findOne({ quizId: quizId });

    if (!performance) {
      return res.status(404).json({ message: "No performance data found for this quiz." });
    }

    // ✅ Format response with quiz details
    const quizPerformance = {
      userId: performance.userId,
      quizId: quizId.toString(),
      
      score: performance.totalScore,
      correctAnswers: performance.correctAnswers, // ✅ Added correct answers
      incorrectAnswers: performance.incorrectAnswers, // ✅ Added incorrect answers
      accuracy: performance.accuracy,
      weakTopics: performance.weakTopics,
      avgResponseTime: performance.avgResponseTime,
      lastAttempt: performance.lastAttempt,
      quizDetails
    };

    res.status(200).json({ message: "Quiz performance retrieved successfully", quizPerformance });
  } catch (error) {
    console.error("Error fetching quiz performance:", error);
    res.status(500).json({ message: "Error fetching quiz performance", error: error.message || error });
  }
};



