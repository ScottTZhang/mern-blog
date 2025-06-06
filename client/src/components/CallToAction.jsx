import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about JS?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 Javascript projects.
        </p>
        <Button className="rounded-tl-xl rounded-bl-none" color="purple">
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener no referrer"
          >
            100 Javascript projects
          </a>
        </Button>
      </div>
      <div className="flex-1 p-7">
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
      </div>
    </div>
  );
}
