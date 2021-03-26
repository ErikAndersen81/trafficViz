import React from "react";
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
  }
};

export type IntersectionMarkerType = "simple" | "radial" | "off";

export default IntersectionMarkers;
