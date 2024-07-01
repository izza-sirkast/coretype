"use client";

import { useEffect, useRef, useState } from "react";

// Local library
import { getWords1000 } from "@/library/textProvider";
import { GrNext } from "react-icons/gr";

// Local components
import TypingTestBox from "@/components/TypingTestBox";
import RestartButton from "@/components/buttons/RestartButton";
import ChooseLanguage from "@/components/buttons/ChooseLanguage";
import ChooseDifficulty from "@/components/buttons/ChooseDifficulty";
import ChooseTime from "@/components/buttons/ChooseTime";
import ChooseTypingSound from "@/components/buttons/ChooseTypingSound";
import NavBar from "@/components/NavBar";
import FinishPage from "@/components/FinishPage";
import { updateStats } from "@/library/functionality";

export default function TypingTest() {
  // ------------------------------- STATES // VARIABLES DEFINITION -------------------------------
  const [text, setText] = useState("");
  const [cursorPos, setCursorPos] = useState(0); // Posisi kursor untuk saat ini
  const [salahKetik, setSalahKetik] = useState([]); // Index huruf yang salah ketik
  const [salahKetikSemuaCount, setSalahKetikSemuaCount] = useState(0);
  const [salahKetikKelebihan, setSalahKetikKelebihan] = useState({ count: 0 }); // Menyetor index salah ketik kelebihan huruf, seperti "tinggal" diketik jadi "tinggalp", nilai akan setor objek {index_p, "p"}
  const [focusDiv, setFocusDiv] = useState(true); // Untuk mentogle fokus typing div

  // ------- State untuk mengontrol test flow -------
  const [finish, setFinish] = useState(false); // State game apakah selesai atau belum
  const [timerSec, setTimerSec] = useState(30); // Timer dalam detik
  const [timer, setTimer] = useState("steady"); // status timer

  // Untuk menghitung kecepatan dan keakuratan mengetik sepanjang waktu mengetik
  const [statsOverTime, setStatsOverTime] = useState([["Time", "WPM", "Raw"]]);

  // Typing test settings
  const [testSettings, setTestSettings] = useState({
    language: "Indonesia",
    difficulty: "Easy",
    timeMode: "30",
    typingSound: "Mechanical",
  });

  const typingDivRef = useRef(); // Untuk me-ref typing div

  // Menyiapkan text dari file json
  useEffect(() => {
    getWords1000(setText, testSettings.language, testSettings.difficulty);
  }, []);

  useEffect(() => {
    getWords1000(setText, testSettings.language, testSettings.difficulty);
  }, [testSettings.language, testSettings.difficulty]);

  // Timer regulation
  useEffect(() => {
    let interval;
    if (timer == "start") {
      interval = setInterval(() => {
        setTimerSec((ts) => {
          return ts - 1;
        });
      }, 1000);
    } else if (timer == "stop") {
      clearInterval(interval);
    } else if (timer == "restart") {
      setTimerSec((ts) => parseInt(testSettings.timeMode));
      setTimer((t) => "steady");
    }

    return () => clearInterval(interval);
  }, [timer]);

  if (!finish && timer != "steady" && timer != "restart") {
    updateStats(
      testSettings.timeMode,
      timerSec,
      cursorPos,
      salahKetik,
      salahKetikKelebihan,
      statsOverTime,
      setStatsOverTime
    );
  }

  useEffect(() => {
    setTimerSec((ts) => parseInt(testSettings.timeMode));
  }, [testSettings.timeMode]);

  if (timerSec <= 0 && !finish) {
    setFinish((f) => true);
    setTimer((t) => "stop");
    setTimerSec((t) => parseInt(testSettings.timeMode));
  }

  // ------------------------------- Section khusus handling div focus -------------------------------
  // Untuk menghilakngkan fokus ke typing test div saat luar div diklik
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    setFocusDiv((fd) => false);
  };

  // Apabila test dalam keadaan finish atau selesai
  if (finish) {
    return (
      <FinishPage
        testSettings={testSettings}
        cursorPos={cursorPos}
        salahKetik={salahKetik}
        salahKetikKelebihan={salahKetikKelebihan}
        setFinish={setFinish}
        setCursorPos={setCursorPos}
        setSalahKetik={setSalahKetik}
        setSalahKetikKelebihan={setSalahKetikKelebihan}
        setFocusDiv={setFocusDiv}
        setTimer={setTimer}
        statsOverTime={statsOverTime}
        setStatsOverTime={setStatsOverTime}
        salahKetikSemuaCount={salahKetikSemuaCount}
        setSalahKetikSemuaCount={setSalahKetikSemuaCount}
        setText={setText}
      />
    );
  }
  return (
    <div className="w-full max-h-screen min-h-screen home-gradient">
      <NavBar />

      <div className="flex items-center mx-auto option-container-width mt-16 mb-5 px-2 justify-between">
        <div className="flex *:mr-3">
          <RestartButton
            size={"5"}
            setCursorPos={setCursorPos}
            setFinish={setFinish}
            setSalahKetik={setSalahKetik}
            setFocusDiv={setFocusDiv}
            setSalahKetikKelebihan={setSalahKetikKelebihan}
            setTimer={setTimer}
            setStatsOverTime={setStatsOverTime}
            setSalahKetikSemuaCount={setSalahKetikSemuaCount}
            language={testSettings.language}
            difficulty={testSettings.difficulty}
            setText={setText}
            restartType={"restart"}
          />

          <RestartButton
            size={"5"}
            setCursorPos={setCursorPos}
            setFinish={setFinish}
            setSalahKetik={setSalahKetik}
            setFocusDiv={setFocusDiv}
            setSalahKetikKelebihan={setSalahKetikKelebihan}
            setTimer={setTimer}
            setStatsOverTime={setStatsOverTime}
            setSalahKetikSemuaCount={setSalahKetikSemuaCount}
            language={testSettings.language}
            difficulty={testSettings.difficulty}
            setText={setText}
            restartType={"new test"}
          />

          <div className="text-xl px-3 py-2 border border-white text-white rounded-md">
            {timerSec}
          </div>
        </div>
        <ChooseTime
          testSettings={testSettings}
          setTestSettings={setTestSettings}
          timer={timer}
        />
      </div>

      <TypingTestBox
        cursorPos={cursorPos}
        setCursorPos={setCursorPos}
        salahKetik={salahKetik}
        setSalahKetik={setSalahKetik}
        salahKetikKelebihan={salahKetikKelebihan}
        setSalahKetikKelebihan={setSalahKetikKelebihan}
        focusDiv={focusDiv}
        setFocusDiv={setFocusDiv}
        finish={finish}
        timerSec={timerSec}
        timer={timer}
        setTimer={setTimer}
        text={text}
        ref={typingDivRef}
        timeMode={testSettings.timeMode}
        setSalahKetikSemuaCount={setSalahKetikSemuaCount}
        typingSound={testSettings.typingSound}
      />

      <div className="flex items-center mx-auto option-container-width mt-5 px-2 justify-between">
        <ChooseLanguage
          testSettings={testSettings}
          setTestSettings={setTestSettings}
          timer={timer}
        />

        <ChooseDifficulty
          testSettings={testSettings}
          setTestSettings={setTestSettings}
          timer={timer}
        />
      </div>
      <div className="flex justify-center">
        <ChooseTypingSound
          testSettings={testSettings}
          setTestSettings={setTestSettings}
          timer={timer}
        />
      </div>
    </div>
  );
}
