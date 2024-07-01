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
