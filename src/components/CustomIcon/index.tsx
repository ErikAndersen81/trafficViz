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

type SimpleIconProps = {
  color: string;
  text: string;
  selected?: boolean;
};

export const SimpleIcon = (props: SimpleIconProps) => {
  const { color, text, selected } = { ...props };
  const fontSize = text.length === 1 ? 50 : 30;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg">
      {selected ? <circle fill="grey" cx="48" cy="48" r="48" /> : <circle fill="black" cx="52" cy="52" r="48" />}
      <circle fill={color} cx="50" cy="50" r="46" />
      <text
        color="black"
        x="50"
        y="50"
        fontSize={fontSize}
        fontFamily="sans-serif"
        dominantBaseline="middle"
        textAnchor="middle"
        fontWeight="bold">
        {text}
      </text>
    </svg>
  );
};

export default CustomIcon;
