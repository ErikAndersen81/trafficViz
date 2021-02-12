import React from "react";
import { Interval } from "../Context/DateTimeContext";
import { FitToChart, Scale } from "../Scaling";

type GridProps = {
  scale: Scale;
  dates: Array<Date>;
  interval: Interval;
};

const Grid = (props: GridProps) => {
  const { scale, dates, interval } = { ...props };
  if (interval === "day" && dates[5 * 16] === undefined) return null;
  if (interval === "week" && dates[7 * 96] === undefined) return null;
  let xTicks =
    interval === "day"
      ? Array(6)
          .fill(0)
          .map((_, idx) => `${dates[idx * 16].toTimeString().substring(0, 5)}`)
      : Array(7)
          .fill(0)
          .map((_, idx) => `${dates[idx * 96].toDateString().substring(0, 3)}`);

  const dateLabels = xTicks.map((d: string, idx: number, a) => (
    <g key={`DateGroup${idx}`}>
      <path
        d={`M ${(100 / a.length) * idx} 100 L ${
          0.5 + (100 / a.length) * idx
        } 103 `}
        id={"dateLine" + idx}
        key={"dateLine" + idx}
        stroke="black"
        strokeLinecap="round"
        strokeWidth={0.6}
      />
      <rect
        key={`rect${idx}`}
        fill="black"
        x={(100 / a.length) * idx}
        y={101}
        ry={2}
        rx={2}
        width={10}
        height={4}></rect>
      <text
        x={5 + (100 / a.length) * idx}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={3}
        fill="white"
        y={103}
        id={"dateLabel" + idx}
        key={"dateLabel" + idx}>
        {d}
      </text>
    </g>
  ));

  const hLines = scale.ticks.map((i: number) =>
    i === 0 ? null : (
      <path
        d={`M 0 ${FitToChart(i, 100, scale)} L 0 ${FitToChart(i, 100, scale)}`}
        id={"hLine" + i}
        key={"hLine" + i}
        stroke="black"
        strokeLinecap="round"
        strokeWidth={0.7}
      />
    )
  );

  const hLabels = scale.ticks.map((i: number) =>
    i === 0 ? null : (
      <text
        x="-.5"
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={3}
        key={"hLabel" + i}
        y={FitToChart(i, 100, scale)}>
        {` ${i}`}
      </text>
    )
  );

  return (
    <>
      <path
        d="M 0 100 L 100 100 L 98 99 M 100 100 L 98 101"
        fillOpacity="0"
        strokeWidth=".5"
        stroke="black"></path>
      {hLines}
      {hLabels}
      {dateLabels}
    </>
  );
};

export default Grid;
