import { LeafletMouseEvent } from "leaflet";
import React, { useState } from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import CustomMapControls from "../CustomMapControls";
import EventMarkers from "../EventMarkers";
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
  const [showEvents, setShowEvents] = useState<boolean>(true);
  const [
    showIntersections,
    setShowIntersections,
  ] = useState<IntersectionMarkerType>("radial");

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
        {showEvents ? <EventMarkers /> : null}
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
