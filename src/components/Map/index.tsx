import { LeafletMouseEvent } from "leaflet";
import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import EventMarkers from "../EventMarkers";
import IntersectionMarkers from "../IntersectionMarkers";

type MapProps = {
  handleIntersectionClick: (event: LeafletMouseEvent) => void;
};

const Map = (props: MapProps) => {
  return (
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
      />
      <EventMarkers />
    </LeafletMap>
  );
};

export default Map;
