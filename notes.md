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

### [04/07/25] Add redux toolkit

Redux: Save information in front end as global state

1. Install redux in **front end** : npm install @reduxjs/toolkit react-redux

2. Redux: 
 - **Store（仓库）**
  **翻译：仓库**
  **理解**：Store 就像这个仓库的大楼，里面存放着所有物品。无论是食物、工具还是服装，都在这一个地方。对于 Redux 来说，store 保存着应用的全部状态，是唯一的全局数据中心。

 - **Slice（仓库区域）**
  **翻译：区域/分片**
  **理解**：为了管理方便，这个大仓库内部会划分为几个不同的区域，每个区域负责存放一类物品，比如食物区、电子产品区、服装区等。Redux 中的 slice 就是把整个 store 根据业务或功能拆分成更小的部分，每个 slice 只关注自己负责的那一部分状态。这样做可以使代码更模块化、易于维护。

 - **Reducer（仓库管理员/操作员）**
  **翻译：变更器/管理者**
  **理解**：每个区域都有一个专门的管理员，负责根据指令调整区域内的物品，比如添加新的库存、修改物品信息或者移除损坏的物品。Redux 中的 reducer 就像这些管理员：它接收当前状态（仓库区域的现有物品）和一个“行动指令”（action），然后返回一个新的状态（更新后的区域内容），而且始终保证原来的状态不被直接修改。

  ```
  const store = configureStore({
    reducer: rootReducer,
  });

  const rootReducer = combineReducers({
    user: userReducer, // Manages the "user" slice of state
    posts: postsReducer, // Manages the "posts" slice of state
  });
  ```
  - The `reducer` key in the configureStore function is **fixed**. It is a required property that specifies the reducer function for the Redux store.
  - The `combineReducers()` function from Redux Toolkit is also fixed. It is used to combine multiple reducers into a single rootReducer.
  - The store is fixed in the sense that there is only one store per application.
  - It combines all the slices and reducers into a single global state.

3. Slice:
```
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});
```
 - `name: 'user'`: This is the name of the slice, which will be used as a key in the Redux store.
 - `initialState`: The initial state of the slice, as defined above.
 - `signInSuccess`: It updates `currentUser` with the user data provided in the `action.payload`, sets loading to false to indicate the operation has completed, and clears any errors by setting error to null.
 - `signInFailure`: It sets loading to false to indicate the operation has ended and updates error with the error message provided in the `action.payload`.

4. userSlice.js:
```
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export const userReducer = userSlice.reducer;//add reducer to store
```
 - `userSlice.actions` is an **object** containing the action creators automatically generated by createSlice
 - `userSlice.reducer` is the **single reducer** function generated by createSlice. It combines all the individual reducers (e.g., signInStart, signInSuccess, signInFailure) into one function that can be used by the Redux store. 
 - Compare: `userSlice.reducers` is an **object** containing the individual reducer functions you defined in the slice (e.g., signInStart, signInSuccess, signInFailure). These are used internally by createSlice and are not directly used in the store.

Both `userSlice.actions` and `userSlice.reducer` are dynamically generated by createSlice based on the configuration you provide (e.g., name, initialState, reducers).

5. SignIn.jsx:
```
import {useDispatch} from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";

const {loading, error: errorMessage} = useSelector((state) => state.user);
const dispatch = useDispatch();

//setErrorMessage(error.message);
//setLoading(false); // Reset loading state
dispatch(signInFailure(error.message));
// Dispatch the signInFailure action with the error message. Replace the above code
```
 - The `useSelector` hook is a React-Redux hook that allows functional components to read data from the Redux store. It takes a selector function as an argument, which specifies the part of the state you want to access.
 In this case, the selector function (state) => state.user retrieves the user slice of the Redux state.
 - `(state) => state.user`: `state` is not a fixed variable. It is a parameter passed to the selector function (state) => state.user. The state represents the **entire Redux store state at the time the selector is called.**
 - `state.user`: The `user` key comes from the reducer configuration in the Redux **store**. It is user-defined and represents the name of the state slice managed by the userReducer.
  ```
  export const store = configureStore({
    reducer: {
      user: userReducer, // 'user' slice is managed by userReducer
    },
  })
  ```
  As a result, the global Redux state will look like this:
  ```
  {
    user: {
      currentUser: null,
      loading: false,
      error: null,
    },
  }
  ```
  - The `name` property in `createSlice()` is used to prefix the action types generated by the slice. For example, if the name is `'user'`, the action types generated will look like:
  `user/signInStart`
  `user/signInSuccess`
  `user/signInFailure`
  The name property is primarily for identifying the slice in the Redux DevTools and for generating action type strings. It does not affect how the state is stored in the Redux store.
  - `error: errorMessage`: Extracts the error property from the user slice and renames it to errorMessage.

6. `dispatch(signInSuccess(data));` in SignIn.jsx not matching `signInSuccess: (state, action) {...}` in userSlice.js
  - The reason signInSuccess(data) does not need to explicitly match the signInSuccess: (state, action) function signature is because of how Redux Toolkit's createSlice automatically generates action creators and handles the action object. 
  - When you define a reducer like `signInSuccess: (state, action)` in createSlice, Redux Toolkit **automatically generates** an **action creator** for it. The generated action creator has the same name as the reducer (signInSuccess) and is designed to accept a `payload` as its argument.
  - The reducer function `signInSuccess: (state, action)` is called when an action with the type 'user/signInSuccess' is dispatched. The `action` object is automatically passed to the reducer, and the `payload` property of the action object contains the data you passed when calling `signInSuccess(data)`.
  - `action.payload`: The action object looks like this:
  ```
  {
    type: 'user/signInSuccess',
    payload: data,
  }
  ```
  - Why the Function Signature Doesn't Need to Match?

    dispatch(signInSuccess(data)); in SignIn.jsx

    signInSuccess: (state, action) {...} in userSlice.js

    - The signInSuccess(data) function is the action creator, and its job is to create an action object with the correct type and payload. The reducer signInSuccess: (state, action) is a separate function that handles the dispatched action. These two functions are connected by the type property of the action object, not by their signatures.

    - **Action Creator**:
      `signInSuccess(data)` generates an action object with a `type` and `payload`.
    - **Reducer**:
      `signInSuccess: (state, action)` processes the action object and updates the state.

    The action object bridges the gap between the action creator and the reducer, so their signatures don't need to match directly.

  **Summary**: 

  1) `signInSuccess(data)` is the action creator that generates an action object with a `type` and `payload`.
  
  2) `signInSuccess: (state, action)` is the reducer that processes the dispatched action and updates the state.

  3) The `data` passed to `signInSuccess(data)` becomes the `payload` in the `action` object, which is then accessed as `action.payload` in the reducer.

  4) The function signatures don't need to match because the action object serves as the intermediary between the action creator and the reducer.


7. Install **Redux DevTools** add-on on browser

### [04/08/25] Add redux persist

**[Issue]**:

After sign in, if I refresh the page, the signed in user will be lost.

In a typical Redux application, the state is stored in memory and is reset whenever the page is refreshed. **redux-persist** solves this problem by saving the Redux state to a persistent storage medium, such as **localStorage, sessionStorage**, or other custom storage engines.

Purpose: To save information locally.

  - In client folder, npm i redux-persist

redux-persist may introduce non-serializable values (e.g., **promises**) into the state, which would trigger warnings or errors if the serializableCheck middleware is enabled.

### [04/10/25] Add Google OAuth functionality

1. Create project at firebase.google.com

2. Clien side: npm install firebase

3. .env in clien variable must start with 'VITE'

These variables can be accessed in the client-side code using `import.meta.env`

4. Complete **Authentication** from firebase

### [04/13/25] Update header component with user data
1. Fixed "A resource is blocked by OpaqueResponseBlocking" issue

 - `npm install cors`
 - Update index.js:
    ```
    import cors from 'cors';

    app.use(cors({
      origin: 'http://localhost:3000', // Replace with your frontend's URL
      methods: ['GET', 'POST'], // Allowed HTTP methods
      credentials: true, // Allow cookies if needed
    }));
    ```

2. const { currentUser } = useSelector((state) => state.user); // For use user data
  
  //state represents the entire Redux state.
  
  //state.user.currentUser is the specific part of the state being accessed.

3. `className='block text-sm'`

When an element is styled with display: block, it: 

(1) Takes Up Full Width. 

(2) Starts on a New Line. 

(3) Default for Block Elements: Many HTML elements, such as `<div>`, `<p>`, and `<h1>`, are block-level by default. The block class can be used to explicitly set this behavior for elements that are not block-level by default, such as `<span>` or `<a>`, **making them stack vertically**.

### [04/14/25] Complete dark mode functionality
1. In JavaScript, a **default export** allows you to export a single value (e.g., a function, object, or variable) from a module. When importing a default export, you can name the imported value anything you like.

`export default themeSlice.reducer;`

`import themeReducer from './theme/themeSlice';` 

themeReducer is any name I can use

2. **Issue**: ThemeProvider className is toggle correctly, but the style is not applied.

[Solution]:

Verify that your Tailwind CSS configuration supports dark mode (darkMode: "class").

In tailwind.config.js: add `darkMode: 'class',`

3. `min-h-screen`

Responsive Design: The min-h-screen class ensures that the element adapts to the height of the user's viewport, making it ideal for responsive layouts.
Utility-First Approach: By using a utility class like min-h-screen, you can quickly apply this behavior without writing custom CSS.
Improved Aesthetics: It helps create visually balanced layouts by ensuring that sections or pages always fill the screen, even with minimal content.

### [04/19/25] Make the dashboard private

1. Navigate is a component; useNavigate is a hook.

2. `<Outlet />` component:

The `Outlet` is used to render the specific content of the child route while keeping the shared layout intact.

  ```
  <Route element={<PrivateRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>
  ```
  - The PrivateRoute component is rendered first because it is specified as the element for the outer `<Route>`.
  - The PrivateRoute component performs a check (e.g., verifying if the user is logged in or has the necessary permissions).
  - If the check passes, the **Outlet** component inside PrivateRoute renders the child route, which in this case is the **Dashboard** component.
  - If the check fails, the PrivateRoute component redirects the user to another route, such as `/sign-in`.

### [04/19/25] Complete sidebar of the dashboard

1. Check the error when the page is empty: Go to the browser Inspect -> Console.

2. The `useEffect` hook takes two arguments:

  - **Effect Function**: A callback function that contains the side effect logic. This function is executed after the component renders.
  - **Dependency Array (optional)**: An array of values that the effect depends on. The effect will re-run only if one of these values changes. If omitted, the effect runs after every render.
  - **Common Use Cases**: Fetching Data, Listening to Events, Synchronizing State with Props
  - Dependency Array Behavior:

    Empty Array ([]): The effect runs only once after the initial render, similar to componentDidMount.

    No Array: The effect runs after every render, similar to combining componentDidMount and componentDidUpdate.

    Specific Dependencies: The effect runs only when one of the specified dependencies changes.

### [04/19/25] Complete profile page UI

### [04/20/25] Complete user image upload functionality

1. Link an input to the image.

2. `src={imageFileUrl || currentUser.profilePicture}`

To make the uploaded image displayed, using the temp url created by `setImageFileUrl(URL.createObjectURL(file));`

3. Firebase: Build -> Storage -> get started -> (have to upgrade plan)

4. Firebase: `const storageRef = ref(storage, fileName);`

  - `fileName`: This is the path or name of the file within the storage bucket.
  - The `ref` function is used to create a reference to a specific path in Firebase Storage.

5. Firebase: The `uploadTask.on()` method is part of the Firebase Storage API and is used to monitor the progress of a file upload to Firebase Storage.

6. Firebase: `uploadTask.on(eventType, nextOrObserver, error, complete)`
  - **eventType** (required): Specifies the type of event to listen for. The `on()` method is specifically designed to handle upload state changes, making `"state_changed"` the **only valid value** for eventType.
  - **nextOrObserver** (optional, fill with 'null'): A callback function or observer object that handles progress updates.
  - **error** (optional, fill with 'null'): A callback function that handles errors during the upload process. It is **highly recommended** to handle errors gracefully.
  - **complete** (optional, fill with 'null'): A callback function that is executed when the upload is successfully completed.

7. **Issue**: In HTML, <a> cannot be a descendant of <a>.

Solution: 
```
  import { useNavigate } from "react-router-dom";
  const navigate = useNavigate(); // Hook for programmatic navigation
  //in component:
  onClick={() => navigate("/dashboard?tab=profile")} // Navigate programmatically
```

8. `/``/` defines a **template liternal** allowing for multi-line strings and embedded expressions, which uses `${}`

```
className={`absolute inset-0 rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100  && 'opacity-60'}`}
```

The `${}` syntax is used inside a template literal to embed JavaScript expressions or variables into the string.

9. `inset-0`: It is shorthand for setting all four inset properties (top, right, bottom, and left) to 0. This effectively positions the element to stretch and fill its parent container.

10. Install React Circular Progressbar: npm install --save react-circular-progressbar. 
https://www.npmjs.com/package/react-circular-progressbar

### [04/20/25] Add update user API route

1. npm i cookie-parser

2. Key points:

  - In **index.js**: When **a request is received**, `app.use(cookieParser()); ` is used to reads the Cookie header from the HTTP request, parses it, and attaches the resulting key-value pairs as an object to **`req.cookies`**

  - In **verifyUser.js**: `const token = req.cookies.access_token;` `req.cookies` is created by the cookie-parser middleware. The **jwt.verify** method is used to validate the authenticity and integrity of a JWT.
    
    `access_token`: This is the specific cookie being accessed. It contains the JWT (JSON Web Token) that was previously set by the server. It is set in the response, typically during user login or authentication:

    `res.cookie("access_token", token, { httpOnly: true });` in **auth.controller.js**.

    `user`: The decoded payload of the token if it is valid.

    `req.user = user;`: Custom Middleware Example: verifyUser.js is an example of how `req.user` might be populated using a custom JWT middleware.

  - In **user.controller.js**: req.user.id is actually populated using JWT in **verifyUser.js**. The `id` field in the JWT payload becomes `req.user.id`.

3. `$set` operator ensures that only the specified fields (username, email, profilePicture) are updated. Other fields in the document remain unchanged. If the field already exists, its value is updated. If the field does not exist, it is added to the document.

### [04/21/25] Complete update user profile page functionality

### [04/21/25] Add delete user API route

1. Insomnia: DELETE localhost:3000/api/user/delete/{id}

### [04/21/25] Complete delete user account functionality

1. Update userSlice.js, dispatch

### [04/21/25] Add sign out functionality

1. Clear cookie, redux toolkit

2. **[Issue]**: Redux toolkit does not show any action. Solution: Reopen the inspect.

### [04/22/25] Add admin functionality to the user

1. Update User model: add isAdmin.

### [04/22/25] Complete create a post page UI

1. `<Link to={'/create-post'}>`

  - This is a **relative** path. The navigation will append create-post to the current URL path. For example: If the current URL is /dashboard, navigating to create-post will result in **`/dashboard/create-post`**.

  - If your application has nested routes like /dashboard/create-post, using `to={'create-post'}` makes sense because it appends create-post to /dashboard.

  - `to={'/create-post'}:` This is an absolute path. The navigation will go directly to /create-post, regardless of the current URL path.

2. `return currentUser.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;`

  - The `<Outlet />` component is provided by react-router-dom and is used in the context of nested routing. It acts as a placeholder for rendering the child routes of the current route.

  - If currentUser is truthy, the `<Outlet />` component is rendered, allowing the user to access the child routes defined under this private route.

3. Text editor in webapge: Install react-quill

  - `npm install react-quill --save` in client folder. 
  - **[Issue]** 2.0.0 peerDependencies only support React 16, 17 and 18, not React 19. [Solution]: `npm install react-quill-new`. https://www.npmjs.com/package/react-quill-new

### [04/27/25] Add create a post API route

1. Create Post model in post.model.js

2. Create `router.post('/create', verifyToken, create);`

3. Create "create" function in post.controller.js.

4. Test API `/create` in Insomnia

### [05/03/25] Complete upload post image functionality

1. Edit CreatePost.jsx. `uploadTask.on()`

### [05/04/25] Complete create post functionality

`useNavigate`, `handleSubmit`

### [05/04/25] Add posts section to the dashboard

### [05/04/25] Create get posts API route

1. getPosts function: `Post.find(filters).sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);`

  - The Post.find() method is used to query the Post collection in the MongoDB database. It accepts a filter object as its argument.
  - .skip(startIndex): Skips a specified number of documents, typically used for pagination.
  - .limit(limit): Limits the number of documents returned, also used for pagination.

2. `const filters = {`**`...`**`(re.query.userId && {...})}`

The **spread operator** (...) is used to conditionally add the $or condition to the parent object. If req.query.search is falsy, the spread operator adds nothing, ensuring that the search filter is only applied when the search query parameter is provided.

  - The `$or` operator in MongoDB is used to match documents that satisfy at least one of the specified conditions.
  - The `$options: "i"` flag makes the search case-insensitive
  - The `$regex` operator is used to perform pattern matching in MongoDB.

3. `res.status(200).json({posts, totalPosts, lastMonthPosts, });` JavaScript's shorthand property syntax is used. In JavaScript, if **the property name and the variable name are the same**, you can use shorthand syntax to define the object.

### [05/05/25] Show user posts inside dashboard

1. Install tailwind-scrollbar: https://www.npmjs.com/package/tailwind-scrollbar

For "tailwindcss": "^3.4.17", I need to use `npm install tailwind-scrollbar@^3.1.1`

2. `className="divide-y"`. The **divide-y** class in Tailwind CSS is used to add horizontal dividing lines between vertically stacked child elements, enhancing the visual structure of lists, menus, or other layouts.

3. `table-auto`: It sets the table's layout to auto, which means the column widths are determined by the content inside the cells. The browser calculates the width of each column based on the content, rather than using a fixed width.

4. `overflow-x-scroll`: This class applies a horizontal scrollbar to the element if its content overflows the width of the container.

5. `mx-auto`: Centers the element horizontally

6. userPosts.map((post) => **{}**)
  - Issue: The arrow function uses curly braces {} but does not include a **return** statement. As a result, the map() function does not return any JSX elements to render.
  - Solution: Use **Parentheses** Instead of Curly Braces: When using parentheses () in an arrow function, the value is implicitly returned.

### [05/05/25] Add show more funtionality to the posts results of the dashboard

1. Use the "startIndex" to fetch "getposts" API

### [05/05/25] Add delete post funtionality to the dashboard

1. Create API route in post.route.js.

2. Create delete function in post.controller.js

3. `setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));`

Equivalent to:

```
setUserPosts((prev) => {
  // Create a new array by filtering out the post with the matching _id
  const updatedPosts = prev.filter((post) => {
    return post._id !== postIdToDelete;
  });

  // Return the new array as the updated state
  return updatedPosts;
});
```

or:

```
setUserPosts((prev) => {
  // Initialize a new array to store posts that are not deleted
  const updatedPosts = [];

  // Loop through the previous posts
  for (let post of prev) {
    // Add the post to the new array if its _id does not match postIdToDelete
    if (post._id !== postIdToDelete) {
      updatedPosts.push(post);
    }
  }

  // Return the new array as the updated state
  return updatedPosts;
});
```

4. **Issue**: Each child in a list should have a unique "key" prop.

Solution: `<TableBody key={post._id}> ...`

### [05/12/25] Add update post functionality

1. Create UpdatePost.jsx

2. Add Route in App.jsx

3. Use getPost function and postId from post.controller.js to get the post.

4. Keep formData:

```
  onChange={(e) =>
    setFormData((prev) => ({ ...prev, category: e.target.value }))
  }
```

### [05/15/25] Create get users API route

1. Create API route `/getusers`.

2. Create controller function `getUsers`.

3. Test in Insomnia http://localhost:3000/api/user/getusers?sort=asc&limit=4

### [05/16/25] Show users to the admin dashboard

1. Create DashUsers.jsx. Similar to DashPosts.jsx.

2. Add the component to DashSideBar.jsx, Dashboard.jsx

### [05/18/25] Add delete user functionality to the admin user

### [05/18/25] Complete post page functionality

1. Create PostPage.jsx

2. Add the PostPage to App.jsx

3. "post-content" is s customized css styling. 

### [05/18/25] Add call-to-action to the post page

1. Create CallToAction.jsx component