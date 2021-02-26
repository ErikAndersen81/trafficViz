import { LeafletMouseEvent } from "leaflet";
import React, { useContext, useEffect } from "react";
import { DateTimeContext } from "../Context";
import useData, {
  getCoordinatesDataRequest,
  CoordinatesData,
  GraphData,
  getGraphDataRequest,
} from "../Hooks/useData";
import IntersectionMarker from "./IntersectionMarker";

type IntersectionMarkersProps = {
  handleIntersectionClick: (
    event: LeafletMouseEvent,
    intersection: string
  ) => void;
};

const IntersectionMarkers = (props: IntersectionMarkersProps) => {
  const { starttime, interval } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("data");
  const {
    data: coordinates,
    error: cError,
    isLoading: cLoading,
    setPayload: cSetPayload,
  } = useData("coordinates");

  useEffect(() => {
    const daysToAdd = interval === "day" ? 1 : 7;
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
      ["aggregated"]
    );
    setPayload(markersPayload);
    if (coordinates === null) {
      const coordinatesPayload: RequestInit = getCoordinatesDataRequest();
      cSetPayload(coordinatesPayload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPayload, cSetPayload, starttime, interval]);

  // Type guards to make sure we have GraphData and CoordinatesData
  const isGraphData = (obj: any): obj is GraphData =>
    (obj as GraphData).pathData !== undefined;
  const isCoordinatesData = (obj: any): obj is CoordinatesData =>
    (obj as CoordinatesData).intersections !== undefined;
  if (data === null || coordinates === null) return null;
  if (!isGraphData(data) || error !== "" || isLoading) return null;
  if (!isCoordinatesData(coordinates) || cError !== "" || cLoading) {
    return null;
  }
  const agg = data.pathData.get("aggregated");
  if (agg === undefined) return null;
  const ints = Array.from(agg.entries()).map(([intersection, values]) => (
    <IntersectionMarker
      key={intersection + "IntersectionMarker"}
      name={intersection}
      data={values}
      handleIntersectionClick={(e) =>
        (props as any).handleIntersectionClick(e, intersection)
      }
      coordinates={coordinates.intersections.get(intersection) || undefined}
    />
  ));
  return <div className="markers">{ints}</div>;
};

export default IntersectionMarkers;
