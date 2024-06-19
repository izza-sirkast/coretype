import React from "react";
import Chart from "react-google-charts";

import NavBar from "./NavBar";
import RestartButton from "./buttons/RestartButton";
import { GrNext } from "react-icons/gr";

import {
  calculateAccuracy,
  calculateGrossWPM,
  calculateWPM,
} from "@/library/functionality";

export const options = {
  title: "Typing Performance",
  curveType: "function",
  legend: {
    position: "bottom",
    textStyle: {
      color: "#FFF", // Change legend text color
      fontSize: 14, // Optional: set font size
    },
  },
  titleTextStyle: {
    color: "#FFF", // Change title text color
    fontSize: 18, // Optional: set font size
    bold: true, // Optional: make the title bold
  },
  backgroundColor: {
    fill: "transparent", // For transparency
    stroke: "#FFF", // Optional: color of the border
    strokeWidth: 0, // Optional: width of the border
  },
  hAxis: {
    textStyle: {
      color: "#FFF", // Change horizontal axis text color
      fontSize: 12, // Optional: set font size
    },
  },
  vAxis: {
    textStyle: {
      color: "#FFF", // Change vertical axis text color
      fontSize: 12, // Optional: set font size
    },
  },
  chartArea: {
    left: 20,
    right: 0,
  },
};

function FinishPage({
  language,
  difficulty,
  timeMode,
  cursorPos,
  salahKetik,
  salahKetikKelebihan,
  setFinish,
  setCursorPos,
  setSalahKetik,
  setSalahKetikKelebihan,
  setFocusDiv,
  setTimer,
  statsOverTime,
  setStatsOverTime,
  salahKetikSemuaCount,
  setSalahKetikSemuaCount,
}) {
  let wpm = calculateWPM(timeMode, cursorPos, salahKetik, salahKetikKelebihan);
  let grossWPM = calculateGrossWPM(timeMode, cursorPos, salahKetikKelebihan);
  let accuracy = calculateAccuracy(
    cursorPos,
    salahKetikSemuaCount,
    salahKetikKelebihan
  );
  return (
    <div className="w-full max-h-screen min-h-screen home-gradient">
      <NavBar />
      <div className="mx-auto flex justify-between items-start w-10/12 pr-5 mt-5">
        <div className="flex flex-col z-10 *:mb-10 ">
          <div className="flex flex-col items-center mt-8">
            <p className="text-2xl text-white">WPM</p>
            <span className="text-6xl text-light-blue -mt-1">{wpm}</span>
          </div>

          <div className="flex flex-col items-center ">
            <p className="text-2xl text-white">Raw</p>
            <span className="text-6xl text-light-blue -mt-1">{grossWPM}</span>
          </div>

          <div className="flex flex-col items-center ">
            <p className="text-2xl text-white">Accuracy</p>
            <span className="text-6xl text-light-blue -mt-1">{accuracy}%</span>
          </div>
        </div>
        <Chart
          chartType="LineChart"
          width="80%"
          height="400px"
          data={statsOverTime}
          options={options}
        />

        <div className="flex flex-col items-center justify-center mt-10 -ml-32 *:mb-12 ">
          <div className="flex flex-col items-start text-white">
            <p className="text-md text-light-blue">Test Setting:</p>
            <p className="text-sm">{language}</p>
            <p className="text-sm">{difficulty}</p>
            <p className="text-sm">{timeMode} Seconds</p>
          </div>

          <RestartButton
            size={"7"}
            setFinish={setFinish}
            setCursorPos={setCursorPos}
            setSalahKetik={setSalahKetik}
            setSalahKetikKelebihan={setSalahKetikKelebihan}
            setFocusDiv={setFocusDiv}
            setTimer={setTimer}
            setStatsOverTime={setStatsOverTime}
            setSalahKetikSemuaCount={setSalahKetikSemuaCount}
          />

          <GrNext
            className="border border-white text-white rounded-md text-7xl hover:cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all ease-in mr-2"
            onClick={() => {
              window.location.reload();
            }}
          ></GrNext>
        </div>
      </div>
    </div>
  );
}

export default FinishPage;
