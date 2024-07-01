// import React, { useState } from 'react'

// function ChooseTime({testSettings, setTestSettings, timer}) {
//     const [openOptions, setOpenOptions] = useState(false)

//     if(timer == "start" && openOptions){
//         setOpenOptions(op => false)
//     }

//     const handleClickOpenOptions = () => {
//         if(timer == "start"){
//             return
//         }

//         setOpenOptions(op => !op)
//     }

//     const handleClick = (timeInput) => {
//         setTestSettings(ts => ({...ts, timeMode:timeInput}))
//         setOpenOptions(op => false)
//     }

//   return (
//     <div className=''>
//         <div className={`text-xl px-3 py-2 border border-white text-white rounded-md ${timer != "start" ? "hover:bg-white hover:bg-opacity-20 hover:cursor-pointer" : "bg-white bg-opacity-30"} select-none`} onClick={() => handleClickOpenOptions()}>
//             {testSettings.timeMode} Seconds
//         </div>

//         {openOptions &&
//         <div className='absolute py-1 bg-white border border-black mt-1 rounded-md w-32'>

//             <button
//                 className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.timeMode== "15" && "bg-slate-400"}`} onClick={() => handleClick("15")}>
//                     <p className='ml-2'>15 Seconds</p>
//             </button>

//             <button
//                 className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.timeMode == "30" && "bg-slate-400"}`} onClick={() => handleClick("30")}>
//                     <p className='ml-2'>30 Seconds</p>
//             </button>

//             <button
//                 className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.timeMode == "60" && "bg-slate-400"}`} onClick={() => handleClick("60")}>
//                     <p className='ml-2'>60 Seconds</p>
//             </button>

//             <button
//                 className={`hover:bg-slate-400 px-2 w-full text-left rounded-md ${testSettings.timeMode == "120" && "bg-slate-400"}`} onClick={() => handleClick("120")}>
//                     <p className='ml-2'>120 Seconds</p>
//             </button>

//         </div>
//         }
//     </div>
//   )
// }

// export default ChooseTime

import React from "react";

function ChooseTime({ testSettings, setTestSettings, timer }) {
  const handleChange = (event) => {
    setTestSettings((ts) => ({ ...ts, timeMode: event.target.value }));
  };

  return (
    <div className="">
      {timer !== "start" && (
        <div className="flex py-1 gap-2">
          <label className="block text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="15"
              checked={testSettings.difficulty === "15"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`${
                testSettings.difficulty === "15" ? "font-bold text-white" : ""
              }`}
            >
              15 Second
            </span>
          </label>
          <p className="text-slate-300">|</p>
          <label className="block text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="30"
              checked={testSettings.difficulty === "30"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`${
                testSettings.difficulty === "30" ? "font-bold text-white" : ""
              }`}
            >
              30 Second
            </span>
          </label>
          <p className="text-slate-300">|</p>
          <label className="block text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="60"
              checked={testSettings.difficulty === "60"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`${
                testSettings.difficulty === "60" ? "font-bold text-white" : ""
              }`}
            >
              60 Second
            </span>
          </label>
          <p className="text-slate-300">|</p>
          <label className="block text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="120"
              checked={testSettings.difficulty === "120"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`${
                testSettings.difficulty === "120" ? "font-bold text-white" : ""
              }`}
            >
              120 Second
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default ChooseTime;
