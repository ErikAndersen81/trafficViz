import React from "react";
import { EventMarkerType } from "../Hooks/useData";
import { IntersectionMarkerType } from "../IntersectionMarkers";

type CustomMapControlsProps = {
  setShowEvents: React.Dispatch<React.SetStateAction<EventMarkerType>>;
  setShowIntersections: React.Dispatch<
    React.SetStateAction<IntersectionMarkerType>
  >;
};

const CustomMapControls = (props: CustomMapControlsProps) => {
  const { setShowEvents, setShowIntersections } = { ...props };

  const handleIntersectionSelect = (
    event: React.SyntheticEvent<HTMLSelectElement, Event>
  ) => {
    event.preventDefault();
    const value = event.currentTarget.value as IntersectionMarkerType;
    setShowIntersections(value);
  };

  const handleEventSelect = (
    event: React.SyntheticEvent<HTMLSelectElement, Event>
  ) => {
    event.preventDefault();
    const value = event.currentTarget.value as EventMarkerType;
    setShowEvents(value);
  };

  return (
    <div className="CustomMapControls leaflet-control">
      <select title="Intersection marker type" name="intersection" onChange={handleIntersectionSelect}>
        <option disabled hidden>
          Intersection markers
        </option>
        <option value="simple">Simple</option>
        <option value="radial">Radial charts</option>
        <option value="off">Off</option>
      </select>
      <select title="Show event markers" name="events" onChange={handleEventSelect}>
        <option disabled hidden>
          Event markers
        </option>
        <option value="all">All</option>
        <option value="event">Other</option>
        <option value="tweet">112 Tweets</option>
        <option value="disturbance">Railway disturbances</option>
        <option value="off">Off</option>
      </select>
    </div>
  );
};

export default CustomMapControls;
