import React, {useEffect} from 'react'

import { generateProgressText } from '@/library/functionality'

const TypingTestBox = React.forwardRef(({cursorPos, setCursorPos, salahKetik, setSalahKetik, salahKetikKelebihan, setSalahKetikKelebihan, focusDiv, setFocusDiv, finish, setFinish, timerSec, setTimerSec, timer, setTimer, text, typingDivRef}) => {

    const textArr = text.split("")

    // Animasi cursor
    const cursor = <span className={`absolute w-1 h-5 border-l border-black animate-pulsate ${(!focusDiv || finish) && "hidden"}`}></span>

    const handleType = (e) => {
        // Mulai waktu tepat saat mengetik huruf pertama
        if(cursorPos == 0 && timerSec == 0){
          setTimer(t => "start")
        }
    
        // Jika pada state finish
        if(timer == "finish" || timer == "stop"){
          return
        }
    
        // Jika salah ketik pada tempat yang harusnya spasi
        if(textArr[cursorPos] == " " && e.key != " " && e.key != "Backspace"){
          if(!(/^[a-z0-9]+$/i.test(e.key)) || e.key.length > 1){
            setSalahKetikKelebihan(sk => {
              let newSKK = {...sk}
              newSKK["count"] += 1
              return newSKK
            })
            return
          }
    
          setSalahKetikKelebihan(sk => {
            let newSKK = {...sk}
    
            if(cursorPos in sk){
              newSKK[cursorPos] += e.key
            }else{
              newSKK[cursorPos] = e.key
            }
    
            newSKK["count"] += 1
            return newSKK
          })
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
    
          if(cursorPos in salahKetikKelebihan){ // Jika pada salah ketik kelebihan
            setSalahKetikKelebihan(sk => {
              let newSKK = {...sk}
              let sequence = newSKK[cursorPos].split("")
              sequence.pop()
              newSKK[cursorPos] = sequence.join("")
              if(sequence.length < 1){
                delete newSKK[cursorPos]
              }
              return newSKK
            })
            return
          }else if(salahKetik.includes(cursorPos - 1)){ // Hapus index salah ketik pada huruf yang dibackspace
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

    // Merender text sesuai dengan action user dan kondisi text sebelumnya
    let progressText = generateProgressText(text, cursorPos, salahKetik, cursor, salahKetikKelebihan) // fungsi dari library/functionality

  return (
    <div 
      ref={typingDivRef}
      tabIndex="0"  
      onKeyDown={handleType} 
      onClick={handleClick} 
      className={`${focusDiv ? "border-2" : "border"} border-black mb-2 rounded-md px-3 py-2 select-none`}>
      {progressText}
    </div>
  )
})

export default TypingTestBox