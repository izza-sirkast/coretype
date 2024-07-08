import React from "react";

function ChooseDifficulty({ testSettings, setTestSettings, timer }) {
  const handleChange = (event) => {
    setTestSettings((ts) => ({ ...ts, difficulty: event.target.value }));
  };

  return (
    <div className="">
      {timer !== "start" && (
        <div className="flex py-1 gap-2">
          <label className="block text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="Easy"
              checked={testSettings.difficulty === "Easy"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.difficulty === "Easy" ? "font-bold text-white" : ""
              }`}
            >
              Easy
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="block text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="Medium"
              checked={testSettings.difficulty === "Medium"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.difficulty === "Medium"
                  ? "font-bold text-white"
                  : ""
              }`}
            >
              Medium
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="block text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="Hard"
              checked={testSettings.difficulty === "Hard"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.difficulty === "Hard" ? "font-bold text-white" : ""
              }`}
            >
              Hard
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default ChooseDifficulty;
