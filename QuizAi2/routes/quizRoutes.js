const express = require("express");
const { generateQuiz, getNextQuestions, submitAnswers } = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate-ai-quiz", authMiddleware, generateQuiz);
router.post("/questions", authMiddleware, getNextQuestions);
router.post("/submitAnswers",submitAnswers);
module.exports = router;