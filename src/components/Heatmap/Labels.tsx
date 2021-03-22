import React from "react";

type LabelsProps = {
  columns: Array<string>;
  rows: Array<string>;
  gridSize: number;
};

const Labels = (props: LabelsProps) => {
  const { gridSize, columns, rows } = { ...props };
  const offset = gridSize / 2;
  return (
    <>
      {rows.map((txt, idx) => (
        <g
          key={"txtrow" + txt}
          transform={`rotate(-45,${idx * gridSize + offset}, 101)`}>
          <text
            textAnchor="end"
            fontSize={2}
            x={idx * gridSize + offset}
            y={101}>
            {txt}
          </text>
        </g>
      ))}
      {columns.map((txt, idx) => (
        <g key={"txtcol" + txt}>
          <text
            textAnchor="end"
            fontSize={2}
            x={-2}
            y={idx * gridSize + offset}>
            {txt}
          </text>
        </g>
      ))}
    </>
  );
};

export default Labels;
