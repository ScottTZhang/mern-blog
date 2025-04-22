import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js"; // Import the error handler function
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  //console.log(req.body);
  const { username, email, password } = req.body; //desctructure

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "Please fill all the fields")); // Use the error handler function
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  try {
    await newUser.save().then(() => {
      return res.status(200).json({ message: "User created successfully" });
    });
  } catch (error) {
    //console.log(error);
    //return res.status(500).json({message: error.message});
    next(error); // Pass the error to the error handling middleware
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "Please fill all the fields")); // Use the error handler function
  }

  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      //there is no user with this email
      return next(errorHandler(404, "User not found")); // Use the error handler function
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password")); // Use the error handler function
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: pass, ...rest } = validUser._doc; // Destructure the user object to exclude the password
    //console.log(pass);
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest); // Send the user data as a response, hinding the password
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      // Generate a token for the existing user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const { password, ...rest } = user._doc; // Destructure the user object to exclude the password
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email: email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc; // Destructure the user object to exclude the password
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest); // Send the user data as a response, hinding the password
      //console.log(rest);
    }
  } catch (error) {
    next(error);
  }
};
