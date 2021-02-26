import React, { useContext, useEffect } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { DateTimeContext } from "../Context";
import useData, {
  getMarkersDataRequest,
  EventMarkersData,
} from "../Hooks/useData";
import CustomIcon, { StandardMarker } from "../CustomIcon";
import { getEndtime } from "../Context/DateTimeContext";

const EventMarkers = () => {
  const { starttime, interval } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("events");
  const endtime = getEndtime(starttime, interval);
  useEffect(() => {
    const markersPayload: RequestInit = getMarkersDataRequest(
      starttime,
      endtime
    );
    setPayload(markersPayload);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPayload, starttime, interval]);

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
        icon={getIcon(type)}
        weight={1.5}
        color={"black"}
        fillOpacity={0.5}
        fillColor={"green"}>
        <Tooltip>
          <div className={`Tooltip ${type}`}>
            {type === "tweet" ? (
              <p>Tweeted at {starttime}</p>
            ) : (
              <p>
                From {starttime}
                <br></br>to {endtime}
              </p>
            )}
            <p>{description}</p>
          </div>
        </Tooltip>
      </Marker>
    </>
  );
};

const getIcon = (type: string) => {
  let marker;
  switch (type) {
    case "event":
      marker = <StandardMarker color="lightblue" letter="E" />;
      break;
    case "tweet":
      marker = <StandardMarker color="red" letter="A" />;
      break;
    case "disturbance":
      marker = <StandardMarker color="orange" letter="T" />;
      break;
    default:
      marker = <StandardMarker color="grey" letter="!" />;
  }
  return CustomIcon(5, marker);
};

export default EventMarkers;
