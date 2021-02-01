import React, { useContext } from "react";
import { HighlightContext } from "../Context";
import { Group, GroupType, IntersectionData, LaneData } from "../Hooks/useData";

type PathsProps = {
  data: Group;
  group: GroupType;
  scalar_x: number;
  scalar_y: number;
};

const Paths = (props: PathsProps) => {
  const { data, group, scalar_y, scalar_x } = { ...props };
  const paths = Array.from(
    data
  ).map(([intersection, intersectionData], idx) => (
    <GroupPaths
      values={intersectionData}
      key={"GroupPath" + group + intersection}
      name={group + intersection}
      color={colors[idx]}
      dash={dashes[group]}
      scalar_x={scalar_x}
      scalar_y={scalar_y}
    />
  ));

  return <>{paths}</>;
};

type GroupPathsProps = {
  values: IntersectionData;
  name: string;
  color: string;
  scalar_x: number;
  scalar_y: number;
  dash: string;
};

const GroupPaths = (props: GroupPathsProps) => {
  const { values, color, name, scalar_x, scalar_y, dash } = { ...props };
  let paths = Array.from(values).map(([lane, laneData]) => (
    <Path
      values={laneData}
      name={name}
      key={"Paths" + lane}
      scalar_x={scalar_x}
      scalar_y={scalar_y}
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
  scalar_x: number;
  scalar_y: number;
};

const Path = (props: PathProps) => {
  const { values, name, scalar_y, scalar_x } = { ...props };
  const Highlight = useContext(HighlightContext);
  const calc_x = (i: number) => i * scalar_x;
  const calc_y = (i: number) => 100 - i * scalar_y;
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
    } else {
      (Highlight as any).setHighlighted("");
    }
  };
  const classes =
    Highlight.highlighted === props.name ? "path highlighted" : "path";

  return (
    <path
      d={path}
      onMouseOver={handleIntersectionHover}
      onMouseOut={handleIntersectionHover}
      className={classes}
      key="path"
    />
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
