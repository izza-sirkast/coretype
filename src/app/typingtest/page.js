"use client"

import { useEffect, useRef, useState } from "react"

// Local library
import { getWords1000 } from "@/library/textProvider";

// Local components
import TypingTestBox from "@/components/TypingTestBox";
import RestartButton from "@/components/buttons/RestartButton";
import ChooseLanguage from "@/components/buttons/ChooseLanguage";
import ChooseDifficulty from "@/components/buttons/ChooseDifficulty";
import ChooseTime from "@/components/buttons/ChooseTime";
import NavBar from "@/components/NavBar";
import FinishPage from "@/components/FinishPage";

export default function TypingTest() {
  // ------------------------------- STATES // VARIABLES DEFINITION -------------------------------
  const [text, setText] = useState("")
  const [cursorPos, setCursorPos] = useState(0)  // Posisi kursor untuk saat ini
  const [salahKetik, setSalahKetik] = useState([]) // Index huruf yang salah ketik
  const [salahKetikKelebihan, setSalahKetikKelebihan] = useState({count:0}) // Menyetor index salah ketik kelebihan huruf, seperti "tinggal" diketik jadi "tinggalp", nilai akan setor objek {index_p, "p"}
  const [focusDiv, setFocusDiv] = useState(true) // Untuk mentogle fokus typing div
  const [finish, setFinish] = useState(false) // State game apakah selesai atau belum
  const [timerSec, setTimerSec] = useState(30) // Timer dalam detik
  const [timer, setTimer] = useState("steady") // status timer
  const [language, setLanguage] = useState("Indonesia")
  const [difficulty, setDifficulty] = useState("Easy")
  const [timeMode, setTimeMode] = useState("30")
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
        setTimerSec(ts => ts - 1)
      }, 1000)
    }else if(timer == "stop"){
      clearInterval(interval)
    }else if(timer == "restart"){
      setTimerSec(ts => parseInt(timeMode))
      setTimer(t => "steady")
    }

    return () => clearInterval(interval)
  }, [timer])


  useEffect(() => {
    setTimerSec(ts => parseInt(timeMode))
  }, [timeMode])


  if(timerSec <= 0 && !finish){
    setFinish(f => true)
    setTimer(t => "stop")
    setTimerSec(t => parseInt(timeMode))
  }


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
  if(finish){
    return <FinishPage timeMode={timeMode} cursorPos={cursorPos} salahKetik={salahKetik} salahKetikKelebihan={salahKetikKelebihan} setFinish={setFinish} setCursorPos={setCursorPos} setSalahKetik={setSalahKetik} setSalahKetikKelebihan={setSalahKetikKelebihan} setFocusDiv={setFocusDiv} setTimer={setTimer}/>
  }

  return (
   <div className="w-full max-h-screen min-h-screen gradient-bg">
    <NavBar />

    <div className="flex items-center mx-auto option-container-width mt-20 mb-5 px-2 justify-between">
      <div className="flex *:mr-3">
        <RestartButton setCursorPos={setCursorPos} setFinish={setFinish} setSalahKetik={setSalahKetik} setFocusDiv={setFocusDiv} setSalahKetikKelebihan={setSalahKetikKelebihan} setTimer={setTimer} />
        
        <div className="text-xl px-3 py-2 border border-white text-white rounded-md">
          {timerSec}
        </div>
      </div>
      
      <div className="flex *:ml-3">
        <ChooseLanguage language={language} setLanguage={setLanguage} timer={timer} />
        
        <ChooseDifficulty difficulty={difficulty} setDifficulty={setDifficulty} timer={timer} />

        <ChooseTime timeMode={timeMode} setTimeMode={setTimeMode} timer={timer} />
      </div>

    </div>

    <TypingTestBox cursorPos={cursorPos} setCursorPos={setCursorPos} salahKetik={salahKetik} setSalahKetik={setSalahKetik} salahKetikKelebihan={salahKetikKelebihan} setSalahKetikKelebihan={setSalahKetikKelebihan} focusDiv={focusDiv} setFocusDiv={setFocusDiv} finish={finish} setFinish={setFinish} timerSec={timerSec} setTimerSec={setTimerSec} timer={timer} setTimer={setTimer} text={text} ref={typingDivRef} timeMode={timeMode} />

    <div className="">
      {finish && resultCard}
    </div>

   </div>
  );
}
