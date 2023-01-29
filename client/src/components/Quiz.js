import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Quiz = () => {
  const [question, setQuestion] = useState([]);

  const [checked, setChecked] = useState(false);

  const [ans, setAns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await fetch("http://localhost:5000/questions", {
        method: "get",
      });

      const data = await response.json();
      console.log(data);

      setQuestion(data);
    };
    fetchQuestion();
  }, []);

  const handleCheckAns = (e) => {
    console.log(e.target.id);
    console.log(e.target.name);

    const answers = {
      id: e.target.id,
      selected: e.target.name,
    };

    setAns((prev) => [...prev, answers]);
    console.log(ans);
  };

  const handleSubmitAns = async () => {
    const response = await fetch("http://localhost:5000/result", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: ans,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert(`You Scored ${data.points}`);

      window.location.reload();
      return;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (question.length === 0) {
    return <div className="min-h-screen font-bold text-3xl">Loading...</div>;
  }
  return (
    <div className="min-h-screen flex flex-col items-center relative">
      <div className="text-3xl font-bold italic py-5">TAKE QUIZ</div>
      <div className="text-xl font-bold italic pt-5">
        *Please Select Only 1 option for each question...*
      </div>

      <div className="box md:w-1/2 w-full p-10 flex flex-col items-center ">
        {question.data.length === 0 && (
          <div className="font-bold text-xl">
            Sorry #( No Questions Found...
          </div>
        )}
        {question.data.map((q, i) => (
          <div className="border min-w-full rounded shadow py-5 m-5">
            <div className="font-semibold text-2xl shadow">{`Question ${
              i + 1
            }. ${q.question}`}</div>
            <div className="text-semibold mt-5">
              <div className="options flex flex-col gap-2">
                <span className="flex justify-start gap-5">
                  <span className="font-semibold md:ml-40 ml-8">Option 1:</span>{" "}
                  {q.option1}
                  <input
                    id={q._id}
                    name="1"
                    type="checkbox"
                    onChange={handleCheckAns}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                </span>
                <span className="flex justify-start gap-5">
                  <span className="font-semibold md:ml-40 ml-8">Option 2:</span>{" "}
                  {q.option2}
                  <input
                    id={q._id}
                    name="2"
                    onChange={handleCheckAns}
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                </span>
                <span className="flex justify-start gap-5">
                  <span className="font-semibold md:ml-40 ml-8">Option 3:</span>{" "}
                  {q.option3}
                  <input
                    id={q._id}
                    name="3"
                    onChange={handleCheckAns}
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
        {question.data.length === 0 ? (
          ""
        ) : (
          <button
            className="bg-blue-400 p-3 px-6 rounded"
            onClick={handleSubmitAns}
          >
            Submit
          </button>
        )}
        <div className="text-gray-600">
          ......................................OR.....................................
        </div>
        <Link
          to="/create-quiz"
          className="w-1/2 m-5 bg-blue-400 p-2 rounded font-semibold"
        >
          Create Quiz
        </Link>
        <button
          className="bg-red-500 px-5 p-3 rounded hover:bg-red-400 absolute right-3 top-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Quiz;
