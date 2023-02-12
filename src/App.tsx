import React, { useState } from "react";

import { useStyles } from "./hooks/useStyles";
import { Timer } from "./components/Timer";
import { SettingsPanel } from "./components/SettingsPanel";

import { SettingsContext } from "./context/SettingsContext";

import styles from "./App.module.scss";

function App() {
  const cx = useStyles(styles);
  const storage = localStorage;
  const workMinutsLC: number = Number(storage.getItem("workMinuts"));
  const breakMinutsLC: number = Number(storage.getItem("breakMinuts"));

  const [showSettings, setShowSettings] = useState(false);
  const [workMinuts, setWorkMinuts] = useState(workMinutsLC);
  const [breakMinuts, setBreakMinuts] = useState(breakMinutsLC);

  const openSettingsPanel = () => setShowSettings(true);
  const cancelSettingsPanel = () => setShowSettings(false);

  return (
    <main className={cx("main")}>
      <SettingsContext.Provider
        value={{
          showSettings,
          workMinuts,
          breakMinuts,
          setWorkMinuts,
          setBreakMinuts,
          openSettingsPanel,
          cancelSettingsPanel,
        }}
      >
        {showSettings ? <SettingsPanel /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
