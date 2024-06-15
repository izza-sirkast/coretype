import React from 'react'
import { MdOutlineRestartAlt } from 'react-icons/md'

function RestartButton({setFinish, setCursorPos, setSalahKetik, setSalahKetikKelebihan, setFocusDiv, setTimer}) {

    // Restart test
  const restartTest = () => {
    setFinish(f => false)
    setCursorPos(cp => 0)
    setSalahKetik(sk => [])
    setSalahKetikKelebihan(skk => {return {count:0}})
    setFocusDiv(fd => true)
    setTimer(t => "restart")
  }


  return (
    <MdOutlineRestartAlt className="border border-white text-white rounded-md text-5xl hover:cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all ease-in mr-2" onClick={restartTest}></MdOutlineRestartAlt>
  )
}

export default RestartButton