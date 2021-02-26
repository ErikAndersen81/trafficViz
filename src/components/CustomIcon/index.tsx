import { DivIcon, Point } from "leaflet";
import React from "react";
import ReactDOMServer from "react-dom/server";

const CustomIcon = (size: number, svg: JSX.Element) => {
  const markup = ReactDOMServer.renderToStaticMarkup(svg);
  return new DivIcon({
    html: markup,
    className: "Transparency",
    iconSize: new Point(size, size),
    iconAnchor: new Point(size / 2, size / 2),
  });
};

type StandardMarkerProps = {
  color: string;
  letter: string;
};

export const StandardMarker = (props: StandardMarkerProps) => {
  const { color, letter } = { ...props };
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg">
      <circle fill="black" cx="50" cy="50" r="50" />
      <circle fill={color} cx="48" cy="48" r="47" />
      <text
        color="black"
        x="50"
        y="50"
        fontSize="50"
        fontFamily="sans-serif"
        dominantBaseline="middle"
        textAnchor="middle"
        fontWeight="bold">
        {letter}
      </text>
    </svg>
  );
};

export default CustomIcon;
