import React, { useState } from 'react'

function ChooseDifficulty({difficulty, setDifficulty}) {
    const [openOptions, setOpenOptions] = useState(false)

    const handleClick = (difficulty) => {
        setDifficulty(d => difficulty)
        setOpenOptions(op => false)
    }

  return (
    <div className=''>
        <div className="text-xl px-3 py-2 border border-black rounded-md hover:cursor-pointer hover:bg-slate-200 select-none" onClick={() => setOpenOptions(op => !op)}>
            {difficulty}
        </div>

        {openOptions &&
        <div className='absolute py-1 bg-white border border-black mt-1 rounded-md w-28'>

            <button 
                className={`hover:bg-slate-200 px-2 w-full text-left rounded-md ${difficulty == "Easy" && "bg-slate-200"}`} onClick={() => handleClick("Easy")}>
                    <p className='ml-2'>Easy</p>
            </button>

            <button 
                className={`hover:bg-slate-200 px-2 w-full text-left rounded-md ${difficulty == "Medium" && "bg-slate-200"}`} onClick={() => handleClick("Medium")}>
                    <p className='ml-2'>Medium</p>
            </button>
           
            <button 
                className={`hover:bg-slate-200 px-2 w-full text-left rounded-md ${difficulty == "Hard" && "bg-slate-200"}`} onClick={() => handleClick("Hard")}>
                    <p className='ml-2'>Hard</p>
            </button>

        </div>
        }
    </div>
  )
}

export default ChooseDifficulty