import Link from "next/link";
import { useState, useEffect } from "react";

import Head from "next/head";
import axios from "axios";
import TextInput from "../components/textInput";
import Router from "next/router";
import React from "react";

export default function Register() {
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
  const [errors, setErrors] = useState({});
  let formIsValid = true;
  const [formData, setFormData] = useState({});
  const [showModal, setshowModal] = useState(false);
  const [loader, setloader] = useState(false);
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
    if (formIsValid) {
      axios
        .post("/register", formData)
        .then((response) => {
          if (response.data.error) {
            setErrors(response.data.error);
          } else {
            setshowModal(true);
          }
          setloader(false);
        })
        .catch((error) => {
          setloader(false);
        });
    }
  };
  return (
    <div className="w-full flex flex-wrap bg-black h-screen">
      <Head>
        <link rel="stylesheet" href="/static/registerAnimation.css" />
      </Head>
      <div className="w-full md:w-1/2 flex flex-col bg-gray-100">
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <form className="flex flex-col pt-0 md:pt-1">
            {errors.main && (
              <span className="text-red-500 text-s text-center italic">
                {errors.main}
              </span>
            )}
            <div className="flex flex-row justify-between md:space-x-4">
              <div className="flex flex-col">
                <TextInput
                  width="w-full"
                  type="text"
                  value="first_name"
                  label="First Name"
                  placeholder=""
                  setValue={handleInput}
                  error={errors.first_name}
                ></TextInput>
              </div>
              <div className="flex flex-col">
                <TextInput
                  width="w-full"
                  type="text"
                  value="last_name"
                  label="Last Name"
                  placeholder=""
                  setValue={handleInput}
                  error={errors.last_name}
                ></TextInput>
              </div>
            </div>

            <div className="flex flex-col">
              <TextInput
                width="w-full"
                type="email"
                value="email"
                label="Email"
                placeholder="your@vitstudent.ac.in"
                setValue={handleInput}
                error={errors.email}
              ></TextInput>
            </div>
            <div className="flex flex-col">
              <TextInput
                width="w-full"
                type="number"
                value="phone_number"
                label="phone number"
                placeholder="8345625438"
                setValue={handleInput}
                error={errors.phone_number}
              ></TextInput>
            </div>
            <div className="flex flex-col">
              <TextInput
                width="w-full"
                type="password"
                value="password"
                label="password"
                placeholder="Enter your Password Here"
                setValue={handleInput}
                error={errors.password}
              ></TextInput>
            </div>
            <div className="flex flex-col">
              <TextInput
                width="w-full"
                type="password"
                value="confirm_password"
                label="Confirm Password"
                placeholder="Enter Confirm Password Here"
                setValue={handleInput}
                error={errors.confirm_password}
              ></TextInput>
            </div>
            <button
              type="submit"
              defaultValue="Register"
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
              Register
            </button>
            <div>
              <p className="text-black pt-2 pb-5 text-center mt-3">
                Already have an account?{" "}
                <Link href="/login">
                  <a className="text-blue-900 underline font-bold">
                    Login here
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
             <img src="https://images.unsplash.com/file-1656361027924-fd935f26c71aimage" /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
