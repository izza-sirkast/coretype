"use client"

import { useEffect, useRef, useState } from "react"
import { MdOutlineRestartAlt } from "react-icons/md";

export default function Home() {
  // ------------------------------- STATES // VARIABLES DEFINITION -------------------------------
  const [cursorPos, setCursorPos] = useState(0)  // Posisi kursor untuk saat ini
  const [salahKetik, setSalahKetik] = useState([]) // Index huruf yang salah ketik
  const [focusDiv, setFocusDiv] = useState(true) // Untuk mentogle fokus typing div
  const [finish, setFinish] = useState(false) // State game apakah selesai atau belum
  const typingDivRef = useRef() // Untuk me-ref typing div

  const text = "dengan menggunakan semua yang aku di dengan rumah menggunakan hati tanpa kasihan dengan tangan yang semua mati makan melakukan tidak batu sekolah tebal bersih"
  const textArr = text.split("")



  // ------------------------------- INTERACTIVITY FUNCTION -------------------------------
  // Animasi cursor
  const cursor = <span className={`absolute w-1 h-5 border-l border-black animate-pulsate ${(!focusDiv || finish) && "hidden"}`}></span>

  // Fungsi untuk menghandle user mengetik
  const handleType = (e) => {
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
      setCursorPos(cursorPos => cursorPosTemp)

    }else if(e.key == "Backspace"){ // handling backspace
      if(cursorPos == 0){ // Jika pada posisi kursor 0 maka langsung return
        return
      }

      if(salahKetik.includes(cursorPos - 1)){ // Hapus index salah ketik pada huruf yang dibackspace
        salahKetik.splice(salahKetik.indexOf(cursorPos - 1), 1)
      } 
      setCursorPos(cursorPos => cursorPos - 1)

    }else if(e.key !=  textArr[cursorPos]){ // handling salah ketik
      setSalahKetik(sk => [...sk, cursorPos])
      setCursorPos(cp => cp + 1)
    
    }else{ // handling anything else
      setCursorPos(cp => cp + 1)
    }


    // Jika sudah finish
    if(cursorPos + 1 >= textArr.length){
      console.log(finish)
      setCursorPos(cp => 999999999)
      setFinish(f => true)
    }
  }

  // Restart test
  const restartTest = () => {
    setFinish(f => false)
    setCursorPos(cp => 0)
    setSalahKetik(sk => [])
    setFocusDiv(fd => true)
  }

  // Menghitung kecepatan mengetik dalam wpm (words per minute)
  // todo
  const calculateWPM = () => {
    const everyWords = text.split(" ")
    return 72
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
      {finish && resultCard}
      <MdOutlineRestartAlt className="border border-black rounded-md text-5xl hover:cursor-pointer hover:bg-slate-200" onClick={restartTest}></MdOutlineRestartAlt>
    </div>

    <div 
      ref={typingDivRef}
      tabIndex="0"  
      onKeyDown={handleType} 
      onClick={handleClick} 
      className={`border-black rounded-md px-3 py-2 ${focusDiv ? "border-2" : "border"}`}>
      {progressText}
    </div>

   </div>
  );
}
