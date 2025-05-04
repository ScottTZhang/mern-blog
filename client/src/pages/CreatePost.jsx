import { Alert, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import { Button } from "flowbite-react";
import ReactQuill from "react-quill-new";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase"; // Import the firebase app
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Import the styles for the progress bar

export default function CreatePost() {
  const [file, setFile] = useState(null); //for image upload
  const [imageUploadProgress, setImageUploadProgress] = useState(null); //for image upload progress
  const [imageUploadError, setImageUploadError] = useState(null); //for image upload error

  const [formDate, setFormData] = useState({});
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select a file");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "_" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          setImageUploadError(error.message);
          setImageUploadProgress(null);
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formDate, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          ></TextInput>
          <Select>
            <option value="uncategorized">Select a catagory</option>
            <option value="javascript">JavaCcript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
            size="sm"
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-8 h-8">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageUploadError && (
          <Alert color="failure">
            {imageUploadError}
          </Alert>
        )}
        {formDate.image && (
          <img
            src={formDate.image}
            alt="Uploaded"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write the post"
          className="h-72 mb-12"
          required
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
