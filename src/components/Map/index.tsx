import { LeafletMouseEvent } from "leaflet";
import React, { useState } from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import CustomMapControls from "../CustomMapControls";
import EventMarkers from "../EventMarkers";
import { EventMarkerType } from "../Hooks/useData";
import IntersectionMarkers, {
  IntersectionMarkerType,
} from "../IntersectionMarkersV2";

type MapProps = {
  handleIntersectionClick: (
    event: LeafletMouseEvent,
    intersection: string
  ) => void;
};

const Map = (props: MapProps) => {
  const [showEvents, setShowEvents] = useState<EventMarkerType>("off");
  const [
    showIntersections,
    setShowIntersections,
  ] = useState<IntersectionMarkerType>("radial");

  const visibleMarkerTypes = {
    all: ["event", "disturbance", "tweet"],
    off: [],
    event: ["event"],
    tweet: ["tweet"],
    disturbance: ["disturbance"],
  }[showEvents] as Array<EventMarkerType>;

  return (
    <>
      <LeafletMap
        className="Map"
        center={[52.0704978, 4.3006999]}
        zoom={13}
        minZoom={12}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

        <IntersectionMarkers
          handleIntersectionClick={props.handleIntersectionClick}
          markerType={showIntersections}
        />

        <EventMarkers visibleMarkerTypes={visibleMarkerTypes} />
      </LeafletMap>
      <CustomMapControls
        showEvents={showEvents}
        setShowEvents={setShowEvents}
        showIntersections={showIntersections}
        setShowIntersections={setShowIntersections}
      />
    </>
  );
};

export default Map;
