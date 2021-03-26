import React, { useContext, useEffect } from "react";
import { DateTimeContext } from "../Context";
import { getEndtime } from "../Context/DateTimeContext";
import { useData } from "../Hooks";
import { createRequest, Group, GroupType, IntersectionData } from "../Hooks/useData";
import SimpleIntersectionMarker from "./SimpleIntersectionMarker";

const SimpleIntersectionMarkers = () => {
  const { data, error, isLoading, setPayload } = useData("data");
  const { starttime, interval } = useContext(DateTimeContext);

  useEffect(() => {
    const markersPayload: RequestInit = createRequest(
      {
        starttime,
        endtime: getEndtime(starttime, interval),
        graphOptions: ["aggregated"]
      }
    );
    setPayload(markersPayload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starttime, interval]);
  // Type guards to make sure we have GraphData
  const isGraphData = (obj: any): obj is IntersectionData =>
    (obj as IntersectionData).pathData !== undefined;
  if (data === null) return null;
  if (!isGraphData(data) || error !== "" || isLoading) return null;
  if (data === null) {
    return null;
  }
  console.log(data)
  return (
    <div className="markers">
      {Array.from(data.coordinates.entries()).map(
        ([intersection, coordinates]) => (
          <SimpleIntersectionMarker
            key={`intersectionmarker${intersection}`}
            title={intersection}
            coordinates={coordinates}
            interactive={hasValidData(data.pathData.get('aggregated')?.get(intersection as GroupType))}
          />
        )
      )}
    </div>
  );
};

const hasValidData = (intersection: (Array<number | null> | undefined)): boolean => {
  if (intersection === undefined) return false
  return intersection.reduce((acc, val) => acc ? acc + (val ? val : 0) : 0) !== 0
}

export default SimpleIntersectionMarkers;
