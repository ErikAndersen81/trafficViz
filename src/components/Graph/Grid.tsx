import React from "react";

type GridProps = {
  maxVal: number;
  slice: number;
  scalar_x: number;
  scalar_y: number;
  dates: Array<Date>;
};

const Grid = (props: GridProps) => {
  const { maxVal, slice, scalar_x, scalar_y, dates } = { ...props };
  let dateTicks = [0, 0.25, 0.5, 0.75].map(
    (i: number) => dates[Math.floor(dates.length * i)]
  );
  const dateLines = [0, 0.25, 0.5, 0.75, 1].map((i: number) => (
    <path
      d={`M ${i * slice * scalar_x} 100 L ${i * slice * scalar_x} 102 `}
      id={"dateLine" + i}
      key={"dateLine" + i}
      className="dateLine"
    />
  ));

  const dateLabels = [0, 0.25, 0.5, 0.75].map((i: number, idx: number) => (
    <text
      x={i * slice * scalar_x}
      textAnchor="end"
      dominantBaseline="text-before-edge"
      y={100}
      id={"dateLabel" + i}
      key={"dateLabel" + i}
      className="dateLabel">
      {dates.length > 48 * 4
        ? dateTicks[idx].toLocaleDateString().substring(0, 5)
        : dateTicks[idx].toLocaleTimeString().substring(0, 5)}
    </text>
  ));

  const hLines = [0, 0.25, 0.5, 0.75, 1].map((i: number) => (
    <path
      d={`M 0 ${100 - i * maxVal * scalar_y} L ${slice * scalar_x} ${
        100 - i * maxVal * scalar_y
      }`}
      id={"hLine" + i}
      key={"hLine" + i}
      className="hLine"
    />
  ));

  const hLabels = [0, 0.25, 0.5, 0.75, 1].map((i: number) => (
    <text
      x="0"
      className="hLabel"
      key={"hLabel" + i}
      y={100 - maxVal * i * scalar_y}>
      {` ${maxVal * i}`}
    </text>
  ));

  return (
    <>
      {hLines}
      {hLabels}
      {dateLines}
      {dateLabels}
    </>
  );
};

export default Grid;
