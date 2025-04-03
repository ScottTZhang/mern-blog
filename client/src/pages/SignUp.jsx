import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col p-3 max-w-3xl mx-auto md:flex-row md:items-center gap-5">
        {/*left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Ting's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google
          </p>
        </div>

        {/*right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Username">Username</Label>
              <TextInput
                type="text"
                placeholder="Username"
                required={true}
                id="username"
                className="mt-2"
              />
            </div>
            <div className="">
              <Label value="Email">Email</Label>
              <TextInput
                type="text"
                placeholder="name@company"
                required={true}
                id="email"
                className="mt-2"
              />
            </div>
            <div className="">
              <Label value="Password">Password</Label>
              <TextInput
                type="text"
                placeholder="Password"
                required={true}
                id="password"
                className="mt-2"
              />
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span> 
            <Link to="/sign-in" className="text-blue-500">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
