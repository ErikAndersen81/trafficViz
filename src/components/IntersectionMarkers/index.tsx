import React from "react";
import BarIntersectionMarkers from "./BarIntersectionMarkers";
import RadialIntersectionMarkers from "./RadialIntersectionMarkers";
import SimpleIntersectionMarkers from "./SimpleIntersectionMarkers";

export type IntersectionMarkersProps = {
  markerType: IntersectionMarkerType;
};

const IntersectionMarkers = (props: IntersectionMarkersProps) => {
  const { markerType } = { ...props };
  console.log(markerType)
  switch (markerType) {
    case "off":
      return null;
    case "simple":
      return <SimpleIntersectionMarkers />;
    case "radial":
      return <RadialIntersectionMarkers />;
    case "bar":
      return <BarIntersectionMarkers />
  }
};

export type IntersectionMarkerType = "simple" | "radial" | "bar" | "off";

export default IntersectionMarkers;
