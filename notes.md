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

Add and import realted components.

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
`<Button gradientDuoTone="purpleToBlue">` does not work, and replaced with:

```
<Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
  Purple to Blue
</Button>
```

**`order-2`**
: The order property in CSS determines the visual order of flex items within a flex container. By default, all flex items have an order value of 0. Setting order-2 moves this element to a position after elements with lower order values (e.g., order-0 or order-1).

**[Issue]**
`import {Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput, Button} from 'flowbite-react'`

Replace "Navbar.Collapse, Navbar.Link, Navbar.Toggle"

https://flowbite-react.com/docs/components/navbar#default-navbar

**`as={'div'}`**
: In this case, the component will render as a <div> element instead of its default HTML tag.

NavbarLink Rendered as <div>:
 - The as={'div'} prop explicitly instructs the NavbarLink component to render as a <div> instead of its default tag (e.g., <a>).
 - This means that the NavbarLink itself will be a <div> in the DOM.
Link Remains a <Link>: