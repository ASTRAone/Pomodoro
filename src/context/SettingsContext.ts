import React from "react";

type Props = {
  workMinuts: number;
  breakMinuts: number;
  showSettings: boolean;
  setWorkMinuts: (value: number) => void;
  setBreakMinuts: (value: number) => void;
  openSettingsPanel: () => void;
  cancelSettingsPanel: () => void;
};

export const SettingsContext = React.createContext<Props>({
  showSettings: false,
  workMinuts: 0,
  breakMinuts: 0,
  setWorkMinuts: () => {},
  setBreakMinuts: () => {},
  openSettingsPanel: () => {},
  cancelSettingsPanel: () => {},
});
