import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [newUserData, setnewUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const handelChange = (e) => {
    setnewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      const res = await axios.post(
        "http://localhost:3003/api/auth/singup",
        newUserData
      );

      if (res.status === 200) {
        setErr("Account created successful now login please");
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      } else {
        console.log("Signup failed!");
        console.log("Response from the server:", res.data);
        setErr("Signup failed. Please check your information and try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);

      // Check if the error has a response property
      if (error.response) {
        // Extract and update state with the error for rendering in the UI
        setErr(
          error.response.data.error ||
            "An error occurred during signup. Please try again."
        );
      } else {
        // Handle network errors or other issues
        setErr("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[25vw]"
        onSubmit={handelSubmit}
      >
        {err && <h4 className="bg-red-200 p-3 mb-3">{err}</h4>}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
            value={newUserData.name}
            name="name"
            onChange={handelChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={newUserData.email}
            name="email"
            onChange={handelChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            value={newUserData.password}
            name="password"
            onChange={handelChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
      <div>
        <p>
          Already have account ?{" "}
          <Link className="text-blue-500" to={"/"}>
            LogIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
