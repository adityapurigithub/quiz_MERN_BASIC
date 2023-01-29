import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const QuizQuestion = () => {
  const [questions, setQuestions] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    correct: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuestions({ ...questions, [e.target.name]: e.target.value });
  };
  const handleCreateQuestion = async (e) => {
    e.preventDefault();

    if (Object.keys(questions) === "" || questions.correct === 0) {
      return alert("All Field are required!!!");
    }

    const response = await fetch("http://localhost:5000/createQuestion", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: questions,
      }),
    });
    setQuestions({
      ...questions,
      question: "",
      option1: "",
      option2: "",
      option3: "",
      correct: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="min-h-screen overflow-auto flex flex-col items-center relative">
      <button
        className="bg-red-500 px-5 p-3 rounded hover:bg-red-400 absolute right-3 top-2"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="text-center font-semibold text-2xl py-10 ">
        Create A New Quiz Questions
      </div>
      <form onSubmit={handleCreateQuestion} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              Enter Question
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="question"
              type="text"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Options 1
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              name="option1"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-text"
            >
              Options 2
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              name="option2"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-text"
            >
              Options 3
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              name="option3"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Correct Option is:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              name="correct"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
              min="1"
              max="3"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create Question
          </button>
          <div className="text-gray-600">
            ......................................OR.....................................
          </div>
          <Link
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            to="/quiz"
          >
            TAKE QUIZ
          </Link>
        </div>
      </form>
    </div>
  );
};

export default QuizQuestion;
