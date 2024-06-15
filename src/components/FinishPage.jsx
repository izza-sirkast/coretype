import React from 'react'

import NavBar from './NavBar'
import RestartButton from './buttons/RestartButton'

import { calculateWPM } from '@/library/functionality'


function FinishPage({timeMode, cursorPos, salahKetik, salahKetikKelebihan, setFinish, setCursorPos, setSalahKetik, setSalahKetikKelebihan, setFocusDiv, setTimer}) {
  return (
    <div className="w-full max-h-screen min-h-screen gradient-bg">
        <NavBar />
        <div className="text-xl px-3 py-2 border border-white text-white mt-28 rounded-md w-28 mx-auto ">{calculateWPM(timeMode, cursorPos, salahKetik, salahKetikKelebihan)} WPM</div>
        <div className='flex justify-center mt-5'>
          <RestartButton setFinish={setFinish} setCursorPos={setCursorPos} setSalahKetik={setSalahKetik} setSalahKetikKelebihan={setSalahKetikKelebihan} setFocusDiv={setFocusDiv} setTimer={setTimer}  />
        </div>
    </div>
  )
}

export default FinishPage