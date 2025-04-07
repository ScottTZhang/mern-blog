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

4. Use **bcryptjs** to hash the password.

### [04/03/25] Add a middleware and a function to handle errors

1. **`next()`**:

If a middleware function does not end the request-response cycle (e.g., by sending a response with `res.send()`), it must call `next()` to pass control to the next middleware or route handler. Without calling next(), the request will hang, as Express will not know how to proceed.

### [04/03/25] Create signup page UI

1. Command + t : to search a file

### [04/03/25] Add functionality to the sign up page

1. **`e.preventDefault()`**:

When an event occurs, such as a form submission or a link click, the browser has a default action associated with that event:

 - For a form submission, the default behavior is to **reload the page** and send the form data to the server.
 - (For a link click (`<a>` tag), the default behavior is to navigate to the URL specified in the href attribute.)

2. **proxy**
```
server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false
        }
    }
  }
```
The proxy property inside the server object is used to define proxy rules. A proxy is a server that acts as an intermediary for requests from the client to another server.

If your frontend makes a request like this:
```
const res = await (fetch('/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
}));
```
The Vite proxy will intercept the request to /api/users and forward it to http://localhost:3000/api/users. The backend server running on port 3000 will handle the request and return the response, which is then passed back to the frontend.

3. **Browser -> Inspect -> Network**: to check Headers, Request, Response for the submit status

4. If `required={true}` is used, then it will validate the `<TextInput>` before the `errorMessage` triggers the `<Alert>`

5. React Components Must Return a **Single Parent Element**

In React, every component or conditional rendering block must return a single parent element. Without the <></> fragment, the following code would result in an error because <Spinner> and <span> are sibling elements:

```
  <>
    <Spinner size='sm' />
    <span className="pl-3">Loading...</span>
  </>
```

6. **`const navigate = useNavigate();`**:

Is a **hook** provided by the **react-router-dom** library, which is commonly used for client-side routing in React applications.

  - After Form Submission: Redirect the user to another page after successfully submitting a form. 

### [04/06/25] Create and add the footer component

1. Add the Footer.jsx to App.jsx

2. Version update: Footter.Title => FooterTitle

3. `w-full sm:flex sm:items-center sm:justify-between`

- w-full

This class sets the width of the element to 100% of its parent container.

- sm:items-center

The items-center utility aligns the child elements along the cross-axis (vertical axis in a row layout) to the center.

- sm:justify-between

The first child is aligned to the start, the last child to the end, and any remaining space is distributed between them.

### [04/07/25] Create sign in API route

1. In root directory, `npm i jsonwebtoken`


2. In auth.controller.js:


```
  const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
  res.status(200).cookie('access_token', token, {
    httpOnly: true
  }).json(validUser);
```

The cookie method is used to set a cookie in the HTTP **response**. 

`access_token` : This is the name of the cookie. In this case, it stores the JWT (JSON Web Token) as the value.

`token` : This is the value of the cookie, which in this case is the JWT generated earlier in the code.

`{ httpOnly: true }` : This option makes the cookie HTTP-only, meaning it cannot be accessed via JavaScript on the client-side.

`.json(validUser)` : The json method sends a JSON response to the client. In this case, it sends the validUser object

### [04/07/25] Add functionality to the sign in page

1. Add `finally block` to ensure `setLoading(false)` is called in all cases:
  - *Validation Errors*: If the form fields are invalid,
  - *Server Errors*: If the server responds with an error,
  - *Network Errors*: If an exception is thrown (e.g., network failure),
  - *Successful Sign-In*: If the sign-in is successful, setLoading(false) is still called in the finally block after navigating to the home page.