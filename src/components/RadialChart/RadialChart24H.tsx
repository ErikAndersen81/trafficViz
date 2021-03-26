import React from "react";
import Slice from "./Slice";
import * as chroma from "chroma.ts";

const RadialChart24H = (props: { values: Array<number>; title: string }) => {
  const { values, title } = { ...props };
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

  const clockTicks = ["12 pm", 3, 6, 9];
  const clockXs = [50, 90, 50, 10];
  const clockYs = [10, 50, 90, 50];
  const clock = clockTicks.map((x, idx) => (
    <text
      key={"clockText" + idx}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={10}
      x={clockXs[idx]}
      y={clockYs[idx]}>
      {clockTicks[idx]}
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
        fontSize={10}>
        am
      </text>

      <text
        textAnchor="middle"
        dominantBaseline="middle"
        x="50"
        y="50"
        fontWeight="bold"
        fontSize="12">
        {title}
      </text>
    </svg>
  );
};

export default RadialChart24H;
