import React from "react";

export const RadialChart24H = () => {
  const inner = [
    "#edf8fb",
    "#ccece6",
    "#99d8c9",
    "#66c2a4",
    "#2ca25f",
    "#006d2c",
    "#edf8fb",
    "#ccece6",
    "#99d8c9",
    "#66c2a4",
    "#2ca25f",
    "#006d2c",
  ].map((color, offset) => (
    <Slice {...{ color, offset, radius: 35, nSlices: 12 }} />
  ));
  const outer = [
    "#66c2a4",
    "#2ca25f",
    "#006d2c",
    "#edf8fb",
    "#ccece6",
    "#99d8c9",
    "#66c2a4",
    "#2ca25f",
    "#006d2c",
    "#edf8fb",
    "#ccece6",
    "#99d8c9",
  ].map((color, offset) => (
    <Slice {...{ color, offset, radius: 49, nSlices: 12 }} />
  ));

  const innerTimes = [12, 3, 6, 9];
  const innerXs = [50, 60, 50, 40];
  const innerYs = [40, 50, 60, 50];
  const clock = innerTimes.map((x, idx) => (
    <text
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
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100">
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

type SliceProps = {
  color: string;
  radius: number;
  offset: number;
  nSlices: number;
};

const Slice = (props: SliceProps) => {
  const { color, offset, radius, nSlices } = { ...props };
  const strokeWidth = radius / 2;
  const realRadius = radius - strokeWidth / 2;
  const sliceWidth = (2 * Math.PI * realRadius) / nSlices;

  return (
    <circle
      fill="none"
      transform="rotate(-90, 50, 50)"
      stroke={color}
      strokeWidth={strokeWidth}
      cx="50"
      cy="50"
      r={realRadius}
      strokeDasharray={`${sliceWidth} ${sliceWidth * (nSlices - 1)}`}
      strokeDashoffset={offset * sliceWidth}
    />
  );
};

export const RadialChartWeek = () => {
  const slices = [
    "#feebe2",
    "#fcc5c0",
    "#fa9fb5",
    "#f768a1",
    "#dd3497",
    "#ae017e",
    "#7a0177",
  ].map((color, offset) => (
    <Slice {...{ color, offset, radius: 49, nSlices: 7 }} />
  ));
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const outerXs = [65, 85, 77, 50, 23, 15, 35];
  const outerYs = [15, 40, 73, 86, 73, 40, 15];
  const clock = days.map((x, idx) => (
    <g>
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
      width="100"
      height="100">
      <circle fill="black" cx="50" cy="50" r="50" />
      {slices}
      <circle fill="white" cx="50" cy="50" r="23" />
      {clock}
    </svg>
  );
};
