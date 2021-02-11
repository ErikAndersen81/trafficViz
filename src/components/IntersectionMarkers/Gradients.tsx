import React from "react";

type GradientProps = {
  values: Array<{ name: string; aboves: number; belows: number }>;
};

const Gradients = (props: GradientProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      {props.values.map((k) => (
        <Fill key={k.name} name={k.name} aboves={k.aboves} belows={k.belows} />
      ))}
    </svg>
  );
};

type FillProps = {
  name: string;
  aboves: number;
  belows: number;
};

const Fill = (props: FillProps) => (
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`bgGradient${props.name}`}>
        <stop offset={props.belows + "%"} stopColor="yellow" />
        <stop offset={props.belows + "%"} stopColor="blue" />
        <stop offset={100 - props.aboves + "%"} stopColor="blue" />
        <stop offset={100 - props.aboves + "%"} stopColor="red" />
      </radialGradient>
    </defs>
  </svg>
);

export default Gradients;
