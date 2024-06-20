import React, { useState } from 'react'

function ChooseDifficulty({testSettings, setTestSettings, timer}) {
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

    const handleClick = (testSettingsInput) => {
        setTestSettings(ts => ({...ts, difficulty:testSettingsInput}))
        setOpenOptions(op => false)
    }

  return (
    <div className=''>
        <div className={`text-xl px-3 py-2 border border-white text-white rounded-md ${timer != "start" ? "hover:bg-white hover:bg-opacity-20 hover:cursor-pointer" : "bg-white bg-opacity-30"} select-none`} onClick={() => handleClickOpenOptions()}>
            {testSettings.difficulty}
        </div>

        {openOptions &&
        <div className='absolute py-1 bg-white border border-black mt-1 rounded-md w-28'>

            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.difficulty == "Easy" && "bg-slate-400"}`} onClick={() => handleClick("Easy")}>
                    <p className='ml-2'>Easy</p>
            </button>

            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.difficulty == "Medium" && "bg-slate-400"}`} onClick={() => handleClick("Medium")}>
                    <p className='ml-2'>Medium</p>
            </button>
           
            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.difficulty == "Hard" && "bg-slate-400"}`} onClick={() => handleClick("Hard")}>
                    <p className='ml-2'>Hard</p>
            </button>

        </div>
        }
    </div>
  )
}

export default ChooseDifficulty