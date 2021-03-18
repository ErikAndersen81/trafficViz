import { useState, useEffect } from "react";

const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

export type IntersectionData = {
  pathData: PathData;
  dates: Array<Date>;
  coordinates: Map<string, CoordinatesType>;
  maxVal: number;
};

export type MarkersData = {
  totalPassings: Map<string, number>;
  pctAbove: Map<string, number>;
  pctBelow: Map<string, number>;
  measurements: number;
};

export type CoordinatesData = {
  intersections: Map<string, CoordinatesType>;
};

export type CoordinatesType = {
  latitude: number;
  longitude: number;
};

export type GroupType = "mean" | "median" | "aggregated";

export type PathData = Map<GroupType, Group>;

export type Group = Map<string, Array<number | null>>;

export type ResourceType = "data" | "events" | "distances";

export type EventMarkersData = {
  events: Map<string, EventType>;
};
export type EventType = {
  latitude: number;
  longitude: number;
  description: string;
  starttime: string;
  endtime: string;
  type: EventMarkerType;
};
export type EventMarkerType = "event" | "tweet" | "disturbance" | "off" | "all";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const getGraphDataRequest = (
  starttime: Date,
  endtime: Date,
  intersections: Array<string>,
  graphOptions: Array<string>,
  binSize?: number
): RequestInit => {
  const body = JSON.stringify({
    starttime: formatDate(starttime),
    endtime: formatDate(endtime),
    intersections: intersections,
    bin_size: binSize,
    graph_options: graphOptions,
  });

  const payload: RequestInit = {
    method: "POST",
    headers: headers,
    body: body,
  };
  return payload;
};

export const getMarkersDataRequest = (
  starttime: Date,
  endtime: Date
): RequestInit => {
  const body = JSON.stringify({
    starttime: formatDate(starttime),
    endtime: formatDate(endtime),
  });

  const payload: RequestInit = {
    method: "POST",
    headers: headers,
    body: body,
  };
  return payload;
};

const useData = (resource: ResourceType) => {
  const [data, setData] = useState<
    IntersectionData | MarkersData | CoordinatesData | EventMarkersData | null
  >(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState<RequestInit | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://127.0.0.1:5000/" + resource;
        const response = await fetch(url, payload);
        const jsonData = await response.json();
        if (jsonData.error) {
          setError(jsonData.error);
        } else {
          if (resource === "events") {
            let events = new Map<string, EventType>(
              Object.keys(jsonData.events).map((k: string) => [
                k,
                jsonData.events[k] as EventType,
              ])
            );
            setData({ events });
          } else {
            let pathData: PathData = new Map<GroupType, Group>();
            let dates: Array<Date> = new Array<Date>(
              ...jsonData.dates.map((date: string) => new Date(date))
            );
            let maxVal: number = jsonData.maxVal;
            if (jsonData["mean"])
              pathData.set("mean", new Map<string, Array<number | null>>());
            if (jsonData["median"])
              pathData.set("median", new Map<string, Array<number | null>>());
            Object.keys(jsonData["pathData"]).forEach((group) => {
              if (jsonData["pathData"][group]) {
                pathData.set(
                  group as GroupType,
                  new Map<string, Array<number | null>>()
                );
                Object.keys(jsonData["pathData"][group]).forEach(
                  (intersection) => {
                    pathData
                      .get(group as GroupType)
                      ?.set(
                        intersection,
                        Array<number | null>(
                          jsonData["pathData"][group][intersection]
                        ).flat()
                      );
                  }
                );
              }
            });
            const coordinates = new Map<string, CoordinatesType>();
            if (jsonData["coordinates"]) {
              Object.keys(jsonData["coordinates"]).forEach((intersection) => {
                coordinates.set(
                  intersection as string,
                  jsonData["coordinates"][intersection] as CoordinatesType
                );
              });
            }
            setData(() => ({ pathData, dates, maxVal, coordinates }));
          }
        }
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    if (payload !== undefined) {
      setIsLoading(true);
      fetchData();
      setIsLoading(false);
    }
  }, [resource, payload]);
  return { data, isLoading, error, setPayload };
};

export default useData;
