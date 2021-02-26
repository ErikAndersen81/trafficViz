import React from "react";

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
      strokeDashoffset={(offset + 1) * sliceWidth}
    />
  );
};

export default Slice;
