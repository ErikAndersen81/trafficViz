import React from "react";
import { FitToChart, Scale } from "../Scaling";

type GridProps = {
  scale: Scale;
  dates: Array<Date>;
};

const Grid = (props: GridProps) => {
  const { scale, dates } = { ...props };
  let dateTicks = [0, 0.25, 0.5, 0.75].map(
    (i: number) => dates[Math.floor(dates.length * i)]
  );
  const dateLines = [0, 25, 50, 75].map((i: number) => (
    <path
      d={`M ${i} 100 L ${0.5 + i} 103 `}
      id={"dateLine" + i}
      key={"dateLine" + i}
      stroke="black"
      strokeLinecap="round"
      strokeWidth={0.6}
    />
  ));

  const dateLabels = [0, 25, 50, 75].map((i: number, idx: number) => (
    <g key={`DateGroup${idx}`}>
      <rect
        key={`rect${idx}`}
        fill="black"
        x={i}
        y={101}
        ry={2}
        rx={2}
        width={10}
        height={4}></rect>
      <text
        x={5 + i}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={3}
        fill="white"
        y={103}
        id={"dateLabel" + i}
        key={"dateLabel" + i}>
        {dates.length > 48 * 4
          ? dateTicks[idx].toLocaleDateString().substring(0, 5)
          : dateTicks[idx].toLocaleTimeString().substring(0, 5)}
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
      {dateLines}
      {dateLabels}
    </>
  );
};

export default Grid;
