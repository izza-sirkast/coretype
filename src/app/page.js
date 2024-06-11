"use client"

import { useEffect, useRef, useState } from "react"
import { MdOutlineRestartAlt } from "react-icons/md";

export default function Home() {
  // ------------------------------- STATES // VARIABLES DEFINITION -------------------------------
  const [cursorPos, setCursorPos] = useState(0)  // Posisi kursor untuk saat ini
  const [salahKetik, setSalahKetik] = useState([]) // Index huruf yang salah ketik
  const [focusDiv, setFocusDiv] = useState(true) // Untuk mentogle fokus typing div
  const [finish, setFinish] = useState(false) // State game apakah selesai atau belum
  const [timerSec, setTimerSec] = useState(0) // Timer dalam detik
  const [timer, setTimer] = useState("steady") // status timer
  const typingDivRef = useRef() // Untuk me-ref typing div

  const text = "dengan menggunakan semua yang aku di dengan rumah menggunakan hati tanpa kasihan dengan tangan yang semua mati makan melakukan tidak batu sekolah tebal bersih"
  const textArr = text.split("")



  // ------------------------------- INTERACTIVITY FUNCTION -------------------------------
  // Animasi cursor
  const cursor = <span className={`absolute w-1 h-5 border-l border-black animate-pulsate ${(!focusDiv || finish) && "hidden"}`}></span>

  // Fungsi untuk menghandle user mengetik
  const handleType = (e) => {
    // Mulai waktu tepat saat mengetik huruf pertama
    if(cursorPos == 0 && timerSec == 0){
      setTimer(t => "start")
    }

    // Jika pada state finish
    if(timer == "finish" || timer == "stop"){
      return
    }


    let currentCursorPos = cursorPos // Variabel posisi kursor untuk menghindari effect react cycle
    if(e.key == " "){  // Handling space
      // Loncat setiap huruf sampai kata selanjutnya
      let cursorPosTemp = cursorPos
      let salahKetikTemp = []
      while(textArr[cursorPosTemp] != " " && cursorPosTemp < textArr.length){
        salahKetikTemp.push(cursorPosTemp)
        cursorPosTemp++
        }
        cursorPosTemp++
      setSalahKetik(sk => [...sk, ...salahKetikTemp])
      currentCursorPos = cursorPosTemp
      setCursorPos(cursorPos => cursorPosTemp)

    }else if(e.key == "Backspace"){ // handling backspace
      if(cursorPos == 0){ // Jika pada posisi kursor 0 maka langsung return
        return
      }

      if(salahKetik.includes(cursorPos - 1)){ // Hapus index salah ketik pada huruf yang dibackspace
        salahKetik.splice(salahKetik.indexOf(cursorPos - 1), 1)
      } 
      currentCursorPos = cursorPos - 1
      setCursorPos(cursorPos => cursorPos - 1)

    }else if(e.key !=  textArr[cursorPos]){ // handling salah ketik
      setSalahKetik(sk => [...sk, cursorPos])
      currentCursorPos = cursorPos + 1
      setCursorPos(cp => cp + 1)
    
    }else{ // handling anything else
      currentCursorPos = cursorPos + 1
      setCursorPos(cp => cp + 1)
    }


    // Jika sudah finish
    if(currentCursorPos >= textArr.length){
      setCursorPos(cp => 999999999)
      setFinish(f => true)
      setTimer(t => "stop")

    }
  }

  // Restart test
  const restartTest = () => {
    setFinish(f => false)
    setCursorPos(cp => 0)
    setSalahKetik(sk => [])
    setFocusDiv(fd => true)
    setTimer(t => "restart")
  }

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

  // Menghitung kecepatan mengetik dalam wpm (words per minute)
  // todo
  const calculateWPM = () => {
    // gross wpm = (all typed letters / 5) / time 
    // net wpm = gross wpm  -  (uncorrected errors / time)
    const timeMin = timerSec / 60
    const grossWpm = (textArr.length / 5) / timeMin
    let netWpm = Math.max(0, Math.ceil(grossWpm - (salahKetik.length / timeMin)));
    return netWpm
  }



  // ------------------------------- Section khusus handling div focus -------------------------------
  // Untuk memfokuskan saat typing div diklik
  const handleClick = (e) => {
    setFocusDiv(fc => !fc)
  }
    
  useEffect(() => {
    if(focusDiv){
      typingDivRef.current.focus()
    }else{
      typingDivRef.current.blur()
    }
  }, [focusDiv])


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

  // Merender text sesuai dengan action user dan kondisi text sebelumnya
  let progressText = text.split("").map((letter, i) => {
    if(i == cursorPos){
      if(salahKetik.includes(i)){
        return <span>{cursor}<span className="text-red-500">{letter}</span></span>
      }
      return <span>{cursor}<span>{letter}</span></span>
    }else{
      if(salahKetik.includes(i)){
        return <span className="text-red-500">{letter}</span>
      }
      return <span>{letter}</span>
    }
  })

  // Result card
  let resultCard;
  if(finish){
    resultCard = <div className="text-xl px-3 py-2 mr-2 border border-black rounded-md w-28">{calculateWPM()} WPM</div>;
  }

  return (
   <div className="block max-w-3xl mx-auto mt-10">

    <div className="flex mb-2 items-center">
      <MdOutlineRestartAlt className="border border-black rounded-md text-5xl hover:cursor-pointer hover:bg-slate-200 mr-2" onClick={restartTest}></MdOutlineRestartAlt>
      
      <div className="text-xl px-3 py-2 border border-black rounded-md">
        {timerSec}
      </div>
    </div>

    <div 
      ref={typingDivRef}
      tabIndex="0"  
      onKeyDown={handleType} 
      onClick={handleClick} 
      className={`${focusDiv ? "border-2" : "border"} border-black mb-2 rounded-md px-3 py-2 `}>
      {progressText}
    </div>

    <div className="">
      {finish && resultCard}
    </div>


   </div>
  );
}
