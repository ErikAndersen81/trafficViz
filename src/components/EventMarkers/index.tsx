import React, { useContext, useEffect } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { DateTimeContext } from "../Context";
import useData, {
  createRequest,
  EventData,
  EventMarkerType,
} from "../Hooks/useData";
import CustomIcon, { SimpleIcon } from "../CustomIcon";
import { getEndtime } from "../Context/DateTimeContext";

type EventMarkersProps = {
  visibleMarkerTypes: Array<EventMarkerType>;
};

const EventMarkers = (props: EventMarkersProps) => {
  const { visibleMarkerTypes } = { ...props };
  const { starttime, interval } = useContext(DateTimeContext);
  const { data, error, isLoading, setPayload } = useData("events");
  const endtime = getEndtime(starttime, interval);
  useEffect(() => {
    const markersPayload: RequestInit = createRequest(
      {
        starttime,
        endtime
      }
    );
    setPayload(markersPayload);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPayload, starttime, interval]);

  // Type guards to make sure we have GraphData and CoordinatesData
  const isMarkersData = (obj: any): obj is EventData =>
    (obj as EventData).events !== undefined;

  if (data === null) return null;

  if (!isMarkersData(data) || error !== "" || isLoading) return null;

  const events = Array.from(data.events.keys()).map((e) => {
    const event = data.events.get(e);
    if (event === undefined) return null;
    if (!visibleMarkerTypes.includes(event.type)) return null;
    return <EventMarker key={e + "EventMarker"} {...event} />;
  });
  return <div className="markers">{events}</div>;
};

type EventMarkerProps = {
  latitude: number;
  longitude: number;
  starttime: string;
  endtime: string;
  type: EventMarkerType;
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

const getIcon = (type: EventMarkerType) => {
  let marker;
  switch (type) {
    case "event":
      marker = <SimpleIcon color="lightblue" text="E" />;
      break;
    case "tweet":
      marker = <SimpleIcon color="red" text="A" />;
      break;
    case "disturbance":
      marker = <SimpleIcon color="orange" text="T" />;
      break;
    default:
      marker = <SimpleIcon color="grey" text="!" />;
  }
  return CustomIcon(20, marker);
};

export default EventMarkers;
