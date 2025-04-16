const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const performanceRoutes=require("./routes/performanceRoutes")
const reviewRoutes=require("./routes/reviewRoutes")

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/performance",performanceRoutes);
app.use("/api/review",reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
