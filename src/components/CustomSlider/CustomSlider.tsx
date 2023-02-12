import React from "react";
import ReactSlider, { ReactSliderProps } from "react-slider";

import { useStyles } from "../../hooks/useStyles";
import styles from "./CustomSlider.module.scss";

type Props = ReactSliderProps & {
  min: number;
  max: number;
  value: number;
  borderColor?: string;
  colorThumb?: string;
};

export const CustomSlider: React.FC<Props> = ({
  min,
  max,
  value,
  borderColor,
  colorThumb,
  ...rest
}) => {
  const cx = useStyles(styles);

  return (
    <ReactSlider
      className={cx(["slider", borderColor])}
      thumbClassName={cx(["thumb", colorThumb])}
      trackClassName={cx("track")}
      value={value}
      min={min}
      max={max}
      {...rest}
    />
  );
};
