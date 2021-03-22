import { Marker } from "react-leaflet";
import React from "react";
import CustomIcon, { SimpleIcon } from "../CustomIcon";
import { CoordinatesType } from "../Hooks/useData";
import { LeafletMouseEvent } from "leaflet";

type SimpleIntersectionMarkerProps = {
  coordinates: CoordinatesType;
  title: string;
  handleIntersectionClick: (event: LeafletMouseEvent) => void;
  interactive: boolean;
};

const SimpleIntersectionMarker = (props: SimpleIntersectionMarkerProps) => {
  const { coordinates, title, handleIntersectionClick, interactive } = {
    ...props,
  };
  const icon = CustomIcon(
    30,
    <SimpleIcon color={interactive ? "lightgray" : "gray"} text={title} />
  );
  return (
    <Marker
      interactive={interactive}
      position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
      icon={icon}
      onclick={handleIntersectionClick}
    />
  );
};

export default SimpleIntersectionMarker;
