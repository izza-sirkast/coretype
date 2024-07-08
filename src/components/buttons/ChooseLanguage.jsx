import React from "react";

function ChooseLanguage({ testSettings, setTestSettings, timer }) {
  const handleChange = (event) => {
    setTestSettings((ts) => ({ ...ts, language: event.target.value }));
  };

  return (
    <div className="">
      {timer !== "start" && (
        <div className="flex py-1 gap-2">
          <label className="block text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="Indonesia"
              checked={testSettings.language === "Indonesia"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.language === "Indonesia"
                  ? "font-bold text-white"
                  : ""
              }`}
            >
              Indonesia
            </span>
          </label>
          <p className="text-slate-300 cursor-default">|</p>
          <label className="block text-slate-300 cursor-pointer">
            <input
              type="radio"
              value="English"
              checked={testSettings.language === "English"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`hover:font-bold hover:text-white ${
                testSettings.language === "English"
                  ? "font-bold text-white"
                  : ""
              }`}
            >
              English
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default ChooseLanguage;
