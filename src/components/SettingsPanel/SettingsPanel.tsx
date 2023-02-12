import React, { useContext, useEffect } from "react";
import { SettingsContext } from "../../context/SettingsContext";

import { useStyles } from "../../hooks/useStyles";
import { Button } from "../Button";

import { CustomSlider } from "../CustomSlider/CustomSlider";

import styles from "./SettingsPanel.module.scss";

export const SettingsPanel: React.FC = () => {
  const cx = useStyles(styles);
  const settingsInfo = useContext(SettingsContext);
  const storage = localStorage;

  useEffect(() => {
    const workMinuts: number = Number(storage.getItem("workMinuts")) || 0;
    const breakMinuts: number = Number(storage.getItem("breakMinuts")) || 0;

    settingsInfo.setWorkMinuts(workMinuts);
    settingsInfo.setBreakMinuts(breakMinuts);
  }, []);

  useEffect(() => {
    storage.setItem("workMinuts", JSON.stringify(settingsInfo.workMinuts));
    storage.setItem("breakMinuts", JSON.stringify(settingsInfo.breakMinuts));
  }, [settingsInfo.workMinuts, settingsInfo.breakMinuts, storage]);

  return (
    <div style={{ textAlign: "left" }}>
      <label className={cx("text")}>
        work minuts: {settingsInfo.workMinuts}:00
      </label>
      <CustomSlider
        value={settingsInfo.workMinuts}
        max={120}
        min={1}
        onChange={(value) => settingsInfo.setWorkMinuts(value)}
        borderColor="red"
        colorThumb="red"
      />
      <label className={cx("text")}>
        breake minuts: {settingsInfo.breakMinuts}:00
      </label>
      <CustomSlider
        value={settingsInfo.breakMinuts}
        max={120}
        min={1}
        onChange={(value) => settingsInfo.setBreakMinuts(value)}
        borderColor="green"
        colorThumb="green"
      />
      <div style={{ marginTop: "20px" }}>
        <Button
          sizeIcon='xl'
          typeIcon="back"
          text="Back"
          isBack
          onClick={settingsInfo.cancelSettingsPanel}
        />
      </div>
    </div>
  );
};
