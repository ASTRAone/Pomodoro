import React from "react";

import { useStyles } from "../../hooks/useStyles";
import styles from "./Button.module.scss";

import { IconTypes } from "../icon/IconDictionary";
import { Icon } from "../icon";
import { Size } from "../../types/common";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  typeIcon?: IconTypes;
  text?: string;
  isSetting?: boolean;
  isBack?: boolean;
  sizeIcon?: Size;
};

export const Button: React.FC<Props> = ({
  typeIcon,
  text = "",
  isSetting = false,
  isBack = false,
  sizeIcon,
  ...restProps
}) => {
  const cx = useStyles(styles);

  return (
    <button
      className={cx([
        "button",
        isSetting ? "settings" : "",
        isBack ? "back" : "",
      ])}
      {...restProps}
    >
      {typeIcon && <Icon type={typeIcon} size={sizeIcon} />}
      <span>{text}</span>
    </button>
  );
};
