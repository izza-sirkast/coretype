import React from 'react'
import { MdOutlineRestartAlt } from 'react-icons/md'
import { GrNext } from 'react-icons/gr'
import { getWords1000 } from '@/library/textProvider'

function RestartButton({setFinish, setCursorPos, setSalahKetik, setSalahKetikKelebihan, setFocusDiv, setTimer, setStatsOverTime, setSalahKetikSemuaCount, size, setText, language, difficulty, restartType}) {

    // Restart test
  const restartTest = () => {
    setFinish(f => false)
    setCursorPos(cp => 0)
    setSalahKetik(sk => [])
    setSalahKetikKelebihan(skk => {return {count:0}})
    setFocusDiv(fd => true)
    setStatsOverTime(sot => ([["Time", "WPM", "Raw"]]))
    setTimer(t => "restart")
    setSalahKetikSemuaCount(skc => 0)
  }

  const handleNewTest = () => {
    getWords1000(setText, language, difficulty)
    restartTest()
  }


  if(restartType == "new test"){
    return (
      <GrNext className={`border border-white text-white rounded-md text-${size}xl  hover:cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all ease-in mr-2`} onClick={handleNewTest}></GrNext>
    )
  }

  return (
    <MdOutlineRestartAlt className={`border border-white text-white rounded-md text-${size}xl  hover:cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all ease-in mr-2`} onClick={restartTest}></MdOutlineRestartAlt>
  )
}

export default RestartButton