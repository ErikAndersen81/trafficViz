import { Marker } from "react-leaflet";
import React, { useContext, useEffect } from "react";
import { DateTimeContext, IntersectionContext } from "../Context";
import { addOrRemove } from "../Context/IntersectionContext";
import CustomIcon from "../CustomIcon";
import { useData } from "../Hooks";
import { CoordinatesType, createRequest, IntersectionData } from "../Hooks/useData";
import BarChart from "../BarChart";
import SimpleIntersectionMarker from "./SimpleIntersectionMarker";

const BarIntersectionMarkers = () => {
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

        const markersPayload: RequestInit = createRequest(
            {
                starttime: start,
                endtime: end,
                graphOptions: ["aggregated"],
                binSize: binSize
            });
        setPayload(markersPayload);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setPayload, starttime, interval]);

    // Type guards to make sure we have GraphData
    const isGraphData = (obj: any): obj is IntersectionData =>
        (obj as IntersectionData).pathData !== undefined;
    if (data === null) return null;
    if (!isGraphData(data) || error !== "" || isLoading) return null;

    const intersectionData = data.pathData.get("aggregated");

    if (intersectionData === undefined) return null;

    const values = Array.from(
        intersectionData.entries()
    ).map(([intersection, values]) => ({
        intersection, value: values.reduce(
            (acc, val) => (acc === null ? 0 : acc) + (val === null ? 0 : val))
    }))
    const zeroVals = values.map(val => val.value === null ? 0 : val.value)
    const maxVal = zeroVals.reduce((acc, val) => acc > val ? acc : val)

    const ints = values.map(({ intersection, value }) => (
        <BarIntersectionMarker
            key={intersection + "IntersectionMarker"}
            name={intersection}
            value={value}
            maxVal={maxVal}
            coordinates={data.coordinates.get(intersection) || undefined}
        />
    ));
    return <div className="markers">{ints}</div>;
};

type IntersectionMarkerProps = {
    coordinates?: CoordinatesType;
    name: string;
    value: number | null
    maxVal: number;
};

const BarIntersectionMarker = (props: IntersectionMarkerProps) => {
    const { name, coordinates, value, maxVal } = {
        ...props,
    };
    const { intersections, setIntersections } = useContext(IntersectionContext);
    if (!coordinates) return null;

    if (
        value === 0 || value === null
    ) {
        return (
            <SimpleIntersectionMarker
                coordinates={coordinates}
                title={name}
                interactive={false}
            />
        );
    }


    const icon = CustomIcon(
        90,
        <BarChart
            title={name}
            value={value / maxVal}
        />
    );

    return (
        <Marker
            title="Click to select/deselect"
            position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
            icon={icon}
            weight={1.5}
            fillOpacity={0.5}
            onClick={() => setIntersections(addOrRemove(name, intersections))}
        />
    );
};


export default BarIntersectionMarkers;