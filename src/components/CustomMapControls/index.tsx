import React from "react";

type CustomMapControlsProps = {
  showEvents: boolean;
  setShowEvents: React.Dispatch<React.SetStateAction<boolean>>;
  showIntersections: boolean;
  setShowIntersections: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomMapControls = (props: CustomMapControlsProps) => {
  const {
    setShowEvents,
    setShowIntersections,
    showEvents,
    showIntersections,
  } = { ...props };
  return (
    <div className="CustomMapControls leaflet-control">
      <button
        className={showIntersections ? "down" : "up"}
        onClick={() => setShowIntersections(!showIntersections)}>
        Intersections
      </button>
      <button
        className={showEvents ? "down" : "up"}
        onClick={() => setShowEvents(!showEvents)}>
        Events
      </button>
    </div>
  );
};

export default CustomMapControls;
