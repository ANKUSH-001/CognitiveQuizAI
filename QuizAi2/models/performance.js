const mongoose = require("mongoose");


const PerformanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Foreign key reference
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true }, // ✅ Added quizId to track performance per quiz
  quizzesTaken: { type: Number, default: 1 },
  totalScore: { type: Number, required: true },
  correctAnswers: { type: Number, required: true }, // ✅ Tracks correct answers
  incorrectAnswers: { type: Number, required: true }, // ✅ Tracks incorrect answers
  accuracy: { type: Number, default: 0 },
  weakTopics: { type: [String], default: [] },
  avgResponseTime: { type: Number, default: 0 }, // in seconds
  lastAttempt: { type: Date, default: Date.now },
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }]
});

PerformanceSchema.pre("save", function (next) {
  this.quizzesTaken = this.quizzes.length; // Set quizzesTaken as quizzes count
  next();
});

module.exports = mongoose.model("Performance", PerformanceSchema);
