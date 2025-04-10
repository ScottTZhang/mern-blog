import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  // Destructure the formData state

  //const [errorMessage, setErrorMessage] = useState(null);
  //const [loading, setLoading] = useState(false);
  // Destructure the errorMessage and loading state. Replaced by Redux state

  const {loading, error: errorMessage} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  // Initialize the dispatch function from Redux
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Update the formData state with the new value
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    });
  }
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent refreshing the page

    //console.log("err: ",errorMessage);
    if (
      !formData.email ||
      !formData.password ||
      formData.email === "" ||
      formData.password === ""
    ) {
      //setLoading(false);
      //return setErrorMessage("Please fill all the fields");
      return dispatch(signInFailure("Please fill all the fields")); // Dispatch the signInFailure action with the error message. Replace the above code
    }
    try {
      //setLoading(true); //when submitting is trying to send data
      //setErrorMessage(null); // Reset error message
      dispatch(signInStart());
      // Dispatch the signInStart action to update the Redux state, to replace the aobve code
      
      const res = await (fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }));
      const data = await res.json();
      
      if (data.success === false) {
        //setLoading(false);
        //setErrorMessage(data.message);
        console.log("data.message: ", data.message);
        dispatch(signInFailure(data.message)); // Dispatch the signInFailure action with the error message. Replace the above code
      }
      
      if (res.ok) {
        //setErrorMessage(null); // Reset error message
        dispatch(signInSuccess(data)); // Dispatch the signInSuccess action with the user data. 
        console.log("data: ", data);
        //Replace the above code
        navigate('/');
      }
    } catch (error) {
      //setErrorMessage(error.message);
      //setLoading(false); // Reset loading state
      dispatch(signInFailure(error.message)); // Dispatch the signInFailure action with the error message. Replace the above code
    } finally {
      //setLoading(false); // Ensure loading is reset in all cases
      dispatch(signInFailure(error.message)); // Reset loading state
    }
  };

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
            This is a demo project. You can sign in with your email and password or with Google
          </p>
        </div>

        {/*right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Email">Email</Label>
              <TextInput
                type="email"
                placeholder="name@company"
                id="email"
                className="mt-2" onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Password">Password</Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                className="mt-2" onChange={handleChange}
              />
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
              type="submit"
              disabled={loading}
            >
              {
                loading ? (
                  <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                  </>
                ): 'Sign In'
              }
            </Button>
            <OAuth />
          </form>
          
          <div className="flex gap-2 mt-5 text-sm">
            <span>Don't have an account?</span> 
            <Link to="/sign-up" className="text-blue-500">Sign up</Link>
          </div>
          {
            errorMessage && (
            <Alert className="mt-5" color='failure'>
              {errorMessage}
            </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}

