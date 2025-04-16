const express = require("express");
const { updatePerformance, getUserPerformance, getQuizPerformance } = require("../controllers/performanceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/update", authMiddleware, updatePerformance); // Store performance
router.get("/", authMiddleware, getUserPerformance);
router.get("/:quizId", authMiddleware, getQuizPerformance);
 // AI-based feedback

module.exports = router;
