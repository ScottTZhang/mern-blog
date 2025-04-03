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

**BrowserRouter**
: Utilizes the HTML5 history API to manage and synchronize the application's URL.​

**Routes**
: A container for a set of <Route> components, ensuring that only the first matching route is rendered.​

**Route**
: Defines a mapping between a **URL path** and a **React component** to render when the path matches.​

**Link**
: Enables navigation between routes without triggering a full page reload, enhancing the single-page application experience.

In clien folder, `npm i react-router-dom`

App.jsx: `import {BrowserRouter, Routes, Route} from 'react-router-dom';` 

Add and import related components.

### [03/27/25] Create header components

Inside the `<BrowserRouter>`, the `<Header />` component is rendered. This is likely a **shared component** that appears on all pages, such as a navigation bar or site header. 

**Styling : Flowbite React**

https://flowbite-react.com/

https://flowbite-react.com/docs/guides/vite#add-to-existing-project

To achieve buttons reorder/display update on header bar when the browser size changes.

In client folder, `npx flowbite-react@latest init`

Edit Header.jsx

`<Link>`: Link component from react-router-dom is used to create a navigable link. The Link component is a React Router abstraction that allows navigation between routes without triggering a full page reload.

In client folder, `npm i react-icons`

**[Issue]**
`<Button gradientDuoTone="purpleToBlue">` does not work, and replaced with following:

Cause: lib version has updated to new ones. libs that supported gradientDuoTone:
 - flowbite	^1.6.0
 - flowbite-react	^0.5.2

```
<Link to="/sign-in">
  <Button
    className="
      bg-white                 // 默认背景白色
      text-black                // 默认文字黑色
      border border-gray-300    // 默认边框
      hover:bg-gradient-to-r    // 悬停时渐变背景
      hover:from-purple-500     // 渐变色起始
      hover:to-blue-500         // 渐变色结束
      hover:text-white          // 悬停时文字白色
      hover:border-transparent  // 悬停时隐藏边框
      transition-all            // 过渡效果
      duration-300              // 过渡时长300ms
      focus:ring-4              // 焦点状态保留原配置
      focus:ring-blue-300     
      dark:focus:ring-blue-800
    "
  >
    Sign In
  </Button>
</Link>
```

**`order-2`**
: The order property in CSS determines the visual order of flex items within a flex container. By default, all flex items have an order value of 0. Setting order-2 moves this element to a position after elements with lower order values (e.g., order-0 or order-1).

**[Issue]**
`import {Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput, Button} from 'flowbite-react'`

Replace "Navbar.Collapse, Navbar.Link, Navbar.Toggle"

https://flowbite-react.com/docs/components/navbar#default-navbar

**`as={'div'}`**
: In this case, the component will render as a <div> element instead of its default HTML tag.

NavbarLink Rendered as `<div>`:
 - The **`as={'div'}`** prop explicitly instructs the NavbarLink component to render as a `<div>` instead of its default tag (e.g., `<a>`).
 - This means that the NavbarLink itself will be a `<div>` in the DOM.
Link Remains a `<Link>`:
 - It is not affected by the **`as={'div'}`** prop because the as prop only applies to the NavbarLink component.

### [03/29/25] Create and run the server
1. Version control: In package.json:
 - "flowbite": "^1.6.0"  // Allows 1.6.0 ~ 1.999.999
 - "flowbite": "~1.6.0"  // Allows 1.6.0 ~ 1.6.999

**Create Server**:

1. `npm init -y` 是一个快速初始化 Node.js 项目的命令
使用 -y（或 --yes）参数时，npm 会跳过所有配置问题，直接使用默认值填充文件。

2. package.json: add `"type": "module",`

3. `npm i nodemon` updates servers automatically and instantly.

4. package.json: add 
  ```
    "scripts": {
      "dev": "nodemon api/index.js",
      "start": "node api/index.js" /* For production deployment */
    }
  ```
  To use the script, in terminal: `npm run dev`, or, `npm run start`

### [03/30/25] Connect to the database
1. In MERN-blog: `npm install express mongoose dotenv`
2. Create .env file

### [03/31/25] Create user model
1. Create user.model.js

### [03/31/25] Create a test API route
1. Best practice is not to put all api routes in the index.js, because there are too many. For example, for users we have pulls.
2. index.js: 

`import userRoutes from './routes/user.route.js';`

`app.`**`use`**`('/api/user', userRoutes);`

  user.route.js:

`router.get('/test', (req, res) => {//...});`

Then browser needs to use api:

http://localhost:3000/**api/user/test/**

### [03/31/25] Create signup API route
1. `const router = express.Router();`

 - Instance Creation: The `express.Router()` function creates a new router object. This object behaves like a mini Express application, capable of handling middleware and routes.
 - Route Definitions: You can define routes (e.g., GET, POST, PUT, DELETE) on this router instance using methods like `router.get()`, `router.post()`, etc.
 - Middleware: You can also attach middleware to the router to process requests before they reach the route handlers.
 - Export and Use: Typically, the router is exported from the module and then mounted onto a specific path in the main application file using `app.use()`.

2. `app.use(express.json()); // allow json data to be sent to the server`

3. Click **"Browse collections"** to check the data inserted to the MongoDB.

4. User **bcryptjs** to hash the password.

### [04/03/25] Add a middleware and a function to handle errors

1. **`next()`**:

If a middleware function does not end the request-response cycle (e.g., by sending a response with `res.send()`), it must call `next()` to pass control to the next middleware or route handler. Without calling next(), the request will hang, as Express will not know how to proceed.

### [04/03/25] Create signup page UI

1. Command + t : to search a file