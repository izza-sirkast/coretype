"use client";

import Link from "next/link";

export default function Modal() {
  return (
    <>
      <label className="cursor-pointer" htmlFor="modal-1">
        azumuza
      </label>
      <input className="modal-state" id="modal-1" type="checkbox" />
      <div className="modal text-white bg-white bg-opacity-10 backdrop-blur-lg shadow-lg p-6 rounded-lg">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content flex flex-col gap-5 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg p-6 rounded-lg">
          <label
            htmlFor="modal-1"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">AZUMUZA Team</h2>
          <div className="text-lg">
            10122029 –{" "}
            <Link href="https://github.com/AlifViku" target="_blank">
              Alif Vidya Kusumah
            </Link>
            <br />
            10122005 –{" "}
            <Link href="https://github.com/ZulfiFazhar" target="_blank">
              Zulfi Fadilah Azhar
            </Link>
            <br />
            10122018 –{" "}
            <Link href="https://github.com/Mutiaraftha" target="_blank">
              Mutiara Fatiha
            </Link>
            <br />
            10122034 –{" "}
            <Link href="https://github.com/izza-sirkast" target="_blank">
              Dawla Izza Al-Din Noor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
