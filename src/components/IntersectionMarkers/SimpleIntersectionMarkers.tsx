import React, { useEffect } from "react";
import { IntersectionMarkersProps } from ".";
import { useData } from "../Hooks";
import { createIntersectionRequest, IntersectionData } from "../Hooks/useData";
import SimpleIntersectionMarker from "./SimpleIntersectionMarker";

const SimpleIntersectionMarkers = (props: IntersectionMarkersProps) => {
  const { handleIntersectionClick } = { ...props };
  const { data, error, isLoading, setPayload } = useData("data");

  useEffect(() => {
    const markersPayload: RequestInit = createIntersectionRequest(
      new Date(),
      new Date(),
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
            handleIntersectionClick={(e) =>
              handleIntersectionClick(e, intersection)
            }
            interactive={true}
          />
        )
      )}
    </div>
  );
};

export default SimpleIntersectionMarkers;
