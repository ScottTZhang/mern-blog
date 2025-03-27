## What I pay attention or learn

### [03/24/25] Install React.js and Tailwind CSS and create the first template

`npm create vite@latest`

Confirm proj name, framework (React), and variant (JS + SWC), then:

```
  cd client
  npm install
```

Go to https://tailwindcss.com/docs/installation/using-vite, **choose version v3.4.17**, follow the page:

https://v3.tailwindcss.com/docs/installation/using-postcss

**Ctrl+C**: Sends the SIGINT (interrupt) signal to the foreground process, causing it to terminate immediately. This is commonly used to stop a running command or application.

```
  npm install -D tailwindcss@3 postcss autoprefixer
  npx tailwindcss init
  npm run dev  //Must run in client folder
```

[Issue]

Failed to load PostCSS config (searchPath: /Users/tingzhang/Dropbox/projects/MERN-blog/client): [ReferenceError] module is not defined in ES module scope

Solution:

Rename postcss.config.js to **postcss.config.cjs**

git init
git add .
got commit -m "..."

Update SSH key for git:
https://hackernoon.com/how-to-authenticate-your-git-to-github-with-ssh-keys

### [03/27/25] Create pages and routes

Create folder "pages"
Create About, SignIn, SignUp, Dashboard, Home, 

react-router-dom: React Router DOM is a library that enables dynamic routing in React web applications, allowing the UI to synchronize with the URL without requiring full-page reloads.

Key components of React Router DOM include:​

<BrowserRouter>: Utilizes the HTML5 history API to manage and synchronize the application's URL.​

<Routes>: A container for a set of <Route> components, ensuring that only the first matching route is rendered.​

<Route>: Defines a mapping between a **URL path** and a **React component** to render when the path matches.​

<Link>: Enables navigation between routes without triggering a full page reload, enhancing the single-page application experience.

In clien folder, `npm i react-router-dom`

App.jsx: `import {BrowserRouter, Routes, Route} from 'react-router-dom';` 

Add and import realted elements.
