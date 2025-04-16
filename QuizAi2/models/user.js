const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quizHistory: [{
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    correct: { type: Number },
    incorrect:{type:Number},
    topic:String,
    AiReviewBrief:String,
    score:{ type: Number },
    completedAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model("User", UserSchema);
