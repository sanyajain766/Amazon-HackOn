import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import TextInput from "../components/textInput";
import React from "react";
function Login() {
  useEffect(() => {
    var config = {
      method: "get",
      url: "/verify",
      withCredentials: true,
    };
    axios(config)
      .then(function (response) {
        if (response.data.status) {
          Router.push("/");
        }
      })
      .catch(function (error) {});
  }, []);

  let formIsValid = true;
  const [errors, setErrors] = useState({});
  const [loader, setloader] = useState(false);
  const [formData, setFormData] = useState({});

  const handleInput = (e) => {
    e.preventDefault();
    if (formData[e.target.name]) {
      formData[e.target.name] = e.target.value;
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setloader(true);
    axios
      .post("/login", formData)
      .then((response) => {
        if (response.data.error) {
          setErrors(response.data.error);
        } else {
          Router.push("/");
        }
        setloader(false);
      })
      .catch((error) => {
        setloader(false);
      });
  };
  return (
    <div className="w-full flex flex-wrap bg-white">
      {/* Login Section */}
      <div className="w-full md:w-1/2 flex flex-col">
        

        <div></div>
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl font-bold">Welcome.</p>

          <form className="flex flex-col  md:pt-8">
            {errors.main && (
              <span className="text-red-500 text-s text-center italic">
                {errors.main}
              </span>
            )}
            <div className="flex flex-col">
              <TextInput
                width="w-full"
                type="text"
                label="Email"
                value="email"
                placeholder="xxx@gmail.com"
                setValue={handleInput}
                error={errors.email}
              ></TextInput>
            </div>
            <div className="flex flex-col">
              <TextInput
                width="w-full"
                type="password"
                value="password"
                label="Password"
                setValue={handleInput}
                error={errors.password}
              ></TextInput>
            </div>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow text-white bg-black transition ease-in-out duration-150 cursor-pointer rounded-lg"
            >
              {loader && (
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Log In
            </button>
            <div>
              <p className="text-black pt-3 text-center mt-3">
                Don't have an account?{" "}
                <Link href="/register">
                  <a className="text-blue-900 underline font-bold cursor-pointer ">
                    Register here
                  </a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* Image Section */}
      <div className="w-1/2 shadow-2xl hidden md:block">
        <div className="absolute w-1/2 h-full">
          <div className="flex flex-col justify-between text-center">
            <div>
             <img src="https://images.unsplash.com/photo-1659009922627-992ac6d0ecd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8Q0R3dXdYSkFiRXd8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60" /> 
            </div>
          </div>
        </div>
        <div className="object-cover w-full h-screen hidden md:block bg-black"></div>
      </div>
    </div>
  );
}

export default Login;
