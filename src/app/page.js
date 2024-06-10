"use client"

import { useState } from "react"

export default function Home() {
  const [cursorPos, setCursorPos] = useState(0)  // Posisi kursor untuk saat ini
  const [salahKetik, setSalahKetik] = useState([]) // Index huruf yang salah ketik

  const text = "dengan menggunakan semua yang aku di dengan rumah menggunakan hati tanpa kasihan dengan tangan yang semua mati makan melakukan tidak batu sekolah tebal bersih"
  const textArr = text.split("")

  const handleType = (e) => {
    if(e.key == " "){ 
      let cursorPosTemp = cursorPos
      let salahKetikTemp = []
      while(textArr[cursorPosTemp] != " "){
        salahKetikTemp.push(cursorPosTemp)
        cursorPosTemp++
        }
        cursorPosTemp++
      setSalahKetik(sk => [...sk, ...salahKetikTemp])
      setCursorPos(cursorPos => cursorPosTemp)
    }else if(e.key !=  textArr[cursorPos]){
      setSalahKetik(sk => [...sk, cursorPos])
      setCursorPos(cp => cp + 1)
    }else{
      setCursorPos(cp => cp + 1)
    }
  }

  const cursor = <span className="absolute w-1 h-5 border-l border-black animate-pulsate"></span>

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

  return (
   <div className="block max-w-3xl mx-auto mt-10">
    <div autoFocus={true} tabIndex="0" className="border border-black rounded-md px-3 py-2" onKeyDown={handleType}>
      {progressText}
    </div>
   </div>
  );
}
