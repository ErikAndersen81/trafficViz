import React, { useContext, useEffect } from "react";
import { CircleMarker, Tooltip } from "react-leaflet";
import { DateTimeContext } from "../Context";
import useData, {
  getMarkersDataRequest,
  EventMarkersData,
} from "../Hooks/useData";

const EventMarkers = () => {
  const { starttime, endtime } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("events");

  useEffect(() => {
    const markersPayload: RequestInit = getMarkersDataRequest(
      starttime,
      endtime
    );
    setPayload(markersPayload);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPayload, starttime, endtime]);

  // Type guards to make sure we have GraphData and CoordinatesData
  const isMarkersData = (obj: any): obj is EventMarkersData =>
    (obj as EventMarkersData).events !== undefined;

  if (data === null) return null;
  if (!isMarkersData(data) || error !== "" || isLoading) return null;

  const events = Array.from(data.events.keys()).map((event) => (
    <EventMarker
      key={event + "EventMarker"}
      name={event}
      latitude={data.events.get(event)?.latitude}
      longitude={data.events.get(event)?.longitude}
      description={data.events.get(event)?.description || ""}
    />
  ));
  return <div className="markers">{events}</div>;
};

type EventMarkerProps = {
  latitude?: number;
  longitude?: number;
  name: string;
  description: string;
};

const EventMarker = (props: EventMarkerProps) => {
  const { latitude, longitude, description } = { ...props };
  if (!latitude || !longitude) return null;
  return (
    <>
      <CircleMarker
        center={{ lat: latitude, lng: longitude }}
        radius={10}
        className="event"
        weight={1.5}
        color={"black"}
        fillOpacity={0.5}
        fillColor={"green"}>
        <Tooltip>
          <p>{description}</p>
        </Tooltip>
      </CircleMarker>
    </>
  );
};
export default EventMarkers;
