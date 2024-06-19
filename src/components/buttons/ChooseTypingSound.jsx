import React, { useState } from 'react'

function ChooseTypingSound({typingSound, setTypingSound, timer}) {
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

    const handleClick = (typingSoundInput) => {
        setTypingSound(d => typingSoundInput)
        setOpenOptions(op => false)
    }

  return (
    <div className='flex items-start'>
        <div className={`text-xl px-3 py-2 border border-white text-white rounded-md ${timer != "start" ? "hover:bg-white hover:bg-opacity-20 hover:cursor-pointer" : "bg-white bg-opacity-30"} select-none mr-1`} onClick={() => handleClickOpenOptions()}>
            {typingSound}
        </div>

        {openOptions &&
        <div className='py-1 bg-white border border-black rounded-md w-36'>

            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${typingSound == "Mechanical" && "bg-slate-400"}`} onClick={() => handleClick("Mechanical")}>
                    <p className='ml-2'>Mechanical</p>
            </button>

            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${typingSound == "Regular" && "bg-slate-400"}`} onClick={() => handleClick("Regular")}>
                    <p className='ml-2'>Regular</p>
            </button>
           
            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${typingSound == "Tick Machine" && "bg-slate-400"}`} onClick={() => handleClick("Tick Machine")}>
                    <p className='ml-2'>Tick Machine</p>
            </button>
            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${typingSound == "Ugh (Minecraft)" && "bg-slate-400"}`} onClick={() => handleClick("Ugh (Minecraft)")}>
                    <p className='ml-2'>Ugh (Minecraft)</p>
            </button>
            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${typingSound == "Augh" && "bg-slate-400"}`} onClick={() => handleClick("Augh")}>
                    <p className='ml-2'>Augh</p>
            </button>

        </div>
        }
    </div>
  )
}

export default ChooseTypingSound