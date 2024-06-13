"use client"

import { useEffect, useRef, useState } from "react"

// Local library
import { calculateWPM } from "@/library/functionality";
import { getWords1000 } from "@/library/textProvider";

// Local components
import TypingTestBox from "@/components/TypingTestBox";
import RestartButton from "@/components/buttons/RestartButton";
import ChooseLanguage from "@/components/buttons/ChooseLanguage";
import ChooseDifficulty from "@/components/buttons/ChooseDifficulty";

export default function Home() {
  // ------------------------------- STATES // VARIABLES DEFINITION -------------------------------
  const [text, setText] = useState("")
  const [cursorPos, setCursorPos] = useState(0)  // Posisi kursor untuk saat ini
  const [salahKetik, setSalahKetik] = useState([]) // Index huruf yang salah ketik
  const [salahKetikKelebihan, setSalahKetikKelebihan] = useState({count:0}) // Menyetor index salah ketik kelebihan huruf, seperti "tinggal" diketik jadi "tinggalp", nilai akan setor objek {index_p, "p"}
  const [focusDiv, setFocusDiv] = useState(true) // Untuk mentogle fokus typing div
  const [finish, setFinish] = useState(false) // State game apakah selesai atau belum
  const [timerSec, setTimerSec] = useState(0) // Timer dalam detik
  const [timer, setTimer] = useState("steady") // status timer
  const [language, setLanguage] = useState("Indonesia")
  const [difficulty, setDifficulty] = useState("Easy")
  const typingDivRef = useRef() // Untuk me-ref typing div

  // Menyiapkan text dari file json
  useEffect(() => {
    getWords1000(setText, language, difficulty)
  }, [])

  useEffect(() => {
    getWords1000(setText, language, difficulty)
  }, [language, difficulty])

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
   <div className="max-w-3xl mx-auto mt-10">

    <div className="flex items-center *:mr-2 mb-2">
      <RestartButton setCursorPos={setCursorPos} setFinish={setFinish} setSalahKetik={setSalahKetik} setFocusDiv={setFocusDiv} setSalahKetikKelebihan={setSalahKetikKelebihan} setTimer={setTimer} />
      
      <div className="text-xl px-3 py-2 border border-black rounded-md">
        {timerSec}
      </div>
      
      <ChooseLanguage language={language} setLanguage={setLanguage} />
      
      <ChooseDifficulty difficulty={difficulty} setDifficulty={setDifficulty} />

    </div>

    <TypingTestBox cursorPos={cursorPos} setCursorPos={setCursorPos} salahKetik={salahKetik} setSalahKetik={setSalahKetik} salahKetikKelebihan={salahKetikKelebihan} setSalahKetikKelebihan={setSalahKetikKelebihan} focusDiv={focusDiv} setFocusDiv={setFocusDiv} finish={finish} setFinish={setFinish} timerSec={timerSec} setTimerSec={setTimerSec} timer={timer} setTimer={setTimer} text={text} ref={typingDivRef} />

    <div className="">
      {finish && resultCard}
    </div>

   </div>
  );
}
