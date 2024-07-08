import React from "react";
import { IoMdUndo } from "react-icons/io";
import { MdOutlineRestartAlt } from "react-icons/md";
import { getWords1000 } from "@/library/textProvider";

function RestartButton({
  setFinish,
  setCursorPos,
  setSalahKetik,
  setSalahKetikKelebihan,
  setFocusDiv,
  setTimer,
  setStatsOverTime,
  setSalahKetikSemuaCount,
  size,
  setText,
  language,
  difficulty,
  restartType,
}) {
  // Restart test
  const restartTest = () => {
    setFinish((f) => false);
    setCursorPos((cp) => 0);
    setSalahKetik((sk) => []);
    setSalahKetikKelebihan((skk) => {
      return { count: 0 };
    });
    setFocusDiv((fd) => true);
    setStatsOverTime((sot) => [["Time", "WPM", "Raw"]]);
    setTimer((t) => "restart");
    setSalahKetikSemuaCount((skc) => 0);
  };

  const handleNewTest = () => {
    getWords1000(setText, language, difficulty);
    restartTest();
  };

  if (restartType === "new test") {
    return (
      <MdOutlineRestartAlt
        className={`text-slate-300 text-2xl cursor-pointer hover:text-white hover:text-bold transition ease-in-out`}
        onClick={handleNewTest}
        title="Start a new test"
      />
    );
  }

  return (
    <IoMdUndo
      className={`text-slate-300 text-2xl cursor-pointer hover:text-white hover:text-bold transition ease-in-out`}
      onClick={restartTest}
      title="Restart current test"
    />
  );
}

export default RestartButton;
