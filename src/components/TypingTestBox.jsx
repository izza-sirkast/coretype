import React, {useEffect} from 'react'

import { generateProgressText } from '@/library/functionality'

const TypingTestBox = React.forwardRef((props, ref) => {
    const {cursorPos, setCursorPos, salahKetik, setSalahKetik, salahKetikKelebihan, setSalahKetikKelebihan, focusDiv, setFocusDiv, finish, setFinish, timerSec, setTimerSec, timer, setTimer, text, timeMode} = props
    const textArr = text.split("")

    // Animasi cursor
    const cursor = <span className={`absolute mt-1 h-6 border-l-2 border-white animate-pulsate ${(!focusDiv || finish) && "hidden"} ${!focusDiv}`}></span>

    const handleType = (e) => {
        // Mulai waktu tepat saat mengetik huruf pertama
        if(cursorPos == 0 && timerSec == parseInt(timeMode)){
          console.log("tes")
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
    
      }

      if(ref.current){
        // console.log(ref.current.offsetWidth)

      }

    const handleClick = (e) => {
        setFocusDiv(fc => !fc)
    }

    useEffect(() => {
        if(focusDiv){
            ref.current.focus()
        }else{
            ref.current.blur()
        }
    }, [focusDiv])

    // Merender text sesuai dengan action user dan kondisi text sebelumnya
    let containerWidth = ref.current ? ref.current.offsetWidth : 50 
    let progressText = generateProgressText(text, cursorPos, salahKetik, cursor, salahKetikKelebihan, containerWidth) // fungsi dari library/functionality

  return (
    <div 
      ref={ref}
      tabIndex="0"  
      onKeyDown={handleType} 
      onClick={handleClick} 
      className={`overflow-y-hidden overflow-hidden text-2xl outline-none rounded-2xl px-8 py-4 select-none text-white bg-slate-300 bg-opacity-10 testcontainer-length mx-auto`}>
      {progressText}
    </div>
  )
})

export default TypingTestBox