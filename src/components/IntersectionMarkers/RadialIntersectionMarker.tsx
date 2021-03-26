import { LeafletMouseEvent } from "leaflet";
import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import { DateTimeContext, HighlightContext, IntersectionContext } from "../Context";
import { addOrRemove } from "../Context/IntersectionContext";
import CustomIcon from "../CustomIcon";
import { CoordinatesType } from "../Hooks/useData";
import RadialChart from "../RadialChart";
import SimpleIntersectionMarker from "./SimpleIntersectionMarker";

type IntersectionMarkerProps = {
  coordinates?: CoordinatesType;
  name: string;
  data: Array<number | null>;
};

const RadialIntersectionMarker = (props: IntersectionMarkerProps) => {
  const { name, coordinates, data } = {
    ...props,
  };
  const Highlight = useContext(HighlightContext);
  const { intersections, setIntersections } = useContext(IntersectionContext);
  const { starttime, interval } = useContext(DateTimeContext);
  if (!coordinates || !data) return null;
  const handleIntersectionHover = (event: LeafletMouseEvent) => {
    if (event.type === "mouseover") {
      (Highlight as any).setHighlighted(props.name);
    } else {
      (Highlight as any).setHighlighted("");
    }
  };

  if (
    data.length === 0 ||
    data.reduce(
      (acc, val) => (acc === null ? 0 : acc) + (val === null ? 0 : val)
    ) === 0
  ) {
    return (
      <SimpleIntersectionMarker
        coordinates={coordinates}
        title={name}
        interactive={false}
      />
    );
  }

  const icon = CustomIcon(
    90,
    <RadialChart
      title={name}
      values={data}
      interval={interval}
      offset={
        interval === "day" ? 24 - starttime.getHours() : starttime.getDay()
      }
    />
  );

  return (
    <Marker
      title="Click to select/deselect"
      position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
      icon={icon}
      weight={1.5}
      color={(Highlight as any).highlighted === name ? "white" : "black"}
      fillOpacity={0.5}
      onMouseOver={handleIntersectionHover}
      onMouseOut={handleIntersectionHover}
      onClick={() => setIntersections(addOrRemove(name, intersections))}
    />
  );
};

export default RadialIntersectionMarker;
