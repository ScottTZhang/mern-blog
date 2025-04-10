import { Button } from 'flowbite-react'
import {  AiFillGoogleCircle } from 'react-icons/ai'
import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import {app} from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'});
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data)); // Dispatch the signInSuccess action with the user data
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      // Handle error here
    }
    
  }
  return (
    <Button onClick={handleGoogleClick} type='button' className="bg-gradient-to-br from-pink-500 to-orange-400 text-white hover:bg-gradient-to-bl focus:ring-pink-200 dark:focus:ring-pink-800">
        <AiFillGoogleCircle className='mr-2 w-6 h-6' />
        Continue with Google
      </Button>
  )
}
