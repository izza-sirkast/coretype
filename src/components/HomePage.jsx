import React from "react";
import Link from "next/link";
import { SlCursor } from "react-icons/sl";

function HomePage() {
  return (
    <div className="w-screen h-screen max-w-full max-h-full home-gradient">
      <div className="flex flex-col justify-center items-center w-auto h-5/6 ">
        <div className="flex items-start mb-7">
          <SlCursor className="text-light-blue text-5xl mr-2 mt-1" />
          <div className="flex flex-col items-end">
            <p className="text-3xl text-white">CoreType</p>
            <p className="text-light-blue text-sm">Typing Test</p>
          </div>
        </div>

        <Link
          href={"/typingtest"}
          className="bg-light-blue px-6 py-1 text-white rounded-3xl hover:bg-blue-700 transition-all ease-in mb-6"
        >
          Start
        </Link>

        <p className="ml-2 text-white font-light text-xs">
          Created with ❤️ by <span className="text-light-blue">azumuza</span>{" "}
          team
        </p>
      </div>
    </div>
  );
}

export default HomePage;
