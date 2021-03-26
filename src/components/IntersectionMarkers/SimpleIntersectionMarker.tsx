import { Marker } from "react-leaflet";
import React, { useContext } from "react";
import CustomIcon, { SimpleIcon } from "../CustomIcon";
import { CoordinatesType } from "../Hooks/useData";
import { IntersectionContext } from "../Context";
import { addOrRemove } from "../Context/IntersectionContext";

type SimpleIntersectionMarkerProps = {
  coordinates: CoordinatesType;
  title: string;
  interactive: boolean;
};

const SimpleIntersectionMarker = (props: SimpleIntersectionMarkerProps) => {
  const { coordinates, title, interactive } = {
    ...props,
  };
  const { intersections, setIntersections } = useContext(IntersectionContext);
  const icon = CustomIcon(
    30,
    <SimpleIcon color={interactive ? "lightgray" : "gray"} text={title} />
  );
  return (
    <Marker
      title={interactive ? "Click to select/deselect" : "No data"}
      interactive={interactive}
      position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
      icon={icon}
      onclick={() => setIntersections(addOrRemove(title, intersections))}
    />
  );
};

export default SimpleIntersectionMarker;
