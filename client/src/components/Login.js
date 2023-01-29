import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please Fill All the fields...");
      return;
    }

    const response = await fetch("http://localhost:5000/register", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: form,
      }),
    });

    const data = await response.json();
    console.log(data);

    console.log(response);
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      alert("Please Login Now!!!");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Please Fill All the fields...");
      return;
    }

    const response = await fetch("http://localhost:5000/sign-in", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: form,
      }),
    });

    const data = await response.json();

    console.log(data);
    console.log(response);
    if (response.ok) {
      if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      navigate("/quiz");
    }
  };
  return (
    <div className="login">
      <section class="h-screen">
        <div class="px-6 h-full text-gray-800">
          <span className="text-2xl font-bold pt-10">Signup or Login</span>
          <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="w-full"
                alt="image"
              />
            </div>
            <div class="xl:ml-20 w-10/12 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div class="mb-6">
                  <input
                    type="email"
                    name="email"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    onChange={handleInputChange}
                  />
                </div>

                <div class="mb-6">
                  <input
                    type="password"
                    name="password"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    onChange={handleInputChange}
                  />
                </div>

                <div class="flex justify-between text-center lg:text-left">
                  <button
                    type="submit"
                    class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                  <button
                    type="submit"
                    class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={handleSignIn}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
