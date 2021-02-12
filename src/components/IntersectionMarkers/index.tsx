import { LeafletMouseEvent } from "leaflet";
import React, { useContext, useEffect } from "react";
import { DateTimeContext } from "../Context";
import { getEndtime } from "../Context/DateTimeContext";
import useData, {
  getCoordinatesDataRequest,
  getMarkersDataRequest,
  CoordinatesData,
  MarkersData,
} from "../Hooks/useData";
import Gradients from "./Gradients";
import IntersectionMarker from "./IntersectionMarker";

type IntersectionMarkersProps = {
  handleIntersectionClick: (event: LeafletMouseEvent) => void;
};

const IntersectionMarkers = (props: IntersectionMarkersProps) => {
  const { starttime, interval } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("markers");
  const {
    data: coordinates,
    error: cError,
    isLoading: cLoading,
    setPayload: cSetPayload,
  } = useData("coordinates");
  const endtime = getEndtime(starttime, interval);
  useEffect(() => {
    const markersPayload: RequestInit = getMarkersDataRequest(
      starttime,
      endtime
    );
    setPayload(markersPayload);
    if (coordinates === null) {
      const coordinatesPayload: RequestInit = getCoordinatesDataRequest();
      cSetPayload(coordinatesPayload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPayload, cSetPayload, starttime, interval]);

  // Type guards to make sure we have GraphData and CoordinatesData
  const isMarkersData = (obj: any): obj is MarkersData =>
    (obj as MarkersData).measurements !== undefined;
  const isCoordinatesData = (obj: any): obj is CoordinatesData =>
    (obj as CoordinatesData).intersections !== undefined;
  if (data === null || coordinates === null) return null;
  if (!isMarkersData(data) || error !== "" || isLoading) return null;
  if (!isCoordinatesData(coordinates) || cError !== "" || cLoading) {
    return null;
  }
  const ints = Array.from(data.totalPassings.keys()).map((intersection) => (
    <IntersectionMarker
      key={intersection + "IntersectionMarker"}
      name={intersection}
      measurements={data.measurements}
      handleIntersectionClick={(props as any).handleIntersectionClick}
      coordinates={coordinates.intersections.get(intersection) || undefined}
      size={data.totalPassings.get(intersection) || 0}
      belows={data.pctBelow.get(intersection) || 0}
      aboves={data.pctAbove.get(intersection) || 0}
    />
  ));
  return (
    <div className="markers">
      <Gradients
        values={Array.from(data.totalPassings.keys()).map((intersection) => {
          return {
            name: intersection,
            aboves: data.pctBelow.get(intersection) || 0,
            belows: data.pctAbove.get(intersection) || 0,
          };
        })}
      />
      {ints}
    </div>
  );
};

export default IntersectionMarkers;
