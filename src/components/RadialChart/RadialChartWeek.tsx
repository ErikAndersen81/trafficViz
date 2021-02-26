import React from "react";
import * as chroma from "chroma.ts";
import Slice from "./Slice";

const RadialChartWeek = (props: { values: Array<number> }) => {
  const { values } = { ...props };
  const colorScale = chroma.scale("Purples").classes(5);
  const inner = values
    .map((val) => colorScale(val).toString())
    .map((color, offset) => (
      <Slice
        key={"slice" + offset}
        {...{ color, offset: offset + 1, radius: 49, nSlices: 7 }}
      />
    ));

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const outerXs = [65, 85, 77, 50, 23, 15, 35];
  const outerYs = [15, 40, 73, 86, 73, 40, 15];
  const clock = days.map((x, idx) => (
    <g key={"clock" + idx}>
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={8}
        x={outerXs[idx]}
        y={outerYs[idx]}>
        {x}
      </text>
    </g>
  ));
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 100 100">
      <metadata id="metadata1">image/svg+xml</metadata>
      <circle fill="black" cx="50" cy="50" r="50" />
      {inner}
      <circle fill="white" cx="50" cy="50" r="23" />
      {clock}
    </svg>
  );
};

export default RadialChartWeek;