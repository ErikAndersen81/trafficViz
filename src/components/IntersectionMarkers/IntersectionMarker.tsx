import { LeafletMouseEvent } from "leaflet";
import React, { useContext } from "react";
import { CircleMarker, Tooltip } from "react-leaflet";
import { HighlightContext } from "../Context";
import { CoordinatesType } from "../Hooks/useData";

type IntersectionMarkerProps = {
  coordinates?: CoordinatesType;
  name: string;
  measurements: number;
  size: number;
  handleIntersectionClick: (event: LeafletMouseEvent) => void;
  aboves: number;
  belows: number;
};

const IntersectionMarker = (props: IntersectionMarkerProps) => {
  const coords = props.coordinates;
  const Highlight = useContext(HighlightContext);
  if (!coords) return null;
  const handleIntersectionHover = (event: LeafletMouseEvent) => {
    if (event.type === "mouseover") {
      (Highlight as any).setHighlighted(props.name);
    } else {
      (Highlight as any).setHighlighted("");
    }
  };
  /* Size is traffic intensity relative to the number of measurements */
  const radius = (props.size / props.measurements) * 0.1;
  /* Set gradient as percentage of outliers below and above means, respectively */
  const aboves = props.aboves * 100;
  const belows = props.belows * 100;
  if (isNaN(aboves) || isNaN(belows)) return null;

  return (
    <CircleMarker
      center={{ lat: coords.latitude, lng: coords.longitude }}
      radius={radius + 1}
      className="circle"
      weight={1.5}
      color={(Highlight as any).highlighted === props.name ? "white" : "black"}
      fillOpacity={0.5}
      fillColor={"url(#bgGradient" + aboves + belows + ")"}
      onMouseOver={handleIntersectionHover}
      onMouseOut={handleIntersectionHover}
      onclick={props.handleIntersectionClick}>
      <Tooltip>
        <h3>{props.name}</h3>

        <p>Number of passings: {props.size} </p>

        <p>Measurements: {props.measurements}</p>

        <p>Measurements &gt; &mu; + 3&sigma;: {props.aboves}</p>

        <p>Measurements &lt; &mu; - 3&sigma;: {props.belows}</p>
      </Tooltip>
    </CircleMarker>
  );
};

export default IntersectionMarker;
