import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://preview.redd.it/instagram-default-user-profile-pic-flip-flopshttps://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png-v0-g983oflfeg4d1.jpg?width=262&format=pjpg&auto=webp&s=c6ec2305199c633fc6d460238d0409f41812fe75",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema); //MongoDB automatically add 's' for "User" to make it "Users"

export default User;
