import React, { useContext, useEffect } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { DateTimeContext } from "../Context";
import useData, {
  getMarkersDataRequest,
  EventMarkersData,
} from "../Hooks/useData";
import CustomIcon from "../CustomIcon";

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

  const events = Array.from(data.events.keys()).map((e) => {
    const event = data.events.get(e);
    if (event === undefined) return null;
    return <EventMarker key={e + "EventMarker"} {...event} />;
  });
  return <div className="markers">{events}</div>;
};

type EventMarkerProps = {
  latitude: number;
  longitude: number;
  starttime: string;
  endtime: string;
  type: string;
  description: string;
};

const EventMarker = (props: EventMarkerProps) => {
  const { type, starttime, endtime, latitude, longitude, description } = {
    ...props,
  };
  if (!latitude || !longitude) return null;
  return (
    <>
      <Marker
        position={{ lat: latitude, lng: longitude }}
        icon={
          type === "event"
            ? CustomIcon("lightblue", "E")
            : CustomIcon("red", "A")
        }
        weight={1.5}
        color={"black"}
        fillOpacity={0.5}
        fillColor={"green"}>
        <Tooltip>
          <div className={`Tooltip ${type}`}>
            {type === "event" ? (
              <p>
                From {starttime}
                <br></br>to {endtime}
              </p>
            ) : (
              <p>Tweeted at {starttime}</p>
            )}
            <p>{description}</p>
          </div>
        </Tooltip>
      </Marker>
    </>
  );
};
export default EventMarkers;