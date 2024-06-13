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
    <MdOutlineRestartAlt className="border border-black rounded-md text-5xl hover:cursor-pointer hover:bg-slate-200 mr-2" onClick={restartTest}></MdOutlineRestartAlt>
  )
}

export default RestartButton