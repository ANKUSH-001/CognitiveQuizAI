const axios = require("axios");
const Quiz = require("../models/quiz");
const Performance = require("../models/performance");
const User = require("../models/user");
require("dotenv").config();

const userQuizSessions = {}; // Store quiz progress per user
let c=0;
exports.generateQuiz = async (req, res) => {
  try {
    const { topic, userId } = req.body;
    const performance = await Performance.findOne({ userId });
    let difficulty = "Easy";

    if (performance) {
      if (performance.accuracy > 80) difficulty = "Hard";
      else if (performance.accuracy > 50) difficulty = "Medium";
    }

    userQuizSessions[userId] = {
      questions: [],
      currentIndex: 0,
      difficulty,
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalScore:0, // ✅ Track incorrect answers
      topic,
      weakTopics: {},
      quizId:""// ✅ Store weak topics
    };
    
    //console.log("Connecting to OpenAI API...");
    
    const quiz = await generateNextQuestions(userId, topic);
    userQuizSessions[userId].questions = quiz;
    console.log(quiz._id)
    userQuizSessions[userId].quizId=quiz._id;
    // Update user's quizHistory
    
    
    console.log(`Final stored questions for ${userId}:`, userQuizSessions[userId].questions);
    //console.log("Successfully connected to OpenAI API and generated initial questions.");
    
    res.status(200).json({ message: "Quiz initialized. Call /next-question to proceed." });
  } catch (error) {
    res.status(500).json({ message: "Error generating AI quiz", error });
  }
};


async function generateNextQuestions(userId, category) {
  const session = userQuizSessions[userId];
  const generated = [];

  for (let i = 0; i < 4; i++) {
    try {
      console.log(`Requesting question ${session.questions.length + 1} from OpenAI for category ${category}...`);

      // const response = await axios.post(
      //   "https://api.openai.com/v1/chat/completions",
      //   {
      //     model: "gpt-4o-mini",
      //     messages: [
      //       {
      //         role: "user",
      //         content: `Generate a ${session.difficulty} level multiple-choice question from the category ${category}.
      //           Assign a relevant topic within this category yourself.
      //           Provide exactly 4 options and the correct answer.
      //           **Return ONLY a valid JSON object** without markdown formatting.
      //           Ensure it is in this format :
      //           {
      //             "question": "your question here",
      //             "options": ["option1", "option2", "option3", "option4"],
      //             "answer": "correct answer",
      //             "category": "${category}",  
      //             "subTopic": "(AI-assigned topic)",  
      //             "difficulty": "${session.difficulty}"
      //           }`
      //       }
      //     ],
      //     temperature: 0.7,
      //     max_tokens: 200
      //   },
      //   { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
      // );
      const previousQuestions = session.questions.slice(-10).map(q => q.question).join("\n");
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: `
You're an AI that creates diverse multiple-choice questions.

Before generating the question, **define** 3 subtopics related to the category "${category}", but ensure these subtopics vary based on the difficulty level ("${session.difficulty}"):

- If the difficulty is "Easy", choose more basic and foundational subtopics.
- If the difficulty is "Medium", select moderately challenging subtopics.
- If the difficulty is "Hard", select more advanced or specialized subtopics.

For example:
- If the category is "Algebra" and the difficulty is "Easy", you could define subtopics like:
  - Basic Operations
  - Simple Equations
  - Order of Operations
  

- If the difficulty is "Medium", you might define:
  - Linear Equations
  - Polynomials
  - Solving Inequalities
  

- If the difficulty is "Hard", you might define:
  - Advanced Algebraic Expressions
  - Systems of Equations
  - Complex Polynomials
  

After defining the subtopics for the given difficulty level, choose one subtopic from the list to create a question.

Instructions:
- Use only the predefined subtopics based on the difficulty level to generate the question.
- Reword the question each time to ensure it is unique.
- Include one correct answer and three distractors.
- Ensure that the difficulty matches "${session.difficulty}".
- Ensure to not repeat "${previousQuestions}",
- Return ONLY valid JSON in this format:

{
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "answer": "...",
  "category": "${category}",
  "subTopic": "one of the predefined sub-topics based on difficulty",
  "difficulty": "${session.difficulty}"
}
`

            }
          ],
          temperature: 0.9,
          max_tokens: 350
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
          }
        }
      );
      


      let textResponse = response.data.choices[0].message.content.trim();
      if (textResponse.startsWith("```json")) {
        textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
      }

      const parsed = JSON.parse(textResponse);
      if (parsed.question &&parsed.answer && parsed.options &&parsed.category && parsed.subTopic &&parsed.difficulty) {
        console.error("Invalid question format received:", parsed);
        generated.push(parsed);
      }

      // session.questions.push(parsedQuestion);
      // console.log(`Question ${session.questions.length} stored from subTopic ${parsedQuestion.subTopic}:`, parsedQuestion);
    } catch (error) {
      console.error("Error fetching question from OpenAI:", error.response?.data || error.message);
    }
  }

  return generated;
}

exports.getNextQuestions = async (req, res) => {
  try {
    const { userId } = req.body;
    const session = userQuizSessions[userId];

    if (!session) {
      return res.status(400).json({ message: "No active quiz session found. Please start a new quiz." });
    }

    

    const questionsBatch = session.questions.slice(session.currentIndex, session.currentIndex + 4);

    if (questionsBatch.some(q => !q || !q.subTopic)) {
      console.error("Error: One or more questions missing subTopic", questionsBatch);
      return res.status(500).json({ message: "Invalid question format, subTopic missing." });
    }

    res.status(200).json({ questions: questionsBatch });
  } catch (error) {
    console.error("Error fetching next question:", error);
    res.status(500).json({ message: "Error fetching next question", error: error.message || error });
  }
};


exports.submitAnswers = async (req, res) => {
  try {
    const { userId, answers } = req.body;
    console.log("📥 Backend received:", { userId, answers });
    const session = userQuizSessions[userId];

    if (!session) {
      return res.status(400).json({ message: "No active quiz session found. Please start a new quiz." });
    }

    

if (!Array.isArray(answers)) {
  return res.status(400).json({ message: "Invalid answers format." });
}

    answers.forEach((selectedAnswer, i) => {
      const index=session.currentIndex+i;
      const currentQuestion = session.questions[index];
    
      if (!currentQuestion || !currentQuestion.subTopic) {
        console.error("Error: Missing subTopic in question", currentQuestion);
        return res.status(500).json({ message: "Invalid question format, subTopic missing." });
      }

      if (selectedAnswer == null) return;
      // Save user's selected answer for record
      currentQuestion.selectedAnswer = selectedAnswer;
    
      const subTopic = currentQuestion.subTopic;
      const isCorrect =
        selectedAnswer?.trim().toLowerCase() === currentQuestion.answer?.trim().toLowerCase();
    
      if (isCorrect) {
        session.correctAnswers = (session.correctAnswers || 0) + 1;
        session.totalScore = (session.totalScore || 0) + 1;
      } else {
        session.incorrectAnswers = (session.incorrectAnswers || 0) + 1;
        session.weakSubTopics = session.weakSubTopics || {};
        session.weakSubTopics[subTopic] = (session.weakSubTopics[subTopic] || 0) + 1;
      }
    });
    

    session.currentIndex += answers.length;

    if (session.currentIndex >= 12) {
      console.log("Quiz completed, saving quiz...");

      const newQuiz = new Quiz({
        userId,
        topic: session.topic,
        difficulty: session.difficulty,
        questions: session.questions.map(q => ({
          question: q.question,
          options: q.options,
          answer: q.answer,
          subTopic: q.subTopic,
          selectedAnswer: q.selectedAnswer || null
        })),
        createdAt: new Date(),
      });

      await newQuiz.save();

      const accuracy = (session.correctAnswers / 12) * 100;

      const weakSubTopicsList = Object.entries(session.weakSubTopics || {})
        .filter(([_, count]) => count >= 2)
        .map(([subTopic]) => subTopic);

      const newPerformance = new Performance({
        userId,
        quizId: newQuiz._id,
        quizzesTaken: 1,
        totalScore: session.totalScore,
        correctAnswers: session.correctAnswers,
        incorrectAnswers: session.incorrectAnswers,
        accuracy,
        weakTopics: weakSubTopicsList,
        responseTimes: session.responseTimes || [],
        lastAttempt: new Date(),
      });

      await newPerformance.save();

      const user = await User.findById(userId);
      if (user) {
        user.quizHistory.push({
          quiz: newQuiz._id,
          correct: session.correctAnswers,
          incorrect: session.incorrectAnswers,
          topic:session.topic,
          completedAt: new Date()
        });
        await user.save();
      }
    
      // Optionally delete session
      
    
      res.status(200).json({
        message: "Quiz completed successfully",
        result: {
          quizId:newQuiz._id,
          correctAnswers: session.correctAnswers,
          incorrectAnswers: session.incorrectAnswers,
          weakTopics: weakSubTopicsList,
          score: session.totalScore,
          accuracy:(session.correctAnswers / 12) * 100,
        }
      });


      delete userQuizSessions[userId];
      return;
      
    }

   
     
    
      // Save performance data logic here if not already done
    
      
     
    


    
    // Generate next 4 questions if needed
    if (session.currentIndex % 4 === 0 && session.questions.length < 12) {
      console.log("Fetching next batch of 4 questions...");
      const newQuestions = await generateNextQuestions(userId, session.questions[0].category);

      if (newQuestions.length > 0) {
        session.questions.push(...newQuestions);
        // Save questions in DB (optional, depending on final quiz save)
        await Quiz.updateOne(
          { userId },
          { $push: { questions: { $each: newQuestions } } },
          { upsert: true }
        );
      }
    }

    res.status(200).json({ message: "Submitting Answers" });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ message: "Error submitting answers", error: error.message || error });
  }
};

