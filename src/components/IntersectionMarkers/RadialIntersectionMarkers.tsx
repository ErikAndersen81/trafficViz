import React, { useContext, useEffect } from "react";
import { IntersectionMarkersProps } from ".";
import { DateTimeContext } from "../Context";
import { useData } from "../Hooks";
import { getGraphDataRequest, IntersectionData } from "../Hooks/useData";
import RadialIntersectionMarker from "./RadialIntersectionMarker";

const RadialIntersectionMarkers = (props: IntersectionMarkersProps) => {
  const { handleIntersectionClick } = { ...props };
  const { starttime, interval } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("data");

  useEffect(() => {
    const daysToAdd = interval === "day" ? 1 : 7;
    const binSize = interval === "day" ? 4 : 96;
    let start = new Date(starttime.toString());
    if (interval === "week") {
      start.setHours(0);
      start.setMinutes(0);
    }
    let end = new Date(start.toString());
    end.setDate(starttime.getDate() + daysToAdd);

    const markersPayload: RequestInit = getGraphDataRequest(
      start,
      end,
      ["all"],
      ["aggregated"],
      binSize
    );
    setPayload(markersPayload);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPayload, starttime, interval]);

  // Type guards to make sure we have GraphData
  const isGraphData = (obj: any): obj is IntersectionData =>
    (obj as IntersectionData).pathData !== undefined;
  if (data === null) return null;
  if (!isGraphData(data) || error !== "" || isLoading) return null;

  const intersections = data.pathData.get("aggregated");

  if (intersections === undefined) return null;
  const ints = Array.from(
    intersections.entries()
  ).map(([intersection, values]) => (
    <RadialIntersectionMarker
      key={intersection + "IntersectionMarker"}
      name={intersection}
      data={values}
      handleIntersectionClick={(e) => handleIntersectionClick(e, intersection)}
      coordinates={data.coordinates.get(intersection) || undefined}
    />
  ));
  return <div className="markers">{ints}</div>;
};

export default RadialIntersectionMarkers;
