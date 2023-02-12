import React, { useContext, useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SettingsContext } from "../../context/SettingsContext";

import useSound from "use-sound";

import boopSfx from "../../sounds/work.mp3";

import { Button } from "../Button";

const red = "#f54e4e";
const green = "#4aec8c";

type Mode = "work" | "break" | null;

export const Timer: React.FC = () => {
  const settingsInfo = useContext(SettingsContext);
  const storage = localStorage;

  const [isPaused, setIsPaused] = useState<Boolean>(false);
  const [mode, setMode] = useState<Mode>("break");
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const reloadRef = useRef(false);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const [play, { stop }] = useSound(boopSfx, {
    volume: 0.25,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const switchMode = () => {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      (nextMode === "work"
        ? settingsInfo.workMinuts
        : settingsInfo.breakMinuts) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;

    storage.setItem("mode", JSON.stringify(nextMode));
    storage.setItem("secondsLeft", JSON.stringify(nextSeconds));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initTimer = () => {
    setSecondsLeft(settingsInfo.workMinuts * 60);
  };

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
    storage.setItem("secondsLeft", JSON.stringify(secondsLeftRef.current));
  };

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinuts * 60
      : settingsInfo.breakMinuts * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = Number(`0${seconds}`);

  useEffect(() => {
    if (minutes === 0 && seconds === 0 && reloadRef.current === true) {
      setIsPaused(true);
      isPausedRef.current = true;
      play();
    }
    reloadRef.current = true;
  }, [minutes, seconds, reloadRef]);

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${minutes} :  ${seconds < 10 ? "0" : ""}${seconds}`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          trailColor: "rgba(255, 255, 255, .2)",
        })}
      />
      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <Button
            typeIcon="play"
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <Button
            typeIcon="pause"
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button
          onClick={settingsInfo.openSettingsPanel}
          typeIcon="setting"
          sizeIcon="xl"
          text="Settings"
          isSetting
        />
      </div>
    </div>
  );
};

export type { Mode };
