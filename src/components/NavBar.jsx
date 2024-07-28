import React from "react";
import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="sticky flex top-0 mx-auto justify-between w-4/5 items-start pt-4">
      <div className="flex items-start">
        <Image
          src="/CoreType.svg"
          width={150}
          height={150}
          alt="CoreType Logo"
          className="mr-2"
        />
      </div>

      <Link
        href={"/"}
        className=" bg-slate-400 bg-opacity-30 px-6 py-1 text-white rounded-3xl hover:bg-opacity-60 transition-all ease-in mb-6 mt-2"
      >
        Home
      </Link>
    </nav>
  );
}

export default NavBar;
