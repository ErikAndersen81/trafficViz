import { LeafletMouseEvent } from "leaflet";
import React, { useContext } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { DateTimeContext, HighlightContext } from "../Context";
import CustomIcon from "../CustomIcon";
import { CoordinatesType } from "../Hooks/useData";
import RadialChart from "../RadialChart";

type IntersectionMarkerProps = {
  coordinates?: CoordinatesType;
  name: string;
  data: Array<number | null>;
  handleIntersectionClick: (event: LeafletMouseEvent) => void;
};

const IntersectionMarker = (props: IntersectionMarkerProps) => {
  const { name, coordinates, data, handleIntersectionClick } = {
    ...props,
  };
  const Highlight = useContext(HighlightContext);
  const { starttime, interval } = useContext(DateTimeContext);
  if (!coordinates || !data) return null;
  const handleIntersectionHover = (event: LeafletMouseEvent) => {
    if (event.type === "mouseover") {
      (Highlight as any).setHighlighted(props.name);
    } else {
      (Highlight as any).setHighlighted("");
    }
  };
  const offset =
    interval === "day" ? starttime.getHours() : 1 + starttime.getDay();
  const icon = CustomIcon(
    90,
    <RadialChart values={data} interval={interval} offset={offset} />
  );
  return (
    <Marker
      position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
      icon={icon}
      weight={1.5}
      color={(Highlight as any).highlighted === name ? "white" : "black"}
      fillOpacity={0.5}
      onMouseOver={handleIntersectionHover}
      onMouseOut={handleIntersectionHover}
      onclick={handleIntersectionClick}></Marker>
  );
};

export default IntersectionMarker;