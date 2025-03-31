import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  //console.log(req.body);
  const {username, email, password} = req.body; //desctructure

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    return res.status(400).json({message: 'Please fill in all fields'});
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
    return res.status(500).json({message: error.message});
  }

}