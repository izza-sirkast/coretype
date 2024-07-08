import React from "react";

function ChooseTime({ testSettings, setTestSettings, timer }) {
  const handleChange = (event) => {
    setTestSettings((ts) => ({ ...ts, timeMode: event.target.value }));
  };

  return (
    <div className="">
      {timer !== "start" && (
        <div className="flex py-2 gap-2">
          <label className="text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="15"
              checked={testSettings.timeMode === "15"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.timeMode === "15" ? "font-bold text-white" : ""
              }`}
            >
              15
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="30"
              checked={testSettings.timeMode === "30"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.timeMode === "30" ? "font-bold text-white" : ""
              }`}
            >
              30
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="60"
              checked={testSettings.timeMode === "60"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.timeMode === "60" ? "font-bold text-white" : ""
              }`}
            >
              60
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="120"
              checked={testSettings.timeMode === "120"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.timeMode === "120" ? "font-bold text-white" : ""
              }`}
            >
              120
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default ChooseTime;
