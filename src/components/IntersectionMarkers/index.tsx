import { LeafletMouseEvent } from "leaflet";
import React, { useContext, useEffect } from "react";
import { Circle, Tooltip } from "react-leaflet";
import { DateTimeContext, HighlightContext } from "../Context";
import useData, {
  getCoordinatesDataRequest,
  getMarkersDataRequest,
  CoordinatesData,
  CoordinatesType,
  MarkersData,
} from "../Hooks/useData";

type IntersectionMarkersProps = {
  handleIntersectionClick: (event: LeafletMouseEvent) => void;
};

const IntersectionMarkers = (props: IntersectionMarkersProps) => {
  const { starttime, endtime } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("markers");
  const {
    data: coordinates,
    error: cError,
    isLoading: cLoading,
    setPayload: cSetPayload,
  } = useData("coordinates");

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
  }, [setPayload, cSetPayload, starttime, endtime]);

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
  return <div className="markers">{ints}</div>;
};

type IntersectionMarkerProps = {
  coordinates?: CoordinatesType;
  name: string;
  measurements: number;
  size: number;
  handleIntersectionClick: (event: LeafletMouseEvent) => void;
  aboves: number;
  belows: number;
};

const IntersectionMarker = (props: IntersectionMarkerProps) => {
  const coords = props.coordinates;
  const Highlight = useContext(HighlightContext);
  if (!coords) return null;
  const handleIntersectionHover = (event: LeafletMouseEvent) => {
    if (event.type === "mouseover") {
      (Highlight as any).setHighlighted(props.name);
    } else {
      (Highlight as any).setHighlighted("");
    }
  };
  /* Size is traffic intensity relative to the number of measurements */
  const radius = props.size / props.measurements;
  /* Set gradient as percentage of outliers below and above means, respectively */
  const aboves = props.aboves * 100;
  const belows = props.belows * 100;
  if (isNaN(aboves) || isNaN(belows)) return null;

  const Fill = () => (
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={"bgGradient" + aboves + belows}>
          <stop offset={belows + "%"} stopColor="yellow" />

          <stop offset={belows + "%"} stopColor="blue" />

          <stop offset={100 - aboves + "%"} stopColor="blue" />

          <stop offset={100 - aboves + "%"} stopColor="red" />
        </radialGradient>
      </defs>
    </svg>
  );

  return (
    <>
      <Fill />
      <Circle
        center={{ lat: coords.latitude, lng: coords.longitude }}
        radius={radius + 50}
        className="circle"
        weight={1.5}
        color={
          (Highlight as any).highlighted === props.name ? "white" : "black"
        }
        fillOpacity={0.5}
        fillColor={"url(#bgGradient" + aboves + belows + ")"}
        onMouseOver={handleIntersectionHover}
        onMouseOut={handleIntersectionHover}
        onclick={props.handleIntersectionClick}>
        <Tooltip>
          <h3>{props.name}</h3>

          <p>Number of passings: {props.size} </p>

          <p>Measurements: {props.measurements}</p>

          <p>Measurements &gt; &mu; + 3&sigma;: {props.aboves}</p>

          <p>Measurements &lt; &mu; - 3&sigma;: {props.belows}</p>
        </Tooltip>
      </Circle>
    </>
  );
};
export default IntersectionMarkers;
