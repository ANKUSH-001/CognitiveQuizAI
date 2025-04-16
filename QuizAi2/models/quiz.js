const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topic: { type: String, required: true },
  
  difficulty: { type: String, required: true }, 
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }], 
      answer: { type: String, required: true }, 
      selectedAnswer:String,
      subTopic: { type: String, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quiz", QuizSchema);
