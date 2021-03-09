import React, { useEffect } from "react";
import { useData } from "../Hooks";
import { CoordinatesData, getCoordinatesDataRequest } from "../Hooks/useData";
import SimpleIntersectionMarker from "./SimpleIntersectionMarker";

const SimpleIntersectionMarkers = () => {
  const { data, setPayload } = useData("coordinates");
  const isCoordinatesData = (obj: any): obj is CoordinatesData =>
    (obj as CoordinatesData).intersections !== undefined;

  useEffect(() => {
    if (data === null) {
      const coordinatesPayload: RequestInit = getCoordinatesDataRequest();
      setPayload(coordinatesPayload);
    }
  }, [data]);
  if (data === null) {
    return null;
  }
  if (!isCoordinatesData(data)) return null;

  return (
    <div className="markers">
      {Array.from(data.intersections.entries()).map(
        ([intersection, coordinates]) => (
          <SimpleIntersectionMarker
            title={intersection}
            coordinates={coordinates}
          />
        )
      )}
    </div>
  );
};

export default SimpleIntersectionMarkers;
