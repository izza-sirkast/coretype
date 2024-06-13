import React, { useState } from 'react'

function ChooseLanguage({language, setLanguage}) {
    const [openOptions, setOpenOptions] = useState(false)

    const languageOptions = ["Indonesia", "English"]

    const handleClick = (language) => {
        setLanguage(l => language)
        setOpenOptions(op => false)
    }

  return (
    <div className=''>
        <div className="text-xl px-3 py-2 border border-black rounded-md hover:cursor-pointer hover:bg-slate-200 select-none" onClick={() => setOpenOptions(op => !op)}>
            {language}
        </div>
        {openOptions &&
        <div className='absolute py-1 bg-white border border-black mt-1 rounded-md w-28'>

            <button 
                className={`hover:bg-slate-200 px-2 w-full text-left rounded-md ${language == "Indonesia" && "bg-slate-200"}`} onClick={() => handleClick("Indonesia")}>
                    <p className='ml-2'>Indonesia</p>
            </button>

            <button 
                className={`hover:bg-slate-200 px-2 w-full text-left rounded-md ${language == "English" && "bg-slate-200"}`} onClick={() => handleClick("English")}>
                    <p className='ml-2'>English</p>
            </button>

        </div>
        }
    </div>
  )
}

export default ChooseLanguage