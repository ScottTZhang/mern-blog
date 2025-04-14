import { createSlice } from "@reduxjs/toolkit";
import { theme } from "flowbite-react";

const initialState = {
  theme: 'light'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      console.log("Theme toggled to: ", state.theme); // Log the updated theme
    },
  },
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer; //we can use this reducer in the store
//In JavaScript, a default export allows you to export a single value (e.g., a function, object, or variable) from a module. When importing a default export, you can name the imported value anything you like.