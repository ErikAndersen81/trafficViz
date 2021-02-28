import React from "react";
import { Interval } from "../Context/DateTimeContext";
import { FitToChart, Scale } from "../Scaling";

type GridProps = {
  scale: Scale;
  dates: Array<Date>;
  interval: Interval;
};

const getXTicksWeek = (dates: Array<Date>): Array<string> => {
  const mod = Math.floor(dates.length / 7);
  return dates
    .filter((_, i) => i % mod === 0)
    .map((date) => date.toDateString().substring(0, 3));
};

const getXTicksDay = (dates: Array<Date>): Array<string> => {
  const mod = Math.floor(dates.length / 8);
  return dates
    .filter((_, i) => i % mod === 0)
    .map((date) => date.toTimeString().substring(0, 5));
};

const Grid = (props: GridProps) => {
  const { scale, dates, interval } = { ...props };
  if (dates.length <= 0) return null;
  let xTicks = interval === "day" ? getXTicksDay(dates) : getXTicksWeek(dates);

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
