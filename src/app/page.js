"use client"

import { useEffect, useRef, useState } from "react"
import { MdOutlineRestartAlt } from "react-icons/md";
import ID_Easy from "@/assets/vocab/ID_Easy.json"

// Local library
import { calculateWPM } from "@/library/functionality";

// Local components
import TypingTestBox from "@/components/TypingTestBox";
import RestartButton from "@/components/buttons/RestartButton";

export default function Home() {
  // ------------------------------- STATES // VARIABLES DEFINITION -------------------------------
  const [cursorPos, setCursorPos] = useState(0)  // Posisi kursor untuk saat ini
  const [salahKetik, setSalahKetik] = useState([]) // Index huruf yang salah ketik
  const [salahKetikKelebihan, setSalahKetikKelebihan] = useState({count:0}) // Menyetor index salah ketik kelebihan huruf, seperti "tinggal" diketik jadi "tinggalp", nilai akan setor objek {index_p, "p"}
  const [focusDiv, setFocusDiv] = useState(true) // Untuk mentogle fokus typing div
  const [finish, setFinish] = useState(false) // State game apakah selesai atau belum
  const [timerSec, setTimerSec] = useState(0) // Timer dalam detik
  const [timer, setTimer] = useState("steady") // status timer
  const typingDivRef = useRef() // Untuk me-ref typing div

  const text = "dengan menggunakan semua yang aku di dengan rumah menggunakan hati tanpa kasihan dengan tangan yang semua mati makan melakukan tidak batu sekolah tebal bersih"
  const textArr = text.split("")

  // Timer regulation
  useEffect(() => {
    let interval;
    if(timer == "start"){
      interval = setInterval(() => {
        setTimerSec(ts => ts + 1)
      }, 1000)
    }else if(timer == "stop"){
      clearInterval(interval)
    }else if(timer == "restart"){
      setTimerSec(ts => 0)
      setTimer(t => "steady")
    }

    return () => clearInterval(interval)
  }, [timer])



  // ------------------------------- Section khusus handling div focus -------------------------------
  // Untuk menghilakngkan fokus ke typing test div saat luar div diklik
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    setFocusDiv(fd => false)
  };



  // ------------------------------- COMPONENTS // RENDER VARIABLES -------------------------------
  // Result card, mengambil hasil wpm dengan fungsi calculateWPM dari library/functionality
  let resultCard;
  if(finish){
    resultCard = <div className="text-xl px-3 py-2 mr-2 border border-black rounded-md w-28">{calculateWPM(timerSec, textArr, salahKetik, salahKetikKelebihan)} WPM</div>;
  }


  return (
   <div className="block max-w-3xl mx-auto mt-10">

    <div className="flex mb-2 items-center">
      <RestartButton setCursorPos={setCursorPos} setFinish={setFinish} setSalahKetik={setSalahKetik} setFocusDiv={setFocusDiv} setSalahKetikKelebihan={setSalahKetikKelebihan} setTimer={setTimer} />
      
      <div className="text-xl px-3 py-2 border border-black rounded-md">
        {timerSec}
      </div>
    </div>

    <TypingTestBox typingDivRef={typingDivRef} cursorPos={cursorPos} setCursorPos={setCursorPos} salahKetik={salahKetik} setSalahKetik={setSalahKetik} salahKetikKelebihan={salahKetikKelebihan} setSalahKetikKelebihan={setSalahKetikKelebihan} focusDiv={focusDiv} setFocusDiv={setFocusDiv} finish={finish} setFinish={setFinish} timerSec={timerSec} setTimerSec={setTimerSec} timer={timer} setTimer={setTimer} text={text} />

    <div className="">
      {finish && resultCard}
    </div>

   </div>
  );
}
