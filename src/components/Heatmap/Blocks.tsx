import React from "react";
import * as chroma from "chroma.ts";

type BlocksProps = {
  matrix: Array<Array<number | null>>;
  gridSize: number;
};

const Blocks = (props: BlocksProps) => {
  const { matrix, gridSize } = { ...props };
  const colorScale = chroma.scale(['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b']).classes(100);
  const maxVal = matrix
    .flat()
    .map((x) => (x !== null ? x : 0))
    .reduce((acc, val) => (val < acc ? acc : val));

  return (
    <>
      {matrix.map((row, i) => {
        return (
          <g key={"row" + i}>
            {row.map((val, j) => (
              <Block
                key={"b" + j}
                x={gridSize * i}
                y={gridSize * j}
                size={gridSize}
                color={
                  val !== null ? colorScale(val / maxVal).toString() : null
                }
              />
            ))}
          </g>
        );
      })}
    </>
  );
};

type BlockProps = {
  x: number;
  y: number;
  color: string | null;
  size: number;
};

const Block = (props: BlockProps) => {
  const { x, y, color, size } = { ...props };
  if (color === null) return <NanBlock x={x} y={y} size={size} />;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} fill={color} />
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        stroke="#ffe0dd"
        strokeWidth={0.5}
        fillOpacity={0}
      />
    </g>
  );
};

type NanBlockProps = {
  x: number;
  y: number;
  size: number;
};

const NanBlock = (props: NanBlockProps) => {
  const { x, y, size } = { ...props };
  return (
    <g>
      <line
        stroke={"gray"}
        strokeWidth={0.3}
        x1={x}
        x2={x + size}
        y1={y}
        y2={y + size}
      />
      <line
        stroke={"gray"}
        strokeWidth={0.3}
        x2={x}
        x1={x + size}
        y1={y}
        y2={y + size}
      />
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        stroke="white"
        strokeWidth={1}
        fillOpacity={0}
      />
    </g>
  );
};
export default Blocks;
