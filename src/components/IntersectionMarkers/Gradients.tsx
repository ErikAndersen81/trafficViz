import React from "react";

type GradientProps = {
  values: Array<{ aboves: number; belows: number }>;
};

const Gradients = (props: GradientProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      {props.values.map((k) => (
        <Fill aboves={k.aboves} belows={k.belows} />
      ))}
    </svg>
  );
};

type FillProps = {
  aboves: number;
  belows: number;
};

const Fill = (props: FillProps) => (
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={"bgGradient" + props.aboves + props.belows}>
        <stop offset={props.belows + "%"} stopColor="yellow" />
        <stop offset={props.belows + "%"} stopColor="blue" />
        <stop offset={100 - props.aboves + "%"} stopColor="blue" />
        <stop offset={100 - props.aboves + "%"} stopColor="red" />
      </radialGradient>
    </defs>
  </svg>
);

export default Gradients;
