import mongoose from "mongoose";

const { Schema } = mongoose;

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  correct: {
    type: Number,
    required: true,
  },
});

const Quiz = new mongoose.model("Quiz", QuizSchema);
export default Quiz;
