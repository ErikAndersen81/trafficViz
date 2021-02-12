import React, { useContext, useState } from "react";
import { HighlightContext } from "../Context";
import { Group, GroupType, IntersectionData, LaneData } from "../Hooks/useData";
import { FitToChart, readFromChart, Scale } from "../Scaling";

type PathsProps = {
  data: Group;
  group: GroupType;
  scale: Scale;
  xInterval: number;
  dates: Array<Date>;
};

const Paths = (props: PathsProps) => {
  const { data, group, scale, xInterval, dates } = { ...props };
  const paths = Array.from(
    data
  ).map(([intersection, intersectionData], idx) => (
    <GroupPaths
      xInterval={xInterval}
      values={intersectionData}
      key={"GroupPath" + group + intersection}
      name={intersection}
      color={colors[idx]}
      dash={dashes[group]}
      scale={scale}
      dates={dates}
    />
  ));

  return <>{paths}</>;
};

type GroupPathsProps = {
  values: IntersectionData;
  name: string;
  color: string;
  scale: Scale;
  dash: string;
  xInterval: number;
  dates: Array<Date>;
};

const GroupPaths = (props: GroupPathsProps) => {
  const { values, color, name, scale, dash, xInterval, dates } = { ...props };
  let paths = Array.from(values).map(([lane, laneData]) => (
    <Path
      values={laneData}
      xInterval={xInterval}
      name={name}
      key={"Paths" + lane}
      scale={scale}
      dates={dates}
    />
  ));

  return (
    <g stroke={color} strokeDasharray={dash}>
      {paths}
    </g>
  );
};

type PathProps = {
  values: LaneData;
  name: string;
  scale: Scale;
  xInterval: number;
  dates: Array<Date>;
};

const Path = (props: PathProps) => {
  const { values, name, scale, xInterval, dates } = { ...props };
  const [popupInfo, setPopupInfo] = useState<PopupInfo>({
    x: -100,
    y: -100,
    value: 0,
    time: "",
    intersection: "",
  });
  const Highlight = useContext(HighlightContext);
  const calc_x = (i: number) => i * xInterval;
  const calc_y = (i: number) => FitToChart(i, 100, scale);
  let path = "";
  let newLine = true;
  let command = "M ";
  let readNull = false;
  values.forEach((value, index) => {
    readNull = value ? false : true;
    command = newLine || readNull ? "M " : "L ";
    path =
      path + command + calc_x(index) + " " + calc_y(value ? value : 0) + " ";
    newLine = value ? false : true;
  });

  const handleIntersectionHover = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    if (event.type === "mouseover") {
      (Highlight as any).setHighlighted(name);
      event.persist();
      const matrix = event.currentTarget.getScreenCTM();
      if (matrix !== null) {
        const { e, f } = matrix
          .inverse()
          .translate(event.clientX, event.clientY);
        setPopupInfo(() => {
          return {
            x: e,
            y: f,
            value: readFromChart(Math.floor(f), 100, scale),
            intersection: name,
            time:
              dates.length < 100
                ? dates[Math.floor((dates.length / 100) * e)]
                    .toTimeString()
                    .substring(0, 5)
                : dates[Math.floor((dates.length / 100) * e)]
                    .toDateString()
                    .substring(0, 3),
          };
        });
      }
    } else {
      (Highlight as any).setHighlighted("");
    }
  };
  const classes =
    Highlight.highlighted === props.name ? "path highlighted" : "path";

  return (
    <g>
      <path
        d={path}
        onMouseOver={handleIntersectionHover}
        onMouseOut={handleIntersectionHover}
        className={classes}
        key="path"
      />
      <Popup {...popupInfo} />
    </g>
  );
};

type PopupInfo = {
  x: number;
  y: number;
  intersection: string;
  value: number;
  time: string;
};

const Popup = (props: PopupInfo) => {
  const { x, y, value, time, intersection } = { ...props };
  return (
    <g className={"GraphPopup"}>
      <rect
        x={x}
        y={y}
        rx="2%"
        ry="2%"
        width={25}
        height={15}
        strokeWidth=".2"
        fill="orange"
        fillOpacity=".6"></rect>
      <circle
        cx={x}
        cy={y}
        stroke="black"
        fillOpacity="0"
        r=".2"
        fill="black"></circle>
      <text x={x + 8} y={y + 3} fontWeight="bold" fontSize={3}>
        {intersection}
      </text>
      <text x={x + 1} y={y + 6} fontSize={3}>
        {time}
      </text>
      <text x={x + 1} y={y + 10} fontSize={3}>
        Passings: {value}
      </text>
    </g>
  );
};

const colors = [
  "#558b2f",
  "#f8c471",
  "#a5d6a7",
  "#ef9a9a",
  "#a9cce3",
  "#FFF9c4",
  "#616161",
  "#bbdefb",
  "#ffcdd2",
  "#33691e",
];

const dashes = {
  mean: ".5 .2",
  median: ".3",
  aggregated: "",
};
export default Paths;
