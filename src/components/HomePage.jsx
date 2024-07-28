import React from "react";
import Link from "next/link";
import { SlCursor } from "react-icons/sl";
import { Motion } from "@/components/transition/motion";
import Modal from "@/components/modal/modal";

function HomePage() {
  return (
    <div className="w-screen h-screen max-w-full max-h-full home-gradient">
      <div className="flex flex-col justify-center items-center w-auto h-5/6 ">
        <Motion>
          <div className="flex flex-col justify-center items-center w-auto h-5/6">
            <div className="flex items-start mb-7">
              <SlCursor className="text-light-blue text-5xl mr-2 mt-1" />
              <div className="flex flex-col items-end cursor-default">
                <p className="text-3xl text-white">CoreType</p>
                <p className="text-light-blue text-sm">Typing Test</p>
              </div>
            </div>

            <Link
              href={"/typingtest"}
              className="btn btn-outline-primary py-2 px-6 rounded-full mb-7 text-white uppercase"
            >
              Start
            </Link>
            <div className="ml-2 text-white font-light text-sm cursor-default">
              Created with ❤️ by{" "}
              <span className="text-light-blue">
                <Modal />
              </span>{" "}
              team
            </div>
          </div>
        </Motion>
      </div>
    </div>
  );
}

export default HomePage;
