import React from "react";
import { Interval } from "../Context/DateTimeContext";
import { StandardMarker } from "../CustomIcon";
import RadialChart24H from "./RadialChart24H";
import RadialChartWeek from "./RadialChartWeek";

export type RadialChartProps = {
  values: Array<number | null>;
  interval: Interval;
  offset: number;
};

const RadialChart = (props: RadialChartProps) => {
  const { values, interval, offset } = { ...props };
  if (
    values.length === 0 ||
    values.reduce((acc, val) => convertNull(acc) + convertNull(val)) === 0
  )
    return <StandardMarker color="gray" letter="!" />;
  if (interval === "day") {
    return <RadialChart24H values={prepValues(values, offset)} />;
  }
  return <RadialChartWeek values={prepValues(values, offset)} />;
};

const prepValues = (values: Array<number | null>, offset: number) => {
  let vals = values.map((x) => convertNull(x));
  vals = minMaxNormalize(vals);
  console.log(vals);
  vals = vals.slice(offset).concat(vals.slice(0, offset));
  vals.reverse();
  return vals;
};

const convertNull = (val: number | null, median?: number): number => {
  if (median !== undefined) {
    return val === null ? median : val;
  }
  return val === null ? 0 : val;
};

const getMedian = (values: Array<number | null>): number => {
  let vals = values.filter((x) => x !== null) as Array<number>;
  vals.sort();
  return vals[Math.floor(vals.length / 2)];
};

const minMaxNormalize = (values: Array<number>) => {
  const { min, max } = getMinMaxValue(values);
  return values.map((val) => (val - min) / (max - min + 0.000001));
};

const getMinMaxValue = (values: Array<number>) => {
  const max = values.reduce((max, x) => (x < max ? max : x));
  const min = values.reduce((min, x) => (x > min ? min : x));
  return { min, max };
};

export default RadialChart;
