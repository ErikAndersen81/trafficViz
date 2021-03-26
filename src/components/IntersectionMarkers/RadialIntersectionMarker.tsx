import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import { DateTimeContext, IntersectionContext } from "../Context";
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
  const { intersections, setIntersections } = useContext(IntersectionContext);
  const { starttime, interval } = useContext(DateTimeContext);
  if (!coordinates || !data) return null;

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
      fillOpacity={0.5}
      onClick={() => setIntersections(addOrRemove(name, intersections))}
    />
  );
};

export default RadialIntersectionMarker;
