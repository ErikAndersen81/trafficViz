import React, { useEffect } from "react";
import { useData } from "../Hooks";
import { getGraphDataRequest, IntersectionData } from "../Hooks/useData";
import SimpleIntersectionMarker from "./SimpleIntersectionMarker";

const SimpleIntersectionMarkers = () => {
  const { data, error, isLoading, setPayload } = useData("data");

  useEffect(() => {
    const markersPayload: RequestInit = getGraphDataRequest(
      new Date(),
      new Date(),
      ["all"],
      ["aggregated"]
    );
    setPayload(markersPayload);
  }, []);
  // Type guards to make sure we have GraphData
  const isGraphData = (obj: any): obj is IntersectionData =>
    (obj as IntersectionData).pathData !== undefined;
  if (data === null) return null;
  if (!isGraphData(data) || error !== "" || isLoading) return null;
  if (data === null) {
    return null;
  }

  return (
    <div className="markers">
      {Array.from(data.coordinates.entries()).map(
        ([intersection, coordinates]) => (
          <SimpleIntersectionMarker
            key={`intersectionmarker${intersection}`}
            title={intersection}
            coordinates={coordinates}
          />
        )
      )}
    </div>
  );
};

export default SimpleIntersectionMarkers;
