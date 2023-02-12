import { PauseIcon, PlayIcon, SettingIcon, BackIcon } from "../../icons";

const dictionary = {
  pause: PauseIcon,
  play: PlayIcon,
  setting: SettingIcon,
  back: BackIcon,
};

type IconTypes = keyof typeof dictionary;

export { dictionary };
export type { IconTypes };
