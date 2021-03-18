import { Marker } from "react-leaflet";
import React from "react";
import CustomIcon, { SimpleIcon } from "../CustomIcon";
import { CoordinatesType } from "../Hooks/useData";

type SimpleIntersectionMarkerProps = {
  coordinates: CoordinatesType;
  title: string;
};

const SimpleIntersectionMarker = (props: SimpleIntersectionMarkerProps) => {
  const { coordinates, title } = { ...props };
  const icon = CustomIcon(30, <SimpleIcon color="gray" text={title} />);
  return (
    <Marker
      interactive={false}
      position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
      icon={icon}
    />
  );
};

export default SimpleIntersectionMarker;
