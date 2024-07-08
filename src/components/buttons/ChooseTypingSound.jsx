import React from "react";

function ChooseTypingSound({ testSettings, setTestSettings, timer }) {
  const handleChange = (event) => {
    setTestSettings((ts) => ({ ...ts, typingSound: event.target.value }));
  };

  return (
    <div className="">
      {timer !== "start" && (
        <div className="flex py-1 gap-3">
          <label className="text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="Mechanical"
              checked={testSettings.typingSound === "Mechanical"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.typingSound === "Mechanical"
                  ? "font-bold text-white"
                  : ""
              }`}
            >
              Mechanical
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="Regular"
              checked={testSettings.typingSound === "Regular"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.typingSound === "Regular"
                  ? "font-bold text-white"
                  : ""
              }`}
            >
              Regular
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="Tick Machine"
              checked={testSettings.typingSound === "Tick Machine"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.typingSound === "Tick Machine"
                  ? "font-bold text-white"
                  : ""
              }`}
            >
              Tick Machine
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="Augh"
              checked={testSettings.typingSound === "Augh"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.typingSound === "Augh"
                  ? "font-bold text-white"
                  : ""
              }`}
            >
              Augh
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="Qwack"
              checked={testSettings.typingSound === "Qwack"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.typingSound === "Qwack"
                  ? "font-bold text-white"
                  : ""
              }`}
            >
              Qwack
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="Wack"
              checked={testSettings.typingSound === "Wack"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.typingSound === "Wack"
                  ? "font-bold text-white"
                  : ""
              }`}
            >
              Wack
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="block text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="No Sound"
              checked={testSettings.typingSound === "No Sound"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.typingSound === "No Sound"
                  ? "font-bold text-white"
                  : ""
              }`}
            >
              No Sound
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default ChooseTypingSound;
