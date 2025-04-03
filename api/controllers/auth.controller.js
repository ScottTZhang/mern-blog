import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js'; // Import the error handler function

export const signup = async (req, res, next) => {
  //console.log(req.body);
  const {username, email, password} = req.body; //desctructure

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    next(errorHandler(400, 'Please fill all the fields')); // Use the error handler function
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword
  });

  try {
    await newUser.save().then(() => {
      return res.status(200).json({message: 'User created successfully'});
    });
  } catch (error) {
    //console.log(error);
    //return res.status(500).json({message: error.message});
    next(error); // Pass the error to the error handling middleware
  }

}