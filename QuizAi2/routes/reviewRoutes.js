const express = require("express");
const { getQuizReview, getOverallReview,getAIReview } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/ai-review/:quizId", authMiddleware, getAIReview);
router.get("/quiz/:quizId", authMiddleware, getQuizReview); // Get review for a specific quiz
router.get("/overall", authMiddleware, getOverallReview); // Get overall user performance review

module.exports = router;