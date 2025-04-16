const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

//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
