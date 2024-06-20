import React, { useState } from 'react'

function ChooseLanguage({testSettings, setTestSettings, timer}) {
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
        if(timer == "start"){
            return
        }else{
            setTestSettings(ts => ({...ts, language:testSettingsInput}))
            setOpenOptions(op => false)
        }
    }
  return (
    <div className=''>
        <div className={`text-xl px-3 py-2 border border-white text-white rounded-md ${timer != "start" ? "hover:bg-white hover:bg-opacity-20 hover:cursor-pointer" : "bg-white bg-opacity-30"} select-none`} onClick={() => handleClickOpenOptions()}>
            {testSettings.language}
        </div>
        {openOptions &&
        <div className='absolute py-1 bg-white border border-black mt-1 rounded-md w-28'>

            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.language == "Indonesia" && "bg-slate-400"}`} onClick={() => handleClick("Indonesia")}>
                    <p className='ml-2'>Indonesia</p>
            </button>

            <button 
                className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.language == "English" && "bg-slate-400"}`} onClick={() => handleClick("English")}>
                    <p className='ml-2'>English</p>
            </button>

        </div>
        }
    </div>
  )
}

export default ChooseLanguage