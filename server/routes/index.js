import express, { response } from "express";
import User from "../models/user.js";
import Quiz from "../models/quiz.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();

const createToken = (_id) => {
  //sign({_payload_},_SECERET_KEY_,{_options_})
  return jwt.sign({ _id: _id }, process.env.SECERET, { expiresIn: "2d" });
};

router.get("/", (req, res) => {
  res.send("hi Node");
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body.data;
  const userExist = await User.findOne({ email });

  if (userExist) {
    console.log("User Already Exist");
    return;
  }
  if (!email || !password) {
    return res.status(400).json({
      msg: "YOU MUST FILL ALL THE FEILDS",
    });
  }

  const user = new User({
    email,
    password,
  });
  await user.save();

  const token = createToken(user._id);

  // console.log(user);

  // sending back in response a MessageChannel,user object and the generated token to client
  res.status(200).json({
    msg: "userCreated Successfully",
    user: user.email,
    token,
  });
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body.data;

  if (!email || !password) {
    console.warn("Please fill all the fields!!!");
    return;
  }

  const userExist = await User.findOne({ email });

  if (!userExist) {
    console.warn("Incorrect EMAIL");
    return;
  }
  // bcrypt compare->comparing hashed password and login pass here////////
  const passMatch = await bcrypt.compare(password, userExist.password);

  if (!passMatch) {
    console.warn("Pass doesnot match");
    return;
  }
  const token = createToken(userExist._id);

  return res.status(200).json({
    msg: "Logged In Successfully!!!",
    user: userExist.email,
    token,
  });
});

router.post("/createQuestion", async (req, res) => {
  const questions = req.body.data;
  const quiz = new Quiz(questions);

  await quiz.save();
  console.log(quiz);
});

router.get("/questions", async (req, res) => {
  const questions = await Quiz.find({});

  console.log(questions);
  res.status(200).json({
    data: questions,
  });
});

router.post("/result", async (req, res) => {
  console.log(req.body.data);
  const ans = req.body.data;

  const quiz = await Quiz.find({});

  let points = 0;

  quiz.map((q) => {
    ans.map((a) => {
      if (q.id == a.id) {
        if (q.correct == a.selected) {
          points += 1;
        }
      }
    });
  });

  console.log(points);

  res.status(200).json({
    points,
  });
});

export default router;
