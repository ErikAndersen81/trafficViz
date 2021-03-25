import { LeafletMouseEvent } from "leaflet";
import React from "react";
import RadialIntersectionMarkers from "./RadialIntersectionMarkers";
import SimpleIntersectionMarkers from "./SimpleIntersectionMarkers";

export type IntersectionMarkersProps = {
  handleIntersectionClick: (
    event: LeafletMouseEvent,
    intersection: string
  ) => void;
  markerType: IntersectionMarkerType;
};

const IntersectionMarkers = (props: IntersectionMarkersProps) => {
  const { markerType } = { ...props };
  switch (markerType) {
    case "off":
      return null;
    case "simple":
      return <SimpleIntersectionMarkers {...props} />;
    case "radial":
      return <RadialIntersectionMarkers {...props} />;
  }
};

export type IntersectionMarkerType = "simple" | "radial" | "off";

export default IntersectionMarkers;
