import { Icon, Point } from "leaflet";
import React, { useContext, useEffect } from "react";
import { CircleMarker, Marker, Tooltip } from "react-leaflet";
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
        icon={icon(type)}
        className="event"
        weight={1.5}
        color={"black"}
        fillOpacity={0.5}
        fillColor={"green"}>
        <Tooltip>
          {type === "event" ? (
            <p>
              From {starttime}
              <br></br>to {endtime}
            </p>
          ) : (
            <p>Tweeted at {starttime}</p>
          )}
          <p>{description}</p>
        </Tooltip>
      </Marker>
    </>
  );
};
export default EventMarkers;

const icon = (type: string) => {
  const uri =
    type === "event" ? iconUri("lightgreen", "E") : iconUri("lightblue", "A");
  console.log(uri);
  return new Icon({ iconUrl: uri, iconSize: new Point(25, 25) });
};

const iconUri = (color: string, letter: string) =>
  encodeURI(
    `data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><metadata id="metadata1">image/svg+xml</metadata><circle fill="black" cx="50" cy="50" r="50"/><circle fill="${color}" cx="48" cy="48" r="47"/><text color="black" x="50" y="50" font-size="50" dominant-baseline="middle" text-anchor="middle" font-weight="bold">${letter}</text></svg>`.replace(
      new RegExp("#", "g"),
      "%23"
    )
  );
