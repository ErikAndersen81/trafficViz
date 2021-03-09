import React from "react";
import { IntersectionMarkerType } from "../IntersectionMarkersV2";

type CustomMapControlsProps = {
  showEvents: boolean;
  setShowEvents: React.Dispatch<React.SetStateAction<boolean>>;
  showIntersections: IntersectionMarkerType;
  setShowIntersections: React.Dispatch<
    React.SetStateAction<IntersectionMarkerType>
  >;
};

const CustomMapControls = (props: CustomMapControlsProps) => {
  const {
    setShowEvents,
    setShowIntersections,
    showEvents,
    showIntersections,
  } = { ...props };
  const handleIntersectionSelect = (
    event: React.SyntheticEvent<HTMLSelectElement, Event>
  ) => {
    event.preventDefault();
    const value = event.currentTarget.value as IntersectionMarkerType;
    setShowIntersections(value);
  };
  return (
    <div className="CustomMapControls leaflet-control">
      <select
        defaultValue={showIntersections}
        onChange={handleIntersectionSelect}>
        <option value="simple">Simple</option>
        <option value="radial">Radial charts</option>
        <option value="off">Off</option>
      </select>
      <button
        className={showEvents ? "down" : "up"}
        onClick={() => setShowEvents(!showEvents)}>
        Events
      </button>
    </div>
  );
};

export default CustomMapControls;
