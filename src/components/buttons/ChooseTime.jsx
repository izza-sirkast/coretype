import React, { useState } from 'react'

function ChooseTime({testSettings, setTestSettings, timer}) {
    const [openOptions, setOpenOptions] = useState(false)

    if(timer == "start" && openOptions){
        setOpenOptions(op => false)
    }

    const handleClickOpenOptions = () => {
        if(timer == "start"){
            return 
        }

        setOpenOptions(op => !op)
    }

    const handleClick = (timeInput) => {
        setTestSettings(ts => ({...ts, timeMode:timeInput}))
        setOpenOptions(op => false)
    }

  return (
    <div className=''>
        <div className={`text-xl px-3 py-2 border border-white text-white rounded-md ${timer != "start" ? "hover:bg-white hover:bg-opacity-20 hover:cursor-pointer" : "bg-white bg-opacity-30"} select-none`} onClick={() => handleClickOpenOptions()}>
            {testSettings.timeMode} Seconds
        </div>

        {openOptions &&
        <div className='absolute py-1 bg-white border border-black mt-1 rounded-md w-32'>

            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.timeMode== "15" && "bg-slate-400"}`} onClick={() => handleClick("15")}>
                    <p className='ml-2'>15 Seconds</p>
            </button>

            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.timeMode == "30" && "bg-slate-400"}`} onClick={() => handleClick("30")}>
                    <p className='ml-2'>30 Seconds</p>
            </button>
           
            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.timeMode == "60" && "bg-slate-400"}`} onClick={() => handleClick("60")}>
                    <p className='ml-2'>60 Seconds</p>
            </button>

            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.timeMode == "120" && "bg-slate-400"}`} onClick={() => handleClick("120")}>
                    <p className='ml-2'>120 Seconds</p>
            </button>

        </div>
        }
    </div>
  )
}

export default ChooseTime