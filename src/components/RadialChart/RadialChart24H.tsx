import React from "react";
import Slice from "./Slice";
import * as chroma from "chroma.ts";

const RadialChart24H = (props: { values: Array<number> }) => {
  let { values } = { ...props };
  const colorScale = chroma.scale("Purples").classes(24);
  const inner = values
    .slice(0, 12)
    .map((val) => colorScale(val).toString())
    .map((color, offset) => (
      <Slice
        key={"innerSlice" + offset}
        {...{ color, offset, radius: 35, nSlices: 12 }}
      />
    ));
  const outer = values
    .slice(12)
    .map((val) => colorScale(val).toString())
    .map((color, offset) => (
      <Slice
        key={"outerSlice" + offset}
        {...{ color, offset, radius: 49, nSlices: 12 }}
      />
    ));

  const innerTimes = [12, 3, 6, 9];
  const innerXs = [50, 60, 50, 40];
  const innerYs = [40, 50, 60, 50];
  const clock = innerTimes.map((x, idx) => (
    <text
      key={"clockText" + idx}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={8}
      x={innerXs[idx]}
      y={innerYs[idx]}>
      {innerTimes[idx]}
    </text>
  ));
  return (
    <svg
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100">
      <rect x="0" y="0" height="100" width="100" fillOpacity="0" />
      <circle fill="black" cx="50" cy="50" r="50" />
      {outer}
      {inner}
      <circle fill="white" cx="50" cy="50" r="16" />
      {clock}
      <text
        x={50}
        y={25}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={6}>
        AM
      </text>
      <text
        x={50}
        y={9}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={6}>
        PM
      </text>
    </svg>
  );
};

export default RadialChart24H;
